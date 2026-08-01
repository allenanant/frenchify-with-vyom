import { promises as fs } from 'fs';
import path from 'path';
import Script from 'next/script';

export const metadata = {
  title: 'Frenchify with Vyom A1 Level',
  description:
    'Start Your French Journey with A1. Build your French foundation the right way — grammar, pronunciation and daily practice structured to get you exam-ready faster than you think.',
};

const TAILWIND_CONFIG = `
  tailwind.config = {
    theme: {
      extend: {
        colors: { brand: { blue: '#2563eb', 'blue-deep': '#1d4ed8', amber: '#f59e0b', ink: '#252525' } },
        fontFamily: {
          sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
          display: ['Sora', 'Inter', 'ui-sans-serif', 'system-ui'],
        },
      }
    }
  }
`;

const HIDE_FOOTER_CSS = `
  body > footer { display: none !important; }
  @media (prefers-reduced-motion: reduce) {
    .reveal { opacity: 1 !important; transform: none !important; }
  }
`;

// If the IntersectionObserver misses elements (fragment deep-links scroll
// past sections before observers register), reveal whatever is still hidden.
const REVEAL_FAILSAFE =
  ";setTimeout(function(){document.querySelectorAll('.reveal:not(.in)').forEach(function(el){el.classList.add('in')})},1500);";

export default async function A1NewCourseV2Page() {
  const sourcePath = path.join(process.cwd(), 'app', 'a1-course', '_source.html');
  const html = await fs.readFile(sourcePath, 'utf-8');

  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
  const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
  // Last <script> block = the page JS (reveal observers, magnetic hover).
  // A single lazy match from the FIRST <script> swallows the whole document
  // and the injected blob dies on a syntax error, leaving every .reveal
  // element invisible — the blank-page bug.
  const scriptBlocks = Array.from(html.matchAll(/<script>([\s\S]*?)<\/script>/g));
  const scriptMatch = scriptBlocks[scriptBlocks.length - 1];

  const bodyHtml = bodyMatch ? bodyMatch[1] : '';
  const styleContent = styleMatch ? styleMatch[1] : '';
  const scriptContent = scriptMatch ? scriptMatch[1] : '';

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap"
        rel="stylesheet"
      />
      <Script id="tw-config" strategy="beforeInteractive">{TAILWIND_CONFIG}</Script>
      <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      <style dangerouslySetInnerHTML={{ __html: HIDE_FOOTER_CSS + styleContent }} />
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      <Script id="a1-page-js" strategy="afterInteractive">{scriptContent + REVEAL_FAILSAFE}</Script>
    </>
  );
}
