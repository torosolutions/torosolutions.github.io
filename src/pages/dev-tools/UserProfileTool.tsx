import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  UserCheck,
  RefreshCw,
  Copy,
  Download,
  Mail,
  User,
  Phone,
  Key,
  Calendar,
  MapPin,
  FileCode,
  Table,
  Database,
  LayoutGrid,
  ListChecks,
  Eye,
  Hash,
  Users,
  IdCard,
  AtSign,
} from 'lucide-react';
import {
  generateUserProfilesHelper,
  exportProfilesToCsv,
  exportProfilesToSql,
  resolveVisibleColumns,
  filterProfileFields,
  PROFILE_FIELD_OPTIONS,
  DEFAULT_FIELD_KEYS,
  type UserProfile,
} from '../../utils/userProfileGenerator';
import { usePersistentState } from '../../hooks/usePersistentState';
import Select from '../../components/atoms/Select';
import TextField from '../../components/atoms/TextField';

interface UserProfileToolProps {
  copyToClipboard: (text: string, label?: string) => void;
}

type ViewMode = 'cards' | 'json' | 'csv' | 'sql';

// Every major section a reload should be able to land back on. Whichever one
// the user last clicked/focused into becomes the anchor for the next reload.
const SECTION_IDS = {
  controls: 'profile-controls',
  fields: 'profile-fields',
  preview: 'profile-preview',
  results: 'profile-results',
} as const;
const SECTION_PARAM = 'section';

const UserProfileTool: React.FC<UserProfileToolProps> = ({
  copyToClipboard,
}) => {
  const [count, setCount] = usePersistentState<number>('profileCount', 5);
  const [domain, setDomain] = usePersistentState<string>(
    'profileDomain',
    'gmail.com',
  );
  const [customDomain, setCustomDomain] = usePersistentState<string>(
    'profileCustomDomain',
    '',
  );
  const [emailPrefix, setEmailPrefix] = usePersistentState<string>(
    'profileEmailPrefix',
    '',
  );
  const [emailSuffix, setEmailSuffix] = usePersistentState<string>(
    'profileEmailSuffix',
    '',
  );
  const [usernamePrefix, setUsernamePrefix] = usePersistentState<string>(
    'profileUsernamePrefix',
    'user',
  );
  const [usernameSuffix, setUsernameSuffix] = usePersistentState<string>(
    'profileUsernameSuffix',
    '',
  );
  const [firstNamePrefix, setFirstNamePrefix] = usePersistentState<string>(
    'profileFirstNamePrefix',
    'Test',
  );
  const [firstNameSuffix, setFirstNameSuffix] = usePersistentState<string>(
    'profileFirstNameSuffix',
    '',
  );
  const [lastNamePrefix, setLastNamePrefix] = usePersistentState<string>(
    'profileLastNamePrefix',
    'User',
  );
  const [lastNameSuffix, setLastNameSuffix] = usePersistentState<string>(
    'profileLastNameSuffix',
    '',
  );
  const [factorLength, setFactorLength] = usePersistentState<number>(
    'profileFactorLength',
    4,
  );
  const [phoneLength, setPhoneLength] = usePersistentState<number>(
    'profilePhoneLength',
    10,
  );
  const [viewMode, setViewMode] = usePersistentState<ViewMode>(
    'profileViewMode',
    'cards',
  );
  const [selectedFields, setSelectedFields] = usePersistentState<string[]>(
    'profileSelectedFields',
    DEFAULT_FIELD_KEYS,
  );
  const [seed, setSeed] = useState<number>(1);

  // NOTE: this app uses HashRouter (see src/main.tsx), so the URL hash
  // (`#/dev-tools?...`) *is* the route — it must never be touched directly.
  // Track "last interacted section" as an ordinary query param instead,
  // through react-router's own useSearchParams, so it safely coexists with
  // routing the same way the `tool` param already does. The actual scroll
  // happens centrally in App.tsx, which reads this same param — see the
  // comment there for why it isn't done here.
  const [searchParams, setSearchParams] = useSearchParams();

  const markSectionActive = (id: string) => {
    if (searchParams.get(SECTION_PARAM) === id) return;
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set(SECTION_PARAM, id);
        return next;
      },
      { replace: true },
    );
  };

  const profiles: UserProfile[] = useMemo(() => {
    // seed forces re-evaluation when Regenerate is clicked
    return generateUserProfilesHelper({
      count,
      domain,
      customDomain,
      emailPrefix,
      emailSuffix,
      usernamePrefix,
      usernameSuffix,
      firstNamePrefix,
      firstNameSuffix,
      lastNamePrefix,
      lastNameSuffix,
      factorLength,
      phoneLength,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    count,
    domain,
    customDomain,
    emailPrefix,
    emailSuffix,
    usernamePrefix,
    usernameSuffix,
    firstNamePrefix,
    firstNameSuffix,
    lastNamePrefix,
    lastNameSuffix,
    factorLength,
    phoneLength,
    seed,
  ]);

  const visibleColumns = useMemo(
    () => resolveVisibleColumns(selectedFields),
    [selectedFields],
  );
  const filteredProfiles = useMemo(
    () => filterProfileFields(profiles, visibleColumns),
    [profiles, visibleColumns],
  );

  const isFieldOn = (key: string) => selectedFields.includes(key);
  const toggleField = (key: string) => {
    setSelectedFields((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const csvContent = useMemo(
    () => exportProfilesToCsv(profiles, visibleColumns),
    [profiles, visibleColumns],
  );
  const sqlContent = useMemo(
    () => exportProfilesToSql(profiles, visibleColumns),
    [profiles, visibleColumns],
  );
  const jsonContent = useMemo(
    () => JSON.stringify(filteredProfiles, null, 2),
    [filteredProfiles],
  );

  const handleRegenerate = () => {
    setSeed((prev) => prev + 1);
  };

  const handleDownloadCsv = () => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `qa-user-profiles-${Date.now()}.csv`;
    link.click();
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-blue-600" /> QA User Profile
            Generator
          </h3>
          <p className="text-xs text-gray-500">
            Generate synthetic mock user profiles for QA engineering, API
            testing, DB seeding & form testing — no real names or photos, ever.
          </p>
        </div>
        <button
          onClick={handleRegenerate}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl text-xs font-bold transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Regenerate
        </button>
      </div>

      {/* Controls Box */}
      <div
        id={SECTION_IDS.controls}
        onClick={() => markSectionActive(SECTION_IDS.controls)}
        onFocus={() => markSectionActive(SECTION_IDS.controls)}
        className="bg-slate-50 p-4 rounded-xl border border-gray-200 scroll-mt-20 space-y-5"
      >
        {/* Cluster: Generation Settings */}
        <div>
          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <Hash className="w-3 h-3" /> Generation Settings
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Profiles Quantity ({count}):
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                className="w-full text-xs font-semibold bg-white border border-gray-300 rounded-lg p-2 focus:ring-blue-500 text-center"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Random Factor Length (
                {factorLength === 0 ? 'off' : factorLength}):
              </label>
              <input
                type="range"
                min="0"
                max="12"
                step="1"
                value={factorLength}
                onChange={(e) => setFactorLength(parseInt(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <p className="text-[10px] text-gray-500 mt-1">
                Shared random tag mixed into first/last name, username & email
                (0 = off).
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Phone Number Length ({phoneLength}):
              </label>
              <input
                type="range"
                min="4"
                max="15"
                step="1"
                value={phoneLength}
                onChange={(e) => setPhoneLength(parseInt(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <p className="text-[10px] text-gray-500 mt-1">
                Digits only, derived from the current timestamp.
              </p>
            </div>
          </div>
        </div>

        {/* Cluster: Name */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <Users className="w-3 h-3" /> Name
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                First Name Prefix (optional):
              </label>
              <TextField
                placeholder="e.g. Test"
                value={firstNamePrefix}
                onChange={(e) => setFirstNamePrefix(e.target.value)}
                className="w-full text-xs font-mono p-2"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                First Name Suffix (optional):
              </label>
              <TextField
                placeholder="e.g. QA"
                value={firstNameSuffix}
                onChange={(e) => setFirstNameSuffix(e.target.value)}
                className="w-full text-xs font-mono p-2"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Last Name Prefix (optional):
              </label>
              <TextField
                placeholder="e.g. User"
                value={lastNamePrefix}
                onChange={(e) => setLastNamePrefix(e.target.value)}
                className="w-full text-xs font-mono p-2"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Last Name Suffix (optional):
              </label>
              <TextField
                placeholder="e.g. QA"
                value={lastNameSuffix}
                onChange={(e) => setLastNameSuffix(e.target.value)}
                className="w-full text-xs font-mono p-2"
              />
              <p className="text-[10px] text-gray-500 mt-1">
                Letters &amp; digits only — no dots or symbols.
              </p>
            </div>
          </div>
        </div>

        {/* Cluster: Username */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <IdCard className="w-3 h-3" /> Username
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Username Prefix (optional):
              </label>
              <TextField
                placeholder="e.g. user"
                value={usernamePrefix}
                onChange={(e) => setUsernamePrefix(e.target.value)}
                className="w-full text-xs font-mono p-2"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Username Suffix (optional):
              </label>
              <TextField
                placeholder="e.g. qa"
                value={usernameSuffix}
                onChange={(e) => setUsernameSuffix(e.target.value)}
                className="w-full text-xs font-mono p-2"
              />
              <p className="text-[10px] text-gray-500 mt-1">
                Letters &amp; digits only — no dots or symbols.
              </p>
            </div>
          </div>
        </div>

        {/* Cluster: Email */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <AtSign className="w-3 h-3" /> Email
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Preset Domain:
              </label>
              <Select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full text-xs font-medium p-2"
              >
                <optgroup label="Popular Consumer">
                  <option value="gmail.com">@gmail.com</option>
                  <option value="yahoo.com">@yahoo.com</option>
                  <option value="outlook.com">@outlook.com</option>
                  <option value="icloud.com">@icloud.com</option>
                </optgroup>
                <optgroup label="Disposable / Temp Mail">
                  <option value="temp-mail.org">@temp-mail.org</option>
                  <option value="mailinator.com">@mailinator.com</option>
                  <option value="guerrillamail.com">@guerrillamail.com</option>
                  <option value="10minutemail.com">@10minutemail.com</option>
                  <option value="yopmail.com">@yopmail.com</option>
                  <option value="trashmail.com">@trashmail.com</option>
                  <option value="dispostable.com">@dispostable.com</option>
                </optgroup>
                <optgroup label="Corporate / Dev Testing">
                  <option value="qa-testing.io">@qa-testing.io</option>
                  <option value="company.com">@company.com</option>
                </optgroup>
              </Select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Or Custom Domain:
              </label>
              <TextField
                placeholder="e.g. myqa-env.dev"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                className="w-full text-xs font-medium p-2"
              />
            </div>

            <div />

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Email Prefix (optional):
              </label>
              <TextField
                placeholder="e.g. qa_"
                value={emailPrefix}
                onChange={(e) => setEmailPrefix(e.target.value)}
                className="w-full text-xs font-mono p-2"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Email Suffix (optional):
              </label>
              <TextField
                placeholder="e.g. +staging"
                value={emailSuffix}
                onChange={(e) => setEmailSuffix(e.target.value)}
                className="w-full text-xs font-mono p-2"
              />
              <p className="text-[10px] text-gray-500 mt-1">
                Tip: use{' '}
                <code className="bg-gray-100 px-1 rounded text-blue-600 font-mono">
                  +tag
                </code>{' '}
                for Gmail-style plus-addressing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fields Panel */}
      <div
        id={SECTION_IDS.fields}
        onClick={() => markSectionActive(SECTION_IDS.fields)}
        onFocus={() => markSectionActive(SECTION_IDS.fields)}
        className="bg-slate-50 p-4 rounded-xl border border-gray-200 scroll-mt-20"
      >
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-gray-700 uppercase flex items-center gap-1.5">
            <ListChecks className="w-3.5 h-3.5 text-blue-600" /> Fields to
            Include ({visibleColumns.length}):
          </label>
          <div className="flex gap-3 text-[11px] font-semibold">
            <button
              onClick={() => setSelectedFields(DEFAULT_FIELD_KEYS)}
              className="text-blue-600 hover:text-blue-800"
            >
              Select All
            </button>
            <button
              onClick={() => setSelectedFields([])}
              className="text-gray-500 hover:text-red-600"
            >
              Clear
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {PROFILE_FIELD_OPTIONS.map((opt) => (
            <label
              key={opt.key}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium cursor-pointer select-none transition-colors ${
                isFieldOn(opt.key)
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={isFieldOn(opt.key)}
                onChange={() => toggleField(opt.key)}
                className="accent-blue-600"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      {/* First User Preview */}
      <div
        id={SECTION_IDS.preview}
        onClick={() => markSectionActive(SECTION_IDS.preview)}
        onFocus={() => markSectionActive(SECTION_IDS.preview)}
        className="bg-white rounded-2xl border border-blue-200 p-5 shadow-xs scroll-mt-20"
      >
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold text-gray-700 uppercase flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-blue-600" /> Quick Preview — First
            User
          </h4>
          <button
            onClick={() =>
              copyToClipboard(
                JSON.stringify(filteredProfiles[0], null, 2),
                'Copied first user JSON!',
              )
            }
            className="flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-[11px] font-semibold hover:bg-blue-100"
          >
            <Copy className="w-3 h-3" /> Copy JSON
          </button>
        </div>

        {/* Random Factor — shown at the top regardless of field selection */}
        <div className="flex items-center justify-between bg-indigo-50 px-2.5 py-1.5 rounded-lg border border-indigo-100 gap-2 mb-2">
          <span className="text-indigo-700 font-semibold flex-shrink-0">
            Factor:
          </span>
          <div className="flex items-center gap-1 min-w-0">
            <span className="font-mono text-indigo-900 truncate">
              {factorLength === 0
                ? `${profiles[0].factor} (index, factor off)`
                : profiles[0].factor}
            </span>
            <button
              onClick={() =>
                copyToClipboard(profiles[0].factor, 'Factor copied!')
              }
              className="text-indigo-400 hover:text-indigo-700 p-0.5 flex-shrink-0"
            >
              <Copy className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="flex items-start gap-4">
          {isFieldOn('avatar') && (
            <img
              src={profiles[0].avatar}
              alt={profiles[0].fullName}
              className="w-14 h-14 rounded-full border-2 border-blue-500 bg-white object-cover shadow-xs flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0 grid grid-cols-1 gap-y-1.5 text-xs">
            {PROFILE_FIELD_OPTIONS.filter(
              (opt) => opt.key !== 'avatar' && isFieldOn(opt.key),
            ).map((opt) => {
              const value =
                opt.key === 'address'
                  ? `${profiles[0].street}, ${profiles[0].city}, ${profiles[0].country} (${profiles[0].zipCode})`
                  : profiles[0][opt.columns[0]];
              return (
                <div
                  key={opt.key}
                  className="flex items-center justify-between bg-slate-50 px-2.5 py-1.5 rounded-lg border border-gray-100 gap-2"
                >
                  <span className="text-gray-500 font-semibold flex-shrink-0">
                    {opt.label}:
                  </span>
                  <div className="flex items-center gap-1 min-w-0">
                    <span className="font-mono text-gray-900 truncate">
                      {value}
                    </span>
                    <button
                      onClick={() =>
                        copyToClipboard(value, `${opt.label} copied!`)
                      }
                      className="text-gray-400 hover:text-blue-600 p-0.5 flex-shrink-0"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
            {visibleColumns.length === 0 && (
              <p className="text-gray-400 italic">
                No fields selected — enable some fields above to preview.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Results: View Format Selector, Actions Bar & the four view panes */}
      <div
        id={SECTION_IDS.results}
        onClick={() => markSectionActive(SECTION_IDS.results)}
        onFocus={() => markSectionActive(SECTION_IDS.results)}
        className="scroll-mt-20 space-y-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'cards'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" /> Cards ({profiles.length})
            </button>
            <button
              onClick={() => setViewMode('json')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'json'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" /> JSON Payload
            </button>
            <button
              onClick={() => setViewMode('csv')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'csv'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Table className="w-3.5 h-3.5" /> CSV Sheet
            </button>
            <button
              onClick={() => setViewMode('sql')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'sql'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Database className="w-3.5 h-3.5" /> SQL Insert
            </button>
          </div>

          <div className="flex gap-2">
            {viewMode === 'cards' && (
              <button
                onClick={() =>
                  copyToClipboard(jsonContent, 'Copied all profiles as JSON!')
                }
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-100"
              >
                <Copy className="w-3.5 h-3.5" /> Copy All JSON
              </button>
            )}

            {viewMode === 'csv' && (
              <button
                onClick={handleDownloadCsv}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" /> Download CSV
              </button>
            )}

            {viewMode === 'json' && (
              <button
                onClick={() =>
                  copyToClipboard(jsonContent, 'JSON Payload copied!')
                }
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 shadow-xs"
              >
                <Copy className="w-3.5 h-3.5" /> Copy JSON
              </button>
            )}

            {viewMode === 'sql' && (
              <button
                onClick={() =>
                  copyToClipboard(sqlContent, 'SQL Inserts copied!')
                }
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 shadow-xs"
              >
                <Copy className="w-3.5 h-3.5" /> Copy SQL
              </button>
            )}
          </div>
        </div>

        {/* VIEW 1: CARDS VIEW */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-1">
            {profiles.map((profile, index) => (
              <div
                key={profile.id}
                className="bg-slate-50 rounded-2xl border border-gray-200 p-5 space-y-3 relative hover:border-blue-300 transition-all shadow-xs"
              >
                {/* Profile Header */}
                <div className="flex items-center gap-3 border-b border-gray-200/80 pb-3">
                  {isFieldOn('avatar') && (
                    <img
                      src={profile.avatar}
                      alt={profile.fullName}
                      className="w-12 h-12 rounded-full border-2 border-blue-500 bg-white object-cover shadow-xs"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-gray-900 text-sm truncate">
                        {isFieldOn('firstName') || isFieldOn('lastName')
                          ? profile.fullName
                          : profile.username || `Profile #${index + 1}`}
                      </h4>
                      <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                        #{index + 1}
                      </span>
                    </div>
                    {(isFieldOn('jobTitle') || isFieldOn('company')) && (
                      <p className="text-xs text-gray-500 truncate">
                        {isFieldOn('jobTitle') && profile.jobTitle}
                        {isFieldOn('jobTitle') && isFieldOn('company') && ' • '}
                        {isFieldOn('company') && profile.company}
                      </p>
                    )}
                  </div>
                </div>

                {/* Data Fields */}
                <div className="space-y-2 text-xs">
                  {/* Username */}
                  {isFieldOn('username') && (
                    <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-gray-200">
                      <div className="flex items-center gap-2 truncate">
                        <User className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                        <span className="font-bold text-gray-500">
                          Username:
                        </span>
                        <span className="font-mono text-gray-900 font-medium truncate">
                          {profile.username}
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          copyToClipboard(profile.username, 'Username copied!')
                        }
                        className="text-gray-400 hover:text-blue-600 p-1"
                        title="Copy Username"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Email */}
                  {isFieldOn('email') && (
                    <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-gray-200">
                      <div className="flex items-center gap-2 truncate">
                        <Mail className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                        <span className="font-bold text-gray-500">Email:</span>
                        <span className="font-mono text-indigo-600 font-semibold truncate">
                          {profile.email}
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          copyToClipboard(profile.email, 'Email copied!')
                        }
                        className="text-gray-400 hover:text-blue-600 p-1"
                        title="Copy Email"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Password */}
                  {isFieldOn('password') && (
                    <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-gray-200">
                      <div className="flex items-center gap-2 truncate">
                        <Key className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span className="font-bold text-gray-500">
                          Password:
                        </span>
                        <span className="font-mono text-emerald-600 font-bold truncate">
                          {profile.password}
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          copyToClipboard(profile.password, 'Password copied!')
                        }
                        className="text-gray-400 hover:text-blue-600 p-1"
                        title="Copy Password"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Phone & DOB */}
                  {(isFieldOn('phone') || isFieldOn('birthDate')) && (
                    <div className="grid grid-cols-2 gap-2">
                      {isFieldOn('phone') && (
                        <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-gray-200 truncate">
                          <div className="flex items-center gap-1.5 truncate">
                            <Phone className="w-3 h-3 text-amber-500 flex-shrink-0" />
                            <span className="font-mono text-[11px] text-gray-800 truncate">
                              {profile.phone}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              copyToClipboard(profile.phone, 'Phone copied!')
                            }
                            className="text-gray-400 hover:text-blue-600 p-1"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      )}

                      {isFieldOn('birthDate') && (
                        <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-gray-200 truncate">
                          <div className="flex items-center gap-1.5 truncate">
                            <Calendar className="w-3 h-3 text-purple-500 flex-shrink-0" />
                            <span className="font-mono text-[11px] text-gray-800 truncate">
                              {profile.birthDate}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              copyToClipboard(
                                profile.birthDate,
                                'Birthdate copied!',
                              )
                            }
                            className="text-gray-400 hover:text-blue-600 p-1"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Address */}
                  {isFieldOn('address') && (
                    <div className="flex items-start justify-between bg-white p-2 rounded-xl border border-gray-200">
                      <div className="flex items-start gap-1.5 text-[11px] text-gray-600">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">
                          {profile.street}, {profile.city}, {profile.country} (
                          {profile.zipCode})
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Copy Full User Object Action */}
                <div className="pt-1">
                  <button
                    onClick={() =>
                      copyToClipboard(
                        JSON.stringify(filteredProfiles[index], null, 2),
                        `Copied profile #${index + 1}!`,
                      )
                    }
                    className="w-full py-1.5 bg-white hover:bg-blue-50 text-blue-600 font-semibold rounded-xl border border-blue-200 text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" /> Copy Profile JSON
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 2: JSON VIEW */}
        {viewMode === 'json' && (
          <textarea
            rows={14}
            readOnly
            value={jsonContent}
            className="w-full font-mono text-xs p-4 bg-slate-900 text-emerald-400 border border-slate-800 rounded-xl leading-relaxed select-all"
          />
        )}

        {/* VIEW 3: CSV VIEW */}
        {viewMode === 'csv' && (
          <textarea
            rows={14}
            readOnly
            value={csvContent}
            className="w-full font-mono text-xs p-4 bg-slate-900 text-blue-300 border border-slate-800 rounded-xl leading-relaxed select-all"
          />
        )}

        {/* VIEW 4: SQL VIEW */}
        {viewMode === 'sql' && (
          <textarea
            rows={14}
            readOnly
            value={sqlContent}
            className="w-full font-mono text-xs p-4 bg-slate-900 text-amber-300 border border-slate-800 rounded-xl leading-relaxed select-all"
          />
        )}
      </div>
    </div>
  );
};

export default UserProfileTool;
