import React, { useMemo, useState } from 'react';
import { FileCode, AlertCircle, Copy } from 'lucide-react';
import {
  toCamelCase,
  toPascalCase,
  toSnakeCase,
  toKebabCase,
} from '../../utils/textTransform';
import { usePersistentState } from '../../hooks/usePersistentState';

interface TextCaseJsonToolProps {
  copyToClipboard: (text: string, label?: string) => void;
}

const TextCaseJsonTool: React.FC<TextCaseJsonToolProps> = ({
  copyToClipboard,
}) => {
  const [caseInput, setCaseInput] = usePersistentState<string>(
    'caseInput',
    'hello world toro solutions developer utilities',
  );
  const [jsonInput, setJsonInput] = usePersistentState<string>(
    'jsonInput',
    '{\n  "name": "Toro Solutions",\n  "tools": ["ID Photo", "Dev Utilities"],\n  "status": "active"\n}',
  );

  const [jsonIndent, setJsonIndent] = useState<number>(2);

  const { jsonOutput, jsonError } = useMemo(() => {
    try {
      const parsed = JSON.parse(jsonInput);
      return {
        jsonOutput: JSON.stringify(parsed, null, jsonIndent),
        jsonError: null,
      };
    } catch (err: unknown) {
      return {
        jsonOutput: '',
        jsonError: (err as Error).message,
      };
    }
  }, [jsonInput, jsonIndent]);

  const formatJson = (space: number) => setJsonIndent(space);
  const minifyJson = () => setJsonIndent(0);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-8">
      {/* Text Case Converter */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
          <FileCode className="w-5 h-5 text-blue-600" /> Text Case Converter
        </h3>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            Input Text:
          </label>
          <input
            type="text"
            value={caseInput}
            onChange={(e) => setCaseInput(e.target.value)}
            className="w-full font-mono text-xs p-3 bg-slate-50 border border-gray-300 rounded-xl"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: 'camelCase', val: toCamelCase(caseInput) },
            { label: 'PascalCase', val: toPascalCase(caseInput) },
            { label: 'snake_case', val: toSnakeCase(caseInput) },
            { label: 'kebab-case', val: toKebabCase(caseInput) },
            { label: 'UPPERCASE', val: caseInput.toUpperCase() },
            { label: 'lowercase', val: caseInput.toLowerCase() },
          ].map((c, i) => (
            <div
              key={i}
              className="p-3 bg-slate-50 rounded-xl border border-gray-200 flex justify-between items-center text-xs"
            >
              <div>
                <span className="font-bold text-gray-500 block mb-0.5">
                  {c.label}:
                </span>
                <span className="font-mono font-medium text-gray-900 truncate block max-w-[240px] select-all">
                  {c.val}
                </span>
              </div>
              <button
                onClick={() => copyToClipboard(c.val)}
                className="p-1.5 text-gray-400 hover:text-blue-600"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* JSON Formatter */}
      <div className="space-y-4 border-t border-gray-100 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <FileCode className="w-5 h-5 text-blue-600" /> JSON Beautifier &
            Minifier
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => formatJson(2)}
              className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100"
            >
              Format (2 spaces)
            </button>
            <button
              onClick={minifyJson}
              className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-100"
            >
              Minify
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              JSON Input:
            </label>
            <textarea
              rows={8}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="w-full font-mono text-xs p-3 bg-slate-50 border border-gray-300 rounded-xl focus:ring-blue-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-bold text-gray-700 uppercase">
                Output:
              </label>
              <button
                onClick={() => copyToClipboard(jsonOutput, 'JSON copied!')}
                className="text-xs text-blue-600 font-semibold flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" /> Copy
              </button>
            </div>
            {jsonError ? (
              <div className="p-3 bg-red-50 text-red-600 text-xs font-mono rounded-xl border border-red-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{jsonError}</span>
              </div>
            ) : (
              <textarea
                rows={8}
                readOnly
                value={jsonOutput}
                className="w-full font-mono text-xs p-3 bg-slate-900 text-emerald-400 border border-slate-800 rounded-xl"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextCaseJsonTool;
