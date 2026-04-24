import Image from 'next/image';
import { CheckCircle2, Star, Lock, ArrowRight, Youtube } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import Tilt from '@/components/motion/Tilt';
import FloatingOrbs from '@/components/motion/FloatingOrbs';

export const metadata = {
  title: 'Book Student Mentorship - Frenchify',
  description:
    'Book practice sessions with successful Frenchify students who have cleared their TEF Canada exam and achieved their PR dreams.',
};

type BadgeVariant = 'cleared-first' | 'cleared-second' | 'top-scorer' | 'years-learning' | 'focus-speaking';

type Session = { label: string; href: string; price: string };

type Mentor = {
  name: string;
  variant: BadgeVariant;
  avatar: { type: 'initials'; text: string; bg: string; fg: string } | { type: 'image'; src: string; alt: string; ring: string };
  certification: string;
  clbScores?: string[];
  youtube?: { href: string; label: string };
  sessions: Session[] | null;
  faded?: boolean;
};

const mentors: Mentor[] = [
  {
    name: 'Rajan Gurjar',
    variant: 'cleared-first',
    avatar: { type: 'initials', text: 'RG', bg: 'bg-blue-100', fg: 'text-brand-blue' },
    certification: 'TEF Certified',
    clbScores: ['CLB 9', 'CLB 11', 'CLB 8', 'CLB 7'],
    sessions: [
      { label: '30 Mins Session', href: 'https://api.leadconnectorhq.com/widget/bookings/rajan-gurjar-30-mins-one-on-on', price: '$11.99' },
      { label: '50 Mins Session', href: 'https://api.leadconnectorhq.com/widget/bookings/rajan-gurjar-30-mins-one-on-onf25esf', price: '$18.99' },
    ],
  },
  {
    name: 'Jay Patel',
    variant: 'cleared-second',
    avatar: {
      type: 'image',
      src: 'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69838b432dd9854d7c0a0a32.jpeg',
      alt: 'Jay Patel',
      ring: 'border-blue-100',
    },
    certification: 'TEF Certified',
    clbScores: ['CLB 8', 'CLB 7', 'CLB 7', 'CLB 8'],
    youtube: { href: 'https://youtu.be/fUiQfeMw3rc?si=xX-Jj6ohN03EHo86', label: 'Video' },
    sessions: [
      { label: '30 Mins Session', href: 'https://api.leadconnectorhq.com/widget/bookings/jay-patel-30-mins-one-on-one-s', price: '$11.99' },
      { label: '50 Mins Session', href: 'https://api.leadconnectorhq.com/widget/bookings/jay-patel-30-mins-one-on-one-sk4yqfp', price: '$18.99' },
    ],
  },
  {
    name: 'Manpreet Kaur',
    variant: 'top-scorer',
    avatar: {
      type: 'image',
      src: 'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6984146e0a7fd162cb612d42.jpeg',
      alt: 'Manpreet Kaur',
      ring: 'border-purple-100',
    },
    certification: 'TEF Certified',
    clbScores: ['CLB 11', 'CLB 12', 'CLB 8', 'CLB 9'],
    sessions: [
      { label: '25 Mins Session', href: 'https://api.leadconnectorhq.com/widget/bookings/30-mins-speaking-manpreet-kaur', price: '$11.99' },
      { label: '50 Mins Session', href: 'https://api.leadconnectorhq.com/widget/bookings/30-mins-speaking-manpreet-kaurbico6u', price: '$18.99' },
    ],
  },
  {
    name: 'Harleen Kaur',
    variant: 'years-learning',
    avatar: { type: 'initials', text: 'HK', bg: 'bg-pink-100', fg: 'text-pink-600' },
    certification: 'TEF Certified - 15 Nov, 2024',
    youtube: { href: 'https://youtu.be/iNMVm32mUrc?si=BTWkpU882M2ZLPkE', label: 'Watch Journey' },
    sessions: [
      { label: '30 Mins Session', href: 'https://api.leadconnectorhq.com/widget/bookings/harleenkaur', price: '$14.99' },
      { label: '45 Mins Session', href: 'https://api.leadconnectorhq.com/widget/bookings/harleen-kaur-50-mins-one-on-on', price: '$19.99' },
    ],
  },
  {
    name: 'Darshan Patel',
    variant: 'focus-speaking',
    avatar: {
      type: 'image',
      src: 'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/698413d10a7fd12de7611393.jpeg',
      alt: 'Darshan Patel',
      ring: 'border-indigo-100',
    },
    certification: 'TEF Certified - 8 Dec, 2024',
    youtube: { href: 'https://youtu.be/mzdvQWqc64M?si=gSG-rzagjYhAbfSQ', label: 'Watch Journey' },
    sessions: [
      { label: '25 Mins Session', href: 'https://api.leadconnectorhq.com/widget/bookings/darshanpatel', price: '$15.99' },
      { label: '50 Mins Session', href: 'https://api.leadconnectorhq.com/widget/bookings/50-mins-speaking-one-on-one-se', price: '$25.99' },
    ],
  },
  {
    name: 'Darshil Ashawa',
    variant: 'cleared-first',
    avatar: { type: 'initials', text: 'DA', bg: 'bg-gray-100', fg: 'text-gray-600' },
    certification: 'TEF Certified',
    clbScores: ['CLB 9', 'CLB 9', 'CLB 7', 'CLB 8'],
    sessions: null,
    faded: true,
  },
  {
    name: 'Appaar S. Bagga',
    variant: 'cleared-first',
    avatar: { type: 'initials', text: 'AB', bg: 'bg-gray-100', fg: 'text-gray-600' },
    certification: 'TEF Certified',
    clbScores: ['CLB 8', 'CLB 10', 'CLB 8', 'CLB 7'],
    youtube: { href: 'https://youtu.be/ZTP1HZTu8k0?si=Lq636Oru9oQWoz3_', label: 'Video' },
    sessions: null,
    faded: true,
  },
];

function Badge({ variant }: { variant: BadgeVariant }) {
  if (variant === 'cleared-first' || variant === 'cleared-second') {
    return (
      <p className="text-sm text-green-600 font-medium mt-1 flex items-center gap-1">
        <CheckCircle2 className="w-3.5 h-3.5" />
        {variant === 'cleared-first' ? 'Cleared in 1st Attempt' : 'Cleared in 2nd Attempt'}
      </p>
    );
  }
  if (variant === 'top-scorer') {
    return (
      <p className="text-sm text-purple-600 font-medium mt-1 flex items-center gap-1">
        <Star className="w-3.5 h-3.5" />
        Top Scorer
      </p>
    );
  }
  if (variant === 'years-learning') {
    return <p className="text-sm text-gray-500 font-medium mt-1">2+ Years Learning</p>;
  }
  return <p className="text-sm text-gray-500 font-medium mt-1">Focus on Speaking</p>;
}

export default function StudentMeetingsCalendarPage() {
  return (
    <>
      <section className="relative py-16 md:py-20 overflow-hidden aurora-bg">
        <FloatingOrbs variant="soft" />
        <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-[1.08] tracking-tight">
                One-on-One <span className="gradient-text">TEF Mentorship</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                Book practice sessions with successful Frenchify students who have cleared their TEF Canada exam and achieved their PR dreams.
              </p>
              <div className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2.5 text-sm font-semibold text-amber-900 border-amber-200/60">
                <Lock className="w-4 h-4 text-brand-amber" />
                Exclusive for Frenchify Students Only
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 relative">
        <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8">
          <Stagger className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {mentors.map((m) => (
              <Tilt key={m.name} max={4}>
                <div className={`premium-card overflow-hidden ${m.faded ? 'opacity-90' : ''}`}>
                  <div className="p-6 flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex flex-col items-start text-left md:w-1/3 shrink-0">
                      {m.avatar.type === 'initials' ? (
                        <div className={`w-24 h-24 ${m.avatar.bg} rounded-full flex items-center justify-center ${m.avatar.fg} text-3xl font-bold mb-3 font-display`}>
                          {m.avatar.text}
                        </div>
                      ) : (
                        <Image
                          src={m.avatar.src}
                          alt={m.avatar.alt}
                          width={96}
                          height={96}
                          className={`w-24 h-24 rounded-full object-cover border-2 ${m.avatar.ring} mb-3`}
                        />
                      )}
                      <h3 className="text-xl font-bold text-gray-900 leading-tight font-display tracking-tight">{m.name}</h3>
                      <Badge variant={m.variant} />
                    </div>

                    <div className="w-full">
                      <div className="mb-4">
                        <p className="text-gray-700 font-medium mb-2">{m.certification}</p>
                        {m.clbScores && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {m.clbScores.map((s, i) => (
                              <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-700">
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
                        {m.youtube && (
                          <div className="flex gap-3 text-sm">
                            <a
                              href={m.youtube.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-red-600 hover:text-red-800 underline inline-flex items-center gap-1.5"
                            >
                              <Youtube className="w-4 h-4" />
                              {m.youtube.label}
                            </a>
                          </div>
                        )}
                      </div>

                      {m.sessions ? (
                        <div className="space-y-3">
                          {m.sessions.map((s, i) => (
                            <a
                              key={i}
                              href={s.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex justify-between items-center w-full px-4 py-3 bg-brand-blue hover:bg-brand-blue-deep text-white rounded-xl transition-all duration-300 group shadow-[0_8px_20px_-6px_rgba(37,99,235,0.4)] hover:shadow-[0_14px_28px_-8px_rgba(37,99,235,0.55)] hover:-translate-y-0.5"
                            >
                              <span className="font-medium">{s.label}</span>
                              <span className="font-bold group-hover:underline inline-flex items-center gap-1">
                                {s.price}
                                <ArrowRight className="w-3.5 h-3.5" />
                              </span>
                            </a>
                          ))}
                        </div>
                      ) : (
                        <div className="pt-4 border-t border-gray-100 text-center">
                          <span className="inline-block px-4 py-2 bg-gray-50 text-gray-500 rounded-lg text-sm font-medium">
                            Slots detailed info available on request
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Tilt>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
