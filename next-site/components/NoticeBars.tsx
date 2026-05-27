import Link from 'next/link';

export default function NoticeBars() {
  return (
    <>
      <a
        href="https://frenchifywithvyom.com/tef-success--clarity-call"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-[69px] left-0 right-0 bg-gradient-to-r from-brand-blue via-brand-blue-deep to-brand-blue text-white text-center py-2 px-[15px] text-sm font-semibold z-40 hover:from-brand-blue-deep hover:to-brand-blue-deep transition-all duration-300 flex items-center justify-center gap-2 group"
      >
        <span>Click here to get a clarity call with us</span>
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </a>
      <Link
        href="/frenchify-beginner-program"
        className="fixed top-[105px] left-0 right-0 bg-brand-amber text-gray-900 text-center py-2 px-[15px] text-sm font-semibold z-40 hover:bg-amber-600 transition-all duration-300"
      >
        🎓 Frenchify Beginner Program Available for Free (Worth $150) — Sign up <span className="underline">Here</span> (Spots are limited)
      </Link>
    </>
  );
}
