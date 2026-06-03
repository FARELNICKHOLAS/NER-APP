import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Code, Info } from 'lucide-react';
import { ENTITY_COLORS } from '../lib/constants';
import clsx from 'clsx';

export default function OutputPanel({ text, entities, selectedEntityIndex }) {
  // Segment the text into plain strings and entity objects
  const segments = useMemo(() => {
    if (!text) return [];
    if (!entities || entities.length === 0) return [{ type: 'text', content: text }];

    const result = [];
    let lastIndex = 0;

    entities.forEach((entity, index) => {
      // Add preceding text
      if (entity.start > lastIndex) {
        result.push({
          type: 'text',
          content: text.substring(lastIndex, entity.start)
        });
      }
      // Add entity
      result.push({
        type: 'entity',
        content: entity.word,
        label: entity.label,
        score: entity.score,
        start: entity.start,
        end: entity.end,
        index: index
      });
      lastIndex = entity.end;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      result.push({
        type: 'text',
        content: text.substring(lastIndex)
      });
    }

    return result;
  }, [text, entities]);

  if (!text) {
    return (
      <div className="flex flex-col h-full bg-base-800 rounded-xl border border-base-700 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)] items-center justify-center text-base-muted p-6">
        <Code className="w-12 h-12 mb-4 opacity-20" />
        <p className="font-mono text-sm uppercase tracking-widest opacity-50">Waiting for input</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-base-800 rounded-xl border border-base-700 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-base-700 bg-base-900/50">
        <h2 className="font-mono text-sm font-semibold text-base-text uppercase tracking-wider flex items-center">
          <span className="w-2 h-2 rounded-full bg-accent-amber mr-2 shadow-[0_0_8px_rgba(255,183,0,0.8)]"></span>
          Annotated Output
        </h2>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto leading-[2.5]">
        <div className="text-lg text-base-text font-sans">
          {segments.map((seg, i) => {
            if (seg.type === 'text') {
              return <span key={`text-${i}`} className="whitespace-pre-wrap">{seg.content}</span>;
            }

            const colorDef = ENTITY_COLORS[seg.label] || { bg: 'bg-base-600', text: 'text-base-text', border: 'border-base-500', glow: '', label: 'Unknown' };
            const isSelected = selectedEntityIndex === seg.index;

            return (
              <motion.span
                key={`entity-${i}-${seg.index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: seg.index * 0.05 }}
                className={clsx(
                  "relative inline-flex items-center mx-1 px-1.5 py-0.5 rounded border group cursor-pointer transition-all duration-300",
                  colorDef.bg, colorDef.border, colorDef.text,
                  isSelected ? `ring-2 ring-offset-2 ring-offset-base-800 ring-current ${colorDef.glow}` : "hover:shadow-md",
                  isSelected && "scale-105 z-10"
                )}
              >
                {/* Label Badge above */}
                <span className={clsx(
                  "absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold uppercase tracking-wider px-1 rounded-sm",
                  colorDef.bg, "border", colorDef.border
                )}>
                  {seg.label}
                </span>
                
                {/* Word Content */}
                <span className="font-medium relative z-0 mt-1">{seg.content}</span>

                {/* Hover Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-max opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
                  <div className="bg-base-900 border border-base-700 text-base-text text-xs p-2 rounded shadow-xl flex flex-col gap-1 min-w-[120px]">
                    <div className="flex items-center justify-between font-mono pb-1 border-b border-base-700">
                      <span className={colorDef.text}>{colorDef.label}</span>
                      <span className="text-[10px] text-base-muted ml-3">{(seg.score * 100).toFixed(1)}%</span>
                    </div>
                    <div className="text-[10px] font-mono text-base-muted mt-1 flex justify-between">
                      <span>Pos: {seg.start}:{seg.end}</span>
                      <Info className="w-3 h-3 ml-2" />
                    </div>
                  </div>
                  {/* Tooltip arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-base-700"></div>
                </div>
              </motion.span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
