'use client';
import React, { useState } from 'react';

export default function MagicOS() {
  const [activeTab, setActiveTab] = useState('Command Center');

  return (
    <div className="dashboard-container">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap');
        
        .dashboard-container {
          display: flex;
          background-color: #000;
          min-height: 100vh;
          color: #fff;
          font-family: 'Inter', sans-serif;
        }
        .sidebar {
          width: 280px;
          border-right: 1px solid #111;
          padding: 40px 30px;
          display: flex;
          flex-direction: column;
          background-color: #050505;
        }
        .nav-item {
          padding: 14px 16px;
          margin: 6px 0;
          border-radius: 12px;
          color: #555;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .nav-item:hover {
          background-color: #0a0a0a;
          color: #eee;
        }
        .nav-item.active {
          background-color: #111;
          color: #fff;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        }
        .apple-card {
          background-color: #0d0d0d;
          padding: 30px;
          border-radius: 28px;
          border: 1px solid #1a1a1a;
          transition: all 0.4s ease;
        }
        .apple-card:hover {
          border-color: #333;
          background-color: #111;
          transform: translateY(-4px);
        }
        .gradient-card {
          background: linear-gradient(145deg, #1e3a8a, #4c1d95);
          padding: 40px;
          border-radius: 32px;
          position: relative;
          overflow: hidden;
        }
        .brain-glow {
          filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.6));
        }
      `}</style>
      
      {/* SIDEBAR */}
      <div className="sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '60px' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="brain-glow">
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#2563eb" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h2 style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '0.5px' }}>APE Intelligence</h2>
        </div>
        
        <nav style={{ flexGrow: 1 }}>
          {['Command Center', 'Trading Lab', 'AI Proposals', 'Project Board', 'News Feed'].map(item => (
            <div key={item} onClick={() => setActiveTab(item)} className={`nav-item ${activeTab === item ? 'active' : ''}`}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: activeTab === item ? '#00d4ff' : 'transparent' }}></div>
              {item}
            </div>
          ))}
        </nav>

        <div style={{ padding: '20px', borderRadius: '20px', backgroundColor: '#0a0a0a', border: '1px solid #151515', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: 'linear-gradient(45deg, #222, #444)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>DS</div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 'bold' }}>Dasotillo</div>
            <div style={{ fontSize: '10px', color: '#444', textTransform: 'uppercase' }}>Founder</div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flexGrow: 1, padding: '60px', overflowY: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-1.5px' }}>MAGIC DASHBOARD</h1>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/>
              <path d="M12 6V12L16 14"/>
            </svg>
          </div>
          <div style={{ fontSize: '11px', color: '#39ff14', fontWeight: '800', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#39ff14' }}></div>
            SYSTEM_ACTIVE
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '30px' }}>
          
          <div className="apple-card" style={{ gridColumn: 'span 4' }}>
            <p style={{ fontSize: '10px', color: '#444', marginBottom: '15px', fontWeight: '800', textTransform: 'uppercase' }}>Trend Signal V1</p>
            <h2 style={{ color: '#39ff14', fontSize: '34px', margin: 0, fontWeight: '800' }}>LONG_ENTRY</h2>
          </div>

          <div className="apple-card" style={{ gridColumn: 'span 4' }}>
            <p style={{ fontSize: '10px', color: '#444', marginBottom: '15px', fontWeight: '800', textTransform: 'uppercase' }}>Daily Cash Flow</p>
            <h2 style={{ color: '#fff', fontSize: '34px', margin: 0, fontWeight: '800' }}>+.50</h2>
          </div>

          <div className="apple-card" style={{ gridColumn: 'span 4', backgroundColor: '#080808' }}>
            <p style={{ fontSize: '10px', color: '#00d4ff', marginBottom: '15px', fontWeight: '800', textTransform: 'uppercase' }}>Environment</p>
            <h2 style={{ fontSize: '22px', fontWeight: '700' }}>Benicàssim, ES</h2>
            <p style={{ fontSize: '14px', color: '#444', marginTop: '5px' }}>17°C • Winds 10km/h</p>
          </div>

          <div className="gradient-card" style={{ gridColumn: 'span 8' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '28px', fontWeight: '800', letterSpacing: '-0.5px' }}>APE Intelligence</h3>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', marginBottom: '35px', maxWidth: '550px' }}>
              Infraestructura optimizada en tiempo real. Cada nodo y cada proceso bajo monitorización constante.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <button style={{ background: '#fff', color: '#000', border: 'none', padding: '14px 30px', borderRadius: '14px', fontWeight: '700', cursor: 'pointer' }}>VIEW LOGS</button>
              <button style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', padding: '14px 30px', borderRadius: '14px', fontWeight: '700', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>STATUS</button>
            </div>
          </div>

          <div className="apple-card" style={{ gridColumn: 'span 4' }}>
            <h3 style={{ fontSize: '11px', color: '#ff9500', marginBottom: '25px', fontWeight: '800', textTransform: 'uppercase' }}>Financial Pulse</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ fontSize: '13px', color: '#eee', borderBottom: '1px solid #1a1a1a', paddingBottom: '12px' }}>BTC Resistance: <span style={{color: '#39ff14'}}>02,400</span></div>
              <div style={{ fontSize: '13px', color: '#eee' }}>Market Sentiment: <span style={{color: '#bc13fe'}}>Bullish</span></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
