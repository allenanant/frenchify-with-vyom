import { Lock, CheckCircle2, Star, ArrowRight } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import Tilt from '@/components/motion/Tilt';

export const metadata = {
  title: 'Book Student Mentorship - Frenchify',
  description:
    'Book practice sessions with successful Frenchify students who have cleared their TEF Canada exam and achieved their PR dreams.',
};

type Session = { label: string; price: string; href: string };

type Mentor = {
  name: string;
  avatar:
    | { type: 'initials'; text: string; bg: string; color: string }
    | { type: 'image'; src: string; borderColor: string };
  badge: { icon: 'check' | 'star' | 'none'; text: string; color: string };
  preText?: string;
  tags?: string[];
  videoHref?: string;
  videoLabel?: string;
  sessions?: Session[];
  locked?: boolean;
  opacity?: boolean;
};

const mentors: Mentor[] = [
  {
    name: 'Rajan Gurjar',
    avatar: { type: 'initials', text: 'RG', bg: 'bg-blue-100', color: 'text-brand-blue' },
    badge: { icon: 'check', text: 'Cleared in 1st Attempt', color: 'text-green-600' },
    preText: 'TEF Certified',
    tags: ['CLB 9', 'CLB 11', 'CLB 8', 'CLB 7'],
    sessions: [
      {
        label: '30 Mins Session',
        price: '$11.99',
        href: 'https://api.leadconnectorhq.com/widget/bookings/rajan-gurjar-30-mins-one-on-on',
      },
      {
        label: '50 Mins Session',
        price: '$18.99',
        href: 'https://api.leadconnectorhq.com/widget/bookings/rajan-gurjar-30-mins-one-on-onf25esf',
      },
    ],
  },
  {
    name: 'Jay Patel',
    avatar: {
      type: 'image',
      src: 'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69838b432dd9854d7c0a0a32.jpeg',
      borderColor: 'border-blue-100',
    },
    badge: { icon: 'check', text: 'Cleared in 2nd Attempt', color: 'text-green-600' },
    preText: 'TEF Certified',
    tags: ['CLB 8', 'CLB 7', 'CLB 7', 'CLB 8'],
    videoHref: 'https://youtu.be/fUiQfeMw3rc?si=xX-Jj6ohN03EHo86',
    videoLabel: 'Video',
    sessions: [
      {
        label: '30 Mins Session',
        price: '$11.99',
        href: 'https://api.leadconnectorhq.com/widget/bookings/jay-patel-30-mins-one-on-one-s',
      },
      {
        label: '50 Mins Session',
        price: '$18.99',
        href: 'https://api.leadconnectorhq.com/widget/bookings/jay-patel-30-mins-one-on-one-sk4yqfp',
      },
    ],
  },
  {
    name: 'Manpreet Kaur',
    avatar: {
      type: 'image',
      src: 'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6984146e0a7fd162cb612d42.jpeg',
      borderColor: 'border-purple-100',
    },
    badge: { icon: 'star', text: 'Top Scorer', color: 'text-purple-600' },
    preText: 'TEF Certified',
    tags: ['CLB 11', 'CLB 12', 'CLB 8', 'CLB 9'],
    sessions: [
      {
        label: '25 Mins Session',
        price: '$11.99',
        href: 'https://api.leadconnectorhq.com/widget/bookings/30-mins-speaking-manpreet-kaur',
      },
      {
        label: '50 Mins Session',
        price: '$18.99',
        href: 'https://api.leadconnectorhq.com/widget/bookings/30-mins-speaking-manpreet-kaurbico6u',
      },
    ],
  },
  {
    name: 'Harleen Kaur',
    avatar: { type: 'initials', text: 'HK', bg: 'bg-pink-100', color: 'text-pink-600' },
    badge: { icon: 'none', text: '2+ Years Learning', color: 'text-gray-500' },
    preText: 'TEF Certified - 15 Nov, 2024',
    videoHref: 'https://youtu.be/iNMVm32mUrc?si=BTWkpU882M2ZLPkE',
    videoLabel: 'Watch Journey',
    sessions: [
      {
        label: '30 Mins Session',
        price: '$14.99',
        href: 'https://api.leadconnectorhq.com/widget/bookings/harleenkaur',
      },
      {
        label: '45 Mins Session',
        price: '$19.99',
        href: 'https://api.leadconnectorhq.com/widget/bookings/harleen-kaur-50-mins-one-on-on',
      },
    ],
  },
  {
    name: 'Darshan Patel',
    avatar: {
      type: 'image',
      src: 'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/698413d10a7fd12de7611393.jpeg',
      borderColor: 'border-indigo-100',
    },
    badge: { icon: 'none', text: 'Focus on Speaking', color: 'text-gray-500' },
    preText: 'TEF Certified - 8 Dec, 2024',
    videoHref: 'https://youtu.be/mzdvQWqc64M?si=gSG-rzagjYhAbfSQ',
    videoLabel: 'Watch Journey',
    sessions: [
      {
        label: '25 Mins Session',
        price: '$15.99',
        href: 'https://api.leadconnectorhq.com/widget/bookings/darshanpatel',
      },
      {
        label: '50 Mins Session',
        price: '$25.99',
        href: 'https://api.leadconnectorhq.com/widget/bookings/50-mins-speaking-one-on-one-se',
      },
    ],
  },
  {
    name: 'Darshil Ashawa',
    avatar: { type: 'initials', text: 'DA', bg: 'bg-gray-100', color: 'text-gray-600' },
    badge: { icon: 'check', text: 'Cleared in 1st Attempt', color: 'text-green-600' },
    preText: 'TEF Certified',
    tags: ['CLB 9', 'CLB 9', 'CLB 7', 'CLB 8'],
    locked: true,
    opacity: true,
  },
  {
    name: 'Appaar S. Bagga',
    avatar: { type: 'initials', text: 'AB', bg: 'bg-gray-100', color: 'text-gray-600' },
    badge: { icon: 'check', text: 'Cleared in 1st Attempt', color: 'text-green-600' },
    preText: 'TEF Certified',
    tags: ['CLB 8', 'CLB 10', 'CLB 8', 'CLB 7'],
    videoHref: 'https://youtu.be/ZTP1HZTu8k0?si=Lq636Oru9oQWoz3_',
    videoLabel: 'Video',
    locked: true,
    opacity: true,
  },
];

function BadgeIcon({ name }: { name: 'check' | 'star' | 'none' }) {
  if (name === 'check') return <CheckCircle2 className="w-4 h-4 mr-1" />;
  if (name === 'star') return <Star className="w-4 h-4 mr-1 fill-current" />;
  return null;
}

export default function OneOnOneSpeakingPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <Reveal>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            One-on-One <span className="gradient-text">TEF Mentorship</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Book practice sessions with successful Frenchify students who have cleared their TEF Canada exam and
            achieved their PR dreams.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="inline-flex items-center bg-yellow-50 border border-yellow-200 rounded-lg px-6 py-3 text-yellow-800 text-sm font-medium">
            <Lock className="w-4 h-4 mr-2" /> Exclusive for Frenchify Students Only
          </div>
        </Reveal>
      </div>

      {/* Mentors Grid */}
      <Stagger className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {mentors.map((m) => (
          <Tilt key={m.name} max={5}>
            <div
              className={`premium-card bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 h-full ${
                m.opacity ? 'opacity-90' : ''
              }`}
            >
              <div className="p-6 flex flex-col md:flex-row gap-6 items-start">
                <div className="flex flex-col items-start text-left md:w-1/3 shrink-0">
                  {m.avatar.type === 'initials' ? (
                    <div
                      className={`w-24 h-24 ${m.avatar.bg} rounded-full flex items-center justify-center ${m.avatar.color} text-3xl font-bold mb-3`}
                    >
                      {m.avatar.text}
                    </div>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={m.avatar.src}
                      alt={m.name}
                      className={`w-24 h-24 rounded-full object-cover border-2 ${m.avatar.borderColor} mb-3`}
                    />
                  )}
                  <h3 className="font-display text-xl font-bold text-gray-900 leading-tight tracking-tight">
                    {m.name}
                  </h3>
                  <p className={`text-sm ${m.badge.color} font-medium mt-1 flex items-center`}>
                    <BadgeIcon name={m.badge.icon} />
                    {m.badge.text}
                  </p>
                </div>
                <div className="w-full">
                  <div className={m.sessions ? 'mb-4' : 'mb-6'}>
                    {m.preText && <p className="text-gray-700 font-medium mb-2">{m.preText}</p>}
                    {m.tags && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {m.tags.map((t, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-700"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    {m.videoHref && (
                      <div className="flex gap-3 text-sm">
                        <a
                          href={m.videoHref}
                          target="_blank"
                          rel="noreferrer"
                          className="text-red-600 hover:text-red-800 underline"
                        >
                          <i className="fab fa-youtube mr-1" />
                          {m.videoLabel}
                        </a>
                      </div>
                    )}
                  </div>
                  {m.sessions ? (
                    <div className="space-y-3">
                      {m.sessions.map((s) => (
                        <a
                          key={s.href}
                          href={s.href}
                          target="_blank"
                          rel="noreferrer"
                          className="flex justify-between items-center w-full px-4 py-3 bg-brand-blue hover:bg-brand-blue-deep text-white rounded-xl transition-colors group shadow-md hover:shadow-lg"
                        >
                          <span className="font-medium">{s.label}</span>
                          <span className="font-bold cursor-pointer group-hover:underline inline-flex items-center">
                            {s.price} <ArrowRight className="ml-1 w-3 h-3" />
                          </span>
                        </a>
                      ))}
                    </div>
                  ) : m.locked ? (
                    <div className="pt-4 border-t border-gray-100 text-center">
                      <span className="inline-block px-4 py-2 bg-gray-50 text-gray-500 rounded-lg text-sm font-medium">
                        Slots detailed info available on request
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </Tilt>
        ))}
      </Stagger>
    </main>
  );
}
