import React, { useState } from 'react';
import { KeyRound, RefreshCw, Copy } from 'lucide-react';
import { generateStringsHelper } from '../../utils/crypto';
import { getStoredValue } from '../../utils/storage';
import { usePersistentState } from '../../hooks/usePersistentState';

interface RandomStringToolProps {
  copyToClipboard: (text: string, label?: string) => void;
}

const RandomStringTool: React.FC<RandomStringToolProps> = ({
  copyToClipboard,
}) => {
  const [strLength, setStrLength] = usePersistentState<number>('strLength', 16);
  const [includeUpper, setIncludeUpper] = usePersistentState<boolean>(
    'includeUpper',
    true,
  );
  const [includeLower, setIncludeLower] = usePersistentState<boolean>(
    'includeLower',
    true,
  );
  const [includeDigits, setIncludeDigits] = usePersistentState<boolean>(
    'includeDigits',
    true,
  );
  const [includeSymbols, setIncludeSymbols] = usePersistentState<boolean>(
    'includeSymbols',
    true,
  );
  const [excludeLookalike, setExcludeLookalike] = usePersistentState<boolean>(
    'excludeLookalike',
    true,
  );
  const [strCount, setStrCount] = usePersistentState<number>('strCount', 5);
  const [generatedStrings, setGeneratedStrings] = useState<string[]>(() =>
    generateStringsHelper(
      getStoredValue('strLength', 16),
      getStoredValue('includeUpper', true),
      getStoredValue('includeLower', true),
      getStoredValue('includeDigits', true),
      getStoredValue('includeSymbols', true),
      getStoredValue('excludeLookalike', true),
      getStoredValue('strCount', 5),
    ),
  );

  const updateStrings = (
    len = strLength,
    upper = includeUpper,
    lower = includeLower,
    digits = includeDigits,
    symbols = includeSymbols,
    lookalike = excludeLookalike,
    count = strCount,
  ) => {
    setGeneratedStrings(
      generateStringsHelper(
        len,
        upper,
        lower,
        digits,
        symbols,
        lookalike,
        count,
      ),
    );
  };

  const generateRandomStrings = () => updateStrings();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex justify-between items-center border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-blue-600" /> Random String
            Generator
          </h3>
          <p className="text-xs text-gray-500">
            Generate secure cryptographically random strings, passwords, or
            tokens.
          </p>
        </div>
        <button
          onClick={generateRandomStrings}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-semibold"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Regenerate
        </button>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-xl border border-gray-200">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            String Length: {strLength} chars
          </label>
          <input
            type="range"
            min="4"
            max="128"
            value={strLength}
            onChange={(e) => {
              const len = parseInt(e.target.value);
              setStrLength(len);
              updateStrings(len);
            }}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            Quantity: {strCount} strings
          </label>
          <input
            type="range"
            min="1"
            max="20"
            value={strCount}
            onChange={(e) => {
              const cnt = parseInt(e.target.value);
              setStrCount(cnt);
              updateStrings(
                strLength,
                includeUpper,
                includeLower,
                includeDigits,
                includeSymbols,
                excludeLookalike,
                cnt,
              );
            }}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={includeUpper}
              onChange={(e) => {
                setIncludeUpper(e.target.checked);
                updateStrings(strLength, e.target.checked);
              }}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            A-Z (Uppercase)
          </label>
          <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={includeLower}
              onChange={(e) => {
                setIncludeLower(e.target.checked);
                updateStrings(strLength, includeUpper, e.target.checked);
              }}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            a-z (Lowercase)
          </label>
          <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={includeDigits}
              onChange={(e) => {
                setIncludeDigits(e.target.checked);
                updateStrings(
                  strLength,
                  includeUpper,
                  includeLower,
                  e.target.checked,
                );
              }}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            0-9 (Numbers)
          </label>
          <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => {
                setIncludeSymbols(e.target.checked);
                updateStrings(
                  strLength,
                  includeUpper,
                  includeLower,
                  includeDigits,
                  e.target.checked,
                );
              }}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            !@#$ (Symbols)
          </label>
        </div>

        <div className="md:col-span-2 pt-1">
          <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={excludeLookalike}
              onChange={(e) => {
                setExcludeLookalike(e.target.checked);
                updateStrings(
                  strLength,
                  includeUpper,
                  includeLower,
                  includeDigits,
                  includeSymbols,
                  e.target.checked,
                );
              }}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            Exclude ambiguous/look-alike characters (0, O, 1, l, I, 8, B)
          </label>
        </div>
      </div>

      {/* Results Output */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs font-bold text-gray-500">
          <span>Generated Output:</span>
          <button
            onClick={() =>
              copyToClipboard(
                generatedStrings.join('\n'),
                'Copied all strings!',
              )
            }
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-semibold"
          >
            <Copy className="w-3.5 h-3.5" /> Copy All
          </button>
        </div>

        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {generatedStrings.map((str, idx) => (
            <div
              key={idx}
              onClick={() => copyToClipboard(str)}
              className="flex items-center justify-between p-3 bg-slate-900 text-emerald-400 font-mono text-xs sm:text-sm rounded-xl border border-slate-800 shadow-xs cursor-pointer hover:border-slate-600 transition-colors"
              title="Click to copy"
            >
              <span className="truncate select-all mr-2">{str}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(str);
                }}
                className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                title="Copy string"
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

export default RandomStringTool;
