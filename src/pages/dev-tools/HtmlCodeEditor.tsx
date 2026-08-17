import React, { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { loadScript, loadStylesheet } from '../../utils/loadExternal';

// Loaded from CDN at runtime — see https://codemirror.net/5/docs/manual.html
declare global {
  interface Window {
    CodeMirror?: new (
      element: HTMLElement,
      options: unknown,
    ) => {
      getValue: () => string;
      setValue: (value: string) => void;
      setSize: (
        width: string | number | null,
        height: string | number | null,
      ) => void;
      refresh: () => void;
      on: (
        event: string,
        handler: (instance: { getValue: () => string }) => void,
      ) => void;
    };
  }
}

type CodeMirrorInstance = InstanceType<NonNullable<Window['CodeMirror']>>;

const CODEMIRROR_VERSION = '5.65.16';
const CODEMIRROR_BASE = `https://cdn.jsdelivr.net/npm/codemirror@${CODEMIRROR_VERSION}`;
const CODEMIRROR_JS = `${CODEMIRROR_BASE}/lib/codemirror.js`;
const CODEMIRROR_CSS = `${CODEMIRROR_BASE}/lib/codemirror.css`;
const CODEMIRROR_THEME_CSS = `${CODEMIRROR_BASE}/theme/material-darker.css`;
const CODEMIRROR_MODE_XML_JS = `${CODEMIRROR_BASE}/mode/xml/xml.js`;
const CODEMIRROR_MODE_JAVASCRIPT_JS = `${CODEMIRROR_BASE}/mode/javascript/javascript.js`;
const CODEMIRROR_MODE_CSS_JS = `${CODEMIRROR_BASE}/mode/css/css.js`;
const CODEMIRROR_MODE_HTMLMIXED_JS = `${CODEMIRROR_BASE}/mode/htmlmixed/htmlmixed.js`;

interface HtmlCodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  height?: string;
}

const HtmlCodeEditor: React.FC<HtmlCodeEditorProps> = ({
  value,
  onChange,
  visible,
  height = '260px',
}) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const cmRef = useRef<CodeMirrorInstance | null>(null);
  const isInternalChange = useRef(false);
  const valueRef = useRef(value);
  const onChangeRef = useRef(onChange);

  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(
    'loading',
  );

  useEffect(() => {
    valueRef.current = value;
    onChangeRef.current = onChange;
  }, [value, onChange]);

  useEffect(() => {
    let cancelled = false;

    loadStylesheet(CODEMIRROR_CSS);
    loadStylesheet(CODEMIRROR_THEME_CSS);
    loadScript(CODEMIRROR_JS)
      .then(() =>
        Promise.all([
          loadScript(CODEMIRROR_MODE_XML_JS),
          loadScript(CODEMIRROR_MODE_JAVASCRIPT_JS),
          loadScript(CODEMIRROR_MODE_CSS_JS),
        ]),
      )
      .then(() => loadScript(CODEMIRROR_MODE_HTMLMIXED_JS))
      .then(() => {
        if (cancelled || !hostRef.current || !window.CodeMirror) return;

        const cm = new window.CodeMirror(hostRef.current, {
          value: valueRef.current,
          mode: 'htmlmixed',
          theme: 'material-darker',
          lineNumbers: true,
          lineWrapping: true,
        });
        cm.setSize('100%', height);
        cm.on('change', (instance) => {
          isInternalChange.current = true;
          onChangeRef.current(instance.getValue());
        });

        cmRef.current = cm;
        setStatus('ready');
        // The host may have been zero-sized while status was 'loading';
        // force a re-measure now that it's actually visible.
        requestAnimationFrame(() => cm.refresh());
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isInternalChange.current) {
      isInternalChange.current = false;
      return;
    }
    if (cmRef.current && cmRef.current.getValue() !== value) {
      cmRef.current.setValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (visible) cmRef.current?.refresh();
  }, [visible]);

  return (
    <div
      className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden text-xs"
      style={{ display: visible ? 'block' : 'none' }}
    >
      {status === 'loading' && (
        <div className="p-8 flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading code editor from
          CDN...
        </div>
      )}
      {status === 'error' && (
        <div className="p-8 text-center text-xs text-red-500 font-medium">
          Failed to load the code editor from the CDN. Check your connection and
          reload the page.
        </div>
      )}
      <div
        ref={hostRef}
        style={{ visibility: status === 'ready' ? 'visible' : 'hidden' }}
      />
    </div>
  );
};

export default HtmlCodeEditor;
