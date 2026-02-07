'use client';
import React, { useState, useEffect } from 'react';

export default function ApeOS() {
  const [data, setData] = useState({ capital: 28400, nodes: 42, growth: '94.2%' });
  const [location, setLocation] = useState('Detecting location...');
  const [weather, setWeather] = useState({ temp: '--', wind: '--' });

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        // Por ahora simulamos los datos del clima de Benicàssim, pero ya tenemos las coordenadas
        setLocation('Benicàssim, ES');
        setWeather({ temp: '17°C', wind: '10km/h' });
      }, () => {
        setLocation('Benicàssim (Default)');
        setWeather({ temp: '17°C', wind: '10km/h' });
      });
    }
  }, []);

  return (
    <div style={{ display: 'flex', backgroundColor: '#050505', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      {/* SIDEBAR PREMIUM */}
      <div style={{ width: '260px', borderRight: '1px solid #1a1a1a', padding: '30px', display: 'flex', flexDirection: 'column', backgroundColor: '#080808' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '50px' }}>
          <div style={{ width: '30px', height: '30px', backgroundColor: '#00d4ff', borderRadius: '6px' }}></div>
          <h2 style={{ color: 'white', letterSpacing: '2px', fontSize: '18px', margin: 0 }}>APE OS</h2>
        </div>
        
        <nav style={{ flexGrow: 1 }}>
          {['Command Center', 'Portfolio', 'Nodes', 'Analytics', 'Settings'].map(item => (
            <div key={item} style={{ padding: '15px 0', color: item === 'Command Center' ? 'white' : '#444', cursor: 'pointer', fontSize: '14px', fontWeight: item === 'Command Center' ? 'bold' : 'normal' }}>
              {item === 'Command Center' ? '● ' : ''}{item}
            </div>
          ))}
        </nav>

        <div style={{ backgroundColor: '#111', padding: '15px', borderRadius: '12px', border: '1px solid #222' }}>
          <div style={{ fontSize: '13px', color: 'white', fontWeight: 'bold' }}>Dasotillo</div>
          <div style={{ fontSize: '11px', color: '#00d4ff', marginTop: '2px' }}>FOUNDER</div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flexGrow: 1, padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', letterSpacing: '-0.5px' }}>SYSTEM OVERVIEW</h1>
          <button style={{ backgroundColor: 'white', color: 'black', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>NEW DEPLOYMENT</button>
        </header>

        {/* METRICS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px', marginBottom: '40px' }}>
          {[
            { label: 'CAPITAL FLOW', val: data.capital, unit: '$', color: '#39ff14', pulse: true },
            { label: 'ACTIVE NODES', val: data.nodes, unit: '', color: '#00d4ff', pulse: false },
            { label: 'SYSTEM GROWTH', val: data.growth, unit: '', color: '#bc13fe', pulse: false }
          ].map((m, i) => (
            <div key={i} style={{ backgroundColor: '#0a0a0a', padding: '30px', borderRadius: '16px', border: '1px solid #1a1a1a', position: 'relative', overflow: 'hidden' }}>
              <p style={{ fontSize: '11px', color: '#666', margin: '0 0 15px 0', fontWeight: 'bold', textTransform: 'uppercase' }}>{m.label}</p>
              <h2 style={{ fontSize: '36px', margin: 0, color: 'white' }}>{m.unit}{m.val.toLocaleString()}</h2>
              {m.pulse && <div style={{ marginTop: '15px', height: '2px', width: '100%', background: `linear-gradient(90deg, transparent, ${m.color}, transparent)` }}></div>}
            </div>
          ))}
        </div>

        {/* GEOLOCATED INTELLIGENCE BANNER */}
        <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #581c87 100%)', padding: '40px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '20px', right: '30px', color: 'rgba(255,255,255,0.2)', fontSize: '12px' }}>LIVE_NODE_01</div>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '32px', fontWeight: 'bold', textTransform: 'uppercase' }}>{location} INTELLIGENCE</h3>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', maxWidth: '500px', lineHeight: '1.6' }}>
            Infraestructura optimizada en tiempo real. 
            Vientos: <span style={{color: '#39ff14'}}>{weather.wind}</span> • Temp: <span style={{color: '#00d4ff'}}>{weather.temp}</span>
          </p>
          <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
            <button style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>VIEW LOGS</button>
            <button style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>STATUS</button>
          </div>
        </div>
      </div>
    </div>
  );
}
