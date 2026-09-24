import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const queue = [
  { name: 'Avery Thompson', service: 'Personal care', time: 'Requested 12 min ago', status: 'Needs match' },
  { name: 'Samira Patel', service: 'Companionship', time: 'Requested 38 min ago', status: 'Review notes' },
  { name: 'Jordan Lee', service: 'Recovery support', time: 'Requested 1 hr ago', status: 'Ready to assign' },
];

export default function AdminDashboard() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>ADMIN WORKSPACE</Text>
      <Text style={styles.title}>Operations overview</Text>
      <Text style={styles.subtitle}>Keep the care queue moving and the team supported.</Text>

      <View style={styles.statsGrid}><View style={styles.stat}><Text style={styles.statNumber}>12</Text><Text style={styles.statLabel}>Open requests</Text></View><View style={styles.stat}><Text style={styles.statNumber}>28</Text><Text style={styles.statLabel}>Active PSWs</Text></View><View style={styles.stat}><Text style={styles.statNumber}>96%</Text><Text style={styles.statLabel}>Response rate</Text></View></View>

      <View style={styles.toolbar}><Text style={styles.sectionTitle}>Care request queue</Text><Text style={styles.queueLabel}>TODAY</Text></View>
      {queue.map((request) => <View key={request.name} style={styles.queueCard}><View style={styles.avatar}><Text style={styles.avatarText}>{request.name.charAt(0)}</Text></View><View style={styles.queueInfo}><Text style={styles.requestName}>{request.name}</Text><Text style={styles.requestService}>{request.service}</Text><Text style={styles.requestTime}>{request.time}</Text></View><Text style={styles.requestStatus}>{request.status}</Text></View>)}

      <View style={styles.actionGrid}><Link href="/admin-approvals" asChild><Pressable style={styles.actionCard}><Text style={styles.actionTitle}>PSW approvals</Text><Text style={styles.actionText}>Review documents and approve caregivers</Text></Pressable></Link><Link href="/caregivers" asChild><Pressable style={styles.actionCard}><Text style={styles.actionTitle}>Team directory</Text><Text style={styles.actionText}>Review caregiver profiles and availability</Text></Pressable></Link><Link href="/schedule" asChild><Pressable style={styles.actionCard}><Text style={styles.actionTitle}>Coverage calendar</Text><Text style={styles.actionText}>See upcoming visits and open slots</Text></Pressable></Link></View>

      <View style={styles.alert}><Text style={styles.alertTitle}>Admin access</Text><Text style={styles.alertText}>Production admin permissions must be enforced by Supabase RLS and server-side role checks. This workspace is a local UI preview until the backend is connected.</Text></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f5f7f4' },
  content: { padding: 20, paddingBottom: 46, maxWidth: 900, width: '100%', alignSelf: 'center' },
  eyebrow: { color: '#9c573e', fontSize: 11, fontWeight: '900', letterSpacing: 1.5 },
  title: { color: '#203b36', fontSize: 31, fontWeight: '800', marginTop: 8 },
  subtitle: { color: '#68766e', fontSize: 14, marginTop: 6, marginBottom: 22 },
  statsGrid: { flexDirection: 'row', gap: 10, marginBottom: 27 },
  stat: { flex: 1, backgroundColor: '#fff', borderWidth: 1, borderColor: '#dce6de', padding: 15, borderRadius: 14 },
  statNumber: { color: '#203b36', fontSize: 25, fontWeight: '900' },
  statLabel: { color: '#738078', fontSize: 11, marginTop: 5 },
  toolbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { color: '#203b36', fontSize: 18, fontWeight: '800', marginBottom: 12 },
  queueLabel: { color: '#9c573e', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  queueCard: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#dce6de', borderRadius: 14, padding: 14, marginBottom: 9, flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f2dfd3', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  avatarText: { color: '#9c573e', fontSize: 16, fontWeight: '900' },
  queueInfo: { flex: 1 },
  requestName: { color: '#203b36', fontSize: 14, fontWeight: '800' },
  requestService: { color: '#52655d', fontSize: 12, marginTop: 3 },
  requestTime: { color: '#8a958d', fontSize: 11, marginTop: 3 },
  requestStatus: { color: '#9c573e', backgroundColor: '#fff3ea', paddingHorizontal: 8, paddingVertical: 6, borderRadius: 8, fontSize: 10, fontWeight: '800' },
  actionGrid: { flexDirection: 'row', gap: 10, marginTop: 18 },
  actionCard: { flex: 1, backgroundColor: '#e5eee7', padding: 15, borderRadius: 14 },
  actionTitle: { color: '#203b36', fontSize: 14, fontWeight: '800' },
  actionText: { color: '#68766e', fontSize: 12, lineHeight: 17, marginTop: 5 },
  alert: { borderWidth: 1, borderColor: '#efcfbd', backgroundColor: '#fff8f2', borderRadius: 14, padding: 15, marginTop: 20 },
  alertTitle: { color: '#9c573e', fontSize: 13, fontWeight: '800' },
  alertText: { color: '#806f65', fontSize: 11, lineHeight: 17, marginTop: 5 },
});
