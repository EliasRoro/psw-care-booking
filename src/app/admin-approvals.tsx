import { useState } from 'react';
import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const initialApplications = [
  { id: 'maya', name: 'Maya Wilson', specialty: 'Personal care and mobility', submitted: 'Today, 9:42 AM' },
  { id: 'jordan', name: 'Jordan Patel', specialty: 'Companionship and respite', submitted: 'Yesterday, 4:18 PM' },
  { id: 'alicia', name: 'Alicia Davis', specialty: 'Recovery and meal support', submitted: 'Yesterday, 1:06 PM' },
];

export default function AdminApprovalsScreen() {
  const [decisions, setDecisions] = useState<Record<string, 'Approved' | 'Needs review'>>({});

  const decide = (id: string, decision: 'Approved' | 'Needs review') => {
    setDecisions((current) => ({ ...current, [id]: decision }));
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>ADMIN OPERATIONS</Text>
      <Text style={styles.title}>PSW approvals</Text>
      <Text style={styles.subtitle}>Review documents and profiles before a caregiver becomes visible to clients.</Text>

      <View style={styles.summary}><Text style={styles.summaryNumber}>{initialApplications.length}</Text><View><Text style={styles.summaryTitle}>Applications waiting</Text><Text style={styles.summaryText}>Review each profile and document set.</Text></View></View>

      {initialApplications.map((application) => { const decision = decisions[application.id]; return <View key={application.id} style={styles.application}><View style={styles.applicationHeader}><View style={styles.avatar}><Text style={styles.avatarText}>{application.name.charAt(0)}</Text></View><View style={styles.profile}><Text style={styles.name}>{application.name}</Text><Text style={styles.specialty}>{application.specialty}</Text><Text style={styles.submitted}>{application.submitted}</Text></View>{decision ? <Text style={[styles.decision, decision === 'Approved' ? styles.approved : styles.review]}>{decision}</Text> : null}</View><View style={styles.documentRow}><Text style={styles.documentText}>Certificate</Text><Text style={styles.documentStatus}>Ready to review</Text></View><View style={styles.documentRow}><Text style={styles.documentText}>Vulnerable sector check</Text><Text style={styles.documentStatus}>Ready to review</Text></View><View style={styles.actions}><Pressable onPress={() => decide(application.id, 'Needs review')} style={styles.reviewButton}><Text style={styles.reviewButtonText}>Needs review</Text></Pressable><Pressable onPress={() => decide(application.id, 'Approved')} style={styles.approveButton}><Text style={styles.approveButtonText}>Approve PSW</Text></Pressable></View></View>; })}

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
  summary: { backgroundColor: '#203b36', borderRadius: 16, padding: 18, flexDirection: 'row', alignItems: 'center', marginBottom: 22 },
  summaryNumber: { color: '#e9b08d', fontSize: 36, fontWeight: '900', marginRight: 15 },
  summaryTitle: { color: '#fff', fontSize: 15, fontWeight: '800' },
  summaryText: { color: '#c7ded6', fontSize: 12, marginTop: 4 },
  application: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#dce6de', borderRadius: 16, padding: 16, marginBottom: 12 },
  applicationHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#f2dfd3', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  avatarText: { color: '#9c573e', fontSize: 18, fontWeight: '900' },
  profile: { flex: 1 },
  name: { color: '#203b36', fontSize: 15, fontWeight: '800' },
  specialty: { color: '#52655d', fontSize: 12, marginTop: 3 },
  submitted: { color: '#8a958d', fontSize: 11, marginTop: 3 },
  decision: { fontSize: 10, fontWeight: '900', textTransform: 'uppercase', paddingHorizontal: 8, paddingVertical: 6, borderRadius: 8 },
  approved: { color: '#0f766e', backgroundColor: '#e4f6ef' },
  review: { color: '#9c573e', backgroundColor: '#fff3ea' },
  documentRow: { borderTopWidth: 1, borderTopColor: '#edf0ed', paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between' },
  documentText: { color: '#52655d', fontSize: 12 },
  documentStatus: { color: '#0f766e', fontSize: 11, fontWeight: '800' },
  actions: { flexDirection: 'row', gap: 9, marginTop: 8 },
  reviewButton: { borderWidth: 1, borderColor: '#efc7b1', paddingHorizontal: 13, paddingVertical: 10, borderRadius: 9 },
  reviewButtonText: { color: '#9c573e', fontSize: 12, fontWeight: '800' },
  approveButton: { backgroundColor: '#0f766e', paddingHorizontal: 13, paddingVertical: 10, borderRadius: 9 },
  approveButtonText: { color: '#fff', fontSize: 12, fontWeight: '800' },
  backButton: { alignSelf: 'center', borderWidth: 1, borderColor: '#b7c9c0', paddingHorizontal: 17, paddingVertical: 13, borderRadius: 11, marginTop: 8 },
  backText: { color: '#0f766e', fontSize: 13, fontWeight: '800' },
});
