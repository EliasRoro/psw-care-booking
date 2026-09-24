import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const requests = [
  { id: 'bk-201', client: 'Avery Thompson', service: 'Personal care', date: 'Tomorrow, 9:30 AM' },
  { id: 'bk-202', client: 'Samira Patel', service: 'Companionship', date: 'Wed, 2:00 PM' },
  { id: 'bk-203', client: 'Jordan Lee', service: 'Recovery support', date: 'Fri, 11:15 AM' },
];

const psws = ['Maya W.', 'Jordan P.', 'Alicia D.'];

export default function AdminBookingsScreen() {
  const [assignments, setAssignments] = useState<Record<string, string>>({});

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>ADMIN OPERATIONS</Text>
      <Text style={styles.title}>Assign bookings</Text>
      <Text style={styles.subtitle}>Match each request with an approved PSW and keep the client updated.</Text>

      {requests.map((request) => <View key={request.id} style={styles.requestCard}><View style={styles.requestHeader}><View><Text style={styles.client}>{request.client}</Text><Text style={styles.service}>{request.service}</Text><Text style={styles.date}>{request.date}</Text></View><Text style={styles.requestId}>{request.id}</Text></View><Text style={styles.label}>Assign PSW</Text><View style={styles.pswRow}>{psws.map((psw) => <Pressable key={psw} onPress={() => setAssignments((current) => ({ ...current, [request.id]: psw }))} style={[styles.pswOption, assignments[request.id] === psw && styles.pswOptionSelected]}><Text style={[styles.pswText, assignments[request.id] === psw && styles.pswTextSelected]}>{psw}</Text></Pressable>)}</View><Text style={styles.assignment}>{assignments[request.id] ? `Assigned to ${assignments[request.id]}` : 'Not assigned yet'}</Text></View>)}

      <View style={styles.note}><Text style={styles.noteTitle}>Assignment privacy</Text><Text style={styles.noteText}>Only share the full client address after a booking is confirmed. Keep assignment notes non-clinical.</Text></View>
      <Link href="/admin-dashboard" asChild><Pressable style={styles.backButton}><Text style={styles.backText}>Back to admin dashboard</Text></Pressable></Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f5f7f4' },
  content: { padding: 20, paddingBottom: 48, maxWidth: 820, width: '100%', alignSelf: 'center' },
  eyebrow: { color: '#9c573e', fontSize: 11, fontWeight: '900', letterSpacing: 1.5 },
  title: { color: '#203b36', fontSize: 31, fontWeight: '800', marginTop: 8 },
  subtitle: { color: '#68766e', fontSize: 14, lineHeight: 21, marginTop: 6, marginBottom: 22 },
  requestCard: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#dce6de', borderRadius: 16, padding: 16, marginBottom: 12 },
  requestHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 17 },
  client: { color: '#203b36', fontSize: 16, fontWeight: '800' },
  service: { color: '#52655d', fontSize: 13, marginTop: 4 },
  date: { color: '#8a958d', fontSize: 11, marginTop: 4 },
  requestId: { color: '#9c573e', fontSize: 11, fontWeight: '900' },
  label: { color: '#52655d', fontSize: 11, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 9 },
  pswRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  pswOption: { borderWidth: 1, borderColor: '#b7c9c0', paddingHorizontal: 11, paddingVertical: 9, borderRadius: 9 },
  pswOptionSelected: { backgroundColor: '#0f766e', borderColor: '#0f766e' },
  pswText: { color: '#52655d', fontSize: 12, fontWeight: '700' },
  pswTextSelected: { color: '#fff' },
  assignment: { color: '#0f766e', fontSize: 12, fontWeight: '800', marginTop: 12 },
  note: { backgroundColor: '#fff8f2', borderWidth: 1, borderColor: '#efcfbd', borderRadius: 14, padding: 15, marginTop: 8, marginBottom: 18 },
  noteTitle: { color: '#9c573e', fontSize: 13, fontWeight: '800' },
  noteText: { color: '#806f65', fontSize: 11, lineHeight: 17, marginTop: 5 },
  backButton: { alignSelf: 'center', borderWidth: 1, borderColor: '#b7c9c0', paddingHorizontal: 17, paddingVertical: 13, borderRadius: 11 },
  backText: { color: '#0f766e', fontSize: 13, fontWeight: '800' },
});
