'use client';
import React, { useState, useEffect } from 'react';

export default function MagicOS() {
  const [location, setLocation] = useState('Benicàssim, ES');
  const [activeTab, setActiveTab] = useState('Command Center');

  return (
    <div className="dashboard-container">
      <style jsx global>{`
        .dashboard-container {
          display: flex;
          background-color: #000;
          min-height: 100vh;
          color: #fff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .sidebar {
          width: 260px;
          border-right: 1px solid #222;
          padding: 30px;
          display: flex;
          flex-direction: column;
          background-color: rgba(10, 10, 10, 0.8);
          backdrop-filter: blur(20px);
        }
        .nav-item {
          padding: 12px 16px;
          margin: 4px 0;
          border-radius: 8px;
          color: #666;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .nav-item:hover {
          background-color: rgba(255, 255, 255, 0.08);
          color: #fff;
        }
        .nav-item.active {
          background-color: rgba(255, 255, 255, 0.05);
          color: #fff;
          font-weight: 600;
        }
        .apple-card {
          background-color: #0a0a0a;
          padding: 30px;
          border-radius: 24px;
          border: 1px solid #1a1a1a;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .apple-card:hover {
          transform: translateY(-5px);
          border-color: #333;
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
        .brain-icon {
          font-size: 24px;
          animation: pulse 2s infinite;
        }
      `}</style>
      
      {/* SIDEBAR */}
      <div className="sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '60px' }}>
          <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #2563eb, #7c3aed)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(37, 99, 235, 0.5)' }}>
            <span style={{ fontSize: '20px' }}>⚡</span>
          </div>
          <h2 style={{ fontSize: '15px', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase' }}>APE Intelligence</h2>
        </div>
        
        <nav style={{ flexGrow: 1 }}>
          {['Command Center', 'Trading Lab', 'AI Proposals', 'Project Board', 'News Feed', 'Settings'].map(item => (
            <div 
              key={item} 
              onClick={() => setActiveTab(item)}
              className={`nav-item ${activeTab === item ? 'active' : ''}`}
            >
              {activeTab === item && <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#00d4ff' }}></div>}
              {item}
            </div>
          ))}
        </nav>

        <div style={{ padding: '20px', borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid #222' }}>
          <div style={{ fontSize: '13px', fontWeight: 'bold' }}>Dasotillo</div>
          <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>FOUNDER</div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flexGrow: 1, padding: '50px', overflowY: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '800', letterSpacing: '-1px' }}>MAGIC DASHBOARD</h1>
            <span className="brain-icon">🧠</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#39ff14', fontWeight: 'bold' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#39ff14', boxShadow: '0 0 10px #39ff14' }}></div>
            SYSTEM_ACTIVE
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '25px' }}>
          
          <div className="apple-card" style={{ gridColumn: 'span 4' }}>
            <p style={{ fontSize: '11px', color: '#666', marginBottom: '15px', fontWeight: '700' }}>TREND SIGNAL V1</p>
            <h2 style={{ color: '#39ff14', fontSize: '32px', margin: 0, letterSpacing: '-1px' }}>LONG_ENTRY</h2>
          </div>

          <div className="apple-card" style={{ gridColumn: 'span 4' }}>
            <p style={{ fontSize: '11px', color: '#666', marginBottom: '15px', fontWeight: '700' }}>DAILY CASH FLOW</p>
            <h2 style={{ color: '#fff', fontSize: '32px', margin: 0 }}>+.50</h2>
          </div>

          <div className="apple-card" style={{ gridColumn: 'span 4', background: 'rgba(255,255,255,0.03)', borderColor: '#222' }}>
            <div style={{ fontSize: '11px', color: '#00d4ff', fontWeight: 'bold', marginBottom: '8px' }}>ENVIRONMENT</div>
            <div style={{ fontSize: '20px', fontWeight: '700' }}>{location}</div>
            <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>17°C • Winds 10km/h</div>
          </div>

          <div style={{ gridColumn: 'span 8', background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)', padding: '40px', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '24px', fontWeight: 'bold' }}>💡 GEMINI BUSINESS PROPOSAL</h3>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', marginBottom: '25px' }}>
              Analizando mercados en tiempo real para Benicàssim. Pronto aquí tus planes de ejecución rápida.
            </p>
            <button style={{ background: '#fff', color: '#000', border: 'none', padding: '14px 28px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>SAVE TO NOTION</button>
          </div>

          <div className="apple-card" style={{ gridColumn: 'span 4' }}>
            <h3 style={{ fontSize: '13px', color: '#ff9500', marginBottom: '20px', textTransform: 'uppercase' }}>Financial News</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ fontSize: '13px', borderBottom: '1px solid #222', paddingBottom: '10px' }}>BTC breaks 00k resistance...</div>
              <div style={{ fontSize: '13px' }}>FED interest rate decision today.</div>
            </div>
          </div>

          <div className="apple-card" style={{ gridColumn: 'span 12' }}>
            <h3 style={{ fontSize: '13px', color: '#00d4ff', marginBottom: '20px' }}>PROJECT_EXECUTION</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
              <div style={{ flexGrow: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '10px' }}>
                  <span>Magic OS V2.0 Integration</span>
                  <span style={{ fontWeight: 'bold' }}>88%</span>
                </div>
                <div style={{ height: '8px', background: '#1a1a1a', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '88%', height: '100%', background: 'linear-gradient(90deg, #00d4ff, #7c3aed)' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
