import {
  Star,
  Users,
  UserCheck,
  CalendarCheck,
  MessagesSquare,
  CheckCircle2,
  Award,
  Youtube,
} from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import Magnetic from '@/components/motion/Magnetic';
import FloatingOrbs from '@/components/motion/FloatingOrbs';
import FaqAccordion, { type FaqItem } from '@/components/FaqAccordion';
import MentorBookingCard from '@/components/booking/MentorBookingCard';
import MentorRail from '@/components/booking/MentorRail';

// Root layout adds "| Frenchify" via the title template, so no suffix here.
export const metadata = {
  title: 'TEF & TCF Canada One-on-One Speaking Sessions',
  description:
    'Exclusive one-on-one TEF and TCF Canada speaking practice for Frenchify students. Choose a mentor, book with your coupon code and receive personalized exam feedback.',
};

type Mentor = {
  name: string;
  img: string;
  badge: { Icon: typeof CheckCircle2; text: string; color: string };
  certifiedLabel: string;
  clb: string[];
  /** One short line on how to get the most out of the session. Kept to 2-3
   *  rendered lines so every card in a row stays the same compact height. */
  blurb: string;
  link: string;
  videoLink?: { url: string; label: string };
};

// Every mentor's Flex calendar is the same 30 minute session at the same
// price - read off the live GHL widgets, Aug 2026. GHL stays the source of
// truth; the calendar shows the real total at checkout.
const FLEX_SESSION = { duration: 30, price: 'CA$13.99' };

// Anchor for each mentor's card, e.g. #ashish-kohli - the mentor list jumps here.
const mentorSlug = (m: Mentor) => m.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const mentors: Mentor[] = [
  {
    name: 'Ashish Kohli',
    blurb:
      'Strong command of the language, with guidance on structure, pronunciation and what is holding your score back.',
    img: 'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/6a32671a5408771d1634c5df.png',
    badge: { Icon: Award, text: 'TEF & TCF Canada', color: 'text-blue-600' },
    certifiedLabel: 'TEF & TCF Certified',
    clb: ['CLB 10', 'CLB 8', 'CLB 7', 'CLB 7'],
    link: 'https://api.leadconnectorhq.com/widget/bookings/ashish-kohli-30-mins-one-on-onf25esfyjd43id7imab2rcn57',
  },
  {
    name: 'Rajan Gurjar',
    blurb:
      'Prepare your monologues or Section A / Section B beforehand for feedback on structure and pronunciation.',
    img: 'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/698cc13f5cec6ca7d09cb2b2.png',
    badge: { Icon: CheckCircle2, text: 'Cleared in 1st Attempt', color: 'text-green-600' },
    certifiedLabel: 'TEF & TCF Certified',
    clb: ['CLB 9', 'CLB 11', 'CLB 8', 'CLB 7'],
    link: 'https://api.leadconnectorhq.com/widget/bookings/rajan-gurjar-30-mins-one-on-onf25esfyjd43i',
  },
  {
    name: 'Tapas Rastogi',
    blurb:
      'A focused one-on-one built around where your score is actually losing marks.',
    img: 'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/698b5b8667d7495d2d572eb3.png',
    badge: { Icon: Award, text: 'TEF & TCF Mentor', color: 'text-blue-600' },
    certifiedLabel: 'TEF & TCF Certified',
    clb: ['CLB 8', 'CLB 7', 'CLB 9', 'CLB 8'],
    link: 'https://api.leadconnectorhq.com/widget/bookings/tapas-rastogi-30-mins-one-on-onf25esfyjd43id7imab',
  },
  {
    name: 'Jay Patel',
    blurb:
      'Bring a prepared topic or practise on the spot, then get feedback on structure and pronunciation.',
    img: 'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/698a37fd0708e455aec9723a.png',
    badge: { Icon: CheckCircle2, text: 'Cleared in 2nd Attempt', color: 'text-green-600' },
    certifiedLabel: 'TEF & TCF Certified',
    clb: ['CLB 8', 'CLB 7', 'CLB 7', 'CLB 8'],
    link: 'https://api.leadconnectorhq.com/widget/bookings/jay-patel-30-mins-one-on-onf25esfyjd43id7imabdar3ze',
    videoLink: { url: 'https://youtu.be/fUiQfeMw3rc?si=xX-Jj6ohN03EHo86', label: 'Video' },
  },
  {
    name: 'Harleen Kaur',
    blurb:
      'Focused speaking practice with feedback on your flow and delivery.',
    img: 'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/698a1fd867d749129b19c343.png',
    badge: { Icon: Award, text: '2 years of Teaching Experience', color: 'text-blue-600' },
    certifiedLabel: 'TEF & TCF Certified - 15 Nov, 2024',
    clb: ['CLB 9', 'CLB 8', 'CLB 10', 'CLB 7'],
    link: 'https://api.leadconnectorhq.com/widget/bookings/harleen-kaur-30-mins-one-on-onf25esfyjd43id7imab6s2fmx',
    videoLink: { url: 'https://youtu.be/iNMVm32mUrc?si=BTWkpU882M2ZLPkE', label: 'Watch Journey' },
  },
  {
    name: 'Wafaa Mansuri',
    blurb:
      'Come prepared with monologues or Section A, or practise on the spot in the session.',
    img: 'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69df78f9109243d2ccf97897.png',
    badge: { Icon: Award, text: 'Strategic Guidance', color: 'text-blue-600' },
    certifiedLabel: 'TEF & TCF Certified',
    clb: ['CLB 12', 'CLB 11', 'CLB 7', 'CLB 8'],
    link: 'https://api.leadconnectorhq.com/widget/bookings/wafaa-mansuri-30-mins-one-on-onf25esfyjd43id7imab6s2fmxr52418',
  },
  {
    name: 'Shilpa Rathore',
    blurb:
      'Prepare a topic that suits your level and get feedback on structure and pronunciation.',
    // Headshot supplied by Vyom, Aug 2026 - not on the GHL CDN like the others.
    img: '/images/mentors/shilpa-rathore.webp',
    badge: { Icon: CheckCircle2, text: 'Cleared in 1st Attempt', color: 'text-green-600' },
    certifiedLabel: 'TEF & TCF Certified',
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
            {/* Two-line heading: programme name, then the exam line underneath.
                Sizes are a step down from the old single-line H1 so two lines
                still fit above the fold on a 390px phone. */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Frenchify <span className="gradient-text">FLEX</span> Speaking Program
              <span className="block text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 mt-3">
                One-on-One Sessions for TEF &amp; TCF Canada
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Practise speaking one-on-one with experienced mentors and receive personalized feedback for your TEF or TCF Canada preparation.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex justify-center">
              <Magnetic>
                <a
                  href="#mentors"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center justify-center"
                >
                  <Users className="w-5 h-5 mr-2" />
                  View Mentors
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
                Select the mentor you would like to practise with.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarCheck className="text-purple-600 w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-3 tracking-tight">
                2. Book Using Your Coupon Code
              </h3>
              <p className="text-gray-600">
                Choose an available time and book your session using the coupon code provided to you.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessagesSquare className="text-green-600 w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-3 tracking-tight">
                3. Practise and Improve
              </h3>
              <p className="text-gray-600">
                Attend your one-on-one session, practise speaking and receive personalized feedback.
              </p>
            </div>
          </Stagger>
        </div>
      </section>

      {/* Mentors Section */}
      <section className="py-10 md:py-20 bg-white full-bleed-section-ghl" id="mentors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Booking cards, with the mentor list pinned beside them on desktop. */}
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_68px] lg:gap-6 xl:grid-cols-[minmax(0,1fr)_224px] xl:gap-8">
            <div className="min-w-0">
              <Reveal>
                <div className="text-center mb-10 md:mb-12">
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                    Our TEF &amp; TCF Canada Exam-Certified{' '}
                    <span className="text-blue-600">Mentors</span>
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Each mentor brings dual-exam experience and proven strategies for TEF and TCF Canada.
                  </p>
                </div>
              </Reveal>

              {/* One card per mentor with their Flex calendar embedded in it,
                  instead of a Book button that opened the GHL widget in a new
                  tab. Under 1024px each card is a dropdown. Fade only: a
                  slide-in would move each card after the mentor list has
                  scrolled to it, so the jump lands short. */}
              <div className="space-y-4 lg:space-y-6">
                {mentors.map((m) => (
                  <Reveal key={m.name} amount={0.05} direction="none">
                    <MentorBookingCard
                      id={mentorSlug(m)}
                      name={m.name}
                      photo={m.img}
                      tagline={
                        <>
                          <p className={`text-xs ${m.badge.color} font-medium mt-1 flex items-center`}>
                            <m.badge.Icon className="w-3.5 h-3.5 mr-1 shrink-0" />
                            <span className="min-w-0">{m.badge.text}</span>
                          </p>
                          <p className="text-xs font-medium text-gray-700 mt-1">{m.certifiedLabel}</p>
                        </>
                      }
                      sessions={[
                        {
                          src: m.link,
                          label: 'Flex Speaking Session',
                          duration: FLEX_SESSION.duration,
                          price: FLEX_SESSION.price,
                        },
                      ]}
                    >
                      <div className="flex flex-wrap gap-1.5">
                        {m.clb.map((c, i) => (
                          <span
                            key={i}
                            className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold text-gray-700 bg-gray-100"
                          >
                            {c}
                          </span>
                        ))}
                      </div>

                      <p className="text-gray-600 text-sm leading-relaxed mt-3">{m.blurb}</p>

                      {m.videoLink && (
                        <a
                          href={m.videoLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center self-start text-xs text-red-600 hover:text-red-800 font-medium underline mt-2"
                        >
                          <Youtube className="w-3.5 h-3.5 mr-1" />
                          {m.videoLink.label}
                        </a>
                      )}
                    </MentorBookingCard>
                  </Reveal>
                ))}
              </div>
            </div>

            <MentorRail
              mentors={mentors.map((m) => ({ id: mentorSlug(m), name: m.name, photo: m.img }))}
            />
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
