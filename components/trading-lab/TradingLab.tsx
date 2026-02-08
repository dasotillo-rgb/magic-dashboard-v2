"use client";

import React from 'react';
import { TrendingUp, Activity, ShieldCheck, Zap, BarChart3 } from 'lucide-react';

const signals = [
  { pair: "BTC/USDT", signal: "STRONG BUY", strength: 98, change: "+2.4%" },
  { pair: "ETH/USDT", signal: "BUY", strength: 75, change: "+1.8%" },
  { pair: "SOL/USDT", signal: "NEUTRAL", strength: 52, change: "-0.5%" },
  { pair: "AVAX/USDT", signal: "STRONG SELL", strength: 12, change: "-4.2%" },
];

export default function TradingLab() {
  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[500px] bg-black/40 backdrop-blur-md overflow-hidden">
      
      {/* 1. TREND SIGNAL SCANNER (Lado Izquierdo) */}
      <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-white/10 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-6">
          <Zap className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Trend Scanner</span>
        </div>
        
        <div className="space-y-4 flex-1">
          {signals.map((s) => (
            <div key={s.pair} className="bg-white/5 border border-white/5 p-3 rounded-xl hover:bg-white/10 transition-all">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-bold text-white">{s.pair}</span>
                <span className={`text-[10px] font-bold ${s.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                  {s.change}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                  s.signal.includes('BUY') ? 'bg-emerald-500/20 text-emerald-400' : 
                  s.signal.includes('SELL') ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {s.signal}
                </span>
                <span className="text-[10px] text-gray-500 font-mono">{s.strength}% Power</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
          <p className="text-[10px] text-emerald-400 leading-tight">
            AI Insight: Market shows high correlation on BTC/ETH breakout.
          </p>
        </div>
      </div>

      {/* 2. ACTIVE TRADING DESK (Lado Derecho) */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-emerald-500" />
            <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Execution Terminal</span>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded text-[10px] text-emerald-400 font-bold animate-pulse">
            LIVE FEED
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-8">
          <div className="text-center space-y-1">
            <h2 className="text-5xl font-black tracking-tighter text-white">BTC/USDT</h2>
            <div className="text-4xl font-bold tracking-tight text-white/80">$70.826</div>
          </div>

          <div className="flex gap-4 w-full max-w-sm mt-8">
            <button className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black font-black py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              BUY
            </button>
            <button className="flex-1 bg-red-500 hover:bg-red-400 text-white font-black py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(239,68,68,0.2)]">
              SELL
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
          <div className="text-center">
            <p className="text-[10px] text-gray-500 uppercase">Leverage</p>
            <p className="text-sm font-bold text-white">20x</p>
          </div>
          <div className="text-center border-x border-white/10">
            <p className="text-[10px] text-gray-500 uppercase">Margin</p>
            <p className="text-sm font-bold text-white">Isol.</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-gray-500 uppercase flex items-center justify-center gap-1">
              <ShieldCheck className="h-3 w-3" /> Risk
            </p>
            <p className="text-sm font-bold text-emerald-400">Low</p>
          </div>
        </div>
      </div>
    </div>
  );
}
