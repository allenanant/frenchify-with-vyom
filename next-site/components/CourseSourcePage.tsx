import { promises as fs } from 'fs';
import path from 'path';
import CourseInteractions, { MAGNETIC_CTAS } from './CourseInteractions';

/**
 * Renders one of the level pages (/a1-course … /b2-course) from the standalone
 * HTML it was authored as. All four used to carry their own copy of this
 * extraction logic, which is how the same blank-page bug shipped four times.
 *
 * What comes out of the source file:
 *   - every <style> block, inlined
 *   - the <body>, inlined
 *   - nothing else. The inline <script> is re-implemented in
 *     CourseInteractions so it survives client-side navigation.
 */

/** The source pages carry their own footer, so the site footer stands down. */
const CHROME_CSS = `
  body > footer { display: none !important; }
`;

/**
 * The source CSS ships `.reveal { opacity: 0 }` and waits for JS to add `.in`.
 * On its own that is a page-wide kill switch: if the script is missing, late,
 * duplicated or throws, every section stays invisible and only a hard reload
 * appears to fix it. Scoping the hidden state to `html.js-reveal` — a class
 * only CourseInteractions sets, and only once it is actually running — makes
 * visible the default and animation the enhancement.
 */
const REVEAL_GUARD_CSS = `
  html:not(.js-reveal) .reveal { opacity: 1 !important; transform: none !important; }
  @media (prefers-reduced-motion: reduce) {
    .reveal { opacity: 1 !important; transform: none !important; }
  }
`;

/**
 * The source <style> blocks ask for 'Inter' and 'Sora' by name. next/font in
 * the root layout exposes them under generated family names, so the pages need
 * the webfont link to keep the typography they were designed with.
 */
const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap';

export async function loadCourseSource(slug: string) {
  const file = path.join(process.cwd(), 'app', slug, '_source.html');
  const html = await fs.readFile(file, 'utf-8');

  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/)?.[1] ?? '';

  // Every <style>, not just the first — a page that grows a second block
  // should not silently lose it.
  const styles = Array.from(html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g))
    .map((m) => m[1])
    .join('\n');

  // Scripts inside dangerouslySetInnerHTML never execute, so leaving them in
  // ships ~2 KB of dead code and misleads anyone reading the DOM.
  const content = body.replace(/<script[\s\S]*?<\/script>/gi, '');

  return { content, styles };
}

export default async function CourseSourcePage({
  slug,
  magneticSelector = MAGNETIC_CTAS,
}: {
  slug: string;
  magneticSelector?: string;
}) {
  const { content, styles } = await loadCourseSource(slug);

  return (
    <>
      <link href={FONTS_HREF} rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: CHROME_CSS + styles + REVEAL_GUARD_CSS }} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <CourseInteractions magneticSelector={magneticSelector} />
    </>
  );
}
