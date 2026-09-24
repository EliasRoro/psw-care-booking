import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>PSW Care Booking</Text>
        <Text style={styles.title}>Book trusted home care in Ontario.</Text>
        <Text style={styles.text}>
          Families can request support, and vetted PSWs can accept visits through a simple, secure process.
        </Text>

        <View style={styles.actions}>
          <Link href="/signup" asChild>
            <Pressable style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Create account</Text>
            </Pressable>
          </Link>

          <Link href="/login" asChild>
            <Pressable style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Log in</Text>
            </Pressable>
          </Link>
        </View>

        <Text style={styles.footerText}>By continuing, you agree to our privacy policy and consent terms.</Text>

        <Link href="/book" asChild>
          <Pressable>
            <Text style={styles.linkText}>Preview the booking flow</Text>
          </Pressable>
        </Link>

        <Link href="/my-bookings" asChild>
          <Pressable style={styles.bookingsButton}>
            <Text style={styles.bookingsButtonText}>View my bookings</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3faf9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 420,
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
    color: '#0f766e',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  title: {
    color: '#123532',
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 12,
  },
  text: {
    color: '#4b5d5a',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 22,
  },
  actions: {
    gap: 12,
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
  secondaryButton: {
    backgroundColor: '#ecfdf5',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#b7f0d8',
  },
  secondaryButtonText: {
    color: '#0f766e',
    fontWeight: '700',
  },
  footerText: {
    color: '#5f7673',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 18,
    marginBottom: 12,
  },
  linkText: {
    color: '#0f766e',
    fontWeight: '700',
    textAlign: 'center',
  },
  bookingsButton: {
    backgroundColor: '#ecfdf5',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#b7f0d8',
  },
  bookingsButtonText: {
    color: '#0f766e',
    fontWeight: '700',
  },
});
