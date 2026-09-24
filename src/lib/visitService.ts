import { hasSupabaseConfig, supabase } from './supabase';

export type VisitEventType = 'checked_in' | 'checked_out';

export async function recordVisitEvent(bookingId: string, eventType: VisitEventType): Promise<void> {
  if (!hasSupabaseConfig) {
    return;
  }

  const { data: authData } = await supabase.auth.getUser();

  if (!authData.user) {
    throw new Error('You must be signed in to update a visit.');
  }

  const nextStatus = eventType === 'checked_in' ? 'in_progress' : 'completed';
  const { error: bookingError } = await supabase
    .from('bookings')
    .update({ status: nextStatus })
    .eq('id', bookingId);

  if (bookingError) {
    throw new Error(bookingError.message);
  }

  const { error: eventError } = await supabase
    .from('booking_events')
    .insert({ booking_id: bookingId, type: eventType });

  if (eventError) {
    throw new Error(eventError.message);
  }
}
