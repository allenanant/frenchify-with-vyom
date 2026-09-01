import assert from 'node:assert/strict';
import test from 'node:test';
import { resolveLinks } from '../src/links.mjs';

test('only approved links leave the service', () => {
  assert.deepEqual(resolveLinks(['course_a1', 'https://evil.example', 'course_a1', 'consultation']), [
    { label: 'Read about A1', url: 'https://frenchifywithvyom.com/a1-course/' },
    { label: 'Book a consultation', url: 'https://frenchifywithvyom.com/book-a-meet/' },
  ]);
});
