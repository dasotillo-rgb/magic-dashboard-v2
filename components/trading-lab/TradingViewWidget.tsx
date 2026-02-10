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
            "height": "100%",
            "symbol": "PIONEX:BTCUSDT", 
            "interval": "D",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "en",
            "enable_publishing": false,
            "hide_side_toolbar": true,
            "allow_symbol_change": true,
            "container_id": "tradingview-widget-container",
            "backgroundColor": "rgba(10, 10, 10, 1)" // Coincide con el fondo #0A0A0A
          });
        }
      };
      container.current.appendChild(script);
    }
  }, []);

  return (
    <div className="relative h-full w-full border border-white/10 rounded-[2rem] overflow-hidden bg-[#0A0A0A]">
      <div id="tradingview-widget-container" ref={container} className="h-full w-full" />
    </div>
  );
};

export default memo(TradingViewWidget);
