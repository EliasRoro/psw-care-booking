import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { careOptions } from '../data/mockData';
import { createBookingRequest } from '../lib/bookingService';

export default function BookScreen() {
  const params = useLocalSearchParams<{ service?: string }>();
  const initialService = params.service || careOptions[0].title;

  const [service, setService] = useState(initialService);
  const [clientName, setClientName] = useState('Client or family member');
  const [date, setDate] = useState('Any available date');
  const [time, setTime] = useState('Flexible time');
  const [notes, setNotes] = useState('Tell us what support you need and we will match the best care plan.');

  const selectedOption = useMemo(
    () => careOptions.find((option) => option.title === service) ?? careOptions[0],
    [service],
  );

  const handleConfirm = async () => {
    await createBookingRequest({
      service,
      date,
      time,
      amount: selectedOption.price,
      clientName,
      notes,
    });

    router.push({
      pathname: '/confirmation',
      params: {
        service,
        clientName,
        date,
        time,
        notes,
      },
    });
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>Book a care visit</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Care type</Text>
        {careOptions.map((option) => {
          const isSelected = option.title === service;

          return (
            <Pressable
              key={option.id}
              style={[styles.serviceCard, isSelected && styles.serviceCardSelected]}
              onPress={() => setService(option.title)}
            >
              <Text style={styles.serviceTitle}>{option.title}</Text>
              <Text style={styles.serviceMeta}>{option.price} • {option.duration}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Client name</Text>
        <TextInput
          style={styles.input}
          value={clientName}
          onChangeText={setClientName}
          placeholder="Client name"
        />

        <Text style={styles.label}>Preferred date</Text>
        <TextInput
          style={styles.input}
          value={date}
          onChangeText={setDate}
          placeholder="Date"
        />

        <Text style={styles.label}>Preferred time</Text>
        <TextInput
          style={styles.input}
          value={time}
          onChangeText={setTime}
          placeholder="Time"
        />

        <Text style={styles.label}>Care notes</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
          value={notes}
          onChangeText={setNotes}
          placeholder="Describe the visit"
        />
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Selected plan</Text>
        <Text style={styles.summaryService}>{selectedOption.title}</Text>
        <Text style={styles.summaryText}>{selectedOption.description}</Text>
      </View>

      <Pressable style={styles.primaryButton} onPress={handleConfirm}>
        <Text style={styles.primaryButtonText}>Confirm booking</Text>
      </Pressable>
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
    paddingVertical: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: '800',
    color: '#123532',
    marginBottom: 18,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 18,
  },
  label: {
    color: '#3a5653',
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 10,
  },
  serviceCard: {
    borderWidth: 1,
    borderColor: '#dfeae9',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    backgroundColor: '#f8fbfb',
  },
  serviceCardSelected: {
    borderColor: '#0f766e',
    backgroundColor: '#ecfdf5',
  },
  serviceTitle: {
    fontWeight: '700',
    color: '#163734',
    fontSize: 15,
  },
  serviceMeta: {
    marginTop: 6,
    color: '#536863',
    fontSize: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dfeae9',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#f8fbfb',
    marginBottom: 14,
    color: '#1d2b2a',
    fontSize: 15,
  },
  textArea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  summaryCard: {
    backgroundColor: '#eaf9f7',
    borderRadius: 20,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#c5eeee',
  },
  summaryTitle: {
    color: '#1d4a48',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  summaryService: {
    fontSize: 18,
    fontWeight: '800',
    color: '#113230',
    marginBottom: 4,
  },
  summaryText: {
    color: '#48615f',
    fontSize: 13,
    lineHeight: 18,
  },
  primaryButton: {
    backgroundColor: '#0f766e',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
