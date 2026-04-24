'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  allowMultiple?: boolean;
}

export default function FaqAccordion({ items, allowMultiple = false }: FaqAccordionProps) {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set());

  const toggle = (idx: number) => {
    setOpenSet((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div className="space-y-4">
      {items.map((item, idx) => {
        const open = openSet.has(idx);
        return (
          <div
            key={idx}
            data-open={open}
            className="faq-item"
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              aria-expanded={open}
              className="w-full p-6 cursor-pointer flex justify-between items-center gap-4 text-left"
            >
              <span className="text-lg font-semibold text-gray-900">{item.q}</span>
              <motion.span
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                className="shrink-0 w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center"
              >
                {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-gray-50/60 overflow-hidden"
                >
                  <div className="p-6 pt-2 text-gray-600 leading-relaxed">{item.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
