'use client';

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, Brain, Zap, Shield, ShieldOff, 
  MapPin, Wind, Droplets, Send, CheckCircle2, Play, Square,
  Layers, Rocket, PlusCircle, LayoutDashboard, Settings, Eye, EyeOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CONFIGURACIÓN DE ESTILOS ---
const glassBase = "backdrop-blur-xl border bg-opacity-20 transition-all duration-500";
const tints = {
  trading: "border-emerald-500/30 bg-emerald-950/10 shadow-[0_0_20px_rgba(16,185,129,0.05)]",
  ai: "border-purple-500/30 bg-purple-950/10 shadow-[0_0_20px_rgba(139,92,246,0.05)]",
  projects: "border-amber-500/30 bg-amber-950/10 shadow-[0_0_20px_rgba(245,158,11,0.05)]",
  weather: "border-cyan-500/30 bg-cyan-950/10 shadow-[0_0_20px_rgba(6,182,212,0.05)]",
  default: "border-white/10 bg-white/5 shadow-2xl"
};

export default function ApeOSV3() {
  // --- ESTADOS ---
  const [privacyMode, setPrivacyMode] = useState(false);
  const [isBotActive, setIsBotActive] = useState(false);
  const [trendSignal, setTrendSignal] = useState<'BULLISH' | 'BEARISH'>('BULLISH');
  const [location, setLocation] = useState({ city: 'Detectando...', temp: '--', condition: 'Cargando Atmosfera...' });
  const [messages, setMessages] = useState([
    { role: 'ape', content: 'ApeOS V3 Online. ¿Qué operaciones ejecutamos hoy?' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  // --- LÓGICA DE GEOLOCALIZACIÓN ---
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          // Nota: En prod usarías una API real como OpenWeather. Aquí simulamos el fetch con las coordenadas.
          const { latitude, longitude } = pos.coords;
          setLocation({
            city: latitude.toFixed(2) === "40.05" ? "Benicàssim" : "Zona Activa",
            temp: "22°C",
            condition: "Cielo Despejado"
          });
        } catch (e) {
          console.error("Error detectando clima");
        }
      });
    }
  }, []);

  // --- HANDLERS ---
  const toggleBot = () => setIsBotActive(!isBotActive);
  const sendMessage = () => {
    if (!inputMsg) return;
    const newMsgs = [...messages, { role: 'user', content: inputMsg }];
    setMessages(newMsgs);
    setInputMsg('');
    // Simulación de respuesta de Ape
    setTimeout(() => {
      setMessages([...newMsgs, { role: 'ape', content: 'Entendido. Analizando viabilidad y sincronizando con Pionex...' }]);
    }, 1000);
  };

  const getDailyVenture = () => {
    if (location.temp.includes('22')) return "Día óptimo para networking y expansión física.";
    return "Foco profundo en arquitectura de código y optimización de bots.";
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-purple-500/30 p-4 md:p-8 overflow-x-hidden">
      
      {/* HEADER DINÁMICO */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <div className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-lg shadow-purple-500/20">
            <Zap className="fill-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter uppercase italic">ApeOS <span className="text-purple-500">V3</span></h1>
            <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 tracking-widest uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              System Operational
            </div>
          </div>
        </motion.div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setPrivacyMode(!privacyMode)}
            className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            {privacyMode ? <EyeOff size={20} className="text-amber-500" /> : <Eye size={20} />}
          </button>
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] text-gray-500 font-bold uppercase">Balance Pionex</p>
              <p className="font-mono text-sm leading-none">
                {privacyMode ? "**** USD" : "$12,450.82"}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* GRID PRINCIPAL DE OPERACIONES */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        
        {/* WIDGET 1: TRADING LAB (6 COLS) */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className={`${glassBase} ${tints.trading} lg:col-span-6 rounded-[2.5rem] p-8 flex flex-col gap-6`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xs font-black text-emerald-500 uppercase tracking-[0.2em] mb-1">Trading Lab</h2>
              <p className="text-2xl font-bold tracking-tight">Pionex Gateway</p>
            </div>
            <div className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-tighter ${trendSignal === 'BULLISH' ? 'bg-emerald-500 text-black' : 'bg-red-500 text-white'}`}>
              {trendSignal} SIGNAL
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/40 rounded-3xl p-6 border border-white/5">
              <p className="text-[10px] text-gray-400 uppercase font-bold mb-2">TrendSignal V2</p>
              <div className="flex items-center gap-3">
                {trendSignal === 'BULLISH' ? <TrendingUp className="text-emerald-500" size={32} /> : <TrendingDown className="text-red-500" size={32} />}
                <span className="text-3xl font-black">94<span className="text-sm text-gray-500">%</span></span>
              </div>
            </div>
            <div className="bg-black/40 rounded-3xl p-6 border border-white/5">
              <p className="text-[10px] text-gray-400 uppercase font-bold mb-2">Bot Status</p>
              <div className="flex items-center gap-4">
                <button 
                  onClick={toggleBot}
                  className={`p-3 rounded-2xl transition-all ${isBotActive ? 'bg-red-500/20 text-red-500' : 'bg-emerald-500/20 text-emerald-500'}`}
                >
                  {isBotActive ? <Square size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                </button>
                <span className="text-xs font-bold uppercase tracking-widest">{isBotActive ? 'Active' : 'Standby'}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-auto">
            <button className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black font-black py-4 rounded-2xl transition-all active:scale-95 text-sm uppercase">Quick Buy</button>
            <button className="flex-1 border border-emerald-500/50 hover:bg-emerald-500/10 text-emerald-500 font-black py-4 rounded-2xl transition-all active:scale-95 text-sm uppercase">Quick Sell</button>
          </div>
        </motion.section>

        {/* WIDGET 2: APE CHAT (6 COLS) */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className={`${glassBase} ${tints.ai} lg:col-span-6 rounded-[2.5rem] p-8 flex flex-col h-[450px] md:h-auto`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500 rounded-lg"><Brain size={18} /></div>
            <h2 className="text-xs font-black uppercase tracking-[0.2em]">Ape Brain Console</h2>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-purple-600 text-white rounded-tr-none' : 'bg-white/5 border border-white/10 rounded-tl-none'}`}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 relative">
            <input 
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              type="text" 
              placeholder="Escribe una orden..."
              className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 pl-6 pr-14 focus:border-purple-500 outline-none transition-all"
            />
            <button 
              onClick={sendMessage}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-purple-500 rounded-xl hover:bg-purple-400 transition-all"
            >
              <Send size={18} />
            </button>
          </div>
        </motion.section>

        {/* WIDGET 3: EMPIRE MANAGEMENT (8 COLS) */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className={`${glassBase} ${tints.projects} lg:col-span-8 rounded-[2.5rem] p-8`}
        >
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <Layers className="text-amber-500" size={24} />
              <h2 className="text-2xl font-bold tracking-tight">Empire Control</h2>
            </div>
            <button className="p-2 hover:bg-amber-500/10 rounded-full transition-all text-amber-500">
              <PlusCircle size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-[10px] font-black text-amber-500/50 uppercase tracking-widest mb-4">Proyectos Viables (Go-To-Market)</p>
              <div className="space-y-3">
                {['SAAS de Logística Benicàssim', 'Bot de Arbitraje API', 'Consultoría AI Química'].map((p, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-black/40 border border-white/5 rounded-2xl hover:border-amber-500/30 transition-all group">
                    <Rocket size={18} className="text-gray-600 group-hover:text-amber-500" />
                    <span className="text-sm font-medium">{p}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-amber-500/50 uppercase tracking-widest mb-4">Pipeline Activo</p>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="font-bold">ApeOS Dashboard V3</span>
                    <span className="text-amber-500">85%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="font-bold">Notion Integration</span>
                    <span className="text-amber-500">40%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* WIDGET 4: CLIMA & ENTORNO (4 COLS) */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className={`${glassBase} ${tints.weather} lg:col-span-4 rounded-[2.5rem] p-8 flex flex-col justify-between`}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-cyan-500 font-bold text-[10px] uppercase">
              <MapPin size={10} /> {location.city}
            </div>
            <div className="text-4xl font-black">{location.temp}</div>
          </div>

          <div className="my-8">
            <p className="text-sm font-medium text-cyan-200 mb-2">{location.condition}</p>
            <div className="flex gap-6">
              <div className="flex items-center gap-2 text-xs text-gray-400 font-bold">
                <Wind size={14} className="text-cyan-500" /> 12km/h
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400 font-bold">
                <Droplets size={14} className="text-cyan-500" /> 45%
              </div>
            </div>
          </div>

          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-4">
            <p className="text-[10px] font-black text-cyan-500 uppercase mb-1">Ape Recommendation</p>
            <p className="text-xs leading-relaxed italic">"{getDailyVenture()}"</p>
          </div>
        </motion.section>

      </main>

      {/* FOOTER / NAVBAR MINI */}
      <footer className="max-w-fit mx-auto mt-12 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-2 flex gap-2">
        {[LayoutDashboard, Zap, Layers, Settings].map((Icon, i) => (
          <button key={i} className={`p-4 rounded-xl transition-all ${i === 0 ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}>
            <Icon size={20} />
          </button>
        ))}
      </footer>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
}
