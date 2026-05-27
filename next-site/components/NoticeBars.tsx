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
    </>
  );
}
