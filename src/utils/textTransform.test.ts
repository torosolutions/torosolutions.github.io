import { describe, expect, it } from 'vitest';
import {
  toCamelCase,
  toKebabCase,
  toPascalCase,
  toSnakeCase,
} from './textTransform';

describe('text case transforms', () => {
  it('converts to camelCase', () => {
    expect(toCamelCase('hello world')).toBe('helloWorld');
  });

  it('converts to PascalCase', () => {
    expect(toPascalCase('hello world')).toBe('HelloWorld');
  });

  it('converts to snake_case', () => {
    expect(toSnakeCase('helloWorld')).toBe('hello_world');
  });

  it('converts to kebab-case', () => {
    expect(toKebabCase('HelloWorld')).toBe('hello-world');
  });

  it('handles empty strings without throwing', () => {
    expect(toSnakeCase('')).toBe('');
    expect(toKebabCase('')).toBe('');
  });
});
