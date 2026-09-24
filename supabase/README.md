# Supabase schema and RLS plan

This folder contains the first database milestone for the PSW booking app.

## What is in the schema

The migration at `supabase/migrations/001_initial_schema.sql` creates all of the core tables from the MVP spec, including:

- profiles
- client_addresses
- psw_profiles
- psw_documents
- psw_availability
- service_types
- bookings
- booking_events
- payments
- payouts
- reviews
- incidents
- audit_log

## Why RLS is required

Row Level Security (RLS) makes sure that users only see the records they are allowed to see. This is required for privacy and for meeting the founder's security rules.

## Policy breakdown in plain language

### profiles
- "Users can read only their own profile": a person can view their own account record, and admins can review all profiles.
- "Users can insert their own profile": a signed-in user can create their own profile row.
- "Users can update their own profile": a person can change their own account details, while admins can handle escalations.

### client_addresses
- "Clients can access their own addresses": families only see the addresses they created.
- "Clients can create their own addresses": a client can add a home address for a booking.
- "Clients can update their own addresses": a client can correct their own booking address.

### psw_profiles
- "PSWs can read their own profile": a PSW can view their own profile and onboarding information.
- "Clients and admins can view approved PSW profiles": approved PSWs are visible to authenticated users for matching and booking visibility.
- "PSWs can create their own profile": a PSW can register their account details.
- "PSWs can update their own profile": a PSW can update their profile and admin can monitor all changes.

### psw_documents
- "PSWs can see their own document records": a PSW can only view the documents they uploaded.
- "PSWs can upload their own documents": each PSW can add their background-check and onboarding files.
- "Admins can review all documents": the operations team can approve or reject PSW documents.

### psw_availability
- "PSWs can manage their availability": a PSW can create or edit their own schedule.
- "Authenticated users can view PSW availability for approved workers": approved PSWs are visible to the app but clients only see scheduling availability, not private details beyond what is needed.

### service_types
- "Authenticated users can read service options": clients and PSWs can see the service menu.
- "Admins can manage service menu": the operations team controls the non-clinical service list.

### bookings
- "Clients can see their own bookings": families can only see their own care requests.
- "Assigned PSWs can see their booking records": the PSW assigned to a booking sees only that assignment.
- "Clients can create bookings for themselves": a client may request care for themselves or a couple of bookings for a family.
- "Clients can update their own bookings": a client can adjust their own requested booking.
- "Assigned PSWs can update booking status relevant to their work": the assigned worker can update status such as acceptance and check-in/out.

### booking_events
- "Relevant parties can read booking events": clients and assigned PSWs can see events for their own bookings.
- "Booking actors can insert event records": the booking parties may record important lifecycle events such as offered, accepted, and checked in/out.

### payments
- "Clients and admins can read their payment records": a client sees only their payments, and admins see all payment records.
- "Admins can create or update payment records": the admin or finance team controls payment statuses and Stripe-related flows.

### payouts
- "PSWs can view their own payouts": a PSW only sees their own earning records.
- "Admins can manage payouts": the operations team manages the payout process and transfer records.

### reviews
- "Relevant booking parties can read reviews": only people involved in the booking can see the review.
- "Clients can leave a review for their completed booking": clients can leave feedback after a visit and after the booking is complete.

### incidents
- "People involved in a booking can read incidents": a client or PSW sees incidents attached to their booking and admin manages all.
- "Booking participants can report incidents": only direct participants in a booking can log incidents.
- "Admins can manage incidents": the operations team handles severity and resolution.

### audit_log
- "Admins can read and manage audit log": admin actions are logged and only visible to the admin team for accountability and investigations.

## Next step

After the schema is created in Supabase, the next milestone is to build the client booking screens using the `bookings` table and add a clean onboarding flow for PSWs.
