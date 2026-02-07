import React, { useState, useEffect } from 'react';

export default function AtomicDashboard() {
  const [timestamp, setTimestamp] = useState(new Date().toLocaleTimeString());
  
  // Simulando la entrada de datos que Ape conectará con el bot real
  const [data, setData] = useState({
    capital: 42500,
    activeBots: 3,
    marketPulse: 'Bullish'
  });

  const [logs, setLogs] = useState([
    'System initialized...',
    'Ape engine connected to AWS',
    'Waiting for next market cycle...'
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(new Date().toLocaleTimeString());
      // Aquí Ape inyectará la conexión real por API
      setData(prev => ({ ...prev, capital: prev.capital + (Math.random() * 10 - 5) }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', color: 'white', fontFamily: 'monospace', padding: '30px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1a1a1a', paddingBottom: '15px', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '20px', color: '#00d4ff', margin: 0 }}>MAGIC_OS // V2.0</h1>
        <div style={{ color: '#39ff14', fontSize: '14px' }}>[ LIVE: {timestamp} ]</div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ border: '1px solid #1a1a1a', padding: '20px', borderRadius: '4px' }}>
          <p style={{ color: '#666', fontSize: '12px', margin: '0 0 10px 0' }}>TOTAL_CAPITAL_FLOW</p>
          <h2 style={{ fontSize: '36px', color: '#39ff14', margin: 0 }}>${data.capital.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h2>
        </div>
        <div style={{ border: '1px solid #1a1a1a', padding: '20px', borderRadius: '4px' }}>
          <p style={{ color: '#666', fontSize: '12px', margin: '0 0 10px 0' }}>ACTIVE_INSTANCES</p>
          <h2 style={{ fontSize: '36px', color: '#00d4ff', margin: 0 }}>{data.activeBots}</h2>
        </div>
        <div style={{ border: '1px solid #1a1a1a', padding: '20px', borderRadius: '4px' }}>
          <p style={{ color: '#666', fontSize: '12px', margin: '0 0 10px 0' }}>MARKET_PULSE</p>
          <h2 style={{ fontSize: '36px', color: '#bc13fe', margin: 0 }}>{data.marketPulse}</h2>
        </div>
      </div>

      <div style={{ backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', padding: '20px', borderRadius: '4px' }}>
        <p style={{ color: '#00d4ff', fontSize: '12px', marginBottom: '15px' }}>SYSTEM_LOGS_VIEWER</p>
        <div style={{ height: '150px', overflowY: 'hidden', color: '#444', fontSize: '13px', lineHeight: '1.6' }}>
          {logs.map((log, i) => (
            <div key={i}>> {log}</div>
          ))}
          <div style={{ color: '#39ff14' }}>> Monitoring market trends 24/7...</div>
        </div>
      </div>

      <footer style={{ marginTop: '40px', fontSize: '10px', color: '#222', textAlign: 'center' }}>
        UNIPERSONAL_ENT_EFFICIENCY_MAX // NO_PR_PENDING
      </footer>
    </div>
  );
}
