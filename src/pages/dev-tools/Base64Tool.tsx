import React, { useMemo, useState } from 'react';
import { Binary, Upload, Copy, ExternalLink, Wand2 } from 'lucide-react';
import { usePersistentState } from '../../hooks/usePersistentState';

const TEMPLATE_TOKEN = '${output}';

function isClickableUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

interface Base64ToolProps {
  copyToClipboard: (text: string, label?: string) => void;
}

const Base64Tool: React.FC<Base64ToolProps> = ({ copyToClipboard }) => {
  const [base64Input, setBase64Input] = usePersistentState<string>(
    'base64Input',
    'Hello Toro Solutions!',
  );
  const [base64Mode, setBase64Mode] = usePersistentState<'encode' | 'decode'>(
    'base64Mode',
    'encode',
  );
  const [outputTemplate, setOutputTemplate] = usePersistentState<string>(
    'base64OutputTemplate',
    '',
  );
  const [fileBase64, setFileBase64] = useState<{
    name: string;
    size: number;
    dataUrl: string;
  } | null>(null);

  const base64Output = useMemo(() => {
    try {
      if (base64Mode === 'encode') {
        const bytes = new TextEncoder().encode(base64Input);
        let binString = '';
        bytes.forEach((b) => (binString += String.fromCharCode(b)));
        return btoa(binString);
      } else {
        const binString = atob(base64Input.trim());
        const bytes = Uint8Array.from(binString, (m) => m.charCodeAt(0));
        return new TextDecoder().decode(bytes);
      }
    } catch {
      return '[Error: Invalid string for Base64 transformation]';
    }
  }, [base64Input, base64Mode]);

  const finalOutput = useMemo(() => {
    const template = outputTemplate.trim();
    if (!template) return base64Output;
    return template.split(TEMPLATE_TOKEN).join(base64Output);
  }, [outputTemplate, base64Output]);

  const finalOutputIsUrl = useMemo(
    () => isClickableUrl(finalOutput),
    [finalOutput],
  );

  const handleFileUploadBase64 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFileBase64({
          name: file.name,
          size: file.size,
          dataUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex justify-between items-center border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Binary className="w-5 h-5 text-blue-600" /> Base64 Encoder /
            Decoder
          </h3>
          <p className="text-xs text-gray-500">
            Convert text or files to Base64 data representation with UTF-8
            support.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setBase64Mode('encode')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
              base64Mode === 'encode'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => setBase64Mode('decode')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
              base64Mode === 'decode'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Decode
          </button>
        </div>
      </div>

      {/* Text Input / Output */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            Input String ({base64Mode.toUpperCase()}):
          </label>
          <textarea
            rows={6}
            value={base64Input}
            onChange={(e) => setBase64Input(e.target.value)}
            className="w-full font-mono text-xs p-3 bg-slate-50 border border-gray-300 rounded-xl focus:ring-blue-500"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-xs font-bold text-gray-700 uppercase">
              Result Output:
            </label>
            <button
              onClick={() => copyToClipboard(base64Output)}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
            >
              <Copy className="w-3.5 h-3.5" /> Copy
            </button>
          </div>
          <textarea
            rows={6}
            readOnly
            value={base64Output}
            className="w-full font-mono text-xs p-3 bg-slate-900 text-emerald-400 border border-slate-800 rounded-xl"
          />
        </div>
      </div>

      {/* Output Template */}
      <div className="border-t border-gray-100 pt-6 space-y-3">
        <div>
          <label className="text-xs font-bold text-gray-700 uppercase mb-1 flex items-center gap-1.5">
            <Wand2 className="w-3.5 h-3.5 text-blue-600" /> Output Template
            (optional):
          </label>
          <input
            type="text"
            value={outputTemplate}
            onChange={(e) => setOutputTemplate(e.target.value)}
            placeholder="e.g. https://example.com/query=${output}"
            className="w-full font-mono text-xs p-3 bg-slate-50 border border-gray-300 rounded-xl focus:ring-blue-500"
          />
          <p className="text-[10px] text-gray-500 mt-1">
            Wrap the result above into a bigger string — use{' '}
            <code className="bg-gray-100 px-1 rounded text-blue-600 font-mono">
              {TEMPLATE_TOKEN}
            </code>{' '}
            as the placeholder for the Result Output. Leave blank to use the raw
            output as-is.
          </p>
        </div>

        {outputTemplate.trim() && (
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-bold text-gray-700 uppercase">
                Final Output:
              </label>
              <button
                onClick={() =>
                  copyToClipboard(finalOutput, 'Final output copied!')
                }
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" /> Copy
              </button>
            </div>
            <div className="w-full font-mono text-xs p-3 bg-slate-900 border border-slate-800 rounded-xl break-all">
              {finalOutputIsUrl ? (
                <a
                  href={finalOutput}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2 inline-flex items-center gap-1.5"
                >
                  {finalOutput}{' '}
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                </a>
              ) : (
                <span className="text-emerald-400">{finalOutput}</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* File to Base64 Section */}
      <div className="border-t border-gray-100 pt-6">
        <h4 className="font-bold text-sm text-gray-900 mb-2 flex items-center gap-2">
          <Upload className="w-4 h-4 text-blue-600" /> File to Base64 Data URI
          Converter
        </h4>
        <input
          type="file"
          onChange={handleFileUploadBase64}
          className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        {fileBase64 && (
          <div className="mt-4 p-4 bg-slate-900 rounded-xl text-white space-y-2">
            <div className="flex justify-between text-xs text-gray-400 border-b border-slate-800 pb-2">
              <span>
                File: {fileBase64.name} ({(fileBase64.size / 1024).toFixed(1)}{' '}
                KB)
              </span>
              <button
                onClick={() =>
                  copyToClipboard(fileBase64.dataUrl, 'Base64 Data URI copied!')
                }
                className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" /> Copy Base64 Data URI
              </button>
            </div>
            <div className="font-mono text-xs text-emerald-400 truncate">
              {fileBase64.dataUrl}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Base64Tool;
