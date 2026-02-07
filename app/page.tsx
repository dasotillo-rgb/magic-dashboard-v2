'use client';
import React, { useState, useEffect } from 'react';

// --- ESTILOS DE INGENIERÍA VISUAL (CSS) ---
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
  
  :root {
    --bg-dark: #050505;
    --glass-bg: rgba(20, 20, 20, 0.6);
    --glass-border: rgba(255, 255, 255, 0.08);
    --accent-blue: #3b82f6;
    --accent-purple: #8b5cf6;
    --accent-green: #10b981;
    --text-main: #ffffff;
    --text-muted: #a1a1aa;
  }

  * { box-sizing: border-box; }
  body { margin: 0; background-color: var(--bg-dark); color: var(--text-main); font-family: 'Inter', sans-serif; overflow: hidden; }
  
  .layout { display: flex; height: 100vh; width: 100vw; background: radial-gradient(circle at top right, #111 0%, #000 50%); }
  
  /* --- SIDEBAR --- */
  .sidebar {
    width: 280px;
    background: rgba(5, 5, 5, 0.85);
    backdrop-filter: blur(20px);
    border-right: 1px solid var(--glass-border);
    padding: 32px 24px;
    display: flex; flex-direction: column;
    flex-shrink: 0;
  }
  
  .brand { display: flex; align-items: center; gap: 14px; margin-bottom: 56px; }
  .brand-logo {
    width: 40px; height: 40px;
    background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple));
    border-radius: 10px; display: flex; align-items: center; justify-content: center;
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  }
  .brand-name { font-size: 14px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; }

  .nav-menu { flex: 1; display: flex; flex-direction: column; gap: 4px; }
  .nav-item {
    padding: 12px 16px; border-radius: 12px;
    color: var(--text-muted); font-size: 14px; font-weight: 500;
    cursor: pointer; transition: all 0.2s ease;
    display: flex; align-items: center; gap: 12px;
  }
  .nav-item:hover { background: rgba(255,255,255,0.03); color: white; }
  .nav-item.active { background: rgba(255,255,255,0.08); color: white; font-weight: 600; border: 1px solid rgba(255,255,255,0.05); }

  /* --- MAIN CONTENT --- */
  .viewport { flex: 1; padding: 48px 64px; overflow-y: auto; }
  
  .header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 48px; }
  .header-title-box { display: flex; align-items: center; gap: 16px; }
  .page-title { font-size: 36px; font-weight: 800; letter-spacing: -1.5px; margin: 0; }
  
  .status-indicator {
    display: flex; align-items: center; gap: 8px;
    background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2);
    padding: 6px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; color: var(--accent-green);
  }
  .pulse-dot { width: 6px; height: 6px; background: var(--accent-green); border-radius: 50%; animation: pulse 2s infinite; }

  /* --- GRID SYSTEM --- */
  .grid-container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-auto-rows: minmax(180px, auto);
    gap: 24px;
  }

  /* --- WIDGET CARDS --- */
  .widget {
    background: var(--glass-bg);
    backdrop-filter: blur(24px);
    border: 1px solid var(--glass-border);
    border-radius: 24px;
    padding: 28px;
    display: flex; flex-direction: column; justify-content: space-between;
    transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s;
    position: relative; overflow: hidden;
  }
  .widget:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.2); }

  .widget-label { 
    font-size: 11px; font-weight: 700; text-transform: uppercase; 
    letter-spacing: 1.5px; color: var(--text-muted); margin-bottom: 12px; display: block;
  }
  
  .value-xl { font-size: 32px; font-weight: 700; letter-spacing: -1px; color: white; }
  .value-sub { font-size: 13px; color: var(--text-muted); margin-top: 6px; font-weight: 500; }

  /* --- SPECIAL WIDGETS --- */
  .w-gradient { background: linear-gradient(145deg, rgba(30, 30, 40, 0.8), rgba(10, 10, 10, 0.9)); }
  .w-ai { background: radial-gradient(circle at top right, rgba(139, 92, 246, 0.15), transparent 70%), var(--glass-bg); }

  .btn-action {
    background: white; color: black; border: none; padding: 12px 24px;
    border-radius: 12px; font-weight: 700; font-size: 13px; cursor: pointer;
    margin-top: 24px; transition: transform 0.2s;
  }
  .btn-action:hover { transform: scale(1.02); }

  .chat-input {
    background: rgba(0,0,0,0.3); border: 1px solid var(--glass-border);
    padding: 12px; border-radius: 10px; color: white; width: 100%;
    font-family: monospace; font-size: 12px; margin-top: auto;
  }

  .form-group { margin-bottom: 24px; }
  .form-label { display: block; font-size: 12px; color: var(--text-muted); margin-bottom: 8px; }
  .form-select { 
    width: 100%; padding: 12px; background: rgba(255,255,255,0.05); 
    border: 1px solid var(--glass-border); color: white; border-radius: 8px;
  }

  @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
  @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-3px); } 100% { transform: translateY(0px); } }
  .animate-float { animation: float 3s ease-in-out infinite; }
`;

// --- ICONOS VECTORIALES (SVG) ---
const Icons = {
  Bolt: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  Brain: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-float"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04Z"/><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>,
  Chart: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>,
  Settings: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Dashboard: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
};

export default function MagicOS() {
  const [activeTab, setActiveTab] = useState('Magic Dashboard');
  const [isMounted, setIsMounted] = useState(false);
  const [settings, setSettings] = useState({ lang: 'Spanish', industry: 'Finance & Tech' });

  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;

  return (
    <div className="layout">
      <style jsx global>{styles}</style>

      {/* --- SIDEBAR --- */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo"><Icons.Bolt /></div>
          <span className="brand-name">Ape Intelligence</span>
        </div>
        
        <nav className="nav-menu">
          {[
            { id: 'Magic Dashboard', icon: <Icons.Dashboard /> },
            { id: 'Trading Lab', icon: <Icons.Chart /> },
            { id: 'AI Proposals', icon: <Icons.Brain /> }, // Reusing brain icon small
            { id: 'Settings', icon: <Icons.Settings /> }
          ].map((item) => (
            <div 
              key={item.id} 
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              {item.id}
            </div>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#222', border: '1px solid #333' }} />
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: 'white' }}>Dasotillo</div>
              <div style={{ fontSize: '11px', color: '#666' }}>CEO • PRO PLAN</div>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN AREA --- */}
      <main className="viewport">
        <header className="header">
          <div className="header-title-box">
            {activeTab === 'Magic Dashboard' && <Icons.Brain />}
            <h1 className="page-title">{activeTab}</h1>
          </div>
          <div className="status-indicator">
            <div className="pulse-dot"></div>
            SYSTEM OPERATIONAL
          </div>
        </header>

        {/* --- DASHBOARD VIEW --- */}
        {activeTab === 'Magic Dashboard' && (
          <div className="grid-container">
            
            {/* 1. Trading Widget (Col 1-4) */}
            <div className="widget" style={{ gridColumn: 'span 4' }}>
              <div>
                <span className="widget-label">Trend Signal V1</span>
                <div className="value-xl" style={{ color: '#10b981' }}>LONG ENTRY</div>
              </div>
              <div className="value-sub">Confidence Score: <span style={{ color: 'white' }}>94%</span></div>
              <div style={{ height: '4px', width: '100%', background: '#222', marginTop: '16px', borderRadius: '2px' }}>
                <div style={{ height: '100%', width: '94%', background: '#10b981', borderRadius: '2px' }}></div>
              </div>
            </div>

            {/* 2. Environment Widget (Col 5-8) */}
            <div className="widget" style={{ gridColumn: 'span 4' }}>
              <div>
                <span className="widget-label" style={{ color: '#3b82f6' }}>Location Data</span>
                <div className="value-xl">Benicàssim</div>
              </div>
              <div className="value-sub">17°C • Clear Skies • Wind 10km/h</div>
            </div>

            {/* 3. News Widget (Col 9-12) */}
            <div className="widget" style={{ gridColumn: 'span 4' }}>
              <span className="widget-label" style={{ color: '#f59e0b' }}>{settings.industry} Feed</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ fontSize: '13px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>
                  BTC consolidates above <span style={{ color: '#10b981' }}>$102k</span> support.
                </div>
                <div style={{ fontSize: '13px' }}>
                  New AI regulation boosts tech sector calls.
                </div>
              </div>
            </div>

            {/* 4. AI Strategy (Big) (Col 1-8) */}
            <div className="widget w-ai" style={{ gridColumn: 'span 8', minHeight: '240px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <span className="widget-label" style={{ margin: 0, color: '#8b5cf6' }}>Gemini Strategy Engine</span>
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 12px 0' }}>Propuesta: Automatización Logística Regional</h3>
                <p style={{ color: '#a1a1aa', fontSize: '15px', lineHeight: '1.6', maxWidth: '600px', margin: 0 }}>
                  Detectada ineficiencia en distribución química local. Se sugiere implementar API de tracking para proveedores en Benicàssim. ROI estimado: 15% mensual.
                </p>
              </div>
              <button className="btn-action">SYNC TO NOTION</button>
            </div>

            {/* 5. Terminal / Chat (Col 9-12) */}
            <div className="widget w-gradient" style={{ gridColumn: 'span 4' }}>
              <span className="widget-label">Ape Terminal</span>
              <div style={{ flex: 1, fontFamily: 'monospace', fontSize: '12px', color: '#a1a1aa', overflow: 'hidden' }}>
                &gt; Connecting to Ape Brain...<br/>
                &gt; Context loaded.<br/>
                &gt; <span style={{ color: '#10b981' }}>Online.</span>
              </div>
              <input type="text" className="chat-input" placeholder="Type command..." />
            </div>

          </div>
        )}

        {/* --- SETTINGS VIEW --- */}
        {activeTab === 'Settings' && (
          <div className="widget" style={{ maxWidth: '600px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '32px' }}>System Configuration</h2>
            
            <div className="form-group">
              <label className="form-label">Interface Language</label>
              <select className="form-select" value={settings.lang} onChange={(e) => setSettings({...settings, lang: e.target.value})}>
                <option>Spanish</option>
                <option>English</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">News Feed Industry</label>
              <select className="form-select" value={settings.industry} onChange={(e) => setSettings({...settings, industry: e.target.value})}>
                <option>Finance & Tech</option>
                <option>Real Estate</option>
                <option>Chemical / Industrial</option>
              </select>
            </div>

            <button className="btn-action" style={{ background: '#3b82f6', color: 'white' }}>SAVE CHANGES</button>
          </div>
        )}

        {/* --- PLACEHOLDERS --- */}
        {(activeTab === 'Trading Lab' || activeTab === 'AI Proposals') && (
          <div className="widget" style={{ alignItems: 'center', justifyContent: 'center', height: '400px' }}>
            <Icons.Chart />
            <h3 style={{ marginTop: '20px', color: '#666' }}>Module Loading...</h3>
          </div>
        )}

      </main>
    </div>
  );
}
