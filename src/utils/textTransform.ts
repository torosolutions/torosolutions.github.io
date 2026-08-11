/**
 * Text Case Transformation Helpers (Pure TS, no React dependency)
 */

export const toCamelCase = (str: string): string =>
  str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase(),
    )
    .replace(/\s+/g, '');

export const toPascalCase = (str: string): string =>
  str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
    .replace(/\s+/g, '');

export const toSnakeCase = (str: string): string =>
  (str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]+|[0-9]+/g,
      )
      ?.map((x) => x.toLowerCase())
      .join('_')) ||
  '';

export const toKebabCase = (str: string): string =>
  (str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]+|[0-9]+/g,
      )
      ?.map((x) => x.toLowerCase())
      .join('-')) ||
  '';
