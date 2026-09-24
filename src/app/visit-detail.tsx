import { Link } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { recordVisitEvent } from '../lib/visitService';

export default function VisitDetailScreen() {
  const [visitState, setVisitState] = useState<'upcoming' | 'in-progress' | 'completed'>('upcoming');

  const updateVisit = async () => {
    const nextEvent = visitState === 'upcoming' ? 'checked_in' : 'checked_out';

    try {
      await recordVisitEvent('bk-101', nextEvent);

      if (visitState === 'upcoming') {
        setVisitState('in-progress');
        Alert.alert('Checked in', 'Your visit has started. Keep notes factual and non-clinical.');
        return;
      }

      setVisitState('completed');
      Alert.alert('Checked out', 'Visit time recorded for the care team.');
    } catch (error) {
      Alert.alert('Unable to update visit', error instanceof Error ? error.message : 'Please try again.');
    }
  };

  const buttonLabel = visitState === 'upcoming' ? 'Check in to visit' : visitState === 'in-progress' ? 'Check out of visit' : 'Visit completed';

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>VISIT DETAIL</Text>
      <Text style={styles.title}>Personal care visit</Text>
      <Text style={styles.subtitle}>Tomorrow, 9:30 AM  |  2 hours</Text>

      <View style={styles.statusCard}><Text style={styles.statusLabel}>STATUS</Text><Text style={styles.status}>{visitState === 'upcoming' ? 'Ready to start' : visitState === 'in-progress' ? 'In progress' : 'Completed'}</Text><Text style={styles.statusText}>{visitState === 'upcoming' ? 'Check in when you arrive at the agreed visit location.' : visitState === 'in-progress' ? 'Remember to check out when the visit is finished.' : 'Your visit has been recorded successfully.'}</Text></View>

      <Text style={styles.sectionTitle}>Visit brief</Text>
      <View style={styles.panel}><View style={styles.detailRow}><Text style={styles.label}>Client</Text><Text style={styles.value}>Avery Thompson</Text></View><View style={styles.detailRow}><Text style={styles.label}>Support</Text><Text style={styles.value}>Mobility support and meal preparation</Text></View><View style={styles.detailRow}><Text style={styles.label}>Address</Text><Text style={styles.value}>Visible after confirmed check-in</Text></View></View>

      <View style={styles.boundary}><Text style={styles.boundaryTitle}>A clear boundary</Text><Text style={styles.boundaryText}>This visit is for non-clinical home support. Do not record diagnoses, medication administration, or clinical observations in visit notes.</Text></View>

      <Pressable style={[styles.primaryButton, visitState === 'completed' && styles.completedButton]} onPress={updateVisit} disabled={visitState === 'completed'}><Text style={styles.primaryButtonText}>{buttonLabel}</Text></Pressable>
      <Link href="/psw-dashboard" asChild><Pressable style={styles.backButton}><Text style={styles.backText}>Back to PSW workspace</Text></Pressable></Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f4f9f9' },
  content: { padding: 20, paddingBottom: 48, maxWidth: 700, width: '100%', alignSelf: 'center' },
  eyebrow: { color: '#0f766e', fontSize: 11, fontWeight: '900', letterSpacing: 1.5 },
  title: { color: '#123532', fontSize: 31, fontWeight: '800', marginTop: 8 },
  subtitle: { color: '#61736f', fontSize: 14, marginTop: 6, marginBottom: 23 },
  statusCard: { backgroundColor: '#123532', borderRadius: 18, padding: 20, marginBottom: 25 },
  statusLabel: { color: '#a8d5c8', fontSize: 10, fontWeight: '900', letterSpacing: 1.3 },
  status: { color: '#fff', fontSize: 24, fontWeight: '800', marginTop: 8 },
  statusText: { color: '#c7ded6', fontSize: 13, lineHeight: 19, marginTop: 7 },
  sectionTitle: { color: '#123532', fontSize: 18, fontWeight: '800', marginBottom: 11 },
  panel: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#dfeae9', borderRadius: 16, paddingHorizontal: 16, marginBottom: 18 },
  detailRow: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#edf2f2' },
  label: { color: '#6a7b76', fontSize: 11, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 5 },
  value: { color: '#163734', fontSize: 15, fontWeight: '700' },
  boundary: { backgroundColor: '#fff6ee', borderWidth: 1, borderColor: '#f0d4bf', borderRadius: 14, padding: 15, marginBottom: 20 },
  boundaryTitle: { color: '#9c573e', fontSize: 14, fontWeight: '800' },
  boundaryText: { color: '#7e6a5e', fontSize: 12, lineHeight: 18, marginTop: 5 },
  primaryButton: { backgroundColor: '#0f766e', borderRadius: 12, paddingVertical: 15, alignItems: 'center' },
  completedButton: { backgroundColor: '#8b9c95' },
  primaryButtonText: { color: '#fff', fontWeight: '800' },
  backButton: { alignSelf: 'center', paddingVertical: 18 },
  backText: { color: '#0f766e', fontSize: 13, fontWeight: '800' },
});
