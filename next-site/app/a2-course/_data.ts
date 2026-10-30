// A2 display data checked against the current public page and payment checkouts.
// The owner confirmed 20 speaking assignments on 30 October 2026.
export const speakingAssignmentCount = 20;
export const startA2Checkout = 'https://learn.frenchifywithvyom.com/web/checkout/6925f1238d6535cff000f8d5';
export const speakingOptionsHref = '/one-on-one-speaking/';

export const a2Programs = [
  {
    id: 'a2-intensive', name: 'A2 Intensive', shortName: 'Intensive', price: 599, recommended: true,
    tagline: 'Build confidence with regular guidance.',
    description: 'For students who want live guidance, accountability and regular instructor support.',
    href: 'https://link.fastpaydirect.com/payment-link/67e8bb027178768a29a43b4e',
    essentials: ['Complete A2 curriculum + speaking assignments', '4 live sessions per week', 'Student community + session recordings'],
    details: ['All unit tests and practice tasks', 'A2 → B1 transition preparation', 'Optional one-on-one speaking available at an extra fee'],
  },
  {
    id: 'a2-flex', name: 'A2 Flex', shortName: 'Flex', price: 499, recommended: false,
    tagline: 'The same foundation, on your schedule.',
    description: 'For students who want the full curriculum with flexibility and no fixed live classes.',
    // Keep the existing Self-Study product and its checkout identity.
    href: 'https://link.fastpaydirect.com/payment-link/684971d397daa447de9fc3fd',
    essentials: ['Same A2 curriculum + speaking assignments', 'All units, tests and activities', 'Study on your schedule, with no live classes'],
    details: ['Support through the student portal', 'A2 → B1 transition preparation', 'Optional one-on-one speaking available at an extra fee', 'Upgrade to Intensive by paying the balance fee'],
  },
] as const;

export const a2Comparison = [
  ['A2 curriculum + speaking', 'Included', 'Included'],
  ['Live sessions', '4 per week', 'No live classes'],
  ['Community + recordings', 'Included', 'Not included'],
  ['Study schedule', 'Fixed live timings', 'Maximum flexibility'],
  ['One-on-one speaking', 'Optional · extra fee', 'Optional · extra fee'],
  ['A2 → B1 preparation', 'Included', 'Included'],
  ['Price · CAD', '$599', '$499'],
] as const;

// Current published A2 schedule. Preserve its existing EST label.
export const a2Schedule = [
  { day: 'Tuesday', time: '8:00 AM', note: 'Live session' },
  { day: 'Thursday', time: '8:15 PM', note: 'Live session' },
  { day: 'Saturday', time: '9:00 AM', note: 'Activity session' },
  { day: 'Sunday', time: '8:30 AM', note: 'Live session' },
] as const;

export const a2Faqs = [
  { q: 'What is the difference between A2 Intensive and Flex?', a: 'Intensive adds four weekly live sessions, a student community and session recordings. Flex has no regular live classes, so it suits students who need more control over their schedule.' },
  { q: 'Do both programs include the same curriculum?', a: 'Yes. Both include the complete online A2 curriculum, speaking assignments, all four language skills, unit tests and A2-to-B1 transition preparation.' },
  { q: 'How long does A2 normally take?', a: 'Allow around 1.5–2 months, or roughly 6–8 weeks, with 2–3 hours of daily study. Your pace depends on consistency and practice. This is a guide, not a deadline.' },
  { q: 'How long do I get access?', a: 'Both programs include three months of A2 access. This gives you time for revision and flexibility; you do not need to take the full three months to finish.' },
  { q: 'Do I need to finish the speaking assignments before B1?', a: 'Yes. Complete the speaking work alongside the lessons before moving to B1. It builds pronunciation, sentence formation and speaking flow; watching the lessons alone does not replace this practice.' },
  { q: 'Are live sessions recorded if I miss one?', a: 'Yes. A2 Intensive session recordings are available if you occasionally miss a class. Flex does not include the regular live sessions or their recordings.' },
  { q: 'What if I cannot attend the live timings?', a: 'Flex may fit you better if fixed weekly sessions are difficult to attend. If you choose Intensive and occasionally miss a session, you can catch up using the recording.' },
  { q: 'Can I book one-on-one speaking sessions?', a: 'Yes. They are optional, paid separately and available to active Frenchify students from A2 onward. The booking page recommends starting after around 60% of A2 and its speaking work. They are not required to complete A2.' },
  { q: 'How do I know whether I am ready for B1?', a: 'Finish the A2 units, speaking assignments, transition work and final readiness check. Use the feedback to identify anything that needs more practice before exam-focused B1 preparation.' },
  { q: 'What if I studied A1 somewhere else?', a: 'Complete the Test to Start A2 before registering so Frenchify can check your A1 foundation. Use the direct booking button on this page.' },
  { q: 'Do I need to decide between TEF and TCF during A2?', a: 'Build your A2 language and speaking foundation first. You can make the exam-specific decision before moving into exam-focused B1 preparation, with guidance from Frenchify if needed.' },
  { q: 'Can I upgrade from Flex to Intensive?', a: 'Yes. The current upgrade policy lets you move to Intensive by paying the balance fee. Contact Frenchify through your student portal for the upgrade details.' },
] as const;
