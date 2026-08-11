import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { PRESET_COLORS } from '../../constants/idPhotoPresets';

interface BackgroundColorPanelProps {
  bgColor: string;
  setBgColor: (val: string) => void;
  useBgReplace: boolean;
  setUseBgReplace: (val: boolean) => void;
}

const BackgroundColorPanel: React.FC<BackgroundColorPanelProps> = ({
  bgColor,
  setBgColor,
  useBgReplace,
  setUseBgReplace,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-3">
      <h3 className="font-bold text-gray-900 text-xs sm:text-sm flex items-center gap-2">
        <ImageIcon className="w-4 h-4 text-indigo-600" />
        Background Color Fill
      </h3>

      <div className="flex items-center justify-between text-xs text-gray-600">
        <span>Enable background color fill:</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={useBgReplace}
            onChange={(e) => setUseBgReplace(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
        </label>
      </div>

      {useBgReplace && (
        <div className="grid grid-cols-3 gap-2 pt-1">
          {PRESET_COLORS.map((c) => (
            <button
              key={c.id}
              onClick={() => setBgColor(c.color)}
              className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border text-xs font-medium transition-all min-h-[38px] ${
                bgColor === c.color
                  ? 'border-indigo-600 ring-2 ring-indigo-500/20 bg-indigo-50/40 font-semibold'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span
                className="w-4 h-4 rounded-full border border-gray-300 flex-shrink-0"
                style={{
                  backgroundColor:
                    c.color === 'transparent' ? '#FFFFFF' : c.color,
                }}
              />
              <span className="truncate">{c.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BackgroundColorPanel;
