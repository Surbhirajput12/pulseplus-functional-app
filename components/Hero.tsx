
import React from 'react';
import { AppView, Language } from '../types';

interface HeroProps {
  onNavigate: (view: AppView) => void;
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ onNavigate, lang }) => {
  const content = {
    [Language.EN]: {
      tag: 'Unified Health Stack 2025',
      title: 'Integrated Care. Better Health.',
      desc: 'Connect with ABHA, manage EHR, consult global specialists, and manage clinical nutrition—all in one place.',
      cta1: 'Store & Pharmacy (60% Off)',
      cta2: 'AI Diet Planner',
    },
    [Language.HI]: {
      tag: 'एकीकृत स्वास्थ्य मंच 2025',
      title: 'एकीकृत देखभाल। बेहतर स्वास्थ्य।',
      desc: 'ABHA से जुड़ें, EHR प्रबंधित करें, वैश्विक विशेषज्ञों से परामर्श लें और क्लिनिकल पोषण का प्रबंधन करें।',
      cta1: 'दवाओं की दुकान (60% छूट)',
      cta2: 'एआई डाइट प्लानर',
    }
  };

  const active = content[lang];

  return (
    <section className="bg-gradient-to-br from-[#eef6fb] to-white dark:from-[#111827] dark:to-[#0b0f1a] rounded-[3rem] md:rounded-[4rem] mx-4 md:mx-6 mt-8 p-8 md:p-20 border border-white dark:border-white/5 shadow-sm overflow-hidden relative transition-colors duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center relative z-10">
        <div className="space-y-8 md:space-y-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-blue-100/50 dark:bg-blue-500/10 text-[#2f80ed] rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-200/50 dark:border-blue-500/20 animate-pulse">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            {active.tag}
          </div>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-[#1e2a3a] dark:text-white leading-[0.95] tracking-tighter">
            {active.title.split('.')[0]}. <br />
            <span className="text-[#2f80ed]">{active.title.split('.')[1]}</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed font-medium">
            {active.desc}
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={() => onNavigate(AppView.STORE)}
              className="bg-[#2f80ed] hover:bg-blue-600 text-white px-8 md:px-12 py-5 md:py-6 rounded-3xl font-black text-sm md:text-lg shadow-2xl shadow-blue-200 dark:shadow-blue-500/20 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-3"
            >
              {active.cta1} 💊
            </button>
            <button 
              onClick={() => onNavigate(AppView.DIET_PLAN)}
              className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-[#1e2a3a] dark:text-white px-8 md:px-12 py-5 md:py-6 rounded-3xl font-black text-sm md:text-lg shadow-lg border border-slate-100 dark:border-slate-700 transition-all hover:-translate-y-1 active:scale-95"
            >
              {active.cta2}
            </button>
          </div>
        </div>
        
        <div className="space-y-8">
           {/* Video Guide Component */}
           <div className="relative group rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800">
              <div className="aspect-video bg-slate-900 flex items-center justify-center relative">
                {/* Placeholder for Video Guide */}
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000" 
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
                  alt="App Working"
                />
                <div className="relative z-10 text-center space-y-4">
                   <button className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 hover:scale-110 transition-transform shadow-2xl">
                     <span className="text-4xl ml-2">▶</span>
                   </button>
                   <p className="text-white font-black uppercase text-[10px] tracking-widest bg-black/40 px-6 py-2 rounded-full">Guide: How Pulseplus Works</p>
                </div>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white dark:border-slate-800">
                <p className="text-2xl mb-2">🏥</p>
                <h4 className="font-black text-[#1e2a3a] dark:text-white text-sm">60% Off Meds</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Direct from Warehouse</p>
              </div>
              <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white dark:border-slate-800">
                <p className="text-2xl mb-2">💳</p>
                <h4 className="font-black text-[#1e2a3a] dark:text-white text-sm">ABHA Ready</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Govt IDs Integrated</p>
              </div>
           </div>
        </div>
      </div>

      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100/30 dark:bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
    </section>
  );
};

export default Hero;
