import { Link } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { PublicHeader } from '../components/PublicHeader';

const informationImage = {
  uri: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1100&q=85',
};

const careTypes = [
  ['Companionship', 'Conversation, social connection, respite, and everyday check-ins.'],
  ['Personal care', 'Support with bathing, hygiene, dressing, mobility, and daily routines.'],
  ['Recovery support', 'Practical help at home while someone regains strength and confidence.'],
  ['Flexible family support', 'A dependable extra set of hands when your household needs breathing room.'],
];

export default function InformationScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.contentContainer}>
      <PublicHeader actionLabel="Have a question?" actionHref="/contact" />

      <View style={styles.hero}>
        <View style={styles.heroCopy}>
          <Text style={styles.kicker}>CARE INFORMATION</Text>
          <Text style={styles.title}>The right kind of help starts with knowing what is possible.</Text>
          <Text style={styles.lede}>Explore the kinds of non-clinical support our PSWs can provide at home, then tell us what would make the biggest difference.</Text>
        </View>
        <Image source={informationImage} style={styles.heroImage} resizeMode="cover" accessibilityLabel="Professional caregiver helping a client at home" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ways we can help</Text>
        <View style={styles.careGrid}>
          {careTypes.map(([title, description], index) => (
            <View key={title} style={styles.careItem}>
              <Text style={styles.number}>0{index + 1}</Text>
              <Text style={styles.careTitle}>{title}</Text>
              <Text style={styles.body}>{description}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.noteBand}>
        <View style={styles.noteCopy}><Text style={styles.kicker}>A CLEAR BOUNDARY</Text><Text style={styles.noteTitle}>Personal support, not medical diagnosis.</Text><Text style={styles.body}>Our booking process is designed for everyday home support. Please do not include diagnoses, medication details, or other clinical information in your notes.</Text></View>
        <View style={styles.noteMarker}><Text style={styles.noteMarkerText}>CARE</Text></View>
      </View>

      <View style={styles.stepsSection}>
        <Text style={styles.sectionTitle}>A calm place to start</Text>
        <View style={styles.stepRow}><Text style={styles.stepNumber}>01</Text><View><Text style={styles.stepTitle}>Share the shape of the day</Text><Text style={styles.body}>Tell us about timing, preferences, and the kind of support you have in mind.</Text></View></View>
        <View style={styles.stepRow}><Text style={styles.stepNumber}>02</Text><View><Text style={styles.stepTitle}>Review the plan</Text><Text style={styles.body}>We use your request to guide a thoughtful match and clarify the next step.</Text></View></View>
        <View style={styles.stepRow}><Text style={styles.stepNumber}>03</Text><View><Text style={styles.stepTitle}>Settle into a rhythm</Text><Text style={styles.body}>As your needs change, your care plan can change with them.</Text></View></View>
        <Link href="/book" asChild><Pressable style={styles.primaryButton}><Text style={styles.primaryButtonText}>Start a care request</Text></Pressable></Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f7f3ec' },
  contentContainer: { paddingBottom: 60 },
  topBar: { paddingHorizontal: 24, paddingVertical: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brand: { color: '#1b3933', fontSize: 17, fontWeight: '900', letterSpacing: 1.5 },
  accent: { color: '#c86d4e' },
  topLink: { color: '#4c5c55', fontSize: 12, fontWeight: '700' },
  hero: { maxWidth: 1240, width: '100%', alignSelf: 'center', paddingHorizontal: 24, paddingVertical: 32, gap: 30 },
  heroCopy: { maxWidth: 700 },
  kicker: { color: '#c86d4e', fontSize: 10, fontWeight: '900', letterSpacing: 1.6, marginBottom: 16 },
  title: { color: '#1b3933', fontSize: 43, lineHeight: 49, fontWeight: '800' },
  lede: { color: '#68766e', fontSize: 16, lineHeight: 25, marginTop: 19, maxWidth: 600 },
  heroImage: { width: '100%', height: 330, backgroundColor: '#d8cfc1' },
  section: { maxWidth: 1240, width: '100%', alignSelf: 'center', paddingHorizontal: 24, paddingVertical: 58 },
  sectionTitle: { color: '#1b3933', fontSize: 31, fontWeight: '800', marginBottom: 28 },
  careGrid: { gap: 24 },
  careItem: { borderTopWidth: 2, borderTopColor: '#c86d4e', paddingTop: 15 },
  number: { color: '#c86d4e', fontSize: 12, fontWeight: '900', marginBottom: 23 },
  careTitle: { color: '#1b3933', fontSize: 20, fontWeight: '800', marginBottom: 8 },
  body: { color: '#68766e', fontSize: 14, lineHeight: 22, maxWidth: 450 },
  noteBand: { backgroundColor: '#1b3933', paddingHorizontal: 24, paddingVertical: 48, flexDirection: 'row', alignItems: 'center', gap: 28 },
  noteCopy: { flex: 1 },
  noteTitle: { color: '#f7f3ec', fontSize: 26, lineHeight: 32, fontWeight: '800', marginBottom: 12 },
  noteBandText: { color: '#bfd0c5' },
  noteMarker: { width: 74, height: 74, borderWidth: 1, borderColor: '#d78a6c', alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '6deg' }] },
  noteMarkerText: { color: '#e9b08d', fontSize: 12, fontWeight: '900', letterSpacing: 1 },
  stepsSection: { maxWidth: 760, width: '100%', alignSelf: 'center', paddingHorizontal: 24, paddingVertical: 58 },
  stepRow: { borderTopWidth: 1, borderTopColor: '#d9d0c4', paddingVertical: 20, flexDirection: 'row', gap: 22 },
  stepNumber: { color: '#c86d4e', fontSize: 13, fontWeight: '900', width: 28 },
  stepTitle: { color: '#1b3933', fontSize: 17, fontWeight: '800', marginBottom: 6 },
  primaryButton: { backgroundColor: '#c86d4e', paddingHorizontal: 20, paddingVertical: 15, borderRadius: 2, alignSelf: 'flex-start', marginTop: 18 },
  primaryButtonText: { color: '#fffaf3', fontWeight: '800', fontSize: 13 },
});
