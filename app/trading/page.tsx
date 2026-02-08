"use client";

import React from 'react';
import TradingLab from '../../components/trading-lab/TradingLab';

export default function TradingPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6 lg:p-10">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Trading Lab</h1>
            <p className="text-gray-400 text-sm mt-1">Simulación y Análisis de Mercado Pro.</p>
          </div>
          <a href="/" className="text-xs bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-all">
            ← Volver al Dashboard
          </a>
        </header>
        <div className="glass-panel rounded-[2.5rem] border border-white/10 bg-white/5 overflow-hidden">
          <TradingLab />
        </div>
    </main>
  );
}
