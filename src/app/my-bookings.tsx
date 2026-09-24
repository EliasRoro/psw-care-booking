import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { bookings } from '../data/mockData';

export default function MyBookingsScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>My bookings</Text>

      {bookings.map((booking) => (
        <View key={booking.id} style={styles.card}>
          <View style={styles.topRow}>
            <Text style={styles.service}>{booking.service}</Text>
            <Text style={styles.status}>{booking.status}</Text>
          </View>

          <Text style={styles.meta}>{booking.date} • {booking.time}</Text>
          <Text style={styles.meta}>Caregiver: {booking.caregiver}</Text>
          <Text style={styles.amount}>{booking.amount}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f4f9f9',
  },
  contentContainer: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 30,
    fontWeight: '800',
    color: '#123532',
    marginBottom: 18,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#dfeae9',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  service: {
    color: '#123532',
    fontWeight: '800',
    fontSize: 18,
  },
  status: {
    color: '#0f766e',
    fontWeight: '700',
    fontSize: 12,
    backgroundColor: '#ecfdf5',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  meta: {
    color: '#536863',
    fontSize: 13,
    marginBottom: 4,
  },
  amount: {
    marginTop: 8,
    color: '#0f766e',
    fontSize: 16,
    fontWeight: '800',
  },
});
