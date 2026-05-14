import Link from 'next/link';
import Image from 'next/image';
import { Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-slate-800 via-blue-950 to-slate-900 text-gray-400 px-6 pt-14 pb-6 lg:pb-14 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-32 w-[620px] h-[620px] rounded-full blur-3xl bg-amber-200/25" />
        <div className="absolute -bottom-32 -right-32 w-[460px] h-[460px] rounded-full blur-3xl bg-brand-blue/30" />
      </div>

      <div className="relative max-w-[1170px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          <div className="col-span-2 md:col-span-2">
            <Image
              src="/footer-logo.png"
              alt="Frenchify Logo"
              width={200}
              height={50}
              className="h-10 w-auto mb-5"
            />
            <p className="text-sm leading-relaxed max-w-md">
              Helping students master French for Canadian immigration success. Specialized training for TEF Canada exam preparation.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wide">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/programs" className="hover:text-white transition-colors">All Courses</Link></li>
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
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-green-400" />
                <a href="https://wa.me/15147265114" className="hover:text-white transition-colors">514-726-5114</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-amber" />
                <a href="mailto:frenchifyfee@gmail.com" className="hover:text-white transition-colors break-all">frenchifyfee@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-7 text-center text-sm">
          <p>&copy; {year} Frenchify with Vyom. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
