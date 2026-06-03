import React, { useState, useMemo } from 'react';
import { ENTITY_COLORS } from '../lib/constants';
import { Filter, Copy, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

export default function EntitySummary({ entities, onHoverEntity, selectedEntityIndex }) {
  const [filterLabel, setFilterLabel] = useState('ALL');
  const [copiedId, setCopiedId] = useState(null);

  // Group entities by label for badges
  const labelCounts = useMemo(() => {
    const counts = { ALL: entities.length };
    entities.forEach(e => {
      counts[e.label] = (counts[e.label] || 0) + 1;
    });
    return counts;
  }, [entities]);

  const filteredEntities = useMemo(() => {
    if (filterLabel === 'ALL') return entities.map((e, i) => ({ ...e, originalIndex: i }));
    return entities.map((e, i) => ({ ...e, originalIndex: i })).filter(e => e.label === filterLabel);
  }, [entities, filterLabel]);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!entities || entities.length === 0) {
    return (
      <div className="flex flex-col h-full bg-base-800 rounded-xl border border-base-700 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between px-4 py-3 border-b border-base-700 bg-base-900/50">
          <h2 className="font-mono text-sm font-semibold text-base-text uppercase tracking-wider">Entity Summary</h2>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <p className="font-mono text-xs text-base-muted uppercase tracking-widest opacity-50">No entities detected yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-base-800 rounded-xl border border-base-700 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 border-b border-base-700 bg-base-900/50 gap-3 sm:gap-0">
        <h2 className="font-mono text-sm font-semibold text-base-text uppercase tracking-wider flex items-center shrink-0">
          Entity Summary
        </h2>
        
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-base-muted" />
          {Object.entries(labelCounts).map(([label, count]) => {
            const isActive = filterLabel === label;
            const colorDef = ENTITY_COLORS[label];
            
            return (
              <button
                key={label}
                onClick={() => setFilterLabel(label)}
                className={clsx(
                  "px-2 py-1 rounded text-[10px] font-mono font-bold border transition-colors cursor-pointer",
                  isActive
                    ? label === 'ALL'
                      ? "bg-base-text text-base-900 border-base-text"
                      : `${colorDef.bg} ${colorDef.text} ${colorDef.border} ring-1 ring-current`
                    : "bg-base-900 text-base-muted border-base-700 hover:border-base-500"
                )}
              >
                {label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-sm font-sans">
          <thead className="text-xs font-mono text-base-muted uppercase bg-base-900/50 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 font-medium">Entity</th>
              <th className="px-4 py-3 font-medium">Label</th>
              <th className="px-4 py-3 font-medium">Score</th>
              <th className="px-4 py-3 font-medium">Pos</th>
              <th className="px-4 py-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-700/50">
            {filteredEntities.map((entity, idx) => {
              const colorDef = ENTITY_COLORS[entity.label] || { text: 'text-base-text' };
              const isSelected = selectedEntityIndex === entity.originalIndex;
              
              return (
                <tr 
                  key={`${idx}-${entity.originalIndex}`}
                  onMouseEnter={() => onHoverEntity(entity.originalIndex)}
                  onMouseLeave={() => onHoverEntity(null)}
                  className={clsx(
                    "hover:bg-base-700/50 transition-colors group",
                    isSelected && "bg-base-700/80"
                  )}
                >
                  <td className="px-4 py-3 font-medium text-base-text whitespace-nowrap">
                    {entity.word}
                  </td>
                  <td className="px-4 py-3">
                    <span className={clsx("text-[10px] font-mono font-bold uppercase tracking-wider", colorDef.text)}>
                      {entity.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono">
                    <div className="flex items-center">
                      <div className="w-16 h-1.5 bg-base-900 rounded-full mr-2 overflow-hidden border border-base-700">
                        <div 
                          className="h-full bg-accent-cyan"
                          style={{ width: `${entity.score * 100}%` }}
                        ></div>
                      </div>
                      <span className={entity.score > 0.9 ? 'text-green-400' : 'text-base-muted'}>
                        {(entity.score * 100).toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono text-base-muted">
                    {entity.start}:{entity.end}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleCopy(entity.word, `${idx}-${entity.originalIndex}`)}
                      className="text-base-muted hover:text-base-text transition-colors p-1.5 rounded bg-base-900 border border-base-700 hover:border-base-500 cursor-pointer"
                      title="Copy entity"
                    >
                      {copiedId === `${idx}-${entity.originalIndex}` ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
