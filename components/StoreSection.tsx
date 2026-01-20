
import React, { useState } from 'react';
import { AppView } from '../types';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  image: string;
}

const products: Product[] = [
  { id: 'm1', name: 'Premium Multi-Vitamin', price: 199, originalPrice: 499, category: 'Supplements', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300' },
  { id: 'm2', name: 'Digital BP Monitor', price: 999, originalPrice: 2499, category: 'Equipment', image: 'https://images.unsplash.com/photo-1628595308605-2824229905af?auto=format&fit=crop&q=80&w=300' },
  { id: 'm3', name: 'Pulse Oximeter Pro', price: 359, originalPrice: 899, category: 'Equipment', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300' },
  { id: 'm4', name: 'Herbal Tea Detox', price: 119, originalPrice: 299, category: 'Wellness', image: 'https://images.unsplash.com/photo-1544787210-2213d2426535?auto=format&fit=crop&q=80&w=300' },
  { id: 'm5', name: 'Sleep Relief Melatonin', price: 239, originalPrice: 599, category: 'Supplements', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300' },
  { id: 'm6', name: 'Smart Fitness Band', price: 799, originalPrice: 1999, category: 'Gear', image: 'https://images.unsplash.com/photo-1557128928-66e300629503?auto=format&fit=crop&q=80&w=300' },
];

interface StoreSectionProps {
  onNavigate?: (view: AppView) => void;
  onAddToCart?: () => void;
}

const StoreSection: React.FC<StoreSectionProps> = ({ onNavigate, onAddToCart }) => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(p => {
    const matchesCat = filter === 'All' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section className="px-4 md:px-8 py-12 space-y-16 bg-white dark:bg-[#0b0f1a] rounded-[4rem] mx-4 md:mx-6 border border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-red-100 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-200">
          60% Bharat Discount Applied 🇮🇳
        </div>
        <h2 className="text-5xl font-black text-[#1e2a3a] dark:text-white tracking-tighter">Health Marketplace</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed">Direct warehouse access to medicines and clinical equipment at mass-market prices.</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row gap-4 p-3 bg-slate-50 dark:bg-slate-900 rounded-[3rem] shadow-inner border border-slate-100 dark:border-slate-800">
          <div className="relative flex-1">
            <span className="absolute left-8 top-1/2 -translate-y-1/2 text-2xl">💊</span>
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search 10,000+ medical assets..." 
              className="w-full pl-20 pr-8 py-6 rounded-[2rem] bg-transparent outline-none font-bold text-[#1e2a3a] dark:text-white text-lg placeholder:text-slate-400"
            />
          </div>
          <button className="bg-[#1e2a3a] dark:bg-[#2f80ed] text-white px-12 py-6 rounded-[2.5rem] font-black shadow-xl hover:scale-105 transition-all active:scale-95 uppercase tracking-widest text-[12px]">Find Asset</button>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {['All', 'Supplements', 'Equipment', 'Wellness', 'Gear'].map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-full text-[10px] font-black transition-all uppercase tracking-widest ${filter === cat ? 'bg-[#2f80ed] text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border border-transparent'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-7xl mx-auto">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white dark:bg-[#1e293b] p-6 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all group flex flex-col active:scale-[0.98] cursor-pointer">
            <div className="aspect-square rounded-[2.5rem] overflow-hidden mb-6 bg-slate-50 dark:bg-slate-900 relative">
              <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={product.name} />
              <div className="absolute top-4 left-4 bg-red-500 text-white text-[9px] font-black px-3 py-1 rounded-full shadow-lg">60% OFF</div>
              <button 
                onClick={(e) => { e.stopPropagation(); onAddToCart?.(); }}
                className="absolute bottom-4 right-4 bg-[#2f80ed] text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all opacity-0 group-hover:opacity-100 border-4 border-white dark:border-slate-800"
              >
                <span className="text-2xl">+</span>
              </button>
            </div>
            <div className="space-y-2 flex-1 px-2">
              <p className="text-[9px] font-black text-[#2f80ed] uppercase tracking-[0.2em]">{product.category}</p>
              <h4 className="font-black text-[#1e2a3a] dark:text-white text-sm leading-tight group-hover:text-[#2f80ed] transition-colors">{product.name}</h4>
              <div className="flex items-center gap-2">
                 <p className="font-black text-slate-800 dark:text-white text-lg">₹{product.price}</p>
                 <p className="text-[10px] text-slate-400 line-through font-bold">₹{product.originalPrice}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto pt-10">
        <div className="bg-[#1e2a3a] rounded-[4rem] p-16 text-white shadow-2xl relative overflow-hidden group">
          <div className="relative z-10 space-y-8">
            <h3 className="text-6xl font-black tracking-tighter leading-[0.9]">
              Medicine <br /><span className="text-blue-400">Subscription.</span>
            </h3>
            <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-sm">Never miss a dose. Get your chronic meds delivered every month automatically.</p>
            <button className="bg-white text-[#1e2a3a] px-12 py-6 rounded-[2.5rem] font-black text-lg hover:scale-105 transition-all">Configure Plan</button>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900 rounded-[4rem] p-12 shadow-sm border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { title: 'Buy Hardware', desc: 'Surgical & Monitoring', icon: '📦', color: 'bg-blue-50/50 dark:bg-blue-900/10' },
              { title: 'Rent Gear', desc: 'Short-term recovery', icon: '⌛', color: 'bg-orange-50/50 dark:bg-orange-900/10' },
              { title: 'Sell Equipment', desc: 'Resale old assets', icon: '♻️', color: 'bg-green-50/50 dark:bg-green-900/10' },
              { title: 'Donation Hub', desc: 'Help others in need', icon: '🤝', color: 'bg-purple-50/50 dark:bg-purple-900/10' },
            ].map(service => (
              <div 
                key={service.title} 
                onClick={() => onNavigate?.(AppView.EQUIPMENT_PORTAL)}
                className={`${service.color} p-8 rounded-[3rem] border border-white dark:border-slate-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group`}
              >
                <div className="text-5xl mb-6 group-hover:scale-125 transition-transform origin-left">{service.icon}</div>
                <h4 className="font-black text-[#1e2a3a] dark:text-white text-xl">{service.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1 leading-relaxed">{service.desc}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default StoreSection;
