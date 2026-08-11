/**
 * LocalStorage Persistence Helpers (Pure TS, no React dependency)
 */

export const STORAGE_KEY = 'toro_devtools_settings_v1';

export function getStoredValue<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    if (!item) return fallback;
    const data = JSON.parse(item);
    return data[key] !== undefined ? (data[key] as T) : fallback;
  } catch {
    return fallback;
  }
}

export function setStoredValue<T>(key: string, value: T): void {
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    const data = item ? JSON.parse(item) : {};
    data[key] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore quota or disabled storage errors
  }
}

export function clearStoredSettings(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors
  }
}
