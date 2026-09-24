import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { hasSupabaseConfig, supabase } from '../lib/supabase';

export default function SignUpScreen() {
  const [firstName, setFirstName] = useState('Avery');
  const [lastName, setLastName] = useState('Thompson');
  const [email, setEmail] = useState('avery@example.com');
  const [password, setPassword] = useState('Password123!');
  const [role, setRole] = useState<'client' | 'psw'>('client');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert('Missing details', 'Please complete all fields before continuing.');
      return;
    }

    if (!hasSupabaseConfig) {
      Alert.alert(
        'Supabase not configured',
        'Add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY to your .env file.',
      );
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            role,
          },
        },
      });

      if (error) {
        Alert.alert('Sign up failed', error.message);
        return;
      }

      Alert.alert('Account created', 'Please confirm your email in Supabase before logging in.');
      router.replace('/login');
    } catch (error) {
      Alert.alert('Unexpected error', error instanceof Error ? error.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Create your account</Text>
      <Text style={styles.subtitle}>Choose the role that matches how you want to use the app.</Text>

      <View style={styles.roleRow}>
        <Pressable
          style={[styles.roleCard, role === 'client' && styles.roleCardSelected]}
          onPress={() => setRole('client')}
        >
          <Text style={[styles.roleText, role === 'client' && styles.roleTextSelected]}>Client</Text>
        </Pressable>

        <Pressable
          style={[styles.roleCard, role === 'psw' && styles.roleCardSelected]}
          onPress={() => setRole('psw')}
        >
          <Text style={[styles.roleText, role === 'psw' && styles.roleTextSelected]}>PSW</Text>
        </Pressable>
      </View>

      <Text style={styles.label}>First name</Text>
      <TextInput value={firstName} onChangeText={setFirstName} style={styles.input} />

      <Text style={styles.label}>Last name</Text>
      <TextInput value={lastName} onChangeText={setLastName} style={styles.input} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />

      <Text style={styles.notice}>Do not enter medical diagnoses or personal clinical information in notes.</Text>

      <Pressable style={styles.primaryButton} onPress={handleSignUp} disabled={loading}>
        <Text style={styles.primaryButtonText}>{loading ? 'Creating account...' : 'Sign up'}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f3faf9',
  },
  contentContainer: {
    padding: 24,
  },
  title: {
    color: '#123532',
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: '#59706d',
    fontSize: 14,
    marginBottom: 18,
  },
  roleRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  roleCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#dfeae9',
    borderRadius: 14,
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    alignItems: 'center',
  },
  roleCardSelected: {
    borderColor: '#0f766e',
    backgroundColor: '#ecfdf5',
  },
  roleText: {
    color: '#163734',
    fontWeight: '700',
  },
  roleTextSelected: {
    color: '#0f766e',
  },
  label: {
    color: '#234541',
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dfeae9',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 16,
    backgroundColor: '#f8fbfb',
  },
  notice: {
    color: '#5f7673',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: '#0f766e',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
});
