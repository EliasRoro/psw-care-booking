-- PSW Care Booking MVP schema
-- This migration creates the core tables for clients, PSWs, bookings, payments, and admin records.
-- Row Level Security is enabled on every table to protect user data and enforce the app rules.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('client', 'psw', 'admin')),
  first_name text,
  last_name text,
  phone text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Security-definer avoids recursively evaluating the profiles SELECT policy.
create or replace function public.user_has_role(role_name text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = role_name
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role, first_name, last_name)
  values (
    new.id,
    case when new.raw_user_meta_data ->> 'role' in ('client', 'psw')
      then new.raw_user_meta_data ->> 'role'
      else 'client'
    end,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create policy "Users can read only their own profile"
  on public.profiles for select
  using (auth.uid() = id or user_has_role('admin'));

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id and role in ('client', 'psw'));

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id or user_has_role('admin'))
  with check ((auth.uid() = id and role in ('client', 'psw')) or user_has_role('admin'));

create table if not exists public.client_addresses (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  street text not null,
  city text not null,
  postal_code text not null,
  access_notes text,
  created_at timestamptz not null default now()
);

alter table public.client_addresses enable row level security;

create policy "Clients can access their own addresses"
  on public.client_addresses for select
  using (auth.uid() = client_id or user_has_role('admin'));

create policy "Clients can create their own addresses"
  on public.client_addresses for insert
  with check (auth.uid() = client_id);

create policy "Clients can update their own addresses"
  on public.client_addresses for update
  using (auth.uid() = client_id or user_has_role('admin'))
  with check (auth.uid() = client_id or user_has_role('admin'));

create table if not exists public.psw_profiles (
  id uuid primary key references public.profiles(id) on delete cascade,
  bio text,
  photo_url text,
  years_experience integer,
  status text not null default 'pending' check (status in ('pending', 'approved', 'suspended')),
  hscpoa_number text,
  created_at timestamptz not null default now()
);

alter table public.psw_profiles enable row level security;

create or replace function public.current_psw_status(profile_id uuid)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select status
  from public.psw_profiles
  where id = profile_id
    and id = auth.uid();
$$;

create policy "PSWs can read their own profile"
  on public.psw_profiles for select
  using (auth.uid() = id or user_has_role('admin'));

create policy "Clients and admins can view approved PSW profiles"
  on public.psw_profiles for select
  using (status = 'approved' and auth.role() = 'authenticated');

create policy "PSWs can create their own profile"
  on public.psw_profiles for insert
  with check (auth.uid() = id and status = 'pending');

create policy "PSWs can update their own profile"
  on public.psw_profiles for update
  using (auth.uid() = id or user_has_role('admin'))
  with check (user_has_role('admin') or (auth.uid() = id and status = current_psw_status(id)));

create table if not exists public.psw_documents (
  id uuid primary key default gen_random_uuid(),
  psw_id uuid not null references public.psw_profiles(id) on delete cascade,
  type text not null,
  file_path text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.psw_documents enable row level security;

create policy "PSWs can see their own document records"
  on public.psw_documents for select
  using (auth.uid() = psw_id or user_has_role('admin'));

create policy "PSWs can upload their own documents"
  on public.psw_documents for insert
  with check (
    auth.uid() = psw_id
    and status = 'pending'
    and reviewed_by is null
    and reviewed_at is null
  );

create policy "Admins can review all documents"
  on public.psw_documents for update
  using (user_has_role('admin'))
  with check (user_has_role('admin'));

create table if not exists public.psw_availability (
  id uuid primary key default gen_random_uuid(),
  psw_id uuid not null references public.psw_profiles(id) on delete cascade,
  weekday smallint not null check (weekday between 0 and 6),
  start_time time not null,
  end_time time not null,
  created_at timestamptz not null default now()
);

alter table public.psw_availability enable row level security;

create policy "PSWs can manage their availability"
  on public.psw_availability for all
  using (auth.uid() = psw_id or user_has_role('admin'))
  with check (auth.uid() = psw_id or user_has_role('admin'));

create policy "Authenticated users can view PSW availability for approved workers"
  on public.psw_availability for select
  using (exists (
    select 1 from public.psw_profiles p
    where p.id = psw_id and p.status = 'approved'
  ) and auth.role() = 'authenticated');

create table if not exists public.service_types (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  created_at timestamptz not null default now()
);

alter table public.service_types enable row level security;

create policy "Authenticated users can read service options"
  on public.service_types for select
  using (auth.role() = 'authenticated');

create policy "Admins can manage service menu"
  on public.service_types for all
  using (user_has_role('admin'))
  with check (user_has_role('admin'));

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  psw_id uuid references public.psw_profiles(id),
  address_id uuid references public.client_addresses(id),
  service_type_id uuid references public.service_types(id),
  start_time timestamptz not null,
  duration_hours numeric(4,2) not null check (duration_hours > 0),
  status text not null default 'requested' check (status in ('requested','offered','accepted','confirmed','in_progress','completed','paid_out','cancelled','no_show','disputed')),
  client_price numeric(10,2),
  psw_pay numeric(10,2),
  platform_fee numeric(10,2),
  notes text,
  created_at timestamptz not null default now()
);

alter table public.bookings enable row level security;

create policy "Clients can see their own bookings"
  on public.bookings for select
  using (auth.uid() = client_id or user_has_role('admin'));

create policy "Assigned PSWs can see their booking records"
  on public.bookings for select
  using (auth.uid() = psw_id::uuid or user_has_role('admin'));

create policy "Clients can create bookings for themselves"
  on public.bookings for insert
  with check (auth.uid() = client_id);

create policy "Clients can update their own bookings"
  on public.bookings for update
  using (auth.uid() = client_id or user_has_role('admin'))
  with check ((auth.uid() = client_id and status in ('requested', 'cancelled')) or user_has_role('admin'));

create policy "Assigned PSWs can update booking status relevant to their work"
  on public.bookings for update
  using (auth.uid() = psw_id or user_has_role('admin'))
  with check ((auth.uid() = psw_id and status in ('accepted', 'in_progress', 'completed', 'no_show')) or user_has_role('admin'));

create table if not exists public.booking_events (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  type text not null check (type in ('offered','accepted','checked_in','checked_out','cancelled')),
  timestamp timestamptz not null default now(),
  lat double precision,
  lng double precision
);

alter table public.booking_events enable row level security;

create policy "Relevant parties can read booking events"
  on public.booking_events for select
  using (
    exists (
      select 1 from public.bookings b
      where b.id = booking_id
        and (b.client_id = auth.uid() or b.psw_id = auth.uid() or user_has_role('admin'))
    )
  );

create policy "Booking actors can insert event records"
  on public.booking_events for insert
  with check (
    exists (
      select 1 from public.bookings b
      where b.id = booking_id
        and (b.client_id = auth.uid() or b.psw_id = auth.uid() or user_has_role('admin'))
    )
  );

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  stripe_payment_intent_id text,
  amount numeric(10,2) not null,
  status text not null default 'pending' check (status in ('pending','authorized','captured','failed','refunded')),
  created_at timestamptz not null default now()
);

alter table public.payments enable row level security;

create policy "Clients and admins can read their payment records"
  on public.payments for select
  using (
    exists (
      select 1 from public.bookings b
      where b.id = booking_id
        and (b.client_id = auth.uid() or user_has_role('admin'))
    )
  );

create policy "Admins can create or update payment records"
  on public.payments for all
  using (user_has_role('admin'))
  with check (user_has_role('admin'));

create table if not exists public.payouts (
  id uuid primary key default gen_random_uuid(),
  psw_id uuid not null references public.psw_profiles(id) on delete cascade,
  stripe_transfer_id text,
  amount numeric(10,2) not null,
  pay_period_start timestamptz not null,
  pay_period_end timestamptz not null,
  paid_at timestamptz not null default now()
);

alter table public.payouts enable row level security;

create policy "PSWs can view their own payouts"
  on public.payouts for select
  using (auth.uid() = psw_id or user_has_role('admin'));

create policy "Admins can manage payouts"
  on public.payouts for all
  using (user_has_role('admin'))
  with check (user_has_role('admin'));

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

alter table public.reviews enable row level security;

create policy "Relevant booking parties can read reviews"
  on public.reviews for select
  using (
    exists (
      select 1 from public.bookings b
      where b.id = booking_id
        and (b.client_id = auth.uid() or b.psw_id = auth.uid() or user_has_role('admin'))
    )
  );

create policy "Clients can leave a review for their completed booking"
  on public.reviews for insert
  with check (
    exists (
      select 1 from public.bookings b
      where b.id = booking_id
        and b.client_id = auth.uid()
        and b.status = 'completed'
    )
  );

create table if not exists public.incidents (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  reported_by uuid not null references public.profiles(id),
  description text not null,
  status text not null default 'open' check (status in ('open','investigating','resolved')),
  created_at timestamptz not null default now()
);

alter table public.incidents enable row level security;

create policy "People involved in a booking can read incidents"
  on public.incidents for select
  using (
    auth.uid() = reported_by
    or exists (
      select 1 from public.bookings b
      where b.id = booking_id
        and (b.client_id = auth.uid() or b.psw_id = auth.uid() or user_has_role('admin'))
    )
  );

create policy "Booking participants can report incidents"
  on public.incidents for insert
  with check (
    auth.uid() = reported_by
    and exists (
      select 1 from public.bookings b
      where b.id = booking_id
        and (b.client_id = auth.uid() or b.psw_id = auth.uid())
    )
  );

create policy "Admins can manage incidents"
  on public.incidents for update
  using (user_has_role('admin'))
  with check (user_has_role('admin'));

create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id),
  action text not null,
  table_name text not null,
  record_id uuid,
  timestamp timestamptz not null default now()
);

alter table public.audit_log enable row level security;

create policy "Admins can read and manage audit log"
  on public.audit_log for all
  using (user_has_role('admin'))
  with check (user_has_role('admin'));

comment on table public.profiles is 'Stores account identity and role information for clients, PSWs, and admins.';
comment on table public.client_addresses is 'Stores client home addresses and access notes used for scheduled visits.';
comment on table public.psw_profiles is 'Stores PSW onboarding and verification details. Only approved profiles are visible broadly.';
comment on table public.psw_documents is 'Stores private document uploads for PSW onboarding and review status.';
comment on table public.psw_availability is 'Stores PSW availability by weekday and time slot.';
comment on table public.service_types is 'Stores the legal, non-clinical service menu shown during booking.';
comment on table public.bookings is 'Stores each requested, offered, accepted, and completed care visit.';
comment on table public.booking_events is 'Stores status events such as offered, accepted, checked in, and checked out.';
comment on table public.payments is 'Stores client payment authorization and capture status for Stripe.';
comment on table public.payouts is 'Stores PSW pay details and scheduled transfer records.';
comment on table public.reviews is 'Stores patient or family feedback after an appointment is complete.';
comment on table public.incidents is 'Stores incident reports and case status for the operations team.';
comment on table public.audit_log is 'Stores admin actions for accountability and security review.';
