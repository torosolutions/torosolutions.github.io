import React, { useMemo } from 'react';
import { Code2, FileText } from 'lucide-react';
import { usePersistentState } from '../../hooks/usePersistentState';

interface UrlHtmlEncoderToolProps {
  copyToClipboard: (text: string, label?: string) => void;
}

const UrlHtmlEncoderTool: React.FC<UrlHtmlEncoderToolProps> = ({
  copyToClipboard,
}) => {
  const [urlInput, setUrlInput] = usePersistentState<string>(
    'urlInput',
    'https://torosolutions.github.io?query=hello world & test=1',
  );

  const { urlEncoded, urlDecoded } = useMemo(() => {
    try {
      return {
        urlEncoded: encodeURIComponent(urlInput),
        urlDecoded: decodeURIComponent(urlInput),
      };
    } catch {
      return {
        urlEncoded: '[Invalid URL string]',
        urlDecoded: '[Invalid URL string]',
      };
    }
  }, [urlInput]);

  const [htmlInput, setHtmlInput] = usePersistentState<string>(
    'htmlInput',
    '<div class="toro">Hello & Welcome!</div>',
  );

  const htmlEncoded = useMemo(() => {
    return htmlInput
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }, [htmlInput]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-8">
      {/* URL Encoder */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
          <Code2 className="w-5 h-5 text-blue-600" /> URL Encode / Decode
        </h3>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            URL Input String:
          </label>
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="w-full font-mono text-xs p-3 bg-slate-50 border border-gray-300 rounded-xl"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
              <span>Encoded URL (encodeURIComponent):</span>
              <button
                onClick={() => copyToClipboard(urlEncoded)}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Copy
              </button>
            </div>
            <div
              onClick={() => copyToClipboard(urlEncoded)}
              className="p-3 bg-slate-900 text-blue-300 font-mono text-xs rounded-xl break-all select-all cursor-pointer hover:bg-slate-800 transition-colors"
              title="Click to copy"
            >
              {urlEncoded}
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
              <span>Decoded URL:</span>
              <button
                onClick={() => copyToClipboard(urlDecoded)}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Copy
              </button>
            </div>
            <div
              onClick={() => copyToClipboard(urlDecoded)}
              className="p-3 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl break-all select-all cursor-pointer hover:bg-slate-800 transition-colors"
              title="Click to copy"
            >
              {urlDecoded}
            </div>
          </div>
        </div>
      </div>

      {/* HTML Entities */}
      <div className="space-y-4 border-t border-gray-100 pt-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" /> HTML Entity Encoder
        </h3>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            HTML String:
          </label>
          <input
            type="text"
            value={htmlInput}
            onChange={(e) => setHtmlInput(e.target.value)}
            className="w-full font-mono text-xs p-3 bg-slate-50 border border-gray-300 rounded-xl"
          />
        </div>
        <div>
          <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
            <span>Escaped HTML Entities:</span>
            <button
              onClick={() => copyToClipboard(htmlEncoded)}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Copy
            </button>
          </div>
          <div
            onClick={() => copyToClipboard(htmlEncoded)}
            className="p-3 bg-slate-900 text-amber-300 font-mono text-xs rounded-xl break-all select-all cursor-pointer hover:bg-slate-800 transition-colors"
            title="Click to copy"
          >
            {htmlEncoded}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlHtmlEncoderTool;
