
import React, { useState, useMemo } from 'react';
import { AppView, Language, Product, CartItem } from '../types';
import { translations } from '../i18n';

const products: Product[] = [
  { id: 'med1', name: 'Paracetamol 500mg', price: 45, originalPrice: 120, category: 'Medicine', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400', description: 'Relief from pain and fever.' },
  { id: 's1', name: 'Vitamin C Serum', price: 599, originalPrice: 1499, category: 'Skincare', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400', description: 'Brightening formulation.' },
  { id: 'm2', name: 'Digital BP Monitor', price: 1299, originalPrice: 2999, category: 'Equipment', image: 'https://images.unsplash.com/photo-1628595308605-2824229905af?auto=format&fit=crop&q=80&w=400', description: 'Accurate tracking.' },
  { id: 'm3', name: 'Pulse Oximeter', price: 399, originalPrice: 899, category: 'Equipment', image: 'https://images.unsplash.com/photo-1603398938378-e54eab446df1?auto=format&fit=crop&q=80&w=400', description: 'SpO2 monitoring.' }
];

interface StoreSectionProps {
  onNavigate?: (view: AppView) => void;
  lang?: Language;
}

const StoreSection: React.FC<StoreSectionProps> = ({ onNavigate, lang = Language.EN }) => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const t = translations[lang].sections;

  const filteredProducts = useMemo(() => {
    return products.filter(p => (filter === 'All' || p.category === filter) && p.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, filter]);

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <section className="px-4 md:px-8 py-20 space-y-12 max-w-[1440px] mx-auto relative z-10">
      {/* Integrated Marketplace Hub in Store */}
      <div className="bg-[#1e2a3a] dark:bg-slate-900 rounded-[4rem] p-10 md:p-14 text-white shadow-2xl space-y-10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-4xl font-black tracking-tighter uppercase">Marketplace & Assets</h2>
            <p className="text-slate-400 font-medium max-w-md">The unified ecosystem for clinical needs. Buy new, rent gear, or sell pre-owned hardware.</p>
          </div>
          <div className="flex gap-4">
             <button onClick={() => setIsCartOpen(true)} className="bg-white/10 hover:bg-white/20 px-8 py-4 rounded-3xl font-black text-[10px] uppercase tracking-widest border border-white/10 transition-all">
                Cart (₹{cartTotal})
             </button>
             <button onClick={() => onNavigate?.(AppView.AMBULANCE)} className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-3xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all">
                Emergency SOS
             </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          {[
            { l: 'Buy Meds', i: '💊', color: 'bg-blue-500/20', v: AppView.STORE },
            { l: 'Sell Gear', i: '📸', color: 'bg-green-500/20', v: AppView.SCANNER },
            { l: 'Rent Equipment', i: '🦽', color: 'bg-orange-500/20', v: AppView.EQUIPMENT_PORTAL },
            { l: 'Donations', i: '🤝', color: 'bg-purple-500/20', v: AppView.EQUIPMENT_PORTAL }
          ].map(hub => (
            <div 
              key={hub.l} 
              onClick={() => onNavigate?.(hub.v)}
              className={`${hub.color} p-6 rounded-[2.5rem] border border-white/5 hover:bg-white/10 cursor-pointer transition-all flex items-center gap-4 group active:scale-95`}
            >
              <span className="text-3xl group-hover:rotate-12 transition-transform">{hub.i}</span>
              <span className="text-[10px] font-black uppercase tracking-widest">{hub.l}</span>
            </div>
          ))}
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      </div>

      {/* Main Pharmacy Grid */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Essential Pharmacy</h3>
        <div className="flex gap-2">
          {['All', 'Medicine', 'Skincare', 'Equipment'].map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === cat ? 'bg-[#2f80ed] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>{cat}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map(p => (
          <div key={p.id} className="bg-white dark:bg-slate-800 p-6 rounded-[4rem] border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all group active:scale-95">
             <div className="aspect-[4/5] rounded-[3rem] overflow-hidden mb-6 bg-slate-50 dark:bg-slate-900 border border-slate-50 dark:border-white/5">
                <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
             </div>
             <div className="space-y-4 px-2">
                <h4 className="text-xl font-black dark:text-white group-hover:text-[#2f80ed] transition-colors line-clamp-1">{p.name}</h4>
                <div className="flex justify-between items-center">
                   <span className="text-2xl font-black dark:text-white">₹{p.price}</span>
                   <button 
                     onClick={() => setCart([...cart, { ...p, quantity: 1 }])}
                     className="bg-slate-50 dark:bg-slate-900 w-12 h-12 rounded-2xl flex items-center justify-center text-xl hover:bg-[#2f80ed] hover:text-white transition-all shadow-sm"
                   >
                     +
                   </button>
                </div>
             </div>
          </div>
        ))}
      </div>

      {isCartOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white dark:bg-[#070b14] h-full p-10 flex flex-col shadow-2xl rounded-l-[4rem]">
             <h3 className="text-3xl font-black mb-10 dark:text-white">My Pharmacy Cart</h3>
             <div className="flex-1 overflow-y-auto space-y-6">
                {cart.map((item, idx) => (
                   <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl flex items-center gap-6 border border-slate-100 dark:border-white/5">
                      <img src={item.image} className="w-16 h-16 rounded-2xl" />
                      <div className="flex-1">
                         <p className="font-black text-sm dark:text-white">{item.name}</p>
                         <p className="text-[#2f80ed] font-black">₹{item.price}</p>
                      </div>
                   </div>
                ))}
             </div>
             <div className="pt-8 space-y-4">
                <div className="flex justify-between text-2xl font-black dark:text-white"><span>Total</span><span>₹{cartTotal}</span></div>
                <button className="w-full bg-[#2f80ed] text-white py-6 rounded-3xl font-black uppercase text-xs tracking-widest shadow-xl">Checkout</button>
             </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default StoreSection;
