export type CareOption = {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  rating: number;
  fit: string;
};

export const careOptions: CareOption[] = [
  {
    id: 'any-support',
    title: 'Any Support Needed',
    description: 'Flexible home support for daily routines, respite, companionship, recovery, and personal care.',
    price: 'Custom quote',
    duration: 'Flexible timing',
    rating: 5.0,
    fit: 'Works for everything',
  },
  {
    id: 'companionship',
    title: 'Companionship Care',
    description: 'Warm support for conversation, respite breaks, and daily routines.',
    price: '$34/hr',
    duration: '1-3 hours',
    rating: 4.9,
    fit: 'Best for social support',
  },
  {
    id: 'personal-care',
    title: 'Personal Care',
    description: 'Bathing, hygiene, and mobility assistance with a kind, reliable caregiver.',
    price: '$42/hr',
    duration: '2-4 hours',
    rating: 4.8,
    fit: 'Best for daily living',
  },
  {
    id: 'post-surgery',
    title: 'Post-Surgery Recovery',
    description: 'Structured check-ins for medication reminders and recovery support at home.',
    price: '$48/hr',
    duration: '3-6 hours',
    rating: 5.0,
    fit: 'Best for recovery plans',
  },
];

export const upcomingVisits = [
  {
    day: 'Tomorrow',
    time: '9:30 AM',
    type: 'Personal Care',
    caregiver: 'Maya W.',
  },
  {
    day: 'Wed',
    time: '2:00 PM',
    type: 'Companionship',
    caregiver: 'Jordan P.',
  },
  {
    day: 'Fri',
    time: '11:15 AM',
    type: 'Meal Support',
    caregiver: 'Alicia D.',
  },
];

export const caregivers = [
  {
    id: 'maya',
    name: 'Maya W.',
    specialty: 'Personal care & mobility',
    rating: 4.9,
    availability: 'Available tomorrow',
    bio: 'Warm, dependable support for bathing, transfers, and everyday routines.',
  },
  {
    id: 'jordan',
    name: 'Jordan P.',
    specialty: 'Companionship & respite',
    rating: 4.8,
    availability: 'Open this week',
    bio: 'Good fit for conversation, check-ins, and helping clients stay engaged at home.',
  },
  {
    id: 'alicia',
    name: 'Alicia D.',
    specialty: 'Meal support & recovery',
    rating: 5.0,
    availability: 'Booked for Friday',
    bio: 'Experienced in recovery routines, reminder support, and meal planning assistance.',
  },
];

export const availabilitySlots = [
  'Mon • 9:00 AM',
  'Tue • 1:30 PM',
  'Wed • 10:15 AM',
  'Thu • 3:00 PM',
  'Fri • 11:00 AM',
];

export const bookings = [
  {
    id: 'bk-101',
    service: 'Personal Care',
    date: 'Tue, Sep 30',
    time: '10:30 AM',
    status: 'Confirmed',
    caregiver: 'Maya W.',
    amount: '$142.00',
  },
  {
    id: 'bk-102',
    service: 'Companionship',
    date: 'Thu, Oct 3',
    time: '2:00 PM',
    status: 'Requested',
    caregiver: 'Pending match',
    amount: '$68.00',
  },
  {
    id: 'bk-103',
    service: 'Meal Support',
    date: 'Sat, Oct 5',
    time: '9:00 AM',
    status: 'Completed',
    caregiver: 'Alicia D.',
    amount: '$96.00',
  },
];
