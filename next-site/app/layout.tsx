import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/motion/ScrollProgress';
import FloatingLeadButton from '@/components/FloatingLeadButton';

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
  icons: {
    icon: 'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/681356df3176b96f4b69c47b.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="antialiased">
        <ScrollProgress />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingLeadButton />
      </body>
    </html>
  );
}
