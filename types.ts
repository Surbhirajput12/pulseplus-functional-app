
export enum AppView {
  HOME = 'home',
  STORE = 'store',
  DIET_PLAN = 'diet_plan',
  NUTRITION_GUIDE = 'nutrition_guide',
  YOGA = 'yoga',
  ACCOUNT = 'account',
  EQUIPMENT_PORTAL = 'equipment_portal',
  PROFILE = 'profile',
  LAB_REPORTS = 'lab_reports',
  PRESCRIPTIONS = 'prescriptions',
  VITALS = 'vitals',
  CONSULT = 'consult',
  SCANNER = 'scanner',
  WELLNESS = 'wellness'
}

export enum Language {
  EN = 'en',
  HI = 'hi'
}

export interface ChatMessage {
  role: 'bot' | 'user';
  text: string;
  image?: string;
}

export interface Specialist {
  id: string;
  name: string;
  specialty: string;
  description: string;
  fee: number;
  image: string;
  availability: 'available' | 'busy' | 'offline';
  experience: number;
  mciNumber: string;
  education: string;
  verificationSource: string;
}

export interface Appointment {
  id: string;
  specialistId: string;
  specialistName: string;
  date: string;
  time: string;
  reminderType: 'email' | 'sms' | 'both' | 'none';
  reminderTiming: '24h' | '1h' | '15m';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  category: 'Medicine' | 'Skincare' | 'Supplements' | 'Equipment' | 'Wellness';
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface DietLog {
  id: string;
  item: string;
  calories: number;
  type: 'food' | 'water';
  timestamp: number;
}

export interface DietAnalysis {
  foodItem: string;
  macros: {
    protein: string;
    carbs: string;
    fats: string;
    fiber: string;
  };
  healthScore: number;
  warnings: string[];
  alternatives: string[];
}

export interface EquipmentItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  rentalPrice?: number;
  status: string;
  image: string;
  description: string;
}

export interface HomeRemedy {
  name: string;
  benefits: string;
  ingredients: string[];
  preparation: string;
}

export interface StudioProject {
  id: string;
  original: string;
  edited: string;
  prompt: string;
  timestamp: number;
}
