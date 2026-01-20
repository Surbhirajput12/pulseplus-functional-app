
import React, { useState } from 'react';
import { AppView } from '../types';

interface RecordsSectionProps {
  onNavigate: (view: AppView) => void;
}

const RecordsSection: React.FC<RecordsSectionProps> = ({ onNavigate }) => {
  const [showLogModal, setShowLogModal] = useState(false);

  return (
    <section className="px-4 md:px-8 py-20 space-y-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-[#1e2a3a] tracking-tight">Health Records</h2>
          <p className="text-slate-500 font-medium">Verified medical storage for your lifelong health journey.</p>
        </div>
        <button 
          onClick={() => setShowLogModal(true)}
          className="bg-[#1e2a3a] text-white px-10 py-5 rounded-[2rem] font-black shadow-2xl shadow-blue-100 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-3"
        >
          <span>➕</span> New Health Log
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'My Profile', icon: '👤', color: 'bg-indigo-50', count: 'Verified', view: AppView.PROFILE },
          { label: 'Lab Reports', icon: '🔬', color: 'bg-green-50', count: '12 Items', view: AppView.LAB_REPORTS },
          { label: 'Prescriptions', icon: '📄', color: 'bg-orange-50', count: '4 Active', view: AppView.PRESCRIPTIONS },
          { label: 'Vital History', icon: '📉', color: 'bg-blue-50', count: 'Updated today', view: AppView.VITALS },
        ].map(item => (
          <div 
            key={item.label} 
            onClick={() => onNavigate(item.view)}
            className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100 flex flex-col gap-8 hover:shadow-2xl hover:shadow-slate-200 transition-all cursor-pointer group active:scale-95"
          >
            <div className={`${item.color} w-20 h-20 rounded-[2rem] flex items-center justify-center text-4xl group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
            <div>
              <h4 className="font-black text-[#1e2a3a] text-2xl mb-1">{item.label}</h4>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.count}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white rounded-[4rem] p-12 shadow-sm border border-slate-100 space-y-10">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-black text-[#1e2a3a]">Ongoing Care Network</h3>
            <button onClick={() => onNavigate(AppView.CONSULT)} className="text-sm font-black text-[#2f80ed] hover:underline uppercase tracking-widest">Global History</button>
          </div>
          
          <div className="space-y-6">
            {[
              { doctor: 'Dr. Elena Rossi', specialty: 'Pediatric Care', status: 'Follow-up in 2 days', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200' },
              { doctor: 'Dr. Michael Vogt', specialty: 'Cardiac Checkup', status: 'Completed - Report Ready', img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200' },
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-[3rem] flex flex-col sm:flex-row items-center justify-between gap-8 border border-white shadow-inner group transition-all hover:bg-white hover:shadow-xl">
                <div className="flex items-center gap-8">
                  <div className="w-24 h-24 rounded-[2rem] overflow-hidden shadow-lg border-4 border-white">
                    <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.doctor} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 text-xl">{item.doctor}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3">{item.specialty}</p>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      <p className="text-xs text-slate-600 font-black tracking-tight">{item.status}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button onClick={() => onNavigate(AppView.CONSULT)} className="flex-1 sm:flex-none bg-[#2f80ed] text-white px-10 py-4 rounded-[1.5rem] font-black text-xs shadow-xl shadow-blue-100 hover:scale-105 transition-all">
                    Consult
                  </button>
                  <button onClick={() => onNavigate(AppView.LAB_REPORTS)} className="flex-1 sm:flex-none bg-white text-[#1e2a3a] px-10 py-4 rounded-[1.5rem] font-black text-xs border border-slate-200 hover:bg-slate-50 transition-all">
                    Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1e2a3a] rounded-[4rem] p-12 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group">
          <div className="relative z-10 space-y-8">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-[2rem] flex items-center justify-center text-4xl shadow-lg border border-white/10">🔍</div>
            <h3 className="text-4xl font-black leading-[1.1] tracking-tight">AI Prescription Analyzer</h3>
            <p className="text-slate-400 font-medium leading-relaxed text-lg">Instant translation of doctor's handwriting into a clear digital schedule with deep medical insights.</p>
          </div>
          
          <button 
            onClick={() => onNavigate(AppView.SCANNER)}
            className="relative z-10 w-full bg-[#2f80ed] text-white py-6 rounded-[2.5rem] font-black text-xl shadow-2xl shadow-blue-500/20 hover:scale-[1.05] transition-transform active:scale-95 mt-16"
          >
            Launch Scanner 📸
          </button>
          
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
        </div>
      </div>

      {showLogModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-white p-12 rounded-[4rem] max-w-lg w-full space-y-10 shadow-2xl border border-white/20 animate-in zoom-in-95">
             <div className="space-y-2">
               <h3 className="text-3xl font-black text-[#1e2a3a]">New Health Log</h3>
               <p className="text-slate-500 font-medium">Document your symptoms for AI analysis.</p>
             </div>
             <div className="space-y-6">
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Log Title</label>
                 <input type="text" placeholder="e.g. Afternoon Headache" className="w-full bg-slate-50 p-5 rounded-2xl border border-slate-100 font-bold outline-none focus:ring-2 ring-blue-100" />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Detailed Observation</label>
                 <textarea rows={4} placeholder="Describe how you're feeling in detail..." className="w-full bg-slate-50 p-5 rounded-2xl border border-slate-100 font-bold outline-none focus:ring-2 ring-blue-100 resize-none" />
               </div>
             </div>
             <div className="flex gap-4">
               <button onClick={() => setShowLogModal(false)} className="flex-1 bg-slate-100 py-5 rounded-[2rem] font-black text-slate-500 hover:bg-slate-200 transition-all">Cancel</button>
               <button onClick={() => { alert('Health Log Synchronized!'); setShowLogModal(false); }} className="flex-1 bg-[#2f80ed] text-white py-5 rounded-[2rem] font-black shadow-xl shadow-blue-200 hover:scale-105 transition-all">Sync Log</button>
             </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RecordsSection;
