'use client';
import React, { useState, useEffect } from 'react';

// --- ESTILOS VISUALES (CSS PURO) ---
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800&display=swap');
  
  * { box-sizing: border-box; }
  body { margin: 0; background-color: #000; color: #fff; font-family: 'Inter', sans-serif; overflow: hidden; }
  
  /* Layout Estructural */
  .layout { display: flex; height: 100vh; width: 100vw; background: #000; }
  
  /* Sidebar Premium */
  .sidebar {
    width: 260px;
    background-color: #050505;
    border-right: 1px solid #1A1A1A;
    display: flex; flex-direction: column;
    padding: 30px 20px;
    flex-shrink: 0;
  }
  
  .brand { display: flex; align-items: center; gap: 12px; margin-bottom: 50px; }
  .brand-icon { 
    width: 36px; height: 36px; 
    background: linear-gradient(135deg, #2563eb, #7c3aed); 
    border-radius: 8px; display: flex; align-items: center; justify-content: center;
    box-shadow: 0 0 15px rgba(37, 99, 235, 0.4);
  }
  .brand-text { font-size: 14px; font-weight: 800; letter-spacing: 0.5px; color: #fff; }
  
  .nav-item {
    padding: 14px 16px; margin-bottom: 6px;
    border-radius: 10px; font-size: 13px; font-weight: 600; color: #666;
    cursor: pointer; transition: all 0.2s ease;
    display: flex; align-items: center; gap: 12px;
  }
  .nav-item:hover { background-color: #111; color: #fff; }
  .nav-item.active { background-color: #151515; color: #fff; border: 1px solid #222; }

  /* Área Principal */
  .main { 
    flex: 1; 
    padding: 50px 60px; 
    overflow-y: auto; 
    background: radial-gradient(circle at 80% 0%, #111 0%, #000 60%);
  }
  
  .header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 50px; }
  .page-title { font-size: 32px; font-weight: 800; letter-spacing: -1px; margin: 0; }
  
  /* GRID ROBUSTO (Evita solapamientos) */
  .grid { 
    display: grid; 
    grid-template-columns: repeat(3, 1fr); 
    gap: 24px; 
    width: 100%;
  }
  
  /* Tarjetas (Widgets) */
  .card {
    background-color: #080808;
    border: 1px solid #1A1A1A;
    border-radius: 20px;
    padding: 24px;
    display: flex; flex-direction: column; justify-content: space-between;
    min-height: 160px;
    position: relative;
    overflow: hidden; /* CLAVE: Evita que el texto se salga */
    transition: transform 0.2s, border-color 0.2s;
  }
  .card:hover { border-color: #333; transform: translateY(-3px); }
  
  .card-label { 
    font-size: 10px; font-weight: 700; text-transform: uppercase; 
    letter-spacing: 1.2px; color: #555; margin-bottom: 12px; display: block;
  }
  
  /* Tipografía ajustada para no chocar */
  .card-value { font-size: 28px; font-weight: 700; letter-spacing: -0.5px; color: #fff; white-space: nowrap; }
  .card-sub { font-size: 13px; color: #666; margin-top: 8px; font-weight: 500; }
  
  /* Colores Específicos */
  .text-neon { color: #39FF14; text-shadow: 0 0 10px rgba(57,255,20,0.3); }
  .text-blue { color: #3B82F6; }
  .text-purple { color: #A855F7; }

  /* Botón Notion */
  .btn-notion {
    background: #fff; color: #000; border: none; padding: 12px 20px;
    border-radius: 8px; font-weight: 700; font-size: 12px; cursor: pointer;
    margin-top: 20px; width: fit-content;
  }
  .btn-notion:hover { background: #e5e5e5; }
`;

// --- ICONOS SVG (Simple & Tech) ---
const Icons = {
  Bolt: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  Brain: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04Z"/></svg>
};

export default function MagicOS() {
  const [activeTab, setActiveTab] = useState('Command Center');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="layout">
      <style jsx global>{styles}</style>

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon"><Icons.Bolt /></div>
          <span className="brand-text" style={{ marginLeft: '12px' }}>APE INTELLIGENCE</span>
        </div>
        
        <nav style={{ flex: 1 }}>
          {['Command Center', 'Trading Lab', 'AI Proposals', 'Settings'].map(item => (
            <div 
              key={item} 
              className={`nav-item ${activeTab === item ? 'active' : ''}`}
              onClick={() => setActiveTab(item)}
            >
              {item}
            </div>
          ))}
        </nav>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '10px', background: '#0F0F0F', borderRadius: '8px', border: '1px solid #1A1A1A' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#333', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>DS</div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: '700' }}>Dasotillo</div>
            <div style={{ fontSize: '10px', color: '#555' }}>PRO USER</div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main">
        <header className="header">
          <div>
            <h1 className="page-title">Magic Dashboard</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
              <div style={{ width: '6px', height: '6px', background: '#39FF14', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '12px', color: '#666' }}>System Operational • Benicàssim</span>
            </div>
          </div>
        </header>

        {activeTab === 'Command Center' && (
          <div className="grid">
            
            {/* Widget 1: Trading (Sin solapamientos) */}
            <div className="card">
              <span className="card-label">Trend Signal V1</span>
              <div>
                <div className="card-value text-neon">LONG_ENTRY</div>
                <div className="card-sub">Confidence: 94%</div>
              </div>
            </div>

            {/* Widget 2: Environment */}
            <div className="card">
              <span className="card-label text-blue">Environment</span>
              <div>
                <div className="card-value">17°C</div>
                <div className="card-sub">Wind: 10km/h SE</div>
              </div>
            </div>

            {/* Widget 3: Cash Flow */}
            <div className="card">
              <span className="card-label text-purple">Daily Profit</span>
              <div>
                <div className="card-value">+$2.50</div>
                <div className="card-sub">Target: $50.00</div>
              </div>
            </div>

            {/* Widget 4: AI STRATEGY (Estilo Captura mejorado) */}
            <div className="card" style={{ gridColumn: 'span 2', background: 'linear-gradient(135deg, #1e1e2e, #13131a)', border: '1px solid #2d2d3d' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                     <span className="text-purple"><Icons.Brain /></span>
                     <span className="card-label" style={{ marginBottom: 0, color: '#A855F7' }}>GEMINI BUSINESS PROPOSAL</span>
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 10px 0' }}>Micro-SaaS Logístico</h3>
                  <p style={{ color: '#999', fontSize: '14px', lineHeight: '1.5', maxWidth: '500px', margin: 0 }}>
                    Analizando ineficiencias en el sector químico regional para Benicàssim. Propuesta lista para revisión.
                  </p>
                </div>
              </div>
              <button className="btn-notion">SYNC TO NOTION</button>
            </div>

            {/* Widget 5: Terminal */}
            <div className="card">
              <span className="card-label">Ape Terminal</span>
              <div style={{ flex: 1, color: '#444', fontFamily: 'monospace', fontSize: '12px', paddingTop: '10px' }}>
                &gt; System initialized...<br/>
                &gt; Monitoring active.<br/>
                <span className="text-neon">&gt;_</span>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
