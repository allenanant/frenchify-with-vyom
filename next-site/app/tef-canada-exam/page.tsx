import Image from 'next/image';
import {
  Star,
  Users,
  HelpCircle,
  UserCheck,
  CalendarCheck,
  MessagesSquare,
  CheckCircle2,
  Award,
  ArrowRight,
  Clock,
  Youtube,
} from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import Magnetic from '@/components/motion/Magnetic';
import FloatingOrbs from '@/components/motion/FloatingOrbs';
import FaqAccordion, { type FaqItem } from '@/components/FaqAccordion';

export const metadata = {
  title: 'Frenchify Program for TEF Canada Exam - One-on-One Speaking Sessions',
  description:
    'Book one-on-one speaking practice sessions with successful Frenchify students who have cleared their TEF Canada exam and achieved their PR dreams.',
};

type Mentor = {
  /** Anchor id, so the line-up at the top can jump to the card */
  slug: string;
  name: string;
  img: string;
  badge: { Icon: typeof CheckCircle2; text: string; color: string };
  certifiedLabel: string;
  clb: string[];
  /** How to get the most out of the session with this mentor */
  blurb: string;
  link: string;
  videoLink?: { url: string; label: string };
};

// Every mentor's B1 Flex calendar is the same 30 minute session at the same
// price - read off the live GHL widgets, Aug 2026. GHL stays the source of
// truth; the calendar shows the real total at checkout.
const FLEX_SESSION = { duration: 30, price: 'CA$13.99' };

const mentors: Mentor[] = [
  {
    slug: 'ashish-kohli',
    name: 'Ashish Kohli',
    blurb:
      'Ashish has an amazing hold of the language, so you can take his guidance on structure, pronunciation and the areas holding your score back.',
    img: 'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/6a32671a5408771d1634c5df.png',
    badge: { Icon: Award, text: 'TEF Canada Exam', color: 'text-blue-600' },
    certifiedLabel: 'TEF Certified',
    clb: ['CLB 10', 'CLB 8', 'CLB 7', 'CLB 7'],
    link: 'https://api.leadconnectorhq.com/widget/bookings/ashish-kohli-30-mins-one-on-onf25esfyjd43id7imab2rcn57',
  },
  {
    slug: 'rajan-gurjar',
    name: 'Rajan Gurjar',
    blurb:
      'Prepare your monologues or Section A / Section B beforehand so Rajan can give you proper feedback on structure and pronunciation.',
    img: 'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/698cc13f5cec6ca7d09cb2b2.png',
    badge: { Icon: CheckCircle2, text: 'Cleared in 1st Attempt', color: 'text-green-600' },
    certifiedLabel: 'TEF Certified',
    clb: ['CLB 9', 'CLB 11', 'CLB 8', 'CLB 7'],
    link: 'https://api.leadconnectorhq.com/widget/bookings/rajan-gurjar-30-mins-one-on-onf25esfyjd43i',
  },
  {
    slug: 'darshil-ashawa',
    name: 'Darshil Ashawa',
    blurb:
      'A focused session to sharpen your speaking for TEF / TCF Canada, with feedback you can act on straight away.',
    img: 'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/698a37fda41b87d3021df22a.png',
    badge: { Icon: CheckCircle2, text: 'Cleared in 1st Attempt', color: 'text-green-600' },
    certifiedLabel: 'TEF Certified',
    clb: ['CLB 9', 'CLB 9', 'CLB 7', 'CLB 8'],
    link: 'https://api.leadconnectorhq.com/widget/bookings/darshil-ashawa-30-mins-one-on-onf25esfyjd43iw2ayyv',
  },
  {
    slug: 'tapas-rastogi',
    name: 'Tapas Rastogi',
    blurb:
      'A focused one-on-one to sharpen your speaking for TEF / TCF Canada, built around where your score is actually losing marks.',
    img: 'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/698b5b8667d7495d2d572eb3.png',
    badge: { Icon: Award, text: 'TEF Mentor', color: 'text-blue-600' },
    certifiedLabel: 'TEF Certified',
    clb: ['CLB 8', 'CLB 7', 'CLB 9', 'CLB 8'],
    link: 'https://api.leadconnectorhq.com/widget/bookings/tapas-rastogi-30-mins-one-on-onf25esfyjd43id7imab',
  },
  {
    slug: 'jay-patel',
    name: 'Jay Patel',
    blurb:
      'Bring a prepared topic or practise on the spot. You will get feedback on structure, pronunciation and overall improvement areas.',
    img: 'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/698a37fd0708e455aec9723a.png',
    badge: { Icon: CheckCircle2, text: 'Cleared in 2nd Attempt', color: 'text-green-600' },
    certifiedLabel: 'TEF Certified',
    clb: ['CLB 8', 'CLB 7', 'CLB 7', 'CLB 8'],
    link: 'https://api.leadconnectorhq.com/widget/bookings/jay-patel-30-mins-one-on-onf25esfyjd43id7imabdar3ze',
    videoLink: { url: 'https://youtu.be/fUiQfeMw3rc?si=xX-Jj6ohN03EHo86', label: 'Video' },
  },
  {
    slug: 'harleen-kaur',
    name: 'Harleen Kaur',
    blurb:
      'Harleen has cleared the TEF and is here to help you do the same. Focused speaking practice with feedback on flow and delivery.',
    img: 'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/698a1fd867d749129b19c343.png',
    badge: { Icon: Award, text: '2 years of TEF Teaching', color: 'text-blue-600' },
    certifiedLabel: 'TEF Certified - 15 Nov, 2024',
    clb: ['CLB 9', 'CLB 8', 'CLB 10', 'CLB 7'],
    link: 'https://api.leadconnectorhq.com/widget/bookings/harleen-kaur-30-mins-one-on-onf25esfyjd43id7imab6s2fmx',
    videoLink: { url: 'https://youtu.be/iNMVm32mUrc?si=BTWkpU882M2ZLPkE', label: 'Watch Journey' },
  },
  {
    slug: 'wafaa-mansuri',
    name: 'Wafaa Mansuri',
    blurb:
      'Come prepared with monologues or Section A depending on your level, or choose to do on-the-spot speaking practice in the session.',
    img: 'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69df78f9109243d2ccf97897.png',
    badge: { Icon: Award, text: 'Strategic Guidance', color: 'text-blue-600' },
    certifiedLabel: 'TEF Certified',
    clb: ['CLB 12', 'CLB 11', 'CLB 7', 'CLB 8'],
    link: 'https://api.leadconnectorhq.com/widget/bookings/wafaa-mansuri-30-mins-one-on-onf25esfyjd43id7imab6s2fmxr52418',
  },
  {
    slug: 'shilpa-rathore',
    name: 'Shilpa Rathore',
    blurb:
      'Prepare a topic that suits your level before the session so Shilpa can give you proper feedback on structure and pronunciation.',
    // Headshot supplied by Vyom, Aug 2026 - not on the GHL CDN like the others.
    img: '/images/mentors/shilpa-rathore.webp',
    badge: { Icon: CheckCircle2, text: 'Cleared in 1st Attempt', color: 'text-green-600' },
    certifiedLabel: 'TEF Certified',
    clb: ['CLB 8', 'CLB 9', 'CLB 8', 'CLB 8'],
    // B1 Flex calendar - the Flex-program version of her 30 min session.
    link: 'https://api.leadconnectorhq.com/widget/bookings/shilpa-rathore-30-mins-one-on-onf25esfyjd43imvyjvf',
  },
];

const faqs: FaqItem[] = [
  {
    q: 'Is this only for Frenchify students?',
    a: 'Yes. These sessions are exclusively for active Frenchify students. If an outsider books, the session will be canceled without refund.',
  },
  {
    q: 'What happens if I miss my session?',
    a: 'Missed sessions are not refundable. Please be present and on time. They cannot be rebooked.',
  },
  {
    q: 'Can I reschedule my session?',
    a: 'Rescheduling is not available once booked. In special cases, it may be possible with an additional fee.',
  },
  {
    q: 'How do I pay for these sessions?',
    a: 'The best method is credit card payment through the booking page. You may also pay via e-transfer to frenchifyfee@gmail.com. If you have a Coupon Code you may use that.',
  },
  {
    q: 'Can I book the same time slot every week?',
    a: 'Time slots cannot be guaranteed. Availability changes weekly, so we recommend booking in advance.',
  },
  {
    q: 'Can I book multiple sessions in advance?',
    a: 'Yes. You may book multiple sessions ahead of time to ensure availability.',
  },
  {
    q: 'Are these sessions private or group sessions?',
    a: 'These are fully one-on-one private speaking sessions (not group classes).',
  },
  {
    q: 'Will I receive a recording of the session?',
    a: 'No. Frenchify does not provide recordings. You may record the session on your own device.',
  },
  {
    q: 'What should I prepare before joining?',
    a: 'Come with one speaking topic ready, or be prepared to do an on-the-spot topic for practice.',
  },
];

export default function TefCanadaExamPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero-pattern-animated pt-8 pb-10 md:pt-16 md:pb-20 full-bleed-section-ghl relative overflow-hidden aurora-bg">
        <FloatingOrbs variant="soft" />
        <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <div className="inline-block bg-yellow-100 text-yellow-800 font-semibold text-sm px-5 py-2 rounded-full mb-6">
              <Star className="inline w-4 h-4 mr-2 -mt-0.5" />
              Exclusive for Frenchify Students Only
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              <span className="gradient-text">Frenchify Program</span> for TEF Canada Exam
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Book one-on-one speaking practice sessions with successful Frenchify students who have cleared their TEF Canada exam and achieved their PR dreams.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Magnetic>
                <a
                  href="#mentors"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center justify-center"
                >
                  <Users className="w-5 h-5 mr-2" />
                  View Mentors
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#faqs"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-8 py-3 rounded-lg shadow hover:shadow-md transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center justify-center"
                >
                  <HelpCircle className="w-5 h-5 mr-2" />
                  Read FAQs
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-10 md:py-20 bg-gray-50 full-bleed-section-ghl">
        <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                How It <span className="gradient-text">Works</span>
              </h2>
            </div>
          </Reveal>
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="text-blue-600 w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-3 tracking-tight">
                1. Choose a Mentor
              </h3>
              <p className="text-gray-600">
                Browse our TEF-certified mentors, check their CLB scores, and pick the one that fits your learning needs.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarCheck className="text-purple-600 w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-3 tracking-tight">
                2. Book a Session
              </h3>
              <p className="text-gray-600">
                Select your preferred session duration and book a convenient time slot directly from the mentor&apos;s calendar.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessagesSquare className="text-green-600 w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-3 tracking-tight">
                3. Practice &amp; Improve
              </h3>
              <p className="text-gray-600">
                Join your private one-on-one session, practice speaking with real exam topics, and get personalized feedback.
              </p>
            </div>
          </Stagger>
        </div>
      </section>

      {/* Mentors Section */}
      <section className="py-10 md:py-20 bg-white full-bleed-section-ghl" id="mentors">
        <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                Our TEF-Certified <span className="text-blue-600">Mentors</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Learn from students who have successfully cleared the TEF Canada exam. Each mentor brings real exam experience and proven strategies.
              </p>
            </div>
          </Reveal>

          {/* Line-up first, same as /one-on-one-speaking. Click a face to jump
              to that mentor's card. */}
          <Stagger className="flex flex-wrap justify-center gap-x-4 gap-y-6 md:gap-x-8 mb-12 md:mb-16">
            {mentors.map((m) => (
              <a
                key={m.slug}
                href={`#${m.slug}`}
                className="group flex w-[calc(50%-1rem)] sm:w-44 flex-col items-center text-center hover-lift rounded-2xl p-3"
              >
                <Image
                  src={m.img}
                  alt={m.name}
                  width={160}
                  height={160}
                  className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-blue-50 bg-gray-50 transition-colors duration-300 group-hover:border-blue-500/40"
                />
                <span className="font-display font-bold text-gray-900 text-sm mt-3 leading-tight">
                  {m.name}
                </span>
                <span className="text-xs text-gray-500 mt-1 leading-snug">{m.badge.text}</span>
              </a>
            ))}
          </Stagger>

          <div className="space-y-6 max-w-5xl mx-auto">
            {mentors.map((m) => (
              <Reveal key={m.slug} amount={0.05}>
                <div
                  id={m.slug}
                  className="premium-card scroll-mt-28 bg-white rounded-2xl border border-gray-200 shadow-lg p-6 md:p-8 transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    <Image
                      src={m.img}
                      alt={m.name}
                      width={160}
                      height={160}
                      className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-blue-50 bg-gray-50 shrink-0"
                    />
                    <div className="min-w-0">
                      <h3 className="font-display text-xl font-bold text-gray-900 tracking-tight">
                        {m.name}
                      </h3>
                      <p className={`text-sm ${m.badge.color} font-medium mt-1 flex items-center`}>
                        <m.badge.Icon className="w-4 h-4 mr-1" />
                        {m.badge.text}
                      </p>
                      <p className="text-sm font-medium text-gray-700 mt-2">{m.certifiedLabel}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {m.clb.map((c, i) => (
                          <span
                            key={i}
                            className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-gray-700 bg-gray-100"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mt-4">{m.blurb}</p>
                      {m.videoLink && (
                        <a
                          href={m.videoLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-red-600 hover:text-red-800 font-medium underline mt-3"
                        >
                          <Youtube className="w-4 h-4 mr-1" />
                          {m.videoLink.label}
                        </a>
                      )}
                    </div>
                  </div>

                  <Magnetic>
                    <a
                      href={m.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 bg-blue-600 text-white font-medium px-5 py-4 rounded-xl mt-6 transition-all duration-300 hover:bg-brand-blue-deep hover:-translate-y-0.5 shadow-[0_2px_8px_rgba(37,99,235,0.25)] hover:shadow-[0_6px_16px_rgba(37,99,235,0.35)]"
                    >
                      <span className="min-w-0">
                        <span className="block font-semibold">B1 Flex Speaking Session</span>
                        <span className="flex items-center gap-1.5 text-xs text-blue-100 mt-1">
                          <Clock className="w-3 h-3 shrink-0" />
                          {FLEX_SESSION.duration} min
                          <span aria-hidden>·</span>
                          <span className="font-semibold">{FLEX_SESSION.price}</span>
                        </span>
                      </span>
                      <span className="inline-flex items-center shrink-0 text-sm font-semibold">
                        Book Now <ArrowRight className="ml-2 w-4 h-4" />
                        <span className="sr-only">{m.name} (opens in a new tab)</span>
                      </span>
                    </a>
                  </Magnetic>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-10 md:py-20 bg-gray-50 full-bleed-section-ghl" id="faqs">
        <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                Frequently Asked <span className="gradient-text">Questions</span>
              </h2>
              <p className="text-lg text-gray-600">
                Everything you need to know about our one-on-one speaking sessions.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <FaqAccordion items={faqs} />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
