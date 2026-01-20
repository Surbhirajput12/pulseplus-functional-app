
import { StudioProject, Appointment } from '../types';

const KEYS = {
  CART_COUNT: 'pulseplus_cart_count',
  RECORDS: 'pulseplus_health_records',
  STUDIO_PROJECTS: 'pulseplus_studio_projects',
  USER_SESSION: 'pulseplus_user_session',
  APPOINTMENTS: 'pulseplus_appointments'
};

export const storage = {
  getCartCount: (): number => Number(localStorage.getItem(KEYS.CART_COUNT)) || 0,
  setCartCount: (count: number) => localStorage.setItem(KEYS.CART_COUNT, count.toString()),
  
  getStudioProjects: (): StudioProject[] => {
    const data = localStorage.getItem(KEYS.STUDIO_PROJECTS);
    return data ? JSON.parse(data) : [];
  },
  saveStudioProject: (project: StudioProject) => {
    const projects = storage.getStudioProjects();
    localStorage.setItem(KEYS.STUDIO_PROJECTS, JSON.stringify([project, ...projects]));
  },
  
  getAppointments: (): Appointment[] => {
    const data = localStorage.getItem(KEYS.APPOINTMENTS);
    return data ? JSON.parse(data) : [];
  },
  saveAppointment: (appointment: Appointment) => {
    const appointments = storage.getAppointments();
    localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify([appointment, ...appointments]));
  },
  
  logout: () => {
    localStorage.removeItem(KEYS.USER_SESSION);
  },
  login: (id: string) => {
    localStorage.setItem(KEYS.USER_SESSION, JSON.stringify({ id, timestamp: Date.now() }));
  },
  isLoggedIn: () => !!localStorage.getItem(KEYS.USER_SESSION)
};
