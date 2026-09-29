export type UserRole = 'ADMIN' | 'TRAINER' | 'MEMBER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: 'Monthly' | 'Quarterly' | 'Annual' | 'VIP';
  status: 'Active' | 'Pending' | 'Expired';
  expiryDate: string;
  qrCode: string;
  trainerAssigned?: string;
  bmi: number;
  weight: number;
  height: number;
}

export interface WorkoutPlan {
  id: string;
  title: string;
  target: string;
  exercises: {
    name: string;
    sets: number;
    reps: string;
    rest: string;
  }[];
}

export interface DietPlan {
  id: string;
  title: string;
  calories: number;
  meals: {
    time: string;
    description: string;
    protein: string;
  }[];
}

export interface POSItem {
  id: string;
  name: string;
  category: 'Supplement' | 'Merchandise' | 'Rental';
  price: number;
  stock: number;
  image: string;
}
