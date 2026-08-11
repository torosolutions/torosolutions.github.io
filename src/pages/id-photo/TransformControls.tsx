import React from 'react';
import {
  Sliders,
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  FlipHorizontal,
  Sun,
  Contrast as ContrastIcon,
  Gem,
  Lock,
} from 'lucide-react';

interface TransformControlsProps {
  zoom: number;
  setZoom: (val: number | ((prev: number) => number)) => void;
  setRotation: (val: number | ((prev: number) => number)) => void;
  flipH: boolean;
  setFlipH: (val: boolean) => void;
  brightness: number;
  setBrightness: (val: number) => void;
  contrast: number;
  setContrast: (val: number) => void;
  dpi: number;
  setDpi: (val: number) => void;
  useOriginalQuality: boolean;
  setUseOriginalQuality: (val: boolean) => void;
  /** True when the selected preset has a fixed pixel requirement (e.g. a
   * visa portal spec) — quality controls are disabled so exports stay
   * compliant with that exact pixel size. */
  qualityLocked: boolean;
}

function dpiLabel(dpi: number): string {
  if (dpi < 150) return 'Web / Screen';
  if (dpi < 250) return 'Draft Print';
  if (dpi < 450) return 'Standard Print';
  return 'High-Res Print';
}

const TransformControls: React.FC<TransformControlsProps> = ({
  zoom,
  setZoom,
  setRotation,
  flipH,
  setFlipH,
  brightness,
  setBrightness,
  contrast,
  setContrast,
  dpi,
  setDpi,
  useOriginalQuality,
  setUseOriginalQuality,
  qualityLocked,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-4">
      <h3 className="font-bold text-gray-900 text-xs sm:text-sm flex items-center gap-2">
        <Sliders className="w-4 h-4 text-indigo-600" />
        Transform & Lighting Controls
      </h3>

      {/* Zoom & Rotation */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-gray-700">
          <span className="font-semibold flex items-center gap-1">
            <ZoomIn className="w-3.5 h-3.5" /> Zoom ({Math.round(zoom * 100)}%)
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setZoom((z) => Math.max(0.4, z - 0.02))}
              className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-md min-h-[32px] min-w-[32px]"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.min(3.5, z + 0.02))}
              className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-md min-h-[32px] min-w-[32px]"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>
        <input
          type="range"
          min="0.4"
          max="3.5"
          step="0.05"
          value={zoom}
          onChange={(e) => setZoom(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />

        {/* Rotate & Flip Buttons */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            onClick={() => setRotation((r) => (r - 90) % 360)}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-100 min-h-[40px]"
          >
            <RotateCcw className="w-3.5 h-3.5" /> -90°
          </button>
          <button
            onClick={() => setRotation((r) => (r + 90) % 360)}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-100 min-h-[40px]"
          >
            <RotateCw className="w-3.5 h-3.5" /> +90°
          </button>
          <button
            onClick={() => setFlipH(!flipH)}
            className={`flex items-center justify-center gap-1.5 px-3 py-2.5 border rounded-xl text-xs font-semibold min-h-[40px] ${
              flipH
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FlipHorizontal className="w-3.5 h-3.5" /> Flip
          </button>
        </div>
      </div>

      {/* Brightness & Contrast Sliders */}
      <div className="border-t border-gray-100 pt-3 space-y-3">
        <div>
          <div className="flex justify-between text-xs text-gray-600 mb-1 font-medium">
            <span className="flex items-center gap-1">
              <Sun className="w-3.5 h-3.5 text-amber-500" /> Brightness
            </span>
            <span>{brightness}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="150"
            value={brightness}
            onChange={(e) => setBrightness(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-gray-600 mb-1 font-medium">
            <span className="flex items-center gap-1">
              <ContrastIcon className="w-3.5 h-3.5 text-blue-500" /> Contrast
            </span>
            <span>{contrast}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="150"
            value={contrast}
            onChange={(e) => setContrast(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>
      </div>

      {/* Export Quality */}
      <div className="border-t border-gray-100 pt-3 space-y-3">
        <div className="flex items-center justify-between text-xs text-gray-700">
          <span className="font-semibold flex items-center gap-1">
            <Gem className="w-3.5 h-3.5 text-indigo-500" /> Export Quality
          </span>
          <label
            className={`flex items-center gap-1.5 text-[11px] font-medium ${
              qualityLocked
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 cursor-pointer'
            }`}
          >
            <input
              type="checkbox"
              checked={useOriginalQuality}
              disabled={qualityLocked}
              onChange={(e) => setUseOriginalQuality(e.target.checked)}
              className="accent-indigo-600 disabled:opacity-50"
            />
            Use Original Resolution
          </label>
        </div>

        {qualityLocked ? (
          <p className="flex items-center gap-1.5 text-[11px] text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-2">
            <Lock className="w-3 h-3 flex-shrink-0" />
            This preset requires an exact pixel size for online submission —
            quality is fixed and can't be changed.
          </p>
        ) : (
          <div
            className={
              useOriginalQuality ? 'opacity-40 pointer-events-none' : ''
            }
          >
            <div className="flex justify-between text-xs text-gray-600 mb-1 font-medium">
              <span>DPI ({dpiLabel(dpi)})</span>
              <span>{dpi} DPI</span>
            </div>
            <input
              type="range"
              min="72"
              max="600"
              step="1"
              value={dpi}
              onChange={(e) => setDpi(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        )}
        {useOriginalQuality && !qualityLocked && (
          <p className="text-[11px] text-gray-500">
            Using the uploaded photo's native resolution — cropped to the
            preset's shape, no resampling or upscaling.
          </p>
        )}
      </div>
    </div>
  );
};

export default TransformControls;
