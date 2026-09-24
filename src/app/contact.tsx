import { Link } from 'expo-router';
import { Linking, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { PublicHeader } from '../components/PublicHeader';

export default function ContactScreen() {
  const openEmail = () => Linking.openURL('mailto:hello@pswcare.ca');
  const openPhone = () => Linking.openURL('tel:+14165550184');

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.contentContainer}>
      <PublicHeader actionLabel="Book support" actionHref="/book" />

      <View style={styles.hero}>
        <Text style={styles.kicker}>CONTACT OUR TEAM</Text>
        <Text style={styles.title}>Let&apos;s make the next step feel simple.</Text>
        <Text style={styles.lede}>Whether you are arranging care for yourself or someone you love, we are here to help you understand the options.</Text>
      </View>

      <View style={styles.contactGrid}>
        <View style={styles.contactPanel}>
          <Text style={styles.panelKicker}>DIRECT SUPPORT</Text>
          <Text style={styles.panelTitle}>Talk with a person.</Text>
          <Text style={styles.body}>Our care team can answer questions about services, timing, and what to include in a request.</Text>
          <Pressable onPress={openPhone} style={styles.contactLine}><Text style={styles.contactLabel}>Call</Text><Text style={styles.contactValue}>416 555 0184</Text></Pressable>
          <Pressable onPress={openEmail} style={styles.contactLine}><Text style={styles.contactLabel}>Email</Text><Text style={styles.contactValue}>hello@pswcare.ca</Text></Pressable>
          <Text style={styles.hours}>Monday to Friday  |  9:00 AM - 5:00 PM ET</Text>
        </View>

        <View style={styles.formPanel}>
          <Text style={styles.panelKicker}>SEND A NOTE</Text>
          <Text style={styles.panelTitle}>What can we help with?</Text>
          <TextInput style={styles.input} placeholder="Your name" placeholderTextColor="#8a9188" />
          <TextInput style={styles.input} placeholder="Email address" placeholderTextColor="#8a9188" keyboardType="email-address" autoCapitalize="none" />
          <TextInput style={[styles.input, styles.messageInput]} placeholder="Tell us a little about what you need" placeholderTextColor="#8a9188" multiline />
          <Pressable onPress={openEmail} style={styles.primaryButton}><Text style={styles.primaryButtonText}>Open email to send</Text></Pressable>
          <Text style={styles.formNote}>Please leave medical diagnoses and clinical details out of your message.</Text>
        </View>
      </View>

      <View style={styles.footerCta}>
        <Text style={styles.footerTitle}>Already know what you need?</Text>
        <Link href="/book" asChild><Pressable style={styles.darkButton}><Text style={styles.darkButtonText}>Go to booking</Text></Pressable></Link>
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
  hero: { maxWidth: 920, width: '100%', alignSelf: 'center', paddingHorizontal: 24, paddingVertical: 38 },
  kicker: { color: '#c86d4e', fontSize: 10, fontWeight: '900', letterSpacing: 1.6, marginBottom: 16 },
  title: { color: '#1b3933', fontSize: 46, lineHeight: 52, fontWeight: '800' },
  lede: { color: '#68766e', fontSize: 17, lineHeight: 26, marginTop: 18, maxWidth: 620 },
  contactGrid: { maxWidth: 1100, width: '100%', alignSelf: 'center', paddingHorizontal: 24, gap: 24 },
  contactPanel: { backgroundColor: '#dbe4d9', padding: 26 },
  formPanel: { backgroundColor: '#fffaf3', borderWidth: 1, borderColor: '#ddd3c6', padding: 26 },
  panelKicker: { color: '#c86d4e', fontSize: 10, fontWeight: '900', letterSpacing: 1.5, marginBottom: 14 },
  panelTitle: { color: '#1b3933', fontSize: 25, fontWeight: '800', marginBottom: 12 },
  body: { color: '#68766e', fontSize: 14, lineHeight: 22, maxWidth: 420 },
  contactLine: { borderTopWidth: 1, borderTopColor: '#becdbd', paddingVertical: 14, marginTop: 17 },
  contactLabel: { color: '#6a7a6e', fontSize: 11, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  contactValue: { color: '#1b3933', fontSize: 17, fontWeight: '800' },
  hours: { color: '#6a7a6e', fontSize: 12, marginTop: 8 },
  input: { borderWidth: 1, borderColor: '#d9d0c4', backgroundColor: '#f7f3ec', paddingHorizontal: 13, paddingVertical: 13, marginTop: 12, color: '#1b3933', fontSize: 14 },
  messageInput: { minHeight: 110, textAlignVertical: 'top' },
  primaryButton: { backgroundColor: '#c86d4e', paddingHorizontal: 18, paddingVertical: 14, borderRadius: 2, alignSelf: 'flex-start', marginTop: 16 },
  primaryButtonText: { color: '#fffaf3', fontSize: 13, fontWeight: '800' },
  formNote: { color: '#8a9188', fontSize: 11, lineHeight: 16, marginTop: 14, maxWidth: 360 },
  footerCta: { backgroundColor: '#1b3933', marginTop: 60, paddingHorizontal: 24, paddingVertical: 46, alignItems: 'center', gap: 20 },
  footerTitle: { color: '#f7f3ec', fontSize: 25, fontWeight: '800', textAlign: 'center' },
  darkButton: { backgroundColor: '#c86d4e', paddingHorizontal: 20, paddingVertical: 14, borderRadius: 2 },
  darkButtonText: { color: '#fffaf3', fontSize: 13, fontWeight: '800' },
});
