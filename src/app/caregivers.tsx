import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { caregivers } from '../data/mockData';

export default function CaregiversScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>Caregiver matches</Text>
      <Text style={styles.subtitle}>Available professionals for your care plan.</Text>

      {caregivers.map((caregiver) => (
        <View key={caregiver.id} style={styles.card}>
          <View style={styles.headerRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{caregiver.name.charAt(0)}</Text>
            </View>
            <View style={styles.titleBlock}>
              <Text style={styles.name}>{caregiver.name}</Text>
              <Text style={styles.specialty}>{caregiver.specialty}</Text>
            </View>
            <Text style={styles.rating}>★ {caregiver.rating}</Text>
          </View>

          <Text style={styles.availability}>{caregiver.availability}</Text>
          <Text style={styles.bio}>{caregiver.bio}</Text>

          <Link href={{ pathname: '/book', params: { service: 'Any Support Needed' } }} asChild>
            <Pressable style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Choose caregiver</Text>
            </Pressable>
          </Link>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f4f9f9',
  },
  contentContainer: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 30,
    fontWeight: '800',
    color: '#123532',
    marginBottom: 6,
  },
  subtitle: {
    color: '#54706d',
    fontSize: 14,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#dfeae9',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#dff7f4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#0f766e',
    fontWeight: '800',
    fontSize: 18,
  },
  titleBlock: {
    flex: 1,
  },
  name: {
    color: '#163734',
    fontSize: 18,
    fontWeight: '800',
  },
  specialty: {
    color: '#58706d',
    fontSize: 12,
    marginTop: 2,
  },
  rating: {
    color: '#0f766e',
    fontWeight: '700',
    fontSize: 13,
  },
  availability: {
    color: '#0f766e',
    fontWeight: '700',
    fontSize: 12,
    marginBottom: 8,
  },
  bio: {
    color: '#4d5d5a',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 14,
  },
  primaryButton: {
    backgroundColor: '#0f766e',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
});
