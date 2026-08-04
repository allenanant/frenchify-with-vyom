import type { Metadata } from "next";

const WRITING_PORTAL_URL =
  "https://frenchify-writing-practice.vyomfrenchify.chatgpt.site/";

export const metadata: Metadata = {
  title: "TEF & TCF Writing Submissions | Frenchify with Vyom",
  description:
    "Submit TEF or TCF Canada writing for detailed, exam-focused feedback through the Frenchify Student Writing Portal.",
  alternates: {
    canonical: "https://www.frenchifywithvyom.com/writingsubmissions/",
  },
};

export default function WritingSubmissionsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f5f7fa]">
      <div className="absolute inset-0 grid place-items-center px-6 text-center text-[#122a46]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d45358]">
            Frenchify with Vyom
          </p>
          <h1 className="mt-3 font-serif text-3xl font-bold">
            Opening your writing portal…
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            If it does not load, use the secure portal link below.
          </p>
          <a
            className="mt-5 inline-flex rounded-lg bg-[#122a46] px-4 py-2 text-sm font-bold text-white"
            href={WRITING_PORTAL_URL}
          >
            Open writing portal
          </a>
        </div>
      </div>

      <iframe
        allow="clipboard-write"
        className="relative z-10 h-[100dvh] w-full border-0 bg-[#f5f7fa]"
        referrerPolicy="strict-origin-when-cross-origin"
        src={WRITING_PORTAL_URL}
        title="Frenchify Student Writing Portal"
      />
    </main>
  );
}
