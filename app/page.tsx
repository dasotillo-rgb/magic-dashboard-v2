import React from 'react';

export default function AtomicDashboard() {
  const metrics = [
    { label: 'Capital Flow', value: '2,500', change: '+12%', color: '#39ff14' },
    { label: 'Active Bots', value: '3', change: 'Stable', color: '#00d4ff' },
    { label: 'Market Pulse', value: 'Bullish', change: 'High', color: '#bc13fe' }
  ];

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', padding: '40px' }}>
      <header style={{ borderBottom: '1px solid #222', paddingBottom: '20px', marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '24px', letterSpacing: '2px', color: '#00d4ff' }}>MAGIC DASHBOARD <span style={{ color: '#333' }}>V2</span></h1>
        <div style={{ backgroundColor: '#111', padding: '8px 16px', borderRadius: '20px', fontSize: '12px', border: '1px solid #333' }}>
          <span style={{ color: '#39ff14' }}>●</span> APE SYSTEM CONNECTED
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ backgroundColor: '#0a0a0a', padding: '24px', borderRadius: '12px', border: '1px solid #1a1a1a', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
            <p style={{ color: '#666', fontSize: '14px', margin: '0 0 10px 0', textTransform: 'uppercase' }}>{m.label}</p>
            <h2 style={{ fontSize: '32px', margin: '0 0 10px 0', color: m.color }}>{m.value}</h2>
            <span style={{ fontSize: '12px', color: '#444' }}>Trend: {m.change}</span>
          </div>
        ))}
      </div>

      <footer style={{ marginTop: '60px', color: '#333', fontSize: '12px', textAlign: 'center' }}>
        PR REVIEWS PENDING • ONE-PERSON BUSINESS EFFICIENCY • 2026
      </footer>
    </div>
  );
}
