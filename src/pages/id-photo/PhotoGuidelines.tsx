import React from 'react';
import { CheckCircle2, XCircle, Lightbulb } from 'lucide-react';

const DOS = [
  'Plain, evenly lit background (white or light gray)',
  'Face the camera directly, centered in frame',
  'Neutral expression with both eyes open',
  'Soft, even lighting — no harsh shadows on face or backdrop',
  'Recent photo, in sharp focus and high resolution',
  'Head and shoulders fully visible, nothing cropped',
];

const DONTS = [
  'Sunglasses or tinted glasses',
  'Hats or head coverings (unless worn for religious reasons)',
  'Filters, heavy retouching, or beauty effects',
  'Busy, patterned, or dark backgrounds',
  'Shadows across the face or backdrop',
  'Blurry, low-resolution, or heavily cropped photos',
];

const PhotoGuidelines: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto mt-6 bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-xs">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-900">Photo Guidelines</h3>
          <p className="text-xs text-gray-500">
            Follow these tips for the best crop & padding results.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <h4 className="text-xs font-bold text-emerald-700 uppercase mb-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> Do
          </h4>
          <ul className="space-y-1.5">
            {DOS.map((tip) => (
              <li
                key={tip}
                className="flex items-start gap-2 text-xs text-gray-700"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-rose-700 uppercase mb-2 flex items-center gap-1.5">
            <XCircle className="w-3.5 h-3.5" /> Don't
          </h4>
          <ul className="space-y-1.5">
            {DONTS.map((tip) => (
              <li
                key={tip}
                className="flex items-start gap-2 text-xs text-gray-700"
              >
                <XCircle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PhotoGuidelines;
