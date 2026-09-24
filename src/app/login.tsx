import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { hasSupabaseConfig, supabase } from '../lib/supabase';

type Workspace = 'client' | 'psw';

const workspaceDetails: Record<Workspace, { label: string; description: string }> = {
  client: { label: 'Client', description: 'Request care and manage visits' },
  psw: { label: 'PSW', description: 'Manage visits and availability' },
};

const workspaceRoutes: Record<Workspace, '/client-dashboard' | '/psw-dashboard'> = {
  client: '/client-dashboard',
  psw: '/psw-dashboard',
};

export default function LoginScreen() {
  const [email, setEmail] = useState('caregiver@example.com');
  const [password, setPassword] = useState('Password123!');
  const [workspace, setWorkspace] = useState<Workspace>('client');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing details', 'Please enter both email and password.');
      return;
    }

    if (!hasSupabaseConfig) {
      router.replace(workspaceRoutes[workspace]);
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        Alert.alert('Login failed', error.message);
        return;
      }

      const accountWorkspace = data.user.user_metadata?.role as Workspace | undefined;
      router.replace(workspaceRoutes[accountWorkspace && accountWorkspace in workspaceRoutes ? accountWorkspace : workspace]);
    } catch (error) {
      Alert.alert('Unexpected error', error instanceof Error ? error.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>PSW / CARE</Text>
        <Text style={styles.title}>Choose your workspace</Text>
        <Text style={styles.subtitle}>Sign in to continue to the part of care you manage.</Text>

        <View style={styles.workspaceRow}>
          {(Object.keys(workspaceDetails) as Workspace[]).map((option) => {
            const selected = workspace === option;

            return (
              <Pressable key={option} style={[styles.workspaceCard, selected && styles.workspaceCardSelected]} onPress={() => setWorkspace(option)}>
                <Text style={[styles.workspaceLabel, selected && styles.workspaceLabelSelected]}>{workspaceDetails[option].label}</Text>
                <Text style={styles.workspaceDescription}>{workspaceDetails[option].description}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="you@example.com"
          style={styles.input}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Your password"
          style={styles.input}
        />

        <Pressable style={styles.primaryButton} onPress={handleLogin} disabled={loading}>
          <Text style={styles.primaryButtonText}>{loading ? 'Signing in...' : `Continue as ${workspaceDetails[workspace].label}`}</Text>
        </Pressable>
        {!hasSupabaseConfig ? <Text style={styles.demoNote}>Demo workspace access is active until Supabase credentials are connected.</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3faf9',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#0f172a',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  eyebrow: {
    color: '#c86d4e',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.6,
    marginBottom: 12,
  },
  title: {
    color: '#123532',
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: '#57706d',
    marginBottom: 18,
  },
  workspaceRow: {
    gap: 8,
    marginBottom: 20,
  },
  workspaceCard: {
    borderWidth: 1,
    borderColor: '#dfeae9',
    backgroundColor: '#f8fbfb',
    padding: 13,
    borderRadius: 12,
  },
  workspaceCardSelected: {
    borderColor: '#0f766e',
    backgroundColor: '#ecfdf5',
  },
  workspaceLabel: {
    color: '#234541',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 3,
  },
  workspaceLabelSelected: {
    color: '#0f766e',
  },
  workspaceDescription: {
    color: '#657773',
    fontSize: 12,
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
  primaryButton: {
    backgroundColor: '#0f766e',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  demoNote: {
    color: '#75827e',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 13,
    textAlign: 'center',
  },
});
