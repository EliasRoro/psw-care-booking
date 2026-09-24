import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const initialSteps = [
  { id: 'certificate', title: 'PSW certificate', detail: 'Upload a clear copy of your PSW certificate.', status: 'Required' },
  { id: 'vulnerable', title: 'Vulnerable sector check', detail: 'Add a current vulnerable sector screening document.', status: 'Required' },
  { id: 'first-aid', title: 'First aid and CPR', detail: 'Provide current first aid and CPR certification.', status: 'Required' },
  { id: 'references', title: 'Two professional references', detail: 'Add contact details for two recent references.', status: 'Required' },
  { id: 'bio', title: 'Your care profile', detail: 'Tell families about your experience and approach.', status: 'Optional' },
];

export default function PswOnboardingScreen() {
  const [completed, setCompleted] = useState<string[]>([]);
  const completedCount = completed.length;

  const toggleStep = (id: string) => {
    setCompleted((current) => current.includes(id) ? current.filter((stepId) => stepId !== id) : [...current, id]);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>PSW ONBOARDING</Text>
      <Text style={styles.title}>Build your care profile.</Text>
      <Text style={styles.subtitle}>A few clear details help families feel confident before the first visit.</Text>

      <View style={styles.progressCard}><View style={styles.progressHeader}><Text style={styles.progressTitle}>Application progress</Text><Text style={styles.progressCount}>{completedCount} / {initialSteps.length}</Text></View><View style={styles.track}><View style={[styles.fill, { width: `${(completedCount / initialSteps.length) * 100}%` }]} /></View><Text style={styles.progressText}>{completedCount === initialSteps.length ? 'Ready for team review.' : 'Complete the required items to submit your profile.'}</Text></View>

      <Text style={styles.sectionTitle}>Your checklist</Text>
      {initialSteps.map((step) => { const isComplete = completed.includes(step.id); return <Pressable key={step.id} onPress={() => toggleStep(step.id)} style={[styles.stepCard, isComplete && styles.stepCardComplete]}><View style={[styles.check, isComplete && styles.checkComplete]}><Text style={styles.checkText}>{isComplete ? '✓' : ''}</Text></View><View style={styles.stepCopy}><View style={styles.stepHeader}><Text style={styles.stepTitle}>{step.title}</Text><Text style={[styles.stepStatus, step.status === 'Optional' && styles.optional]}>{isComplete ? 'Added' : step.status}</Text></View><Text style={styles.stepDetail}>{step.detail}</Text></View></Pressable>; })}

      <View style={styles.note}><Text style={styles.noteTitle}>Privacy matters</Text><Text style={styles.noteText}>Documents are private and should only be used for onboarding review. Do not upload medical records.</Text></View>
      <Link href="/psw-dashboard" asChild><Pressable style={styles.secondaryButton}><Text style={styles.secondaryText}>Back to PSW workspace</Text></Pressable></Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f4f9f9' },
  content: { padding: 20, paddingBottom: 48, maxWidth: 760, width: '100%', alignSelf: 'center' },
  eyebrow: { color: '#0f766e', fontSize: 11, fontWeight: '900', letterSpacing: 1.5 },
  title: { color: '#123532', fontSize: 31, fontWeight: '800', marginTop: 8 },
  subtitle: { color: '#61736f', fontSize: 14, lineHeight: 21, marginTop: 6, marginBottom: 22 },
  progressCard: { backgroundColor: '#123532', borderRadius: 18, padding: 19, marginBottom: 24 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressTitle: { color: '#fff', fontSize: 15, fontWeight: '800' },
  progressCount: { color: '#e9b08d', fontSize: 13, fontWeight: '900' },
  track: { height: 7, backgroundColor: '#466b63', borderRadius: 6, overflow: 'hidden', marginTop: 15 },
  fill: { height: '100%', backgroundColor: '#e9b08d', borderRadius: 6 },
  progressText: { color: '#c7ded6', fontSize: 12, marginTop: 10 },
  sectionTitle: { color: '#123532', fontSize: 18, fontWeight: '800', marginBottom: 11 },
  stepCard: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#dfeae9', borderRadius: 14, padding: 15, marginBottom: 9, flexDirection: 'row', alignItems: 'flex-start' },
  stepCardComplete: { borderColor: '#8dc9bd', backgroundColor: '#f2fbf8' },
  check: { width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: '#b8ceca', alignItems: 'center', justifyContent: 'center', marginRight: 12, marginTop: 1 },
  checkComplete: { backgroundColor: '#0f766e', borderColor: '#0f766e' },
  checkText: { color: '#fff', fontSize: 14, fontWeight: '900' },
  stepCopy: { flex: 1 },
  stepHeader: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  stepTitle: { color: '#163734', fontSize: 14, fontWeight: '800', flex: 1 },
  stepStatus: { color: '#0f766e', fontSize: 10, fontWeight: '900', textTransform: 'uppercase' },
  optional: { color: '#8a9188' },
  stepDetail: { color: '#6a7b76', fontSize: 12, lineHeight: 18, marginTop: 5 },
  note: { backgroundColor: '#fff6ee', borderWidth: 1, borderColor: '#f0d4bf', borderRadius: 14, padding: 15, marginTop: 16, marginBottom: 18 },
  noteTitle: { color: '#9c573e', fontSize: 14, fontWeight: '800' },
  noteText: { color: '#7e6a5e', fontSize: 12, lineHeight: 18, marginTop: 5 },
  secondaryButton: { alignSelf: 'center', borderWidth: 1, borderColor: '#b8ceca', paddingHorizontal: 17, paddingVertical: 13, borderRadius: 12 },
  secondaryText: { color: '#0f766e', fontWeight: '800', fontSize: 13 },
});
