
import React, { useState } from 'react';
import { searchHomeRemedy } from '../services/geminiService';
import { HomeRemedy, AppView } from '../types';

interface NutritionGuideViewProps {
  onBack: () => void;
  onNavigate: (view: AppView) => void;
}

const NutritionGuideView: React.FC<NutritionGuideViewProps> = ({ onBack, onNavigate }) => {
  const [remedyQuery, setRemedyQuery] = useState('');
  const [remedyResult, setRemedyResult] = useState<HomeRemedy | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleRemedySearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!remedyQuery.trim()) return;
    setIsSearching(true);
    const result = await searchHomeRemedy(remedyQuery);
    setRemedyResult(result);
    setIsSearching(false);
  };

  return (
    <div className="py-12 px-4 md:px-6 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-500 w-full">
      <div className="flex flex-col md:flex-row items-center gap-6 justify-between bg-white dark:bg-[#1e293b] p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h2 className="text-3xl font-black text-[#1e2a3a] dark:text-white">Nutrition Hub</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Your guide to natural wellness, yoga, and remedies.</p>
          </div>
        </div>
        <button 
          onClick={() => onNavigate(AppView.DIET_PLAN)}
          className="bg-[#2f80ed] text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl hover:bg-blue-600 transition-all"
        >
          Open Diet Planner 📋
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Home Remedies */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#fffcf5] dark:bg-[#1e293b] rounded-[3.5rem] p-10 border border-orange-100 dark:border-slate-800 shadow-sm space-y-8">
            <div className="space-y-2">
              <h3 className="text-3xl font-black text-[#8b4513] dark:text-orange-200 tracking-tight">Home Remedies Search</h3>
              <p className="text-[#a0522d] dark:text-slate-400 font-medium">Search traditional remedies like "Kadha for cold" or "Benefits of Dalia".</p>
            </div>

            <form onSubmit={handleRemedySearch} className="flex flex-col md:flex-row gap-4 p-2 bg-white dark:bg-slate-900 rounded-[2rem] border border-orange-100 dark:border-slate-800 shadow-inner">
              <input 
                type="text"
                value={remedyQuery}
                onChange={(e) => setRemedyQuery(e.target.value)}
                placeholder="Type remedy or symptom..."
                className="flex-1 px-6 py-4 rounded-[1.5rem] bg-transparent outline-none font-bold text-slate-700 dark:text-white placeholder:text-slate-300"
              />
              <button 
                type="submit"
                disabled={isSearching}
                className="bg-[#8b4513] dark:bg-orange-600 text-white px-10 py-4 rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:bg-[#a0522d] transition-all disabled:opacity-50"
              >
                {isSearching ? 'Searching...' : 'Search Remedy'}
              </button>
            </form>

            {remedyResult && (
              <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-orange-50 dark:border-slate-700 shadow-xl animate-in zoom-in-95 duration-500 space-y-6">
                <div className="flex justify-between items-start">
                  <h4 className="text-2xl font-black text-[#8b4513] dark:text-orange-200">{remedyResult.name}</h4>
                  <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase">Traditional Curation</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Benefits</p>
                    <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{remedyResult.benefits}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Ingredients</p>
                      <ul className="space-y-1">
                        {remedyResult.ingredients.map((ing, i) => (
                          <li key={i} className="text-sm font-bold text-slate-600 dark:text-slate-400 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span> {ing}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Preparation</p>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed italic">{remedyResult.preparation}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Essential Nutrients Encyclopedia */}
          <div className="bg-white dark:bg-[#1e293b] rounded-[3.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-sm space-y-8">
            <h3 className="text-2xl font-black text-[#1e2a3a] dark:text-white">Essential Nutrients Guide</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { name: 'Vitamin C', source: 'Oranges, Lemons, Peppers', benefit: 'Immunity & Skin Health', icon: '🍋' },
                { name: 'Omega-3', source: 'Walnuts, Chia, Flaxseeds', benefit: 'Heart & Brain Function', icon: '🧠' },
                { name: 'Iron', source: 'Spinach, Lentils, Beans', benefit: 'Energy & Blood Health', icon: '🩸' },
                { name: 'Magnesium', source: 'Dark Chocolate, Almonds', benefit: 'Sleep & Muscle Recovery', icon: '🌙' },
              ].map(nut => (
                <div key={nut.name} className="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 transition-all">
                  <div className="text-3xl mb-4">{nut.icon}</div>
                  <h4 className="text-lg font-black text-slate-800 dark:text-white">{nut.name}</h4>
                  <p className="text-xs font-bold text-[#2f80ed] mt-1">{nut.source}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{nut.benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Yoga Integrated Guide */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white dark:bg-[#1e293b] rounded-[3rem] p-8 shadow-sm border border-slate-100 dark:border-slate-800 space-y-8">
            <h3 className="text-2xl font-black text-[#1e2a3a] dark:text-white flex items-center gap-3">
              Yoga Guide 🧘‍♀️
            </h3>
            <div className="space-y-6">
              {[
                { title: 'Morning Stretch', time: '10m', diff: 'Beginner', desc: 'Activate your muscles and joints.' },
                { title: 'Mindful Breathing', time: '5m', diff: 'Any Level', desc: 'Lower cortisol and anxiety.' },
                { title: 'Sleep Well Flow', time: '15m', diff: 'Gentle', desc: 'Relaxation for deep sleep.' },
              ].map((yoga, i) => (
                <div key={i} className="group p-5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-purple-200 cursor-pointer transition-all">
                  <h4 className="font-black text-[#1e2a3a] dark:text-white group-hover:text-purple-600 transition-colors">{yoga.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-3">{yoga.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest">{yoga.time}</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{yoga.diff}</span>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => onNavigate(AppView.YOGA)}
              className="w-full bg-purple-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-purple-700 transition-all"
            >
              Enter Yoga Studio
            </button>
          </div>

          <div className="bg-[#1e2a3a] rounded-[3rem] p-8 text-white space-y-6 shadow-2xl overflow-hidden relative group">
            <div className="relative z-10 space-y-4">
              <h4 className="text-xl font-black">AI Health Analysis</h4>
              <p className="text-sm opacity-70 leading-relaxed font-medium">Get a deep clinical analysis of your diet by uploading a photo of your meal or ingredients.</p>
              <button 
                onClick={() => onNavigate(AppView.WELLNESS)}
                className="w-full bg-[#2f80ed] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest"
              >
                Start Scan
              </button>
            </div>
            <div className="absolute -right-6 -bottom-6 text-7xl opacity-10 rotate-12 group-hover:scale-110 transition-transform">🤖</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionGuideView;
