import '@testing-library/jest-dom/vitest';

window.scrollTo = () => {};

// Node's own experimental `localStorage` global (unusable without
// --localstorage-file) shadows jsdom's working implementation here, since
// window IS globalThis in this test environment. jsdom's real Storage class
// can't be constructed directly, so swap in a minimal in-memory polyfill
// that behaves the same for our purposes, regardless of whether tests run
// via `npm test`, a bare `vitest run`, or an IDE test runner.
class MemoryStorage implements Storage {
  private store = new Map<string, string>();

  get length() {
    return this.store.size;
  }

  clear(): void {
    this.store.clear();
  }

  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null;
  }

  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  setItem(key: string, value: string): void {
    this.store.set(key, String(value));
  }
}

Object.defineProperty(globalThis, 'localStorage', {
  value: new MemoryStorage(),
  configurable: true,
  writable: true,
});
