import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  CreditCard,
  Mail,
  ShieldCheck,
} from 'lucide-react';

export const metadata = {
  title: 'Register for the A2 Analysis Test | Frenchify with Vyom',
  description:
    'Email Frenchify and send the $25 CAD e-transfer to register for your A2 Analysis Test with Harleen.',
};

const ADMIN_EMAIL = 'admin@frenchifywithvyom.com';
const ETRANSFER_EMAIL = 'frenchifyfee@gmail.com';
const REGISTRATION_EMAIL = `mailto:${ADMIN_EMAIL}?subject=A2%20Analysis%20Test%20Registration`;

export default function A2AnalysisRegistrationPage() {
  return (
    <div className="min-h-screen bg-[#f7f3ea] px-6 pb-16 pt-[116px] text-slate-900 md:pb-24 md:pt-[148px]">
      <div className="mx-auto max-w-4xl">
        <a
          href="/a2-analysis-test/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-violet-700"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to A2 test details
        </a>

        <section className="relative mt-8 overflow-hidden rounded-[2rem] border border-violet-200 bg-white p-6 shadow-[0_24px_70px_rgba(76,29,149,0.12)] md:p-10">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violet-200/50 blur-3xl" aria-hidden />
          <span
            aria-hidden
            className="absolute left-1/2 top-0 h-7 w-24 -translate-x-1/2 -translate-y-1/2 -rotate-2 bg-amber-100/90 shadow-sm"
          />

          <div className="relative text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-violet-700">
              <BadgeCheck className="h-4 w-4" aria-hidden />
              A2 Analysis Test Registration
            </div>
            <h1 className="font-display mx-auto mt-5 max-w-2xl text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Register in two simple steps
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
              Email the Frenchify team and send your test fee by e-transfer. We will match your
              payment with your registration and confirm the scheduling next step.
            </p>
            <div className="mt-5 inline-flex items-end gap-2 rounded-xl bg-slate-950 px-5 py-3 text-white">
              <span className="font-display text-3xl font-bold">$25</span>
              <span className="pb-1 text-sm font-semibold text-slate-300">CAD</span>
            </div>
          </div>

          <div className="relative mt-9 grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-violet-200 bg-violet-50/70 p-6">
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-violet-700 shadow-sm">
                  <Mail className="h-5 w-5" aria-hidden />
                </span>
                <span className="font-display text-sm font-bold text-violet-300">01</span>
              </div>
              <h2 className="font-display mt-5 text-xl font-bold text-slate-950">Email us to register</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Send an email with your full name and mention that you are registering for the A2
                Analysis Test.
              </p>
              <a
                href={REGISTRATION_EMAIL}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-700 px-5 py-3.5 text-center text-sm font-bold text-white transition hover:bg-violet-800"
              >
                Email {ADMIN_EMAIL}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </article>

            <article className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6">
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                  <CreditCard className="h-5 w-5" aria-hidden />
                </span>
                <span className="font-display text-sm font-bold text-emerald-300">02</span>
              </div>
              <h2 className="font-display mt-5 text-xl font-bold text-slate-950">Send the $25 CAD fee</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Open your banking app and send a $25 CAD e-transfer to:
              </p>
              <div className="mt-5 rounded-xl border border-emerald-200 bg-white px-4 py-4 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.13em] text-emerald-700">E-transfer email</p>
                <p className="mt-2 break-all text-base font-bold text-slate-950">{ETRANSFER_EMAIL}</p>
              </div>
            </article>
          </div>

          <div className="relative mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 md:p-6">
            <h2 className="font-display text-lg font-bold text-slate-950">Help us match your payment</h2>
            <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-700 sm:grid-cols-2">
              <li className="flex gap-2">
                <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-700" aria-hidden />
                Use the same full name in your email and e-transfer.
              </li>
              <li className="flex gap-2">
                <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-700" aria-hidden />
                Write “A2 Analysis Test” in the e-transfer message.
              </li>
            </ul>
          </div>

          <div className="relative mt-6 flex items-start gap-3 rounded-2xl bg-slate-950 p-5 text-white md:p-6">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-violet-300" aria-hidden />
            <div>
              <h2 className="font-display font-bold">What happens next?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Once your registration email and e-transfer are received, the Frenchify team will
                reply with confirmation and the next step for scheduling your assessment with Harleen.
              </p>
            </div>
          </div>

          <p className="relative mt-6 text-center text-xs leading-5 text-slate-500">
            Need help before paying? Email{' '}
            <a className="font-semibold text-violet-700 underline underline-offset-4" href={`mailto:${ADMIN_EMAIL}`}>
              {ADMIN_EMAIL}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

