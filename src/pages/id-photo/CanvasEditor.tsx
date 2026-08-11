import React, { useCallback, useEffect, useState } from 'react';
import { RefreshCw, Eye, Grid } from 'lucide-react';
import type { PresetSize } from '../../constants/idPhotoPresets';
import { drawIdPhoto } from '../../utils/idPhotoCanvas';
import { usePanZoom } from '../../hooks/usePanZoom';

interface Point {
  x: number;
  y: number;
}

interface CanvasEditorProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  imageSrc: string;
  selectedPreset: PresetSize;
  zoom: number;
  setZoom: (val: number | ((prev: number) => number)) => void;
  pan: Point;
  setPan: (val: Point | ((prev: Point) => Point)) => void;
  rotation: number;
  flipH: boolean;
  brightness: number;
  contrast: number;
  bgColor: string;
  useBgReplace: boolean;
  dpi: number;
  useOriginalQuality: boolean;
  onRendered?: (size: { width: number; height: number }) => void;
  onResetView: () => void;
}

const CanvasEditor: React.FC<CanvasEditorProps> = ({
  canvasRef,
  imageSrc,
  selectedPreset,
  zoom,
  setZoom,
  pan,
  setPan,
  rotation,
  flipH,
  brightness,
  contrast,
  bgColor,
  useBgReplace,
  dpi,
  useOriginalQuality,
  onRendered,
  onResetView,
}) => {
  const [showFaceGuide, setShowFaceGuide] = useState<boolean>(true);
  const [showGridGuide, setShowGridGuide] = useState<boolean>(false);
  const [containerScale, setContainerScale] = useState<number>(1);

  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleWheel,
  } = usePanZoom(pan, setPan, setZoom);

  useEffect(() => {
    const handleResize = () => {
      // Calculate responsive scale factor for mobile devices
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) {
        setContainerScale(Math.min(1, (screenWidth - 48) / 360));
      } else {
        setContainerScale(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageSrc) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;
    img.onload = () => {
      drawIdPhoto(canvas, img, {
        widthCm: selectedPreset.widthCm,
        heightCm: selectedPreset.heightCm,
        pixelOverride: selectedPreset.pixelOverride,
        bgColor,
        useBgReplace,
        zoom,
        pan,
        rotation,
        flipH,
        brightness,
        contrast,
        dpi,
        useOriginalQuality,
      });
      onRendered?.({ width: canvas.width, height: canvas.height });
    };
  }, [
    canvasRef,
    imageSrc,
    selectedPreset,
    bgColor,
    useBgReplace,
    zoom,
    pan,
    rotation,
    flipH,
    brightness,
    contrast,
    dpi,
    useOriginalQuality,
    onRendered,
  ]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  return (
    <>
      {/* Mobile Touch Enabled Canvas Container */}
      <div className="relative w-full flex justify-center items-center py-4 bg-slate-900 rounded-xl overflow-hidden shadow-inner min-h-[320px] sm:min-h-[400px] select-none touch-none">
        <div
          className="relative cursor-move overflow-hidden border-2 border-indigo-400 shadow-2xl rounded-xs"
          style={{
            width: `${Math.round(selectedPreset.widthCm * 70 * containerScale)}px`,
            height: `${Math.round(selectedPreset.heightCm * 70 * containerScale)}px`,
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
        >
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Face Alignment Overlay */}
          {showFaceGuide && (
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
              <div
                className="border-2 border-dashed border-emerald-400/80 rounded-[50%] w-[60%] h-[68%] relative"
                style={{ top: '-4%' }}
              >
                <div className="absolute top-[42%] left-0 w-full border-t border-dashed border-emerald-300/80" />
                <div className="absolute bottom-[5%] left-[20%] w-[60%] border-t border-emerald-300/80" />
              </div>
              <span className="absolute bottom-1.5 text-[9px] sm:text-[10px] bg-black/70 text-emerald-300 px-2 py-0.5 rounded font-mono">
                Align Eyes & Face
              </span>
            </div>
          )}

          {/* Grid 3x3 Overlay */}
          {showGridGuide && (
            <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 border border-white/20">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="border border-white/20" />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Touch Tip */}
      <p className="text-[11px] text-gray-400 mt-2 sm:hidden text-center">
        💡 Tip: Touch & drag to position. Pinch 2 fingers to zoom photo.
      </p>

      {/* Canvas Action Bar */}
      <div className="w-full mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFaceGuide(!showFaceGuide)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md font-medium border min-h-[32px] ${
              showFaceGuide
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-gray-50 text-gray-600 border-gray-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> Face Guide
          </button>
          <button
            onClick={() => setShowGridGuide(!showGridGuide)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md font-medium border min-h-[32px] ${
              showGridGuide
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                : 'bg-gray-50 text-gray-600 border-gray-200'
            }`}
          >
            <Grid className="w-3.5 h-3.5" /> Grid 3x3
          </button>
        </div>

        <button
          onClick={onResetView}
          className="flex items-center gap-1 text-gray-500 hover:text-gray-900 font-medium py-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset View
        </button>
      </div>
    </>
  );
};

export default CanvasEditor;
