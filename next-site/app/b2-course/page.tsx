import { promises as fs } from 'fs';
import path from 'path';
import Script from 'next/script';

export const metadata = {
  title: 'Frenchify with Vyom B2 Level',
  description:
    'Reach your highest score in TEF/TCF Canada with B2. Targeted, exam-focused preparation with intensive mock tests, personalized mentorship, and advanced grammar clarity.',
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
`;

export default async function B2NewCourseV2Page() {
  const sourcePath = path.join(process.cwd(), 'app', 'b2-course', '_source.html');
  const html = await fs.readFile(sourcePath, 'utf-8');

  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
  const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
  const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>\s*<\/body>/);

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
      <Script id="b2-page-js" strategy="afterInteractive">{scriptContent}</Script>
    </>
  );
}
