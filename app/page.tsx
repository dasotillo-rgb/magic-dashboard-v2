'use client';
import React, { useState, useEffect } from 'react';

export default function MagicOS() {
  const [activeTab, setActiveTab] = useState('Magic Dashboard');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="os-container">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { margin: 0; background: #000; color: #fff; font-family: 'Inter', sans-serif; }
        .os-container { display: flex; height: 100vh; }
        
        /* Sidebar Estilo Captura 22.58.44 */
        .sidebar {
          width: 280px; background: #050505; border-right: 1px solid #111;
          padding: 40px 24px; display: flex; flex-direction: column;
        }
        .logo-area { display: flex; align-items: center; gap: 12px; margin-bottom: 50px; }
        .logo-box { 
          width: 32px; height: 32px; background: #2563eb; borderRadius: 8px; 
          display: flex; align-items: center; justifyContent: center;
        }
        .nav-link {
          padding: 14px 16px; margin: 4px 0; border-radius: 12px; color: #555;
          cursor: pointer; transition: 0.2s; font-size: 14px; font-weight: 600;
        }
        .nav-link.active { background: #111; color: #fff; }

        /* Main Content */
        .viewport { flex: 1; padding: 60px; overflow-y: auto; }
        .header-title { font-size: 32px; font-weight: 900; letter-spacing: -1.5px; margin-bottom: 40px; }
        
        /* Widgets con Grid Corregido */
        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 24px; }
        .widget { 
          background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 24px; padding: 24px;
          display: flex; flex-direction: column; justify-content: space-between; min-height: 120px;
        }
        .label { font-size: 10px; font-weight: 700; color: #444; text-transform: uppercase; letter-spacing: 1px; }
        .value { font-size: 28px; font-weight: 700; margin-top: 8px; }

        /* Banner Central Premium */
        .strategy-banner {
          grid-column: span 2; background: linear-gradient(135deg, #1e40af, #6b21a8);
          border-radius: 32px; padding: 40px;
        }
      `}</style>

      <aside className="sidebar">
        <div className="logo-area">
          <div className="logo-box">⚡</div>
          <span style={{ fontWeight: 900, fontSize: '14px' }}>APE INTELLIGENCE</span>
        </div>
        <nav>
          {['Magic Dashboard', 'Trading Lab', 'AI Proposals', 'Settings'].map(tab => (
            <div key={tab} className={`nav-link ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
              {tab}
            </div>
          ))}
        </nav>
      </aside>

      <main className="viewport">
        <h1 className="header-title">MAGIC DASHBOARD</h1>
        
        <div className="grid">
          <div className="widget">
            <span className="label">Trend Signal V1</span>
            <span className="value" style={{ color: '#39ff14' }}>LONG_ENTRY</span>
          </div>
          <div className="widget">
            <span className="label">Environment</span>
            <span className="value">Benicàssim</span>
          </div>
          <div className="widget">
            <span className="label">Global News</span>
            <div style={{ fontSize: '12px', color: '#888', marginTop: '10px' }}>BTC support at $101.2k</div>
          </div>
        </div>

        <div className="grid">
          <div className="strategy-banner">
            <h2 style={{ fontSize: '24px', margin: '0 0 16px 0' }}>💡 Gemini Strategy Engine</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.6' }}>
              Analizando ineficiencias en el sector químico regional para optimizar flujos de caja.
            </p>
            <button style={{ background: '#fff', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: 700, marginTop: '20px', cursor: 'pointer' }}>
              SYNC TO NOTION
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
