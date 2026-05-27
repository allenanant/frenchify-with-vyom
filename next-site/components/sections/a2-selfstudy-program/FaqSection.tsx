'use client';

import Reveal from '@/components/motion/Reveal';
import FaqAccordion from '@/components/FaqAccordion';

const groups = [
  {
    title: 'Before Joining',
    items: [
      {
        q: 'Do I need to complete A1 before joining A2 Self-Study?',
        a: 'Yes — and if you’ve completed A1 or already know the basics, you’re ready to dive into A2.',
      },
      {
        q: 'How long will it take to complete A2 Self-Study?',
        a: 'With just 2–3 hours daily, you can finish in 1.5 to 2.5 months. Many students move to B1 within the same season they start A2.',
      },
      {
        q: 'What’s included in A2 Self-Study?',
        a: 'You’ll get a full, structured learning path with step-by-step grammar lessons, real-world vocabulary, listening activities, reading passages, speaking assignments, and writing tasks — so you can progress without confusion.',
      },
      {
        q: 'What kind of support is available if I’m stuck?',
        a: 'You’re never alone —you can upgrade to Intensive and join live sessions immediately.',
      },
      {
        q: 'Can I upgrade to A2 Intensive after starting Self-Study?',
        a: 'Absolutely — and most students who want faster speaking improvement choose this path. You just pay the balance fee and instantly get access to 4 weekly live sessions.',
      },
      {
        q: 'What does the A2 test include?',
        a: 'A complete skills check — grammar, listening, reading, and an extensive list of speaking assignments to ensure you’re fully ready for B1.',
      },
    ],
  },
  {
    title: 'Promotions or Offers',
    items: [
      {
        q: 'Do I get a discount on referring a friend?',
        a: 'Yes! For every friend you refer, you’ll receive $35 off, and your friend receives $35 off as well!',
      },
      {
        q: 'Is there a Combo Discount?',
        a: 'Absolutely. We offer special combo pricing when you enroll in multiple programs together. For details, email us at frenchifyfee@gmail.com.',
      },
    ],
  },
];

export default function FaqSection() {
  return (
    <section className="py-20 bg-white full-bleed-section-ghl">
      <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12 tracking-tight">
            Frequently Asked Questions
          </h2>
        </Reveal>

        <div className="space-y-12">
          {groups.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 0.05}>
              <div>
                <h3 className="font-display text-2xl font-semibold text-gray-800 mb-6 pb-3 border-b-2 border-blue-100 tracking-tight">
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
