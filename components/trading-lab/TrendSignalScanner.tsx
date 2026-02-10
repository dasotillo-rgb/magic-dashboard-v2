'use client';
import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

interface Signal {
  direction: string;
  score: number;
  price: number;
}

const TrendSignalScanner = () => {
  const [latestSignal, setLatestSignal] = useState<Signal | null>(null);

  useEffect(() => {
    const fetchSignal = async () => {
      // AQUÍ USAREMOS LA FUNCIÓN MANUAL getPionexMarketData EN EL FUTURO
      // Por ahora, simulamos la conexión para que no rompa el build
      const mockPrice = 64230.50 + (Math.random() * 100);
      
      setLatestSignal({
        direction: Math.random() > 0.5 ? 'STRONG BUY' : 'NEUTRAL',
        score: 88,
        price: mockPrice
      });
    };
    
    fetchSignal();
    const interval = setInterval(fetchSignal, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-6 h-full flex flex-col min-h-[400px]">
       <div className="flex items-center gap-2 mb-6">
          <Zap className="w-5 h-5 text-[#00FF41]" />
          <h2 className="text-sm font-bold text-white/60 uppercase tracking-widest">Trend Signal Scanner</h2>
       </div>
       <div className="flex-1 flex flex-col items-center justify-center text-center">
          {latestSignal ? (
              <>
                <div className="text-4xl font-black mb-2 tracking-tighter text-[#00FF41] drop-shadow-lg">
                    {latestSignal.direction}
                </div>
                <div className="text-sm text-white/40 font-mono">
                    Score: {latestSignal.score}/100 • ${latestSignal.price.toFixed(2)}
                </div>
              </>
          ) : (
              <div className="text-white/20 animate-pulse">Scanning Pionex Markets...</div>
          )}
       </div>
    </div>
  );
};

export default TrendSignalScanner;
