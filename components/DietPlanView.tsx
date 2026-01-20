
import React, { useState } from 'react';
import { analyzeFoodItem } from '../services/geminiService';
import { DietAnalysis } from '../types';

interface DietPlanViewProps {
  onBack: () => void;
}

const DietPlanView: React.FC<DietPlanViewProps> = ({ onBack }) => {
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<DietAnalysis | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isAnalyzing) return;
    setIsAnalyzing(true);
    const result = await analyzeFoodItem(input);
    if (result) setAnalysis(result);
    setIsAnalyzing(false);
  };

  const renderStars = (score: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < score ? "text-yellow-400" : "text-slate-200 dark:text-slate-700"}>★</span>
    ));
  };

  return (
    <div className="py-12 px-4 md:px-6 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-500 w-full">
      <div className="flex flex-col md:flex-row items-center gap-6 bg-white dark:bg-[#1e293b] p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm">
        <button onClick={onBack} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl shadow-sm hover:bg-slate-100 transition-all">
          <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-black text-[#1e2a3a] dark:text-white tracking-tighter">AI Health Score & Analysis</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Input your meal to see the clinical breakdown and better alternatives.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
           <div className="bg-white dark:bg-[#1e293b] p-8 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800 space-y-8">
              <div className="space-y-4">
                 <h3 className="text-xl font-black text-[#1e2a3a] dark:text-white">Meal Analysis</h3>
                 <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Upload a photo of your food or type the ingredients below.</p>
              </div>

              <form onSubmit={handleAnalyze} className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Type your meal</label>
                    <textarea 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Example: 2 Slices of Pizza and a Coke..."
                      className="w-full bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 outline-none focus:ring-2 ring-blue-100 font-bold transition-all h-32 resize-none text-slate-800 dark:text-white"
                    />
                 </div>
                 <button 
                   type="submit"
                   disabled={isAnalyzing || !input.trim()}
                   className="w-full bg-[#2f80ed] text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                 >
                   {isAnalyzing ? 'Analyzing Macros...' : 'Generate Analysis ✨'}
                 </button>
              </form>

              <div className="pt-8 border-t dark:border-slate-800">
                <p className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest mb-4">Common Examples</p>
                <div className="flex flex-wrap gap-2">
                   {['Burger', 'Masala Dosa', 'Chips', 'Chicken Salad'].map(ex => (
                     <button key={ex} onClick={() => setInput(ex)} className="px-4 py-2 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-[10px] font-black text-slate-400 hover:text-blue-500">{ex}</button>
                   ))}
                </div>
              </div>
           </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
           {analysis ? (
             <div className="animate-in slide-in-from-right-10 duration-500 space-y-8">
                <div className="bg-white dark:bg-[#1e293b] p-10 rounded-[4rem] border border-slate-100 dark:border-slate-800 shadow-2xl space-y-10">
                   <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b dark:border-slate-800 pb-10">
                      <div>
                         <p className="text-[10px] font-black text-[#2f80ed] uppercase tracking-widest mb-1">Pulse Score</p>
                         <h3 className="text-4xl font-black text-[#1e2a3a] dark:text-white capitalize">{analysis.foodItem}</h3>
                      </div>
                      <div className="text-4xl flex gap-1">
                        {renderStars(analysis.healthScore)}
                      </div>
                   </div>

                   <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {[
                        { l: 'Protein', v: analysis.macros.protein, c: 'bg-green-50 text-green-600 dark:bg-green-900/20' },
                        { l: 'Carbs', v: analysis.macros.carbs, c: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' },
                        { l: 'Fats', v: analysis.macros.fats, c: 'bg-red-50 text-red-600 dark:bg-red-900/20' },
                        { l: 'Fiber', v: analysis.macros.fiber, c: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20' },
                      ].map(m => (
                        <div key={m.l} className={`${m.c} p-6 rounded-3xl border border-white/50 dark:border-transparent`}>
                           <p className="text-[10px] font-black uppercase opacity-60 mb-2">{m.l}</p>
                           <p className="text-xl font-black tracking-tighter">{m.v}</p>
                        </div>
                      ))}
                   </div>

                   {analysis.warnings.length > 0 && (
                     <div className="bg-red-50 dark:bg-red-950/20 p-8 rounded-[2.5rem] border border-red-100 dark:border-red-900/30 space-y-4">
                        <div className="flex items-center gap-3">
                           <span className="text-2xl">⚠️</span>
                           <h4 className="text-lg font-black text-red-600 dark:text-red-400">Health Warnings</h4>
                        </div>
                        <ul className="space-y-2">
                           {analysis.warnings.map((w, i) => (
                             <li key={i} className="text-sm font-bold text-red-800 dark:text-red-300">• {w}</li>
                           ))}
                        </ul>
                     </div>
                   )}

                   <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 space-y-6">
                      <h4 className="text-lg font-black text-blue-600 dark:text-blue-400 flex items-center gap-3">
                         <span>✨</span> Healthier Alternatives
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                         {analysis.alternatives.map((alt, i) => (
                           <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-blue-50 dark:border-slate-700 text-xs font-black text-slate-600 dark:text-slate-300 text-center shadow-sm">
                              {alt}
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
           ) : (
             <div className="h-full flex flex-col items-center justify-center p-20 text-center space-y-8 opacity-40">
                <div className="text-9xl animate-bounce">🥗</div>
                <div className="space-y-2">
                   <h3 className="text-3xl font-black text-slate-400 dark:text-slate-600">Ready to Analyze</h3>
                   <p className="text-slate-400 dark:text-slate-600 font-bold max-w-sm">Enter a food item to see its nutritional intelligence and potential health impact.</p>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default DietPlanView;
