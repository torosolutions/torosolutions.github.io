export interface PresetSize {
  id: string;
  name: string;
  widthCm: number;
  heightCm: number;
  ratio: number;
  category: 'Popular' | 'Passport & Visa';
  description: string;
  /**
   * Exact pixel dimensions required by an online submission portal, when
   * known (e.g. US CEAC/DS-160 requires a JPEG between 600x600 and
   * 1200x1200 px). Overrides the cm→px conversion, which is only an
   * approximation and can round below a hard minimum (e.g. 5cm at 300 DPI
   * is 591px — under the 600px CEAC floor).
   */
  pixelOverride?: { width: number; height: number };
}

export const PRESET_SIZES: PresetSize[] = [
  // Popular / Regional Standards
  {
    id: '2x3',
    name: '2 x 3 cm',
    widthCm: 2,
    heightCm: 3,
    ratio: 2 / 3,
    category: 'Popular',
    description: 'Standard 2x3 cm ID photo (Vietnam/Asia)',
  },
  {
    id: '3x4',
    name: '3 x 4 cm',
    widthCm: 3,
    heightCm: 4,
    ratio: 3 / 4,
    category: 'Popular',
    description: 'Standard 3x4 cm ID photo (Vietnam/Asia)',
  },
  {
    id: '4x6',
    name: '4 x 6 cm',
    widthCm: 4,
    heightCm: 6,
    ratio: 4 / 6,
    category: 'Popular',
    description: 'Standard 4x6 cm ID photo (Vietnam/Asia)',
  },
  {
    id: '3x2',
    name: '3 x 2 cm',
    widthCm: 3,
    heightCm: 2,
    ratio: 3 / 2,
    category: 'Popular',
    description: 'Horizontal 3x2 cm ID photo',
  },
  // International Passports & Visas
  {
    id: '3.5x4.5',
    name: '3.5 x 4.5 cm',
    widthCm: 3.5,
    heightCm: 4.5,
    ratio: 3.5 / 4.5,
    category: 'Passport & Visa',
    description: 'Vietnam / Schengen / UK / EU Passport & Visa',
  },
  {
    id: '5x5',
    name: '5 x 5 cm (2x2")',
    widthCm: 5.08, // true 2x2 inch — was 5cm, which rounds under the US CEAC 600px floor
    heightCm: 5.08,
    ratio: 1,
    category: 'Passport & Visa',
    description: 'US Visa / US Passport / India / Israel',
    pixelOverride: { width: 700, height: 700 }, // clears CEAC's 600–1200px range with margin
  },
  {
    id: '3.3x4.8',
    name: '3.3 x 4.8 cm',
    widthCm: 3.3,
    heightCm: 4.8,
    ratio: 3.3 / 4.8,
    category: 'Passport & Visa',
    description: 'China Passport & Official Visa',
  },
  {
    id: '4.5x4.5',
    name: '4.5 x 4.5 cm',
    widthCm: 4.5,
    heightCm: 4.5,
    ratio: 1,
    category: 'Passport & Visa',
    description: 'Japan Passport & Official Visa',
  },
  {
    id: '4x5',
    name: '4 x 5 cm',
    widthCm: 4,
    heightCm: 5,
    ratio: 4 / 5,
    category: 'Passport & Visa',
    description: 'Korea Passport & Visa',
  },
  {
    id: '5x7',
    name: '5 x 7 cm (2x2.75")',
    widthCm: 5,
    heightCm: 7,
    ratio: 5 / 7,
    category: 'Passport & Visa',
    description: 'Canada Passport & Immigration',
  },
  {
    id: '3.5x3.5',
    name: '3.5 x 3.5 cm',
    widthCm: 3.5,
    heightCm: 3.5,
    ratio: 1,
    category: 'Popular',
    description: 'Universal Square ID Photo',
  },
];

export const PRESET_COLORS = [
  { id: 'white', name: 'White', color: '#FFFFFF' },
  { id: 'blue-standard', name: 'ID Blue', color: '#2B7FFF' },
  { id: 'blue-dark', name: 'Navy Blue', color: '#003399' },
  { id: 'red', name: 'Red', color: '#E53E3E' },
  { id: 'gray', name: 'Light Gray', color: '#E2E8F0' },
  { id: 'original', name: 'Original', color: 'transparent' },
];
