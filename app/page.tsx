'use client';
import React, { useState, useEffect } from 'react';

export default function MagicOS() {
  const [location, setLocation] = useState('Benicàssim, ES');
  const [activeTab, setActiveTab] = useState('Command Center');

  return (
    <div style={{ display: 'flex', backgroundColor: '#000', minHeight: '100vh', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', overflow: 'hidden' }}>
      
      {/* SIDEBAR: Glassmorphism Style */}
      <div style={{ width: '260px', borderRight: '1px solid #222', padding: '30px', display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(10, 10, 10, 0.8)', backdropFilter: 'blur(20px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '60px', transition: 'transform 0.3s ease' }}>
          <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #2563eb, #7c3aed)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(37, 99, 235, 0.5)' }}>
            <span style={{ fontSize: '22px' }}>⚡</span>
          </div>
          <h2 style={{ fontSize: '15px', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase', color: '#eee' }}>APE Intelligence</h2>
        </div>
        
        <nav style={{ flexGrow: 1 }}>
          {['Command Center', 'Trading Lab', 'AI Proposals', 'Project Board', 'News Feed', 'Settings'].map(item => (
            <div 
              key={item} 
              onClick={() => setActiveTab(item)}
              style={{ 
                padding: '12px 16px', 
                margin: '4px 0',
                borderRadius: '8px',
                color: activeTab === item ? '#fff' : '#666', 
                backgroundColor: activeTab === item ? 'rgba(255,255,255,0.05)' : 'transparent',
                cursor: 'pointer', 
                fontSize: '14px',
                fontWeight: activeTab === item ? '600' : '400',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
              onMouseEnter={(e) => { e.target.style.backgroundColor = 'rgba(255,255,255,0.08)'; e.target.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = activeTab === item ? 'rgba(255,255,255,0.05)' : 'transparent'; e.target.style.color = activeTab === item ? '#fff' : '#666'; }}
            >
              {activeTab === item && <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#00d4ff' }}></div>}
              {item}
            </div>
          ))}
        </nav>

        <div style={{ padding: '20px', borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid #222' }}>
          <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#fff' }}>Dasotillo</div>
          <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>FOUNDER</div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flexGrow: 1, padding: '50px', overflowY: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '800', letterSpacing: '-1px' }}>MAGIC DASHBOARD</h1>
            <span style={{ fontSize: '24px', animation: 'pulse 2s infinite' }}>🧠</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#39ff14', fontWeight: 'bold' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#39ff14', boxShadow: '0 0 10px #39ff14' }}></div>
            SYSTEM_ACTIVE
          </div>
        </header>

        {/* GRID LAYOUT */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '25px' }}>
          
          {/* TRADING STATUS: Apple Style Card */}
          <div style={{ gridColumn: 'span 4', backgroundColor: '#0a0a0a', padding: '30px', borderRadius: '24px', border: '1px solid #1a1a1a', transition: 'transform 0.3s ease' }}>
            <p style={{ fontSize: '11px', color: '#666', marginBottom: '15px', fontWeight: '700' }}>TREND SIGNAL V1</p>
            <h2 style={{ color: '#39ff14', fontSize: '32px', margin: 0, letterSpacing: '-1px' }}>LONG_ENTRY</h2>
            <div style={{ marginTop: '20px', fontSize: '12px', color: '#444' }}>Confidence Level: 92%</div>
          </div>

          <div style={{ gridColumn: 'span 4', backgroundColor: '#0a0a0a', padding: '30px', borderRadius: '24px', border: '1px solid #1a1a1a' }}>
            <p style={{ fontSize: '11px', color: '#666', marginBottom: '15px', fontWeight: '700' }}>DAILY CASH FLOW</p>
            <h2 style={{ color: '#fff', fontSize: '32px', margin: 0 }}>+.50</h2>
          </div>

          {/* NEW CLIMATE WIDGET */}
          <div style={{ gridColumn: 'span 4', background: 'rgba(255,255,255,0.03)', padding: '30px', borderRadius: '24px', border: '1px solid #222', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '12px', color: '#00d4ff', fontWeight: 'bold', marginBottom: '8px' }}>ENVIRONMENT</div>
            <div style={{ fontSize: '20px', fontWeight: '700' }}>{location}</div>
            <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>17°C • Winds 10km/h</div>
          </div>

          {/* AI PROPOSAL: Resaltado Apple Style */}
          <div style={{ gridColumn: 'span 8', background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)', padding: '40px', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', transition: 'all 0.3s ease' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '24px', fontWeight: 'bold' }}>💡 GEMINI BUSINESS PROPOSAL</h3>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', marginBottom: '25px' }}>
              Estamos analizando mercados en tiempo real. En cuanto el motor se sincronice, verás aquí planes de ejecución rápida.
            </p>
            <button style={{ background: '#fff', color: '#000', border: 'none', padding: '14px 28px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', transition: 'transform 0.2s ease' }}>SAVE TO NOTION</button>
          </div>

          {/* NEWS FEED WIDGET */}
          <div style={{ gridColumn: 'span 4', backgroundColor: '#0a0a0a', padding: '30px', borderRadius: '24px', border: '1px solid #1a1a1a' }}>
            <h3 style={{ fontSize: '13px', color: '#ff9500', marginBottom: '20px', textTransform: 'uppercase' }}>Financial News</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ fontSize: '13px', borderBottom: '1px solid #222', paddingBottom: '10px' }}>BTC breaks 00k resistance...</div>
              <div style={{ fontSize: '13px', borderBottom: '1px solid #222', paddingBottom: '10px' }}>FED interest rate decision today.</div>
              <div style={{ fontSize: '13px' }}>Market Pulse: Extremely Bullish.</div>
            </div>
          </div>

          {/* PROJECTS PROGRESS */}
          <div style={{ gridColumn: 'span 12', backgroundColor: '#0a0a0a', padding: '30px', borderRadius: '24px', border: '1px solid #1a1a1a' }}>
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
              <div style={{ width: '1px', height: '40px', backgroundColor: '#222' }}></div>
              <div style={{ fontSize: '12px', color: '#444' }}>Next: Link Supabase API</div>
            </div>
          </div>

        </div>
      </div>
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
