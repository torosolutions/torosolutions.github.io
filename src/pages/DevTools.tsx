import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, RotateCcw } from 'lucide-react';
import { clearStoredSettings } from '../utils/storage';
import { useClipboardToast } from '../hooks/useClipboardToast';
import TabNav from './dev-tools/TabNav';
import { TAB_LIST } from '../constants/devTools';
import type { TabType } from '../constants/devTools';
import Toast from './dev-tools/Toast';
import RandomStringTool from './dev-tools/RandomStringTool';
import RandomEmailTool from './dev-tools/RandomEmailTool';
import Base64Tool from './dev-tools/Base64Tool';
import UrlHtmlEncoderTool from './dev-tools/UrlHtmlEncoderTool';
import UuidHashTool from './dev-tools/UuidHashTool';
import TextCaseJsonTool from './dev-tools/TextCaseJsonTool';
import LipsumTool from './dev-tools/LipsumTool';
import UserProfileTool from './dev-tools/UserProfileTool';
import HtmlComposerTool from './dev-tools/HtmlComposerTool';

const TAB_IDS = TAB_LIST.map((t) => t.id);

const DevTools: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const toolParam = searchParams.get('tool') as TabType | null;

  const activeTab: TabType = useMemo(() => {
    if (toolParam && TAB_IDS.includes(toolParam)) {
      return toolParam;
    }
    return 'strings';
  }, [toolParam]);

  const { toastMsg, showToast, copyToClipboard } = useClipboardToast();

  const handleSelectTab = (tab: TabType, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setSearchParams({ tool: tab });
  };

  const handleResetSettings = () => {
    clearStoredSettings();
    showToast('Reset all preferences to defaults!');
    setTimeout(() => window.location.reload(), 500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 mb-3">
          <Sparkles className="w-3.5 h-3.5" /> All-In-One Developer Toolset
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Developer Utility Suite
        </h1>
        <p className="mt-2 text-gray-600 text-sm sm:text-base">
          Fast, secure, browser-based utilities for developers: Generate random
          strings, mock emails, UUIDs, encode Base64/URL, compute hashes, format
          JSON, and generate Lorem Ipsum.
        </p>

        <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-500">
          <span>💾 Selections & inputs auto-saved in localStorage</span>
          <button
            onClick={handleResetSettings}
            className="text-gray-400 hover:text-red-600 font-semibold underline flex items-center gap-1 ml-1 cursor-pointer"
            title="Reset all saved inputs to default"
          >
            <RotateCcw className="w-3 h-3" /> Reset Defaults
          </button>
        </div>
      </div>

      <TabNav activeTab={activeTab} onSelect={handleSelectTab} />

      {/* Main Tab Panels */}
      <div className="max-w-4xl mx-auto">
        {activeTab === 'strings' && (
          <RandomStringTool copyToClipboard={copyToClipboard} />
        )}
        {activeTab === 'email' && (
          <RandomEmailTool copyToClipboard={copyToClipboard} />
        )}
        {activeTab === 'base64' && (
          <Base64Tool copyToClipboard={copyToClipboard} />
        )}
        {activeTab === 'encode' && (
          <UrlHtmlEncoderTool copyToClipboard={copyToClipboard} />
        )}
        {activeTab === 'uuid-hash' && (
          <UuidHashTool copyToClipboard={copyToClipboard} />
        )}
        {activeTab === 'json' && (
          <TextCaseJsonTool copyToClipboard={copyToClipboard} />
        )}
        {activeTab === 'lipsum' && (
          <LipsumTool copyToClipboard={copyToClipboard} />
        )}
        {activeTab === 'qa-profile' && (
          <UserProfileTool copyToClipboard={copyToClipboard} />
        )}
        {activeTab === 'html-composer' && (
          <HtmlComposerTool copyToClipboard={copyToClipboard} />
        )}
      </div>

      <Toast message={toastMsg} />
    </div>
  );
};

export default DevTools;
