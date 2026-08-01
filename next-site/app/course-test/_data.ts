export type TrackId = 'tef' | 'tcf';

export type TrackCourse = {
  href: string;
  img: string;
  alt: string;
  badge: string;
  badgeClass: string;
  title: string;
  desc: string;
  cta: string;
};

export type Track = {
  id: TrackId;
  exam: string;
  short: string;
  tagline: string;
  heroBody: string;
  intensive: TrackCourse[];
  selfStudy: TrackCourse[];
};

const IMG = {
  a1i: 'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/682cb55cbff63d8bc398ecf2.png',
  a2i: 'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/682cb597e10a086f93d310ad.png',
  b1i: 'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/682cb5c8bff63d20e398f6c6.png',
  b2i: 'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/682cb52781ef6b76cea31ac0.png',
  a1s: 'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6846f140afd030d330c5b831.png',
  a2s: 'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6846f1408e362184a301feb7.png',
};

export const TRACKS: Record<TrackId, Track> = {
  tef: {
    id: 'tef',
    exam: 'TEF Canada',
    short: 'TEF',
    tagline: 'The exam most Frenchify students take for Canadian PR.',
    heroBody:
      'The complete TEF Canada journey — from absolute beginner to exam-ready B2, with intensive live courses and self-paced options at every step.',
    intensive: [
      {
        href: '/a1-intensive-program',
        img: IMG.a1i,
        alt: 'A1 Intensive Program',
        badge: 'A1 Level',
        badgeClass: 'bg-brand-blue text-white',
        title: 'Frenchify A1 Intensive Program',
        desc: 'New to French? This is your starting point. Build a solid foundation and kickstart your TEF Canada journey with our step-by-step A1 French Program—perfect for absolute beginners.',
        cta: 'Know More',
      },
      {
        href: '/a2-intensive-program',
        img: IMG.a2i,
        alt: 'A2 Intensive Program',
        badge: 'A2 Level',
        badgeClass: 'bg-purple-600 text-white',
        title: 'Frenchify A2 Intensive Program',
        desc: "Already mastered the basics and completed A1? Now it's time to deepen your skills, expand your French knowledge with real-life language learning inputs.",
        cta: 'Know More',
      },
      {
        href: '/b1-intensive-program',
        img: IMG.b1i,
        alt: 'B1 TEF Program',
        badge: 'B1 Level',
        badgeClass: 'bg-green-600 text-white',
        title: 'Frenchify B1 TEF Program',
        desc: 'Strengthen advanced grammar, expand vocabulary, and elevate all four TEF modules—Reading, Listening, Speaking, and Writing—with targeted practice and structured guidance.',
        cta: 'Know More',
      },
      {
        href: '/b2-intensive-program',
        img: IMG.b2i,
        alt: 'B2 TEF Program',
        badge: 'B2 Level',
        badgeClass: 'bg-yellow-600 text-white',
        title: 'Frenchify B2 TEF Program',
        desc: "The 'All-In' —where strategy meets fluency for exam-specific preparation: mastering formats, perfecting timing, and practicing with real exam type questions to ace your test.",
        cta: 'Know More',
      },
    ],
    selfStudy: [
      {
        href: '/a1-selfstudy-program',
        img: IMG.a1s,
        alt: 'A1 Self-Study Program',
        badge: 'A1 Level',
        badgeClass: 'bg-brand-blue text-white',
        title: 'Frenchify A1 Self-Study Program',
        desc: 'If you are just starting out, our Frenchify A1 Self-Study Program is built for busy learners who want structure, strategy, and serious results without live sessions, at their own pace.',
        cta: 'Enroll Now',
      },
      {
        href: '/a2-selfstudy-program',
        img: IMG.a2s,
        alt: 'A2 Self-Study Program',
        badge: 'A2 Level',
        badgeClass: 'bg-purple-600 text-white',
        title: 'Frenchify A2 Self-Study Program',
        desc: 'If you have built a strong foundation of A1 level syllabus, our Frenchify A2 Self-Study Program is a second step for our busy learners who want to continue diving deeper in the language, without live sessions, at their own pace.',
        cta: 'Enroll Now',
      },
    ],
  },
  tcf: {
    id: 'tcf',
    exam: 'TCF Canada',
    short: 'TCF',
    tagline: 'Equally accepted by IRCC — prep tuned to the TCF format.',
    heroBody:
      'The full TCF Canada journey — the same structured path from beginner to B2, with exam prep built around the TCF format, question types, and timing.',
    intensive: [
      {
        href: '/a1-intensive-program',
        img: IMG.a1i,
        alt: 'A1 Intensive Program',
        badge: 'A1 Level',
        badgeClass: 'bg-brand-blue text-white',
        title: 'Frenchify A1 Intensive Program',
        desc: 'New to French? This is your starting point. Build a solid foundation and kickstart your TCF Canada journey with our step-by-step A1 French Program—perfect for absolute beginners.',
        cta: 'Know More',
      },
      {
        href: '/a2-intensive-program',
        img: IMG.a2i,
        alt: 'A2 Intensive Program',
        badge: 'A2 Level',
        badgeClass: 'bg-purple-600 text-white',
        title: 'Frenchify A2 Intensive Program',
        desc: "Already mastered the basics and completed A1? Now it's time to deepen your skills, expand your French knowledge with real-life language learning inputs.",
        cta: 'Know More',
      },
      {
        href: '/b1-intensive-program',
        img: IMG.b1i,
        alt: 'B1 TCF Program',
        badge: 'B1 Level',
        badgeClass: 'bg-green-600 text-white',
        title: 'Frenchify B1 TCF Program',
        desc: 'Strengthen advanced grammar, expand vocabulary, and elevate all four TCF modules—Reading, Listening, Speaking, and Writing—with targeted practice and structured guidance.',
        cta: 'Know More',
      },
      {
        href: '/b2-intensive-program',
        img: IMG.b2i,
        alt: 'B2 TCF Program',
        badge: 'B2 Level',
        badgeClass: 'bg-yellow-600 text-white',
        title: 'Frenchify B2 TCF Program',
        desc: "The 'All-In' —where strategy meets fluency for exam-specific preparation: mastering the TCF format, perfecting timing, and practicing with real exam type questions to ace your test.",
        cta: 'Know More',
      },
    ],
    selfStudy: [
      {
        href: '/a1-selfstudy-program',
        img: IMG.a1s,
        alt: 'A1 Self-Study Program',
        badge: 'A1 Level',
        badgeClass: 'bg-brand-blue text-white',
        title: 'Frenchify A1 Self-Study Program',
        desc: 'If you are just starting out, our Frenchify A1 Self-Study Program is built for busy learners who want structure, strategy, and serious results without live sessions, at their own pace.',
        cta: 'Enroll Now',
      },
      {
        href: '/a2-selfstudy-program',
        img: IMG.a2s,
        alt: 'A2 Self-Study Program',
        badge: 'A2 Level',
        badgeClass: 'bg-purple-600 text-white',
        title: 'Frenchify A2 Self-Study Program',
        desc: 'If you have built a strong foundation of A1 level syllabus, our Frenchify A2 Self-Study Program is a second step for our busy learners who want to continue diving deeper in the language, without live sessions, at their own pace.',
        cta: 'Enroll Now',
      },
    ],
  },
};
