/**
 * Sample ID Photo SVG Vector Graphics
 * Encoded as a Data URL for instant rendering on Canvas
 */
export const SAMPLE_ID_PHOTO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800">
  <!-- Background -->
  <rect width="600" height="800" fill="#F1F5F9"/>

  <!-- Shoulders & Dark Suit -->
  <ellipse cx="300" cy="780" rx="240" ry="280" fill="#1E293B"/>

  <!-- White Shirt Collar -->
  <polygon points="240,520 300,620 360,520" fill="#FFFFFF"/>

  <!-- Blue Tie -->
  <polygon points="285,550 315,550 320,670 300,700 280,670" fill="#2563EB"/>

  <!-- Neck -->
  <rect x="250" y="420" width="100" height="120" fill="#FDBA74"/>

  <!-- Ears -->
  <circle cx="165" cy="360" r="24" fill="#FDBA74"/>
  <circle cx="435" cy="360" r="24" fill="#FDBA74"/>

  <!-- Head Oval -->
  <ellipse cx="300" cy="360" rx="130" ry="160" fill="#FDBA74"/>

  <!-- Hair Composed of Multiple Triangles -->
  <g fill="#0F172A">
    <!-- Main Top Spikes & Structure -->
    <polygon points="160,300 170,220 220,280"/>
    <polygon points="180,280 215,195 255,275"/>
    <polygon points="220,275 265,185 310,275"/>
    <polygon points="290,275 335,180 380,275"/>
    <polygon points="345,275 385,195 420,280"/>
    <polygon points="380,280 430,220 440,300"/>

    <!-- Fill Layer Triangles -->
    <polygon points="165,300 210,240 260,290"/>
    <polygon points="230,285 285,210 340,285"/>
    <polygon points="310,285 365,210 420,285"/>
    <polygon points="170,260 300,200 430,260"/>

    <!-- Bangs Fringe Triangles -->
    <polygon points="200,280 225,310 250,280"/>
    <polygon points="245,280 275,315 305,280"/>
    <polygon points="295,280 325,315 355,280"/>
    <polygon points="350,280 375,308 400,280"/>
  </g>

  <!-- Eyebrows -->
  <path d="M 223 322 A 22 22 0 0 1 267 322" stroke="#0F172A" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M 333 322 A 22 22 0 0 1 377 322" stroke="#0F172A" stroke-width="5" fill="none" stroke-linecap="round"/>

  <!-- Eyes -->
  <circle cx="245" cy="342" r="11" fill="#1E293B"/>
  <circle cx="355" cy="342" r="11" fill="#1E293B"/>

  <!-- Eye Catchlight -->
  <circle cx="248" cy="339" r="3.5" fill="#FFFFFF"/>
  <circle cx="358" cy="339" r="3.5" fill="#FFFFFF"/>

  <!-- Nose -->
  <path d="M 292 380 A 12 12 0 0 0 308 380" stroke="#EA580C" stroke-width="3" fill="none" stroke-linecap="round"/>

  <!-- Mouth / Smile -->
  <path d="M 266 412 A 35 35 0 0 0 334 412" stroke="#9A3412" stroke-width="4.5" fill="none" stroke-linecap="round"/>
</svg>`;

export const SAMPLE_ID_PHOTO_DATA_URL = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
  SAMPLE_ID_PHOTO_SVG,
)}`;
