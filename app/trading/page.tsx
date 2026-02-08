"use client";

import React from 'react';
import Sidebar from '../../components/Sidebar';
import TradingLab from '../../components/trading-lab/TradingLab';

export default function TradingPage() {
  return (
    <main className="flex min-h-screen bg-black text-white">
      <Sidebar />
      <div className="flex-1 lg:pl-64 p-6 lg:p-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">Trading Lab</h1>
          <p className="text-gray-400 text-sm mt-1">Simulación y Análisis de Mercado Pro.</p>
        </header>
        <div className="glass-panel rounded-[2.5rem] border border-white/10 bg-white/5 overflow-hidden">
          <TradingLab />
        </div>
      </div>
    </main>
  );
}
