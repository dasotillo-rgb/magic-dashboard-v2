'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LineChart } from 'lucide-react';
import TradingViewWidget from '@/components/trading-lab/TradingViewWidget';
import TrendSignalScanner from '@/components/trading-lab/TrendSignalScanner';

export default function TradingLabPage() {
  return (
    <motion.main
      className="p-6 lg:p-10 h-full flex flex-col max-w-[1800px] mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <header className="mb-8 flex-shrink-0">
        <h1 className="text-4xl font-black flex items-center gap-3 text-white tracking-tight">
          <LineChart size={36} className="text-[#00FF41]" />
          Trading Lab
        </h1>
        <p className="text-gray-400 mt-1 ml-12">Análisis y ejecución de estrategias PIONEX en tiempo real.</p>
      </header>

      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        <div className="col-span-12 lg:col-span-8 h-[500px] lg:h-auto">
          <TradingViewWidget />
        </div>
        <div className="col-span-12 lg:col-span-4 h-[300px] lg:h-auto">
          <TrendSignalScanner />
        </div>
      </div>
    </motion.main>
  );
}
