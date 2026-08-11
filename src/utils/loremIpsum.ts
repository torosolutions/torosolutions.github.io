/**
 * Lorem Ipsum (Lipsum) Generator Utility powered by @faker-js/faker
 */
import { faker } from '@faker-js/faker';

export type LipsumUnit = 'paragraphs' | 'sentences' | 'words';
export type LipsumFlavor = 'classic' | 'hipster' | 'tech';

export interface GenerateLipsumOptions {
  count: number;
  unit: LipsumUnit;
  flavor: LipsumFlavor;
  startWithLorem: boolean;
  wrapHtml: boolean;
}

export function generateLoremIpsumHelper({
  count,
  unit,
  flavor = 'classic',
  startWithLorem = true,
  wrapHtml = false,
}: GenerateLipsumOptions): string {
  const safeCount = Math.max(1, Math.min(count, 100));
  let outputText: string;

  if (unit === 'words') {
    if (flavor === 'tech') {
      const wordsArr = Array.from({ length: safeCount }, () =>
        faker.hacker.noun().toLowerCase(),
      );
      outputText = wordsArr.join(' ');
    } else if (flavor === 'hipster') {
      const hipsterWords = [
        'artisanal',
        'craft',
        'beer',
        'tote',
        'bag',
        'marfa',
        'single-origin',
        'coffee',
        'sriracha',
        'aesthetic',
        'subway',
        'tile',
        'distillery',
        'kombucha',
        'succulent',
        'fixie',
        'helvetica',
        'cold-pressed',
        'organic',
        'raw',
        'denim',
        'pour-over',
        'tofu',
        'vegan',
        'irony',
        'mustache',
        'retro',
        'cardigan',
        'chillwave',
        'vape',
        'charcuterie',
        'pitchfork',
        'lo-fi',
        'neutra',
        'flexitarian',
        'taxidermy',
        'brunch',
      ];
      const wordsArr = Array.from({ length: safeCount }, () =>
        faker.helpers.arrayElement(hipsterWords),
      );
      outputText = wordsArr.join(' ');
    } else {
      outputText = faker.lorem.words(safeCount);
      if (startWithLorem) {
        const prefixWords = [
          'Lorem',
          'ipsum',
          'dolor',
          'sit',
          'amet',
          'consectetur',
          'adipiscing',
          'elit',
        ];
        const existingWords = outputText.split(' ');
        for (let i = 0; i < Math.min(safeCount, prefixWords.length); i++) {
          existingWords[i] = prefixWords[i];
        }
        outputText = existingWords.join(' ');
      }
    }

    if (wrapHtml) {
      outputText = `<p>${outputText}</p>`;
    }
  } else if (unit === 'sentences') {
    if (flavor === 'tech') {
      const sentences = Array.from({ length: safeCount }, () =>
        faker.hacker.phrase(),
      );
      outputText = sentences.join(' ');
    } else if (flavor === 'hipster') {
      const hipsterWords = [
        'artisanal',
        'craft',
        'beer',
        'single-origin',
        'kombucha',
        'succulent',
        'fixie',
        'helvetica',
        'cold-pressed',
        'organic',
        'denim',
        'pour-over',
        'vegan',
        'mustache',
        'retro',
        'cardigan',
        'chillwave',
        'lo-fi',
      ];
      const sentences = Array.from({ length: safeCount }, () => {
        const sentenceWords = faker.helpers.arrayElements(hipsterWords, {
          min: 6,
          max: 12,
        });
        const text = sentenceWords.join(' ');
        return text.charAt(0).toUpperCase() + text.slice(1) + '.';
      });
      outputText = sentences.join(' ');
    } else {
      const sentences = Array.from({ length: safeCount }, () =>
        faker.lorem.sentence(),
      );
      if (startWithLorem && sentences.length > 0) {
        sentences[0] =
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
      }
      outputText = sentences.join(' ');
    }

    if (wrapHtml) {
      outputText = `<p>${outputText}</p>`;
    }
  } else {
    // Paragraphs
    if (flavor === 'tech') {
      const paragraphs = Array.from({ length: safeCount }, () =>
        Array.from({ length: 4 }, () => faker.hacker.phrase()).join(' '),
      );
      outputText = paragraphs.join('\n\n');
    } else if (flavor === 'hipster') {
      const hipsterWords = [
        'artisanal',
        'craft',
        'beer',
        'single-origin',
        'kombucha',
        'succulent',
        'fixie',
        'helvetica',
        'cold-pressed',
        'organic',
        'denim',
        'pour-over',
        'vegan',
        'mustache',
        'retro',
        'cardigan',
        'chillwave',
        'lo-fi',
      ];
      const paragraphs = Array.from({ length: safeCount }, () => {
        const sentences = Array.from({ length: 4 }, () => {
          const sentenceWords = faker.helpers.arrayElements(hipsterWords, {
            min: 6,
            max: 12,
          });
          const text = sentenceWords.join(' ');
          return text.charAt(0).toUpperCase() + text.slice(1) + '.';
        });
        return sentences.join(' ');
      });
      outputText = paragraphs.join('\n\n');
    } else {
      const paragraphs = Array.from({ length: safeCount }, () =>
        faker.lorem.paragraph(),
      );
      if (startWithLorem && paragraphs.length > 0) {
        paragraphs[0] =
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
          paragraphs[0];
      }
      outputText = paragraphs.join('\n\n');
    }

    if (wrapHtml) {
      outputText = outputText
        .split('\n\n')
        .map((p) => `<p>${p}</p>`)
        .join('\n\n');
    }
  }

  return outputText;
}
