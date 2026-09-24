import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const initialIncidents = [
  { id: 'INC-104', title: 'Late arrival reported', booking: 'Personal care  |  Avery Thompson', status: 'Open', severity: 'Low' },
  { id: 'INC-103', title: 'Schedule change requested', booking: 'Companionship  |  Samira Patel', status: 'Reviewing', severity: 'Medium' },
];

export default function AdminIncidentsScreen() {
  const [incidents, setIncidents] = useState(initialIncidents);
  const [description, setDescription] = useState('');

  const addIncident = () => {
    if (!description.trim()) return;
    setIncidents((current) => [{ id: `INC-${104 + current.length}`, title: description.trim(), booking: 'New internal report', status: 'Open', severity: 'Medium' }, ...current]);
    setDescription('');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>ADMIN OPERATIONS</Text>
      <Text style={styles.title}>Incident log</Text>
      <Text style={styles.subtitle}>Capture factual follow-up notes and keep the care team aligned.</Text>

      <View style={styles.form}><Text style={styles.formTitle}>Log a new incident</Text><TextInput value={description} onChangeText={setDescription} placeholder="Short factual description" placeholderTextColor="#8a958d" style={styles.input} /><Pressable onPress={addIncident} style={styles.primaryButton}><Text style={styles.primaryText}>Add to incident log</Text></Pressable></View>

      <Text style={styles.sectionTitle}>Open records</Text>
      {incidents.map((incident) => <View key={incident.id} style={styles.incident}><View style={styles.incidentHeader}><Text style={styles.incidentId}>{incident.id}</Text><Text style={[styles.severity, incident.severity === 'Medium' && styles.medium]}>{incident.severity}</Text></View><Text style={styles.incidentTitle}>{incident.title}</Text><Text style={styles.booking}>{incident.booking}</Text><View style={styles.footerRow}><Text style={styles.status}>{incident.status}</Text><Pressable onPress={() => setIncidents((current) => current.map((item) => item.id === incident.id ? { ...item, status: 'Resolved' } : item))}><Text style={styles.resolve}>Mark resolved</Text></Pressable></View></View>)}

      <View style={styles.note}><Text style={styles.noteTitle}>Privacy and audit</Text><Text style={styles.noteText}>Incident records are sensitive operational data. In production, restrict access through admin RLS policies and record every change in the audit log.</Text></View>
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
  form: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#dce6de', borderRadius: 16, padding: 16, marginBottom: 25 },
  formTitle: { color: '#203b36', fontSize: 15, fontWeight: '800', marginBottom: 11 },
  input: { borderWidth: 1, borderColor: '#dce6de', backgroundColor: '#f8faf7', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12, color: '#203b36', marginBottom: 11 },
  primaryButton: { backgroundColor: '#203b36', borderRadius: 10, paddingVertical: 13, alignItems: 'center' },
  primaryText: { color: '#fff', fontSize: 13, fontWeight: '800' },
  sectionTitle: { color: '#203b36', fontSize: 18, fontWeight: '800', marginBottom: 11 },
  incident: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#dce6de', borderRadius: 15, padding: 15, marginBottom: 10 },
  incidentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  incidentId: { color: '#9c573e', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  severity: { color: '#0f766e', backgroundColor: '#e4f6ef', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8, fontSize: 10, fontWeight: '900' },
  medium: { color: '#9c573e', backgroundColor: '#fff3ea' },
  incidentTitle: { color: '#203b36', fontSize: 15, fontWeight: '800', marginTop: 12 },
  booking: { color: '#68766e', fontSize: 12, marginTop: 5 },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#edf0ed', marginTop: 13, paddingTop: 12 },
  status: { color: '#68766e', fontSize: 11, fontWeight: '800' },
  resolve: { color: '#0f766e', fontSize: 11, fontWeight: '900' },
  note: { backgroundColor: '#fff8f2', borderWidth: 1, borderColor: '#efcfbd', borderRadius: 14, padding: 15, marginTop: 9, marginBottom: 18 },
  noteTitle: { color: '#9c573e', fontSize: 13, fontWeight: '800' },
  noteText: { color: '#806f65', fontSize: 11, lineHeight: 17, marginTop: 5 },
  backButton: { alignSelf: 'center', borderWidth: 1, borderColor: '#b7c9c0', paddingHorizontal: 17, paddingVertical: 13, borderRadius: 11 },
  backText: { color: '#0f766e', fontSize: 13, fontWeight: '800' },
});
