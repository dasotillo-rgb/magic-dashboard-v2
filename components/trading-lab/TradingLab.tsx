"use client";

import React from 'react';
import { TrendingUp, Activity, Shield Check } from 'lucide-react';

export default function TradingLab() {
  return (
    <div className="p-6 space-y-6 bg-black/40 backdrop-blur-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-emerald-500 text-xs font-bold tracking-widest uppercase">Active Trading Desk</span>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded text-[10px] text-emerald-400 font-bold">
          API LINKED
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-20 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-6xl font-black tracking-tighter text-white">BTC/USDT</h2>
          <div className="text-5xl font-bold tracking-tight text-white/90">$70.826</div>
        </div>

        <div className="flex gap-6 w-full max-w-md">
          <button className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black font-black py-4 rounded-2xl transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            BUY LONG
          </button>
          <button className="flex-1 bg-red-500 hover:bg-red-400 text-white font-black py-4 rounded-2xl transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
            SELL SHORT
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-6">
        <div className="text-center">
          <p className="text-[10px] text-gray-500 uppercase">Leverage</p>
          <p className="text-sm font-bold text-white">20x</p>
        </div>
        <div className="text-center border-x border-white/5">
          <p className="text-[10px] text-gray-400 uppercase">Margin</p>
          <p className="text-sm font-bold text-white">Isol.</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-gray-500 uppercase">Risk Level</p>
          <p className="text-sm font-bold text-emerald-400">Low</p>
        </div>
      </div>
    </div>
  );
}
