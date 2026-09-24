import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function BookingDetailScreen() {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>BOOKING DETAIL</Text>
      <Text style={styles.title}>Personal care</Text>
      <Text style={styles.subtitle}>Tue, Sep 30  |  10:30 AM  |  2 hours</Text>

      <View style={styles.confirmed}><Text style={styles.confirmedLabel}>CONFIRMED VISIT</Text><Text style={styles.confirmedTitle}>Maya W. is coming to help.</Text><Text style={styles.confirmedText}>Your caregiver details and visit plan are ready.</Text></View>

      <Text style={styles.sectionTitle}>Your caregiver</Text>
      <View style={styles.caregiverCard}><View style={styles.avatar}><Text style={styles.avatarText}>M</Text></View><View style={styles.caregiverCopy}><Text style={styles.name}>Maya W.</Text><Text style={styles.specialty}>Personal care and mobility</Text><Text style={styles.rating}>4.9  |  Verified PSW</Text></View></View>

      <Text style={styles.sectionTitle}>Visit details</Text>
      <View style={styles.panel}><View style={styles.detailRow}><Text style={styles.label}>Support requested</Text><Text style={styles.value}>Mobility support and meal preparation</Text></View><View style={styles.detailRow}><Text style={styles.label}>Location</Text><Text style={styles.value}>Your saved home address</Text></View><View style={styles.detailRow}><Text style={styles.label}>Estimate</Text><Text style={styles.value}>$142.00</Text></View></View>

      <View style={styles.boundary}><Text style={styles.boundaryTitle}>Before the visit</Text><Text style={styles.boundaryText}>Please keep care notes non-clinical. For changes more than 24 hours before the visit, contact the care team.</Text></View>

      <Link href="/payment" asChild><Pressable style={styles.paymentButton}><Text style={styles.paymentButtonText}>Review test payment</Text></Pressable></Link>

      <Text style={styles.sectionTitle}>Rate your visit</Text>
      <View style={styles.ratingPanel}><Text style={styles.ratingPrompt}>{submitted ? 'Thanks for your feedback.' : 'How was your experience?'}</Text><View style={styles.stars}>{[1, 2, 3, 4, 5].map((value) => <Pressable key={value} onPress={() => setRating(value)}><Text style={[styles.star, value <= rating && styles.starSelected]}>★</Text></Pressable>)}</View>{rating > 0 && !submitted ? <Pressable style={styles.rateButton} onPress={() => setSubmitted(true)}><Text style={styles.rateButtonText}>Submit rating</Text></Pressable> : null}</View>

      <Link href="/my-bookings" asChild><Pressable style={styles.backButton}><Text style={styles.backText}>Back to my bookings</Text></Pressable></Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f4f9f9' },
  content: { padding: 20, paddingBottom: 48, maxWidth: 700, width: '100%', alignSelf: 'center' },
  eyebrow: { color: '#0f766e', fontSize: 11, fontWeight: '900', letterSpacing: 1.5 },
  title: { color: '#123532', fontSize: 31, fontWeight: '800', marginTop: 8 },
  subtitle: { color: '#61736f', fontSize: 14, marginTop: 6, marginBottom: 23 },
  confirmed: { backgroundColor: '#dbeee9', borderRadius: 18, padding: 20, marginBottom: 24 },
  confirmedLabel: { color: '#0f766e', fontSize: 10, fontWeight: '900', letterSpacing: 1.4 },
  confirmedTitle: { color: '#123532', fontSize: 21, fontWeight: '800', marginTop: 8 },
  confirmedText: { color: '#4e6863', fontSize: 13, marginTop: 6 },
  sectionTitle: { color: '#123532', fontSize: 18, fontWeight: '800', marginBottom: 11, marginTop: 4 },
  caregiverCard: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#dfeae9', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#dbeee9', alignItems: 'center', justifyContent: 'center', marginRight: 13 },
  avatarText: { color: '#0f766e', fontSize: 20, fontWeight: '900' },
  caregiverCopy: { flex: 1 },
  name: { color: '#163734', fontSize: 17, fontWeight: '800' },
  specialty: { color: '#61736f', fontSize: 12, marginTop: 3 },
  rating: { color: '#0f766e', fontSize: 11, fontWeight: '800', marginTop: 6 },
  panel: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#dfeae9', borderRadius: 16, paddingHorizontal: 16, marginBottom: 18 },
  detailRow: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#edf2f2' },
  label: { color: '#6a7b76', fontSize: 11, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 5 },
  value: { color: '#163734', fontSize: 14, fontWeight: '700' },
  boundary: { backgroundColor: '#fff6ee', borderWidth: 1, borderColor: '#f0d4bf', borderRadius: 14, padding: 15, marginBottom: 24 },
  boundaryTitle: { color: '#9c573e', fontSize: 14, fontWeight: '800' },
  boundaryText: { color: '#7e6a5e', fontSize: 12, lineHeight: 18, marginTop: 5 },
  paymentButton: { backgroundColor: '#0f766e', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginBottom: 24 },
  paymentButtonText: { color: '#fff', fontWeight: '800', fontSize: 13 },
  ratingPanel: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#dfeae9', borderRadius: 16, padding: 18, alignItems: 'center' },
  ratingPrompt: { color: '#163734', fontSize: 14, fontWeight: '800' },
  stars: { flexDirection: 'row', gap: 8, marginVertical: 14 },
  star: { color: '#d5dfdb', fontSize: 30 },
  starSelected: { color: '#e9a06f' },
  rateButton: { backgroundColor: '#0f766e', borderRadius: 10, paddingHorizontal: 16, paddingVertical: 11 },
  rateButtonText: { color: '#fff', fontSize: 12, fontWeight: '800' },
  backButton: { alignSelf: 'center', paddingVertical: 18 },
  backText: { color: '#0f766e', fontSize: 13, fontWeight: '800' },
});
