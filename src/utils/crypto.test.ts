import { describe, expect, it } from 'vitest';
import {
  generateEmailsHelper,
  generateStringsHelper,
  generateUuidsHelper,
  md5,
} from './crypto';

describe('md5', () => {
  it('matches known hashes', () => {
    expect(md5('')).toBe('d41d8cd98f00b204e9800998ecf8427e');
    expect(md5('hello')).toBe('5d41402abc4b2a76b9719d911017c592');
  });
});

describe('generateStringsHelper', () => {
  it('generates the requested count and length using only allowed digits', () => {
    const results = generateStringsHelper(
      10,
      false,
      false,
      true,
      false,
      false,
      5,
    );
    expect(results).toHaveLength(5);
    results.forEach((str) => {
      expect(str).toHaveLength(10);
      expect(str).toMatch(/^[0-9]+$/);
    });
  });

  it('returns an error message when no character set is selected', () => {
    const results = generateStringsHelper(
      10,
      false,
      false,
      false,
      false,
      false,
      1,
    );
    expect(results[0]).toMatch(/Error/);
  });
});

describe('generateEmailsHelper', () => {
  it('generates the requested count of emails on the target domain', () => {
    const emails = generateEmailsHelper('example.com', '', 3, 'alphanumeric');
    expect(emails).toHaveLength(3);
    emails.forEach((email) => expect(email).toMatch(/@example\.com$/));
  });
});

describe('generateUuidsHelper', () => {
  it('generates valid uuids honoring formatting options', () => {
    const [uuid] = generateUuidsHelper(1, false, false);
    expect(uuid).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    );

    const [noHyphens] = generateUuidsHelper(1, true, true);
    expect(noHyphens).toMatch(/^[0-9A-F]{32}$/);
  });
});
