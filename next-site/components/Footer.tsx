import Link from 'next/link';
import Image from 'next/image';
import { Mail, MessageCircle, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0a1426] text-gray-300 px-6 pt-14 pb-6 lg:pb-14 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1c2e4a] via-[#101f3a] to-[#050b18]" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-[50%] blur-3xl bg-amber-300/[0.10]" />
        <div className="absolute -bottom-44 -right-32 w-[520px] h-[520px] rounded-full blur-3xl bg-brand-blue/15" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
      </div>

      <div className="relative max-w-[1170px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          <div className="col-span-2 md:col-span-2">
            {/* Reversed mark. The primary logo is navy on navy down here and
                all but disappears — see public/footer-logo-light.webp. */}
            <Image
              src="/footer-logo-light.webp"
              alt="Frenchify with Vyom Inc."
              width={225}
              height={63}
              className="h-11 w-auto mb-5"
            />
            <p className="text-sm leading-relaxed max-w-md">
              Helping students master French for Canadian immigration success. Specialized training for TEF and TCF Canada exam preparation.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wide">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/courses" className="hover:text-white transition-colors">All Courses</Link></li>
              <li><Link href="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/testimonials" className="hover:text-white transition-colors">Testimonials</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms &amp; Conditions</Link></li>
              <li><Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wide">Contact</h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-brand-amber shrink-0 mt-0.5" />
                <span>
                  <a
                    href="https://wa.me/14388131377"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    +1 438-813-1377
                  </a>
                  <span className="block text-xs text-gray-400">WhatsApp, text only</span>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-brand-amber shrink-0 mt-0.5" />
                <a href="mailto:admin@frenchifywithvyom.com" className="hover:text-white transition-colors break-all">
                  admin@frenchifywithvyom.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-brand-amber shrink-0 mt-0.5" />
                <span>Monday to Friday, 9am&ndash;5pm IST</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-amber shrink-0 mt-0.5" />
                <span>Canada</span>
              </li>
            </ul>
            <Link
              href="/contact"
              className="inline-block mt-4 text-sm font-medium text-brand-amber hover:text-white transition-colors"
            >
              Contact us &rarr;
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-7 text-center text-sm">
          <p>&copy; {year} Frenchify with Vyom. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
