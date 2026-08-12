import { beforeEach, describe, expect, it } from 'vitest';
import { clearStoredSettings, getStoredValue, setStoredValue } from './storage';

describe('storage helpers', () => {
  beforeEach(() => {
    clearStoredSettings();
  });

  it('returns the fallback when nothing is stored', () => {
    expect(getStoredValue('missing', 'fallback')).toBe('fallback');
  });

  it('round-trips a stored value', () => {
    setStoredValue('theme', 'dark');
    expect(getStoredValue('theme', 'light')).toBe('dark');
  });

  it('clears stored settings', () => {
    setStoredValue('theme', 'dark');
    clearStoredSettings();
    expect(getStoredValue('theme', 'light')).toBe('light');
  });
});
