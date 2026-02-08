'use client';
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutGrid, TrendingUp, Brain, Briefcase, Settings, 
  Zap, Cloud, ArrowUpRight, ArrowDownRight, 
  MessageSquare, Send, CheckCircle, Clock, Globe,
  Menu, X, Eye, EyeOff, Search, Bell, Terminal, Wallet, MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from "@google/generative-ai";

// --- CONFIGURACIÓN CEREBRO ---
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export default function ApeOSV5() {
  // Estado Visual (El diseño que te gusta)
  const [activeTab, setActiveTab] = useState('Overview');
  const [showBalance, setShowBalance] = useState(true);
  
  // Estado de Datos (La lógica real V4)
  const [prices, setPrices] = useState<any>({ bitcoin: { usd: 0, usd_24h_change: 0 } });
  const [weather, setWeather] = useState({ temp: '--', condition: 'Scanning...' });
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'model', text: 'ApeOS Systems Online. Conectado a Gemini Pro. ¿Cuál es el siguiente movimiento, Comandante?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // --- MOTOR DE DATOS REALES ---
  useEffect(() => {
    // 1. Precios Crypto (CoinGecko)
    const fetchPrices = async () => {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true');
        const data = await res.json();
        setPrices(data);
      } catch (e) { console.error("Crypto Error", e); }
    };
    
    // 2. Clima (Open-Meteo)
    const fetchWeather = async () => {
       if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          try {
            const { latitude, longitude } = pos.coords;
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
            const data = await res.json();
            setWeather({ temp: `${data.current_weather.temperature}°C`, condition: 'Local Base' });
          } catch (e) { setWeather({ temp: 'Error', condition: 'Offline' }); }
        });
      }
    };

    fetchPrices();
    fetchWeather();
    const interval = setInterval(fetchPrices, 60000); 
    return () => clearInterval(interval);
  }, []);

  // Scroll automático al chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // --- LÓGICA CHAT GEMINI ---
  const handleChatSend = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsTyping(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(userMsg);
      const response = await result.response;
      const text = response.text();
      setChatHistory(prev => [...prev, { role: 'model', text: text }]);
    } catch (error) {
      setChatHistory(prev => [...prev, { role: 'model', text: "Error de conexión neuronal. Verifica la API Key." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="layout">
      {/* --- ESTILOS VISUALES V3 (GLASSMORPHISM & DARK) --- */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=Inter:wght@300;400;500;600;800&display=swap');
        
        :root {
          --bg: #030303;
          --glass: rgba(20, 20, 20, 0.6);
          --glass-high: rgba(30, 30, 30, 0.8);
          --border: rgba(255, 255, 255, 0.08);
          --neon-green: #10b981;
          --neon-purple: #8b5cf6;
          --neon-blue: #3b82f6;
          --neon-orange: #f59e0b;
          --text: #ffffff;
          --text-muted: #888;
        }

        body { margin: 0; background: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; overflow: hidden; }
        
        .layout { display: flex; height: 100vh; background: radial-gradient(circle at 15% 15%, #111 0%, #000 100%); position: relative; }
        
        /* SIDEBAR INTELIGENTE (COLAPSABLE) */
        .sidebar { 
          width: 80px; border-right: 1px solid var(--border); display: flex; flex-direction: column; 
          padding: 30px 0; gap: 15px; z-index: 50; background: rgba(0,0,0,0.5); backdrop-filter: blur(20px);
          transition: width 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .sidebar:hover { width: 260px; align-items: flex-start; padding-left: 20px; }
        
        .brand { display: flex; align-items: center; justify-content: center; height: 50px; margin-bottom: 20px; width: 100%; overflow: hidden; }
        .sidebar:hover .brand { justify-content: flex-start; }
        .brand-text { display: none; margin-left: 12px; font-family: 'Space Grotesk'; font-weight: 700; font-size: 16px; color: white; opacity: 0; transition: opacity 0.3s; white-space: nowrap; }
        .sidebar:hover .brand-text { display: block; opacity: 1; }

        .nav-btn {
          height: 50px; width: 50px; border-radius: 14px; display: flex; align-items: center; justify-content: center;
          color: var(--text-muted); cursor: pointer; transition: all 0.2s; position: relative; margin: 0 auto;
        }
        .sidebar:hover .nav-btn { width: 90%; justify-content: flex-start; padding-left: 15px; margin: 0; }
        .nav-btn:hover, .nav-btn.active { background: rgba(255,255,255,0.08); color: white; }
        .nav-btn.active { color: var(--neon-blue); }
        .nav-btn.active::before { content: ''; position: absolute; left: 0; top: 10%; height: 80%; width: 3px; background: var(--neon-blue); border-radius: 0 4px 4px 0; }
        
        .nav-label { display: none; margin-left: 15px; font-size: 14px; font-weight: 500; white-space: nowrap; }
        .sidebar:hover .nav-label { display: block; animation: fadeIn 0.4s ease; }

        /* AREA PRINCIPAL */
        .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; position: relative; }
        .header { height: 80px; display: flex; align-items: center; justify-content: space-between; padding: 0 40px; }
        .page-title { font-family: 'Space Grotesk'; font-size: 32px; font-weight: 700; letter-spacing: -1px; margin: 0; }
        
        .content-area { flex: 1; overflow-y: auto; padding: 0 40px 40px 40px; }
        
        /* GRID SYSTEM (EL BUENO) */
        .grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px; padding-bottom: 60px; grid-auto-rows: minmax(160px, auto); }
        
        .card {
          background: var(--glass); border: 1px solid var(--border); border-radius: 24px; padding: 24px;
          backdrop-filter: blur(40px); display: flex; flex-direction: column; transition: transform 0.3s, border-color 0.3s;
          position: relative; overflow: hidden;
        }
        .card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.2); box-shadow: 0 10px 40px -10px rgba(0,0,0,0.5); }
        
        .card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .card-label { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: var(--text-muted); display: flex; align-items: center; gap: 8px; }

        /* CLASES DE COLOR SUTIL */
        .w-trading { border-top: 1px solid rgba(16, 185, 129, 0.3); background: linear-gradient(180deg, rgba(16,185,129,0.03) 0%, rgba(0,0,0,0) 100%), var(--glass); }
        .w-brain { border-top: 1px solid rgba(139, 92, 246, 0.3); background: linear-gradient(180deg, rgba(139,92,246,0.03) 0%, rgba(0,0,0,0) 100%), var(--glass); }
        .w-projects { border-top: 1px solid rgba(245, 158, 11, 0.3); }
        
        /* ELEMENTOS */
        .stat-val { font-family: 'Space Grotesk'; font-size: 36px; font-weight: 700; color: white; letter-spacing: -1px; }
        .pill { font-size: 10px; padding: 4px 8px; border-radius: 6px; font-weight: 700; text-transform: uppercase; }
        .pill-green { background: rgba(16, 185, 129, 0.15); color: var(--neon-green); }
        .pill-red { background: rgba(239, 68, 68, 0.15); color: #ef4444; }

        /* CHAT */
        .chat-window { flex: 1; overflow-y: auto; padding-right: 10px; display: flex; flex-direction: column; gap: 15px; margin-bottom: 15px; }
        .msg { padding: 12px 18px; border-radius: 16px; font-size: 14px; max-width: 80%; line-height: 1.5; }
        .msg.model { background: rgba(139, 92, 246, 0.1); color: #e9d5ff; border: 1px solid rgba(139, 92, 246, 0.2); align-self: flex-start; border-bottom-left-radius: 4px; }
        .msg.user { background: rgba(255, 255, 255, 0.1); color: white; align-self: flex-end; border-bottom-right-radius: 4px; }
        .input-area { display: flex; gap: 10px; background: rgba(0,0,0,0.3); padding: 5px; border-radius: 12px; border: 1px solid var(--border); }
        .chat-input { flex: 1; background: transparent; border: none; color: white; padding: 12px; outline: none; font-family: 'Inter'; }

        /* BRANDING */
        .watermark { position: fixed; bottom: 20px; right: 20px; font-size: 10px; font-weight: 800; opacity: 0.3; letter-spacing: 2px; pointer-events: none; z-index: 0; }

        /* RESPONSIVE */
        @media (max-width: 1024px) { 
          .grid { grid-template-columns: repeat(2, 1fr); } 
          .sidebar { display: none; } /* En móvil haremos otra cosa luego */
          .layout { flex-direction: column; }
          .header { padding: 20px; }
          .content-area { padding: 20px; }
        }
        @media (max-width: 768px) { .grid { grid-template-columns: 1fr; } }
        
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      {/* --- SIDEBAR V3 (LA BUENA) --- */}
      <nav className="sidebar">
        <div className="brand">
          <Zap size={24} className="text-yellow-500 fill-yellow-500" style={{minWidth: '50px', display:'flex', justifyContent:'center'}} />
          <span className="brand-text">APE Intelligence</span>
        </div>

        {[
          { id: 'Overview', icon: LayoutGrid },
          { id: 'Trading Lab', icon: TrendingUp },
          { id: 'Brain Chat', icon: Brain },
          { id: 'Projects', icon: Briefcase },
          { id: 'Settings', icon: Settings },
        ].map(item => (
          <div key={item.id} className={`nav-btn ${activeTab === item.id ? 'active' : ''}`} onClick={() => setActiveTab(item.id)}>
            <item.icon size={20} />
            <span className="nav-label">{item.id}</span>
          </div>
        ))}

        <div style={{marginTop: 'auto', display: 'flex', justifyContent: 'center'}}>
          <div style={{width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)'}}></div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="main">
        <header className="header">
          <div>
            <h1 className="page-title">{activeTab}</h1>
            <div style={{display:'flex', alignItems:'center', gap:'10px', marginTop:'5px'}}>
               <span style={{fontSize: '12px', color: '#666'}}>System Operational</span>
               <div style={{width:'6px', height:'6px', borderRadius:'50%', background: '#10b981'}}></div>
            </div>
          </div>
          <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
            <div className="nav-btn" style={{width:'auto', padding:'0 15px', gap:'10px', background:'rgba(255,255,255,0.05)'}}>
               <Cloud size={16} /> {weather.temp}
            </div>
          </div>
        </header>

        <div className="content-area">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab} 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              className="grid"
            >
              
              {/* --- OVERVIEW TAB (DISEÑO GRID V3) --- */}
              {activeTab === 'Overview' && (
                <>
                  {/* WIDGET 1: CAPITAL (Con Ojo de Privacidad) */}
                  <div className="card w-trading" style={{ gridColumn: 'span 4' }}>
                    <div className="card-head">
                      <span className="card-label"><Wallet size={14} /> TOTAL ASSETS</span>
                      <button onClick={() => setShowBalance(!showBalance)} style={{background:'none', border:'none', color:'#666', cursor:'pointer'}}>
                        {showBalance ? <Eye size={16}/> : <EyeOff size={16}/>}
                      </button>
                    </div>
                    <div className="stat-val">{showBalance ? '$128,430.22' : '****'}</div>
                    <div style={{marginTop: 'auto', display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
                       <span style={{fontSize:'12px', color:'#10b981'}}>+12.5% this month</span>
                       <TrendingUp size={16} color="#10b981" />
                    </div>
                  </div>

                  {/* WIDGET 2: TRADING SIGNAL (Diseño limpio) */}
                  <div className="card w-trading" style={{ gridColumn: 'span 4' }}>
                    <div className="card-head">
                      <span className="card-label" style={{color:'#10b981'}}><Zap size={14} /> TREND SIGNAL</span>
                      <span className="pill pill-green">LIVE</span>
                    </div>
                    <div>
                      <div style={{fontSize: '12px', color:'#888', marginBottom:'4px'}}>BTC/USDT Strategy</div>
                      <div style={{fontSize: '32px', fontWeight: 800, color: '#10b981', letterSpacing: '-1px'}}>STRONG BUY</div>
                    </div>
                    <div style={{height:'4px', width:'100%', background:'#111', borderRadius:'2px', marginTop:'15px', overflow:'hidden'}}>
                      <div style={{height:'100%', width:'85%', background:'#10b981'}}></div>
                    </div>
                  </div>

                  {/* WIDGET 3: CLIMA / DAILY (Recomendación) */}
                  <div className="card w-projects" style={{ gridColumn: 'span 4' }}>
                    <div className="card-head">
                      <span className="card-label" style={{color:'#f59e0b'}}><MapPin size={14} /> LOCATION INTEL</span>
                    </div>
                    <div style={{textAlign:'center', padding:'10px'}}>
                      <div style={{fontSize:'13px', color:'#aaa', fontStyle:'italic'}}>
                        "{weather.temp} en Base. Condiciones óptimas para trabajo profundo."
                      </div>
                    </div>
                  </div>

                  {/* WIDGET 4: BRAIN CONSOLE (Mini Chat) */}
                  <div className="card w-brain" style={{ gridColumn: 'span 8', minHeight: '300px' }}>
                    <div className="card-head">
                      <span className="card-label" style={{color:'#8b5cf6'}}><Terminal size={14} /> APE CONSOLE</span>
                    </div>
                    <div style={{flex:1, background:'rgba(0,0,0,0.3)', borderRadius:'12px', padding:'15px', fontFamily:'monospace', fontSize:'13px', color:'#10b981', overflow:'hidden', display:'flex', flexDirection:'column-reverse'}}>
                      {chatHistory.slice(-3).reverse().map((m, i) => (
                        <div key={i} style={{marginBottom:'8px', opacity: 1 - (i*0.3)}}>
                           <span style={{color: m.role === 'user' ? 'white' : '#8b5cf6'}}>{m.role === 'user' ? '>' : '#'}</span> {m.text}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* WIDGET 5: CRYPTO TICKER REAL */}
                  <div className="card" style={{ gridColumn: 'span 4' }}>
                     <div className="card-head"><span className="card-label">MARKET PULSE</span></div>
                     <div style={{display:'flex', flexDirection:'column', gap:'15px'}}>
                        {['bitcoin', 'ethereum', 'solana'].map(c => (
                          <div key={c} style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                             <div style={{display:'flex', alignItems:'center', gap:'10px', textTransform:'capitalize'}}>
                                <div style={{width:'8px', height:'8px', borderRadius:'50%', background: prices[c]?.usd_24h_change >= 0 ? '#10b981' : '#ef4444'}}></div>
                                {c}
                             </div>
                             <div style={{fontWeight:600}}>${prices[c]?.usd?.toLocaleString()}</div>
                          </div>
                        ))}
                     </div>
                  </div>
                </>
              )}

              {/* --- BRAIN CHAT TAB (FULL SCREEN CHAT) --- */}
              {activeTab === 'Brain Chat' && (
                 <div className="card w-brain" style={{ gridColumn: 'span 12', height: '100%', minHeight: '500px' }}>
                    <div className="card-head">
                       <span className="card-label" style={{color:'#8b5cf6'}}>NEURAL INTERFACE</span>
                       <span className="pill" style={{background:'rgba(139, 92, 246, 0.1)', color:'#8b5cf6'}}>GEMINI PRO CONNECTED</span>
                    </div>
                    <div className="chat-window">
                       {chatHistory.map((msg, i) => (
                          <div key={i} className={`msg ${msg.role}`}>
                             {msg.text}
                          </div>
                       ))}
                       {isTyping && <div className="msg model" style={{opacity:0.5}}>Analizando...</div>}
                       <div ref={chatEndRef}></div>
                    </div>
                    <div className="input-area">
                       <input 
                          className="chat-input" 
                          placeholder="Envía una orden al sistema..." 
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                       />
                       <button onClick={handleChatSend} style={{background:'#8b5cf6', border:'none', borderRadius:'8px', width:'40px', color:'white', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}>
                          <Send size={18} />
                       </button>
                    </div>
                 </div>
              )}
              
              {/* --- TRADING LAB TAB (PIONEX) --- */}
              {activeTab === 'Trading Lab' && (
                 <div className="card w-trading" style={{ gridColumn: 'span 12', minHeight:'500px' }}>
                    <div className="card-head">
                       <span className="card-label" style={{color:'#10b981'}}>ACTIVE TRADING DESK</span>
                       <span className="pill pill-green">API LINKED</span>
                    </div>
                    <div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center', border:'1px dashed #333', borderRadius:'12px', background:'rgba(0,0,0,0.2)'}}>
                       <div style={{textAlign:'center'}}>
                          <h2 style={{fontSize:'40px', margin:'0 0 20px 0'}}>BTC/USDT</h2>
                          <div style={{fontSize:'60px', fontWeight:800, color:'white'}}>${prices.bitcoin?.usd?.toLocaleString()}</div>
                          <div style={{display:'flex', gap:'20px', justifyContent:'center', marginTop:'40px'}}>
                             <button style={{padding:'15px 40px', background:'#10b981', border:'none', borderRadius:'12px', fontSize:'18px', fontWeight:700, cursor:'pointer'}}>BUY LONG</button>
                             <button style={{padding:'15px 40px', background:'#ef4444', border:'none', borderRadius:'12px', fontSize:'18px', fontWeight:700, color:'white', cursor:'pointer'}}>SELL SHORT</button>
                          </div>
                       </div>
                    </div>
                 </div>
              )}

              {/* --- PROJECTS TAB --- */}
              {activeTab === 'Projects' && (
                <>
                 <div className="card w-projects" style={{ gridColumn: 'span 6', minHeight:'400px' }}>
                    <div className="card-head"><span className="card-label">ACTIVE BUILDS</span></div>
                    <div style={{display:'flex', flexDirection:'column', gap:'25px', marginTop:'20px'}}>
                       <div>
                          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'8px', fontSize:'13px'}}>
                             <span>ApeOS V5 (Optimization)</span> <span style={{color:'#f59e0b'}}>90%</span>
                          </div>
                          <div style={{height:'6px', background:'#222', borderRadius:'3px'}}><div style={{width:'90%', background:'#f59e0b', height:'100%', borderRadius:'3px'}}></div></div>
                       </div>
                       <div>
                          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'8px', fontSize:'13px'}}>
                             <span>ClawBot Telegram</span> <span style={{color:'#f59e0b'}}>45%</span>
                          </div>
                          <div style={{height:'6px', background:'#222', borderRadius:'3px'}}><div style={{width:'45%', background:'#f59e0b', height:'100%', borderRadius:'3px'}}></div></div>
                       </div>
                    </div>
                 </div>
                 <div className="card" style={{ gridColumn: 'span 6' }}>
                    <div className="card-head"><span className="card-label">VIABLE BACKLOG</span></div>
                    <ul style={{listStyle:'none', padding:0, margin:0, fontSize:'14px', color:'#ccc', display:'flex', flexDirection:'column', gap:'15px'}}>
                       <li style={{display:'flex', alignItems:'center', gap:'10px'}}><div style={{width:'6px', height:'6px', borderRadius:'50%', border:'1px solid #666'}}></div> SaaS de Impuestos Automáticos</li>
                       <li style={{display:'flex', alignItems:'center', gap:'10px'}}><div style={{width:'6px', height:'6px', borderRadius:'50%', border:'1px solid #666'}}></div> App de Votación DAO</li>
                       <li style={{display:'flex', alignItems:'center', gap:'10px'}}><div style={{width:'6px', height:'6px', borderRadius:'50%', border:'1px solid #666'}}></div> Trading Bot Arbitraje</li>
                    </ul>
                 </div>
                </>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <div className="watermark">MAGIC DASHBOARD</div>
    </div>
  );
}
