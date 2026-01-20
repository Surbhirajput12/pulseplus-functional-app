
import React, { useState } from 'react';
import { EquipmentItem } from '../types';

const assets: EquipmentItem[] = [
  { id: 'eq1', name: 'Ultra-Lightweight Wheelchair', brand: 'Drive Medical', category: 'Mobility', price: 18500, rentalPrice: 150, status: 'Available for Rent', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=400', description: 'Dual axle for multiple seat-to-floor height adjustments.' },
  { id: 'eq2', name: 'Elite Oxygen Concentrator 5L', brand: 'Philips Respironics', category: 'Respiratory', price: 42000, rentalPrice: 500, status: 'In Stock', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400', description: 'Small, lightweight, and quiet oxygen concentrator for home use.' },
  { id: 'eq3', name: 'Digital Patient Monitor V5', brand: 'Mindray', category: 'Monitoring', price: 65000, rentalPrice: 800, status: 'In Stock', image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=400', description: 'Advanced vitals monitoring for heart rate, SpO2, and NIBP.' },
  { id: 'eq4', name: 'Precision Mesh Nebulizer', brand: 'Omron', category: 'Respiratory', price: 4999, status: 'In Stock', image: 'https://images.unsplash.com/photo-1559839734-2b71f1e59816?auto=format&fit=crop&q=80&w=400', description: 'Silent mesh technology for efficient drug delivery.' },
];

interface EquipmentPortalProps {
  onBack: () => void;
}

const EquipmentPortal: React.FC<EquipmentPortalProps> = ({ onBack }) => {
  const [filter, setFilter] = useState('All');

  const filteredAssets = filter === 'All' ? assets : assets.filter(a => a.category === filter);

  return (
    <div className="py-12 px-6 max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors group">
            <svg className="w-6 h-6 text-slate-400 group-hover:text-[#2f80ed]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-4xl font-black text-[#1e2a3a] tracking-tighter">Medical Equipment Portal</h1>
            <p className="text-slate-500 font-medium">Professional healthcare hardware acquisition for clinics and home care.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="bg-[#1e2a3a] text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg">Manage My Assets</button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {['All', 'Mobility', 'Respiratory', 'Monitoring', 'Surgical'].map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              filter === cat ? 'bg-[#2f80ed] text-white shadow-xl' : 'bg-white text-slate-400 border border-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredAssets.map(asset => (
          <div key={asset.id} className="bg-white p-8 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col">
            <div className="aspect-square rounded-[2.5rem] bg-slate-50 overflow-hidden mb-6 relative border border-slate-50 shadow-inner">
              <img src={asset.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={asset.name} />
              <div className="absolute top-4 right-4 bg-white/95 px-3 py-1.5 rounded-xl shadow-lg border border-slate-100">
                <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">{asset.brand}</span>
              </div>
            </div>
            
            <div className="space-y-4 flex-1">
              <div>
                <h3 className="text-xl font-black text-[#1e2a3a] group-hover:text-[#2f80ed] transition-colors line-clamp-1">{asset.name}</h3>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{asset.status}</p>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">{asset.description}</p>
              
              <div className="pt-4 flex flex-col gap-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-bold text-slate-400">Buying Price</span>
                  <span className="text-2xl font-black text-[#1e2a3a]">₹{asset.price.toLocaleString()}</span>
                </div>
                {asset.rentalPrice && (
                  <div className="flex items-baseline justify-between pb-4">
                    <span className="text-xs font-bold text-slate-400">Rent per day</span>
                    <span className="text-lg font-black text-orange-500">₹{asset.rentalPrice}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="flex-1 bg-slate-50 text-slate-600 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all">Details</button>
              <button className="flex-1 bg-[#2f80ed] text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-blue-600 transition-all">Select</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipmentPortal;
