
import React, { useState } from 'react';
import { generateWellnessPlan } from '../services/geminiService';

interface YogaViewProps {
  onBack: () => void;
}

const YogaView: React.FC<YogaViewProps> = ({ onBack }) => {
  const [generating, setGenerating] = useState(false);
  const [aiRoutine, setAiRoutine] = useState<string | null>(null);

  const handleGenerate = async () => {
    setGenerating(true);
    const routine = await generateWellnessPlan('yoga', ['Stretching', 'Morning routine', 'Stress relief']);
    setAiRoutine(routine);
    setGenerating(false);
  };

  return (
    <div className="py-12 px-6 max-w-6xl mx-auto space-y-12">
      <div className="flex items-center gap-6">
        <button onClick={onBack} className="p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all">
          <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div>
          <h2 className="text-4xl font-black text-[#1e2a3a]">Yoga & Mindfulness</h2>
          <p className="text-slate-500 font-medium">Interactive sessions and posture correction with AI motion analysis.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-10">
          {aiRoutine ? (
            <div className="bg-white rounded-[3.5rem] p-10 border border-slate-100 shadow-2xl animate-in fade-in duration-500">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-2xl font-black text-[#1e2a3a]">Your Custom Yoga Routine</h3>
                 <button onClick={() => setAiRoutine(null)} className="text-sm font-bold text-[#2f80ed]">Close Routine</button>
               </div>
               <div className="prose prose-slate max-w-none whitespace-pre-wrap font-medium">
                 {aiRoutine}
               </div>
            </div>
          ) : (
            <>
              <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl bg-slate-900 group">
                <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[5s]" alt="Yoga Session" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-24 h-24 bg-[#2f80ed] text-white rounded-full flex items-center justify-center text-4xl shadow-2xl hover:scale-110 active:scale-95 transition-all">
                    ▶️
                  </button>
                </div>
                <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between text-white">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-300 mb-2">Guided Session</p>
                    <h3 className="text-3xl font-black">Morning Sun Salutation</h3>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 text-sm font-bold">
                    25:00 Minutes
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-4 relative overflow-hidden group">
                  <div className="relative z-10">
                    <h4 className="text-xl font-black text-[#1e2a3a]">AI Posture Correction</h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed mt-2">Use your camera to get real-time feedback on your yoga poses.</p>
                    <button className="mt-6 bg-[#1e2a3a] text-white px-8 py-3 rounded-2xl font-black text-sm hover:bg-[#2f80ed] transition-all">Enable Camera</button>
                  </div>
                  <div className="absolute -right-6 -bottom-6 text-7xl opacity-5 group-hover:scale-110 transition-transform">🤖</div>
                </div>
                <div className="bg-[#2f80ed] p-8 rounded-[3rem] shadow-xl text-white space-y-4 relative overflow-hidden group cursor-pointer" onClick={handleGenerate}>
                  <div className="relative z-10">
                    <h4 className="text-xl font-black">Generate AI Routine</h4>
                    <p className="text-sm opacity-80 font-medium leading-relaxed mt-2">Let Gemini create a custom sequence for your energy levels today.</p>
                    <button className="mt-6 bg-white text-[#2f80ed] px-8 py-3 rounded-2xl font-black text-sm shadow-lg">
                      {generating ? 'Calculating Flow...' : 'Start AI Session ✨'}
                    </button>
                  </div>
                  <div className="absolute -right-6 -bottom-6 text-7xl opacity-10 group-hover:scale-110 transition-transform">✨</div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-slate-100 space-y-6">
            <h3 className="text-xl font-black text-[#1e2a3a]">Popular Classes</h3>
            <div className="space-y-4">
              {[
                { title: 'Vinyasa Flow', dur: '45m', diff: 'Intermediate', icon: '🌊' },
                { title: 'Sleep Meditation', dur: '15m', diff: 'Beginner', icon: '🌙' },
                { title: 'Core Strength', dur: '30m', diff: 'Advanced', icon: '🦾' },
                { title: 'Restorative Yoga', dur: '60m', diff: 'Beginner', icon: '🌿' },
              ].map((cls, i) => (
                <div key={i} className="p-5 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-blue-200 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">{cls.icon}</span>
                    <h5 className="font-black text-slate-800 group-hover:text-[#2f80ed] transition-colors">{cls.title}</h5>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{cls.dur}</span>
                    <span className="text-[10px] font-black text-[#2f80ed] uppercase tracking-widest">{cls.diff}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YogaView;
