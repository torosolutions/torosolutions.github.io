import React from 'react';
import { Upload } from 'lucide-react';

interface UploadDropzoneProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onDrop: (e: React.DragEvent) => void;
  onLoadSample: () => void;
}

const UploadDropzone: React.FC<UploadDropzoneProps> = ({
  fileInputRef,
  onDrop,
  onLoadSample,
}) => {
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      className="max-w-2xl mx-auto border-2 border-dashed border-indigo-200 hover:border-indigo-500 rounded-2xl p-8 sm:p-12 bg-white text-center shadow-xs transition-all cursor-pointer"
      onClick={() => fileInputRef.current?.click()}
    >
      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <Upload className="w-7 h-7 sm:w-8 sm:h-8" />
      </div>
      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
        Upload your ID photo to start
      </h3>
      <p className="text-xs sm:text-sm text-gray-500 mb-6">
        Drag and drop photo here, or tap to choose from your phone / camera
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          className="px-5 py-3 bg-indigo-600 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs hover:bg-indigo-700 transition-colors min-h-[44px]"
        >
          Choose Photo File
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onLoadSample();
          }}
          className="px-5 py-3 bg-gray-100 text-gray-700 text-xs sm:text-sm font-semibold rounded-xl hover:bg-gray-200 transition-colors min-h-[44px]"
        >
          Try Sample Image
        </button>
      </div>
    </div>
  );
};

export default UploadDropzone;
