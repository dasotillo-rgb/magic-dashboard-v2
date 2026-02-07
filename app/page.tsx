'use client';
import React, { useState, useEffect } from 'react';
import { 
  LineChart, Wallet,  Activity, Send, MapPin, 
  Briefcase, CheckCircle, Eye, EyeOff, LayoutGrid, Settings,
  CloudRain, Zap, TrendingUp, Terminal
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ApeOSV3() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [showBalance, setShowBalance] = useState(true);
  const [weather, setWeather] = useState({ temp: '--', condition: 'Scanning...' });
  const [inputCmd, setInputCmd] = useState('');

  // Simulación de carga de clima real
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        // Aquí conectaríamos con OpenWeather API real
        setWeather({ temp: '18°C', condition: 'Benicàssim • Clear' });
      }, () => {
        setWeather({ temp: '18°C', condition: 'Benicàssim (Est)' });
      });
    }
  }, []);

  return (
    <div className="layout">
      {/* --- ESTILOS NATIVOS (NO TAILWIND) --- */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=Inter:wght@300;400;600;800&display=swap');
        
        :root {
          --bg: #050505;
          --glass: rgba(20, 20, 20, 0.6);
          --glass-border: rgba(255, 255, 255, 0.08);
          --neon-green: #10b981;
          --neon-purple: #8b5cf6;
          --neon-cyan: #06b6d4;
          --neon-amber: #f59e0b;
          --text-main: #ffffff;
          --text-muted: #888888;
        }

        body { margin: 0; background: var(--bg); color: var(--text-main); font-family: 'Inter', sans-serif; overflow-x: hidden; }
        
        .layout { display: flex; min-height: 100vh; background: radial-gradient(circle at 15% 15%, #111 0%, #000 100%); }
        
        /* SIDEBAR */
        .sidebar { 
          width: 80px; border-right: 1px solid var(--glass-border); display: flex; flex-direction: column; align-items: center; padding: 30px 0; gap: 20px; z-index: 10;
          background: rgba(0,0,0,0.4); backdrop-filter: blur(20px);
          transition: width 0.3s ease;
        }
        .sidebar:hover { width: 240px; align-items: flex-start; padding-left: 20px; }
        .sidebar:hover .nav-label { display: block; opacity: 1; }
        .nav-label { display: none; opacity: 0; white-space: nowrap; margin-left: 15px; font-weight: 500; font-size: 14px; transition: opacity 0.2s; }
        
        .nav-btn {
          width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center;
          color: var(--text-muted); cursor: pointer; transition: all 0.2s;
        }
        .nav-btn:hover, .nav-btn.active { background: rgba(255,255,255,0.1); color: white; }
        .sidebar:hover .nav-btn { width: 100%; justify-content: flex-start; padding-left: 12px; }

        /* MAIN */
        .viewport { flex: 1; padding: 40px; overflow-y: auto; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
        .title { font-family: 'Space Grotesk'; font-size: 32px; font-weight: 700; letter-spacing: -1px; margin: 0; }
        
        /* GRID SYSTEM */
        .grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px; grid-auto-rows: minmax(180px, auto); }
        
        /* WIDGETS */
        .card {
          background: var(--glass); border: 1px solid var(--glass-border); border-radius: 24px; padding: 24px;
          backdrop-filter: blur(24px); position: relative; overflow: hidden; display: flex; flex-direction: column;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .card:hover { transform: translateY(-4px); box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5); border-color: rgba(255,255,255,0.15); }

        /* Widget Variants */
        .w-trading { border-top: 2px solid var(--neon-green); background: linear-gradient(180deg, rgba(16,185,129,0.02) 0%, rgba(0,0,0,0) 100%), var(--glass); }
        .w-ai { border-top: 2px solid var(--neon-purple); background: linear-gradient(180deg, rgba(139,92,246,0.02) 0%, rgba(0,0,0,0) 100%), var(--glass); }
        .w-projects { border-top: 2px solid var(--neon-amber); }
        .w-env { border-top: 2px solid var(--neon-cyan); }

        .card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
        .card-title { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); display: flex; align-items: center; gap: 8px; }
        
        /* Typography & Elements */
        .stat-val { font-family: 'Space Grotesk'; font-size: 28px; font-weight: 700; color: white; }
        .btn-action { 
          background: white; color: black; border: none; padding: 12px; border-radius: 12px; font-weight: 700; 
          cursor: pointer; width: 100%; margin-top: auto; display: flex; justify-content: center; gap: 8px; font-size: 13px;
        }
        .btn-action:hover { opacity: 0.9; transform: scale(1.02); }
        .btn-trading { width: 48%; padding: 12px; border-radius: 12px; border: none; font-weight: 800; cursor: pointer; color: black; }

        /* RESPONSIVE */
        @media (max-width: 1024px) { .grid { grid-template-columns: repeat(2, 1fr); } .sidebar { display: none; } .layout { flex-direction: column; } }
        @media (max-width: 768px) { .grid { grid-template-columns: 1fr; } }
      `}</style>

      {/* --- SIDEBAR --- */}
      <nav className="sidebar">
        <div style={{ marginBottom: '20px' }}><Zap color="#fff" fill="#fff" /></div>
        
        {[
          { id: 'Overview', icon: LayoutGrid },
          { id: 'Trading Lab', icon: TrendingUp },
          { id: 'Brain Chat', icon: Terminal },
          { id: 'Projects', icon: Briefcase },
          { id: 'Settings', icon: Settings },
        ].map((item) => (
          <div key={item.id} className={`nav-btn ${activeTab === item.id ? 'active' : ''}`} onClick={() => setActiveTab(item.id)}>
            <item.icon size={20} />
            <span className="nav-label">{item.id}</span>
          </div>
        ))}
      </nav>

      {/* --- CONTENT --- */}
      <main className="viewport">
        <header className="header">
          <div>
            <h1 className="title">{activeTab}</h1>
            <p style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>System Active • {weather.temp} in {weather.condition}</p>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
             <button className="nav-btn" style={{background: 'rgba(255,255,255,0.05)', width: 'auto', padding: '0 20px', borderRadius: '20px'}}>
               <CloudRain size={16} style={{marginRight: '8px'}} /> {weather.temp}
             </button>
          </div>
        </header>

        <div className="grid">
          
          {/* 1. PORTFOLIO (Col 4) */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card w-env" style={{ gridColumn: 'span 4' }}>
            <div className="card-head">
              <span className="card-title"><Wallet size={14} /> CAPITAL TOTAL</span>
              <div onClick={() => setShowBalance(!showBalance)} style={{ cursor: 'pointer', color: '#666' }}>
                {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
              </div>
            </div>
            <div className="stat-val">
              {showBalance ? '$12,450.00' : '****'}
            </div>
            <div style={{ color: 'var(--neon-green)', fontSize: '13px', marginTop: '5px', display: 'flex', alignItems: 'center' }}>
              <TrendingUp size={14} style={{ marginRight: '4px' }} /> +12.5% this month
            </div>
          </motion.div>

          {/* 2. TRADING LAB (Col 4) */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card w-trading" style={{ gridColumn: 'span 4' }}>
            <div className="card-head">
              <span className="card-title" style={{ color: 'var(--neon-green)' }}><Activity size={14} /> PIONEX SIGNAL</span>
              <span style={{ fontSize: '10px', background: 'rgba(16,185,129,0.2)', color: 'var(--neon-green)', padding: '2px 8px', borderRadius: '4px' }}>LIVE</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#888' }}>BTC/USDT</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'white' }}>$102,450</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '12px', color: '#888' }}>Trend</div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--neon-green)' }}>BULLISH 🚀</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
              <button className="btn-trading" style={{ background: 'var(--neon-green)' }}>BUY</button>
              <button className="btn-trading" style={{ background: '#ef4444', color: 'white' }}>SELL</button>
            </div>
          </motion.div>

          {/* 3. APE CHAT (Col 4) */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card w-ai" style={{ gridColumn: 'span 4' }}>
            <div className="card-head">
              <span className="card-title" style={{ color: 'var(--neon-purple)' }}><Terminal size={14} /> APE BRAIN</span>
            </div>
            <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '12px', marginBottom: '12px', overflow: 'hidden' }}>
              <p style={{ fontSize: '12px', color: '#aaa', margin: '0 0 8px 0' }}>&gt; Analizando mercado...</p>
              <p style={{ fontSize: '12px', color: 'var(--neon-purple)', margin: 0 }}>&gt; Oportunidad detectada en Arbitraje.</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="Send command..." 
                value={inputCmd}
                onChange={(e) => setInputCmd(e.target.value)}
                style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '8px', padding: '8px 12px', color: 'white', fontSize: '12px' }}
              />
              <button style={{ background: 'var(--neon-purple)', border: 'none', borderRadius: '8px', width: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Send size={16} color="white" />
              </button>
            </div>
          </motion.div>

          {/* 4. DAILY VENTURES / PROJECTS (Col 8) */}
          <div className="card w-projects" style={{ gridColumn: 'span 8', minHeight: '300px' }}>
            <div className="card-head">
              <span className="card-title" style={{ color: 'var(--neon-amber)' }}><Briefcase size={14} /> PROJECT PIPELINE</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {/* Columna Proyectos */}
              <div>
                <h3 style={{ fontSize: '14px', color: '#fff', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Active Builds</h3>
                {[
                  { name: 'ClawBot V2', progress: 85, color: 'var(--neon-green)' },
                  { name: 'Notion Sync API', progress: 40, color: 'var(--neon-cyan)' },
                  { name: 'ApeOS Dashboard', progress: 100, color: 'var(--neon-purple)' }
                ].map(p => (
                  <div key={p.name} style={{ margin: '15px 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '5px' }}>
                      <span>{p.name}</span>
                      <span>{p.progress}%</span>
                    </div>
                    <div style={{ height: '4px', background: '#222', borderRadius: '2px' }}>
                      <div style={{ width: `${p.progress}%`, background: p.color, height: '100%', borderRadius: '2px' }}></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Columna Tareas Rápidas */}
              <div style={{ borderLeft: '1px solid #222', paddingLeft: '20px' }}>
                <h3 style={{ fontSize: '14px', color: '#fff', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Daily Focus</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '13px', color: '#ccc' }}>
                    <CheckCircle size={14} color="var(--neon-green)" /> Revisar Logs de AWS
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '13px', color: '#ccc' }}>
                    <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '1px solid #555' }}></div> Conectar API Pionex
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '13px', color: '#ccc' }}>
                    <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '1px solid #555' }}></div> Definir Micro-SaaS #1
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. WEATHER & RECOMMENDATION (Col 4) */}
          <div className="card w-env" style={{ gridColumn: 'span 4' }}>
            <div className="card-head">
              <span className="card-title" style={{ color: 'var(--neon-cyan)' }}><MapPin size={14} /> ENTORNO</span>
            </div>
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
              <CloudRain size={48} color="var(--neon-cyan)" />
              <div style={{ fontSize: '32px', fontWeight: 800, margin: '10px 0' }}>18°C</div>
              <div style={{ color: '#888', fontSize: '14px' }}>Benicàssim, Spain</div>
            </div>
            <div style={{ background: 'rgba(6, 182, 212, 0.05)', padding: '15px', borderRadius: '16px', border: '1px solid rgba(6, 182, 212, 0.1)' }}>
              <p style={{ fontSize: '10px', fontWeight: 800, color: 'var(--neon-cyan)', marginBottom: '5px' }}>DAILY RECOMMENDATION</p>
              <p style={{ fontSize: '12px', fontStyle: 'italic', color: '#999' }}>
                "Cielo despejado en Benicàssim. Momento ideal para networking o revisión táctica en exteriores."
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
