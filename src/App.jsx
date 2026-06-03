import React, { useState } from 'react';
import Header from './components/Header';
import InputPanel from './components/InputPanel';
import OutputPanel from './components/OutputPanel';
import EntitySummary from './components/EntitySummary';
import Legend from './components/Legend';
import { MOCK_API_RESPONSE } from './lib/constants';

function App() {
  const [sessionTexts, setSessionTexts] = useState(0);
  const [totalEntities, setTotalEntities] = useState(0);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [entities, setEntities] = useState([]);
  
  const [selectedEntityIndex, setSelectedEntityIndex] = useState(null);

  const handleAnalyze = async (text) => {
    setIsProcessing(true);
    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teks: text }),
      });
      
      if (!response.ok) {
        throw new Error('Gagal menghubungi server API');
      }
      
      const data = await response.json();
      setCurrentText(text);
      setEntities(data.entities || []);
      setSessionTexts(prev => prev + 1);
      setTotalEntities(prev => prev + (data.entities ? data.entities.length : 0));
    } catch (error) {
      console.error("Error saat analisis:", error);
      alert("Gagal melakukan analisis. Pastikan server backend FastAPI berjalan di port 8000.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-base-900 text-base-text font-sans selection:bg-accent-cyan/30 selection:text-white">
      <Header totalText={sessionTexts} totalEntities={totalEntities} />
      
      <main className="flex-1 overflow-hidden p-4 sm:p-6 lg:p-8 flex flex-col gap-6 relative z-10 max-w-7xl mx-auto w-full">
        {/* Top half: Input & Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[55%] min-h-[350px]">
          <InputPanel 
            onAnalyze={handleAnalyze} 
            isProcessing={isProcessing} 
          />
          <OutputPanel 
            text={currentText} 
            entities={entities} 
            selectedEntityIndex={selectedEntityIndex} 
          />
        </div>
        
        {/* Bottom half: Summary Table */}
        <div className="h-[45%] min-h-[250px]">
          <EntitySummary 
            entities={entities} 
            onHoverEntity={setSelectedEntityIndex}
            selectedEntityIndex={selectedEntityIndex}
          />
        </div>
      </main>
      
      <Legend />
    </div>
  );
}

export default App;
