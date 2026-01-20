
export enum AppView {
  HOME = 'home',
  STORE = 'store',
  WELLNESS = 'wellness',
  ACCOUNT = 'account',
  DIET_PLAN = 'diet-plan',
  NUTRITION_GUIDE = 'nutrition-guide',
  YOGA = 'yoga',
  CONSULT = 'consult',
  PROFILE = 'profile',
  LAB_REPORTS = 'lab-reports',
  PRESCRIPTIONS = 'prescriptions',
  VITALS = 'vitals',
  SCANNER = 'scanner',
  EQUIPMENT_PORTAL = 'equipment-portal',
  PRODUCT_STUDIO = 'product-studio'
}

export enum Language {
  EN = 'English',
  HI = 'हिन्दी'
}

export interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
  image?: string;
}

export interface Specialist {
  id: string;
  name: string;
  description: string;
  fee: number;
  image: string;
  availability: 'available' | 'busy' | 'offline';
  specialty: string;
  experience: number;
  mciNumber: string;
  education: string;
  verificationSource: 'Ayushman Bharat' | 'MCI Verified' | 'Pulseplus Global';
}

export interface EquipmentItem {
  id: string;
  name: string;
  brand: string;
  category: 'Mobility' | 'Monitoring' | 'Respiratory' | 'Surgical';
  price: number;
  rentalPrice?: number;
  status: 'In Stock' | 'Available for Rent' | 'Out of Stock';
  image: string;
  description: string;
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

export interface HomeRemedy {
  name: string;
  benefits: string;
  ingredients: string[];
  preparation: string;
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

export interface StudioProject {
  id: string;
  original: string;
  edited: string;
  timestamp: number;
}
