'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/cn';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/programs', label: 'Courses' },
  { href: '/announcements', label: 'Announcements' },
  { href: '/about-us', label: 'About Us' },
  { href: '/results-page', label: 'Results' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/faq', label: 'FAQs' },
  { href: '/contact', label: 'Book a Meet' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => pathname === path || pathname === path + '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      id="header"
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out',
        scrolled
          ? 'bg-white/85 backdrop-blur-xl border-b border-gray-200/60 shadow-[0_10px_30px_-15px_rgba(30,58,138,0.12)]'
          : 'bg-white/70 backdrop-blur-md border-b border-gray-100/80'
      )}
    >
      <nav className="flex justify-between items-center px-6 py-4 max-w-[1170px] mx-auto">
        <Link href="/" className="flex items-center">
          <Image
            src="https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/681356df3176b96f4b69c47b.png"
            alt="Frenchify Logo"
            width={160}
            height={36}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <ul className="hidden xl:flex items-center space-x-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'relative px-4 py-2 rounded-full font-medium text-sm transition-all duration-300',
                  isActive(link.href)
                    ? 'text-brand-blue bg-blue-50'
                    : 'text-gray-600 hover:text-brand-blue hover:bg-blue-50/70'
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-0 rounded-full bg-blue-50 -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <a
          href="https://learn.frenchifywithvyom.com/web/"
          className="hidden xl:inline-flex items-center bg-brand-blue text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-brand-blue-deep hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_rgba(37,99,235,0.55)] shadow-[0_8px_20px_-6px_rgba(37,99,235,0.4)] transition-all duration-300"
        >
          Student Portal
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="xl:hidden text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-all"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'top' }}
            className="xl:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl mt-2 mx-4 overflow-hidden border border-gray-100"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'block px-5 py-3.5 font-medium transition-all',
                  isActive(link.href)
                    ? 'text-brand-blue bg-blue-50'
                    : 'text-gray-600 hover:text-brand-blue hover:bg-blue-50'
                )}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://learn.frenchifywithvyom.com/web/"
              className="block mx-4 my-3 py-3 bg-brand-blue text-white font-semibold text-center rounded-xl hover:bg-brand-blue-deep transition-all"
            >
              Student Portal
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
