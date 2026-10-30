// Page-local display data, checked against the existing A1 source and registration pages.
// Keep checkout URLs/product identities intact.
export const a1Programs = [
  {
    id: 'a1-intensive',
    name: 'A1 Intensive',
    shortName: 'Intensive',
    price: 599,
    recommended: true,
    tagline: 'Learn with a little more guidance.',
    description: 'For students who want structure, live guidance and regular instructor support.',
    href: 'https://link.fastpaydirect.com/payment-link/67e8ba24717876a0a6a43b45',
    essentials: ['Complete A1 online curriculum', '4 live sessions per week', 'Student community + session recordings'],
    details: ['Weekly activity session with quizzes', 'Live doubt-clearing sessions', 'All unit tests, assignments and final A1 Analysis'],
  },
  {
    id: 'a1-flex',
    name: 'A1 Flex',
    shortName: 'Flex',
    price: 449,
    recommended: false,
    tagline: 'Your learning. Your schedule.',
    description: 'For students who want the full curriculum with maximum schedule flexibility.',
    href: 'https://link.fastpaydirect.com/payment-link/684971904d2e493514bd28c6',
    essentials: ['Same complete A1 online curriculum', 'Study anytime, with no fixed live classes', 'All units, tests and assignments'],
    details: ['Support through the student portal', 'Final A1 Analysis before moving to A2', 'Upgrade to Intensive for $150 CAD'],
  },
] as const;

// These are the current published A1 timings, including the site's EST label.
export const a1Schedule = [
  { day: 'Monday', time: '8:00 PM', note: 'Live session' },
  { day: 'Thursday', time: '7:00 PM', note: 'Live session' },
  { day: 'Saturday', time: '8:00 AM', note: 'Activity session' },
  { day: 'Sunday', time: '10:00 AM', note: 'Live session' },
] as const;

export const a1Combos = [
  { name: 'A1 + A2 Intensive', price: '1,198', href: 'https://link.fastpaydirect.com/payment-link/6852f4718e1542a54ebcc6e1' },
  { name: 'A1 + A2 Flex', price: '948', href: 'https://link.fastpaydirect.com/payment-link/68ab529a67ee3b5faf687eb9' },
] as const;

export const a1Faqs = [
  { q: 'What is the difference between Intensive and Flex?', a: 'Both include the same complete A1 curriculum. Intensive adds four weekly live sessions, a student community and session recordings. Flex has no live classes, so you study on your own schedule.' },
  { q: 'Do both programs include the same curriculum?', a: 'Yes. Both include the online lessons, pronunciation and vocabulary practice, reading, listening, speaking and writing tasks, unit tests and final A1 Analysis.' },
  { q: 'How long does A1 take to complete?', a: 'The recommended pace is about 5–6 weeks with 2–3 hours of daily study. This is a guide, not a deadline. Your three-month access gives you room for revision and interruptions.' },
  { q: 'How long do I have access?', a: 'Both programs include three months of A1 access. If you need more time after that, check the current A1 renewal options or contact Frenchify for guidance.' },
  { q: 'What if I miss a live session? Are recordings available?', a: 'Yes. A1 Intensive sessions are recorded, so you can catch up if you occasionally miss one. Flex does not include live sessions or their recordings.' },
  // Owner confirmed $150 in this draft review; old source said $149.
  { q: 'Can I upgrade from Flex to Intensive?', a: 'Yes. You can upgrade from A1 Flex to A1 Intensive by paying $150 CAD. Contact Frenchify through your student portal to arrange the upgrade.' },
  { q: 'What happens after I complete A1?', a: 'Complete the final A1 Analysis so Frenchify can review your foundation before you move to A2. A2 builds on your grammar and speaking skills, followed by B1 / Exam Prep 1 and B2 / Final Exam Preparation.' },
  { q: 'Can I join as a complete beginner?', a: 'Absolutely. You do not need any French experience or a placement test to start A1. Start with Unit 0, then follow the lessons and practice step by step.' },
] as const;
