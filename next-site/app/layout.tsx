import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/motion/ScrollProgress';
import FloatingLeadButton from '@/components/FloatingLeadButton';
import ChromeGate from '@/components/ChromeGate';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Frenchify - Master French Fluency',
    template: '%s | Frenchify',
  },
  description:
    'Learn French & clear TEF/TCF Canada exam with step-by-step methodologies. Become fluent in under 12 months with Frenchify with Vyom.',
  // The GoHighLevel-hosted wordmark is a 2580x702 PNG weighing 2.1 MB, and it
  // was being served as the favicon on every page of the site. These are the
  // same mark, cropped and palette-compressed: 4.7 KB and 18 KB.
  icons: {
    icon: '/brand/icon-32.png',
    apple: '/brand/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <head>
        <link rel="preconnect" href="https://api.leadconnectorhq.com" />
        <link rel="preconnect" href="https://link.msgsndr.com" />
        <link rel="dns-prefetch" href="https://api.leadconnectorhq.com" />
        <link rel="dns-prefetch" href="https://link.msgsndr.com" />
      </head>
      <body className="antialiased">
        <ChromeGate zone="header">
          <ScrollProgress />
          <Header />
        </ChromeGate>
        <main>{children}</main>
        <ChromeGate zone="footer">
          <Footer />
        </ChromeGate>
        <ChromeGate zone="cta">
          <FloatingLeadButton />
        </ChromeGate>
      </body>
    </html>
  );
}
