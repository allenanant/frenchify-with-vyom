import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import Tilt from '@/components/motion/Tilt';
import Magnetic from '@/components/motion/Magnetic';
import FloatingOrbs from '@/components/motion/FloatingOrbs';
import ReviewsEmbed from '@/components/sections/testimonials/ReviewsEmbed';

export const metadata = {
  title: 'Testimonials - Frenchify',
  description:
    'Real stories and results from learners who transformed their French skills with Frenchify.',
};

type VideoTestimonial = {
  name: string;
  location: string;
  src: string;
  quote: string;
};

const videoTestimonials: VideoTestimonial[] = [
  {
    name: 'Harleen Kaur',
    location: 'Toronto, ON',
    src: 'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/688519f4b8876823a8e18d3c.mp4',
    quote:
      '"With all his guidance and remarks, I scored 7 in speaking, 8 in listening, 9 in reading and 10 in writing in TEF Canada exam and this helped me to increase my CRS score for Canadian PR."',
  },
  {
    name: 'Parmeet Singh',
    location: 'Toronto, ON',
    src: 'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/688519f46d2fd3019fb8adc8.mp4',
    quote:
      '"I notice the difference that I have got, a lot of motivation and amazing community which always kept me going."',
  },
  {
    name: 'Bismanjit Singh',
    location: 'Vancouver, BC',
    src: 'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/688519f4a9387ed5495d6a25.mp4',
    quote:
      '"Vyom and Frenchify has been very helpful throughout and that has helped me a lot in staying consistent and accountable."',
  },
  {
    name: 'Achintya Mishra',
    location: 'Toronto, ON',
    src: 'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/688519f46d2fd3a629b8adc9.mp4',
    quote:
      '"My experience with Vyom has been a very wonderful journey, the best thing is the flexibility and the way of teaching. As an Indian student on work permit, he makes it achievable to get a PR."',
  },
  {
    name: 'Shivya Kakkar',
    location: 'Toronto, ON',
    src: 'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/688519f45468fc1cb4e9e695.mp4',
    quote:
      '"I found the Frenchify programs to be very learnable... Everything in the courses are put in with efforts so you can easily refer back to anything you get confused in. Thank you for providing such a great community."',
  },
  {
    name: 'Selena Diaz',
    location: 'Barrie, ON',
    src: 'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/688519f4a9387e32e05d6a23.mp4',
    quote:
      '"I wanted better job opportunities... what I like about this course is the flexibility of learning. Vyom also has Q&A sessions, tests and everything is done from basics."',
  },
  {
    name: 'Jeni Francis',
    location: ' ',
    src: 'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/688519f493322425174513c0.mp4',
    quote:
      '"It\'s been very comfortable learning in weekly classes with Vyom. The ease of learning with the strategy that Vyom tells is crazy."',
  },
];

export default function TestimonialsPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-white full-bleed-section-ghl relative overflow-hidden aurora-bg">
        <FloatingOrbs variant="soft" />
        <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              What Our Students Are <span className="gradient-text">Saying</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Real stories and results from learners who transformed their French skills with Frenchify.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Review Widget Section */}
      <section className="py-16 md:py-20 full-bleed-section-ghl">
        <div className="ghl-row-full mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-gray-900 text-center mb-12 tracking-tight">
              Our Reviews on Trustpilot
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div
              className="premium-card bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg"
              style={{ maxWidth: 1080, marginLeft: 'auto', marginRight: 'auto' }}
            >
              <ReviewsEmbed />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-16 md:py-20 bg-white full-bleed-section-ghl">
        <div className="ghl-row-full mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-gray-900 text-center mb-12 tracking-tight">
              Hear Directly From Our Students
            </h2>
          </Reveal>
          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videoTestimonials.map((t) => (
              <Tilt key={t.name} max={5}>
                <div className="premium-card bg-gray-50 rounded-2xl shadow-md overflow-hidden flex flex-col h-full">
                  <video controls className="w-full">
                    <source src={t.src} type="video/mp4" />
                  </video>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-display font-bold text-lg text-gray-800 tracking-tight">{t.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{t.location}</p>
                    <blockquote className="italic text-gray-600 flex-grow">{t.quote}</blockquote>
                  </div>
                </div>
              </Tilt>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-20 bg-gray-800 text-white full-bleed-section-ghl">
        <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-bold mb-4 tracking-tight">
              Ready to Start Your Own Success Story?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-gray-300 mb-8">
              Join hundreds of successful students and achieve your French language goals. Explore our programs today.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Magnetic>
              <Link href="/programs" className="btn-primary">
                Explore Our Courses
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
