import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { bookings, careOptions } from '../data/mockData';

export default function ClientDashboard() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>CLIENT WORKSPACE</Text>
      <Text style={styles.title}>Good morning, Avery.</Text>
      <Text style={styles.subtitle}>A clear view of your care, all in one place.</Text>

      <View style={styles.heroCard}>
        <Text style={styles.cardKicker}>NEXT STEP</Text>
        <Text style={styles.heroTitle}>Need support for a new day?</Text>
        <Text style={styles.cardText}>Start a request and tell us what would make the visit feel useful and comfortable.</Text>
        <Link href="/book" asChild><Pressable style={styles.primaryButton}><Text style={styles.primaryButtonText}>Request a care visit</Text></Pressable></Link>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}><Text style={styles.statNumber}>03</Text><Text style={styles.statLabel}>Active bookings</Text></View>
        <View style={styles.stat}><Text style={styles.statNumber}>01</Text><Text style={styles.statLabel}>Pending match</Text></View>
      </View>

      <Text style={styles.sectionTitle}>Quick access</Text>
      <View style={styles.quickGrid}>
        <Link href="/my-bookings" asChild><Pressable style={styles.quickCard}><Text style={styles.quickTitle}>My bookings</Text><Text style={styles.quickText}>Review visits and requests</Text></Pressable></Link>
        <Link href="/caregivers" asChild><Pressable style={styles.quickCard}><Text style={styles.quickTitle}>Caregiver matches</Text><Text style={styles.quickText}>Meet available PSWs</Text></Pressable></Link>
      </View>

      <Text style={styles.sectionTitle}>Popular care plans</Text>
      {careOptions.slice(1, 4).map((option) => <Link key={option.id} href={{ pathname: '/book', params: { service: option.title } }} asChild><Pressable style={styles.listRow}><View><Text style={styles.listTitle}>{option.title}</Text><Text style={styles.listText}>{option.duration}  |  {option.fit}</Text></View><Text style={styles.arrow}>{'>'}</Text></Pressable></Link>)}

      <Text style={styles.sectionTitle}>Latest booking</Text>
      <View style={styles.latestCard}><Text style={styles.listTitle}>{bookings[0].service}</Text><Text style={styles.listText}>{bookings[0].date}  |  {bookings[0].time}</Text><Text style={styles.status}>{bookings[0].status}</Text></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f4f9f9' },
  content: { padding: 20, paddingBottom: 46, maxWidth: 760, width: '100%', alignSelf: 'center' },
  eyebrow: { color: '#0f766e', fontSize: 11, fontWeight: '900', letterSpacing: 1.5 },
  title: { color: '#123532', fontSize: 31, fontWeight: '800', marginTop: 8 },
  subtitle: { color: '#61736f', fontSize: 14, marginTop: 6, marginBottom: 22 },
  heroCard: { backgroundColor: '#dbeee9', padding: 20, borderRadius: 18, marginBottom: 16 },
  cardKicker: { color: '#0f766e', fontSize: 10, fontWeight: '900', letterSpacing: 1.4 },
  heroTitle: { color: '#123532', fontSize: 22, fontWeight: '800', marginTop: 9 },
  cardText: { color: '#4e6863', fontSize: 14, lineHeight: 21, marginVertical: 10, maxWidth: 480 },
  primaryButton: { alignSelf: 'flex-start', backgroundColor: '#0f766e', paddingHorizontal: 16, paddingVertical: 13, borderRadius: 12 },
  primaryButtonText: { color: '#fff', fontWeight: '800', fontSize: 13 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 25 },
  stat: { flex: 1, backgroundColor: '#fff', borderWidth: 1, borderColor: '#dfeae9', borderRadius: 16, padding: 16 },
  statNumber: { color: '#0f766e', fontSize: 26, fontWeight: '900' },
  statLabel: { color: '#61736f', fontSize: 12, marginTop: 4 },
  sectionTitle: { color: '#123532', fontSize: 18, fontWeight: '800', marginTop: 9, marginBottom: 11 },
  quickGrid: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  quickCard: { flex: 1, backgroundColor: '#fff', borderWidth: 1, borderColor: '#dfeae9', borderRadius: 16, padding: 15 },
  quickTitle: { color: '#163734', fontSize: 14, fontWeight: '800' },
  quickText: { color: '#6a7b76', fontSize: 12, marginTop: 5 },
  listRow: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#dfeae9', borderRadius: 14, padding: 15, marginBottom: 9, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  listTitle: { color: '#163734', fontSize: 15, fontWeight: '800' },
  listText: { color: '#6a7b76', fontSize: 12, marginTop: 4 },
  arrow: { color: '#0f766e', fontSize: 20, fontWeight: '700' },
  latestCard: { backgroundColor: '#fff', borderRadius: 14, padding: 15, borderWidth: 1, borderColor: '#dfeae9' },
  status: { color: '#0f766e', fontSize: 12, fontWeight: '800', marginTop: 10 },
});
