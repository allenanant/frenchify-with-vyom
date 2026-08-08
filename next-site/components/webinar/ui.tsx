import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * The entire visual vocabulary of the paid webinar funnel. Four pages share
 * these primitives and nothing else — no cards, gradients, shadows or motion
 * wrappers from the marketing site cross over. That is the whole point: the
 * funnel drifted into five different looks when each page carried its own
 * styling, and a high-trust free offer reads as cheap the moment it does.
 *
 * Server components throughout. Nothing here needs state, so nothing here
 * should cost the visitor a hydration payload.
 */

const SECTION_TONE = {
  white: 'bg-fnl-surface',
  alt: 'bg-fnl-surface-alt',
  ink: 'bg-fnl-ink-bg',
} as const;

/**
 * A new idea is signalled by a surface change or a hairline rule, never by a
 * gradient. `ink` is punctuation: the landing page gets exactly two.
 */
export function Section({
  tone = 'white',
  id,
  className,
  children,
}: {
  tone?: keyof typeof SECTION_TONE;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn('w-full', SECTION_TONE[tone], className)}>
      <div className="mx-auto w-full max-w-[1120px] px-5 py-14 md:px-8 md:py-24">{children}</div>
    </section>
  );
}

/**
 * Sora is loaded at 500-800 only, so `font-black` faux-bolds into a synthetic
 * smear. 800 is the ceiling on every display heading in the funnel.
 */
export function H2({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <h2
      id={id}
      className={cn(
        'font-display text-[26px] font-extrabold leading-[1.1] tracking-[-0.015em] text-fnl-ink md:text-[40px]',
        className
      )}
    >
      {children}
    </h2>
  );
}

/** The sentence under a heading. Measure is the caller's job — cap it at 640. */
export function Lead({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p className={cn('text-[17px] leading-[1.55] text-fnl-body md:text-[19px]', className)}>
      {children}
    </p>
  );
}

/** Eyebrows and field labels. Same type as Chip, so the two always agree. */
export function Label({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p
      className={cn(
        'text-[12px] font-semibold uppercase leading-[1.2] tracking-[0.08em] text-fnl-mute',
        className
      )}
    >
      {children}
    </p>
  );
}

/** No shadow, by default and by rule. Depth comes from the hairline alone. */
export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn('rounded-[14px] border border-fnl-line bg-fnl-surface p-6', className)}>
      {children}
    </div>
  );
}

const CTA_VARIANT = {
  primary: 'bg-fnl-primary text-white hover:bg-fnl-primary-press',
  // Blue on navy is unreadable, so the button inverts on the two ink bands.
  onInk: 'bg-fnl-surface text-fnl-primary-press hover:bg-fnl-surface-alt',
} as const;

/**
 * Always a real anchor, never a router push. Meta forwards its click ids on the
 * query string from the landing page into /webinar-form/ and on into the GHL
 * iframe; a JS navigation drops the string and the conversion goes unattributed.
 */
export function Cta({
  href,
  variant = 'primary',
  className,
  children,
}: {
  href: string;
  variant?: keyof typeof CTA_VARIANT;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={cn(
        'inline-flex w-full items-center justify-center rounded-[10px] px-7 py-4 text-[16px] font-semibold leading-none transition-colors duration-[120ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fnl-primary focus-visible:ring-offset-2 sm:w-auto',
        CTA_VARIANT[variant],
        className
      )}
    >
      {children}
    </a>
  );
}

export function Chip({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-fnl-line bg-fnl-surface-alt px-3 py-1.5 text-[12px] font-semibold uppercase leading-[1.2] tracking-[0.08em] text-fnl-mute',
        className
      )}
    >
      {children}
    </span>
  );
}

export function Divider({ className }: { className?: string }) {
  return <hr className={cn('border-0 border-t border-fnl-line', className)} />;
}
