import { cn } from '@/lib/cn';

/**
 * The only footer the funnel pages get. The marketing footer offers seven ways
 * off the page — courses, about, testimonials, a phone number — and on paid
 * traffic every one of those is a click that was bought and then spent
 * somewhere that cannot convert. Legal stays because it has to; nothing else
 * earns its place.
 *
 * Plain anchors rather than next/link: Link prefetches the route payload for
 * three pages the visitor is not meant to open, on a page held to a 1.2 MB
 * budget. Trailing slashes match `trailingSlash: true`, so no redirect hop.
 */

const LEGAL = [
  { href: '/privacy-policy/', label: 'Privacy Policy' },
  { href: '/terms-and-conditions/', label: 'Terms & Conditions' },
  { href: '/refund-policy/', label: 'Refund Policy' },
];

export default function FunnelFooter({ className }: { className?: string }) {
  return (
    <footer className={cn('w-full border-t border-fnl-line bg-fnl-surface', className)}>
      <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center gap-4 px-5 py-10 text-center md:flex-row md:justify-between md:px-8 md:text-left">
        <p className="text-[15px] leading-[1.5] text-fnl-mute">
          © {new Date().getFullYear()} Frenchify with Vyom Inc. All rights reserved.
        </p>
        <nav aria-label="Legal" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {LEGAL.map((item) => (
            <a
              key={item.href}
              href={item.href}
              /* py-2.5 gets these to a 44px tap target. They were 23px, which
                 is a miss on the one set of links that has to stay reachable
                 for legal reasons. */
              className="inline-flex items-center py-2.5 text-[15px] leading-[1.5] text-fnl-mute transition-colors duration-[120ms] hover:text-fnl-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
