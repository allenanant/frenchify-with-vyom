import HomeV2Page, { metadata as homeV2Metadata } from './home-v2/page';

export const metadata = homeV2Metadata;

// Re-render every 10 min so the Black Friday top bar switches off on time
// (lib/promo.ts). Must sit in this file: Next reads it from the route itself.
export const revalidate = 600;

export default function HomePage() {
  return <HomeV2Page />;
}
