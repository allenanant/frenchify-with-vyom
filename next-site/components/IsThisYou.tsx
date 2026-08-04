'use client';

import { motion } from 'framer-motion';
import { GraduationCap, TrendingUp, Clock, CalendarClock } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import { useRevealFailsafe } from '@/components/motion/useRevealFailsafe';

type Card = {
  Icon: typeof Clock;
  title: string;
  copy: string;
  iconBg: string;
  iconFg: string;
};

const cards: Card[] = [
  {
    Icon: GraduationCap,
    title: 'On a study or work permit',
    copy: 'You came here to build a life, not just wait out a visa.',
    iconBg: 'bg-[#DBEAFE]',
    iconFg: 'text-[#1D4ED8]',
  },
  {
    Icon: TrendingUp,
    title: 'CRS score not quite there',
    copy: "You've got the education and experience. French is the missing points.",
    iconBg: 'bg-[#FDE9C4]',
    iconFg: 'text-[#B45309]',
  },
  {
    Icon: Clock,
    title: 'Working full time',
    copy: "You don't have hours to spare, let alone years.",
    iconBg: 'bg-[#D5EFD8]',
    iconFg: 'text-[#15803D]',
  },
  {
    Icon: CalendarClock,
    title: 'Need a schedule that bends',
    copy: 'Classes should fit your shift, not the other way around.',
    iconBg: 'bg-[#E3DDFB]',
    iconFg: 'text-[#6D28D9]',
  },
];

export default function IsThisYou({
  className = 'bg-white',
}: {
  className?: string;
}) {
  const forced = useRevealFailsafe();

  return (
    <section className={`relative py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-[1120px] px-5 md:px-10">
        <Reveal>
          <div className="text-center">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#2667FF]">
              Is this you?
            </span>
            <h2 className="mx-auto mt-4 max-w-[720px] font-display text-[30px] md:text-[42px] font-bold text-[#111827] tracking-[-0.03em] leading-[1.12]">
              You didn&apos;t come this far to get stuck on your CRS score
            </h2>
            <p className="mx-auto mt-4 max-w-[600px] text-[15px] md:text-[17px] leading-[1.6] text-[#4b5563]">
              If any of this sounds familiar, you&apos;re exactly who Frenchify was built
              for.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              animate={forced ? { opacity: 1, y: 0 } : undefined}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.55,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group h-full rounded-3xl border border-[#e5e7eb] bg-white p-7 hover:border-[#dbeafe] hover:shadow-[0_28px_54px_-32px_rgba(37,99,235,0.35)] transition-all duration-500"
            >
              <div
                className={`inline-grid h-12 w-12 place-items-center rounded-2xl ${c.iconBg} ${c.iconFg}`}
              >
                <c.Icon className="h-5 w-5" strokeWidth={2.2} />
              </div>
              <h3 className="mt-6 font-display text-[17px] font-bold tracking-[-0.01em] text-[#111827]">
                {c.title}
              </h3>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-[#4b5563]">{c.copy}</p>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-12 text-center font-display text-[17px] md:text-[19px] font-bold text-[#111827]">
            That&apos;s exactly why Frenchify exists.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
