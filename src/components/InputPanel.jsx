import React, { useState } from 'react';
import { Loader2, Play, FileText, Scale, MessageSquare } from 'lucide-react';
import clsx from 'clsx';

const QUICK_LOADS = [
  { id: 'berita', label: 'Berita', icon: FileText, text: 'Presiden Joko Widodo meresmikan jembatan baru di Jakarta pada hari Senin. Proyek ini didukung oleh Kementerian Pekerjaan Umum.' },
  { id: 'hukum', label: 'Hukum', icon: Scale, text: 'Berdasarkan putusan Mahkamah Agung nomor 123/Pdt.G/2023, PT Makmur Abadi dinyatakan bersalah atas sengketa lahan di Surabaya.' },
  { id: 'sosmed', label: 'Sosial Media', icon: MessageSquare, text: 'Wah, konser BLACKPINK di GBK kemarin keren banget! Tiketnya habis diborong sama anak-anak Jaksel dalam 5 menit.' }
];

export default function InputPanel({ onAnalyze, isProcessing }) {
  const [text, setText] = useState('');

  const handleQuickLoad = (sampleText) => {
    setText(sampleText);
  };

  const charCount = text.length;
  // Simple word count as mock token count
  const tokenCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

  return (
    <div className="flex flex-col h-full bg-base-800 rounded-xl border border-base-700 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-colors duration-300">
      <div className="flex items-center justify-between px-4 py-3 border-b border-base-700 bg-base-900/50">
        <h2 className="font-mono text-sm font-semibold text-base-text uppercase tracking-wider flex items-center">
          <span className="w-2 h-2 rounded-full bg-accent-cyan mr-2 shadow-[0_0_8px_rgba(0,229,255,0.8)]"></span>
          Input Source
        </h2>
        <div className="flex space-x-2">
          {QUICK_LOADS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleQuickLoad(item.text)}
                className="flex items-center px-2.5 py-1.5 rounded-md bg-base-700 hover:bg-base-600 text-xs font-medium text-base-muted hover:text-base-text transition-colors border border-transparent hover:border-base-500 cursor-pointer"
                title={`Muat contoh: ${item.label}`}
              >
                <Icon className="w-3.5 h-3.5 mr-1.5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="flex-1 p-4 relative group">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Masukkan teks bahasa Indonesia untuk dianalisis..."
          className="w-full h-full bg-transparent text-base-text placeholder-base-muted/50 resize-none outline-none font-sans text-base leading-relaxed"
          disabled={isProcessing}
        />
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <div className="flex space-x-4 font-mono text-[11px] text-base-muted bg-base-900/80 px-3 py-1.5 rounded-md backdrop-blur-sm border border-base-700">
            <span>CHARS: <span className="text-base-text">{charCount}</span></span>
            <span>EST. TOKENS: <span className="text-base-text">{tokenCount}</span></span>
          </div>
          
          <button
            onClick={() => onAnalyze(text)}
            disabled={isProcessing || text.trim().length === 0}
            className={clsx(
              "pointer-events-auto flex items-center justify-center px-6 py-2.5 rounded-md font-mono text-sm font-bold uppercase tracking-wider transition-all duration-300",
              isProcessing || text.trim().length === 0
                ? "bg-base-700 text-base-muted cursor-not-allowed"
                : "bg-accent-cyan text-base-900 hover:bg-[#33EAFF] hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] cursor-pointer"
            )}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2 fill-current" />
                Analyze
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
