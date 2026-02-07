'use client';
import React, { useState, useEffect } from 'react';

export default function MagicOS() {
  const [activeTab, setActiveTab] = useState('Command Center');
  const [settings, setSettings] = useState({ language: 'ES', industry: 'Finance/Tech' });

  return (
    <div className="main-container">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap');
        
        body { margin: 0; background: #000; color: #fff; font-family: 'Plus Jakarta Sans', sans-serif; overflow: hidden; }
        
        .main-container { display: flex; height: 100vh; background: radial-gradient(circle at 50% 50%, #0d0d1a 0%, #000 100%); }

        /* SIDEBAR GLASS */
        .sidebar {
          width: 280px;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(40px);
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
        }

        .nav-item {
          padding: 14px 18px;
          margin: 4px 0;
          border-radius: 16px;
          color: #888;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        .nav-item:hover { background: rgba(255,255,255,0.05); color: #fff; }
        .nav-item.active { background: rgba(255,255,255,0.1); color: #fff; border: 1px solid rgba(255,255,255,0.1); }

        /* GLASS CARDS */
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 32px;
          padding: 30px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          overflow: hidden;
        }
        .glass-card:hover { 
          background: rgba(255, 255, 255, 0.06); 
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-8px);
        }

        .scroll-area { flex: 1; padding: 60px; overflow-y: auto; }
        
        input, select {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          padding: 10px;
          border-radius: 8px;
          width: 100%;
          margin-top: 10px;
        }
      `}</style>

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '50px' }}>
          <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #00d4ff, #7c3aed)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '20px' }}>⚡</span>
          </div>
          <span style={{ fontWeight: '800', letterSpacing: '0.5px' }}>APE INTEL</span>
        </div>

        <nav style={{ flex: 1 }}>
          {['Command Center', 'Trading Lab', 'AI Proposals', 'Global News', 'Settings'].map(item => (
            <div 
              key={item} 
              className={`nav-item ${activeTab === item ? 'active' : ''}`}
              onClick={() => setActiveTab(item)}
            >
              {item}
            </div>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="scroll-area">
        <header style={{ marginBottom: '50px' }}>
          <h1 style={{ fontSize: '42px', fontWeight: '900', letterSpacing: '-2px', margin: 0 }}>{activeTab.toUpperCase()}</h1>
        </header>

        {activeTab === 'Command Center' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '25px' }}>
            
            {/* WIDGET CLIMA/INFO */}
            <div className="glass-card" style={{ gridColumn: 'span 4' }}>
              <div style={{ color: '#00d4ff', fontSize: '11px', fontWeight: '800', marginBottom: '15px' }}>LOCAL ENVIRONMENT</div>
              <h2 style={{ fontSize: '28px', margin: 0 }}>Benicàssim</h2>
              <p style={{ color: '#666', fontSize: '15px' }}>Sunny • 17°C • Winds 10km/h</p>
            </div>

            {/* WIDGET NEWS CUSTOMIZABLE */}
            <div className="glass-card" style={{ gridColumn: 'span 4' }}>
              <div style={{ color: '#ff9500', fontSize: '11px', fontWeight: '800', marginBottom: '15px' }}>{settings.industry.toUpperCase()} FEED</div>
              <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
                <div>• BTC Consolidation at 02k</div>
                <div>• AI Compute demand spikes 40%</div>
              </div>
            </div>

            {/* WIDGET CHAT DIRECTO (GEMINI) */}
            <div className="glass-card" style={{ gridColumn: 'span 4', border: '1px solid #7c3aed' }}>
              <div style={{ color: '#7c3aed', fontSize: '11px', fontWeight: '800', marginBottom: '10px' }}>DIRECT COMM</div>
              <div style={{ height: '80px', fontSize: '13px', color: '#aaa', overflow: 'hidden' }}>
                Listo para ejecutar. ¿Cuál es el siguiente paso, Founder?
              </div>
              <input placeholder="Escribe aquí..." style={{ fontSize: '12px' }} />
            </div>

            {/* AI PROPOSALS (CENTRAL) */}
            <div className="glass-card" style={{ gridColumn: 'span 8', background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.4), rgba(124, 58, 237, 0.4))' }}>
              <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>AI BUSINESS STRATEGY</h3>
              <p style={{ color: '#ccc', fontSize: '16px' }}>Sincronizando con bases de datos para generar la propuesta de alta rentabilidad del día.</p>
              <button style={{ background: '#fff', color: '#000', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: '700', marginTop: '10px' }}>EJECUTAR EN NOTION</button>
            </div>
          </div>
        )}

        {activeTab === 'Settings' && (
          <div className="glass-card" style={{ maxWidth: '600px' }}>
            <h2 style={{ marginBottom: '30px' }}>System Configuration</h2>
            <label style={{ fontSize: '12px', color: '#666' }}>Language / Idioma</label>
            <select onChange={(e) => setSettings({...settings, language: e.target.value})}>
              <option value="ES">Español</option>
              <option value="EN">English</option>
            </select>
            
            <label style={{ fontSize: '12px', color: '#666', display: 'block', marginTop: '20px' }}>Industry Focus (API News Feed)</label>
            <select onChange={(e) => setSettings({...settings, industry: e.target.value})}>
              <option value="Finance/Tech">Finance & Technology</option>
              <option value="Food">Food & Beverage</option>
              <option value="Chemical">Chemical Industry</option>
            </select>
          </div>
        )}
      </main>
    </div>
  );
}
