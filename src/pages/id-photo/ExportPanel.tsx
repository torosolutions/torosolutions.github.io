import React from 'react';
import { Download, Printer, ShieldCheck } from 'lucide-react';
import type { PresetSize } from '../../constants/idPhotoPresets';
import {
  downloadCanvasJpeg,
  getTargetPixelSize,
  getTimeStamp,
} from '../../utils/idPhotoCanvas';

interface ExportPanelProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  selectedPreset: PresetSize;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onOpenPrintSheet: () => void;
  /** Actual rendered canvas size, reported after each draw — reflects the
   * live DPI/Original-quality setting. Falls back to the 300 DPI estimate
   * before the canvas has rendered for the first time. */
  renderedSize: { width: number; height: number } | null;
}

const ExportPanel: React.FC<ExportPanelProps> = ({
  canvasRef,
  selectedPreset,
  fileInputRef,
  onOpenPrintSheet,
  renderedSize,
}) => {
  const { width: pxWidth, height: pxHeight } =
    renderedSize ?? getTargetPixelSize(selectedPreset);

  const handleDownloadSingle = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    downloadCanvasJpeg(
      canvas,
      `id-photo-${selectedPreset.id}-${getTimeStamp()}.jpg`,
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-3">
      <div className="flex items-start gap-2 bg-indigo-50 border border-indigo-100 rounded-xl p-3 text-xs text-indigo-800">
        <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">
            Exports as JPEG at {pxWidth} × {pxHeight}px.
          </p>
          <p className="text-indigo-600/80 mt-0.5">
            Requirements vary by country/portal — double-check the exact pixel,
            file-size &amp; format rules on the destination agency's site before
            submitting online.
          </p>
        </div>
      </div>

      <button
        onClick={handleDownloadSingle}
        className="w-full py-3.5 px-4 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm min-h-[46px]"
      >
        <Download className="w-4 h-4" />
        Download Single ID Photo ({selectedPreset.name})
      </button>

      <button
        onClick={onOpenPrintSheet}
        className="w-full py-3 px-4 bg-emerald-600 text-white font-semibold rounded-xl shadow-md hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm min-h-[44px]"
      >
        <Printer className="w-4 h-4" />
        Generate Printable 4x6" Sheet
      </button>

      <button
        onClick={() => fileInputRef.current?.click()}
        className="w-full py-2.5 px-4 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors text-xs min-h-[38px]"
      >
        Upload Different Image
      </button>
    </div>
  );
};

export default ExportPanel;
