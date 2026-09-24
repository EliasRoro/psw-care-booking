import AsyncStorage from '@react-native-async-storage/async-storage';

const onboardingStorageKey = 'psw-care-booking.onboarding-steps';

export async function getCompletedOnboardingSteps(): Promise<string[]> {
  const storedSteps = await AsyncStorage.getItem(onboardingStorageKey);

  if (!storedSteps) {
    return [];
  }

  try {
    const parsedSteps = JSON.parse(storedSteps);
    return Array.isArray(parsedSteps) ? parsedSteps.filter((step): step is string => typeof step === 'string') : [];
  } catch {
    return [];
  }
}

export async function saveCompletedOnboardingSteps(stepIds: string[]): Promise<void> {
  await AsyncStorage.setItem(onboardingStorageKey, JSON.stringify(stepIds));
}
