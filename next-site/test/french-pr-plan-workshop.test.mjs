import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';

const html = readFileSync(new URL('../public/french-pr-plan.html', import.meta.url), 'utf8');
const workshop = html.match(/<template id="workshop-template">([\s\S]*?)<\/template>/)?.[1];
const resultsCode = html.slice(html.indexOf('function finish(p){'), html.indexOf('/* save the lead (Jotform'));

test('the workshop callout is an inert template until the quiz renders results', () => {
  assert.ok(workshop);
  assert.match(workshop, /href="\/webinar-form\/"[^>]*>Register for the Free Workshop/);
  assert.match(workshop, /Build Your 10-Month TEF\/TCF Roadmap/);
  assert.doesNotMatch(html.replace(workshop, ''), /Register for the Free Workshop/);
  assert.match(html, /<div id="result" aria-live="polite"><\/div>/);
});

for (const codes of [false, true]) {
  test(`results include one workshop link after the personalized result (checkout codes: ${codes})`, () => {
    const result = { innerHTML: '', querySelectorAll: () => [], scrollIntoView() {} };
    const change = {};
    const quiz = { style: {} };
    const gate = { style: {} };
    const scriptScope = {
      res: result,
      qwrap: quiz,
      gate,
      esc: (value) => String(value),
      offerParts: () => ({ o: { codes, test: true }, nx: [], sv: [] }),
      STEPS: () => ['existing checkout instructions'],
      STEPS_CODE: () => ['existing checkout instructions'],
      PAY: 'test@example.com',
      document: { getElementById: (id) => ({ 'workshop-template': { innerHTML: workshop }, chg: change })[id] },
      render() {},
      toTop() {},
      cur: 1,
    };
    runInNewContext(`${resultsCode}\nfinish({path:['A1','A2'], rows:[['Level','Beginner']]});`, scriptScope);
    assert.equal((result.innerHTML.match(/href="\/webinar-form\/"/g) || []).length, 1);
    assert.ok(result.innerHTML.indexOf('YOUR ANSWERS') < result.innerHTML.indexOf('FREE LIVE WORKSHOP WITH VYOM'));
    assert.match(result.innerHTML, /existing checkout instructions/);
    assert.equal(quiz.style.display, 'none');
    assert.equal(gate.style.display, 'none');
    change.onclick();
    assert.equal(result.innerHTML, '');
    assert.equal(quiz.style.display, '');
  });
}
