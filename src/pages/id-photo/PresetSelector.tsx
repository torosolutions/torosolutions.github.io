import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { PRESET_SIZES } from '../../constants/idPhotoPresets';
import type { PresetSize } from '../../constants/idPhotoPresets';

interface PresetSelectorProps {
  selectedPreset: PresetSize;
  onSelectPreset: (preset: PresetSize, e?: React.MouseEvent) => void;
}

const PresetSelector: React.FC<PresetSelectorProps> = ({
  selectedPreset,
  onSelectPreset,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<
    'All' | 'Popular' | 'Passport & Visa'
  >('All');

  const filteredPresets = PRESET_SIZES.filter(
    (p) => categoryFilter === 'All' || p.category === categoryFilter,
  );

  return (
    <div className="w-full mb-4">
      <div className="flex items-center justify-between gap-2 mb-2">
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
          Select Dimension Preset:
        </label>
        {/* Category Filter Pills */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          {(['All', 'Popular', 'Passport & Visa'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all ${
                categoryFilter === cat
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable Preset Pills */}
      <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-1 bg-slate-50 rounded-xl border border-gray-200">
        {filteredPresets.map((preset) => (
          <a
            key={preset.id}
            href={`#/id-photo?size=${preset.id}`}
            onClick={(e) => onSelectPreset(preset, e)}
            title={preset.description}
            className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all text-left flex items-center justify-between min-h-[38px] cursor-pointer ${
              selectedPreset.id === preset.id
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <span>{preset.name}</span>
            {selectedPreset.id === preset.id && (
              <Check className="w-3.5 h-3.5 ml-1.5" />
            )}
          </a>
        ))}
      </div>
      <p className="text-[11px] text-indigo-600 font-medium mt-1">
        {selectedPreset.description} ({selectedPreset.widthCm}x
        {selectedPreset.heightCm} cm)
      </p>
    </div>
  );
};

export default PresetSelector;
