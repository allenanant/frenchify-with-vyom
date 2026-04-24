'use client';

import Link from 'next/link';
import { Calendar, Target, MessagesSquare, BookOpen } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import Magnetic from '@/components/motion/Magnetic';

const benefits = [
  { Icon: Target, title: 'Personalized Assessment', copy: 'Get your current French level evaluated and receive a customized learning plan' },
  { Icon: MessagesSquare, title: 'Expert Guidance', copy: 'Speak directly with our experienced French instructors about your goals' },
  { Icon: BookOpen, title: 'Program Recommendations', copy: 'Discover which Frenchify program is perfect for your timeline and objectives' },
];

export default function BookACallSection() {
  return (
    <section className="py-20 full-bleed-section-ghl relative overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <Reveal>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Ready to Start Your French Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Book a consultation call with our French learning experts. Get personalized guidance, learn about our programs, and discover how we can help you achieve your French language goals.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
            <Magnetic>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-brand-blue hover:bg-brand-blue-deep text-white font-semibold px-8 py-4 rounded-full shadow-[0_14px_30px_-10px_rgba(37,99,235,0.55)] hover:shadow-[0_20px_40px_-12px_rgba(37,99,235,0.65)] transform hover:-translate-y-1 transition-all duration-300"
              >
                <Calendar className="w-5 h-5" />
                Book Consultation
              </Link>
            </Magnetic>
          </div>
        </Reveal>

        <Stagger className="grid md:grid-cols-3 gap-8 mt-12">
          {benefits.map(({ Icon, title, copy }) => (
            <div key={title} className="premium-card p-7 text-left">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center text-brand-blue mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 leading-relaxed">{copy}</p>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
