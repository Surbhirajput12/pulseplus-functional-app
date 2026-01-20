
import React from 'react';
import { AppView } from '../types';
import HealthBot from './HealthBot';

interface AskScanProps {
  onNavigate: (view: AppView) => void;
}

const AskScan: React.FC<AskScanProps> = ({ onNavigate }) => {
  const cards = [
    { 
      title: 'Nutrition Hub', 
      desc: 'Remedies, yoga guides, and essential nutrient encyclopedia.', 
      icon: '🥗', 
      view: AppView.NUTRITION_GUIDE, 
      color: 'text-green-600', 
      bg: 'bg-green-50 dark:bg-green-900/20', 
      img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600',
      tag: 'Wellness Hub'
    },
    { 
      title: 'Diet Planner', 
      desc: 'Personalized clinical meal plans with macro-nutrient tracking.', 
      icon: '📋', 
      view: AppView.DIET_PLAN, 
      color: 'text-orange-600', 
      bg: 'bg-orange-50 dark:bg-orange-900/20', 
      img: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=600',
      tag: 'Personalized'
    },
    { 
      title: 'Yoga Academy', 
      desc: 'Studio sessions for chronic stress reduction and physical therapy.', 
      icon: '🧘‍♀️', 
      view: AppView.YOGA, 
      color: 'text-purple-600', 
      bg: 'bg-purple-50 dark:bg-purple-900/20', 
      img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600',
      tag: 'Studio'
    },
    { 
      title: 'Health Records', 
      desc: 'High-security encryption for your medical identity.', 
      icon: '🔐', 
      view: AppView.ACCOUNT, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50 dark:bg-blue-900/20', 
      img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600',
      tag: 'Secure'
    },
  ];

  return (
    <section className="px-4 md:px-6 py-12 space-y-12 max-w-7xl mx-auto w-full">
      <div className="space-y-4 max-w-3xl">
        <h2 className="text-4xl md:text-6xl font-black text-[#1e2a3a] dark:text-white leading-tight tracking-tighter">Wellness Studio</h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium tracking-tight">AI diagnostics meets clinical lifestyle design.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {cards.map((card) => (
            <div 
              key={card.title}
              onClick={() => onNavigate(card.view)}
              className="group bg-white dark:bg-[#1e293b] rounded-[3rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-500/50 hover:shadow-xl transition-all cursor-pointer flex flex-col active:scale-[0.98]"
            >
              <div className="relative aspect-video mb-6 overflow-hidden rounded-[2rem] bg-slate-50 dark:bg-slate-900 shadow-inner">
                <img 
                  src={card.img} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  alt={card.title} 
                />
                <div className={`absolute top-4 left-4 ${card.bg} ${card.color} w-12 h-12 rounded-[1rem] flex items-center justify-center text-2xl font-bold shadow-lg border-2 border-white dark:border-slate-700`}>
                  {card.icon}
                </div>
                <div className="absolute top-4 right-4 bg-[#1e2a3a]/80 dark:bg-black/80 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">
                  {card.tag}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-[#1e2a3a] dark:text-white group-hover:text-[#2f80ed] transition-colors">{card.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="lg:col-span-1 h-full min-h-[600px] w-full">
          <HealthBot />
        </div>
      </div>
    </section>
  );
};

export default AskScan;
