
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
import ProductStudio from './components/ProductStudio';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [lang, setLang] = useState<Language>(Language.EN);
  const [cartCount, setCartCount] = useState(0);
  const [activeSpecialty, setActiveSpecialty] = useState<string>('All');
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('pulseplus_theme');
    return saved === 'dark';
  });

  useEffect(() => {
    const storedCart = localStorage.getItem('pulseplus_cart_count');
    if (storedCart) setCartCount(parseInt(storedCart));
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('pulseplus_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('pulseplus_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  const toggleLang = () => setLang(prev => prev === Language.EN ? Language.HI : Language.EN);

  const handleSpecialtyNavigation = (specialty: string) => {
    setActiveSpecialty(specialty);
    setCurrentView(AppView.CONSULT);
  };

  const renderContent = () => {
    switch (currentView) {
      case AppView.HOME:
        return (
          <div className="space-y-12 pb-20 w-full animate-in fade-in duration-500">
            <Hero onNavigate={setCurrentView} lang={lang} />
            <div id="consult" className="w-full">
              <div className="w-full px-6 mb-8 text-center">
                <h2 className="text-3xl md:text-5xl font-black text-[#1e2a3a] dark:text-white tracking-tighter">Verified Medical Specialists</h2>
                <p className="text-slate-500 font-medium text-xs mt-2 uppercase tracking-widest">Global network of authenticated clinical experts</p>
              </div>
              <SpecialistGrid 
                onNavigate={setCurrentView} 
                onSpecialtySelect={handleSpecialtyNavigation}
                limit={4}
              />
            </div>
            <div className="max-w-[1440px] mx-auto px-6">
              <div 
                onClick={() => setCurrentView(AppView.PRODUCT_STUDIO)}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 cursor-pointer hover:scale-[1.01] transition-all shadow-2xl"
              >
                <div className="space-y-4 text-center md:text-left">
                  <span className="bg-white/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">New Feature</span>
                  <h2 className="text-4xl font-black tracking-tight">AI Product Studio</h2>
                  <p className="text-blue-100 font-medium max-w-md">Remove backgrounds and cleanup product shots instantly with simple text instructions.</p>
                </div>
                <button className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-black text-lg shadow-xl">Launch Studio ✨</button>
              </div>
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
            <div className="max-w-[1440px] mx-auto px-6 py-10 space-y-4 text-center">
              <button 
                onClick={() => setCurrentView(AppView.HOME)}
                className="text-[#2f80ed] font-black uppercase text-xs tracking-widest hover:underline mb-4"
              >
                ← Back to Home
              </button>
              <h1 className="text-4xl md:text-6xl font-black text-[#1e2a3a] dark:text-white tracking-tighter leading-tight">
                {activeSpecialty === 'All' ? 'Clinical Portal' : `${activeSpecialty} Experts`}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-base font-medium max-w-3xl mx-auto leading-relaxed">
                Connect with our Ayushman-verified {activeSpecialty === 'All' ? 'medical network' : `${activeSpecialty.toLowerCase()} team`}.
              </p>
            </div>
            <SpecialistGrid 
              onNavigate={setCurrentView} 
              isDedicatedPage={true} 
              initialFilter={activeSpecialty}
            />
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
      case AppView.PRODUCT_STUDIO:
        return <ProductStudio onBack={() => setCurrentView(AppView.STORE)} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] dark:bg-[#0b0f1a] transition-colors duration-500 flex flex-col overflow-x-hidden">
      <Navbar 
        currentView={currentView} 
        setView={setCurrentView} 
        cartCount={cartCount} 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        lang={lang}
        toggleLang={toggleLang}
      />
      
      <main className="flex-1 w-full max-w-full">
        {renderContent()}
      </main>
      
      <footer className="bg-[#1e2a3a] dark:bg-[#070b14] text-white py-16 px-6 mt-16 rounded-t-[4rem] w-full border-t border-white/5">
        <div className="w-full max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-10 px-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-red-500 font-bold text-xl">P+</span>
               </div>
               <span className="text-3xl font-black tracking-tighter text-white">Pulseplus</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-[280px]">
              India's leading unified digital health ecosystem. Integrating ABHA, tele-consultation, and smart nutrition management.
            </p>
          </div>
          <div>
            <h4 className="font-black text-[10px] mb-6 text-[#2f80ed] uppercase tracking-[0.2em]">Clinical Services</h4>
            <ul className="text-slate-400 text-sm space-y-4">
              <li onClick={() => setCurrentView(AppView.CONSULT)} className="hover:text-white cursor-pointer transition-colors flex items-center gap-2"><span>🩺</span> Virtual Consultations</li>
              <li onClick={() => setCurrentView(AppView.STORE)} className="hover:text-white cursor-pointer transition-colors flex items-center gap-2"><span>💊</span> Pharmacy (60% Off)</li>
              <li onClick={() => setCurrentView(AppView.PRODUCT_STUDIO)} className="hover:text-white cursor-pointer transition-colors flex items-center gap-2"><span>✨</span> AI Product Studio</li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-[10px] mb-6 text-[#2f80ed] uppercase tracking-[0.2em]">Wellness Hub</h4>
            <ul className="text-slate-400 text-sm space-y-4">
              <li onClick={() => setCurrentView(AppView.NUTRITION_GUIDE)} className="hover:text-white cursor-pointer transition-colors flex items-center gap-2"><span>🥗</span> Nutrition Science</li>
              <li onClick={() => setCurrentView(AppView.YOGA)} className="hover:text-white cursor-pointer transition-colors flex items-center gap-2"><span>🧘‍♀️</span> Yoga Academy</li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-[10px] mb-6 text-[#2f80ed] uppercase tracking-[0.2em]">National Programs</h4>
            <ul className="text-slate-400 text-sm space-y-4">
              <li className="hover:text-white cursor-pointer transition-colors flex items-center gap-2"><span>🆔</span> ABHA ID Management</li>
              <li className="hover:text-white cursor-pointer transition-colors flex items-center gap-2"><span>🛡️</span> Ayushman Bharat</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 text-center px-8">
          <p className="text-[10px] text-slate-500 font-bold tracking-[0.3em] uppercase">© 2025 Pulseplus Health Initiative • Verified Medical Network</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
