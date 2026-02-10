'use client';
import { ArrowUp, Zap, MapPin, Terminal, Activity } from 'lucide-react';

// Componente Card simple para que tu código funcione
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-6 ${className}`}>
    {children}
  </div>
);

export default function Dashboard() {
  // TUS DATOS HARDCODED (Blindados)
  const hardcodedData = {
    assets: { value: 128430.22, change: 12.5 },
    signal: { status: "STRONG BUY", strategy: "BTC/USDT Strategy" },
    location: { city: "Base HQ", detail: "13.4°C en Base. Condiciones óptimas." },
    marketPulse: [
      { name: 'Bitcoin', price: 69106 },
      { name: 'Ethereum', price: 2014 },
      { name: 'Solana', price: 84.46 }
    ]
  };

  return (
    <main className="p-6 lg:p-10 max-w-[1600px] mx-auto space-y-8">
      {/* Header Visual */}
      <div className="flex items-center justify-between mb-8">
         <h1 className="text-3xl font-bold text-white tracking-tight">Overview</h1>
         <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
            <div className="w-2 h-2 rounded-full bg-[#00FF41] animate-pulse"></div>
            <span className="text-xs text-[#00FF41] font-mono">SYSTEM ONLINE</span>
         </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Fila superior de tarjetas */}
        <div className="col-span-12 lg:col-span-4">
          <Card>
            <h3 className="text-sm font-semibold text-gray-400">TOTAL ASSETS</h3>
            <p className="text-4xl font-black mt-2 tabular-nums text-white">${hardcodedData.assets.value.toLocaleString()}</p>
            <p className="text-xs text-[#00FF41] flex items-center gap-1 mt-1">
              <ArrowUp size={12} /> +{hardcodedData.assets.change}% this month
            </p>
          </Card>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <Card>
            <h3 className="text-sm font-semibold text-gray-400 flex items-center gap-2">
              TREND SIGNAL <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" /> LIVE
            </h3>
            <p className="text-4xl font-black text-[#00FF41] mt-2">{hardcodedData.signal.status}</p>
            <p className="text-xs text-gray-500 mt-1">{hardcodedData.signal.strategy}</p>
          </Card>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <Card>
            <h3 className="text-sm font-semibold text-gray-400">LOCATION INTEL</h3>
            <p className="text-2xl font-bold text-white mt-2">"{hardcodedData.location.city}"</p>
            <p className="text-xs text-gray-500 mt-1">{hardcodedData.location.detail}</p>
          </Card>
        </div>

        {/* Fila inferior: Consola y Market Pulse */}
        <div className="col-span-12 lg:col-span-7">
          <Card className="h-80 flex flex-col relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none"></div>
              <h3 className="text-sm font-semibold text-purple-400 mb-4 flex items-center gap-2">
                <Terminal size={14} /> APE CONSOLE
              </h3>
              <div className="flex-1 text-sm font-mono text-gray-400 overflow-y-auto space-y-2">
                <p className="opacity-50">> Initializing secure environment...</p>
                <p className="text-white"># ApeOS Systems Online. Conectado a Gemini Pro.</p>
                <p className="text-[#00FF41]"># ¿Cuál es el siguiente movimiento, Comandante?</p>
                <span className="w-2 h-4 bg-[#00FF41] inline-block animate-pulse"></span>
              </div>
          </Card>
        </div>
        <div className="col-span-12 lg:col-span-5">
          <Card className="h-80 flex flex-col">
              <h3 className="text-sm font-semibold text-gray-400 mb-4 flex items-center gap-2">
                <Activity size={14} /> MARKET PULSE
              </h3>
              <div className="space-y-4">
                {hardcodedData.marketPulse.map(asset => (
                  <div key={asset.name} className="flex justify-between items-center p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${asset.name === 'Solana' ? 'bg-[#00FF41]' : 'bg-red-500'}`}></div>
                        <span className="text-md font-bold capitalize text-white">{asset.name}</span>
                    </div>
                    <span className="text-md font-mono tabular-nums text-white/80">${asset.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
