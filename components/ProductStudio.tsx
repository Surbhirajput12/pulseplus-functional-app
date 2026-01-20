
import React, { useState, useRef } from 'react';
import { editProductImage } from '../services/geminiService';
import { storage } from '../services/storageService';

interface ProductStudioProps {
  onBack: () => void;
}

const ProductStudio: React.FC<ProductStudioProps> = ({ onBack }) => {
  const [image, setImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setEditedImage(null);
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
        timestamp: Date.now()
      });
    } else {
      alert("AI was unable to process this request. Try a simpler prompt like 'Remove background'.");
    }
    setIsProcessing(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-10 rounded-[4rem] shadow-sm border border-slate-100">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-[#2f80ed] transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <div>
            <h1 className="text-4xl font-black text-[#1e2a3a] tracking-tight">AI Product Studio</h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">Professional Background Removal & Cleanup</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="px-8 py-4 rounded-[1.5rem] bg-[#1e2a3a] text-white font-black text-sm hover:scale-105 transition-all shadow-xl"
          >
            Upload Photo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="bg-white rounded-[4rem] p-8 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-[#1e2a3a] mb-6 px-2">Original Asset</h3>
            <div 
              onClick={() => !image && fileInputRef.current?.click()}
              className={`aspect-square rounded-[3rem] border-4 border-dashed flex items-center justify-center overflow-hidden transition-all ${
                image ? 'border-transparent bg-slate-50' : 'border-slate-100 bg-slate-50 hover:border-blue-200 cursor-pointer'
              }`}
            >
              {image ? (
                <img src={image} className="w-full h-full object-contain p-8" />
              ) : (
                <div className="text-center p-12 space-y-4">
                  <div className="text-6xl">📸</div>
                  <p className="font-black text-slate-400">Click to upload product photo</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-[4rem] p-8 border border-slate-100 shadow-2xl">
            <h3 className="text-xl font-black text-[#1e2a3a] mb-6 px-2">AI Result</h3>
            <div className="aspect-square rounded-[3rem] bg-[#f8fafc] flex items-center justify-center overflow-hidden border-2 border-white relative shadow-inner">
              {editedImage ? (
                <img src={editedImage} className="w-full h-full object-contain p-8 animate-in zoom-in duration-500" />
              ) : isProcessing ? (
                <div className="text-center space-y-6">
                  <div className="relative w-20 h-20 mx-auto">
                    <div className="absolute inset-0 border-8 border-blue-50 rounded-full"></div>
                    <div className="absolute inset-0 border-8 border-[#2f80ed] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <p className="font-black text-[#1e2a3a]">Synthesizing Studio Shot...</p>
                </div>
              ) : (
                <div className="text-center space-y-4 opacity-30">
                  <div className="text-7xl">✨</div>
                  <p className="font-black text-slate-400">Enter instruction to process</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1e2a3a] rounded-[4rem] p-10 md:p-16 text-white shadow-2xl">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-black">Edit with AI Instructions</h2>
            <p className="text-slate-400 font-medium">Type what you want to change, and Pulseplus AI will handle the rest.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 p-2 bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10">
            <input 
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
              placeholder="e.g., remove background, clean up surface, add studio lighting..."
              className="flex-1 px-8 py-5 rounded-[2rem] bg-transparent outline-none font-bold text-white placeholder:text-slate-500"
            />
            <button 
              onClick={() => handleEdit()}
              disabled={!image || !prompt.trim() || isProcessing}
              className="bg-[#2f80ed] hover:bg-blue-600 disabled:opacity-30 text-white px-12 py-5 rounded-[2rem] font-black transition-all shadow-xl"
            >
              Apply Edit
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Remove background",
              "Studio white background",
              "High quality cleanup",
              "Fix lighting",
              "Make it pop"
            ].map(hint => (
              <button 
                key={hint}
                onClick={() => { setPrompt(hint); handleEdit(hint); }}
                className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-black hover:bg-white/10 hover:border-white/20 transition-all"
              >
                {hint}
              </button>
            ))}
          </div>
        </div>
      </div>

      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
    </div>
  );
};

export default ProductStudio;
