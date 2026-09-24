import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { upcomingVisits, availabilitySlots } from '../data/mockData';

export default function PswDashboard() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>PSW WORKSPACE</Text>
      <Text style={styles.title}>Good morning, Maya.</Text>
      <Text style={styles.subtitle}>Your care schedule and availability at a glance.</Text>

      <View style={styles.heroCard}><View><Text style={styles.cardKicker}>TODAY</Text><Text style={styles.heroTitle}>2 visits planned</Text><Text style={styles.cardText}>You have a steady day ahead. Review the details before your first visit.</Text></View><Text style={styles.heroNumber}>02</Text></View>

      <View style={styles.actionRow}><Link href="/schedule" asChild><Pressable style={styles.primaryButton}><Text style={styles.primaryButtonText}>Open schedule</Text></Pressable></Link><Link href="/caregivers" asChild><Pressable style={styles.secondaryButton}><Text style={styles.secondaryButtonText}>Team directory</Text></Pressable></Link></View>

      <Text style={styles.sectionTitle}>Your upcoming visits</Text>
      {upcomingVisits.map((visit) => <View key={`${visit.day}-${visit.time}`} style={styles.visitCard}><View style={styles.dateBlock}><Text style={styles.day}>{visit.day}</Text><Text style={styles.time}>{visit.time}</Text></View><View style={styles.visitInfo}><Text style={styles.visitType}>{visit.type}</Text><Text style={styles.visitClient}>Client visit  |  {visit.caregiver}</Text></View><Text style={styles.chevron}>{'>'}</Text></View>)}

      <View style={styles.availabilityHeader}><Text style={styles.sectionTitle}>Open availability</Text><Text style={styles.live}>VISIBLE TO CLIENTS</Text></View>
      <View style={styles.availabilityCard}>{availabilitySlots.slice(0, 3).map((slot) => <View key={slot} style={styles.slot}><Text style={styles.slotText}>{slot}</Text><Text style={styles.open}>Open</Text></View>)}</View>

      <View style={styles.note}><Text style={styles.noteTitle}>Care note</Text><Text style={styles.noteText}>Keep visit notes factual and non-clinical. Use the secure workflow for anything that needs team review.</Text></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f4f9f9' },
  content: { padding: 20, paddingBottom: 46, maxWidth: 760, width: '100%', alignSelf: 'center' },
  eyebrow: { color: '#0f766e', fontSize: 11, fontWeight: '900', letterSpacing: 1.5 },
  title: { color: '#123532', fontSize: 31, fontWeight: '800', marginTop: 8 },
  subtitle: { color: '#61736f', fontSize: 14, marginTop: 6, marginBottom: 22 },
  heroCard: { backgroundColor: '#123532', borderRadius: 18, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardKicker: { color: '#a8d5c8', fontSize: 10, fontWeight: '900', letterSpacing: 1.4 },
  heroTitle: { color: '#fff', fontSize: 23, fontWeight: '800', marginTop: 8 },
  cardText: { color: '#c7ded6', fontSize: 13, lineHeight: 19, marginTop: 7, maxWidth: 440 },
  heroNumber: { color: '#e9b08d', fontSize: 44, fontWeight: '900' },
  actionRow: { flexDirection: 'row', gap: 10, marginVertical: 18 },
  primaryButton: { backgroundColor: '#0f766e', paddingHorizontal: 17, paddingVertical: 13, borderRadius: 12 },
  primaryButtonText: { color: '#fff', fontWeight: '800', fontSize: 13 },
  secondaryButton: { borderWidth: 1, borderColor: '#b8ceca', paddingHorizontal: 17, paddingVertical: 13, borderRadius: 12 },
  secondaryButtonText: { color: '#0f766e', fontWeight: '800', fontSize: 13 },
  sectionTitle: { color: '#123532', fontSize: 18, fontWeight: '800', marginTop: 10, marginBottom: 11 },
  visitCard: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#dfeae9', borderRadius: 14, padding: 14, marginBottom: 9, flexDirection: 'row', alignItems: 'center' },
  dateBlock: { width: 82 },
  day: { color: '#0f766e', fontWeight: '800', fontSize: 12 },
  time: { color: '#657773', fontSize: 12, marginTop: 4 },
  visitInfo: { flex: 1 },
  visitType: { color: '#163734', fontWeight: '800', fontSize: 15 },
  visitClient: { color: '#6a7b76', fontSize: 12, marginTop: 4 },
  chevron: { color: '#0f766e', fontSize: 19, fontWeight: '700' },
  availabilityHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  live: { color: '#0f766e', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  availabilityCard: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#dfeae9', borderRadius: 14, paddingHorizontal: 14 },
  slot: { paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: '#edf2f2', flexDirection: 'row', justifyContent: 'space-between' },
  slotText: { color: '#163734', fontWeight: '700', fontSize: 13 },
  open: { color: '#0f766e', fontWeight: '800', fontSize: 12 },
  note: { backgroundColor: '#fff6ee', borderWidth: 1, borderColor: '#f0d4bf', padding: 15, borderRadius: 14, marginTop: 19 },
  noteTitle: { color: '#9c573e', fontWeight: '800', fontSize: 14 },
  noteText: { color: '#7e6a5e', fontSize: 12, lineHeight: 18, marginTop: 5 },
});
