
import React, { useState, useEffect } from 'react';
import { Specialist, AppView } from '../types';
import BookingModal from './BookingModal';

const specialists: Specialist[] = [
  { id: '1', name: 'Dr. Sarah Mitchell', specialty: 'General Physician', description: 'Preventive care and chronic illness management expert.', fee: 299, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400', availability: 'available' },
  { id: '2', name: 'Dr. James Chen', specialty: 'Dermatologist', description: 'Expert in clinical dermatology, acne, and advanced skin rejuvenation.', fee: 399, image: 'https://images.unsplash.com/photo-1559839734-2b71f1e59816?auto=format&fit=crop&q=80&w=400', availability: 'busy' },
  { id: '3', name: 'Dr. Elena Rossi', specialty: 'Pediatrician', description: 'Child development specialist focused on pediatric nutrition.', fee: 499, image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400', availability: 'available' },
  { id: '4', name: 'Dr. Michael Vogt', specialty: 'Cardiologist', description: 'Interventional cardiologist specializing in heart failure.', fee: 599, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400', availability: 'offline' },
  { id: '5', name: 'Dr. Priya Sharma', specialty: 'Gynecologist', description: 'Comprehensive women’s health and reproductive medicine.', fee: 449, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400', availability: 'available' },
  { id: '6', name: 'Dr. Arjan Singh', specialty: 'Dentist', description: 'Aesthetic dentistry and maxillofacial surgeon.', fee: 349, image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=400', availability: 'busy' },
];

interface SpecialistGridProps {
  onNavigate?: (view: AppView) => void;
  isDedicatedPage?: boolean;
}

const SpecialistGrid: React.FC<SpecialistGridProps> = ({ onNavigate, isDedicatedPage = false }) => {
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isSearching, setIsSearching] = useState(false);

  // Simulate network latency for search/filter feedback
  useEffect(() => {
    if (searchTerm || activeFilter !== 'All') {
      setIsSearching(true);
      const timer = setTimeout(() => setIsSearching(false), 600);
      return () => clearTimeout(timer);
    }
  }, [searchTerm, activeFilter]);

  const handleConfirmBooking = () => {
    setSelectedSpecialist(null);
    if (onNavigate) onNavigate(AppView.ACCOUNT);
  };

  const navigateToConsult = () => {
    if (!isDedicatedPage && onNavigate) {
      onNavigate(AppView.CONSULT);
    }
  };

  const filteredSpecialists = specialists.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || s.specialty.toLowerCase().includes(activeFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <section className={`px-4 md:px-8 py-12 transition-all duration-500 ${isDedicatedPage ? '' : 'bg-white dark:bg-[#0f172a] rounded-[4rem] mx-4 md:mx-6 border border-slate-100 dark:border-slate-800'}`}>
      <div className="max-w-5xl mx-auto mb-16 space-y-8">
        {/* Market Standard Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-[3rem] border border-slate-100 dark:border-slate-700 shadow-inner group focus-within:ring-2 ring-blue-100 transition-all duration-300">
          <div className="relative flex-1">
            <span className={`absolute left-8 top-1/2 -translate-y-1/2 text-2xl transition-transform duration-300 ${isSearching ? 'scale-125 opacity-50' : 'scale-100 opacity-100'}`}>
              {isSearching ? '⏳' : '🩺'}
            </span>
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={navigateToConsult}
              placeholder="Search for 'Skin', 'Fever', or Dr. Name..." 
              className="w-full pl-20 pr-8 py-6 rounded-[2.5rem] bg-transparent outline-none font-black text-[#1e2a3a] dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-500 text-lg"
            />
          </div>
          <button 
            onClick={navigateToConsult}
            className="bg-[#1e2a3a] dark:bg-[#2f80ed] hover:bg-[#2f80ed] dark:hover:bg-blue-600 text-white px-14 py-6 rounded-[2.5rem] font-black transition-all active:scale-95 shadow-xl uppercase tracking-widest text-[11px] flex items-center gap-2"
          >
            {isSearching && <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
            Filter Results
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {['All', 'General', 'Dermatologist', 'Pediatrician', 'Cardiologist', 'Gynecologist', 'Dentist'].map(cat => (
            <button 
              key={cat}
              onClick={() => {
                setActiveFilter(cat);
                navigateToConsult();
              }}
              className={`px-10 py-3.5 rounded-[1.5rem] text-[10px] font-black transition-all uppercase tracking-[0.2em] border ${
                activeFilter === cat 
                  ? 'bg-[#2f80ed] text-white border-[#2f80ed] shadow-lg scale-105' 
                  : 'bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-100 dark:border-slate-700 hover:border-blue-100 dark:hover:border-blue-500/30 hover:text-slate-600 dark:hover:text-slate-300 hover:scale-105'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-${isDedicatedPage ? '4' : '6'} gap-8 max-w-7xl mx-auto transition-opacity duration-300 ${isSearching ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
        {filteredSpecialists.map((s) => (
          <div 
            key={s.id} 
            className="bg-white dark:bg-[#1e293b] rounded-[3.5rem] p-8 border border-slate-50 dark:border-white/5 hover:border-blue-200 dark:hover:border-blue-500/50 hover:shadow-2xl dark:hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center group active:scale-95 cursor-pointer"
          >
            <div className="w-full aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-6 relative bg-slate-100 dark:bg-slate-800">
              <img src={s.image} className="w-full h-full object-cover rounded-[2rem] group-hover:scale-110 transition-transform duration-1000" alt={s.name} />
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-[#1e293b]/90 backdrop-blur-md p-2 rounded-xl shadow-sm transform transition-transform group-hover:scale-110">
                <div className={`w-2 h-2 rounded-full ${s.availability === 'available' ? 'bg-green-500 animate-pulse' : s.availability === 'busy' ? 'bg-yellow-500' : 'bg-red-500'}`} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
            
            <div className="flex-1 w-full space-y-1">
              <h3 className="font-black text-[#1e2a3a] dark:text-white text-lg group-hover:text-[#2f80ed] transition-colors duration-300">{s.name}</h3>
              <p className="text-[9px] text-[#2f80ed] font-black uppercase tracking-widest">{s.specialty}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium py-4 line-clamp-2 h-14 overflow-hidden group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">{s.description}</p>
              
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedSpecialist(s); }}
                className="w-full bg-[#1e2a3a] dark:bg-[#2f80ed] text-white py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest hover:bg-[#2f80ed] dark:hover:bg-blue-600 transition-all duration-300 shadow-lg group-hover:shadow-blue-200"
              >
                Book Consult
              </button>
            </div>
          </div>
        ))}
        {filteredSpecialists.length === 0 && !isSearching && (
          <div className="col-span-full py-20 text-center animate-in fade-in zoom-in duration-500">
            <div className="text-6xl mb-6">🔍</div>
            <div className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest text-sm">No matching specialists found.</div>
            <button onClick={() => {setSearchTerm(''); setActiveFilter('All');}} className="mt-4 text-[#2f80ed] font-black underline hover:text-blue-700 transition-colors">Clear all filters</button>
          </div>
        )}
      </div>

      {isSearching && (
        <div className="flex justify-center py-20 animate-pulse">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-150"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-300"></div>
          </div>
        </div>
      )}

      {selectedSpecialist && (
        <BookingModal 
          specialist={selectedSpecialist} 
          onClose={() => setSelectedSpecialist(null)}
          onConfirm={handleConfirmBooking}
        />
      )}
    </section>
  );
};

export default SpecialistGrid;
