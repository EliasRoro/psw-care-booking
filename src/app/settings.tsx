import { Link } from 'expo-router';
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useState } from 'react';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);

  const showComingSoon = (title: string) => {
    Alert.alert(title, 'This account action will be connected to Supabase in the next backend milestone.');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>ACCOUNT</Text>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Your profile, preferences, and privacy controls.</Text>

      <View style={styles.profileCard}>
        <View style={styles.avatar}><Text style={styles.avatarText}>A</Text></View>
        <View style={styles.profileCopy}><Text style={styles.profileName}>Avery Thompson</Text><Text style={styles.profileEmail}>avery@example.com</Text></View>
        <Pressable onPress={() => showComingSoon('Edit profile')}><Text style={styles.edit}>Edit</Text></Pressable>
      </View>

      <Text style={styles.sectionTitle}>Preferences</Text>
      <View style={styles.panel}>
        <View style={styles.settingRow}><View style={styles.settingCopy}><Text style={styles.settingTitle}>Visit updates</Text><Text style={styles.settingText}>Receive reminders and booking changes.</Text></View><Switch value={notifications} onValueChange={setNotifications} trackColor={{ false: '#d9e2df', true: '#9acfc2' }} thumbColor={notifications ? '#0f766e' : '#fff'} /></View>
      </View>

      <Text style={styles.sectionTitle}>Privacy and data</Text>
      <View style={styles.panel}>
        <Pressable style={styles.actionRow} onPress={() => showComingSoon('Export my data')}><View><Text style={styles.settingTitle}>Export my data</Text><Text style={styles.settingText}>Request a copy of your account information.</Text></View><Text style={styles.arrow}>{'>'}</Text></Pressable>
        <Pressable style={styles.actionRow} onPress={() => showComingSoon('Privacy policy')}><View><Text style={styles.settingTitle}>Privacy policy</Text><Text style={styles.settingText}>Read how PSW Care handles personal information.</Text></View><Text style={styles.arrow}>{'>'}</Text></Pressable>
      </View>

      <View style={styles.warning}><Text style={styles.warningTitle}>Keep notes non-clinical</Text><Text style={styles.warningText}>Do not store medical diagnoses, medication details, or clinical records in booking notes.</Text></View>

      <Pressable style={styles.deleteButton} onPress={() => showComingSoon('Delete account')}><Text style={styles.deleteText}>Request account deletion</Text></Pressable>
      <Link href="/" asChild><Pressable style={styles.homeButton}><Text style={styles.homeText}>Back to home</Text></Pressable></Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f4f9f9' },
  content: { padding: 20, paddingBottom: 48, maxWidth: 700, width: '100%', alignSelf: 'center' },
  eyebrow: { color: '#0f766e', fontSize: 11, fontWeight: '900', letterSpacing: 1.5 },
  title: { color: '#123532', fontSize: 31, fontWeight: '800', marginTop: 8 },
  subtitle: { color: '#61736f', fontSize: 14, marginTop: 6, marginBottom: 22 },
  profileCard: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#dfeae9', borderRadius: 16, padding: 17, flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#dbeee9', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  avatarText: { color: '#0f766e', fontSize: 18, fontWeight: '900' },
  profileCopy: { flex: 1 },
  profileName: { color: '#163734', fontSize: 16, fontWeight: '800' },
  profileEmail: { color: '#6a7b76', fontSize: 12, marginTop: 4 },
  edit: { color: '#0f766e', fontSize: 12, fontWeight: '800' },
  sectionTitle: { color: '#123532', fontSize: 18, fontWeight: '800', marginTop: 26, marginBottom: 11 },
  panel: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#dfeae9', borderRadius: 16, paddingHorizontal: 16 },
  settingRow: { paddingVertical: 16, flexDirection: 'row', alignItems: 'center' },
  settingCopy: { flex: 1, paddingRight: 14 },
  settingTitle: { color: '#163734', fontSize: 14, fontWeight: '800' },
  settingText: { color: '#6a7b76', fontSize: 12, lineHeight: 18, marginTop: 4 },
  actionRow: { paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#edf2f2', flexDirection: 'row', alignItems: 'center' },
  arrow: { color: '#0f766e', fontSize: 20, fontWeight: '700' },
  warning: { backgroundColor: '#fff6ee', borderWidth: 1, borderColor: '#f0d4bf', borderRadius: 14, padding: 15, marginTop: 24 },
  warningTitle: { color: '#9c573e', fontSize: 14, fontWeight: '800' },
  warningText: { color: '#7e6a5e', fontSize: 12, lineHeight: 18, marginTop: 5 },
  deleteButton: { alignSelf: 'center', paddingVertical: 18 },
  deleteText: { color: '#a34d42', fontSize: 12, fontWeight: '800' },
  homeButton: { alignSelf: 'center', backgroundColor: '#0f766e', borderRadius: 12, paddingHorizontal: 18, paddingVertical: 13 },
  homeText: { color: '#fff', fontSize: 13, fontWeight: '800' },
});
