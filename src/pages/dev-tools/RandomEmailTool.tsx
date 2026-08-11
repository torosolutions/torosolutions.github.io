import React, { useState } from 'react';
import { AtSign, RefreshCw, Copy } from 'lucide-react';
import { generateEmailsHelper } from '../../utils/crypto';
import { getStoredValue } from '../../utils/storage';
import { usePersistentState } from '../../hooks/usePersistentState';
import Select from '../../components/atoms/Select';
import TextField from '../../components/atoms/TextField';

interface RandomEmailToolProps {
  copyToClipboard: (text: string, label?: string) => void;
}

const RandomEmailTool: React.FC<RandomEmailToolProps> = ({
  copyToClipboard,
}) => {
  const [emailDomain, setEmailDomain] = usePersistentState<string>(
    'emailDomain',
    'gmail.com',
  );
  const [customDomain, setCustomDomain] = usePersistentState<string>(
    'customDomain',
    '',
  );
  const [emailCount, setEmailCount] = usePersistentState<number>(
    'emailCount',
    5,
  );
  const [emailPrefixType, setEmailPrefixType] = usePersistentState<
    'name' | 'word' | 'alphanumeric' | 'custom'
  >('emailPrefixType', 'name');
  const [customPrefix, setCustomPrefix] = usePersistentState<string>(
    'customPrefix',
    'test.user',
  );

  const [generatedEmails, setGeneratedEmails] = useState<string[]>(() =>
    generateEmailsHelper(
      getStoredValue('emailDomain', 'gmail.com'),
      getStoredValue('customDomain', ''),
      getStoredValue('emailCount', 5),
      getStoredValue<'name' | 'word' | 'alphanumeric' | 'custom'>(
        'emailPrefixType',
        'name',
      ),
      getStoredValue('customPrefix', 'test.user'),
    ),
  );

  const updateEmails = (
    dom = emailDomain,
    cdom = customDomain,
    cnt = emailCount,
    type = emailPrefixType,
    pref = customPrefix,
  ) => {
    setGeneratedEmails(generateEmailsHelper(dom, cdom, cnt, type, pref));
  };

  const generateRandomEmails = () => updateEmails();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex justify-between items-center border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <AtSign className="w-5 h-5 text-blue-600" /> Random Email Address
            Generator
          </h3>
          <p className="text-xs text-gray-500">
            Generate realistic mock email addresses for testing forms, database
            seeding, or QA.
          </p>
        </div>
        <button
          onClick={generateRandomEmails}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-semibold"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Regenerate
        </button>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50 p-5 rounded-xl border border-gray-200">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            Preset Domain:
          </label>
          <Select
            value={emailDomain}
            onChange={(e) => {
              const dom = e.target.value;
              setEmailDomain(dom);
              updateEmails(dom);
            }}
            className="w-full text-xs font-medium p-2.5"
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
              <option value="company.io">@company.io</option>
              <option value="toro-dev.net">@toro-dev.net</option>
              <option value="example.org">@example.org</option>
              <option value="testmail.dev">@testmail.dev</option>
            </optgroup>
          </Select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            Or Custom Domain:
          </label>
          <TextField
            placeholder="e.g. mycompany.com"
            value={customDomain}
            onChange={(e) => {
              const cdom = e.target.value;
              setCustomDomain(cdom);
              updateEmails(emailDomain, cdom);
            }}
            className="w-full text-xs font-medium p-2.5"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            Prefix Pattern:
          </label>
          <Select
            value={emailPrefixType}
            onChange={(e) => {
              const type = e.target.value as
                | 'name'
                | 'word'
                | 'alphanumeric'
                | 'custom';
              setEmailPrefixType(type);
              updateEmails(
                emailDomain,
                customDomain,
                emailCount,
                type,
                customPrefix,
              );
            }}
            className="w-full text-xs font-medium p-2.5"
          >
            <option value="name">First Last (e.g. john.doe42)</option>
            <option value="word">Tech Terms (e.g. coder.dev88)</option>
            <option value="alphanumeric">Random Hash (e.g. xk92ma8z)</option>
            <option value="custom">Custom Prefix / Pattern</option>
          </Select>
        </div>

        {emailPrefixType === 'custom' && (
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Custom Prefix Input:
            </label>
            <TextField
              placeholder="e.g. test.user, qa_{n}, or dev+{hash}"
              value={customPrefix}
              onChange={(e) => {
                const pref = e.target.value;
                setCustomPrefix(pref);
                updateEmails(
                  emailDomain,
                  customDomain,
                  emailCount,
                  emailPrefixType,
                  pref,
                );
              }}
              className="w-full text-xs font-medium p-2.5"
            />
            <p className="text-[10px] text-gray-500 mt-1">
              Tags:{' '}
              <code className="bg-gray-100 px-1 rounded text-blue-600 font-mono">
                {'{n}'}
              </code>{' '}
              = index number,{' '}
              <code className="bg-gray-100 px-1 rounded text-blue-600 font-mono">
                {'{hash}'}
              </code>{' '}
              = random hash
            </p>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            Quantity ({emailCount}):
          </label>
          <input
            type="number"
            min="1"
            max="30"
            value={emailCount}
            onChange={(e) => {
              const cnt = parseInt(e.target.value) || 1;
              setEmailCount(cnt);
              updateEmails(
                emailDomain,
                customDomain,
                cnt,
                emailPrefixType,
                customPrefix,
              );
            }}
            className="w-full text-xs font-medium bg-white border border-gray-300 rounded-lg p-2 focus:ring-blue-500 text-center"
          />
        </div>
      </div>

      {/* Results Output */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs font-bold text-gray-500">
          <span>Generated Email Addresses ({generatedEmails.length}):</span>
          <button
            onClick={() =>
              copyToClipboard(generatedEmails.join('\n'), 'Copied all emails!')
            }
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-semibold"
          >
            <Copy className="w-3.5 h-3.5" /> Copy All
          </button>
        </div>

        <div className="space-y-2">
          {generatedEmails.map((email, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-slate-900 text-blue-300 font-mono text-xs sm:text-sm rounded-xl border border-slate-800"
            >
              <span className="truncate select-all">{email}</span>
              <button
                onClick={() => copyToClipboard(email)}
                className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white"
                title="Copy email"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RandomEmailTool;
