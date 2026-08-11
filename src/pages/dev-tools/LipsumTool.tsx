import React, { useMemo } from 'react';
import { FileText, RefreshCw, Copy, AlignLeft } from 'lucide-react';

import {
  generateLoremIpsumHelper,
  type LipsumUnit,
  type LipsumFlavor,
} from '../../utils/loremIpsum';
import { usePersistentState } from '../../hooks/usePersistentState';

interface LipsumToolProps {
  copyToClipboard: (text: string, label?: string) => void;
}

const LipsumTool: React.FC<LipsumToolProps> = ({ copyToClipboard }) => {
  const [count, setCount] = usePersistentState<number>('lipsumCount', 3);
  const [unit, setUnit] = usePersistentState<LipsumUnit>(
    'lipsumUnit',
    'paragraphs',
  );
  const [flavor, setFlavor] = usePersistentState<LipsumFlavor>(
    'lipsumFlavor',
    'classic',
  );
  const [startWithLorem, setStartWithLorem] = usePersistentState<boolean>(
    'lipsumStartWithLorem',
    true,
  );
  const [wrapHtml, setWrapHtml] = usePersistentState<boolean>(
    'lipsumWrapHtml',
    false,
  );
  const [seed, setSeed] = usePersistentState<number>('lipsumSeed', 1);

  const generatedText = useMemo(() => {
    // seed forces re-evaluation when Regenerate is clicked
    return generateLoremIpsumHelper({
      count,
      unit,
      flavor,
      startWithLorem,
      wrapHtml,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, unit, flavor, startWithLorem, wrapHtml, seed]);

  const stats = useMemo(() => {
    const text = generatedText.replace(/<[^>]*>/g, '');
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    return { words, chars };
  }, [generatedText]);

  const handleRegenerate = () => {
    setSeed((prev) => prev + 1);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" /> Lorem Ipsum Generator
          </h3>
          <p className="text-xs text-gray-500">
            Generate dummy placeholder text for UI layouts, design mockups, and
            typesetting.
          </p>
        </div>
        <button
          onClick={handleRegenerate}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Regenerate
        </button>
      </div>

      {/* Controls Box */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-slate-50 p-5 rounded-xl border border-gray-200">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            Quantity ({count} {unit}):
          </label>
          <input
            type="range"
            min="1"
            max={unit === 'words' ? 200 : 20}
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-2"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            Unit Type:
          </label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as LipsumUnit)}
            className="w-full text-xs font-medium bg-white border border-gray-300 rounded-lg p-2.5 focus:ring-blue-500"
          >
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            Flavor / Dictionary:
          </label>
          <select
            value={flavor}
            onChange={(e) => setFlavor(e.target.value as LipsumFlavor)}
            className="w-full text-xs font-medium bg-white border border-gray-300 rounded-lg p-2.5 focus:ring-blue-500"
          >
            <option value="classic">Classic Latin (Lorem Ipsum)</option>
            <option value="hipster">Hipster (Artisanal / Craft)</option>
            <option value="tech">Corporate / Tech Jargon</option>
          </select>
        </div>

        {/* Checkbox Options */}
        <div className="md:col-span-3 flex flex-wrap items-center gap-6 pt-2 border-t border-gray-200">
          <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={startWithLorem}
              onChange={(e) => setStartWithLorem(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            Start with &quot;Lorem ipsum dolor sit amet...&quot;
          </label>

          <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={wrapHtml}
              onChange={(e) => setWrapHtml(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            Wrap with{' '}
            <code className="bg-gray-200 px-1 rounded text-blue-600">
              &lt;p&gt;
            </code>{' '}
            HTML tags
          </label>
        </div>
      </div>

      {/* Output Header & Stats */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs font-bold text-gray-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <AlignLeft className="w-3.5 h-3.5 text-blue-600" /> Output
              Preview:
            </span>
            <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-mono text-[11px]">
              {stats.words} words • {stats.chars} characters
            </span>
          </div>

          <button
            onClick={() =>
              copyToClipboard(generatedText, 'Lorem Ipsum text copied!')
            }
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-semibold cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" /> Copy Text
          </button>
        </div>

        {/* Output Text Area */}
        <textarea
          rows={10}
          readOnly
          value={generatedText}
          className="w-full font-mono text-xs p-4 bg-slate-900 text-emerald-400 border border-slate-800 rounded-xl leading-relaxed focus:ring-blue-500 select-all"
        />
      </div>
    </div>
  );
};

export default LipsumTool;
