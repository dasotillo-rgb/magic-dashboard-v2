'use client';
import React, { useState, useEffect } from 'react';

// --- CONFIGURACIÓN E ICONOS ---
const Icons = {
  Target: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Zap: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  Brain: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2"><path d="M12 2a5 5 0 0 1 5 5v2a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2 1 1 0 0 0 1-1V7a5 5 0 0 1 5-5z"/><path d="M9 22v-2"/><path d="M15 22v-2"/></svg>,
  Cloud: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.5 19a5.5 5.5 0 0 0 1.5-10.5 8.5 8.5 0 1 0-14.5 7.5"/></svg>,
  Trending: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  Notion: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4.459 4.208c.746-.606 1.705-.826 3.232-.826h9.702c1.334 0 2.217.152 2.766.458.549.306.825.864.825 1.673v12.23c0 .736-.264 1.3-.792 1.692-.528.392-1.341.587-2.439.587H5.975c-1.144 0-1.936-.181-2.378-.544-.442-.362-.663-.924-.663-1.685V5.98c0-.796.241-1.387.725-1.772zM15.46 6.13h-6.92v11.74h1.75V8.58l4.42 8.79h1.75V6.13h-1zm-6.92 0H6.79v11.74h1.75V6.13z"/></svg>
};

export default function ApeOSV2() {
  const [time, setTime] = useState(new Set().add(new Date()));
  const [activeTab, setActiveTab] = useState('Overview');
  const [syncStatus, setSyncStatus] = useState('Idle');
  
  // Efecto para reloj en tiempo real
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSyncNotion = async () => {
    setSyncStatus('Syncing...');
    // Simulación de API call a Notion
    setTimeout(() => setSyncStatus('Success'), 2000);
    setTimeout(() => setSyncStatus('Idle'), 5000);
  };

  return (
    <div className="container">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=Inter:wght@300;400;600;800&display=swap');
        
        :root {
          --bg: #030303;
          --glass: rgba(15, 15, 15, 0.7);
          --border: rgba(255, 255, 255, 0.06);
          --accent: #3b82f6;
          --purple: #8b5cf6;
          --green: #10b981;
          --text: #efefef;
        }

        body { 
          margin: 0; background: var(--bg); color: var(--text); 
          font-family: 'Inter', sans-serif; overflow-x: hidden;
        }

        .container { display: flex; height: 100vh; background: radial-gradient(circle at 0% 0%, #111 0%, #030303 100%); }

        /* Sidebar */
        .sidebar {
          width: 260px; border-right: 1px solid var(--border);
          padding: 40px 24px; display: flex; flex-direction: column;
          background: rgba(0,0,0,0.2); backdrop-filter: blur(10px);
        }
        .logo { font-family: 'Space Grotesk'; font-weight: 700; font-size: 20px; display: flex; align-items: center; gap: 10px; margin-bottom: 60px; }
        .nav-item { 
          padding: 14px 18px; border-radius: 12px; cursor: pointer; 
          transition: all 0.3s; color: #666; font-weight: 500; font-size: 14px;
          display: flex; align-items: center; gap: 12px;
        }
        .nav-item.active { background: var(--border); color: white; box-shadow: 0 4px 20px rgba(0,0,0,0.4); }

        /* Main Viewport */
        .viewport { flex: 1; overflow-y: auto; padding: 40px 60px; }
        .top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
        
        /* Grid System */
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-auto-rows: minmax(160px, auto);
          gap: 24px;
        }

        /* Widgets */
        .widget {
          background: var(--glass);
          border: 1px solid var(--border);
          border-radius: 28px;
          padding: 30px;
          backdrop-filter: blur(40px);
          position: relative;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .widget:hover { border-color: rgba(255,255,255,0.15); transform: translateY(-5px); }

        .widget-title { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; color: #555; margin-bottom: 20px; display: block; }
        
        /* Typography */
        .val-lg { font-size: 38px; font-weight: 800; font-family: 'Space Grotesk'; letter-spacing: -1px; }
        .val-md { font-size: 22px; font-weight: 600; }
        .text-mute { color: #888; font-size: 13px; }

        /* Buttons */
        .btn-notion {
          background: white; color: black; border: none; padding: 10px 20px;
          border-radius: 99px; font-weight: 700; font-size: 12px;
          display: flex; align-items: center; gap: 8px; cursor: pointer;
          transition: 0.3s;
        }
        .btn-notion:hover { transform: scale(1.05); background: #f0f0f0; }

        /* ProgressBar */
        .progress-container { height: 6px; background: rgba(255,255,255,0.05); border-radius: 10px; margin-top: 10px; }
        .progress-bar { height: 100%; border-radius: 10px; background: var(--accent); }

        /* Badges */
        .badge { padding: 4px 10px; border-radius: 6px; font-size: 10px; font-weight: 700; }
        .badge-green { background: rgba(16, 185, 129, 0.1); color: var(--green); }
      `}</style>

      {/* --- SIDEBAR --- */}
      <aside className="sidebar">
        <div className="logo">
          <Icons.Zap /> Ape Intelligence
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {['Overview', 'Daily Ventures', 'Trading Lab', 'System Settings'].map(tab => (
            <div 
              key={tab} 
              className={`nav-item ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'Overview' && <Icons.Target />}
              {tab === 'Daily Ventures' && <Icons.Brain />}
              {tab === 'Trading Lab' && <Icons.Trending />}
              {tab}
            </div>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
          <div style={{ fontSize: '11px', color: '#444', marginBottom: '10px' }}>USER CONTEXT</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)' }} />
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700' }}>Dasotillo</div>
              <div style={{ fontSize: '10px', color: '#666' }}>Lead Architect</div>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN AREA --- */}
      <main className="viewport">
        <header className="top-bar">
          <div>
            <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 800 }}>{activeTab}</h1>
            <p className="text-mute">Welcome back, system is operating at 98% efficiency.</p>
          </div>
          <button className="btn-notion" onClick={handleSyncNotion}>
            <Icons.Notion />
            {syncStatus === 'Idle' ? 'SYNC TO NOTION' : syncStatus.toUpperCase()}
          </button>
        </header>

        <div className="dashboard-grid">
          
          {/* MÓDULO 1: ENTORNO LOCAL (Benicàssim) */}
          <div className="widget" style={{ gridColumn: 'span 3' }}>
            <span className="widget-title">Local Environment</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <Icons.Cloud />
              <div>
                <div className="val-md">17°C</div>
                <div className="text-mute">Benicàssim, ES</div>
              </div>
            </div>
            <div style={{ marginTop: '20px', fontSize: '12px' }}>
               Viento: <span style={{ color: 'white' }}>12 km/h NE</span> <br/>
               {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
          </div>

          {/* MÓDULO 2: TRADING INDICATOR (Trend Signal) */}
          <div className="widget" style={{ gridColumn: 'span 5' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="widget-title">Trend Signal V2.1</span>
                <div className="val-lg" style={{ color: 'var(--green)' }}>STRONG BUY</div>
              </div>
              <div className="badge badge-green">LIVE FEED</div>
            </div>
            <div style={{ marginTop: '15px' }} className="text-mute">
              Confidence Index: <span style={{ color: 'white' }}>92.4%</span> | Risk: <span style={{ color: '#f59e0b' }}>Low</span>
            </div>
            <div className="progress-container">
              <div className="progress-bar" style={{ width: '92%', background: 'var(--green)' }}></div>
            </div>
          </div>

          {/* MÓDULO 3: DAILY VENTURES (Cash Rápido) */}
          <div className="widget" style={{ gridColumn: 'span 4' }}>
            <span className="widget-title">Daily Ventures (AI Analysis)</span>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '12px', fontSize: '13px', display: 'flex', gap: '10px' }}>
                <span style={{ color: 'var(--purple)' }}>#1</span> Automatización de Logística Local
              </li>
              <li style={{ marginBottom: '12px', fontSize: '13px', display: 'flex', gap: '10px' }}>
                <span style={{ color: 'var(--purple)' }}>#2</span> Arbitraje de APIs de IA (LatAm)
              </li>
              <li style={{ fontSize: '13px', display: 'flex', gap: '10px' }}>
                <span style={{ color: 'var(--purple)' }}>#3</span> Optimización de Stock Químico
              </li>
            </ul>
          </div>

          {/* MÓDULO 4: PROYECTOS CRÍTICOS (Control de Proyectos) */}
          <div className="widget" style={{ gridColumn: 'span 8', minHeight: '300px' }}>
            <span className="widget-title">Critical Project Pipeline</span>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '15px 0', fontSize: '12px', color: '#444' }}>PROJECT NAME</th>
                  <th style={{ padding: '15px 0', fontSize: '12px', color: '#444' }}>STATUS</th>
                  <th style={{ padding: '15px 0', fontSize: '12px', color: '#444' }}>PROGRESS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '20px 0', fontSize: '14px', fontWeight: 600 }}>ClawBot V2 Core</td>
                  <td><span className="badge badge-green">STABLE</span></td>
                  <td style={{ width: '200px' }}>
                    <div className="progress-container"><div className="progress-bar" style={{ width: '85%' }}></div></div>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '20px 0', fontSize: '14px', fontWeight: 600 }}>Notion Bridge API</td>
                  <td><span className="badge" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>ACTIVE</span></td>
                  <td>
                    <div className="progress-container"><div className="progress-bar" style={{ width: '60%', background: '#3b82f6' }}></div></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* MÓDULO 5: COMUNICACIÓN DIRECTA (Brain Console) */}
          <div className="widget" style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column' }}>
            <span className="widget-title">Ape Brain Console</span>
            <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', borderRadius: '15px', padding: '15px', fontFamily: 'monospace', fontSize: '12px', color: '#10b981' }}>
              &gt; Dashboard V2.0 initialized.<br/>
              &gt; Weather API: Connected.<br/>
              &gt; Trading Node: Online.<br/>
              &gt; _
            </div>
            <input 
              type="text" 
              placeholder="Send command to AI..." 
              style={{ 
                marginTop: '15px', background: 'var(--border)', border: 'none', 
                padding: '12px 20px', borderRadius: '12px', color: 'white', fontSize: '13px'
              }} 
            />
          </div>

        </div>
      </main>
    </div>
  );
}
