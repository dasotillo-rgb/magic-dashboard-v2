'use client';
import React, { useState, useEffect } from 'react';

export default function ApeOS() {
  const [location, setLocation] = useState('Detecting...');

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(() => setLocation('Benicàssim, ES'), () => setLocation('Benicàssim, ES'));
    }
  }, []);

  return (
    <div style={{ display: 'flex', backgroundColor: '#050505', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      
      {/* SIDEBAR CON LOGO DE RAYO */}
      <div style={{ width: '260px', borderRight: '1px solid #1a1a1a', padding: '30px', display: 'flex', flexDirection: 'column', backgroundColor: '#080808' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '50px' }}>
          <div style={{ width: '35px', height: '35px', backgroundColor: '#2563eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '20px' }}>⚡</span>
          </div>
          <h2 style={{ color: 'white', letterSpacing: '1px', fontSize: '18px', margin: 0, fontWeight: '900' }}>APE OS</h2>
        </div>
        
        <nav style={{ flexGrow: 1 }}>
          {['Command Center', 'Trading Lab', 'AI Proposals', 'Project Board', 'Settings'].map(item => (
            <div key={item} style={{ padding: '15px 0', color: item === 'Command Center' ? '#00d4ff' : '#555', cursor: 'pointer', fontSize: '14px' }}>{item}</div>
          ))}
        </nav>

        <div style={{ backgroundColor: '#111', padding: '15px', borderRadius: '12px', border: '1px solid #222' }}>
          <div style={{ fontSize: '13px', fontWeight: 'bold' }}>Dasotillo</div>
          <div style={{ fontSize: '11px', color: '#00d4ff' }}>FOUNDER</div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flexGrow: 1, padding: '40px', overflowY: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>{location} DASHBOARD</h1>
          <div style={{ fontSize: '14px', color: '#39ff14' }}>● SYSTEM_ACTIVE</div>
        </header>

        {/* FILA 1: MÉTRICAS TRADING */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
          <div style={{ backgroundColor: '#0a0a0a', padding: '20px', borderRadius: '16px', border: '1px solid #1a1a1a' }}>
            <p style={{ fontSize: '10px', color: '#666' }}>TREND SIGNAL V1</p>
            <h2 style={{ color: '#39ff14' }}>LONG_ENTRY</h2>
            <div style={{ height: '2px', background: '#39ff14', width: '60%', marginTop: '10px' }}></div>
          </div>
          <div style={{ backgroundColor: '#0a0a0a', padding: '20px', borderRadius: '16px', border: '1px solid #1a1a1a' }}>
            <p style={{ fontSize: '10px', color: '#666' }}>DAILY CASH BOT</p>
            <h2 style={{ color: 'white' }}>+2.50</h2>
          </div>
          <div style={{ backgroundColor: '#0a0a0a', padding: '20px', borderRadius: '16px', border: '1px solid #1a1a1a' }}>
            <p style={{ fontSize: '10px', color: '#666' }}>ENVIRONMENT</p>
            <h2 style={{ color: '#00d4ff' }}>17°C / 12kmh</h2>
          </div>
        </div>

        {/* FILA 2: AI & PROYECTOS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
          {/* AI PROPOSALS WIDGET */}
          <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #581c87 100%)', padding: '30px', borderRadius: '24px' }}>
            <h3 style={{ margin: '0 0 15px 0' }}>💡 GEMINI BUSINESS PROPOSAL</h3>
            <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.6' }}>
              Analizando mercados... Esperando reset de Ape para inyectar la primera propuesta de cash rápido.
            </p>
            <button style={{ marginTop: '20px', background: 'white', color: 'black', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold' }}>SAVE TO NOTION</button>
          </div>

          {/* TASKS & PROGRESS */}
          <div style={{ backgroundColor: '#0a0a0a', padding: '25px', borderRadius: '20px', border: '1px solid #1a1a1a' }}>
            <h3 style={{ fontSize: '14px', marginBottom: '20px', color: '#00d4ff' }}>PROJECT_ADVANCE</h3>
            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '5px' }}>
                <span>Ape Dashboard V2</span>
                <span>85%</span>
              </div>
              <div style={{ height: '4px', background: '#222', borderRadius: '2px' }}>
                <div style={{ width: '85%', height: '100%', background: '#00d4ff' }}></div>
              </div>
            </div>
            <div style={{ marginTop: '25px' }}>
              <h3 style={{ fontSize: '14px', marginBottom: '15px' }}>CRITICAL_TASKS</h3>
              <div style={{ fontSize: '13px', color: '#666' }}>- Connect Supabase DB</div>
              <div style={{ fontSize: '13px', color: '#666' }}>- Link Trend Signal API</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
