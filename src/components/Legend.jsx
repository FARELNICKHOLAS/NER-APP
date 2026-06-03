import React from 'react';
import { ENTITY_COLORS } from '../lib/constants';
import { Tags } from 'lucide-react';

export default function Legend() {
  return (
    <div className="bg-base-900 border-t border-base-800 py-3 px-4 flex items-center justify-center shrink-0">
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 max-w-7xl mx-auto">
        <div className="flex items-center text-xs font-mono text-base-muted uppercase tracking-wider mr-4">
          <Tags className="w-3.5 h-3.5 mr-1.5 opacity-70" />
          Tags Legend
        </div>
        
        {Object.entries(ENTITY_COLORS).map(([key, value]) => (
          <div key={key} className="flex items-center space-x-2">
            <span className={`w-2.5 h-2.5 rounded-sm ${value.bg} border ${value.border}`}></span>
            <span className="text-xs font-mono text-base-muted uppercase">
              <span className={`font-bold ${value.text} mr-1`}>{key}</span>
              <span className="opacity-70 text-[10px] hidden sm:inline-block">({value.label})</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
