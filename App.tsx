
import React, { useState, useEffect } from 'react';
import { AppView, Language } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SpecialistGrid from './components/SpecialistGrid';
import AskScan from './components/AskScan';
import StoreSection from './components/StoreSection';
import RecordsSection from './components/RecordsSection';
import DietPlanView from './components/DietPlanView';
import NutritionGuideView from './components/NutritionGuideView';
import YogaView from './components/YogaView';
import PrescriptionScanner from './components/PrescriptionScanner';
import ProfileView from './components/ProfileView';
import LabReportsView from './components/LabReportsView';
import VitalsView from './components/VitalsView';
import PrescriptionsView from './components/PrescriptionsView';
import EquipmentPortal from './components/EquipmentPortal';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [lang, setLang] = useState<Language>(Language.EN);
  const [cartCount, setCartCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('pulseplus_theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    const storedCart = localStorage.getItem('pulseplusCartCount');
    if (storedCart) setCartCount(parseInt(storedCart));
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('pulseplus_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('pulseplus_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  const toggleLang = () => setLang(prev => prev === Language.EN ? Language.HI : Language.EN);

  const renderContent = () => {
    switch (currentView) {
      case AppView.HOME:
        return (
          <div className="space-y-16 pb-20 w-full animate-in fade-in duration-500">
            <Hero onNavigate={setCurrentView} lang={lang} />
            <div id="consult" className="w-full">
              <SpecialistGrid onNavigate={setCurrentView} />
            </div>
          </div>
        );
      case AppView.STORE:
        return <StoreSection onNavigate={setCurrentView} onAddToCart={() => setCartCount(c => c + 1)} />;
      case AppView.WELLNESS:
        return <AskScan onNavigate={setCurrentView} />;
      case AppView.ACCOUNT:
        return <RecordsSection onNavigate={setCurrentView} />;
      case AppView.DIET_PLAN:
        return <DietPlanView onBack={() => setCurrentView(AppView.WELLNESS)} />;
      case AppView.NUTRITION_GUIDE:
        return <NutritionGuideView onBack={() => setCurrentView(AppView.WELLNESS)} onNavigate={setCurrentView} />;
      case AppView.YOGA:
        return <YogaView onBack={() => setCurrentView(AppView.NUTRITION_GUIDE)} />;
      case AppView.CONSULT:
        return (
          <div className="py-12 bg-white dark:bg-[#0b0f1a] min-h-screen w-full">
            <div className="max-w-7xl mx-auto px-6 py-10 space-y-6 text-center">
              <h1 className="text-5xl md:text-7xl font-black text-[#1e2a3a] dark:text-white tracking-tighter leading-tight">Tele-Health Portal</h1>
              <p className="text-slate-500 dark:text-slate-400 text-xl font-medium max-w-2xl mx-auto leading-relaxed">Verified Ayushman doctors available for deep consultation.</p>
            </div>
            <SpecialistGrid onNavigate={setCurrentView} isDedicatedPage={true} />
          </div>
        );
      case AppView.SCANNER:
        return <PrescriptionScanner onBack={() => setCurrentView(AppView.PRESCRIPTIONS)} />;
      case AppView.PROFILE:
        return <ProfileView onBack={() => setCurrentView(AppView.ACCOUNT)} />;
      case AppView.LAB_REPORTS:
        return <LabReportsView onBack={() => setCurrentView(AppView.ACCOUNT)} />;
      case AppView.VITALS:
        return <VitalsView onBack={() => setCurrentView(AppView.ACCOUNT)} />;
      case AppView.PRESCRIPTIONS:
        return <PrescriptionsView onBack={() => setCurrentView(AppView.ACCOUNT)} onLaunchScanner={() => setCurrentView(AppView.SCANNER)} />;
      case AppView.EQUIPMENT_PORTAL:
        return <EquipmentPortal onBack={() => setCurrentView(AppView.STORE)} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] dark:bg-[#0b0f1a] transition-colors duration-300 flex flex-col overflow-x-hidden">
      <Navbar 
        currentView={currentView} 
        setView={setCurrentView} 
        cartCount={cartCount} 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        lang={lang}
        toggleLang={toggleLang}
      />
      
      <main className="flex-1 container mx-auto max-w-7xl px-4 md:px-0 w-full">
        {renderContent()}
      </main>
      
      <footer className="bg-[#1e2a3a] dark:bg-[#070b14] text-white py-16 px-6 mt-16 rounded-t-[4rem] w-full transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-red-500 font-bold text-xl">P+</span>
               </div>
               <span className="text-3xl font-black tracking-tighter">Pulseplus</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-[280px]">India's Unified Digital Health Stack. Connecting ABHA, Ayushman Bharat, and Professional Care.</p>
          </div>
          <div>
            <h4 className="font-black text-xs mb-6 text-white uppercase tracking-[0.2em] opacity-50">Marketplace</h4>
            <ul className="text-slate-400 text-sm space-y-3">
              <li onClick={() => setCurrentView(AppView.STORE)} className="hover:text-blue-400 cursor-pointer transition-colors">Medicine Store (60% Off)</li>
              <li onClick={() => setCurrentView(AppView.EQUIPMENT_PORTAL)} className="hover:text-blue-400 cursor-pointer transition-colors">Equipment Hub</li>
              <li onClick={() => setCurrentView(AppView.STORE)} className="hover:text-blue-400 cursor-pointer transition-colors">Donation Center</li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-xs mb-6 text-white uppercase tracking-[0.2em] opacity-50">Wellness Studio</h4>
            <ul className="text-slate-400 text-sm space-y-3">
              <li onClick={() => setCurrentView(AppView.NUTRITION_GUIDE)} className="hover:text-blue-400 cursor-pointer transition-colors">Nutrition Hub</li>
              <li onClick={() => setCurrentView(AppView.DIET_PLAN)} className="hover:text-blue-400 cursor-pointer transition-colors">AI Diet Planner</li>
              <li onClick={() => setCurrentView(AppView.YOGA)} className="hover:text-blue-400 cursor-pointer transition-colors">Yoga Academy</li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-xs mb-6 text-white uppercase tracking-[0.2em] opacity-50">Government Portals</h4>
            <ul className="text-slate-400 text-sm space-y-3">
              <li onClick={() => setCurrentView(AppView.ACCOUNT)} className="hover:text-blue-400 cursor-pointer transition-colors">ABHA Health Vault</li>
              <li className="hover:text-blue-400 cursor-pointer transition-colors">Ayushman Registration</li>
              <li className="hover:text-blue-400 cursor-pointer transition-colors">Digital Health Mission</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto text-center border-t border-white/5 pt-10">
          <p className="text-[10px] text-slate-500 font-bold tracking-[0.3em] uppercase">© 2025 Pulseplus Health Platform • Bharat Health Initiative</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
