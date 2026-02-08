// app/components/trading-lab/TradingLab.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, Zap, ArrowUp, ArrowDown } from 'lucide-react';

// Este componente ahora contiene toda la lógica y UI del Trading Lab
const mockScanResults = [
  { pair: 'BTC/USDT', probability: 88, direction: 'UP' as const, signal: 'Cruce de Medias Móviles + RSI en sobreventa' },
  { pair: 'ETH/USDT', probability: 75, direction: 'UP' as const, signal: 'MACD alcista' },
  { pair: 'SOL/USDT', probability: 62, direction: 'DOWN' as const, signal: 'RSI en sobrecompra' },
];

const TrendSignalScanner = () => (
  <div className="bg-white/5 backdrop-blur-[40px] border border-white/10 rounded-[2.5rem] p-6 h-full">
    <div className="flex items-center gap-3 mb-4">
      <Zap className="h-6 w-6 text-yellow-300" />
      <h3 className="text-xl font-black text-white">Trend Signal Scanner</h3>
    </div>
    <div className="space-y-3">
      {mockScanResults.map((result, index) => {
        const isHighProbability = result.probability > 80;
        return (
          <motion.div
            key={result.pair}
            className={`p-4 rounded-2xl bg-black/30 border border-white/10 flex items-center justify-between ${isHighProbability ? 'glow-effect' : ''}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white">{result.pair}</span>
                {result.direction === 'UP' ? <ArrowUp className="h-5 w-5 text-green-400" /> : <ArrowDown className="h-5 w-5 text-red-400" />}
              </div>
              <p className="text-xs text-gray-400 mt-1">{result.signal}</p>
            </div>
            <div className="text-right">
              <p className={`text-2xl font-black ${isHighProbability ? 'text-yellow-300' : 'text-white'}`}>{result.probability}%</p>
              <p className="text-xs text-gray-400">Prob. de Éxito</p>
            </div>
          </motion.div>
        );
      })}
    </div>
    <style jsx>{`.glow-effect { box-shadow: 0 0 15px 5px rgba(250, 204, 21, 0.3); }`}</style>
  </div>
);

const TradingLab = () => {
  return (
    <div className="bg-black min-h-screen p-4 sm:p-6 lg:p-8 font-sans text-gray-200">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <header className="flex justify-between items-center mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <LayoutGrid className="h-7 w-7 text-gray-300" />
            <h1 className="text-2xl sm:text-3xl font-black text-gray-100">Trading Lab</h1>
          </div>
        </header>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
             <TrendSignalScanner />
          </div>
          <div className="col-span-12 md:col-span-8">
             <div className="bg-white/5 backdrop-blur-[40px] border border-white/10 rounded-[2.5rem] p-6 h-full flex items-center justify-center">
                <p className="text-gray-500">TradingView Chart Widget Placeholder</p>
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TradingLab;
