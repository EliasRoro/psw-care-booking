import { Link } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function PaymentScreen() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const submitPayment = () => {
    if (!cardNumber || !expiry || !cvc) {
      Alert.alert('Missing payment details', 'Enter the test card details to continue.');
      return;
    }

    Alert.alert('Payment authorized', 'This is a test-mode authorization. No real payment was taken.');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>TEST PAYMENT</Text>
      <Text style={styles.title}>Review your booking</Text>
      <Text style={styles.subtitle}>Your card is authorized now and captured after the visit is completed.</Text>

      <View style={styles.summary}><View><Text style={styles.summaryLabel}>PERSONAL CARE</Text><Text style={styles.summaryTitle}>Tue, Sep 30  |  10:30 AM</Text><Text style={styles.summaryText}>Maya W.  |  2 hours</Text></View><Text style={styles.amount}>$142.00</Text></View>

      <Text style={styles.sectionTitle}>Payment method</Text>
      <View style={styles.panel}><Text style={styles.label}>Card number</Text><TextInput value={cardNumber} onChangeText={setCardNumber} keyboardType="number-pad" placeholder="4242 4242 4242 4242" style={styles.input} /><View style={styles.inline}><View style={styles.inlineField}><Text style={styles.label}>Expiry</Text><TextInput value={expiry} onChangeText={setExpiry} placeholder="MM / YY" style={styles.input} /></View><View style={styles.inlineField}><Text style={styles.label}>CVC</Text><TextInput value={cvc} onChangeText={setCvc} keyboardType="number-pad" placeholder="123" secureTextEntry style={styles.input} /></View></View></View>

      <View style={styles.testNote}><Text style={styles.testTitle}>Stripe test mode</Text><Text style={styles.testText}>Use test cards only. This preview never stores card numbers and does not charge a real card.</Text></View>
      <Pressable style={styles.primaryButton} onPress={submitPayment}><Text style={styles.primaryButtonText}>Authorize $142.00</Text></Pressable>
      <Link href="/booking-detail" asChild><Pressable style={styles.backButton}><Text style={styles.backText}>Back to booking</Text></Pressable></Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f4f9f9' },
  content: { padding: 20, paddingBottom: 48, maxWidth: 700, width: '100%', alignSelf: 'center' },
  eyebrow: { color: '#0f766e', fontSize: 11, fontWeight: '900', letterSpacing: 1.5 },
  title: { color: '#123532', fontSize: 31, fontWeight: '800', marginTop: 8 },
  subtitle: { color: '#61736f', fontSize: 14, lineHeight: 21, marginTop: 6, marginBottom: 23 },
  summary: { backgroundColor: '#123532', borderRadius: 18, padding: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 25 },
  summaryLabel: { color: '#a8d5c8', fontSize: 10, fontWeight: '900', letterSpacing: 1.3 },
  summaryTitle: { color: '#fff', fontSize: 16, fontWeight: '800', marginTop: 8 },
  summaryText: { color: '#c7ded6', fontSize: 12, marginTop: 4 },
  amount: { color: '#e9b08d', fontSize: 22, fontWeight: '900' },
  sectionTitle: { color: '#123532', fontSize: 18, fontWeight: '800', marginBottom: 11 },
  panel: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#dfeae9', borderRadius: 16, padding: 16, marginBottom: 18 },
  label: { color: '#52655d', fontSize: 11, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 7 },
  input: { borderWidth: 1, borderColor: '#dfeae9', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12, backgroundColor: '#f8fbfb', color: '#163734', marginBottom: 14 },
  inline: { flexDirection: 'row', gap: 10 },
  inlineField: { flex: 1 },
  testNote: { backgroundColor: '#fff6ee', borderWidth: 1, borderColor: '#f0d4bf', borderRadius: 14, padding: 15, marginBottom: 20 },
  testTitle: { color: '#9c573e', fontSize: 14, fontWeight: '800' },
  testText: { color: '#7e6a5e', fontSize: 12, lineHeight: 18, marginTop: 5 },
  primaryButton: { backgroundColor: '#0f766e', borderRadius: 12, paddingVertical: 15, alignItems: 'center' },
  primaryButtonText: { color: '#fff', fontWeight: '800' },
  backButton: { alignSelf: 'center', paddingVertical: 18 },
  backText: { color: '#0f766e', fontSize: 13, fontWeight: '800' },
});
