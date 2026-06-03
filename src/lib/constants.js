export const ENTITY_COLORS = {
  PER: { bg: 'bg-entity-per/15', text: 'text-entity-per', border: 'border-entity-per/30', glow: 'shadow-[0_0_10px_rgba(59,130,246,0.3)]', label: 'Person' },
  ORG: { bg: 'bg-entity-org/15', text: 'text-entity-org', border: 'border-entity-org/30', glow: 'shadow-[0_0_10px_rgba(16,185,129,0.3)]', label: 'Organization' },
  LOC: { bg: 'bg-entity-loc/15', text: 'text-entity-loc', border: 'border-entity-loc/30', glow: 'shadow-[0_0_10px_rgba(249,115,22,0.3)]', label: 'Location' },
  GPE: { bg: 'bg-entity-gpe/15', text: 'text-entity-gpe', border: 'border-entity-gpe/30', glow: 'shadow-[0_0_10px_rgba(236,72,153,0.3)]', label: 'Geo-Political' },
  DAT: { bg: 'bg-entity-dat/15', text: 'text-entity-dat', border: 'border-entity-dat/30', glow: 'shadow-[0_0_10px_rgba(139,92,246,0.3)]', label: 'Date/Time' },
  EVT: { bg: 'bg-entity-evt/15', text: 'text-entity-evt', border: 'border-entity-evt/30', glow: 'shadow-[0_0_10px_rgba(234,179,8,0.3)]', label: 'Event' },
  PRD: { bg: 'bg-entity-prd/15', text: 'text-entity-prd', border: 'border-entity-prd/30', glow: 'shadow-[0_0_10px_rgba(6,182,212,0.3)]', label: 'Product' },
};

export const MOCK_API_RESPONSE = (text) => {
  // Very basic mock logic just to generate entities based on text content
  const entities = [];
  const lowerText = text.toLowerCase();
  
  const checkAndAdd = (keyword, label) => {
    let startIndex = 0;
    while ((startIndex = lowerText.indexOf(keyword, startIndex)) > -1) {
      entities.push({
        word: text.substring(startIndex, startIndex + keyword.length),
        label: label,
        start: startIndex,
        end: startIndex + keyword.length,
        score: (0.85 + Math.random() * 0.14).toFixed(3)
      });
      startIndex += keyword.length;
    }
  };

  // Mock detection based on common words in the quick loads
  checkAndAdd('joko widodo', 'PER');
  checkAndAdd('jakarta', 'GPE');
  checkAndAdd('kementerian pekerjaan umum', 'ORG');
  checkAndAdd('hari senin', 'DAT');
  checkAndAdd('mahkamah agung', 'ORG');
  checkAndAdd('pt makmur abadi', 'ORG');
  checkAndAdd('surabaya', 'GPE');
  checkAndAdd('blackpink', 'ORG');
  checkAndAdd('gbk', 'LOC');
  checkAndAdd('jaksel', 'GPE');
  checkAndAdd('5 menit', 'DAT');

  // Sort by start index
  return entities.sort((a, b) => a.start - b.start);
};
