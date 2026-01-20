
import React, { useState } from 'react';
import { AppView, Language } from '../types';
import Logo from './Logo';
import LoginForm from './LoginForm';

interface NavbarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  cartCount: number;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  lang: Language;
  toggleLang: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, cartCount, isDarkMode, toggleDarkMode, lang, toggleLang }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white dark:bg-[#0f172a] sticky top-0 z-[100] border-b border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setView(AppView.HOME)}
            >
              <Logo className="w-10 h-10" />
              <span className="text-2xl font-black text-[#1e2a3a] dark:text-white tracking-tighter">Pulseplus</span>
            </div>

            <nav className="hidden lg:flex items-center gap-2">
              {[
                { label: 'Home', view: AppView.HOME },
                { label: 'Consult', view: AppView.CONSULT },
                { label: 'Pharmacy', view: AppView.STORE },
                { label: 'Wellness', view: AppView.WELLNESS },
                { label: 'Vault', view: AppView.ACCOUNT },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => setView(item.view)}
                  className={`px-4 py-2 rounded-xl text-[12px] font-black uppercase tracking-wider transition-all ${
                    currentView === item.view 
                      ? 'text-[#2f80ed] bg-blue-50 dark:bg-blue-500/10' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-[#1e2a3a] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button 
                onClick={toggleLang}
                className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 hover:border-blue-200 transition-all"
              >
                {lang === Language.EN ? 'EN' : 'हिं'}
              </button>

              <button 
                onClick={toggleDarkMode}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors"
              >
                {isDarkMode ? '🌞' : '🌙'}
              </button>

              <button 
                onClick={() => setView(AppView.STORE)}
                className="p-2.5 text-slate-500 dark:text-slate-400 hover:text-[#2f80ed] relative"
              >
                <span className="text-xl">🛒</span>
                {cartCount > 0 && (
                  <span className="bg-[#2f80ed] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full absolute -top-1 -right-1 ring-2 ring-white dark:ring-[#0f172a]">
                    {cartCount}
                  </span>
                )}
              </button>
              
              <button 
                onClick={() => setShowLogin(true)}
                className="hidden sm:flex bg-[#1e2a3a] dark:bg-[#2f80ed] text-white px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg"
              >
                ABHA LOGIN
              </button>

              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-slate-500 dark:text-slate-400"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-[#0f172a] border-t border-slate-100 dark:border-slate-800 p-6 space-y-4 animate-in slide-in-from-top duration-300">
             <div className="grid grid-cols-2 gap-4">
                <button onClick={() => { setView(AppView.HOME); setIsMobileMenuOpen(false); }} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 font-black text-[10px] uppercase text-[#1e2a3a] dark:text-white">Home</button>
                <button onClick={() => { setView(AppView.CONSULT); setIsMobileMenuOpen(false); }} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 font-black text-[10px] uppercase text-[#1e2a3a] dark:text-white">Consult</button>
                <button onClick={() => { setView(AppView.STORE); setIsMobileMenuOpen(false); }} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 font-black text-[10px] uppercase text-[#1e2a3a] dark:text-white">Pharmacy</button>
                <button onClick={() => { setView(AppView.WELLNESS); setIsMobileMenuOpen(false); }} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 font-black text-[10px] uppercase text-[#1e2a3a] dark:text-white">Wellness</button>
                <button onClick={() => { setView(AppView.ACCOUNT); setIsMobileMenuOpen(false); }} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 font-black text-[10px] uppercase text-[#1e2a3a] dark:text-white">Health Vault</button>
             </div>
             <button onClick={() => { setShowLogin(true); setIsMobileMenuOpen(false); }} className="w-full bg-[#1e2a3a] dark:bg-blue-600 text-white py-4 rounded-2xl font-black uppercase text-xs">Login with ABHA</button>
          </div>
        )}
      </header>

      {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
    </>
  );
};

export default Navbar;
