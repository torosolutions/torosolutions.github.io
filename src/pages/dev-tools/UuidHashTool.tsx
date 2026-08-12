import React, { useEffect, useState } from 'react';
import { Lock, Layers, RefreshCw, Copy } from 'lucide-react';
import { md5, generateUuidsHelper } from '../../utils/crypto';
import { getStoredValue } from '../../utils/storage';
import { usePersistentState } from '../../hooks/usePersistentState';

interface UuidHashToolProps {
  copyToClipboard: (text: string, label?: string) => void;
}

const UuidHashTool: React.FC<UuidHashToolProps> = ({ copyToClipboard }) => {
  const [uuidCount, setUuidCount] = usePersistentState<number>('uuidCount', 5);
  const [uuidUppercase, setUuidUppercase] = usePersistentState<boolean>(
    'uuidUppercase',
    false,
  );
  const [uuidNoHyphens, setUuidNoHyphens] = usePersistentState<boolean>(
    'uuidNoHyphens',
    false,
  );
  const [generatedUuids, setGeneratedUuids] = useState<string[]>(() =>
    generateUuidsHelper(
      getStoredValue('uuidCount', 5),
      getStoredValue('uuidUppercase', false),
      getStoredValue('uuidNoHyphens', false),
    ),
  );

  const updateUuids = (
    cnt = uuidCount,
    upper = uuidUppercase,
    noHyphen = uuidNoHyphens,
  ) => {
    setGeneratedUuids(generateUuidsHelper(cnt, upper, noHyphen));
  };

  const generateUuids = () => updateUuids();

  const [hashInput, setHashInput] = usePersistentState<string>(
    'hashInput',
    'Toro Solutions',
  );
  const [hashResults, setHashResults] = useState<{
    md5: string;
    sha1: string;
    sha256: string;
    sha512: string;
  }>({ md5: '', sha1: '', sha256: '', sha512: '' });

  useEffect(() => {
    let isSubscribed = true;
    const computeHashes = async () => {
      const msgUint8 = new TextEncoder().encode(hashInput);

      const sha1Buf = await crypto.subtle.digest('SHA-1', msgUint8);
      const sha1Hex = Array.from(new Uint8Array(sha1Buf))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');

      const sha256Buf = await crypto.subtle.digest('SHA-256', msgUint8);
      const sha256Hex = Array.from(new Uint8Array(sha256Buf))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');

      const sha512Buf = await crypto.subtle.digest('SHA-512', msgUint8);
      const sha512Hex = Array.from(new Uint8Array(sha512Buf))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');

      if (isSubscribed) {
        setHashResults({
          md5: md5(hashInput),
          sha1: sha1Hex,
          sha256: sha256Hex,
          sha512: sha512Hex,
        });
      }
    };
    computeHashes();
    return () => {
      isSubscribed = false;
    };
  }, [hashInput]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-8">
      {/* UUID Generator */}
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-600" /> UUID (v4) Generator
          </h3>
          <button
            onClick={generateUuids}
            className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-100"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Generate
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-6 bg-slate-50 p-4 rounded-xl text-xs font-medium">
          <label className="flex items-center gap-2">
            Quantity:
            <input
              type="number"
              min="1"
              max="50"
              value={uuidCount}
              onChange={(e) => {
                const cnt = parseInt(e.target.value) || 1;
                setUuidCount(cnt);
                updateUuids(cnt);
              }}
              className="w-16 p-1 border rounded text-center bg-white"
            />
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={uuidUppercase}
              onChange={(e) => {
                setUuidUppercase(e.target.checked);
                updateUuids(uuidCount, e.target.checked);
              }}
              className="rounded text-blue-600"
            />
            Uppercase
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={uuidNoHyphens}
              onChange={(e) => {
                setUuidNoHyphens(e.target.checked);
                updateUuids(uuidCount, uuidUppercase, e.target.checked);
              }}
              className="rounded text-blue-600"
            />
            Remove Hyphens (-)
          </label>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-gray-500">
            <span>Generated UUIDs:</span>
            <button
              onClick={() =>
                copyToClipboard(generatedUuids.join('\n'), 'Copied all UUIDs!')
              }
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Copy All
            </button>
          </div>
          {generatedUuids.map((u, i) => (
            <div
              key={i}
              onClick={() => copyToClipboard(u)}
              className="flex justify-between items-center p-2.5 bg-slate-900 text-purple-300 font-mono text-xs rounded-xl cursor-pointer hover:bg-slate-800 transition-colors"
              title="Click to copy"
            >
              <span className="select-all">{u}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(u);
                }}
                className="p-1 text-slate-400 hover:text-white"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cryptographic Hashes */}
      <div className="space-y-4 border-t border-gray-100 pt-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600" /> Hash Calculators (MD5 /
          SHA)
        </h3>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            Text to Hash:
          </label>
          <textarea
            value={hashInput}
            onChange={(e) => setHashInput(e.target.value)}
            rows={3}
            className="w-full font-mono text-xs p-3 bg-slate-50 border border-gray-300 rounded-xl resize-y"
          />
        </div>

        <div className="space-y-3">
          {[
            { label: 'MD5 Hash', val: hashResults.md5 },
            { label: 'SHA-1 Hash', val: hashResults.sha1 },
            { label: 'SHA-256 Hash', val: hashResults.sha256 },
            { label: 'SHA-512 Hash', val: hashResults.sha512 },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => copyToClipboard(item.val, `${item.label} copied!`)}
              className="bg-slate-900 p-3 rounded-xl text-white text-xs cursor-pointer hover:bg-slate-800 transition-colors"
              title="Click to copy"
            >
              <div className="flex justify-between text-slate-400 mb-1 font-semibold">
                <span>{item.label}:</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(item.val, `${item.label} copied!`);
                  }}
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-bold"
                >
                  <Copy className="w-3 h-3" /> Copy
                </button>
              </div>
              <div className="font-mono text-emerald-400 break-all select-all">
                {item.val}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UuidHashTool;
