'use client';
import React, { useEffect, useRef, memo } from 'react';

const TradingViewWidget: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current && !container.current.querySelector('script')) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      script.onload = () => {
        if ((window as any).TradingView) {
          new (window as any).TradingView.widget({
            "width": "100%",
            "height": 600,
            "symbol": "PIONEX:BTCUSDT", 
            "interval": "D",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "en",
            "enable_publishing": false,
            "hide_side_toolbar": true,
            "allow_symbol_change": true,
            "container_id": "tradingview-widget-container"
          });
        }
      };
      container.current.appendChild(script);
    }
  }, []);

  return (
    <div className="relative h-[600px] w-full border border-white/10 rounded-2xl overflow-hidden bg-[#0A0A0A]">
      <div id="tradingview-widget-container" ref={container} className="h-full w-full" />
      <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur border border-white/10 text-[#00FF41] text-xs px-3 py-1.5 rounded-full font-mono z-10 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#00FF41] animate-pulse"></span>
        Data Source: Pionex API (Execution Layer)
      </div>
    </div>
  );
};

export default memo(TradingViewWidget);
