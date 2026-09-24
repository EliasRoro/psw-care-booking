import { Link } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

const heroImage = { uri: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1400&q=85' };
const detailImage = { uri: 'https://images.unsplash.com/photo-1576765608866-5b51046452be?auto=format&fit=crop&w=1000&q=85' };

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isWide = width >= 760;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.contentContainer}>
      <View style={styles.navbar}>
        <Link href="/" asChild><Pressable><Text style={styles.logo}>PSW <Text style={styles.logoAccent}>/</Text> CARE</Text><Text style={styles.logoSubline}>Home support, thoughtfully matched</Text></Pressable></Link>
        {isWide ? (
          <View style={styles.navLinks}>
            <Link href="/about" asChild><Pressable><Text style={styles.navLink}>About</Text></Pressable></Link>
            <Link href="/information" asChild><Pressable><Text style={styles.navLink}>Care information</Text></Pressable></Link>
            <Link href="/contact" asChild><Pressable><Text style={styles.navLink}>Contact</Text></Pressable></Link>
          </View>
        ) : null}
        <Link href="/login" asChild><Pressable style={styles.navButton}><Text style={styles.navButtonText}>Member login</Text></Pressable></Link>
      </View>

      <View style={[styles.hero, isWide && styles.heroWide]}>
        <View style={[styles.heroCopy, isWide && styles.heroCopyWide]}>
          <Text style={styles.kicker}>PERSONAL HOME SUPPORT IN ONTARIO</Text>
          <Text style={styles.heroTitle}>Care that feels like it belongs at home.</Text>
          <Text style={styles.heroText}>Thoughtful, dependable PSW support for the moments that make everyday life easier.</Text>
          <View style={styles.heroActions}>
            <Link href="/book" asChild><Pressable style={styles.primaryButton}><Text style={styles.primaryButtonText}>Find your care plan</Text></Pressable></Link>
            <Link href="/about" asChild><Pressable style={styles.textButton}><Text style={styles.textButtonText}>How it works {'>'}</Text></Pressable></Link>
          </View>
          <View style={styles.trustRow}><Text style={styles.trustNumber}>01</Text><Text style={styles.trustText}>Matched around your routine, preferences, and pace.</Text></View>
        </View>
        <View style={[styles.heroImageFrame, isWide && styles.heroImageFrameWide]}>
          <Image source={heroImage} style={styles.heroImage} resizeMode="cover" accessibilityLabel="Caregiver spending time with an older adult at home" />
          <View style={styles.imageCaption}><Text style={styles.captionSmall}>THE PSW CARE STANDARD</Text><Text style={styles.captionLarge}>Warm hands. Clear communication. Real peace of mind.</Text></View>
        </View>
      </View>

      <View style={styles.introBand}>
        <View style={styles.introLead}><Text style={styles.sectionKicker}>A BETTER WAY TO ARRANGE SUPPORT</Text><Text style={styles.sectionTitle}>The details matter.</Text></View>
        <Text style={styles.introText}>From a first conversation to an ongoing care rhythm, we keep the experience clear, calm, and personal.</Text>
      </View>

      <View style={[styles.featureGrid, isWide && styles.featureGridWide]}>
        <View style={styles.featureItem}><Text style={styles.featureIndex}>01</Text><Text style={styles.featureTitle}>A considered match</Text><Text style={styles.featureText}>Tell us what would make the day feel smoother. We use that context to guide the right support.</Text></View>
        <View style={styles.featureItem}><Text style={styles.featureIndex}>02</Text><Text style={styles.featureTitle}>Care with continuity</Text><Text style={styles.featureText}>Build a familiar routine with a dependable PSW who understands how you like things done.</Text></View>
        <View style={styles.featureItem}><Text style={styles.featureIndex}>03</Text><Text style={styles.featureTitle}>A quieter experience</Text><Text style={styles.featureText}>Simple requests, clear updates, and thoughtful boundaries from first booking onward.</Text></View>
      </View>

      <View style={[styles.storyBlock, isWide && styles.storyBlockWide]}>
        <Image source={detailImage} style={[styles.detailImage, isWide && styles.detailImageWide]} resizeMode="cover" accessibilityLabel="Family member and caregiver sharing a quiet moment" />
        <View style={styles.storyCopy}><Text style={styles.sectionKicker}>CARE, ON YOUR TERMS</Text><Text style={styles.storyTitle}>Support should fit your life, not rearrange it.</Text><Text style={styles.storyText}>Whether you need companionship, personal care, recovery support, or a little more breathing room for family, we start with what matters to you.</Text><Link href="/information" asChild><Pressable style={styles.outlineButton}><Text style={styles.outlineButtonText}>Explore care information</Text></Pressable></Link></View>
      </View>

      <View style={styles.bottomCta}><Text style={styles.bottomCtaTitle}>Ready for a little more ease?</Text><Text style={styles.bottomCtaText}>Start with a simple request. We will take it from there.</Text><Link href="/book" asChild><Pressable style={styles.darkButton}><Text style={styles.darkButtonText}>Request support</Text></Pressable></Link></View>

      <View style={styles.footer}><Text style={styles.footerBrand}>PSW / CARE</Text><Text style={styles.footerText}>Thoughtful home support across Ontario.</Text><View style={styles.footerLinks}><Link href="/about" asChild><Pressable><Text style={styles.footerLink}>About</Text></Pressable></Link><Link href="/contact" asChild><Pressable><Text style={styles.footerLink}>Contact</Text></Pressable></Link><Link href="/my-bookings" asChild><Pressable><Text style={styles.footerLink}>My bookings</Text></Pressable></Link></View></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f7f3ec' },
  contentContainer: { paddingBottom: 32 },
  navbar: { width: '100%', maxWidth: 1240, alignSelf: 'center', paddingHorizontal: 24, paddingVertical: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 18 },
  logo: { color: '#1b3933', fontSize: 18, fontWeight: '900', letterSpacing: 1.8 },
  logoAccent: { color: '#cf7554' },
  logoSubline: { color: '#7a8177', fontSize: 10, marginTop: 4, letterSpacing: 0.4 },
  navLinks: { flexDirection: 'row', gap: 22, alignItems: 'center', flex: 1, justifyContent: 'center' },
  navLink: { color: '#4c5c55', fontSize: 13, fontWeight: '600' },
  navButton: { borderWidth: 1, borderColor: '#c8bcae', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 2 },
  navButtonText: { color: '#1b3933', fontSize: 12, fontWeight: '800' },
  hero: { width: '100%', maxWidth: 1240, alignSelf: 'center', paddingHorizontal: 24, paddingTop: 26, paddingBottom: 64 },
  heroWide: { flexDirection: 'row', alignItems: 'stretch', gap: 42 },
  heroCopy: { paddingTop: 34, paddingBottom: 42 },
  heroCopyWide: { flex: 0.9, justifyContent: 'center', paddingRight: 12 },
  kicker: { color: '#c66d4f', fontSize: 11, fontWeight: '800', letterSpacing: 1.7, marginBottom: 18 },
  heroTitle: { color: '#1b3933', fontSize: 54, lineHeight: 59, fontWeight: '800', maxWidth: 620 },
  heroText: { color: '#596962', fontSize: 17, lineHeight: 27, maxWidth: 510, marginTop: 20 },
  heroActions: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 18, marginTop: 30 },
  primaryButton: { backgroundColor: '#c86d4e', paddingHorizontal: 20, paddingVertical: 15, borderRadius: 2 },
  primaryButtonText: { color: '#fffaf3', fontSize: 13, fontWeight: '800' },
  textButton: { paddingVertical: 12 },
  textButtonText: { color: '#1b3933', fontSize: 13, fontWeight: '800' },
  trustRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 48, maxWidth: 330 },
  trustNumber: { color: '#c86d4e', fontSize: 14, fontWeight: '900' },
  trustText: { color: '#7a8177', fontSize: 12, lineHeight: 18 },
  heroImageFrame: { minHeight: 390, width: '100%', position: 'relative', backgroundColor: '#d8cfc1' },
  heroImageFrameWide: { flex: 1.1, minHeight: 540 },
  heroImage: { width: '100%', height: '100%', position: 'absolute' },
  imageCaption: { position: 'absolute', left: 18, right: 18, bottom: 18, backgroundColor: 'rgba(27, 57, 51, 0.88)', padding: 18 },
  captionSmall: { color: '#e9b08d', fontSize: 10, fontWeight: '800', letterSpacing: 1.4, marginBottom: 7 },
  captionLarge: { color: '#fffaf3', fontSize: 18, lineHeight: 24, fontWeight: '700' },
  introBand: { width: '100%', maxWidth: 1240, alignSelf: 'center', borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#d9d0c4', paddingHorizontal: 24, paddingVertical: 38, flexDirection: 'row', flexWrap: 'wrap', gap: 30, justifyContent: 'space-between' },
  introLead: { flex: 1, minWidth: 240 },
  sectionKicker: { color: '#c86d4e', fontSize: 10, fontWeight: '900', letterSpacing: 1.6, marginBottom: 11 },
  sectionTitle: { color: '#1b3933', fontSize: 32, fontWeight: '800' },
  introText: { color: '#596962', fontSize: 16, lineHeight: 25, maxWidth: 470, flex: 1, minWidth: 260 },
  featureGrid: { width: '100%', maxWidth: 1240, alignSelf: 'center', paddingHorizontal: 24, paddingVertical: 56, gap: 28 },
  featureGridWide: { flexDirection: 'row' },
  featureItem: { flex: 1, borderTopWidth: 2, borderTopColor: '#c86d4e', paddingTop: 16 },
  featureIndex: { color: '#c86d4e', fontSize: 12, fontWeight: '900', marginBottom: 26 },
  featureTitle: { color: '#1b3933', fontSize: 20, fontWeight: '800', marginBottom: 10 },
  featureText: { color: '#68766e', fontSize: 14, lineHeight: 22 },
  storyBlock: { width: '100%', maxWidth: 1240, alignSelf: 'center', paddingHorizontal: 24, paddingBottom: 68, gap: 30 },
  storyBlockWide: { flexDirection: 'row', alignItems: 'center' },
  detailImage: { width: '100%', height: 300, backgroundColor: '#d8cfc1' },
  detailImageWide: { flex: 1, width: undefined },
  storyCopy: { flex: 1, paddingHorizontal: 4 },
  storyTitle: { color: '#1b3933', fontSize: 34, lineHeight: 39, fontWeight: '800', marginBottom: 16 },
  storyText: { color: '#68766e', fontSize: 15, lineHeight: 24, marginBottom: 24 },
  outlineButton: { borderWidth: 1, borderColor: '#c86d4e', alignSelf: 'flex-start', paddingHorizontal: 17, paddingVertical: 13, borderRadius: 2 },
  outlineButtonText: { color: '#a9533b', fontSize: 12, fontWeight: '800' },
  bottomCta: { width: '100%', backgroundColor: '#dbe4d9', paddingHorizontal: 24, paddingVertical: 58, alignItems: 'center' },
  bottomCtaTitle: { color: '#1b3933', fontSize: 34, fontWeight: '800', textAlign: 'center' },
  bottomCtaText: { color: '#5f7066', fontSize: 15, marginTop: 10, marginBottom: 24, textAlign: 'center' },
  darkButton: { backgroundColor: '#1b3933', paddingHorizontal: 22, paddingVertical: 15, borderRadius: 2 },
  darkButtonText: { color: '#fffaf3', fontSize: 13, fontWeight: '800' },
  footer: { width: '100%', maxWidth: 1240, alignSelf: 'center', paddingHorizontal: 24, paddingVertical: 30, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 18 },
  footerBrand: { color: '#1b3933', fontSize: 15, fontWeight: '900', letterSpacing: 1.4 },
  footerText: { color: '#7a8177', fontSize: 12 },
  footerLinks: { flexDirection: 'row', gap: 18 },
  footerLink: { color: '#4c5c55', fontSize: 12, fontWeight: '700' },
});
