'use client';

import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export interface PathOption {
  emoji: string;
  label: string;
  steps: ReactNode[];
}

interface PathTabsProps {
  options: PathOption[];
}

export default function PathTabs({ options }: PathTabsProps) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {options.map((opt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActive(idx)}
            aria-pressed={active === idx}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 border ${
              active === idx
                ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
                : 'bg-white border-gray-200 text-gray-700 hover:border-brand-blue/50 hover:-translate-y-0.5'
            }`}
          >
            <span aria-hidden>{opt.emoji}</span>
            {opt.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="premium-card bg-white rounded-2xl border border-gray-200 shadow-lg p-6 md:p-8"
        >
          <ol className="space-y-4">
            {options[active].steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="shrink-0 w-8 h-8 rounded-full bg-brand-blue text-white text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-gray-700 leading-relaxed pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
