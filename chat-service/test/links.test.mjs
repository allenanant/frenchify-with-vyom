import assert from 'node:assert/strict';
import test from 'node:test';
import { resolveLinks } from '../src/links.mjs';

test('only approved links leave the service', () => {
  assert.deepEqual(resolveLinks(['course_a1', 'https://evil.example', 'course_a1', 'consultation']), [
    { label: 'Read about A1', url: 'https://frenchifywithvyom.com/a1-course/' },
    { label: 'Book a consultation', url: 'https://frenchifywithvyom.com/book-a-meet/' },
  ]);
});

test('consultation requests exclude the students-only mentorship link', () => {
  assert.deepEqual(
    resolveLinks(['consultation', 'student_mentorship', 'contact'], {
      visitorMessage: 'I want to book a consultation. Where can I do that?',
    }),
    [
      { label: 'Book a consultation', url: 'https://frenchifywithvyom.com/book-a-meet/' },
      { label: 'Contact Frenchify', url: 'https://frenchifywithvyom.com/contact/' },
    ]
  );
});

test('the mentorship link remains available for explicit student requests', () => {
  assert.deepEqual(
    resolveLinks(['student_mentorship'], {
      visitorMessage: 'I am already a Frenchify student and need to book mentorship.',
    }),
    [
      {
        label: 'Book student mentorship',
        url: 'https://frenchifywithvyom.com/student-meetings-calendar/',
      },
    ]
  );
});
