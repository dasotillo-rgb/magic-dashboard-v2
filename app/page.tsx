'use client';
import React, { useState, useEffect } from 'react';

export default function MagicOS() {
  const [activeTab, setActiveTab] = useState('Magic Dashboard');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);
  if (!isMounted) return null;

  const BrainIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04Z"/>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04Z"/>
    </svg>
  );

  const BoltIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
    </svg>
  );

  return (
    <div className="os-container">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&display=swap');
        
        body { margin: 0; background: #000; color: #fff; font-family: 'Space Grotesk', sans-serif; overflow: hidden; }
        .os-container { display: flex; height: 100vh; background: #000; }

        .sidebar {
          width: 280px;
          background: rgba(5, 5, 5, 0.8);
          backdrop-filter: blur(50px);
          border-right: 1px solid #111;
          display: flex;
          flex-direction: column;
          padding: 40px 20px;
        }

        .brand { display: flex; align-items: center; gap: 12px; margin-bottom: 60px; padding: 0 10px; }
        .brand span { font-weight: 700; letter-spacing: 1px; color: #fff; font-size: 14px; text-transform: uppercase; }

        .nav-link {
          display: flex; align-items: center; gap: 12px; padding: 14px 18px; margin: 4px 0;
          border-radius: 12px; color: #666; cursor: pointer; transition: 0.3s; font-size: 14px;
        }
        .nav-link:hover { background: rgba(255,255,255,0.03); color: #fff; }
        .nav-link.active { background: rgba(255,255,255,0.05); color: #fff; font-weight: 600; }

        .viewport { flex: 1; padding: 60px; overflow-y: auto; position: relative; }
        .grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px; }
        
        .widget {
          border-radius: 30px; padding: 35px; border: 1px solid rgba(255,255,255,0.05);
          transition: 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); backdrop-filter: blur(10px);
        }
        .widget:hover { transform: translateY(-5px); border-color: rgba(255,255,255,0.15); }

        .w-obsidian { background: linear-gradient(145deg, rgba(15,15,15,0.9), rgba(5,5,5,0.9)); }
        .w-deep-blue { background: linear-gradient(145deg, rgba(10,20,40,0.6), rgba(5,10,20,0.6)); }
        .w-electric { background: linear-gradient(145deg, rgba(20,10,40,0.6), rgba(10,5,20,0.6)); }
        
        .label { font-size: 10px; font-weight: 700; letter-spacing: 2px; color: #444; text-transform: uppercase; margin-bottom: 20px; display: block; }
        .value { font-size: 38px; font-weight: 700; letter-spacing: -1px; margin: 0; }
        
        .chat-input {
          background: rgba(255,255,255,0.05); border: 1px solid #222; border-radius: 12px;
          padding: 12px 18px; color: #fff; width: 100%; margin-top: 20px; font-family: inherit;
        }
      `}</style>

      <aside className="sidebar">
        <div className="brand">
          <BoltIcon />
          <span>APE Intelligence</span>
        </div>
        <nav style={{ flex: 1 }}>
          {[
            { name: 'Magic Dashboard', icon: <BrainIcon /> },
            { name: 'Trading Lab', icon: null },
            { name: 'AI Proposals', icon: null },
            { name: 'Global News', icon: null },
            { name: 'Settings', icon: null }
          ].map(tab => (
            <div 
              key={tab.name} 
              className={`nav-link ${activeTab === tab.name ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.icon && tab.icon}
              <span style={{ marginLeft: tab.icon ? '0' : '32px' }}>{tab.name}</span>
            </div>
          ))}
        </nav>
      </aside>

      <main className="viewport">
        <header style={{ marginBottom: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <span style={{ fontSize: '12px', color: '#00d4ff', fontWeight: '700', letterSpacing: '2px' }}>SYSTEM OPERATIVE</span>
            <h1 style={{ fontSize: '48px', fontWeight: '700', margin: '10px 0 0 0', letterSpacing: '-2px' }}>{activeTab}</h1>
          </div>
        </header>

        {activeTab === 'Magic Dashboard' && (
          <div className="grid">
            <div className="widget w-obsidian" style={{ gridColumn: 'span 4' }}>
              <span className="label">Trend Signal V1</span>
              <h2 className="value" style={{ color: '#39ff14' }}>LONG_ENTRY</h2>
            </div>
            <div className="widget w-deep-blue" style={{ gridColumn: 'span 4' }}>
              <span className="label">Environment</span>
              <h2 className="value">Benicàssim</h2>
              <p style={{ color: '#666', marginTop: '10px' }}>17.5°C — Clearing Skies</p>
            </div>
            <div className="widget w-electric" style={{ gridColumn: 'span 4' }}>
              <span className="label">Global News Feed</span>
              <div style={{ fontSize: '13px', color: '#aaa' }}>
                <p>• BTC testing support at $101.2k</p>
              </div>
            </div>
            <div className="widget w-obsidian" style={{ gridColumn: 'span 8', minHeight: '300px' }}>
              <span className="label">Gemini Strategy Engine</span>
              <h3 style={{ fontSize: '24px', margin: '0 0 15px 0' }}>Micro-SaaS Logístico</h3>
              <p style={{ color: '#666', fontSize: '15px', lineHeight: '1.6' }}>
                Analizando ineficiencias en el sector químico regional para Benicàssim.
              </p>
              <button style={{ background: '#fff', color: '#000', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: '700', marginTop: '20px' }}>NOTION SYNC</button>
            </div>
            <div className="widget w-obsidian" style={{ gridColumn: 'span 4' }}>
              <span className="label">Ape Terminal</span>
              <div style={{ height: '100px', fontSize: '13px', color: '#555' }}>[Ape]: Esperando instrucciones...</div>
              <input className="chat-input" placeholder="Escribe al sistema..." />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
