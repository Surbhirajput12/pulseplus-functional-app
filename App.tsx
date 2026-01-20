
import React, { useState, useEffect } from 'react';
import { AppView, Language } from './types';
import { translations } from './i18n';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StoreSection from './components/StoreSection';
import RecordsSection from './components/RecordsSection';
import AskScan from './components/AskScan';
import DietPlanView from './components/DietPlanView';
import YogaView from './components/YogaView';
import SpecialistGrid from './components/SpecialistGrid';
import ProfileView from './components/ProfileView';
import LabReportsView from './components/LabReportsView';
import PrescriptionsView from './components/PrescriptionsView';
import VitalsView from './components/VitalsView';
import PrescriptionScanner from './components/PrescriptionScanner';
import NutritionGuideView from './components/NutritionGuideView';
import EquipmentPortal from './components/EquipmentPortal';
import LoginForm from './components/LoginForm';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [lang, setLang] = useState<Language>(Language.EN);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const t = translations[lang].sections;

  const renderHomeContent = () => (
    <div className="space-y-24 pb-24 animate-in fade-in duration-700 bg-slate-50/30 dark:bg-[#070b14]/30">
      <Hero onNavigate={setCurrentView} lang={lang} />
      
      {/* Wellness App Hub - UI STABLE AS REQUESTED */}
      <AskScan onNavigate={setCurrentView} lang={lang} />

      {/* Specialist Network */}
      <div className="max-w-[1440px] mx-auto px-6 space-y-10">
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b dark:border-white/5 pb-8">
            <div className="space-y-2">
               <h2 className="text-5xl font-black text-[#1e2a3a] dark:text-white tracking-tighter leading-none">{t.specialists}</h2>
               <p className="text-slate-500 font-medium text-lg">Ayushman Bharat verified clinical professionals.</p>
            </div>
            <button 
              onClick={() => setCurrentView(AppView.CONSULT)} 
              className="bg-white dark:bg-slate-800 text-[#2f80ed] font-black uppercase text-xs tracking-[0.2em] px-8 py-4 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm hover:scale-105 transition-all"
            >
              {t.viewAll}
            </button>
         </div>
         <SpecialistGrid onNavigate={setCurrentView} lang={lang} limit={4} />
      </div>

      {/* Marketplace Hub */}
      <StoreSection onNavigate={setCurrentView} lang={lang} />

      {/* Workout & Home Remedy Hub - REPLACING OLD RECORDS SPOT ON HOME PAGE */}
      <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 pt-12">
         <div 
           onClick={() => setCurrentView(AppView.NUTRITION_GUIDE)}
           className="bg-[#fffcf5] dark:bg-orange-950/10 p-14 rounded-[4rem] border border-orange-100 dark:border-orange-900/20 shadow-xl group hover:shadow-2xl transition-all flex flex-col justify-between relative overflow-hidden cursor-pointer"
         >
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-orange-200/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="space-y-10 relative z-10">
               <div className="bg-orange-600 text-white w-20 h-20 rounded-[2rem] flex items-center justify-center text-4xl shadow-2xl group-hover:rotate-12 transition-transform duration-500">🍯</div>
               <div className="space-y-4">
                  <h2 className="text-5xl font-black text-[#8b4513] dark:text-orange-200 tracking-tighter leading-none">{t.remedies}</h2>
                  <p className="text-xl text-[#a0522d] dark:text-slate-400 font-medium leading-relaxed max-w-lg">{t.remediesSub}</p>
               </div>
            </div>
            {/* Action button removed as requested, whole card is now clickable */}
            <div className="pt-12 relative z-10 opacity-40 group-hover:opacity-100 transition-opacity">
               <span className="text-xs font-black uppercase tracking-widest text-[#8b4513] dark:text-orange-300">Click to Enter Remedy Vault ➔</span>
            </div>
         </div>

         <div 
           onClick={() => setCurrentView(AppView.YOGA)}
           className="bg-[#1e2a3a] p-14 rounded-[4rem] border border-white/5 shadow-2xl group hover:shadow-[0_40px_100px_-20px_rgba(47,128,237,0.3)] transition-all flex flex-col justify-between relative overflow-hidden cursor-pointer"
         >
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-[#2f80ed]/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="space-y-10 relative z-10">
               <div className="bg-[#2f80ed] text-white w-20 h-20 rounded-[2rem] flex items-center justify-center text-4xl shadow-2xl group-hover:scale-110 transition-transform duration-500">🏃‍♂️</div>
               <div className="space-y-4">
                  <h2 className="text-5xl font-black text-white tracking-tighter leading-none">{t.workoutHub}</h2>
                  <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-lg">{t.workoutSub}</p>
               </div>
            </div>
            <div className="pt-12 relative z-10 opacity-40 group-hover:opacity-100 transition-opacity">
               <span className="text-xs font-black uppercase tracking-widest text-[#2f80ed]">Click to Begin Workout ➔</span>
            </div>
         </div>
      </div>

      {/* Records Section - Now at the very end of home as requested */}
      <div id="records-section">
        <RecordsSection onNavigate={setCurrentView} lang={lang} />
      </div>
    </div>
  );

  const renderView = () => {
    switch (currentView) {
      case AppView.HOME:
        return renderHomeContent();
      case AppView.STORE:
        return <StoreSection onNavigate={setCurrentView} lang={lang} />;
      case AppView.DIET_PLAN:
        return <DietPlanView onBack={() => setCurrentView(AppView.HOME)} />;
      case AppView.YOGA:
        return <YogaView onBack={() => setCurrentView(AppView.HOME)} />;
      case AppView.ACCOUNT:
        return <div className="py-20"><RecordsSection onNavigate={setCurrentView} lang={lang} /></div>;
      case AppView.PROFILE:
        return <ProfileView onBack={() => setCurrentView(AppView.ACCOUNT)} />;
      case AppView.LAB_REPORTS:
        return <LabReportsView onBack={() => setCurrentView(AppView.ACCOUNT)} />;
      case AppView.PRESCRIPTIONS:
        return <PrescriptionsView onBack={() => setCurrentView(AppView.ACCOUNT)} onLaunchScanner={() => setCurrentView(AppView.SCANNER)} />;
      case AppView.VITALS:
        return <VitalsView onBack={() => setCurrentView(AppView.ACCOUNT)} />;
      case AppView.CONSULT:
        return (
          <div className="max-w-[1440px] mx-auto px-6 py-20 space-y-12 animate-in fade-in duration-700">
             <div className="flex items-center gap-8 bg-white dark:bg-[#0b0f1a] p-10 rounded-[4rem] border border-slate-100 dark:border-white/5 shadow-sm">
                <button onClick={() => setCurrentView(AppView.HOME)} className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-[1.5rem] flex items-center justify-center text-slate-400 hover:text-[#2f80ed] transition-all border border-slate-100 dark:border-white/5">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                </button>
                <div>
                   <h2 className="text-5xl font-black text-[#1e2a3a] dark:text-white tracking-tighter">Clinical Consultation</h2>
                   <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Book appointments with Ayushman-verified clinical specialists.</p>
                </div>
             </div>
             <SpecialistGrid onNavigate={setCurrentView} lang={lang} />
          </div>
        );
      case AppView.SCANNER:
        return <PrescriptionScanner onBack={() => setCurrentView(AppView.PRESCRIPTIONS)} />;
      case AppView.NUTRITION_GUIDE:
        return <NutritionGuideView onBack={() => setCurrentView(AppView.HOME)} onNavigate={setCurrentView} />;
      case AppView.EQUIPMENT_PORTAL:
        return <EquipmentPortal onBack={() => setCurrentView(AppView.STORE)} />;
      default:
        return renderHomeContent();
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#070b14] transition-colors duration-500 flex flex-col font-sans">
      <Navbar 
        currentView={currentView} 
        setView={setCurrentView} 
        lang={lang} 
        setLang={setLang}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onLogin={() => setShowLogin(true)}
      />
      
      <main className="flex-1 w-full">
        {renderView()}
      </main>

      {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
      
      <footer className="bg-white dark:bg-[#070b14] border-t dark:border-white/5 py-12 px-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-300">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-[#2f80ed] rounded-xl flex items-center justify-center text-white text-xl">P+</div>
             <span className="text-2xl font-mono text-[#1e2a3a] dark:text-white tracking-tighter">Pulse<span className="text-[#2f80ed]">+</span></span>
          </div>
          <div className="flex gap-10">
             <a href="#" className="hover:text-[#2f80ed] transition-colors">Privacy</a>
             <a href="#" className="hover:text-[#2f80ed] transition-colors">ABHA Terms</a>
             <a href="#" className="hover:text-[#2f80ed] transition-colors">Warehouse Network</a>
          </div>
          <p>© 2025 Pulseplus Health</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
