'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  TrendingUp, TrendingDown, Brain, Zap, Shield, ShieldOff, 
  MapPin, Wind, Droplets, Send, CheckCircle2, Play, Square,
  Layers, Rocket, PlusCircle, LayoutDashboard, Settings, Eye, EyeOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ApeOSV3() {
  // --- ESTADOS ---
  const [privacyMode, setPrivacyMode] = useState(false);
  const [isBotActive, setIsBotActive] = useState(false);
  const [trendSignal, setTrendSignal] = useState<'BULLISH' | 'BEARISH'>('BULLISH');
  const [location, setLocation] = useState({ city: 'Detectando...', temp: '--', condition: 'Cargando...' });
  const [messages, setMessages] = useState([
    { role: 'ape', content: 'ApeOS V3 Online. ¿Qué operaciones ejecutamos hoy?' }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // --- LÓGICA DE GEOLOCALIZACIÓN ---
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        // Simulación de respuesta basada en coordenadas
        setLocation({
          city: "Benicàssim Area",
          temp: "21°C",
          condition: "Cielo Despejado"
        });
      });
    }
  }, []);

  // --- AUTO-SCROLL CHAT ---
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- HANDLERS ---
  const sendMessage = () => {
    if (!inputMsg) return;
    const newMsgs = [...messages, { role: 'user', content: inputMsg }];
    setMessages(newMsgs);
    setInputMsg('');
    setTimeout(() => {
      setMessages([...newMsgs, { role: 'ape', content: 'Entendido. Sincronizando orden con Pionex y actualizando logs en Notion...' }]);
    }, 800);
  };

  return (
    <div className="layout">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800;900&family=Space+Grotesk:wght@500;700&display=swap');

        :root {
          --bg-dark: #020202;
          --glass-border: rgba(255, 255, 255, 0.08);
          --emerald: #10b981;
          --purple: #8b5cf6;
          --amber: #f59e0b;
          --cyan: #06b6d4;
          --text-main: #efefef;
          --text-muted: #666;
        }

        * { box-sizing: border-box; }
        body { 
          margin: 0; 
          background: radial-gradient(circle at top left, #111, #020202); 
          color: var(--text-main);
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
        }

        .layout { max-width: 1400px; margin: 0 auto; padding: 40px 20px; }

        /* HEADER */
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
        .brand { display: flex; align-items: center; gap: 15px; }
        .logo-box { 
          background: linear-gradient(135deg, var(--purple), #3b82f6);
          padding: 10px; border-radius: 14px; display: flex; align-items: center;
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
        }
        .brand h1 { font-family: 'Space Grotesk'; font-weight: 900; font-size: 24px; margin: 0; letter-spacing: -1px; }
        .system-status { font-size: 10px; font-weight: 800; color: var(--emerald); display: flex; align-items: center; gap: 6px; margin-top: 4px; }
        
        .header-controls { display: flex; align-items: center; gap: 15px; }
        .icon-btn { 
          background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); 
          color: white; padding: 12px; border-radius: 12px; cursor: pointer; transition: 0.3s;
        }
        .icon-btn:hover { background: rgba(255,255,255,0.1); }
        .balance-card { 
          background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border);
          padding: 10px 20px; border-radius: 12px; text-align: right;
        }

        /* GRID SYSTEM */
        .grid-container {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 20px;
        }

        /* WIDGET BASE */
        .widget {
          background: rgba(10, 10, 10, 0.4);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 32px;
          padding: 30px;
          position: relative;
          overflow: hidden;
        }

        /* TINTED GLASS EFFECT */
        .w-trading { border-color: rgba(16, 185, 129, 0.2); box-shadow: 0 10px 40px rgba(16, 185, 129, 0.05); }
        .w-ai { border-color: rgba(139, 92, 246, 0.2); box-shadow: 0 10px 40px rgba(139, 92, 246, 0.05); }
        .w-projects { border-color: rgba(245, 158, 11, 0.2); box-shadow: 0 10px 40px rgba(245, 158, 11, 0.05); }
        .w-weather { border-color: rgba(6, 182, 212, 0.2); box-shadow: 0 10px 40px rgba(6, 182, 212, 0.05); }

        .widget-label { font-size: 10px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 2px; display: block; margin-bottom: 20px; }
        
        /* TRADING LAB COMPONENTS */
        .signal-badge { background: var(--emerald); color: black; padding: 4px 12px; border-radius: 99px; font-size: 10px; font-weight: 900; }
        .val-display { font-size: 42px; font-weight: 900; margin: 10px 0; font-family: 'Space Grotesk'; }
        .btn-trade-group { display: flex; gap: 10px; margin-top: 20px; }
        .btn-buy { flex: 1; background: var(--emerald); border: none; padding: 16px; border-radius: 16px; font-weight: 900; color: black; cursor: pointer; transition: 0.2s; }
        .btn-sell { flex: 1; background: transparent; border: 1px solid var(--emerald); padding: 16px; border-radius: 16px; font-weight: 900; color: var(--emerald); cursor: pointer; }
        .btn-buy:active, .btn-sell:active { transform: scale(0.95); }

        /* CHAT COMPONENTS */
        .chat-container { height: 320px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; padding-right: 10px; }
        .msg { max-width: 85%; padding: 12px 16px; border-radius: 18px; font-size: 14px; line-height: 1.5; }
        .msg-ape { background: rgba(255,255,255,0.05); border-top-left-radius: 2px; }
        .msg-user { background: var(--purple); align-self: flex-end; border-top-right-radius: 2px; }
        .chat-input-wrapper { position: relative; margin-top: 20px; }
        .chat-input { 
          width: 100%; background: rgba(0,0,0,0.4); border: 1px solid var(--glass-border); 
          padding: 16px; border-radius: 16px; color: white; outline: none;
        }
        .chat-send { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: var(--purple); border: none; padding: 8px; border-radius: 10px; color: white; cursor: pointer; }

        /* EMPIRE CONTROL */
        .project-item { display: flex; align-items: center; gap: 15px; padding: 15px; background: rgba(255,255,255,0.02); border-radius: 16px; margin-bottom: 10px; }
        .progress-track { height: 6px; width: 100%; background: rgba(255,255,255,0.05); border-radius: 10px; margin-top: 8px; overflow: hidden; }
        .progress-fill { height: 100%; background: var(--amber); border-radius: 10px; }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .grid-container { grid-template-columns: repeat(2, 1fr); }
          .lg-span-8, .lg-span-6, .lg-span-4 { grid-column: span 2; }
        }
        @media (max-width: 768px) {
          .grid-container { grid-template-columns: 1fr; }
          .lg-span-8, .lg-span-6, .lg-span-4 { grid-column: span 1; }
        }

        .lg-span-6 { grid-column: span 6; }
        .lg-span-8 { grid-column: span 8; }
        .lg-span-4 { grid-column: span 4; }
      `}</style>

      {/* --- HEADER --- */}
      <header className="header">
        <div className="brand">
          <div className="logo-box"><Zap fill="white" size={24}/></div>
          <div>
            <h1>APE OS <span style={{color: 'var(--purple)'}}>V3</span></h1>
            <div className="system-status">
              <span style={{width: 6, height: 6, borderRadius: '50%', background: 'var(--emerald)', boxShadow: '0 0 10px var(--emerald)'}} />
              OPERATIONAL
            </div>
          </div>
        </div>

        <div className="header-controls">
          <button className="icon-btn" onClick={() => setPrivacyMode(!privacyMode)}>
            {privacyMode ? <EyeOff size={20} color="var(--amber)"/> : <Eye size={20}/>}
          </button>
          <div className="balance-card">
            <div style={{fontSize: '10px', color: '#555', fontWeight: 800}}>TOTAL PORTFOLIO</div>
            <div style={{fontSize: '18px', fontWeight: 900, fontFamily: 'Space Grotesk'}}>
              {privacyMode ? "••••••" : "$12,450.82"}
            </div>
          </div>
        </div>
      </header>

      {/* --- MAIN GRID --- */}
      <main className="grid-container">
        
        {/* WIDGET 1: TRADING LAB */}
        <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} className="widget w-trading lg-span-6">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
            <span className="widget-label">Trading Lab / Pionex</span>
            <span className="signal-badge">{trendSignal} SIGNAL</span>
          </div>
          <div className="val-display" style={{color: trendSignal === 'BULLISH' ? 'var(--emerald)' : '#ef4444'}}>
            {trendSignal === 'BULLISH' ? 'LONG ENTRY' : 'SHORT ENTRY'}
          </div>
          <p style={{fontSize: '13px', color: '#888'}}>Trend Confidence: <span style={{color: 'white'}}>94.2%</span></p>
          
          <div style={{marginTop: '30px', padding: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '20px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <button 
                  onClick={() => setIsBotActive(!isBotActive)}
                  style={{
                    background: isBotActive ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                    border: 'none', padding: '10px', borderRadius: '12px', cursor: 'pointer'
                  }}
                >
                  {isBotActive ? <Square size={16} color="#ef4444" fill="#ef4444"/> : <Play size={16} color="var(--emerald)" fill="var(--emerald)"/>}
                </button>
                <span style={{fontSize: '12px', fontWeight: 800}}>{isBotActive ? 'BOT ACTIVE' : 'BOT STANDBY'}</span>
              </div>
              <div style={{fontSize: '11px', color: '#555'}}>API: PIONEX_V1_STABLE</div>
            </div>
          </div>

          <div className="btn-trade-group">
            <button className="btn-buy">COMPRA RÁPIDA</button>
            <button className="btn-sell">VENTA RÁPIDA</button>
          </div>
        </motion.div>

        {/* WIDGET 2: APE CHAT */}
        <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.1}} className="widget w-ai lg-span-6">
          <span className="widget-label">Ape Brain Console</span>
          <div className="chat-container">
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.role === 'user' ? 'msg-user' : 'msg-ape'}`}>
                {m.content}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="chat-input-wrapper">
            <input 
              className="chat-input" 
              placeholder="Ej: 'Inicia compra en BTC' o '¿Cómo va el clima?'" 
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button className="chat-send" onClick={sendMessage}><Send size={18}/></button>
          </div>
        </motion.div>

        {/* WIDGET 3: EMPIRE MANAGEMENT */}
        <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.2}} className="widget w-projects lg-span-8">
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '25px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
              <Layers color="var(--amber)" size={24}/>
              <h2 style={{margin: 0, fontSize: '20px', fontWeight: 800}}>Empire Projects</h2>
            </div>
            <PlusCircle color="var(--amber)" size={24} style={{cursor: 'pointer'}}/>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px'}}>
            <div>
              <p className="widget-label" style={{marginBottom: '15px', color: 'rgba(245, 158, 11, 0.5)'}}>Pipeline Activo</p>
              <div className="project-item">
                <Rocket size={18} color="var(--amber)"/>
                <div style={{flex: 1}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '12px'}}>
                    <span>ApeOS Dashboard V3</span>
                    <span>85%</span>
                  </div>
                  <div className="progress-track"><div className="progress-fill" style={{width: '85%'}}></div></div>
                </div>
              </div>
              <div className="project-item">
                <Shield size={18} color="var(--amber)"/>
                <div style={{flex: 1}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '12px'}}>
                    <span>Trading Engine Security</span>
                    <span>40%</span>
                  </div>
                  <div className="progress-track"><div className="progress-fill" style={{width: '40%'}}></div></div>
                </div>
              </div>
            </div>
            <div>
              <p className="widget-label" style={{marginBottom: '15px', color: 'rgba(245, 158, 11, 0.5)'}}>Business Ideas</p>
              {['SAAS Logística Local', 'Consultoría AI Química', 'Bot Arbitraje'].map((idea, i) => (
                <div key={idea} style={{fontSize: '13px', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '10px'}}>
                  <span style={{color: 'var(--amber)'}}>{i+1}.</span> {idea}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* WIDGET 4: CLIMA */}
        <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.3}} className="widget w-weather lg-span-4">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
            <div style={{padding: '6px 12px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '8px', fontSize: '10px', color: 'var(--cyan)', fontWeight: 800}}>
              <MapPin size={10} style={{marginRight: 5}}/> {location.city}
            </div>
            <div style={{fontSize: '36px', fontWeight: 900}}>{location.temp}</div>
          </div>
          
          <div style={{margin: '30px 0'}}>
            <div style={{fontSize: '16px', fontWeight: 600, color: '#ccc'}}>{location.condition}</div>
            <div style={{display: 'flex', gap: '20px', marginTop: '10px'}}>
              <div style={{fontSize: '12px', color: '#666', display: 'flex', alignItems: 'center', gap: '5px'}}><Wind size={14} color="var(--cyan)"/> 12km/h</div>
              <div style={{fontSize: '12px', color: '#666', display: 'flex', alignItems: 'center', gap: '5px'}}><Droplets size={14} color="var(--cyan)"/> 44% Hum.</div>
            </div>
          </div>

          <div style={{background: 'rgba(6, 182, 212, 0.05)', padding: '15px', borderRadius: '16px', border: '1px solid rgba(6, 182, 212, 0.1)'}}>
            <p style={{fontSize: '10px', fontWeight: 800, color: 'var(--cyan)', marginBottom: '5px'}}>DAILY RECOMMENDATION</p>
            <p style={{fontSize: '12px', italic: 'italic', color: '#999'}}>
              "Cielo despejado en Benicàssim. Momento ideal para networking o revisión táctica en exteriores."
            </p>
          </div>
        </motion.div>

      </main>

      {/* --- MINI NAVBAR --- */}
      <footer style={{display: 'flex', justifyContent: 'center', marginTop: '40px'}}>
        <div style={{background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', padding: '10px', borderRadius: '24px', display: 'flex', gap: '10px'}}>
          {[LayoutDashboard, Zap, Layers, Settings].map((Icon, i) => (
            <button key={i} style={{background: i===0 ? 'rgba(255,255,255,0.08)' : 'transparent', border: 'none', padding: '12px', borderRadius: '16px', cursor: 'pointer', color: i===0 ? 'white' : '#555'}}>
              <Icon size={20}/>
            </button>
          ))}
        </div>
      </footer>

    </div>
  );
}
