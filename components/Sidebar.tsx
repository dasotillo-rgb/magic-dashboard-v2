'use client';
import React from 'react';
import { Home, TrendingUp, Cpu, Zap, Settings } from 'lucide-react';

export const DesktopSidebar = () => {
  const menuItems = [
    { icon: <Home size={20} />, label: 'Dashboard', active: true },
    { icon: <TrendingUp size={20} />, label: 'Market Signals', active: false },
    { icon: <Cpu size={20} />, label: 'Motor v5', active: false },
    { icon: <Zap size={20} />, label: 'Quick Trade', active: false },
    { icon: <Settings size={20} />, label: 'Settings', active: false },
  ];

  return (
    <div className="hidden lg:flex flex-col w-20 bg-[#0A0A0A] border-r border-white/5 h-screen sticky top-0 py-10 items-center justify-between">
      <div className="flex flex-col gap-10 items-center">
        <div className="w-10 h-10 bg-[#00E676] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,230,118,0.3)]">
          <span className="font-black text-black text-xl">A</span>
        </div>
        <nav className="flex flex-col gap-8">
          {menuItems.map((item, i) => (
            <button key={i} className={`p-3 rounded-xl transition-all ${item.active ? 'bg-white/10 text-[#00E676]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
              {item.icon}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};
