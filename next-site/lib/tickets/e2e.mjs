/**
 * End-to-end test for the student support desk.
 *
 * Drives a real browser against a running Next server wired to a real Postgres,
 * so it exercises the same code path a student and a staff member actually
 * take. Not a unit test: the point is to catch the things that only break when
 * the browser, the Server Actions and the database are all in play at once.
 *
 *   npm run dev                     # in one terminal, with .env.local present
 *   node lib/tickets/e2e.mjs        # in another
 *
 * Environment:
 *   BASE         defaults to http://127.0.0.1:3000
 *   SETUP_KEY    SUPPORT_SETUP_SECRET, only needed on a desk with no accounts
 *   ADMIN_EMAIL  the staff account to sign in as
 *   ADMIN_PASS   its password
 *   SHOT         path to any PNG or JPEG to attach as the screenshot
 *   SHOT_DIR     where to drop the screenshots this test takes (optional)
 *
 * It creates a real ticket. Run it against a scratch database, or delete the
 * ticket afterwards.
 */
import { chromium } from 'playwright';

const BASE = process.env.BASE || 'http://127.0.0.1:3000';
const SETUP_KEY = process.env.SETUP_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASS = process.env.ADMIN_PASS;
const SHOT = process.env.SHOT;
const OUT = process.env.SHOT_DIR;

let pass = 0;
const fails = [];
const check = (name, ok, detail) => {
  if (ok) { pass++; console.log(`  ok    ${name}`); }
  else { fails.push(name + (detail ? ` — ${detail}` : '')); console.log(`  FAIL  ${name}${detail ? ` — ${detail}` : ''}`); }
};
const shot = async (page, name) => {
  if (OUT) await page.screenshot({ path: `${OUT}/${name}`, fullPage: true }).catch(() => {});
};

const browser = await chromium.launch({ channel: 'chrome' });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
page.on('pageerror', (e) => console.log(`  [pageerror] ${e.message.split('\n')[0]}`));

let ref = null;

try {
  console.log('\nStudent raises a ticket');
  await page.goto(`${BASE}/student-support/`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);

  // The form must not depend on a scroll animation to become visible: it is
  // the only reason this page exists.
  check('form is visible without JS having to reveal it',
    await page.locator('form').first().isVisible());

  await page.fill('#student_name', 'Ananya Sharma');
  await page.fill('#student_email', 'ananya.sharma@example.com');
  await page.fill('#student_phone', '+91 98765 43210');
  await page.fill('#course', 'TEF Canada batch 4');
  await page.selectOption('#category', 'Course access or login');
  await page.fill('#subject', 'Cannot open week 3 videos on the portal');
  await page.fill('#description',
    'I sign in fine but week 3 shows a spinner forever and then says content unavailable. Tried Chrome and Safari.');

  await page.setInputFiles('#screenshots', SHOT);
  await page.waitForTimeout(2500);
  check('browser compressed and previewed the screenshot',
    await page.locator('form img').first().isVisible());
  console.log(`        stored size after browser compression: ${
    await page.locator('form li span').last().textContent().catch(() => '?')}`);

  await page.click('form button[type=submit]');
  await page.waitForURL('**/student-support/thanks/**', { timeout: 30000 });
  const body = await page.textContent('body');
  ref = (body.match(/FRN-\d{5,}/) || [])[0] || null;
  check('ticket accepted and a reference issued', !!ref, ref || 'no ref on page');
  check('receipt confirms it reached the team', body.includes('with the Frenchify team'));

  console.log('\nStaff sign in');
  await page.goto(`${BASE}/student-support/staff/login/`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1200);
  const onlyStaffUrl = (u) => /\/staff\/?$/.test(new URL(u).pathname);

  if ((await page.textContent('body')).includes('Set up the support desk')) {
    await page.fill('#secret', SETUP_KEY);
    await page.fill('#name', 'Test Admin');
    await page.fill('#email', ADMIN_EMAIL);
    await page.fill('#password', ADMIN_PASS);
  } else {
    await page.fill('#email', ADMIN_EMAIL);
    await page.fill('#password', ADMIN_PASS);
  }
  await page.click('form button[type=submit]');
  await page.waitForURL(onlyStaffUrl, { timeout: 30000 });
  check('signed in', !page.url().includes('login'));

  console.log('\nQueue');
  await page.goto(`${BASE}/student-support/staff/`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1200);
  const queue = await page.textContent('body');
  check('new ticket is in the queue', queue.includes(ref), ref);
  check('queue shows the student name', queue.includes('Ananya Sharma'));
  check('marketing header is stripped from the desk', !queue.includes('Student Portal'));

  console.log('\nTicket detail');
  await page.click(`a[href*="/staff/ticket/"]:has-text("${ref}")`);
  await page.waitForURL('**/student-support/staff/ticket/**', { timeout: 30000 });
  await page.waitForTimeout(1200);
  const detail = await page.textContent('body');
  check('shows the student email', detail.includes('ananya.sharma@example.com'));
  check('shows the phone number', detail.includes('+91 98765 43210'));
  check('offers a WhatsApp route', (await page.locator('a[href*="wa.me/919876543210"]').count()) > 0);
  check('offers a mailto route', (await page.locator('a[href^="mailto:ananya"]').count()) > 0);

  const img = page.locator('img[src^="/api/support/files/"]').first();
  check('screenshot is embedded', (await img.count()) > 0);
  await img.scrollIntoViewIfNeeded();
  // Wait for the decode rather than a fixed timeout: the thumbnails are
  // lazy-loaded, so measuring naturalWidth early proves nothing.
  const natural = await img.evaluate((el) => new Promise((res) => {
    if (el.complete && el.naturalWidth) return res(el.naturalWidth);
    el.addEventListener('load', () => res(el.naturalWidth), { once: true });
    el.addEventListener('error', () => res(0), { once: true });
    setTimeout(() => res(el.naturalWidth || 0), 8000);
  })).catch(() => 0);
  check('screenshot actually decodes in the browser', natural > 0, `naturalWidth ${natural}`);
  await shot(page, 'e2e-detail.png');

  console.log('\nWorking the ticket');
  await page.selectOption('#status', 'in_progress');
  await page.selectOption('#priority', 'high');
  await page.fill('#note', 'Called her, portal access is being reset now.');
  await page.click('section:has(#status) button[type=submit]');
  await page.waitForTimeout(4000);
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  let after = await page.textContent('body');
  check('note appears in the history', after.includes('Called her, portal access'));
  check('status change names both ends', /Status New to In progress/i.test(after));
  check('priority recorded', /Priority set to high/i.test(after));

  console.log('\nResolving');
  await page.selectOption('#status', 'resolved');
  await page.fill('#resolution_note', 'Portal access restored, she confirmed the videos play.');
  await page.click('section:has(#status) button[type=submit]');
  await page.waitForTimeout(4000);
  // Regression guard: a stale hidden version field used to make every second
  // save on a page fail, blaming a colleague who had not touched the ticket.
  check('no bogus conflict on a second save',
    !(await page.textContent('body')).includes('Someone else updated this ticket'));
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  after = await page.textContent('body');
  check('marks resolved', (await page.locator('span:has-text("Resolved")').count()) > 0);
  check('resolution summary saved', after.includes('Portal access restored'));
  check('records who resolved it', /Resolved/i.test(after));

  console.log('\nFilters');
  await page.goto(`${BASE}/student-support/staff/?status=open`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1200);
  check('gone from Open', !(await page.textContent('body')).includes(ref));
  await page.goto(`${BASE}/student-support/staff/?status=resolved`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1200);
  check('present in Resolved', (await page.textContent('body')).includes(ref));

  console.log('\nTeam page');
  await page.goto(`${BASE}/student-support/staff/team/`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1200);
  const team = await page.textContent('body');
  check('lists the admin', team.includes(ADMIN_EMAIL));
  check('shows the storage gauge', /Screenshot storage/i.test(team));
  const used = team.match(/([\d.]+) MB of (\d+) MB used \((\d+)%\)/);
  if (used) console.log(`        storage: ${used[1]} MB of ${used[2]} MB (${used[3]}%)`);
} catch (err) {
  fails.push('harness crashed: ' + err.message.split('\n')[0]);
  console.log(`\n  CRASH ${err.message.split('\n')[0]}`);
  await shot(page, 'e2e-crash.png');
}

await browser.close();
console.log(`\n${pass} passed, ${fails.length} failed`);
if (fails.length) { console.log('\nFailures:'); fails.forEach((f) => console.log('  - ' + f)); }
if (ref) console.log(`\nTest ticket created: ${ref}`);
process.exit(fails.length ? 1 : 0);
