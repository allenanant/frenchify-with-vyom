export const LINKS = Object.freeze({
  courses: { label: 'See all courses', url: 'https://frenchifywithvyom.com/courses/' },
  courses_tef: { label: 'See TEF courses', url: 'https://frenchifywithvyom.com/courses/tef/' },
  courses_tcf: { label: 'See TCF courses', url: 'https://frenchifywithvyom.com/courses/tcf/' },
  course_a1: { label: 'Read about A1', url: 'https://frenchifywithvyom.com/a1-course/' },
  course_a2: { label: 'Read about A2', url: 'https://frenchifywithvyom.com/a2-course/' },
  exam_prep_tef: { label: 'Read about TEF Exam Prep', url: 'https://frenchifywithvyom.com/exam-prep-1-tef/' },
  tef_flex: { label: 'Read about FLEX', url: 'https://frenchifywithvyom.com/tef-canada-exam/' },
  analysis_test: { label: 'Book an Analysis Test', url: 'https://frenchifywithvyom.com/analysis-page/' },
  b1_pre_register: { label: 'Pre-register for B1', url: 'https://frenchifywithvyom.com/pre-register-for-b1/' },
  b2_pre_register: { label: 'Pre-register for B2', url: 'https://frenchifywithvyom.com/pre-register-for-b2/' },
  a1_renewal: { label: 'See A1 renewal options', url: 'https://frenchifywithvyom.com/a1-renewal/#pricing' },
  a1_free_renewal: { label: 'See free A1 renewal', url: 'https://frenchifywithvyom.com/a1-renewal/#free-renewal' },
  a2_renewal: { label: 'See A2 renewal options', url: 'https://frenchifywithvyom.com/a2-renewal/#pricing' },
  a2_free_renewal: { label: 'See free A2 renewal', url: 'https://frenchifywithvyom.com/a2-renewal/#free-renewal' },
  consultation: { label: 'Book a consultation', url: 'https://frenchifywithvyom.com/book-a-meet/' },
  student_mentorship: { label: 'Book student mentorship', url: 'https://frenchifywithvyom.com/student-meetings-calendar/' },
  one_on_one: { label: 'Book a one-on-one session', url: 'https://frenchifywithvyom.com/one-on-one-speaking/' },
  support: { label: 'Open student support', url: 'https://frenchifywithvyom.com/student-support/' },
  contact: { label: 'Contact Frenchify', url: 'https://frenchifywithvyom.com/contact/' },
  contact_form: { label: 'Send a general inquiry', url: 'https://forms.gle/cnrDQ4A1x6ivY7FW7' },
  free_course: { label: 'Start the free beginner course', url: 'https://learn.frenchifywithvyom.com/l/3f67c30cab' },
  webinar: { label: 'Join the free masterclass', url: 'https://frenchifywithvyom.com/sunday-webinar/' },
  faq: { label: 'Read the FAQs', url: 'https://frenchifywithvyom.com/faq/' },
  refund_policy: { label: 'Read the refund policy', url: 'https://frenchifywithvyom.com/refund-policy/' },
  whatsapp: { label: 'Message Frenchify on WhatsApp', url: 'https://wa.me/14388131377' }
});

export const LINK_KEYS = Object.freeze(Object.keys(LINKS));

export function resolveLinks(keys, { visitorMessage = '' } = {}) {
  const clean = [];
  const isConsultationRequest = /\bconsultations?\b/i.test(String(visitorMessage));
  for (const key of Array.isArray(keys) ? keys : []) {
    if (!Object.hasOwn(LINKS, key)) continue;
    if (isConsultationRequest && key === 'student_mentorship') continue;
    if (clean.some((item) => item.url === LINKS[key].url)) continue;
    clean.push(LINKS[key]);
    if (clean.length === 3) break;
  }
  return clean;
}
