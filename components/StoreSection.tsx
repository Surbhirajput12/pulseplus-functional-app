
import React, { useState, useMemo } from 'react';
import { AppView, Language, Product, CartItem } from '../types';
import { translations } from '../i18n';

const products: Product[] = [
  { 
    id: 'med1', name: 'Paracetamol 500mg', price: 45, originalPrice: 120, category: 'Medicine', 
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400',
    description: 'Relief from pain and fever. Essential home kit med.'
  },
  { 
    id: 's1', name: 'Clinical Vitamin C Serum', price: 599, originalPrice: 1499, category: 'Skincare', 
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400',
    description: 'Dermatologist approved brightening formulation.'
  },
  { 
    id: 'm2', name: 'Digital BP Monitor Pro', price: 1299, originalPrice: 2999, category: 'Equipment', 
    image: 'https://images.unsplash.com/photo-1628595308605-2824229905af?auto=format&fit=crop&q=80&w=400',
    description: 'Hospital-grade blood pressure tracking.'
  },
  { 
    id: 'm3', name: 'Pulse Oximeter Elite', price: 399, originalPrice: 899, category: 'Equipment', 
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446df1?auto=format&fit=crop&q=80&w=400',
    description: 'Accurate SpO2 and heart rate monitoring.'
  },
  { 
    id: 'm4', name: 'Herbal Tea Detox Blend', price: 199, originalPrice: 499, category: 'Wellness', 
    image: 'https://images.unsplash.com/photo-1544787210-2213d2426535?auto=format&fit=crop&q=80&w=400',
    description: 'Natural detoxification and metabolic support.'
  },
  { 
    id: 'm6', name: 'Smart Fitness Band V4', price: 899, originalPrice: 2499, category: 'Wellness', 
    image: 'https://images.unsplash.com/photo-1557128928-66e300629503?auto=format&fit=crop&q=80&w=400',
    description: 'Track steps, sleep, and heart rate.'
  },
  { 
    id: 'med2', name: 'Advanced Cough Relief', price: 89, originalPrice: 220, category: 'Medicine', 
    image: 'https://images.unsplash.com/photo-1616671285444-9694e82b7c4d?auto=format&fit=crop&q=80&w=400',
    description: 'Fast acting bronchodilator for lung health.'
  },
  { 
    id: 's2', name: 'Clinical Retinol Gel', price: 749, originalPrice: 1999, category: 'Skincare', 
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7abcfe19?auto=format&fit=crop&q=80&w=400',
    description: 'Anti-aging resurfacing treatment.'
  },
  { 
    id: 'm5', name: 'Sleep Relief Melatonin', price: 239, originalPrice: 599, category: 'Supplements', 
    image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=80&w=400',
    description: 'Gentle support for healthy sleep-wake cycles.'
  }
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
  const [showDonationModal, setShowDonationModal] = useState(false);

  const t = translations[lang].sections;
  const ts = translations[lang].store;
  const te = translations[lang].equipment;

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const filteredProducts = useMemo(() => {
    const q = search.toLowerCase().trim();
    const tokens = q.split(/\s+/).filter(t => t.length > 0);

    return products
      .filter(p => filter === 'All' || p.category === filter)
      .map(p => {
        let score = 0;
        if (tokens.length > 0) {
          const nameLower = p.name.toLowerCase();
          const descLower = p.description.toLowerCase();
          const catLower = p.category.toLowerCase();
          if (nameLower.includes(q)) score += 100;
          tokens.forEach(token => {
            if (nameLower.includes(token)) score += 40;
            if (catLower.includes(token)) score += 20;
            if (descLower.includes(token)) score += 10;
          });
        } else {
          score = 1;
        }
        return { ...p, score };
      })
      .filter(p => p.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [search, filter]);

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <section id="pharmacy-section" className="px-4 md:px-8 py-20 space-y-16 bg-white dark:bg-[#070b14] rounded-[4rem] mx-4 md:mx-6 border border-slate-100 dark:border-white/5 shadow-2xl transition-all relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2f80ed]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="flex justify-between items-center relative z-10 max-w-7xl mx-auto">
        <div className="space-y-4">
           <div className="inline-flex items-center gap-2 px-5 py-2 bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-100 dark:border-red-500/20">
             {t.discountTag}
           </div>
           <h2 className="text-5xl md:text-6xl font-black text-slate-800 dark:text-white tracking-tighter leading-none">{t.marketplace}</h2>
        </div>
        <button 
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="bg-[#1e2a3a] dark:bg-white text-white dark:text-[#1e2a3a] px-8 py-5 rounded-[2rem] font-black flex items-center gap-4 shadow-xl hover:scale-105 active:scale-95 transition-all"
        >
          <span className="text-2xl">🛒</span>
          <div className="flex flex-col items-start leading-none">
            <span className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Cart Total</span>
            <span className="text-lg">₹{cartTotal}</span>
          </div>
        </button>
      </div>

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        <div className="flex gap-4 p-3 bg-slate-50 dark:bg-slate-900/50 backdrop-blur-md rounded-[3rem] border border-slate-200 dark:border-white/10 shadow-inner">
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchPlaceholder} 
            className="flex-1 pl-8 pr-4 py-5 rounded-[2.5rem] bg-white dark:bg-slate-800 outline-none font-bold text-slate-800 dark:text-white text-base shadow-sm focus:ring-2 ring-blue-500/20"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {ts.categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-2xl text-[10px] font-black transition-all uppercase tracking-[0.2em] border ${filter === cat ? 'bg-[#2f80ed] text-white border-transparent shadow-xl' : 'bg-white dark:bg-slate-800 text-slate-400 border-slate-100 dark:border-white/5 hover:border-blue-500/30'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto relative z-10">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white dark:bg-slate-800 p-5 rounded-[3.5rem] border border-slate-100 dark:border-white/5 hover:shadow-2xl transition-all group flex flex-col cursor-pointer active:scale-[0.98]">
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6 bg-slate-50 dark:bg-slate-900 relative shadow-inner">
              <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={product.name} />
              <div className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg">Save 60%</div>
            </div>
            
            <div className="flex-1 flex flex-col px-2">
              <p className="text-[10px] font-black text-[#2f80ed] uppercase tracking-widest mb-1.5">{product.category}</p>
              <h4 className="font-black text-slate-800 dark:text-white text-lg leading-tight group-hover:text-[#2f80ed] transition-colors mb-4">{product.name}</h4>
              
              <div className="mt-auto flex items-end justify-between">
                <div>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Clinic Price</p>
                   <div className="flex items-center gap-3">
                     <span className="text-3xl font-black text-slate-800 dark:text-white leading-none">₹{product.price}</span>
                     <span className="text-xs text-slate-400 line-through font-bold">₹{product.originalPrice}</span>
                   </div>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                  className="bg-slate-100 dark:bg-slate-700 text-[#1e2a3a] dark:text-white w-14 h-14 rounded-2xl flex items-center justify-center text-2xl hover:bg-[#2f80ed] hover:text-white transition-all shadow-sm active:scale-90"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#1e2a3a] dark:bg-blue-600 rounded-[4rem] p-12 md:p-20 text-white shadow-2xl relative overflow-hidden group max-w-7xl mx-auto">
        <div className="relative z-10 max-w-2xl space-y-8">
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
            {ts.subscriptionTitle.split('.')[0]} <br /><span className="text-blue-400 dark:text-blue-200">{ts.subscriptionTitle.split('.')[1]}</span>
          </h3>
          <p className="text-xl text-slate-400 dark:text-blue-100 font-medium leading-relaxed">{ts.subscriptionDesc}</p>
          <button className="bg-white text-[#1e2a3a] px-12 py-6 rounded-[2.5rem] font-black text-sm uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">
            {ts.configure}
          </button>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>
      </div>
    </section>
  );
};

export default StoreSection;
