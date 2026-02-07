"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  MessageSquare, 
  Briefcase, 
  Settings, 
  Zap, 
  Menu, 
  X, 
  Search, 
  Bell, 
  ExternalLink, 
  ArrowUpRight, 
  ArrowDownRight, 
  Cpu, 
  Eye, 
  EyeOff, 
  Globe,
  Send,
  Loader2,
  CloudSun
} from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// --- CONFIGURACIÓN DE APIS ---
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export default function ApeOSV4() {
  // --- ESTADOS GLOBALES ---
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [language, setLanguage] = useState('en');
  
  // --- ESTADOS DE DATOS ---
  const [cryptoData, setCryptoData] = useState<any>(null);
  const [weather, setWeather] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<{role: string, text: string}[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // --- FETCHING DE DATOS REALES ---
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true');
        const data = await res.json();
        setCryptoData(data);
      } catch (e) { console.error("Error fetching crypto", e); }
    };

    const fetchWeather = async () => {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=40.41&longitude=-3.70&current_weather=true');
        const data = await res.json();
        setWeather(data.current_weather);
      } catch (e) { console.error("Error fetching weather", e); }
    };

    fetchMarketData();
    fetchWeather();
    const interval = setInterval(fetchMarketData, 30000); // Refrescar cada 30s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // --- LÓGICA DE CHAT (GEMINI) ---
  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    const userMsg = { role: 'user', text: userInput };
    setChatMessages(prev => [...prev, userMsg]);
    setUserInput("");
    setIsTyping(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(userInput);
      const response = await result.response;
      setChatMessages(prev => [...prev, { role: 'bot', text: response.text() }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'bot', text: "Error connecting to ApeBrain. Check API Key." }]);
    } finally {
      setIsTyping(false);
    }
  };

  // --- MÁSCARA DE PRIVACIDAD ---
  const mask = (val: string) => privacyMode ? "••••••" : val;

  // --- COMPONENTES DE VISTA ---
  const SidebarItem = ({ id, icon: Icon, label }: any) => (
    <button 
      onClick={() => { setActiveTab(id); setIsMobileMenuOpen(false); }}
      className={`sidebar-item ${activeTab === id ? 'active' : ''}`}
    >
      <Icon size={22} />
      {isSidebarExpanded && <span className="ml-4 font-medium">{label}</span>}
    </button>
  );

  return (
    <div className="ape-container">
      {/* SIDEBAR */}
      <aside className={`sidebar ${isSidebarExpanded ? 'expanded' : 'collapsed'} ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <Zap className="text-yellow-400 fill-yellow-400" size={28} />
            {isSidebarExpanded && <span className="brand-text">APE <span className="text-white/50">Intelligence</span></span>}
          </div>
          <button onClick={() => setIsSidebarExpanded(!isSidebarExpanded)} className="collapse-btn">
            {isSidebarExpanded ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          <SidebarItem id="overview" icon={LayoutDashboard} label={language === 'en' ? 'Overview' : 'Resumen'} />
          <SidebarItem id="trading" icon={TrendingUp} label="Trading Lab" />
          <SidebarItem id="chat" icon={MessageSquare} label="Brain Chat" />
          <SidebarItem id="projects" icon={Briefcase} label={language === 'en' ? 'Projects' : 'Proyectos'} />
          <SidebarItem id="settings" icon={Settings} label={language === 'en' ? 'Settings' : 'Ajustes'} />
        </nav>

        <div className="sidebar-footer">
          <div className="user-badge">
            <div className="avatar">AD</div>
            {isSidebarExpanded && <div className="user-info"><span>Lead Dev</span><small>Online</small></div>}
          </div>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="main-content">
        {/* TOP BAR */}
        <header className="top-bar">
          <div className="search-bar">
            <Search size={18} className="text-gray-400" />
            <input type="text" placeholder="Search systems..." />
          </div>
          <div className="top-actions">
            {weather && (
              <div className="weather-widget">
                <CloudSun size={18} className="text-blue-400" />
                <span>{weather.temperature}°C</span>
              </div>
            )}
            <div className="notifications"><Bell size={20} /> <span className="dot"></span></div>
          </div>
        </header>

        {/* CONTENIDO DINÁMICO */}
        <section className="view-container">
          {activeTab === 'overview' && (
            <div className="fade-in">
              <h1 className="view-title">Command Center</h1>
              <div className="grid-overview">
                <div className="widget card-gradient-blue">
                  <div className="widget-header"><span>Total Value</span><Cpu size={16} /></div>
                  <div className="widget-value">{mask("$128,430.22")}</div>
                  <div className="widget-footer text-green-400">+12.5% <ArrowUpRight size={14} /></div>
                </div>
                <div className="widget card-gradient-purple">
                  <div className="widget-header"><span>Active Nodes</span><Globe size={16} /></div>
                  <div className="widget-value">42</div>
                  <div className="widget-footer text-blue-300">Global Syncing</div>
                </div>
                {/* News Widget Integrado */}
                <div className="widget card-dark col-span-2">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Live Transmission</h3>
                  <div className="news-feed">
                    <div className="news-item">
                      <span className="news-tag">URGENT</span>
                      <p>Bitcoin ETFs see record inflows in Tokyo sessions.</p>
                    </div>
                    <div className="news-item">
                      <span className="news-tag blue">TECH</span>
                      <p>Gemini 1.5 Pro integration complete in ApeOS V4 core.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'trading' && (
            <div className="fade-in">
              <h1 className="view-title">Trading Lab</h1>
              <div className="crypto-grid">
                {cryptoData ? Object.keys(cryptoData).map(coin => (
                  <div key={coin} className="crypto-card">
                    <div className="flex justify-between items-center mb-4">
                      <span className="uppercase font-bold text-lg">{coin}</span>
                      <span className={cryptoData[coin].usd_24h_change >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {cryptoData[coin].usd_24h_change.toFixed(2)}%
                      </span>
                    </div>
                    <div className="text-2xl font-mono mb-6">${mask(cryptoData[coin].usd.toLocaleString())}</div>
                    <button 
                      onClick={() => console.log(`Iniciando orden para ${coin}`)}
                      className="buy-btn"
                    >
                      Execute Swap
                    </button>
                  </div>
                )) : <Loader2 className="animate-spin" />}
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="chat-container">
              <div className="chat-messages">
                {chatMessages.length === 0 && (
                  <div className="chat-welcome">
                    <Zap size={40} className="text-yellow-500 mb-4" />
                    <h2>ApeBrain Assistant</h2>
                    <p>Ready to process your commands. How can I assist today?</p>
                  </div>
                )}
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`message-bubble ${msg.role}`}>
                    {msg.text}
                  </div>
                ))}
                {isTyping && <div className="message-bubble bot animate-pulse">Thinking...</div>}
                <div ref={chatEndRef} />
              </div>
              <div className="chat-input-area">
                <input 
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask ApeBrain..."
                />
                <button onClick={handleSendMessage}><Send size={20} /></button>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="fade-in grid md:grid-cols-2 gap-6">
              <div className="project-column">
                <h3 className="section-subtitle">Active Builds</h3>
                <div className="project-card">
                  <div className="flex justify-between mb-2"><span>Neural Bridge</span><span>85%</span></div>
                  <div className="progress-bar"><div className="progress-fill" style={{width: '85%'}}></div></div>
                </div>
                <div className="project-card">
                  <div className="flex justify-between mb-2"><span>DeFi Aggregator</span><span>40%</span></div>
                  <div className="progress-bar"><div className="progress-fill" style={{width: '40%'}}></div></div>
                </div>
              </div>
              <div className="project-column">
                <h3 className="section-subtitle">Viable / Backlog</h3>
                <ul className="backlog-list">
                  <li><span>•</span> Auto-Tax Harvester</li>
                  <li><span>•</span> DAO Voting Mobile App</li>
                  <li><span>•</span> Multi-chain Indexer</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="fade-in max-w-xl">
              <h1 className="view-title">System Settings</h1>
              <div className="settings-stack">
                <div className="setting-row">
                  <div>
                    <label className="block font-bold">Language / Idioma</label>
                    <small className="text-gray-400">Set your preferred UI language.</small>
                  </div>
                  <select 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)}
                    className="settings-input"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </select>
                </div>
                <div className="setting-row">
                  <div>
                    <label className="block font-bold">Privacy Mode</label>
                    <small className="text-gray-400">Mask sensitive financial balances.</small>
                  </div>
                  <button 
                    onClick={() => setPrivacyMode(!privacyMode)}
                    className={`toggle-btn ${privacyMode ? 'active' : ''}`}
                  >
                    {privacyMode ? <EyeOff size={18} /> : <Eye size={18} />}
                    {privacyMode ? 'Hidden' : 'Visible'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* WATERMARK */}
      <div className="magic-watermark">Magic Dashboard</div>

      {/* STYLED JSX */}
      <style jsx global>{`
        :root {
          --bg: #0a0a0c;
          --sidebar: #111114;
          --accent: #3b82f6;
          --card: #16161a;
          --text: #ffffff;
        }

        body {
          background: var(--bg);
          color: var(--text);
          margin: 0;
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
        }

        .ape-container {
          display: flex;
          height: 100vh;
          width: 100vw;
        }

        /* Sidebar Styling */
        .sidebar {
          background: var(--sidebar);
          border-right: 1px solid #222;
          display: flex;
          flex-direction: column;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 100;
        }

        .sidebar.expanded { width: 260px; }
        .sidebar.collapsed { width: 80px; }

        .sidebar-header {
          padding: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 800;
          letter-spacing: -0.5px;
          font-size: 1.2rem;
        }

        .sidebar-nav {
          flex: 1;
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .sidebar-item {
          display: flex;
          align-items: center;
          padding: 12px;
          border-radius: 12px;
          color: #888;
          transition: 0.2s;
          cursor: pointer;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
        }

        .sidebar-item:hover, .sidebar-item.active {
          background: #1e1e24;
          color: #fff;
        }

        .sidebar-item.active {
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          border-left: 3px solid var(--accent);
        }

        /* Main Content */
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100vh;
          overflow-y: auto;
          position: relative;
        }

        .top-bar {
          height: 70px;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #1a1a1e;
          position: sticky;
          top: 0;
          background: rgba(10, 10, 12, 0.8);
          backdrop-filter: blur(10px);
          z-index: 50;
        }

        .search-bar {
          background: #16161a;
          padding: 8px 16px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
          width: 300px;
        }

        .search-bar input {
          background: transparent;
          border: none;
          color: white;
          outline: none;
          width: 100%;
        }

        .view-container {
          padding: 40px;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
        }

        /* Widgets */
        .grid-overview {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
        }

        .widget {
          padding: 24px;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 160px;
        }

        .card-gradient-blue { background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%); }
        .card-gradient-purple { background: linear-gradient(135deg, #4c1d95 0%, #5b21b6 100%); }
        .card-dark { background: #16161a; border: 1px solid #222; }

        .widget-value {
          font-size: 1.8rem;
          font-weight: 700;
          margin: 10px 0;
        }

        /* Trading Lab */
        .crypto-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .crypto-card {
          background: #16161a;
          border: 1px solid #222;
          padding: 24px;
          border-radius: 20px;
          transition: 0.3s;
        }

        .crypto-card:hover { border-color: var(--accent); transform: translateY(-5px); }

        .buy-btn {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          background: var(--accent);
          border: none;
          color: white;
          font-weight: 600;
          cursor: pointer;
        }

        /* Brain Chat */
        .chat-container {
          height: calc(100vh - 200px);
          display: flex;
          flex-direction: column;
          background: #111114;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid #222;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .message-bubble {
          max-width: 80%;
          padding: 14px 20px;
          border-radius: 18px;
          line-height: 1.5;
        }

        .message-bubble.user {
          align-self: flex-end;
          background: var(--accent);
          color: white;
          border-bottom-right-radius: 4px;
        }

        .message-bubble.bot {
          align-self: flex-start;
          background: #222;
          color: #eee;
          border-bottom-left-radius: 4px;
        }

        .chat-input-area {
          padding: 20px;
          background: #16161a;
          display: flex;
          gap: 12px;
        }

        .chat-input-area input {
          flex: 1;
          background: #0a0a0c;
          border: 1px solid #333;
          border-radius: 12px;
          padding: 12px 20px;
          color: white;
          outline: none;
        }

        /* Projects */
        .project-card {
          background: #16161a;
          padding: 20px;
          border-radius: 15px;
          margin-bottom: 15px;
        }

        .progress-bar {
          height: 8px;
          background: #222;
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: var(--accent);
          transition: width 1s ease-in-out;
        }

        /* Settings */
        .setting-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background: #16161a;
          border-radius: 16px;
          margin-bottom: 12px;
        }

        .settings-input {
          background: #0a0a0c;
          border: 1px solid #333;
          color: white;
          padding: 8px 12px;
          border-radius: 8px;
        }

        .toggle-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 10px;
          border: 1px solid #333;
          background: #0a0a0c;
          color: white;
          cursor: pointer;
        }

        .toggle-btn.active { background: #3b82f622; border-color: var(--accent); }

        /* Branding & Mobile */
        .magic-watermark {
          position: fixed;
          bottom: 20px;
          right: 20px;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.05);
          pointer-events: none;
          z-index: 1000;
        }

        .top-actions { display: flex; align-items: center; gap: 20px; }
        .weather-widget { display: flex; align-items: center; gap: 8px; background: #16161a; padding: 6px 12px; border-radius: 20px; font-size: 14px; }

        @media (max-width: 768px) {
          .ape-container { flex-direction: column; }
          .sidebar {
            width: 100% !important;
            height: auto;
            position: fixed;
            bottom: 0;
            flex-direction: row;
            border-right: none;
            border-top: 1px solid #222;
            padding: 5px;
          }
          .sidebar-header, .sidebar-footer { display: none; }
          .sidebar-nav { flex-direction: row; justify-content: space-around; width: 100%; }
          .sidebar-item { flex-direction: column; gap: 4px; font-size: 10px; align-items: center; }
          .main-content { padding-bottom: 80px; }
          .top-bar { padding: 0 20px; }
          .view-container { padding: 20px; }
        }

        .fade-in {
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
