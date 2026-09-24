import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { availabilitySlots, upcomingVisits } from '../data/mockData';

export default function ScheduleScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>Care schedule</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming visits</Text>
        {upcomingVisits.map((visit) => (
          <View key={`${visit.day}-${visit.time}`} style={styles.visitRow}>
            <Text style={styles.day}>{visit.day}</Text>
            <View style={styles.visitInfo}>
              <Text style={styles.visitType}>{visit.type}</Text>
              <Text style={styles.visitMeta}>{visit.time}</Text>
              <Text style={styles.visitMeta}>with {visit.caregiver}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Open availability</Text>
        {availabilitySlots.map((slot) => (
          <View key={slot} style={styles.slotRow}>
            <Text style={styles.slotText}>{slot}</Text>
          </View>
        ))}
      </View>
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
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#dfeae9',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#123532',
    marginBottom: 10,
  },
  visitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#edf2f2',
  },
  day: {
    width: 70,
    color: '#0f766e',
    fontWeight: '800',
  },
  visitInfo: {
    flex: 1,
  },
  visitType: {
    color: '#163734',
    fontWeight: '700',
    marginBottom: 2,
  },
  visitMeta: {
    color: '#536863',
    fontSize: 13,
  },
  slotRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#edf2f2',
  },
  slotText: {
    color: '#163734',
    fontWeight: '600',
  },
});
