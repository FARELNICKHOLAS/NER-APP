import React from 'react';
import { Activity, Database, FileText } from 'lucide-react';

export default function Header({ totalText, totalEntities }) {
  return (
    <header className="border-b border-base-800 bg-base-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-base-800 border border-base-700 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
            <Activity className="w-5 h-5 text-accent-cyan" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-base-text font-mono tracking-wide">NER_ANALYZER</h1>
            <div className="flex items-center space-x-2 text-xs text-base-muted">
              <span className="flex items-center"><Database className="w-3 h-3 mr-1" /> GRIT+ XLM-RoBERTa</span>
              <span className="px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] uppercase font-bold tracking-wider">Ready</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-sm">
          <div className="flex flex-col items-end">
            <span className="text-base-muted text-xs uppercase tracking-wider font-mono">Session Texts</span>
            <span className="font-mono text-accent-cyan font-semibold flex items-center">
              <FileText className="w-3 h-3 mr-1.5 opacity-70" /> {totalText}
            </span>
          </div>
          <div className="w-px h-8 bg-base-800"></div>
          <div className="flex flex-col items-end">
            <span className="text-base-muted text-xs uppercase tracking-wider font-mono">Entities Found</span>
            <span className="font-mono text-accent-amber font-semibold flex items-center">
              <Activity className="w-3 h-3 mr-1.5 opacity-70" /> {totalEntities}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
