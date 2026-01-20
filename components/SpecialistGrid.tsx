
import React, { useState, useEffect } from 'react';
import { Specialist, AppView } from '../types';
import BookingModal from './BookingModal';

const specialists: Specialist[] = [
  { id: '1', name: 'Dr. Ananya Sharma', specialty: 'General Physician', description: 'Expert in preventive care and chronic illness management.', fee: 299, image: 'https://images.unsplash.com/photo-1559839734-2b71f1e59816?auto=format&fit=crop&q=80&w=400', availability: 'available', experience: 12, mciNumber: 'MCI-92831', education: 'MBBS, MD (General Medicine)', verificationSource: 'Ayushman Bharat' },
  { id: '2', name: 'Dr. Rajesh Khanna', specialty: 'Dermatologist', description: 'Expert in clinical dermatology, acne, and skin rejuvenation.', fee: 399, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400', availability: 'busy', experience: 10, mciNumber: 'MCI-88219', education: 'MBBS, DDVL', verificationSource: 'MCI Verified' },
  { id: '3', name: 'Dr. Meera Reddy', specialty: 'Pediatrician', description: 'Child development specialist focused on nutrition.', fee: 499, image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=400', availability: 'available', experience: 9, mciNumber: 'MCI-66120', education: 'MBBS, DCH, MD (Peds)', verificationSource: 'Ayushman Bharat' },
  { id: '4', name: 'Dr. Amitav Ghosh', specialty: 'Cardiologist', description: 'Interventionist specializing in heart failure.', fee: 599, image: 'https://images.unsplash.com/photo-1559839734-2b71f1e59816?auto=format&fit=crop&q=80&w=400', availability: 'offline', experience: 20, mciNumber: 'MCI-00192', education: 'MBBS, MD, DM (Cardio)', verificationSource: 'MCI Verified' },
  { id: '5', name: 'Dr. Sunita Rao', specialty: 'Gynecologist', description: 'Comprehensive women’s health and reproductive medicine.', fee: 449, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400', availability: 'available', experience: 18, mciNumber: 'MCI-99011', education: 'MBBS, MS (OBG)', verificationSource: 'Ayushman Bharat' },
  { id: '6', name: 'Dr. Harpreet Singh', specialty: 'Dentist', description: 'Aesthetic dentistry and maxillofacial surgeon.', fee: 349, image: 'https://images.unsplash.com/photo-1623854767648-e7bb8009f0ad?auto=format&fit=crop&q=80&w=400', availability: 'busy', experience: 5, mciNumber: 'DCI-9921', education: 'BDS, MDS', verificationSource: 'MCI Verified' },
  { id: 'g2', name: 'Dr. Vikram Seth', specialty: 'General Physician', description: 'Specialist in metabolic health and lifestyle diseases.', fee: 299, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400', availability: 'available', experience: 8, mciNumber: 'MCI-10293', education: 'MBBS, DNB', verificationSource: 'MCI Verified' },
  { id: 'd2', name: 'Dr. Sneha Kapoor', specialty: 'Dermatologist', description: 'Cosmetic dermatologist and hair transplant surgeon.', fee: 399, image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=400', availability: 'available', experience: 7, mciNumber: 'MCI-33102', education: 'MBBS, MD (Skin)', verificationSource: 'Ayushman Bharat' },
];

interface SpecialistGridProps {
  onNavigate?: (view: AppView) => void;
  onSpecialtySelect?: (specialty: string) => void;
  isDedicatedPage?: boolean;
  initialFilter?: string;
  limit?: number;
}

const SpecialistGrid: React.FC<SpecialistGridProps> = ({ 
  onNavigate, 
  onSpecialtySelect, 
  isDedicatedPage = false, 
  initialFilter = 'All',
  limit
}) => {
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);
  const [showAuthModal, setShowAuthModal] = useState<Specialist | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setActiveFilter(initialFilter);
  }, [initialFilter]);

  useEffect(() => {
    if (searchTerm || activeFilter !== 'All') {
      setIsSearching(true);
      const timer = setTimeout(() => setIsSearching(false), 400);
      return () => clearTimeout(timer);
    }
  }, [searchTerm, activeFilter]);

  const handleFilterClick = (cat: string) => {
    if (!isDedicatedPage && onSpecialtySelect) {
      onSpecialtySelect(cat);
    } else {
      setActiveFilter(cat);
    }
  };

  const getCategorizedSpecialists = () => {
    const filtered = specialists.filter(s => {
      const matchesSearch = s.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === 'All' || s.specialty.toLowerCase().includes(activeFilter.toLowerCase());
      return matchesSearch && matchesFilter;
    });

    if (limit && !isDedicatedPage) {
      const variety: Specialist[] = [];
      const seenSpecialties = new Set<string>();
      
      filtered.forEach(s => {
        if (!seenSpecialties.has(s.specialty)) {
          variety.push(s);
          seenSpecialties.add(s.specialty);
        }
      });
      
      if (variety.length < limit) {
        filtered.forEach(s => {
          if (variety.length < limit && !variety.find(v => v.id === s.id)) {
            variety.push(s);
          }
        });
      }
      
      return variety.slice(0, limit);
    }

    return limit ? filtered.slice(0, limit) : filtered;
  };

  const displaySpecialists = getCategorizedSpecialists();

  return (
    <section className={`px-4 md:px-8 py-6 transition-all duration-500 w-full ${isDedicatedPage ? '' : 'bg-white dark:bg-[#0f172a] rounded-[3.5rem] mx-auto border border-slate-100 dark:border-slate-800 max-w-[1440px]'}`}>
      {!isDedicatedPage && (
        <div className="max-w-3xl mx-auto mb-8 space-y-4">
          <div className="flex items-center gap-3 p-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-full border border-slate-100 dark:border-slate-700 shadow-inner group transition-all duration-300">
            <span className="pl-4 text-lg">🔍</span>
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Find clinical field..." 
              className="flex-1 pr-6 py-3 rounded-full bg-transparent outline-none font-bold text-[#1e2a3a] dark:text-white placeholder:text-slate-400 text-sm"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {['All', 'General Physician', 'Dermatologist', 'Pediatrician', 'Cardiologist'].map(cat => (
              <button 
                key={cat}
                onClick={() => handleFilterClick(cat)}
                className={`px-4 py-1.5 rounded-full text-[8px] font-black transition-all uppercase tracking-widest border ${
                  activeFilter === cat 
                    ? 'bg-[#2f80ed] text-white border-[#2f80ed] shadow-md' 
                    : 'bg-white dark:bg-slate-800 text-slate-400 border-slate-100 dark:border-slate-700 hover:border-blue-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-full mx-auto transition-opacity duration-300 ${isSearching ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
        {displaySpecialists.map((s) => (
          <div 
            key={s.id} 
            onClick={() => setShowAuthModal(s)}
            className="bg-white dark:bg-[#1e293b] rounded-[2rem] p-3 border border-slate-100 dark:border-white/5 hover:border-blue-300 hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center group active:scale-95 cursor-pointer h-full"
          >
            <div className="w-full aspect-[4/3] overflow-hidden rounded-[1.5rem] mb-3 relative bg-slate-100 dark:bg-slate-800">
              <img src={s.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={s.specialty} />
              <div className="absolute top-2 right-2 bg-white/90 dark:bg-[#1e293b]/90 backdrop-blur-md p-1 rounded-lg shadow-sm">
                <div className={`w-1.5 h-1.5 rounded-full ${s.availability === 'available' ? 'bg-green-500 animate-pulse' : s.availability === 'busy' ? 'bg-yellow-500' : 'bg-red-500'}`} />
              </div>
            </div>
            
            <div className="flex-1 w-full space-y-2 px-1">
              <div className="space-y-0.5">
                {isDedicatedPage && (
                  <h3 className="font-black text-[#1e2a3a] dark:text-white text-sm leading-tight mb-1">{s.name}</h3>
                )}

                <p className="text-lg text-[#2f80ed] font-black uppercase tracking-tighter leading-none group-hover:scale-105 transition-transform">
                  {s.specialty.split(' ')[0]}
                </p>
                <p className="text-[9px] text-[#2f80ed]/60 font-black uppercase tracking-widest block leading-none">
                  {s.specialty.split(' ').slice(1).join(' ')}
                </p>
                
                <div className="flex items-center justify-center gap-1.5 mt-2 text-[7px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50 dark:bg-slate-800/50 py-1 rounded-full border border-slate-100 dark:border-slate-800">
                  <span className="text-blue-500">🛡️</span> VERIFIED
                </div>
              </div>
              
              <button 
                onClick={(e) => { e.stopPropagation(); setShowAuthModal(s); }}
                className="w-full bg-[#1e2a3a] dark:bg-[#2f80ed] text-white py-2.5 rounded-xl font-black text-[8px] uppercase tracking-[0.2em] hover:bg-[#2f80ed] transition-all"
              >
                Profile • ₹{s.fee}
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAuthModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="bg-white dark:bg-[#0f172a] w-full max-w-3xl rounded-[3rem] shadow-2xl overflow-hidden relative border border-white/10 animate-in zoom-in-95">
              <button 
                onClick={() => setShowAuthModal(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-red-500 transition-all z-20"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                 <div className="aspect-square lg:aspect-auto bg-slate-50 dark:bg-slate-900 relative">
                    <img src={showAuthModal.image} className="w-full h-full object-cover" alt="Professional" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 space-y-1">
                       <span className="px-2 py-0.5 bg-green-500 text-white rounded-full text-[7px] font-black uppercase tracking-widest shadow-xl">Verified Provider</span>
                       <h3 className="text-2xl font-black text-white tracking-tighter leading-none">{showAuthModal.name}</h3>
                       <p className="text-blue-300 font-black uppercase tracking-[0.2em] text-[8px]">{showAuthModal.specialty}</p>
                    </div>
                 </div>

                 <div className="p-8 space-y-6 overflow-y-auto bg-white dark:bg-[#0f172a]">
                    <div className="space-y-4">
                       <div className="space-y-1">
                          <h4 className="text-[8px] font-black text-blue-500 uppercase tracking-widest">About Professional</h4>
                          <p className="text-slate-500 dark:text-slate-400 font-medium text-xs leading-relaxed">{showAuthModal.description}</p>
                       </div>

                       <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                             <p className="text-[7px] font-black text-slate-400 uppercase mb-1">Exp.</p>
                             <p className="text-sm font-black text-[#1e2a3a] dark:text-white">{showAuthModal.experience}+ Yrs</p>
                          </div>
                          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                             <p className="text-[7px] font-black text-slate-400 uppercase mb-1">MCI ID</p>
                             <p className="text-xs font-black text-[#1e2a3a] dark:text-white truncate">{showAuthModal.mciNumber}</p>
                          </div>
                       </div>

                       <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-800">
                          <h5 className="text-[8px] font-black text-[#2f80ed] uppercase tracking-widest mb-1">Credentials</h5>
                          <p className="text-xs font-black text-[#1e2a3a] dark:text-white">{showAuthModal.education}</p>
                       </div>
                    </div>

                    <button 
                      onClick={() => { setSelectedSpecialist(showAuthModal); setShowAuthModal(null); }}
                      className="w-full bg-[#1e2a3a] dark:bg-[#2f80ed] text-white py-4 rounded-2xl font-black text-base shadow-xl hover:scale-[1.02] transition-all active:scale-95"
                    >
                      Book Consult • ₹{showAuthModal.fee}
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {selectedSpecialist && (
        <BookingModal 
          specialist={selectedSpecialist} 
          onClose={() => setSelectedSpecialist(null)}
          onConfirm={() => {
            setSelectedSpecialist(null);
            if (onNavigate) onNavigate(AppView.ACCOUNT);
          }}
        />
      )}
    </section>
  );
};

export default SpecialistGrid;
