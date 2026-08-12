import { describe, expect, it } from 'vitest';
import {
  exportProfilesToCsv,
  exportProfilesToSql,
  filterProfileFields,
  generateUserProfilesHelper,
  resolveVisibleColumns,
  sanitizeAlphanumeric,
} from './userProfileGenerator';

describe('sanitizeAlphanumeric', () => {
  it('strips non-alphanumeric characters', () => {
    expect(sanitizeAlphanumeric('a.b-c_1 2!')).toBe('abc12');
  });
});

describe('generateUserProfilesHelper', () => {
  it('generates the requested number of profiles with unique ids', () => {
    const profiles = generateUserProfilesHelper({ count: 5 });
    expect(profiles).toHaveLength(5);
    expect(new Set(profiles.map((p) => p.id)).size).toBe(5);
  });

  it('clamps count to the 1-50 range', () => {
    expect(generateUserProfilesHelper({ count: 0 })).toHaveLength(1);
    expect(generateUserProfilesHelper({ count: 500 })).toHaveLength(50);
  });
});

describe('resolveVisibleColumns', () => {
  it('includes fullName whenever firstName or lastName is selected', () => {
    const columns = resolveVisibleColumns(['firstName']);
    expect(columns).toContain('fullName');
    expect(columns).toContain('firstName');
  });
});

describe('filterProfileFields', () => {
  it('keeps only the requested columns', () => {
    const [profile] = generateUserProfilesHelper({ count: 1 });
    const [filtered] = filterProfileFields([profile], ['id', 'email']);
    expect(Object.keys(filtered).sort()).toEqual(['email', 'id']);
  });
});

describe('export helpers', () => {
  it('exports CSV with a header row and one row per profile', () => {
    const profiles = generateUserProfilesHelper({ count: 2 });
    const csv = exportProfilesToCsv(profiles, ['id', 'email']);
    const lines = csv.split('\n');
    expect(lines).toHaveLength(3);
    expect(lines[0]).toBe('id,email');
  });

  it('exports SQL insert statements for each profile', () => {
    const profiles = generateUserProfilesHelper({ count: 2 });
    const sql = exportProfilesToSql(profiles, ['id', 'email']);
    const lines = sql.split('\n');
    expect(lines).toHaveLength(2);
    lines.forEach((line) => expect(line).toMatch(/^INSERT INTO users/));
  });

  it('returns an empty string when there are no profiles', () => {
    expect(exportProfilesToCsv([])).toBe('');
    expect(exportProfilesToSql([])).toBe('');
  });
});
