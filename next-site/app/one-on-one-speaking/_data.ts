// Content mirrored from the GoHighLevel "TEF Mentorship" page that previously
// served frenchifywithvyom.com/one-on-one-speaking.
// Calendar IDs are the live GHL calendars - each one is the same booking flow
// the GHL page embedded, just loaded on demand instead of all 18 at once.

export type Session = {
  /** GHL calendar id - embeds as api.leadconnectorhq.com/widget/booking/<id> */
  calendarId?: string;
  /** Full booking URL, for newer calendars GHL only exposes by slug
   * (/widget/bookings/<slug>). Wins over calendarId when both are set. */
  bookingUrl?: string;
  /** Minutes, as configured on the calendar itself */
  duration: number;
  label: string;
  /** Live amount charged by the GHL calendar (read from the widget, Aug 2026).
   * GHL remains the source of truth - the calendar shows the real total at checkout. */
  price?: string;
  note?: string;
};

export type Mentor = {
  slug: string;
  name: string;
  photo: string;
  /** Short line shown under the name in the mentor grid */
  specialty: string;
  /** CLB band as written on the mentor's calendar description */
  clb?: string;
  clearedNote?: string;
  blurb: string;
  sessions: Session[];
};

const MEDIA =
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_640/u_https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media";

export const mentors: Mentor[] = [
  {
    slug: "ashish-kohli",
    name: "Ashish Kohli",
    photo: `${MEDIA}/6a32671a5408771d1634c5df.png`,
    specialty: "Strategic TEF Guidance",
    clb: "CLB 10 · 8 · 7 · 7",
    clearedNote: "Cleared in 1st attempt",
    blurb:
      "Ashish has an amazing hold of the language, so you can take his guidance on structure, pronunciation and the areas holding your score back.",
    sessions: [
      {
        calendarId: "W20Kb0Qqm0K8UaDK3kcG",
        price: "CA$10.99",
        duration: 30,
        label: "30 Mins One-on-One Speaking",
      },
      {
        bookingUrl:
          "https://api.leadconnectorhq.com/widget/bookings/ashish-kohli-30-mins-one-on-ontauq45",
        price: "CA$16.99",
        duration: 45,
        label: "45 Mins One-on-One Speaking",
      },
    ],
  },
  {
    slug: "wafaa-mansuri",
    name: "Wafaa Mansuri",
    photo: `${MEDIA}/69df78f9109243d2ccf97897.png`,
    specialty: "Strategic TEF Guidance",
    clb: "CLB 12 · 11 · 7 · 8",
    blurb:
      "Come prepared with monologues or Section A depending on your level, or choose to do on-the-spot speaking practice in the session.",
    sessions: [
      {
        calendarId: "BbOeSdN3XT4Nr0w9gej7",
        price: "CA$10.99",
        duration: 30,
        label: "30 Mins One-on-One Speaking",
      },
      {
        calendarId: "5kazedY7sVhYtysZEkOD",
        price: "CA$17.99",
        duration: 50,
        label: "50 Mins One-on-One Speaking",
      },
    ],
  },
  {
    slug: "darshil-ashawa",
    name: "Darshil Ashawa",
    photo: `${MEDIA}/698a37fda41b87d3021df22a.png`,
    specialty: "Cleared in 1st Attempt",
    clb: "CLB 9 · 9 · 7 · 8",
    clearedNote: "Cleared December 2025",
    blurb:
      "A focused session to sharpen your speaking for TEF / TCF Canada, with feedback you can act on straight away.",
    sessions: [
      {
        calendarId: "RhdeR6e3xKhfGNJAWCXf",
        price: "CA$10.99",
        duration: 30,
        label: "30 Mins Speaking Session",
      },
      {
        calendarId: "nHYxc0uDePCShBPMbwYe",
        price: "CA$17.99",
        duration: 50,
        label: "50 Mins Speaking Session",
      },
    ],
  },
  {
    slug: "rajan-gurjar",
    name: "Rajan Gurjar",
    photo: `${MEDIA}/698cc13f5cec6ca7d09cb2b2.png`,
    specialty: "Cleared in 1st Attempt",
    clb: "CLB 9 · 11 · 8 · 7",
    blurb:
      "Prepare your monologues or Section A / Section B beforehand so Rajan can give you proper feedback on structure and pronunciation.",
    sessions: [
      {
        calendarId: "T5Ddra0eBJHPMFRa9nlS",
        price: "CA$11.99",
        duration: 30,
        label: "30 Mins One-on-One Speaking",
      },
      {
        calendarId: "1PfDCPTpveVy2tQMFkXp",
        price: "CA$18.99",
        duration: 50,
        label: "50 Mins One-on-One Speaking",
      },
    ],
  },
  {
    slug: "jay-patel",
    name: "Jay Patel",
    photo: `${MEDIA}/698a37fd0708e455aec9723a.png`,
    specialty: "Strategic Guidance",
    clb: "CLB 8 · 7 · 7 · 8",
    blurb:
      "Bring a prepared topic or practise on the spot. You will get feedback on structure, pronunciation and overall improvement areas.",
    sessions: [
      {
        calendarId: "HpE6rvPo3CTbef7nFRpg",
        price: "CA$15.99",
        duration: 30,
        label: "30 Mins One-on-One Speaking",
      },
      {
        calendarId: "TiUDPL4qRE0fHSHxiZso",
        price: "CA$23.99",
        duration: 50,
        label: "50 Mins One-on-One Speaking",
      },
    ],
  },
  {
    slug: "tapas-rastogi",
    name: "Tapas Rastogi",
    photo: `${MEDIA}/698cc13f715cda6682a1b128.png`,
    specialty: "Strong hold of language",
    clb: "CLB 8 · 7 · 9 · 8",
    clearedNote: "Cleared November 2025",
    blurb:
      "A focused one-on-one to sharpen your speaking for TEF / TCF Canada, built around where your score is actually losing marks.",
    sessions: [
      {
        calendarId: "VfM62xqyHWqoD1ti5l3p",
        price: "CA$11.99",
        duration: 30,
        label: "30 Mins Speaking Session",
      },
      {
        calendarId: "rtzRlVO7bwJQpa9ZIlxw",
        price: "CA$17.99",
        duration: 50,
        label: "50 Mins Speaking Session",
      },
    ],
  },
  {
    slug: "manpreet-kaur",
    name: "Manpreet Kaur",
    photo: `${MEDIA}/698b5b8667d7491cfd572eb4.png`,
    specialty: "Top Score from Frenchify",
    clb: "CLB 11 · 12 · 8 · 9",
    blurb:
      "The highest TEF score from a Frenchify student. Prepare your monologues or Section A / B beforehand, or practise on the spot.",
    sessions: [
      {
        calendarId: "ThwWmLxidsAi3furketf",
        price: "CA$11.99",
        duration: 25,
        label: "25 Mins One-on-One Speaking",
      },
      {
        calendarId: "Xazvl6pI2pjIO5SiI0lJ",
        price: "CA$18.99",
        duration: 50,
        label: "50 Mins One-on-One Speaking",
      },
    ],
  },
  {
    slug: "harleen-kaur",
    name: "Harleen Kaur",
    photo: `${MEDIA}/698a1fd867d749129b19c343.png`,
    specialty: "2/3 years of experience",
    blurb:
      "Harleen has cleared the TEF and is here to help you do the same. Focused speaking practice with feedback on flow and delivery.",
    sessions: [
      {
        calendarId: "eQPXbs1tnEt8ebOjHHbQ",
        price: "CA$14.99",
        duration: 30,
        label: "30 Mins Speaking Session",
      },
      {
        calendarId: "dADOJYFGviJJAbay0q16",
        price: "CA$19.99",
        duration: 45,
        label: "45 Mins Speaking Practice",
      },
    ],
  },
  {
    slug: "darshan-patel",
    name: "Darshan Patel",
    photo: `${MEDIA}/698a1fd87305aaa783fd6d3b.png`,
    specialty: "2/3 years of experience",
    blurb:
      "Darshan has cleared the TEF and is here to help you do the same. Bring a topic, or practise one on the spot.",
    sessions: [
      {
        calendarId: "K3HmqVCP45BRidyvZ4Ou",
        price: "CA$15.99",
        duration: 25,
        label: "25 Mins Speaking Session",
      },
      {
        calendarId: "AmW3zMx26J7wa7rCgrVX",
        price: "CA$25.99",
        duration: 45,
        label: "45 Mins Speaking Session",
      },
    ],
  },
];

export const bookingSteps = [
  "Choose your instructor from the booking page",
  "Select your preferred duration (25-50 minutes)",
  "Pick an available time slot from the calendar",
  "Confirm your booking and payment",
  "You will receive an email with the meeting link to join",
];

export const levels = [
  {
    level: "A2",
    title: "A2 Students (Start Early)",
    body: [
      "You can start booking sessions from A2 level, recommended after completing 60% of the A2 course and speaking assignments.",
      "Prepare 1 topic before the session, speak on it, and receive feedback on pronunciation, flow and structure. Do another on the spot if there is time.",
    ],
  },
  {
    level: "B1",
    title: "B1 Students (TEF Section A Practice)",
    body: [
      "At B1 level, sessions are ideal for Section A speaking prompts and monologue practice to build exam confidence.",
    ],
  },
  {
    level: "B2",
    title: "B2 Students (Full TEF Simulation)",
    body: [
      "At B2 level, sessions help you practise both Section A and Section B roleplays with CLB 9/10 level feedback.",
    ],
  },
];

export const faqs = [
  {
    q: "Is this only for Frenchify students?",
    a: "Yes. These sessions are exclusively for active Frenchify students. If an outsider books, the session will be canceled without refund.",
  },
  {
    q: "What happens if I miss my session?",
    a: "Missed sessions are not refundable. Please be present and on time.",
  },
  {
    q: "Can I reschedule my session?",
    a: "Rescheduling is not available once booked. In special cases, it may be possible with an additional fee.",
  },
  {
    q: "How do I pay for these sessions?",
    a: "The best method is credit card payment through the booking page. You may also pay via e-transfer to frenchifyfee@gmail.com.",
  },
  {
    q: "Can I book the same time slot every week?",
    a: "Time slots cannot be guaranteed. Availability changes weekly, so we recommend booking in advance.",
  },
  {
    q: "Can I book multiple sessions in advance?",
    a: "Yes. You may book multiple sessions ahead of time to ensure availability.",
  },
  {
    q: "Are these sessions private or group sessions?",
    a: "These are fully one-on-one private speaking sessions, not group classes.",
  },
  {
    q: "Will I receive a recording of the session?",
    a: "No. Frenchify does not provide recordings. You may record the session on your own device.",
  },
  {
    q: "What should I prepare before joining?",
    a: "Come with one speaking topic ready, or be prepared to do an on-the-spot topic for practice.",
  },
];
