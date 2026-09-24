import { Link } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const aboutImage = {
  uri: 'https://images.unsplash.com/photo-1559234938-b60fff04894d?auto=format&fit=crop&w=1200&q=85',
};

export default function AboutScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.contentContainer}>
      <View style={styles.topBar}>
        <Link href="/" asChild><Pressable><Text style={styles.brand}>PSW <Text style={styles.accent}>/</Text> CARE</Text></Pressable></Link>
        <Link href="/book" asChild><Pressable style={styles.smallButton}><Text style={styles.smallButtonText}>Request support</Text></Pressable></Link>
      </View>

      <View style={styles.hero}>
        <View style={styles.heroCopy}>
          <Text style={styles.kicker}>ABOUT PSW CARE</Text>
          <Text style={styles.title}>The human part of care is the whole point.</Text>
          <Text style={styles.lede}>We make it easier for people and families to find dependable personal support that respects the shape of their everyday life.</Text>
        </View>
        <Image source={aboutImage} style={styles.heroImage} resizeMode="cover" accessibilityLabel="Caregiver and client sharing a warm conversation" />
      </View>

      <View style={styles.statement}>
        <Text style={styles.statementText}>Good care is practical, personal, and built on trust.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionKicker}>OUR APPROACH</Text>
        <View style={styles.approachGrid}>
          <View style={styles.approachItem}><Text style={styles.number}>01</Text><Text style={styles.approachTitle}>Listen first</Text><Text style={styles.body}>Every request starts with the routine, preferences, and priorities of the person receiving care.</Text></View>
          <View style={styles.approachItem}><Text style={styles.number}>02</Text><Text style={styles.approachTitle}>Match thoughtfully</Text><Text style={styles.body}>We focus on the details that make a relationship feel comfortable, capable, and sustainable.</Text></View>
          <View style={styles.approachItem}><Text style={styles.number}>03</Text><Text style={styles.approachTitle}>Stay clear</Text><Text style={styles.body}>Simple communication and transparent next steps keep families informed without adding noise.</Text></View>
        </View>
      </View>

      <View style={styles.quoteBand}>
        <Text style={styles.quoteMark}>“</Text>
        <Text style={styles.quote}>Care is not one-size-fits-all. The best support makes room for the person, not just the task.</Text>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.bottomCopy}><Text style={styles.sectionKicker}>START A CONVERSATION</Text><Text style={styles.bottomTitle}>A more considered care experience is closer than you think.</Text></View>
        <Link href="/contact" asChild><Pressable style={styles.primaryButton}><Text style={styles.primaryButtonText}>Talk to our team</Text></Pressable></Link>
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
  smallButton: { borderWidth: 1, borderColor: '#c8bcae', borderRadius: 2, paddingHorizontal: 14, paddingVertical: 10 },
  smallButtonText: { color: '#1b3933', fontSize: 12, fontWeight: '800' },
  hero: { maxWidth: 1240, width: '100%', alignSelf: 'center', paddingHorizontal: 24, paddingVertical: 32, gap: 30 },
  heroCopy: { maxWidth: 650 },
  kicker: { color: '#c86d4e', fontSize: 11, fontWeight: '900', letterSpacing: 1.7, marginBottom: 17 },
  title: { color: '#1b3933', fontSize: 46, lineHeight: 51, fontWeight: '800' },
  lede: { color: '#68766e', fontSize: 17, lineHeight: 26, marginTop: 20, maxWidth: 570 },
  heroImage: { width: '100%', height: 360, backgroundColor: '#d8cfc1' },
  statement: { backgroundColor: '#1b3933', paddingHorizontal: 24, paddingVertical: 52, marginTop: 25 },
  statementText: { color: '#f7f3ec', fontSize: 30, lineHeight: 37, fontWeight: '700', textAlign: 'center', maxWidth: 720, alignSelf: 'center' },
  section: { maxWidth: 1240, width: '100%', alignSelf: 'center', paddingHorizontal: 24, paddingVertical: 60 },
  sectionKicker: { color: '#c86d4e', fontSize: 10, fontWeight: '900', letterSpacing: 1.5, marginBottom: 18 },
  approachGrid: { gap: 26 },
  approachItem: { borderTopWidth: 2, borderTopColor: '#c86d4e', paddingTop: 16 },
  number: { color: '#c86d4e', fontWeight: '900', fontSize: 12, marginBottom: 24 },
  approachTitle: { color: '#1b3933', fontSize: 21, fontWeight: '800', marginBottom: 9 },
  body: { color: '#68766e', fontSize: 14, lineHeight: 22, maxWidth: 380 },
  quoteBand: { backgroundColor: '#dbe4d9', paddingHorizontal: 24, paddingVertical: 60, alignItems: 'center' },
  quoteMark: { color: '#c86d4e', fontSize: 58, lineHeight: 54, fontWeight: '800' },
  quote: { color: '#1b3933', fontSize: 24, lineHeight: 32, fontWeight: '700', textAlign: 'center', maxWidth: 680 },
  bottomRow: { maxWidth: 1240, width: '100%', alignSelf: 'center', paddingHorizontal: 24, paddingTop: 60, gap: 24 },
  bottomCopy: { flex: 1 },
  bottomTitle: { color: '#1b3933', fontSize: 30, lineHeight: 36, fontWeight: '800' },
  primaryButton: { backgroundColor: '#c86d4e', paddingHorizontal: 20, paddingVertical: 15, borderRadius: 2, alignSelf: 'flex-start' },
  primaryButtonText: { color: '#fffaf3', fontWeight: '800', fontSize: 13 },
});
