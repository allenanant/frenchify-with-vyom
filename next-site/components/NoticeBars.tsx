import Link from 'next/link';

export default function NoticeBars() {
  return (
    <>
      <Link
        href="/frenchify-beginner-program"
        className="fixed top-[69px] left-0 right-0 bg-brand-amber text-gray-900 text-center py-2 px-[15px] text-sm font-semibold z-40 hover:bg-amber-600 transition-all duration-300"
      >
        🎓 Frenchify Beginner Program Available for Free (Worth $150) — Sign up <span className="underline">Here</span> (Spots are limited)
      </Link>
      <div className="fixed top-[121px] md:top-[105px] left-0 right-0 bg-brand-blue text-white text-center py-2 px-[15px] text-sm font-semibold z-40">
        <a
          href="https://wa.me/15147265114"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-yellow-300 transition-all"
        >
          Ready to Start French for TEF? Connect on Whatsapp Text here
        </a>
      </div>
    </>
  );
}
