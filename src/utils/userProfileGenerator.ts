/**
 * QA User Profile Generator Helper powered by @faker-js/faker
 *
 * Identity fields (name, avatar) are intentionally synthetic — no real person
 * names or real photos — so generated data can never be mistaken for an
 * actual user's PII.
 */
import { faker } from '@faker-js/faker';

export interface UserProfile {
  id: string;
  factor: string;
  firstName: string;
  lastName: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  birthDate: string; // YYYY-MM-DD
  jobTitle: string;
  company: string;
  street: string;
  city: string;
  zipCode: string;
  country: string;
  avatar: string;
}

export interface GenerateProfilesOptions {
  count: number;
  domain?: string;
  customDomain?: string;
  emailPrefix?: string;
  emailSuffix?: string;
  usernamePrefix?: string;
  usernameSuffix?: string;
  firstNamePrefix?: string;
  firstNameSuffix?: string;
  lastNamePrefix?: string;
  lastNameSuffix?: string;
  factorLength?: number;
  phoneLength?: number;
}

/** Keep only characters valid in an email local-part (allows +tag style suffixes). */
function sanitizeLocalPart(value: string): string {
  return value.replace(/[^a-zA-Z0-9.+_-]/g, '');
}

/** Username must contain only letters and digits — no dots or symbols. */
export function sanitizeAlphanumeric(value: string): string {
  return value.replace(/[^a-zA-Z0-9]/g, '');
}

const AVATAR_COLORS = [
  '2563eb',
  '059669',
  'd97706',
  'dc2626',
  '7c3aed',
  '0891b2',
  'db2777',
  '4f46e5',
];

function pickAvatarColor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++)
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

/** Synthetic initials avatar (inline SVG data URI) — never a real photo. */
function generateInitialsAvatar(firstName: string, lastName: string): string {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  const bg = pickAvatarColor(`${firstName}${lastName}`);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" rx="32" fill="#${bg}"/><text x="50%" y="50%" dy=".35em" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#ffffff" font-weight="700">${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/** Digits-only phone number derived from the current timestamp, trimmed/padded to the chosen length. */
function generateTimestampPhone(length: number, offset: number): string {
  const digits = String(Date.now() + offset);
  if (digits.length >= length) return digits.slice(-length);
  return digits.padStart(length, '0');
}

export function generateUserProfilesHelper({
  count = 5,
  domain = 'gmail.com',
  customDomain = '',
  emailPrefix = '',
  emailSuffix = '',
  usernamePrefix = 'user',
  usernameSuffix = '',
  firstNamePrefix = 'Test',
  firstNameSuffix = '',
  lastNamePrefix = 'User',
  lastNameSuffix = '',
  factorLength = 4,
  phoneLength = 10,
}: GenerateProfilesOptions): UserProfile[] {
  const safeCount = Math.max(1, Math.min(count, 50));
  const targetDomain = (customDomain.trim() || domain).replace(/^@/, '');
  const cleanPrefix = sanitizeLocalPart(emailPrefix.trim());
  const cleanSuffix = sanitizeLocalPart(emailSuffix.trim());
  const cleanUsernamePrefix = sanitizeAlphanumeric(usernamePrefix.trim());
  const cleanUsernameSuffix = sanitizeAlphanumeric(usernameSuffix.trim());
  const cleanFirstNamePrefix = firstNamePrefix.trim();
  const cleanFirstNameSuffix = firstNameSuffix.trim();
  const cleanLastNamePrefix = lastNamePrefix.trim();
  const cleanLastNameSuffix = lastNameSuffix.trim();
  const safeFactorLength = Math.max(0, Math.min(factorLength, 20));
  const safePhoneLength = Math.max(4, Math.min(phoneLength, 15));
  const profiles: UserProfile[] = [];

  for (let i = 0; i < safeCount; i++) {
    // Shared random factor: makes this profile's name, username & email unique/traceable together.
    const factor =
      safeFactorLength > 0
        ? faker.string.alphanumeric({ length: safeFactorLength }).toLowerCase()
        : '';
    const tag = factor || String(i + 1).padStart(2, '0');

    // Synthetic identity — deliberately not a real person's name.
    const firstName = `${cleanFirstNamePrefix}${tag}${cleanFirstNameSuffix}`;
    const lastName = `${cleanLastNamePrefix}${tag}${cleanLastNameSuffix}`;
    const fullName = `${firstName} ${lastName}`;

    // Alphanumeric only, no dot/separator, and no doubled-up tag.
    const username = `${cleanUsernamePrefix}${tag}${cleanUsernameSuffix}`;
    // Keep the email short: prefix + factor + suffix only (no full name).
    const email = `${cleanPrefix}${tag}${cleanSuffix}@${targetDomain}`;
    // Digits-only, derived from the timestamp so it's unique per profile.
    const phone = generateTimestampPhone(safePhoneLength, i);
    const password = faker.internet.password({
      length: 12,
      memorable: false,
      prefix: 'Toro!',
    });
    const birthDateObj = faker.date.birthdate({
      min: 18,
      max: 65,
      mode: 'age',
    });
    const birthDate = birthDateObj.toISOString().split('T')[0];

    const jobTitle = faker.person.jobTitle();
    const company = faker.company.name();

    const street = faker.location.streetAddress();
    const city = faker.location.city();
    const zipCode = faker.location.zipCode();
    const country = faker.location.country();
    const avatar = generateInitialsAvatar(firstName, lastName);
    const id = faker.string.uuid();

    profiles.push({
      id,
      factor: tag,
      firstName,
      lastName,
      fullName,
      username,
      email,
      phone,
      password,
      birthDate,
      jobTitle,
      company,
      street,
      city,
      zipCode,
      country,
      avatar,
    });
  }

  return profiles;
}

/** A selectable item in the "Fields" panel — maps to one or more UserProfile columns. */
export interface ProfileFieldOption {
  key: string;
  label: string;
  columns: (keyof UserProfile)[];
}

export const PROFILE_FIELD_OPTIONS: ProfileFieldOption[] = [
  { key: 'id', label: 'ID', columns: ['id'] },
  { key: 'firstName', label: 'First Name', columns: ['firstName'] },
  { key: 'lastName', label: 'Last Name', columns: ['lastName'] },
  { key: 'username', label: 'Username', columns: ['username'] },
  { key: 'email', label: 'Email', columns: ['email'] },
  { key: 'password', label: 'Password', columns: ['password'] },
  { key: 'phone', label: 'Phone', columns: ['phone'] },
  { key: 'birthDate', label: 'Birth Date', columns: ['birthDate'] },
  { key: 'jobTitle', label: 'Job Title', columns: ['jobTitle'] },
  { key: 'company', label: 'Company', columns: ['company'] },
  {
    key: 'address',
    label: 'Address',
    columns: ['street', 'city', 'zipCode', 'country'],
  },
  { key: 'avatar', label: 'Avatar', columns: ['avatar'] },
];

export const DEFAULT_FIELD_KEYS: string[] = PROFILE_FIELD_OPTIONS.map(
  (f) => f.key,
);

/** Resolve selected panel keys to the concrete UserProfile columns to show/export. */
export function resolveVisibleColumns(
  selectedKeys: string[],
): (keyof UserProfile)[] {
  const selected = new Set(selectedKeys);
  const columns = new Set<keyof UserProfile>();
  for (const opt of PROFILE_FIELD_OPTIONS) {
    if (selected.has(opt.key)) opt.columns.forEach((c) => columns.add(c));
  }
  if (columns.has('firstName') || columns.has('lastName'))
    columns.add('fullName');
  return Array.from(columns);
}

/** Build a copy of each profile containing only the given columns (plus id/fullName as needed). */
export function filterProfileFields(
  profiles: UserProfile[],
  columns: (keyof UserProfile)[],
): Partial<UserProfile>[] {
  return profiles.map((p) => {
    const out: Partial<UserProfile> = {};
    columns.forEach((c) => {
      out[c] = p[c] as never;
    });
    return out;
  });
}

const CSV_HEADER_ORDER: (keyof UserProfile)[] = [
  'id',
  'firstName',
  'lastName',
  'fullName',
  'username',
  'email',
  'phone',
  'password',
  'birthDate',
  'jobTitle',
  'company',
  'street',
  'city',
  'zipCode',
  'country',
];

/**
 * Export User Profiles as CSV String
 */
export function exportProfilesToCsv(
  profiles: UserProfile[],
  columns: (keyof UserProfile)[] = CSV_HEADER_ORDER,
): string {
  if (!profiles.length) return '';
  const headers = CSV_HEADER_ORDER.filter((h) => columns.includes(h));
  if (!headers.length) return '';

  const rows = profiles.map((p) =>
    headers
      .map((h) => {
        const val = p[h] || '';
        return `"${String(val).replace(/"/g, '""')}"`;
      })
      .join(','),
  );

  return [headers.join(','), ...rows].join('\n');
}

const SQL_COLUMN_MAP: Partial<Record<keyof UserProfile, string>> = {
  id: 'id',
  firstName: 'first_name',
  lastName: 'last_name',
  fullName: 'full_name',
  username: 'username',
  email: 'email',
  phone: 'phone',
  password: 'password',
  birthDate: 'birth_date',
  jobTitle: 'job_title',
  company: 'company',
  street: 'street',
  city: 'city',
  zipCode: 'zip_code',
  country: 'country',
};

const SQL_COLUMN_ORDER: (keyof UserProfile)[] = [
  'id',
  'firstName',
  'lastName',
  'fullName',
  'username',
  'email',
  'phone',
  'password',
  'birthDate',
  'jobTitle',
  'company',
  'street',
  'city',
  'zipCode',
  'country',
];

/**
 * Export User Profiles as SQL INSERT Statements
 */
export function exportProfilesToSql(
  profiles: UserProfile[],
  columns: (keyof UserProfile)[] = SQL_COLUMN_ORDER,
): string {
  if (!profiles.length) return '';
  const fields = SQL_COLUMN_ORDER.filter((c) => columns.includes(c));
  if (!fields.length) return '';

  const columnNames = fields.map((f) => SQL_COLUMN_MAP[f]).join(', ');
  const lines = profiles.map((p) => {
    const values = fields
      .map((f) => `'${String(p[f]).replace(/'/g, "''")}'`)
      .join(', ');
    return `INSERT INTO users (${columnNames}) VALUES (${values});`;
  });
  return lines.join('\n');
}
