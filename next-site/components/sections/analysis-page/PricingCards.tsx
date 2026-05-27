'use client';

import { useState } from 'react';
import { CheckCircle2, Clock, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Stagger from '@/components/motion/Stagger';
import Tilt from '@/components/motion/Tilt';

type PricingCard = {
  id: string;
  subtitle: string;
  title: string;
  price: string;
  headerGradient: string;
  borderClass: string;
  popular?: boolean;
  items: { Icon: typeof CheckCircle2; text: string }[];
};

const cards: PricingCard[] = [
  {
    id: 'a1-details',
    subtitle: 'To begin with A2',
    title: 'A1 Test',
    price: '$20',
    headerGradient: 'from-blue-500 to-blue-600',
    borderClass: 'border border-gray-100',
    items: [
      { Icon: CheckCircle2, text: '2 Grammar Tests' },
      { Icon: CheckCircle2, text: '1 Vocabulary Test' },
      { Icon: Clock, text: 'Results in 1-3 Business Days' },
    ],
  },
  {
    id: 'a2-details',
    subtitle: 'To begin with B1',
    title: 'A2 Test',
    price: '$25',
    headerGradient: 'from-blue-600 to-indigo-600',
    borderClass: 'border-2 border-blue-500',
    popular: true,
    items: [
      { Icon: CheckCircle2, text: '2 On Spot Speaking Video Submissions' },
      { Icon: CheckCircle2, text: 'Reading Test' },
      { Icon: CheckCircle2, text: 'Listening Test' },
      { Icon: CheckCircle2, text: 'Grammar Test' },
      { Icon: Clock, text: 'Results in 1-3 Business Days' },
    ],
  },
  {
    id: 'b1-details',
    subtitle: 'To begin with B2',
    title: 'B1 Test',
    price: '$35',
    headerGradient: 'from-indigo-600 to-purple-600',
    borderClass: 'border border-gray-100',
    items: [
      { Icon: CheckCircle2, text: '25 mins Live On Spot Section A + B Speaking Test' },
      { Icon: CheckCircle2, text: '2 Listening Exam-Style Mock Tests (from outside portal)' },
      { Icon: CheckCircle2, text: '2 Reading Exam-Style Mock Tests (from outside portal)' },
      { Icon: Clock, text: 'Results in 1-3 Business Days' },
    ],
  },
];

export default function PricingCards() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <Stagger className="grid md:grid-cols-3 gap-6 mb-10">
      {cards.map((card) => {
        const open = openId === card.id;
        return (
          <Tilt key={card.id} max={5}>
            <div
              className={`bg-white rounded-2xl shadow-lg ${card.borderClass} overflow-hidden relative h-full`}
            >
              {card.popular && (
                <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-bl-lg">
                  POPULAR
                </div>
              )}
              <div
                className={`bg-gradient-to-r ${card.headerGradient} p-6 text-white text-center`}
              >
                <span className="text-sm font-medium opacity-90">{card.subtitle}</span>
                <h3 className="font-display text-2xl font-bold mt-1 tracking-tight">{card.title}</h3>
              </div>
              <div className="p-6">
                <div className="text-center mb-6">
                  <span className="text-4xl font-extrabold text-gray-900">{card.price}</span>
                  <span className="text-gray-500 text-sm ml-1">CAD</span>
                </div>
                <button
                  type="button"
                  onClick={() => toggle(card.id)}
                  className="w-full flex items-center justify-center gap-2 text-blue-600 font-medium py-3 border border-blue-200 rounded-xl hover:bg-blue-50 transition-all"
                >
                  <span>Click to Know More</span>
                  <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden text-gray-600"
                    >
                      <ul className="space-y-3 pt-4">
                        {card.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <item.Icon
                              className={`${
                                item.Icon === Clock ? 'text-blue-500' : 'text-green-500'
                              } w-5 h-5 mt-1 flex-shrink-0`}
                            />
                            <span>{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Tilt>
        );
      })}
    </Stagger>
  );
}
