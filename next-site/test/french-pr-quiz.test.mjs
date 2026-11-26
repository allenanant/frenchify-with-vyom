import assert from 'node:assert/strict';
import test from 'node:test';
import { randomUUID } from 'node:crypto';
import { getPlan, quizSteps, validateSubmission } from '../lib/french-pr-quiz.ts';
import { addFrenchifyContactNote, enrollFrenchifyContact, upsertFrenchifyContact } from '../lib/ghl-chat-lead.mjs';

const answers = { goal: 'pr', level: 'beginner', study: 'live', exam: 'none' };
const submission = { submissionId: randomUUID(), answers, name: '  Sample    Visitor ', email: 'SAMPLE@example.com' };

test('the permit question is conditional and only relevant answers are saved', () => {
  assert.deepEqual(quizSteps('pr'), ['goal', 'level', 'study', 'exam']);
  assert.deepEqual(quizSteps('both'), ['goal', 'level', 'permit', 'study', 'exam']);
  const clean = validateSubmission({ ...submission, answers: { ...answers, permit: 'expired' } });
  assert.equal(clean.value.name, 'Sample Visitor');
  assert.equal(clean.value.email, 'sample@example.com');
  assert.equal(clean.value.phone, '');
  assert.equal(clean.value.answers.permit, undefined);
  assert.ok(validateSubmission({ ...submission, answers: { ...answers, goal: 'both' } }).error);
});

test('recommendations adapt to the level, timeline, study preference and exam status', () => {
  const pr = getPlan(answers);
  assert.deepEqual(pr.path, ['A1 foundations', 'A2 French', 'B1 exam prep', 'Final exam prep']);
  assert.match(pr.format, /live class/);
  const permit = getPlan({ ...answers, goal: 'permit', level: 'a2Ready', permit: 'under3', study: 'flex', exam: 'booked' });
  assert.deepEqual(permit.path, ['A2 level test', 'CLB 5 prep']);
  assert.match(permit.timing, /early level check/);
  assert.match(permit.examAdvice, /booked exam date/);
  assert.match(permit.format, /self-paced/);
});

test('the form rejects fake options, invalid contact values, and honeypot activity', () => {
  assert.ok(validateSubmission({ ...submission, answers: { ...answers, level: 'toString' } }).error);
  assert.ok(validateSubmission({ ...submission, phone: '555 0123' }).error);
  assert.ok(validateSubmission({ ...submission, email: 'invalid' }).error);
  assert.ok(validateSubmission({ ...submission, website: 'spam' }).error);
  assert.ok(validateSubmission({ ...submission, submissionId: 'bogus' }).error);
});

test('the GHL upsert omits a blank phone and only changes submitted contact fields', async () => {
  await upsertFrenchifyContact({ name: 'Sample Visitor', email: 'sample@example.com', phone: '' }, { token: 'test' }, async (_, req) => {
    const body = JSON.parse(req.body);
    assert.deepEqual(Object.keys(body).sort(), ['email', 'locationId', 'name']);
    return Response.json({ contact: { id: 'test-contact', locationId: body.locationId } });
  });
});

test('notes and the notification require upstream confirmation', async () => {
  const config = { token: 'test', workflowId: 'test-workflow' };
  await addFrenchifyContactNote('contact-1', { title: 'Quiz', body: 'Result' }, config, async (url, req) => {
    assert.match(url, /\/contacts\/contact-1\/notes$/);
    assert.equal(req.headers.version, '2023-02-21');
    return Response.json({ note: { id: 'n1' } }, { status: 201 });
  });
  await assert.rejects(() => enrollFrenchifyContact('contact-1', config, async () => Response.json({ succeeded: false })));
  await assert.rejects(() => addFrenchifyContactNote('contact-1', { title: 'Quiz', body: 'Result' }, config, async () => Response.json({})));
});
