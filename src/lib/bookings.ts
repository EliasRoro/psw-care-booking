import AsyncStorage from '@react-native-async-storage/async-storage';

const bookingsStorageKey = 'psw-care-booking.user-bookings';

export type UserBooking = {
  id: string;
  service: string;
  date: string;
  time: string;
  status: 'Requested' | 'Confirmed' | 'Completed' | 'Cancelled';
  caregiver: string;
  amount: string;
  clientName: string;
  notes: string;
};

export async function getUserBookings(): Promise<UserBooking[]> {
  const storedBookings = await AsyncStorage.getItem(bookingsStorageKey);

  if (!storedBookings) {
    return [];
  }

  try {
    const parsedBookings = JSON.parse(storedBookings);
    return Array.isArray(parsedBookings) ? parsedBookings : [];
  } catch {
    return [];
  }
}

export async function saveUserBooking(booking: UserBooking): Promise<void> {
  const existingBookings = await getUserBookings();
  await AsyncStorage.setItem(bookingsStorageKey, JSON.stringify([booking, ...existingBookings]));
}
