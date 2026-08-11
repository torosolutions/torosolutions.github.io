import React, { useCallback, useEffect, useRef } from 'react';
import { Printer, Download } from 'lucide-react';
import type { PresetSize } from '../../constants/idPhotoPresets';
import {
  downloadCanvasPng,
  drawPrintSheet,
  getTimeStamp,
} from '../../utils/idPhotoCanvas';

interface PrintSheetModalProps {
  open: boolean;
  onClose: () => void;
  srcCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  selectedPreset: PresetSize;
}

const PrintSheetModal: React.FC<PrintSheetModalProps> = ({
  open,
  onClose,
  srcCanvasRef,
  selectedPreset,
}) => {
  const printSheetCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const renderPrintSheet = useCallback(() => {
    const sheetCanvas = printSheetCanvasRef.current;
    const srcCanvas = srcCanvasRef.current;
    if (!sheetCanvas || !srcCanvas) return;
    drawPrintSheet(sheetCanvas, srcCanvas, selectedPreset);
  }, [srcCanvasRef, selectedPreset]);

  useEffect(() => {
    if (open) {
      renderPrintSheet();
    }
  }, [open, renderPrintSheet]);

  const handleDownloadPrintSheet = () => {
    const sheetCanvas = printSheetCanvasRef.current;
    if (!sheetCanvas) return;
    downloadCanvasPng(
      sheetCanvas,
      `id-photo-sheet-${selectedPreset.id}-${getTimeStamp()}.png`,
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <div>
            <h3 className="font-bold text-gray-900 text-base sm:text-lg flex items-center gap-2">
              <Printer className="w-5 h-5 text-emerald-600" />
              Printable Photo Sheet (4x6 Inches / 10x15 cm)
            </h3>
            <p className="text-xs text-gray-500">
              Multiple copies tiled onto standard 4x6" photo print paper with
              crop marks.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold p-1"
          >
            ✕
          </button>
        </div>

        <div className="bg-slate-100 p-4 rounded-xl flex justify-center items-center shadow-inner overflow-hidden">
          <canvas
            ref={printSheetCanvasRef}
            className="max-h-[380px] w-auto h-auto object-contain border border-gray-300 shadow-md bg-white"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="text-xs text-gray-500 font-mono">
            Filename: id-photo-sheet-{selectedPreset.id}-{getTimeStamp()}.png
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-semibold rounded-xl hover:bg-gray-200 min-h-[38px]"
            >
              Close
            </button>
            <button
              onClick={handleDownloadPrintSheet}
              className="px-5 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl hover:bg-emerald-700 shadow-xs flex items-center gap-1.5 min-h-[38px]"
            >
              <Download className="w-4 h-4" /> Download 4x6" Sheet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintSheetModal;
