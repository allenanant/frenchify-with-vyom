'use client';

import Reveal from '@/components/motion/Reveal';
import FaqAccordion from '@/components/FaqAccordion';

const groups = [
  {
    title: 'Before Joining',
    items: [
      {
        q: 'How do I know if I’m ready for A2?',
        a: 'You should have completed A1 or have equivalent knowledge. If you’ve done A1 elsewhere, you’ll need to take our Analysis Test to confirm readiness.',
      },
      {
        q: 'How do I take the Placement & Analysis Test?',
        a: 'Connect with Vyom at 514-726-5114 to schedule your test. The test costs $50 CAD, includes detailed feedback, and the amount will be credited towards your A2 program fee if you join.',
      },
      {
        q: 'Can I join if I’ve done A1 at another institute?',
        a: 'Yes — as long as you pass the analysis test to confirm you’re ready for A2.',
      },
    ],
  },
  {
    title: 'Program Details',
    items: [
      {
        q: 'What’s included in A2 Intensive?',
        a: 'You get 4 live sessions per week (3 doubt-clearing + 1 activity), structured lesson plans, advanced grammar mastery, speaking assignments, real-world vocabulary, listening & reading practice tasks, writing tasks, and TEF-style exercises woven in for early exam readiness.',
      },
      {
        q: 'Is there a community group for A2 Intensive students?',
        a: 'Yes — you’ll be part of an active learning community for daily practice, peer feedback, and extra support between classes.',
      },
      {
        q: 'What happens if I miss a live class? Are they recorded?',
        a: 'Yes — all live sessions are recorded and shared in the group on request so you can catch up or review later.',
      },
    ],
  },
  {
    title: 'Learning Process & Duration',
    items: [
      {
        q: 'How long will it take to complete A2 Intensive?',
        a: 'Most students finish in 1.5 to 2 months with 2–3 hours of daily study.',
      },
      {
        q: 'Does it take 2 months for everyone?',
        a: 'No — that’s the average. Some progress faster, others slower depending on schedule and consistency.',
      },
      {
        q: 'How is progress tracked?',
        a: 'By completing units, assignments, and participation in live sessions.',
      },
    ],
  },
  {
    title: 'Exam Readiness',
    items: [
      {
        q: 'Does A2 Intensive prepare me for TEF/TCF?',
        a: 'Yes, the main goal is mastering A2, Exam tasks are integrated so your prep starts early.',
      },
      {
        q: 'What’s included in the A2 test?',
        a: 'A full evaluation in grammar, listening, reading, and speaking assignments, with personalised feedback so you know exactly what to work on before B1.',
      },
      {
        q: 'Are all assignments mandatory?',
        a: 'Yes — they’re carefully designed to help you master every skill. Students who complete them consistently finish B1-ready and confident.',
      },
    ],
  },
  {
    title: 'Promotions or Offers',
    items: [
      {
        q: 'Do I get a discount on referring a friend?',
        a: 'Yes! For every friend you refer, you’ll receive $35 off!',
      },
      {
        q: 'Is there a Combo Discount?',
        a: 'Absolutely. We offer special combo pricing when you enroll in multiple programs together. For details, message on WhatsApp at 514-726-5114 directly.',
      },
    ],
  },
];

export default function FaqSection() {
  return (
    <section className="py-16 md:py-20 bg-white full-bleed-section-ghl">
      <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16 tracking-tight">
            Frequently Asked Questions
          </h2>
        </Reveal>

        <div className="space-y-12">
          {groups.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 0.05}>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-blue-100">
                  {group.title}
                </h3>
                <FaqAccordion items={group.items} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
