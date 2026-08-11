import React, { useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { PRESET_SIZES } from '../constants/idPhotoPresets';
import type { PresetSize } from '../constants/idPhotoPresets';
import { SAMPLE_ID_PHOTO_DATA_URL } from '../constants/sampleIdPhoto';
import { DEFAULT_DPI } from '../utils/idPhotoCanvas';
import UploadDropzone from './id-photo/UploadDropzone';
import PhotoGuidelines from './id-photo/PhotoGuidelines';
import PresetSelector from './id-photo/PresetSelector';
import CanvasEditor from './id-photo/CanvasEditor';
import TransformControls from './id-photo/TransformControls';
import BackgroundColorPanel from './id-photo/BackgroundColorPanel';
import ExportPanel from './id-photo/ExportPanel';
import PrintSheetModal from './id-photo/PrintSheetModal';

const IdPhotoTool: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sizeParam = searchParams.get('size');

  const selectedPreset = useMemo(() => {
    if (!sizeParam) return PRESET_SIZES[0];
    const match = PRESET_SIZES.find((p) => p.id === sizeParam);
    return match || PRESET_SIZES[0];
  }, [sizeParam]);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [bgColor, setBgColor] = useState<string>('#FFFFFF');
  const [useBgReplace, setUseBgReplace] = useState<boolean>(true);

  // Canvas editing states
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<number>(0);
  const [flipH, setFlipH] = useState<boolean>(false);
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [dpi, setDpi] = useState<number>(DEFAULT_DPI);
  const [useOriginalQuality, setUseOriginalQuality] = useState<boolean>(false);
  const [renderedSize, setRenderedSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  // Modal state
  const [showPrintSheetModal, setShowPrintSheetModal] =
    useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSelectPreset = (preset: PresetSize, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setSearchParams({ size: preset.id });
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Sample image generator from SVG constant
  const handleLoadSample = () => {
    setImageSrc(SAMPLE_ID_PHOTO_DATA_URL);
  };

  const loadImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImageSrc(event.target.result as string);
        setZoom(1);
        setPan({ x: 0, y: 0 });
        setRotation(0);
        setFlipH(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadImageFile(file);
  };

  // Drag & drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) loadImageFile(file);
  };

  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setRotation(0);
    setFlipH(false);
    setBrightness(100);
    setContrast(100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Top Banner */}
      <div className="mb-6 text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Mobile & Desktop Ready
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          People ID Photo Cropper & Resizer
        </h1>
        <p className="mt-2 text-gray-600 text-xs sm:text-base">
          Crop ID & Passport photos for 2x3, 4x6, 3x2, 3x4, Schengen, US Visa,
          Japan & Canada. Supports mobile touch gestures, background color fill,
          and high-res ISO date exports!
        </p>
      </div>

      {/* Persistent file input: must stay mounted across both the dropzone and
          editor layouts so refs from either (e.g. ExportPanel's "Upload
          Different Image") remain valid. */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {!imageSrc ? (
        <>
          <UploadDropzone
            fileInputRef={fileInputRef}
            onDrop={handleDrop}
            onLoadSample={handleLoadSample}
          />
          <PhotoGuidelines />
        </>
      ) : (
        /* Editor Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Interactive Canvas Area */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-xs flex flex-col items-center">
            <PresetSelector
              selectedPreset={selectedPreset}
              onSelectPreset={handleSelectPreset}
            />

            <CanvasEditor
              canvasRef={canvasRef}
              imageSrc={imageSrc}
              selectedPreset={selectedPreset}
              zoom={zoom}
              setZoom={setZoom}
              pan={pan}
              setPan={setPan}
              rotation={rotation}
              flipH={flipH}
              brightness={brightness}
              contrast={contrast}
              bgColor={bgColor}
              useBgReplace={useBgReplace}
              dpi={dpi}
              useOriginalQuality={useOriginalQuality}
              onRendered={setRenderedSize}
              onResetView={handleResetView}
            />
          </div>

          {/* Control Settings Panel (Right / Stacked on Mobile) */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <TransformControls
              zoom={zoom}
              setZoom={setZoom}
              setRotation={setRotation}
              flipH={flipH}
              setFlipH={setFlipH}
              brightness={brightness}
              setBrightness={setBrightness}
              contrast={contrast}
              setContrast={setContrast}
              dpi={dpi}
              setDpi={setDpi}
              useOriginalQuality={useOriginalQuality}
              setUseOriginalQuality={setUseOriginalQuality}
              qualityLocked={Boolean(selectedPreset.pixelOverride)}
            />

            <BackgroundColorPanel
              bgColor={bgColor}
              setBgColor={setBgColor}
              useBgReplace={useBgReplace}
              setUseBgReplace={setUseBgReplace}
            />

            <ExportPanel
              canvasRef={canvasRef}
              selectedPreset={selectedPreset}
              fileInputRef={fileInputRef}
              onOpenPrintSheet={() => setShowPrintSheetModal(true)}
              renderedSize={renderedSize}
            />
          </div>
        </div>
      )}

      <PrintSheetModal
        open={showPrintSheetModal}
        onClose={() => setShowPrintSheetModal(false)}
        srcCanvasRef={canvasRef}
        selectedPreset={selectedPreset}
      />
    </div>
  );
};

export default IdPhotoTool;
