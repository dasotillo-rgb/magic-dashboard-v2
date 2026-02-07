'use client';
import React, { useState, useEffect } from 'react';

export default function MagicDashboard() {
  const [location, setLocation] = useState('Detecting...');

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(() => setLocation('Benicàssim, ES'), () => setLocation('Benicàssim, ES'));
    }
  }, []);

  return (
    <div style={{ display: 'flex', backgroundColor: '#050505', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      
      {/* SIDEBAR CON BRANDING CORREGIDO */}
      <div style={{ width: '260px', borderRight: '1px solid #1a1a1a', padding: '30px', display: 'flex', flexDirection: 'column', backgroundColor: '#080808' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '50px' }}>
          <div style={{ width: '35px', height: '35px', backgroundColor: '#2563eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '20px' }}>⚡</span>
          </div>
          <h2 style={{ color: 'white', letterSpacing: '0.5px', fontSize: '16px', margin: 0, fontWeight: '900', textTransform: 'uppercase' }}>APE Intelligence</h2>
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
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '1px' }}>MAGIC DASHBOARD // {location}</h1>
          <div style={{ fontSize: '14px', color: '#39ff14' }}>● SYSTEM_ACTIVE</div>
        </header>

        {/* METRICS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
          <div style={{ backgroundColor: '#0a0a0a', padding: '25px', borderRadius: '16px', border: '1px solid #1a1a1a' }}>
            <p style={{ fontSize: '10px', color: '#666', marginBottom: '10px' }}>TREND SIGNAL V1</p>
            <h2 style={{ color: '#39ff14', margin: 0 }}>LONG_ENTRY</h2>
          </div>
          <div style={{ backgroundColor: '#0a0a0a', padding: '25px', borderRadius: '16px', border: '1px solid #1a1a1a' }}>
            <p style={{ fontSize: '10px', color: '#666', marginBottom: '10px' }}>DAILY CASH BOT</p>
            <h2 style={{ color: 'white', margin: 0 }}>+2.50</h2>
          </div>
          <div style={{ backgroundColor: '#0a0a0a', padding: '25px', borderRadius: '16px', border: '1px solid #1a1a1a' }}>
            <p style={{ fontSize: '10px', color: '#666', marginBottom: '10px' }}>ENVIRONMENT</p>
            <h2 style={{ color: '#00d4ff', margin: 0 }}>17°C / 10kmh</h2>
          </div>
        </div>

        {/* AI & PROJECTS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '25px' }}>
          <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #581c87 100%)', padding: '35px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '20px' }}>💡 GEMINI BUSINESS PROPOSAL</h3>
            <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: '1.6' }}>
              Estamos listos para inyectar la lógica de negocio. Esperando a que el motor de ejecución se estabilice para mostrarte el primer plan de cash rápido.
            </p>
            <button style={{ marginTop: '25px', background: 'white', color: 'black', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>SAVE TO NOTION</button>
          </div>

          <div style={{ backgroundColor: '#0a0a0a', padding: '25px', borderRadius: '20px', border: '1px solid #1a1a1a' }}>
            <h3 style={{ fontSize: '13px', marginBottom: '20px', color: '#00d4ff', textTransform: 'uppercase', letterSpacing: '1px' }}>Project_Advance</h3>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px' }}>
                <span>Magic OS V2.0</span>
                <span>88%</span>
              </div>
              <div style={{ height: '6px', background: '#111', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '88%', height: '100%', background: 'linear-gradient(90deg, #00d4ff, #bc13fe)' }}></div>
              </div>
            </div>
            <div style={{ marginTop: '30px' }}>
              <h3 style={{ fontSize: '13px', marginBottom: '15px', textTransform: 'uppercase' }}>Critical_Tasks</h3>
              <div style={{ fontSize: '13px', color: '#444', marginBottom: '8px' }}>[ ] Link Trend Signal API</div>
              <div style={{ fontSize: '13px', color: '#444' }}>[ ] Sync Supabase Database</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
