import { describe, expect, it } from 'vitest';
import { generateLoremIpsumHelper } from './loremIpsum';

describe('generateLoremIpsumHelper', () => {
  it('generates the requested number of words', () => {
    const text = generateLoremIpsumHelper({
      count: 5,
      unit: 'words',
      flavor: 'tech',
      startWithLorem: false,
      wrapHtml: false,
    });
    expect(text.split(' ')).toHaveLength(5);
  });

  it('clamps count to the 1-100 range', () => {
    const text = generateLoremIpsumHelper({
      count: 500,
      unit: 'words',
      flavor: 'hipster',
      startWithLorem: false,
      wrapHtml: false,
    });
    expect(text.split(' ')).toHaveLength(100);
  });

  it('wraps paragraphs in <p> tags when wrapHtml is set', () => {
    const text = generateLoremIpsumHelper({
      count: 2,
      unit: 'paragraphs',
      flavor: 'classic',
      startWithLorem: true,
      wrapHtml: true,
    });
    expect(text).toMatch(/^<p>/);
    expect(text).toMatch(/<\/p>$/);
  });
});
