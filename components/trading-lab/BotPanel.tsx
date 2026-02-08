"use client";
import React, { useState } from 'react';
import { Play, Pause, Bell } from 'lucide-react';

export default function BotPanel() {
    const [active, setActive] = useState(false);
    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 h-full">
            <h3 className="text-xl font-bold mb-6 flex justify-between items-center">
                Ape-Bot Control
                <div className={`h-2 w-2 rounded-full ${active ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
            </h3>
            <div className="space-y-6">
                <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">Status</p>
                    <p className="text-sm font-mono">{active ? 'RUNNING - Monitoring Market...' : 'IDLE - Waiting for orders'}</p>
                </div>
                <button 
                    onClick={() => setActive(!active)}
                    className={`w-full py-4 rounded-2xl font-black transition-all ${active ? 'bg-red-500/20 text-red-500' : 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'}`}
                >
                    {active ? 'DEACTIVATE BOT' : 'ACTIVATE APE-BOT'}
                </button>
            </div>
        </div>
    );
}
