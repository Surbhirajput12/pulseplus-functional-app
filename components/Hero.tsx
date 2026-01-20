
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
    <section className="relative rounded-[3rem] md:rounded-[4rem] mx-4 md:mx-6 mt-8 overflow-hidden min-h-[600px] flex items-center transition-colors duration-300">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-doctor-working-with-a-laptop-and-a-stethoscope-40540-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#eef6fb]/95 via-[#eef6fb]/80 to-white/50 dark:from-[#0b0f1a]/95 dark:via-[#0b0f1a]/85 dark:to-transparent transition-colors duration-300"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center relative z-10 p-8 md:p-20 w-full">
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
           {/* Feature Showcase Overlay */}
           <div className="relative group rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/50 dark:border-slate-800/50 backdrop-blur-md">
              <div className="aspect-video bg-black/40 flex items-center justify-center relative">
                <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center space-y-6">
                   <h4 className="text-white text-2xl font-black tracking-tight">Experience Pulseplus</h4>
                   <div className="grid grid-cols-2 gap-4 w-full">
                      <div className="bg-white/10 p-3 rounded-2xl border border-white/20">
                         <p className="text-[10px] font-black uppercase text-blue-300">Nutrition</p>
                         <p className="text-white text-[9px] font-medium">AI Meal Analysis</p>
                      </div>
                      <div className="bg-white/10 p-3 rounded-2xl border border-white/20">
                         <p className="text-[10px] font-black uppercase text-green-300">Yoga</p>
                         <p className="text-white text-[9px] font-medium">Posture Correction</p>
                      </div>
                      <div className="bg-white/10 p-3 rounded-2xl border border-white/20">
                         <p className="text-[10px] font-black uppercase text-orange-300">Pharmacy</p>
                         <p className="text-white text-[9px] font-medium">60% Off Meds</p>
                      </div>
                      <div className="bg-white/10 p-3 rounded-2xl border border-white/20">
                         <p className="text-[10px] font-black uppercase text-red-300">Vault</p>
                         <p className="text-white text-[9px] font-medium">ABHA Integrated</p>
                      </div>
                   </div>
                   <button className="bg-white text-[#1e2a3a] px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-xl hover:scale-110 transition-transform">
                      Watch Feature Demo
                   </button>
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
    </section>
  );
};

export default Hero;
