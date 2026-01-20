
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
    const routine = await generateWellnessPlan('yoga', ['Morning activation', 'Back pain relief', 'Core focus']);
    setAiRoutine(routine);
    setGenerating(false);
  };

  return (
    <div className="min-h-screen bg-[#070b14] py-12 px-4 md:px-8 max-w-[1600px] mx-auto space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row items-center gap-8 justify-between bg-[#1e293b] p-10 rounded-[3.5rem] border border-white/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#2f80ed]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="flex items-center gap-8 relative z-10">
          <button onClick={onBack} className="w-16 h-16 bg-slate-800 rounded-[1.5rem] flex items-center justify-center text-slate-400 hover:text-[#2f80ed] transition-all border border-white/5 shadow-sm active:scale-95">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <div>
            <h2 className="text-4xl font-black text-white tracking-tighter leading-none">Yoga Academy Studio</h2>
            <p className="text-slate-400 font-medium text-lg mt-1">Advanced motion analysis and AI-curated flow sequences.</p>
          </div>
        </div>
        <div className="flex gap-4 relative z-10">
           <div className="hidden lg:flex flex-col items-end">
             <p className="text-[10px] font-black text-[#2f80ed] uppercase tracking-widest">Global Rank</p>
             <p className="text-2xl font-black text-white">#1,402 Elite</p>
           </div>
           <button className="bg-[#2f80ed] text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all">Start Session ✨</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content: Video or Routine */}
        <div className="lg:col-span-8 space-y-10">
          {aiRoutine ? (
            <div className="bg-[#1e293b] rounded-[4rem] p-12 border border-white/5 shadow-2xl animate-in zoom-in duration-500 space-y-10 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-[#2f80ed]"></div>
               <div className="flex justify-between items-center relative z-10">
                 <div className="space-y-1">
                   <p className="text-[11px] font-black text-[#2f80ed] uppercase tracking-[0.2em]">Generated Sequence</p>
                   <h3 className="text-3xl font-black text-white tracking-tight">Daily Flow Sequence</h3>
                 </div>
                 <button onClick={() => setAiRoutine(null)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all">✕</button>
               </div>
               <div className="prose prose-invert prose-blue max-w-none whitespace-pre-wrap font-medium text-slate-300 bg-black/20 p-8 rounded-[2.5rem] border border-white/5 shadow-inner">
                 {aiRoutine}
               </div>
               <div className="flex gap-4">
                 <button className="flex-1 bg-[#2f80ed] text-white py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest">Begin Flow Sequence</button>
                 <button className="flex-1 bg-white/5 text-white py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest border border-white/10">Save to Academy</button>
               </div>
            </div>
          ) : (
            <>
              <div className="relative aspect-video rounded-[4rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] bg-slate-900 group border border-white/5">
                <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[10s]" alt="Yoga Session" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-all">
                  <button className="w-28 h-28 bg-[#2f80ed] text-white rounded-full flex items-center justify-center text-4xl shadow-[0_0_50px_rgba(47,128,237,0.5)] hover:scale-110 active:scale-95 transition-all group-hover:bg-white group-hover:text-[#2f80ed]">
                    ▶️
                  </button>
                </div>
                <div className="absolute top-8 right-8 bg-red-500 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                  Live Studio
                </div>
                <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between text-white drop-shadow-2xl">
                  <div className="space-y-2">
                    <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#2f80ed]">Featured Session</p>
                    <h3 className="text-5xl font-black tracking-tighter">Solar Activation Flow</h3>
                    <p className="text-slate-300 font-medium">with Guru Elena Rossi • Intermediate</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xl px-10 py-5 rounded-[2rem] border border-white/20 text-sm font-black uppercase tracking-widest">
                    45:00 Mins
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-[#1e293b] p-12 rounded-[4rem] border border-white/5 shadow-xl space-y-6 relative overflow-hidden group">
                  <div className="relative z-10 space-y-6">
                    <div className="bg-blue-500/10 w-20 h-20 rounded-[2rem] flex items-center justify-center text-4xl group-hover:rotate-12 transition-transform">🤖</div>
                    <h4 className="text-3xl font-black text-white tracking-tight">Motion AI Correction</h4>
                    <p className="text-lg text-slate-400 font-medium leading-relaxed">Real-time clinical feedback on your joint angles and posture alignment using Pulse Vision AI.</p>
                    <button className="bg-white text-[#070b14] px-10 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all">Enable Cam Check</button>
                  </div>
                  <div className="absolute -right-10 -bottom-10 text-9xl opacity-5 group-hover:scale-125 transition-transform duration-1000">🦾</div>
                </div>
                <div className="bg-[#2f80ed] p-12 rounded-[4rem] shadow-2xl text-white space-y-6 relative overflow-hidden group cursor-pointer" onClick={handleGenerate}>
                  <div className="relative z-10 space-y-6">
                    <div className="bg-white/20 backdrop-blur-md w-20 h-20 rounded-[2rem] flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">✨</div>
                    <h4 className="text-3xl font-black tracking-tight">AI Flow Generator</h4>
                    <p className="text-lg text-white/80 font-medium leading-relaxed">Describe your energy level and specific pain points for a custom 15-minute sequence.</p>
                    <button className="bg-white text-[#2f80ed] px-10 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-xl group-hover:bg-[#070b14] group-hover:text-white transition-all">
                      {generating ? 'Calculating Alignment...' : 'Synthesize Routine'}
                    </button>
                  </div>
                  <div className="absolute -right-10 -bottom-10 text-9xl opacity-10 group-hover:scale-125 transition-transform duration-1000">🧬</div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sidebar: Classes & Academy Stats */}
        <div className="lg:col-span-4 space-y-8 animate-in slide-in-from-right duration-700">
          <div className="bg-[#1e293b] rounded-[4rem] p-10 shadow-2xl border border-white/5 space-y-10">
            <div className="flex justify-between items-center">
               <h3 className="text-2xl font-black text-white tracking-tight">Upcoming Studio</h3>
               <span className="text-[10px] font-black text-[#2f80ed] uppercase tracking-widest hover:underline cursor-pointer">View Calendar</span>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Vinyasa Recovery', dur: '45m', diff: 'Intermediate', icon: '🌊', color: 'bg-blue-500/10 text-blue-400' },
                { title: 'Deep Sleep Nidra', dur: '15m', diff: 'Beginner', icon: '🌙', color: 'bg-purple-500/10 text-purple-400' },
                { title: 'Core Precision', dur: '30m', diff: 'Advanced', icon: '🦾', color: 'bg-red-500/10 text-red-400' },
                { title: 'Restorative Therapy', dur: '60m', diff: 'Therapeutic', icon: '🌿', color: 'bg-green-500/10 text-green-400' },
              ].map((cls, i) => (
                <div key={i} className="p-6 bg-slate-900 rounded-[2rem] border border-white/5 hover:border-[#2f80ed]/30 transition-all cursor-pointer group hover:bg-slate-800">
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`${cls.color} w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-white/5`}>{cls.icon}</div>
                    <div>
                      <h5 className="font-black text-white group-hover:text-[#2f80ed] transition-colors">{cls.title}</h5>
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">{cls.diff}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/5 pt-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{cls.dur} • Virtual Academy</span>
                    <button className="text-[9px] font-black text-[#2f80ed] uppercase tracking-[0.2em]">Join Now</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0b0f1a] rounded-[3.5rem] p-10 text-white space-y-8 shadow-2xl relative overflow-hidden group border border-white/5">
             <div className="flex justify-between items-start relative z-10">
                <div className="space-y-1">
                   <h4 className="text-xl font-black">Studio Progress</h4>
                   <p className="text-[10px] font-black text-[#2f80ed] uppercase tracking-widest">March 2025 Analytics</p>
                </div>
                <div className="text-3xl">🧘‍♂️</div>
             </div>
             <div className="space-y-6 relative z-10">
                {[
                   { label: 'Sessions Completed', val: '12', target: '15', p: '80%', c: 'bg-blue-500' },
                   { label: 'Flexibility Score', val: '88', target: '100', p: '88%', c: 'bg-green-500' },
                   { label: 'Calmness Minutes', val: '420', target: '600', p: '70%', c: 'bg-purple-500' },
                ].map(stat => (
                   <div key={stat.label} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-60">
                         <span>{stat.label}</span>
                         <span>{stat.val}/{stat.target}</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                         <div className={`h-full ${stat.c} transition-all duration-1000 shadow-lg`} style={{ width: stat.p }}></div>
                      </div>
                   </div>
                ))}
             </div>
             <button className="relative z-10 w-full bg-white/5 border border-white/10 py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Download Certification</button>
             <div className="absolute top-0 right-0 w-48 h-48 bg-[#2f80ed]/5 rounded-full blur-[80px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YogaView;
