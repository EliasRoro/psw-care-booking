import { hasSupabaseConfig, supabase } from './supabase';
import { getUserBookings, saveUserBooking, UserBooking } from './bookings';

export type BookingInput = {
  service: string;
  date: string;
  time: string;
  clientName: string;
  notes: string;
  amount: string;
};

export type BookingRecord = UserBooking & {
  source: 'local' | 'supabase';
};

export async function createBookingRequest(input: BookingInput): Promise<BookingRecord> {
  if (hasSupabaseConfig) {
    const { data: authData } = await supabase.auth.getUser();

    if (authData.user) {
      const { data: serviceType } = await supabase
        .from('service_types')
        .select('id')
        .eq('name', input.service)
        .maybeSingle();

      const { data, error } = await supabase
        .from('bookings')
        .insert({
          client_id: authData.user.id,
          service_type_id: serviceType?.id ?? null,
          start_time: new Date(`${input.date} ${input.time}`).toISOString(),
          duration_hours: 2,
          status: 'requested',
          client_price: Number(input.amount.replace(/[^0-9.]/g, '')) || null,
          notes: input.notes,
        })
        .select('id, status, client_price')
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return {
        id: data.id,
        service: input.service,
        date: input.date,
        time: input.time,
        status: 'Requested',
        caregiver: 'Pending match',
        amount: data.client_price ? `$${Number(data.client_price).toFixed(2)}` : input.amount,
        clientName: input.clientName,
        notes: input.notes,
        source: 'supabase',
      };
    }
  }

  const localBooking: UserBooking = {
    id: `local-${Date.now()}`,
    service: input.service,
    date: input.date,
    time: input.time,
    status: 'Requested',
    caregiver: 'Pending match',
    amount: input.amount,
    clientName: input.clientName,
    notes: input.notes,
  };

  await saveUserBooking(localBooking);
  return { ...localBooking, source: 'local' };
}

export async function getClientBookings(): Promise<BookingRecord[]> {
  const localBookings = (await getUserBookings()).map((booking) => ({ ...booking, source: 'local' as const }));

  if (!hasSupabaseConfig) {
    return localBookings;
  }

  const { data: authData } = await supabase.auth.getUser();

  if (!authData.user) {
    return localBookings;
  }

  const { data, error } = await supabase
    .from('bookings')
    .select('id, status, client_price, start_time, notes, service_types(name)')
    .eq('client_id', authData.user.id)
    .order('start_time', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const remoteBookings: BookingRecord[] = (data ?? []).map((booking) => {
    const start = new Date(booking.start_time);
    const serviceType = Array.isArray(booking.service_types) ? booking.service_types[0] : booking.service_types;

    return {
      id: booking.id,
      service: serviceType?.name ?? 'Care visit',
      date: start.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' }),
      time: start.toLocaleTimeString('en-CA', { hour: 'numeric', minute: '2-digit' }),
      status: booking.status === 'completed' ? 'Completed' : booking.status === 'confirmed' ? 'Confirmed' : 'Requested',
      caregiver: 'Pending match',
      amount: booking.client_price ? `$${Number(booking.client_price).toFixed(2)}` : 'Pending quote',
      clientName: authData.user.user_metadata?.first_name ?? 'Client',
      notes: booking.notes ?? '',
      source: 'supabase',
    };
  });

  return [...remoteBookings, ...localBookings];
}
