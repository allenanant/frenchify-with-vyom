import Image from 'next/image';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import Tilt from '@/components/motion/Tilt';

type Feature = {
  img: string;
  alt: string;
  bubbleClass: string;
  title: string;
  desc: string;
};

const features: Feature[] = [
  {
    img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/8d5fd68c-95d1-4a13-aafa-fa9b3d536e2d.svg+xml',
    alt: 'Flexible Classes',
    bubbleClass: 'bg-brand-blue/10 ring-brand-blue/20',
    title: 'Flexible Classes',
    desc: 'Complete lectures & classes whenever you want, at your own pace, giving you complete flexibility and personalization.',
  },
  {
    img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/41748072-4524-40a8-8323-ea423cea898a.svg+xml',
    alt: 'Structured Approach',
    bubbleClass: 'bg-purple-100 ring-purple-200',
    title: 'Intense & Structured approach',
    desc: 'Syllabus covered at an intensive pace to save valuable time on Study/Work Permit. A step-by-step order of all topics to make the syllabus easy to consume.',
  },
  {
    img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/2d5697be-0037-43b6-bfe2-faedd6c2e99b.svg+xml',
    alt: 'Exam Focused',
    bubbleClass: 'bg-green-100 ring-green-200',
    title: 'Exam focused training',
    desc: 'Complete focus on the concepts/topics which are essential for the exams, right from the beginning.',
  },
];

export default function WhyFeaturesSection() {
  return (
    <section className="py-16 md:py-20 bg-gray-50 full-bleed-section-ghl">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Why Choose <span className="gradient-text">Frenchify Programs?</span>
            </h2>
          </div>
        </Reveal>

        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f) => (
            <Tilt key={f.title} max={5}>
              <div className="premium-card p-8 text-center h-full">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ring-1 ${f.bubbleClass}`}
                >
                  <Image
                    src={f.img}
                    alt={f.alt}
                    width={40}
                    height={40}
                    unoptimized
                    className="w-10 h-10"
                  />
                </div>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-3 tracking-tight">
                  {f.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            </Tilt>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
