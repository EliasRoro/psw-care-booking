import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';

const visits = [
  { date: 'Sep 24', service: 'Personal Care', gross: '$142.00', pay: '$96.00' },
  { date: 'Sep 22', service: 'Companionship', gross: '$68.00', pay: '$48.00' },
  { date: 'Sep 20', service: 'Meal Support', gross: '$96.00', pay: '$66.00' },
];

export default function EarningsScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>PSW EARNINGS</Text>
      <Text style={styles.title}>Your pay, clearly shown.</Text>
      <Text style={styles.subtitle}>A simple breakdown of completed visits and your next payout.</Text>

      <View style={styles.hero}><Text style={styles.heroLabel}>CURRENT PAY PERIOD</Text><Text style={styles.heroAmount}>$210.00</Text><Text style={styles.heroText}>Next payout Friday, Sep 27</Text></View>

      <View style={styles.stats}><View style={styles.stat}><Text style={styles.statValue}>03</Text><Text style={styles.statLabel}>Completed visits</Text></View><View style={styles.stat}><Text style={styles.statValue}>$70.00</Text><Text style={styles.statLabel}>Average per visit</Text></View></View>

      <Text style={styles.sectionTitle}>Visit breakdown</Text>
      {visits.map((visit) => <View key={visit.date} style={styles.visit}><View style={styles.visitCopy}><Text style={styles.visitDate}>{visit.date}</Text><Text style={styles.visitService}>{visit.service}</Text></View><View style={styles.visitAmounts}><Text style={styles.visitPay}>{visit.pay}</Text><Text style={styles.visitGross}>Client total {visit.gross}</Text></View></View>)}

      <View style={styles.note}><Text style={styles.noteTitle}>How pay works</Text><Text style={styles.noteText}>Your payout is calculated from the agreed PSW pay before the fixed payout date. Tips are passed through to you in full.</Text></View>
      <Link href="/psw-dashboard" asChild><Pressable style={styles.backButton}><Text style={styles.backText}>Back to PSW workspace</Text></Pressable></Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f4f9f9' },
  content: { padding: 20, paddingBottom: 48, maxWidth: 700, width: '100%', alignSelf: 'center' },
  eyebrow: { color: '#0f766e', fontSize: 11, fontWeight: '900', letterSpacing: 1.5 },
  title: { color: '#123532', fontSize: 31, fontWeight: '800', marginTop: 8 },
  subtitle: { color: '#61736f', fontSize: 14, lineHeight: 21, marginTop: 6, marginBottom: 23 },
  hero: { backgroundColor: '#123532', borderRadius: 18, padding: 20, marginBottom: 15 },
  heroLabel: { color: '#a8d5c8', fontSize: 10, fontWeight: '900', letterSpacing: 1.3 },
  heroAmount: { color: '#fff', fontSize: 38, fontWeight: '900', marginTop: 8 },
  heroText: { color: '#c7ded6', fontSize: 13, marginTop: 5 },
  stats: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  stat: { flex: 1, backgroundColor: '#fff', borderWidth: 1, borderColor: '#dfeae9', borderRadius: 14, padding: 15 },
  statValue: { color: '#0f766e', fontSize: 23, fontWeight: '900' },
  statLabel: { color: '#6a7b76', fontSize: 11, marginTop: 5 },
  sectionTitle: { color: '#123532', fontSize: 18, fontWeight: '800', marginBottom: 11 },
  visit: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#dfeae9', borderRadius: 14, padding: 15, marginBottom: 9, flexDirection: 'row', justifyContent: 'space-between' },
  visitCopy: { flex: 1 },
  visitDate: { color: '#0f766e', fontSize: 11, fontWeight: '900' },
  visitService: { color: '#163734', fontSize: 14, fontWeight: '800', marginTop: 5 },
  visitAmounts: { alignItems: 'flex-end' },
  visitPay: { color: '#0f766e', fontSize: 16, fontWeight: '900' },
  visitGross: { color: '#8a958d', fontSize: 10, marginTop: 4 },
  note: { backgroundColor: '#fff6ee', borderWidth: 1, borderColor: '#f0d4bf', borderRadius: 14, padding: 15, marginTop: 8, marginBottom: 18 },
  noteTitle: { color: '#9c573e', fontSize: 14, fontWeight: '800' },
  noteText: { color: '#7e6a5e', fontSize: 12, lineHeight: 18, marginTop: 5 },
  backButton: { alignSelf: 'center', borderWidth: 1, borderColor: '#b8ceca', paddingHorizontal: 17, paddingVertical: 13, borderRadius: 11 },
  backText: { color: '#0f766e', fontSize: 13, fontWeight: '800' },
});
