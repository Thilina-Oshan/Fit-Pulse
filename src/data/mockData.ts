import { Member, POSItem, WorkoutPlan, DietPlan } from '../types';

export const mockMembers: Member[] = [
  {
    id: 'MEM-001',
    name: 'Kasun Kalhara',
    email: 'kasun@example.com',
    phone: '+94 77 123 4567',
    plan: 'Annual',
    status: 'Active',
    expiryDate: '2027-03-15',
    qrCode: 'QR-MEM-001',
    trainerAssigned: 'Nimal Siripala',
    bmi: 23.4,
    weight: 72,
    height: 175
  },
  {
    id: 'MEM-002',
    name: 'Saman Perera',
    email: 'saman@example.com',
    phone: '+94 71 987 6543',
    plan: 'Monthly',
    status: 'Active',
    expiryDate: '2026-10-10',
    qrCode: 'QR-MEM-002',
    trainerAssigned: 'Kamal Silva',
    bmi: 26.1,
    weight: 84,
    height: 180
  },
  {
    id: 'MEM-003',
    name: 'Dilini Fernando',
    email: 'dilini@example.com',
    phone: '+94 75 444 3322',
    plan: 'Quarterly',
    status: 'Expired',
    expiryDate: '2026-08-01',
    qrCode: 'QR-MEM-003',
    trainerAssigned: 'Nimal Siripala',
    bmi: 21.8,
    weight: 58,
    height: 163
  }
];

export const mockPOSItems: POSItem[] = [
  {
    id: 'P-101',
    name: 'Optimum Nutrition Gold Standard Whey 5lbs',
    category: 'Supplement',
    price: 32000,
    stock: 14,
    image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=300'
  },
  {
    id: 'P-102',
    name: 'Creatine Monohydrate 300g',
    category: 'Supplement',
    price: 11500,
    stock: 22,
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=300'
  },
  {
    id: 'P-103',
    name: 'FitPulse Pro Gym Shaker Bottle',
    category: 'Merchandise',
    price: 2500,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?w=300'
  },
  {
    id: 'P-104',
    name: 'Locker Rental (Monthly)',
    category: 'Rental',
    price: 3000,
    stock: 10,
    image: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=300'
  }
];

export const mockWorkoutPlans: WorkoutPlan[] = [
  {
    id: 'WP-01',
    title: 'Hypertrophy Upper/Lower Split',
    target: 'Muscle Building',
    exercises: [
      { name: 'Barbell Bench Press', sets: 4, reps: '8-10', rest: '90s' },
      { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', rest: '60s' },
      { name: 'Lat Pulldowns', sets: 4, reps: '10-12', rest: '60s' },
      { name: 'Barbell Squats', sets: 4, reps: '6-8', rest: '120s' }
    ]
  }
];

export const mockDietPlans: DietPlan[] = [
  {
    id: 'DP-01',
    title: 'High Protein Clean Bulk (2800 kcal)',
    calories: 2800,
    meals: [
      { time: '08:00 AM', description: 'Oats with Whey Protein & Banana', protein: '40g' },
      { time: '01:00 PM', description: 'Grilled Chicken Breast with Brown Rice & Veggies', protein: '55g' },
      { time: '05:00 PM', description: 'Pre-Workout Greek Yogurt & Almonds', protein: '20g' },
      { time: '08:30 PM', description: 'Fish Filet with Sweet Potato & Salad', protein: '45g' }
    ]
  }
];
