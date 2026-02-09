'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DesktopSidebar } from "./components/Sidebar";
import { Zap, Send, Terminal, Cpu } from 'lucide-react';
import TradingViewWidget from '@/components/trading-lab/TradingViewWidget';

export default function InteractiveDashboard() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [engineData, setEngineData] = useState<any>(null);

  useEffect(() => { setMounted(true); }, []);

  // POLLING: Escuchar a la API del Motor v5 cada 5 segundos
  useEffect(() => {
    const fetchEngine = async () => {
      try {
        const res = await fetch('/api/engine');
        const data = await res.json();
        if (!data.error) setEngineData(data);
      } catch (e) {
        console.error("Error al conectar con el motor v5");
      }
    };

    if (mounted) {
      fetchEngine();
      const interval = setInterval(fetchEngine, 5000);
      return () => clearInterval(interval);
    }
  }, [mounted]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      if (data.content) {
        setMessages([...newMessages, { role: 'assistant', content: data.content }]);
      }
    } catch (e) { 
      console.error("Ape connection lost"); 
    } finally { 
      setLoading(false); 
    }
  };

  if (!mounted) return <div className="bg-black min-h-screen" />;

  return (
    <main className="flex min-h-screen bg-black text-white overflow-hidden font-sans">
      <DesktopSidebar />
      <div className="flex-1 flex flex-col p-6 lg:p-10 relative overflow-y-auto">
        <header className="mb-8 z-10 flex justify-between items-end">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none">
              Ape <span className="text-[#00E676]">Terminal</span>
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">Neural Link Active | v5.0</p>
            </div>
          </motion.div>
        </header>

        {/* SECCIÓN FINANCIERA: GRÁFICO Y SEÑALES DEL MOTOR */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          <div className="xl:col-span-2 bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-4 h-[500px] overflow-hidden shadow-2xl">
            <TradingViewWidget />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex-1 bg-[#0A0A0A] border border-white/10 p-6 rounded-[2.5rem] flex flex-col justify-center">
              <h3 className="text-[#FF0080] text-[10px] font-black uppercase tracking-widest mb-2">Money Line (Multiplier)</h3>
              <p className="text-4xl font-mono tracking-tighter text-white">
                {engineData?.multiplier_value ? `${engineData.multiplier_value}x` : 'WAITING...'}
              </p>
            </div>
            <div className="flex-1 bg-[#0A0A0A] border border-white/10 p-6 rounded-[2.5rem] flex flex-col justify-center">
              <h3 className="text-[#00E676] text-[10px] font-black uppercase tracking-widest mb-2">Engine State</h3>
              <p className="text-4xl font-mono tracking-tighter text-white uppercase">
                {engineData?.current_state || 'CALIBRATING'}
              </p>
            </div>
          </div>
        </div>

        {/* CHAT TERMINAL (DISEÑO ORIGINAL EVOLUCIONADO) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex flex-col bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[400px]"
        >
          <div className="flex-1 p-8 overflow-y-auto space-y-6 scrollbar-hide">
            <AnimatePresence>
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center opacity-20 italic">
                  <Terminal size={48} className="mb-4" />
                  <p className="font-mono text-sm uppercase tracking-widest"># Awaiting Neural Commands...</p>
                </div>
              )}
              {messages.map((m, i) => (
                <motion.div key={i} className={`flex gap-4 p-4 rounded-2xl ${m.role === 'user' ? "bg-white/5" : ""}`}>
                  <div className={m.role === 'user' ? "text-blue-400" : "text-[#00E676]"}>
                    {m.role === 'user' ? <Zap size={18} /> : <Cpu size={18} />}
                  </div>
                  <div className="flex-1 text-sm font-mono text-gray-200">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-1">
                      {m.role === 'user' ? "Commander" : "Ape OS"}
                    </p>
                    {m.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {loading && <p className="text-[#00E676] animate-pulse text-xs font-mono ml-10"># Processing...</p>}
          </div>

          <div className="p-8 bg-black/40 border-t border-white/5">
            <div className="flex gap-4 bg-white/5 p-2 rounded-2xl border border-white/10 focus-within:border-[#00E676]/50 transition-all">
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Talk to Ape..." className="flex-1 bg-transparent px-6 py-3 outline-none text-sm font-mono" />
              <button onClick={sendMessage} className="bg-white text-black h-12 w-12 flex items-center justify-center rounded-xl hover:bg-[#00E676] hover:text-white transition-all">
                <Send size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
