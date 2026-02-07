'use client';
import React, { useState, useEffect } from 'react';

export default function MagicOS() {
  const [activeTab, setActiveTab] = useState('Command Center');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);


  return (
    <div className="main-layout">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap');
        body { margin: 0; padding: 0; background: #000; overflow: hidden; }
        .main-layout {
          display: flex;
          height: 100vh;
          background-color: #000;
          color: #fff;
          font-family: 'Inter', sans-serif;
        }
        .sidebar {
          width: 280px;
          background: rgba(10, 10, 10, 0.6);
          backdrop-filter: blur(30px);
          border-right: 1px solid #1a1a1a;
          display: flex;
          flex-direction: column;
          padding: 40px 20px;
        }
        .nav-item {
          padding: 14px 20px;
          margin: 8px 0;
          border-radius: 14px;
          color: #555;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .nav-item:hover { background: rgba(255,255,255,0.05); color: #fff; }
        .nav-item.active {
          background: #111;
          color: #fff;
          box-shadow: 0 4px 20px rgba(0,0,0,0.6);
          border: 1px solid #222;
        }
        .content-area {
          flex: 1;
          padding: 60px;
          overflow-y: auto;
          background: radial-gradient(circle at top right, #0a0a1a, #000);
        }
        .card {
          background: #0d0d0d;
          border: 1px solid #1a1a1a;
          border-radius: 28px;
          padding: 30px;
          transition: all 0.4s ease;
        }
        .card:hover { transform: translateY(-5px); border-color: #333; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .btn-primary {
          background: #fff;
          color: #000;
          border: none;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.2s;
        }
        .btn-primary:hover { transform: scale(1.05); }
      `}</style>

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '60px', padding: '0 10px' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#00d4ff" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontSize: '16px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>APE Intelligence</span>
        </div>

        <nav>
          {['Command Center', 'Trading Lab', 'AI Proposals', 'Project Board', 'News Feed'].map(item => (
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
      <main className="content-area">
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '50px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-1.5px', margin: 0 }}>MAGIC DASHBOARD</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#39ff14', fontSize: '11px', fontWeight: '800' }}>
            <div style={{ width: '6px', height: '6px', background: '#39ff14', borderRadius: '50%' }} /> ONLINE
          </div>
        </header>

        {/* CONTENIDO DINÁMICO SEGÚN PESTAÑA */}
        {activeTab === 'Command Center' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '30px' }}>
            <div className="card" style={{ gridColumn: 'span 4' }}>
              <span style={{ color: '#444', fontSize: '10px', fontWeight: '800' }}>TREND SIGNAL</span>
              <h2 style={{ color: '#39ff14', fontSize: '34px', margin: '10px 0 0 0' }}>LONG_ENTRY</h2>
            </div>
            <div className="card" style={{ gridColumn: 'span 4' }}>
              <span style={{ color: '#444', fontSize: '10px', fontWeight: '800' }}>CASH FLOW</span>
              <h2 style={{ color: '#fff', fontSize: '34px', margin: '10px 0 0 0' }}>+.50</h2>
            </div>
            <div className="card" style={{ gridColumn: 'span 4', background: 'rgba(255,255,255,0.02)' }}>
              <span style={{ color: '#00d4ff', fontSize: '10px', fontWeight: '800' }}>ENVIRONMENT</span>
              <h2 style={{ fontSize: '20px', margin: '10px 0 0 0' }}>Benicàssim, ES</h2>
              <p style={{ color: '#444', margin: '5px 0 0 0' }}>17°C • Winds 10km/h</p>
            </div>
            <div className="card" style={{ gridColumn: 'span 8', background: 'linear-gradient(135deg, #1e3a8a, #4c1d95)', border: 'none' }}>
              <h3 style={{ fontSize: '28px', margin: '0 0 20px 0' }}>AI Strategy Hub</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', marginBottom: '30px' }}>
                Motor de Gemini analizando mercados locales en Benicàssim. Tu próxima propuesta de negocio está siendo procesada.
              </p>
              <button className="btn-primary">SYNC NOTION</button>
            </div>
            <div className="card" style={{ gridColumn: 'span 4' }}>
              <h3 style={{ fontSize: '11px', color: '#ff9500', margin: '0 0 20px 0', textTransform: 'uppercase' }}>Financial Pulse</h3>
              <div style={{ fontSize: '13px', color: '#eee', borderBottom: '1px solid #1a1a1a', paddingBottom: '12px', marginBottom: '12px' }}>BTC Resistance: <span style={{color: '#39ff14'}}>02,400</span></div>
              <div style={{ fontSize: '13px', color: '#eee' }}>Sentiment: <span style={{color: '#bc13fe'}}>Bullish</span></div>
            </div>
          </div>
        )}

        {activeTab === 'Trading Lab' && (
          <div className="card">
            <h2>Trading Lab Interface</h2>
            <p style={{color: '#666'}}>Conectando con Binance API y Trend Signal V1...</p>
          </div>
        )}
        
        {/* Espacio para otras pestañas... */}
      </main>
    </div>
  );
}
