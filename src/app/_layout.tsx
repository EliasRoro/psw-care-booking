import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#1b3933' },
        headerTintColor: '#fffaf3',
        headerTitleStyle: { fontWeight: '800', fontSize: 16 },
        headerBackTitle: 'Back',
        headerShadowVisible: false,
        contentStyle: { backgroundColor: '#f4f9f9' },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="about" options={{ headerShown: false }} />
      <Stack.Screen name="information" options={{ headerShown: false }} />
      <Stack.Screen name="contact" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ title: 'Member login' }} />
      <Stack.Screen name="admin-login" options={{ title: 'Admin sign in' }} />
      <Stack.Screen name="signup" options={{ title: 'Create account' }} />
      <Stack.Screen name="book" options={{ title: 'Request care' }} />
      <Stack.Screen name="confirmation" options={{ title: 'Request received' }} />
      <Stack.Screen name="client-dashboard" options={{ title: 'Client workspace' }} />
      <Stack.Screen name="psw-dashboard" options={{ title: 'PSW workspace' }} />
      <Stack.Screen name="admin-dashboard" options={{ title: 'Admin workspace' }} />
      <Stack.Screen name="my-bookings" options={{ title: 'My bookings' }} />
      <Stack.Screen name="booking-detail" options={{ title: 'Booking detail' }} />
      <Stack.Screen name="payment" options={{ title: 'Payment review' }} />
      <Stack.Screen name="caregivers" options={{ title: 'Caregiver matches' }} />
      <Stack.Screen name="schedule" options={{ title: 'Care schedule' }} />
      <Stack.Screen name="psw-onboarding" options={{ title: 'PSW onboarding' }} />
      <Stack.Screen name="visit-detail" options={{ title: 'Visit detail' }} />
      <Stack.Screen name="earnings" options={{ title: 'PSW earnings' }} />
      <Stack.Screen name="admin-approvals" options={{ title: 'PSW approvals' }} />
      <Stack.Screen name="admin-bookings" options={{ title: 'Assign bookings' }} />
      <Stack.Screen name="admin-incidents" options={{ title: 'Incident log' }} />
      <Stack.Screen name="settings" options={{ title: 'Settings' }} />
    </Stack>
  );
}
