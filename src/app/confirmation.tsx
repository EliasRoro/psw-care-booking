import { Link, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ConfirmationScreen() {
  const params = useLocalSearchParams<{
    service?: string;
    clientName?: string;
    date?: string;
    time?: string;
    notes?: string;
  }>();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.contentContainer}>
      <View style={styles.confirmationCard}>
        <Text style={styles.badge}>Booking confirmed</Text>
        <Text style={styles.title}>Your care visit is booked.</Text>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Service</Text>
          <Text style={styles.value}>{params.service || 'Care visit'}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Client</Text>
          <Text style={styles.value}>{params.clientName || 'Avery Thompson'}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{params.date || 'Tue, Sep 30'}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Time</Text>
          <Text style={styles.value}>{params.time || '10:30 AM'}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Notes</Text>
          <Text style={styles.value}>{params.notes || 'Mobility support and meal prep'}</Text>
        </View>
      </View>

      <Link href="/" asChild>
        <Pressable style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Back to home</Text>
        </Pressable>
      </Link>
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
    paddingTop: 28,
    paddingBottom: 42,
  },
  confirmationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 20,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 4,
  },
  badge: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
    borderRadius: 999,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    marginTop: 16,
    marginBottom: 18,
    color: '#123532',
    fontSize: 28,
    fontWeight: '800',
  },
  detailRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#edf2f2',
  },
  label: {
    color: '#5f7673',
    fontWeight: '600',
    fontSize: 12,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  value: {
    color: '#123532',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
  },
  primaryButton: {
    backgroundColor: '#0f766e',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
