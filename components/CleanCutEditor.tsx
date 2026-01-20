
import React, { useState, useRef } from 'react';
import { editProductImage } from '../services/geminiService';
import { storage } from '../services/storageService';

const CleanCutEditor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setEditedImage(null);
        setShowOriginal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async (overridePrompt?: string) => {
    const activePrompt = overridePrompt || prompt;
    if (!image || !activePrompt.trim() || isProcessing) return;

    setIsProcessing(true);
    const result = await editProductImage(image, activePrompt);
    if (result) {
      setEditedImage(result);
      storage.saveStudioProject({
        id: Date.now().toString(),
        original: image,
        edited: result,
        prompt: activePrompt,
        timestamp: Date.now()
      });
    } else {
      alert("AI was unable to process this request. Try a simpler prompt.");
    }
    setIsProcessing(false);
  };

  const checkerboardStyle = {
    backgroundImage: `
      linear-gradient(45deg, #e5e7eb 25%, transparent 25%), 
      linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), 
      linear-gradient(45deg, transparent 75%, #e5e7eb 75%), 
      linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)
    `,
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
  };

  return (
    <div className="max-w-[1440px] mx-auto p-4 md:p-12 space-y-12 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Workspace Area */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-[#0f172a] rounded-[3.5rem] p-8 border border-slate-100 dark:border-white/5 shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest px-2">Workspace</h3>
              {editedImage && (
                <button 
                  onMouseDown={() => setShowOriginal(true)}
                  onMouseUp={() => setShowOriginal(false)}
                  onMouseLeave={() => setShowOriginal(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#2f80ed] hover:text-white transition-all select-none"
                >
                  Hold to Compare
                </button>
              )}
            </div>

            <div 
              onClick={() => !image && fileInputRef.current?.click()}
              className={`aspect-[4/3] rounded-[2.5rem] flex items-center justify-center overflow-hidden transition-all relative border-2 ${
                image ? 'border-transparent bg-slate-50 dark:bg-[#0b0f1a]' : 'border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0b0f1a] cursor-pointer'
              }`}
            >
              <div className="absolute inset-0 opacity-10 dark:opacity-5" style={checkerboardStyle}></div>
              
              {image ? (
                <div className="relative w-full h-full p-10 flex items-center justify-center">
                  <img 
                    src={(editedImage && !showOriginal) ? editedImage : image} 
                    className={`max-w-full max-h-full object-contain relative z-10 transition-all duration-300 ${isProcessing ? 'blur-sm grayscale opacity-50' : ''}`} 
                    alt="Current Asset" 
                  />
                  {isProcessing && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-20 space-y-4">
                      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-[10px] font-black text-white bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">Applying AI Magic...</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center p-12 space-y-4 opacity-30 relative z-10 group-hover:opacity-60 transition-all">
                  <div className="text-7xl">🖼️</div>
                  <p className="font-black text-slate-400">Drag & Drop Product Shot</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-4">
             <button 
               onClick={() => fileInputRef.current?.click()}
               className="bg-white dark:bg-slate-800 text-[#1e2a3a] dark:text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest border border-slate-200 dark:border-white/5 shadow-sm hover:bg-slate-50 transition-all"
             >
               Change Source
             </button>
             {editedImage && (
               <a 
                 href={editedImage} 
                 download="CleanCut-Edit.png"
                 className="flex-1 bg-[#2f80ed] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-center shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all"
               >
                 Export Result
               </a>
             )}
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-[#1e2a3a] rounded-[3.5rem] p-8 text-white shadow-2xl space-y-8 relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div>
                <h2 className="text-2xl font-black tracking-tight">AI Instruction</h2>
                <p className="text-slate-400 text-xs font-medium mt-1">Describe how you want to clean this photo.</p>
              </div>

              <div className="space-y-4">
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleEdit()}
                  placeholder="e.g., remove background and add soft shadow..."
                  className="w-full bg-white/5 border border-white/10 p-6 rounded-[2rem] outline-none focus:ring-2 ring-blue-500 font-bold placeholder:text-slate-600 resize-none h-32"
                />
                <button 
                  onClick={() => handleEdit()}
                  disabled={!image || !prompt.trim() || isProcessing}
                  className="w-full bg-[#2f80ed] hover:bg-blue-600 disabled:opacity-30 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl"
                >
                  Process Edit
                </button>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">One-Tap Presets</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Remove background",
                    "White BG",
                    "Soft Shadow",
                    "Vibrant Light",
                    "Marble Table",
                    "Studio Setup"
                  ].map(hint => (
                    <button 
                      key={hint}
                      onClick={() => { setPrompt(hint); handleEdit(hint); }}
                      className="px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest hover:bg-white/10 hover:border-white/20 transition-all text-left"
                    >
                      {hint}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="bg-white dark:bg-[#0f172a] rounded-[3rem] p-8 border border-slate-100 dark:border-white/5 shadow-sm space-y-6">
             <h4 className="text-sm font-black text-[#1e2a3a] dark:text-white">Pro Tips</h4>
             <ul className="space-y-4">
                {[
                  { icon: '🎯', text: 'Be specific about textures (e.g., "Glossy table").' },
                  { icon: '🔆', text: 'Ask for lighting changes (e.g., "Warm sunlight").' },
                  { icon: '📦', text: 'Perfect for e-commerce "Amazon-ready" shots.' },
                ].map((tip, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="text-lg">{tip.icon}</span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{tip.text}</p>
                  </li>
                ))}
             </ul>
          </div>
        </div>
      </div>

      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
    </div>
  );
};

export default CleanCutEditor;
