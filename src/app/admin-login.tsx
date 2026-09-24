import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { hasSupabaseConfig, supabase } from '../lib/supabase';

export default function AdminLoginScreen() {
  const [email, setEmail] = useState('admin@pswcare.ca');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing details', 'Enter your admin email and password.');
      return;
    }

    if (!hasSupabaseConfig) {
      router.replace('/admin-dashboard');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        Alert.alert('Admin login failed', error.message);
        return;
      }

      if (data.user.user_metadata?.role !== 'admin') {
        await supabase.auth.signOut();
        Alert.alert('Admin access required', 'This account is not configured for the admin workspace.');
        return;
      }

      router.replace('/admin-dashboard');
    } catch (error) {
      Alert.alert('Unexpected error', error instanceof Error ? error.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>PRIVATE TEAM ACCESS</Text>
        <Text style={styles.title}>Admin sign in</Text>
        <Text style={styles.subtitle}>Use the private admin URL to manage requests, caregivers, and coverage.</Text>

        <Text style={styles.label}>Admin email</Text>
        <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholder="admin@pswcare.ca" style={styles.input} />

        <Text style={styles.label}>Password</Text>
        <TextInput value={password} onChangeText={setPassword} secureTextEntry placeholder="Your password" style={styles.input} />

        <Pressable style={styles.primaryButton} onPress={handleLogin} disabled={loading}>
          <Text style={styles.primaryButtonText}>{loading ? 'Signing in...' : 'Open admin dashboard'}</Text>
        </Pressable>

        {!hasSupabaseConfig ? <Text style={styles.demoNote}>Demo admin access is active until Supabase credentials are connected.</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7f4', justifyContent: 'center', padding: 24 },
  card: { width: '100%', maxWidth: 520, alignSelf: 'center', backgroundColor: '#fff', borderRadius: 18, padding: 24, borderWidth: 1, borderColor: '#dce6de' },
  eyebrow: { color: '#9c573e', fontSize: 11, fontWeight: '900', letterSpacing: 1.6, marginBottom: 12 },
  title: { color: '#203b36', fontSize: 30, fontWeight: '800', marginBottom: 8 },
  subtitle: { color: '#68766e', fontSize: 14, lineHeight: 21, marginBottom: 20 },
  label: { color: '#52655d', fontWeight: '800', fontSize: 13, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#dce6de', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12, marginBottom: 16, backgroundColor: '#f8faf7', color: '#203b36' },
  primaryButton: { backgroundColor: '#203b36', borderRadius: 11, paddingVertical: 14, alignItems: 'center', marginTop: 6 },
  primaryButtonText: { color: '#fff', fontWeight: '800' },
  demoNote: { color: '#7b867e', fontSize: 11, lineHeight: 16, marginTop: 13, textAlign: 'center' },
});