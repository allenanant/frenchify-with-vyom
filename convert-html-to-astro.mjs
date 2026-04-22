// One-off conversion script: convert raw GHL HTML pages to Astro pages.
// Run with: node convert-html-to-astro.mjs
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('.');
const PAGES_DIR = path.join(ROOT, 'src', 'pages');

const MAPPING = [
  ['Testimonials page.html', 'testimonials.astro'],
  ['a1-course-renewal.html', 'a1-course-renewal.astro'],
  ['a1-intensive-program.html', 'a1-intensive-program.astro'],
  ['a1-level-analysis-test.html', 'a1-level-analysis-test.astro'],
  ['a1-selfstudy-program.html', 'a1-selfstudy-program.astro'],
  ['a2-course-renewal.html', 'a2-course-renewal.astro'],
  ['a2-intensive-program.html', 'a2-intensive-program.astro'],
  ['a2-selfstudy-program.html', 'a2-selfstudy-program.astro'],
  ['about-us.html', 'about-us.astro'],
  ['analysis-page.html', 'analysis-page.astro'],
  ['b1-intensive-program.html', 'b1-intensive-program.astro'],
  ['b1-selfstudy-program.html', 'b1-selfstudy-program.astro'],
  ['b2-intensive-program.html', 'b2-intensive-program.astro'],
  ['contact.html', 'contact.astro'],
  ['faq.html', 'faq.astro'],
  ['frenchify-beginner-program.html', 'frenchify-beginner-program.astro'],
  ['newsletter.html', 'newsletter.astro'],
  ['one-on-one-speaking.html', 'one-on-one-speaking.astro'],
  ['programs.html', 'programs.astro'],
  ['refund-policy.html', 'refund-policy.astro'],
  ['results-page.html', 'results-page.astro'],
  ['student-meetings-calendar.html', 'student-meetings-calendar.astro'],
  ['sunday webinar.html', 'sunday-webinar.astro'],
  ['tef-canada-exam.html', 'tef-canada-exam.astro'],
  ['terms-and-conditions.html', 'terms-and-conditions.astro'],
  ['width-cracker-home.html', 'width-cracker-home.astro'],
];

// URL path replacements from absolute frenchifywithvyom.com links -> local paths
const URL_PATH_MAP = [
  ['/frenchify_beginner_program', '/frenchify-beginner-program'],
  ['/frenchify-beginner-program', '/frenchify-beginner-program'],
  ['/a1_intensive_program', '/a1-intensive-program'],
  ['/a2_intensive_program', '/a2-intensive-program'],
  ['/b1_intensive_program', '/b1-intensive-program'],
  ['/b2_intensive_program', '/b2-intensive-program'],
  ['/a1_selfstudy_program', '/a1-selfstudy-program'],
  ['/a2_selfstudy_program', '/a2-selfstudy-program'],
  ['/b1_selfstudy_program', '/b1-selfstudy-program'],
  ['/a1_course_renewal', '/a1-course-renewal'],
  ['/a2_course_renewal', '/a2-course-renewal'],
  ['/tef_canada_exam', '/tef-canada-exam'],
  ['/tef-canada-exam', '/tef-canada-exam'],
  ['/sunday_webinar', '/sunday-webinar'],
  ['/sunday-webinar', '/sunday-webinar'],
  ['/one_on_one_speaking', '/one-on-one-speaking'],
  ['/student_meetings_calendar', '/student-meetings-calendar'],
  ['/a1_level_analysis_test', '/a1-level-analysis-test'],
  ['/faqs-8903', '/faq'],
  ['/book-online', '/contact'],
  ['/home', '/'],
  ['/programs', '/programs'],
  ['/about-us', '/about-us'],
  ['/results-page', '/results-page'],
  ['/testimonials', '/testimonials'],
  ['/analysis-page', '/analysis-page'],
  ['/privacy-policy', '/privacy-policy'],
  ['/terms-and-conditions', '/terms-and-conditions'],
  ['/refund-policy', '/refund-policy'],
  ['/newsletter', '/newsletter'],
];

// Duplicate styles that already live in global.css — strip these from page-level <style>
const DUPLICATE_STYLE_PATTERNS = [
  /@import\s+url\(['"]https:\/\/fonts\.googleapis\.com\/css2\?family=Inter[^)]*\);?/gi,
  /\*\s*\{\s*box-sizing:\s*border-box;?\s*\}/gi,
  /html\s*\{\s*scroll-behavior:\s*smooth;?[^}]*\}/gi,
  /body\s*\{[^}]*font-family:\s*['"]Inter['"][^}]*\}/gi,
  /\.gradient-text\s*\{[^}]*\}/gi,
  /\.hero-pattern\s*\{[^}]*\}/gi,
  /\.ghl-row\s*\{[^}]*\}/gi,
  /\.ghl-row-faq\s*\{[^}]*\}/gi,
  /\.ghl-row-full\s*\{[^}]*\}/gi,
  // Full-bleed rule alone
  /\.full-bleed-section-ghl\s*\{[^}]*\}/gi,
  // GHL funnel wrapper comments (leave content alone)
  /\/\*\s*GHL funnel wrapper[^*]*\*\//gi,
  /\/\*\s*GHL Container Break Fix[^*]*\*\//gi,
  /\/\*\s*GHL container overrides[^*]*\*\//gi,
  /\/\*\s*Force ALL ancestors[^*]*\*\//gi,
];

// GHL-specific selector tokens — if any of these appear in a rule's selector list,
// the whole rule is GHL-only and can be dropped.
const GHL_SELECTOR_TOKENS = [
  'hl_page',
  'row-container',
  'container-fluid',
  'col-lg-12',
  'col-md-12',
  'col-sm-12',
  'col-xs-12',
  'section_wrapper',
  'inner-container',
  'pshot-page',
  '#preview-container',
  '#section-0',
  '.ghl_wrapper',
  '.c-editor',
  '.page-preview',
  '[class*="hl_page"]',
  '[class*="section_"]',
  '[class*="col-"]',
];

// (stripGHLRules is now implemented by the generic stripRulesIf below)

function rewriteUrls(html) {
  // Replace absolute frenchifywithvyom.com URLs with local paths (but NOT learn.* subdomain)
  // Handle both with and without trailing slash.
  html = html.replace(/https:\/\/frenchifywithvyom\.com(\/[A-Za-z0-9_\-]+)/g, (match, p) => {
    for (const [from, to] of URL_PATH_MAP) {
      if (p === from) return to;
    }
    return p; // fall back to leaving the path as-is (no domain)
  });
  // Root https://frenchifywithvyom.com/ -> /
  html = html.replace(/https:\/\/frenchifywithvyom\.com\/?(?![A-Za-z0-9_\-])/g, '/');
  return html;
}

function extractTitle(html) {
  const m = html.match(/<title>([\s\S]*?)<\/title>/i);
  return m ? m[1].trim() : 'Frenchify';
}

function extractStyles(html) {
  // Extract all <style>...</style> blocks (not tailwind config scripts)
  const styles = [];
  const re = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    styles.push(m[1]);
  }
  return styles.join('\n');
}

// Classes that already live in global.css — if a whole rule targets ONLY these
// selectors (plus variants like `.x *`, `.x,` etc.), drop it entirely.
const GLOBAL_DUP_CLASSES = [
  'full-bleed-section-ghl',
  'ghl-row',
  'ghl-row-faq',
  'ghl-row-full',
  'gradient-text',
  'hero-pattern',
];

// Returns true if a selector list (everything before the `{`) is composed ENTIRELY
// of duplicates-of-global selectors — then we can drop the rule.
function selectorListIsAllGlobalDup(selectorList) {
  const parts = selectorList
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
  if (parts.length === 0) return false;
  return parts.every(p => {
    // Strip trailing `*`, `:hover`, etc. — we only check the base class
    const base = p.replace(/\s*\*\s*$/, '').trim();
    return GLOBAL_DUP_CLASSES.some(cls => base === '.' + cls);
  });
}

function cleanStyles(css) {
  let out = css;
  // First, drop any CSS rule that targets GHL-only selectors or only global-dup
  // classes (these rules may have comma-joined selector lists).
  out = stripRulesIf(out, (selector) => {
    const sLower = selector.toLowerCase();
    const isAtRule = selector.trim().startsWith('@');
    if (isAtRule) return false;
    if (GHL_SELECTOR_TOKENS.some(tok => sLower.includes(tok.toLowerCase()))) return true;
    if (selectorListIsAllGlobalDup(selector)) return true;
    return false;
  });
  // Then drop the smaller duplicate-of-global rules by regex (simple `body`, `html`, etc.)
  for (const re of DUPLICATE_STYLE_PATTERNS) {
    out = out.replace(re, '');
  }
  // Remove orphaned comments that became empty, collapse whitespace
  out = out.replace(/\/\*\s*\*\//g, '');
  out = out.replace(/\n\s*\n\s*\n+/g, '\n\n');
  return out.trim();
}

// Generic rule walker. Drops rules whose selector passes `shouldDrop(selector)`.
function stripRulesIf(css, shouldDrop) {
  const out = [];
  let i = 0;
  const n = css.length;
  while (i < n) {
    if (css[i] === '/' && css[i + 1] === '*') {
      const end = css.indexOf('*/', i + 2);
      if (end === -1) break;
      out.push(css.slice(i, end + 2));
      i = end + 2;
      continue;
    }
    const braceIdx = css.indexOf('{', i);
    if (braceIdx === -1) {
      out.push(css.slice(i));
      break;
    }
    let depth = 1;
    let j = braceIdx + 1;
    while (j < n && depth > 0) {
      if (css[j] === '{') depth++;
      else if (css[j] === '}') depth--;
      j++;
    }
    const selector = css.slice(i, braceIdx);
    const ruleBody = css.slice(braceIdx, j);
    if (shouldDrop(selector)) {
      // drop
    } else {
      out.push(selector + ruleBody);
    }
    i = j;
  }
  return out.join('');
}

function extractBody(html) {
  const m = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!m) return '';
  return m[1];
}

function stripBlock(body, startRegex, endTag) {
  // Find start, then balanced end
  const start = body.search(startRegex);
  if (start === -1) return body;
  // Find matching closing tag. For <header>, <footer>, <div>, <a>, we assume non-nested
  const rest = body.slice(start);
  const closeRe = new RegExp(`</${endTag}>`, 'i');
  const cm = rest.match(closeRe);
  if (!cm) return body;
  const endIdx = start + cm.index + cm[0].length;
  return body.slice(0, start) + body.slice(endIdx);
}

function stripHeaderFooter(body) {
  // Remove <header>...</header>
  body = body.replace(/<header[\s\S]*?<\/header>/i, '');
  // Remove <footer>...</footer>
  body = body.replace(/<footer[\s\S]*?<\/footer>/i, '');
  // Remove yellow notice bar: <a ...bg-yellow-500...>...</a> that mentions Beginner Program
  body = body.replace(/<a[^>]*bg-yellow-500[\s\S]*?<\/a>/i, '');
  // Remove blue WhatsApp bar: <div ...bg-blue-600...>...<a href="https://wa.me/...</div>
  // Match a <div> containing both bg-blue-600 and wa.me as WhatsApp text-bar (not deeper content blocks)
  body = body.replace(/<div[^>]*class="[^"]*bg-blue-600[^"]*"[^>]*>\s*<a[^>]*href="https:\/\/wa\.me\/[^"]*"[\s\S]*?<\/a>\s*<\/div>/gi, '');
  return body;
}

// Boundary-aware: iterate over ALL <script>...</script> blocks, drop those that match
// any of the GHL / duplicate patterns. External-src scripts (with src=) are kept.
function stripGHLScripts(body) {
  const dropPatterns = [
    // Width-cracker
    /\(function\s*\(\)\s*\{\s*var\s+el\s*=\s*document\.body[\s\S]*?\}\)\(\)/,
    // killPadding
    /function\s+killPadding/,
    // Walks .full-bleed-section-ghl
    /full-bleed-section-ghl[\s\S]*?parentElement/,
    // Layout duplicate: header shadow on scroll
    /getElementById\(['"]header['"]\)[\s\S]*?shadow-md/,
    // Layout duplicate: mobile menu toggle
    /mobileMenuBtn[\s\S]*?classList[\s\S]*?scale-y/,
    // Layout duplicate: smooth scroll anchors
    /querySelectorAll\(['"]a\[href\^="#"\]['"]\)/,
  ];
  return body.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (full, attrs, code) => {
    // Keep all src-attributed scripts untouched
    if (/\bsrc\s*=/.test(attrs)) return full;
    for (const re of dropPatterns) {
      if (re.test(code)) return '';
    }
    return full;
  }).replace(/<style[^>]*>\s*<\/style>/gi, '').replace(/<script[^>]*>\s*<\/script>/gi, '');
}

function extractPageScripts(body) {
  // Pull remaining inline scripts (page-specific) out into array of code bodies,
  // and strip them from body. External-src scripts stay in place with is:inline.
  const scripts = [];
  body = body.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (full, attrs, code) => {
    if (/\bsrc\s*=/.test(attrs)) {
      // External script — keep in body, add is:inline if not present
      if (!/is:inline/.test(attrs)) {
        return `<script${attrs} is:inline>${code}</script>`;
      }
      return full;
    }
    // Inline script — extract to scripts array
    const trimmed = code.trim();
    if (trimmed) scripts.push(trimmed);
    return '';
  });
  return { body, scripts };
}

function addIsInlineToIframes(body) {
  // Astro doesn't strictly need this for iframes, but some GHL widget iframes
  // have unusual attribute quoting. No-op for now.
  return body;
}

function escapeCurlyBracesInText(body) {
  // Astro treats `{` inside markup as an expression. We need to escape any stray
  // curly braces in text content that aren't valid JSX. This is defensive only —
  // we specifically target patterns like "{{ }}" or standalone "{" in text.
  // Simpler strategy: replace `{{` with `&#123;&#123;` and `}}` with `&#125;&#125;`.
  body = body.replace(/\{\{/g, '&#123;&#123;');
  body = body.replace(/\}\}/g, '&#125;&#125;');
  return body;
}

function convertOne(srcFile, outFile) {
  const html = fs.readFileSync(srcFile, 'utf8');
  const title = extractTitle(html);
  const rawStyles = extractStyles(html);
  const cleanedStyles = cleanStyles(rawStyles);

  let body = extractBody(html);
  body = stripHeaderFooter(body);
  body = stripGHLScripts(body);

  // Rewrite URLs AFTER header/footer removal so we don't waste work
  body = rewriteUrls(body);

  // Remove any stray <style> tags inside body (we already extracted styles from head)
  body = body.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

  const { body: cleanedBody, scripts: pageScripts } = extractPageScripts(body);
  let finalBody = addIsInlineToIframes(cleanedBody);
  finalBody = escapeCurlyBracesInText(finalBody);

  // Trim leading/trailing whitespace/comments
  finalBody = finalBody.trim();

  const parts = [];
  parts.push('---');
  parts.push("import Layout from '../layouts/Layout.astro';");
  parts.push('---');
  parts.push('');

  // Special marker for width-cracker page
  if (outFile === 'width-cracker-home.astro') {
    parts.push('<!-- legacy GHL test page — candidate for deletion -->');
  }

  parts.push(`<Layout title=${JSON.stringify(title)}>`);
  parts.push(finalBody);
  if (pageScripts.length > 0) {
    parts.push('');
    parts.push('  <script slot="scripts" is:inline>');
    parts.push(pageScripts.join('\n\n'));
    parts.push('  </script>');
  }
  if (cleanedStyles) {
    parts.push('');
    parts.push('  <style is:global>');
    parts.push(cleanedStyles);
    parts.push('  </style>');
  }
  parts.push('</Layout>');
  parts.push('');

  return parts.join('\n');
}

// Run
let successes = 0;
const failures = [];
for (const [srcName, outName] of MAPPING) {
  const srcPath = path.join(ROOT, srcName);
  const outPath = path.join(PAGES_DIR, outName);
  if (!fs.existsSync(srcPath)) {
    failures.push({ file: srcName, err: 'source missing' });
    continue;
  }
  try {
    const content = convertOne(srcPath, outName);
    fs.writeFileSync(outPath, content, 'utf8');
    successes++;
    console.log(`OK ${srcName} -> ${outName}`);
  } catch (e) {
    failures.push({ file: srcName, err: e.message });
    console.log(`FAIL ${srcName}: ${e.message}`);
  }
}
console.log(`\n${successes} ok, ${failures.length} failed`);
if (failures.length) console.log(failures);
