import React, { useEffect, useRef, useState } from 'react';
import { LayoutTemplate, Copy, Eye, Code2, Loader2 } from 'lucide-react';
import { usePersistentState } from '../../hooks/usePersistentState';
import { loadScript, loadStylesheet } from '../../utils/loadExternal';

interface HtmlComposerToolProps {
  copyToClipboard: (text: string, label?: string) => void;
}

// Loaded from CDN at runtime — see https://quilljs.com/docs/quickstart
declare global {
  interface Window {
    Quill?: new (
      element: HTMLElement,
      options: unknown,
    ) => {
      root: HTMLElement;
      on: (event: string, handler: () => void) => void;
      clipboard: { dangerouslyPasteHTML: (html: string) => void };
    };
  }
}

const QUILL_JS = 'https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js';
const QUILL_CSS =
  'https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css';

const DEFAULT_HTML =
  '<h2>Welcome to Toro Solutions</h2><p>Start typing to compose your <strong>HTML</strong> content, then copy the generated markup below.</p>';

const HtmlComposerTool: React.FC<HtmlComposerToolProps> = ({
  copyToClipboard,
}) => {
  const [htmlContent, setHtmlContent] = usePersistentState<string>(
    'htmlComposerContent',
    DEFAULT_HTML,
  );
  const [view, setView] = useState<'code' | 'preview'>('code');
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(
    'loading',
  );

  const editorHostRef = useRef<HTMLDivElement>(null);
  const initialContentRef = useRef(htmlContent);

  useEffect(() => {
    let cancelled = false;

    loadStylesheet(QUILL_CSS);
    loadScript(QUILL_JS)
      .then(() => {
        if (cancelled || !editorHostRef.current || !window.Quill) return;

        const quill = new window.Quill(editorHostRef.current, {
          theme: 'snow',
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ color: [] }, { background: [] }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ align: [] }],
              ['link', 'image', 'blockquote', 'code-block'],
              ['clean'],
            ],
          },
        });

        quill.clipboard.dangerouslyPasteHTML(initialContentRef.current);
        quill.on('text-change', () => {
          setHtmlContent(quill.root.innerHTML);
        });

        setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <LayoutTemplate className="w-5 h-5 text-blue-600" /> HTML Composer
          (WYSIWYG)
        </h3>
        <span className="text-[11px] text-gray-400 font-medium">
          Editor loaded via CDN (Quill.js)
        </span>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
          Editor:
        </label>
        <div className="bg-slate-50 border border-gray-300 rounded-xl overflow-hidden">
          {status === 'loading' && (
            <div className="p-8 flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading editor from
              CDN...
            </div>
          )}
          {status === 'error' && (
            <div className="p-8 text-center text-xs text-red-500 font-medium">
              Failed to load the editor from the CDN. Check your connection and
              reload the page.
            </div>
          )}
          <div
            ref={editorHostRef}
            style={{
              minHeight: '260px',
              display: status === 'ready' ? 'block' : 'none',
            }}
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setView('code')}
              className={`px-3 py-1 text-xs font-bold rounded-md flex items-center gap-1 transition-colors ${
                view === 'code'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" /> HTML
            </button>
            <button
              onClick={() => setView('preview')}
              className={`px-3 py-1 text-xs font-bold rounded-md flex items-center gap-1 transition-colors ${
                view === 'preview'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> Preview
            </button>
          </div>
          <button
            onClick={() => copyToClipboard(htmlContent, 'HTML copied!')}
            className="text-xs text-blue-600 font-semibold flex items-center gap-1"
          >
            <Copy className="w-3.5 h-3.5" /> Copy HTML
          </button>
        </div>

        {view === 'code' ? (
          <textarea
            readOnly
            rows={10}
            value={htmlContent}
            onClick={(e) => {
              e.currentTarget.select();
              copyToClipboard(htmlContent, 'HTML copied!');
            }}
            className="w-full font-mono text-xs p-3 bg-slate-900 text-emerald-400 border border-slate-800 rounded-xl cursor-pointer select-all"
          />
        ) : (
          <div
            className="p-4 bg-white border border-gray-200 rounded-xl min-h-[100px]"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        )}
      </div>
    </div>
  );
};

export default HtmlComposerTool;
