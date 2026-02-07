'use client';
import React, { useState, useEffect } from 'react';

// --- ESTILOS INYECTADOS (CSS IN JS) ---
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800&display=swap');
  
  * { box-sizing: border-box; }
  body { margin: 0; background-color: #000000; color: #ffffff; font-family: 'Inter', sans-serif; overflow: hidden; }
  
  /* Layout Principal */
  .layout { display: flex; height: 100vh; width: 100vw; }
  
  /* Sidebar */
  .sidebar {
    width: 260px;
    background-color: #050505;
    border-right: 1px solid #1A1A1A;
    display: flex; flex-direction: column;
    padding: 32px 20px;
    flex-shrink: 0;
  }
  
  .brand { display: flex; align-items: center; gap: 12px; margin-bottom: 40px; padding-left: 8px; }
  .brand-text { font-size: 13px; font-weight: 800; letter-spacing: 1px; color: #fff; }
  
  .nav-item {
    padding: 12px 16px; margin-bottom: 4px;
    border-radius: 8px; font-size: 14px; font-weight: 500; color: #888;
    cursor: pointer; transition: all 0.2s;
    display: flex; align-items: center; gap: 10px;
  }
  .nav-item:hover { background-color: #111; color: #fff; }
  .nav-item.active { background-color: #1A1A1A; color: #fff; font-weight: 600; }

  /* Contenido Principal */
  .main { flex: 1; padding: 48px 60px; overflow-y: auto; background: radial-gradient(circle at top right, #111 0%, #000 40%); }
  
  .header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 48px; }
  .page-title { font-size: 32px; font-weight: 800; letter-spacing: -1px; margin: 0; }
  .status-badge { 
    font-size: 11px; font-weight: 700; color: #39FF14; 
    background: rgba(57, 255, 20, 0.1); padding: 6px 12px; border-radius: 20px;
    border: 1px solid rgba(57, 255, 20, 0.2);
  }

  /* Grid System (3 Columnas Reales) */
  .grid { 
    display: grid; 
    grid-template-columns: repeat(3, 1fr); 
    gap: 24px; 
    width: 100%;
  }
  
  /* Tarjetas (Widgets) */
  .card {
    background-color: #0A0A0A;
    border: 1px solid #1F1F1F;
    border-radius: 20px;
    padding: 28px;
    display: flex; flex-direction: column; justify-content: space-between;
    min-height: 180px;
    transition: transform 0.2s, border-color 0.2s;
  }
  .card:hover { border-color: #333; transform: translateY(-2px); }
  
  .card-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 16px; }
  .card-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #555; }
  
  .card-value { font-size: 36px; font-weight: 700; letter-spacing: -1.5px; line-height: 1; color: #fff; }
  .card-sub { font-size: 13px; color: #666; margin-top: 8px; font-weight: 500; }
  
  /* Variaciones de Color */
  .text-green { color: #39FF14; }
  .text-blue { color: #3B82F6; }
  .text-purple { color: #A855F7; }

  /* Botones */
  .btn-primary {
    background: #fff; color: #000; border: none; padding: 12px 24px;
    border-radius: 10px; font-weight: 600; font-size: 13px; cursor: pointer;
    margin-top: 24px;
  }
  .btn-primary:hover { background: #eee; }
  
  /* Chat Input */
  .terminal-input {
    width: 100%; background: #111; border: 1px solid #222;
    padding: 12px; border-radius: 8px; color: #fff; font-family: monospace; font-size: 12px;
    margin-top: auto;
  }
`;

// --- ICONOS SVG (COMPONENTES) ---
const Icons = {
  Brain: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04Z"/></svg>
  ),
  Bolt: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
  ),
  Globe: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
  )
};

export default function MagicOS() {
  const [activeTab, setActiveTab] = useState('Magic Dashboard');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="layout">
      <style jsx global>{styles}</style>

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <div style={{ background: '#111', padding: '6px', borderRadius: '6px', border: '1px solid #222' }}>
            <Icons.Bolt />
          </div>
          <span className="brand-text">APE INTELLIGENCE</span>
        </div>
        
        <nav style={{ flex: 1 }}>
          {['Magic Dashboard', 'Trading Lab', 'AI Proposals', 'Settings'].map(item => (
            <div 
              key={item} 
              className={`nav-item ${activeTab === item ? 'active' : ''}`}
              onClick={() => setActiveTab(item)}
            >
              {activeTab === item && <div style={{ width: '4px', height: '4px', background: '#fff', borderRadius: '50%' }} />}
              {item}
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '12px', background: '#0A0A0A', borderRadius: '12px', border: '1px solid #1A1A1A' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#222' }} />
          <div>
            <div style={{ fontSize: '12px', fontWeight: '700' }}>Dasotillo</div>
            <div style={{ fontSize: '10px', color: '#555' }}>PRO PLAN</div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main">
        <header className="header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span className="status-badge">SYSTEM OPERATIONAL</span>
            </div>
            <h1 className="page-title">{activeTab}</h1>
          </div>
        </header>

        {activeTab === 'Magic Dashboard' && (
          <div className="grid">
            
            {/* Widget 1: Trading */}
            <div className="card">
              <div className="card-header">
                <span className="card-label">Trend Signal</span>
                <div style={{ width: '8px', height: '8px', background: '#39FF14', borderRadius: '50%', boxShadow: '0 0 10px #39FF14' }} />
              </div>
              <div>
                <div className="card-value text-green">LONG</div>
                <div className="card-sub">Confidence: 94%</div>
              </div>
            </div>

            {/* Widget 2: Environment */}
            <div className="card">
              <div className="card-header">
                <span className="card-label">Environment</span>
                <Icons.Globe />
              </div>
              <div>
                <div className="card-value">17°C</div>
                <div className="card-sub">Benicàssim • Wind 10km/h</div>
              </div>
            </div>

            {/* Widget 3: News Feed */}
            <div className="card">
              <div className="card-header">
                <span className="card-label">Financial Feed</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ fontSize: '13px', borderBottom: '1px solid #222', paddingBottom: '8px' }}>
                  BTC Testing <span className="text-green">$102k</span>
                </div>
                <div style={{ fontSize: '13px' }}>
                  AI Sector: <span className="text-purple">Strong Buy</span>
                </div>
              </div>
            </div>

            {/* Widget 4: AI STRATEGY (Double Width) */}
            <div className="card" style={{ gridColumn: 'span 2', background: 'linear-gradient(145deg, #0f0f0f, #050505)' }}>
              <div className="card-header">
                <span className="card-label text-purple">Gemini Strategy Engine</span>
                <Icons.Brain />
              </div>
              <div style={{ paddingRight: '40px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 10px 0' }}>Oportunidad: Automatización Logística</h3>
                <p style={{ color: '#888', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                  Detectada alta demanda en Benicàssim para sistemas de gestión de stock en tiempo real. Propuesta lista para revisión.
                </p>
                <button className="btn-primary">SYNC TO NOTION</button>
              </div>
            </div>

            {/* Widget 5: Terminal */}
            <div className="card">
              <div className="card-header">
                <span className="card-label">Ape Terminal</span>
              </div>
              <div style={{ fontSize: '12px', color: '#444', marginBottom: '10px' }}>
                [System]: Waiting for input...
              </div>
              <input type="text" className="terminal-input" placeholder="Type command..." />
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
