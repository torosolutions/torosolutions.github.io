import type { PresetSize } from '../constants/idPhotoPresets';

export const DEFAULT_DPI = 300;

function pxPerCm(dpi: number): number {
  return dpi / 2.54;
}

/** Resolve the pixel size to render/export a preset at, for a given DPI —
 * prefers an explicit pixelOverride (used when a portal has hard pixel
 * requirements) over the cm→px conversion, which is only an approximation. */
export function getTargetPixelSize(
  preset: PresetSize,
  dpi: number = DEFAULT_DPI,
): { width: number; height: number } {
  if (preset.pixelOverride) return preset.pixelOverride;
  return {
    width: Math.round(preset.widthCm * pxPerCm(dpi)),
    height: Math.round(preset.heightCm * pxPerCm(dpi)),
  };
}

export interface IdPhotoDrawParams {
  widthCm: number;
  heightCm: number;
  pixelOverride?: { width: number; height: number };
  /** Export resolution in DPI. Ignored when useOriginalQuality is true, or
   * when pixelOverride is set (a portal's exact pixel requirement always
   * wins, since deviating from it would break compliance). */
  dpi: number;
  /** Skip DPI-based resizing and use the source photo's native resolution
   * for the current crop instead — the highest quality achievable without
   * upscaling. Ignored when pixelOverride is set. */
  useOriginalQuality?: boolean;
  bgColor: string;
  useBgReplace: boolean;
  zoom: number;
  pan: { x: number; y: number };
  rotation: number;
  flipH: boolean;
  brightness: number;
  contrast: number;
}

/**
 * Format timestamp for download filenames (HH-MM-SS)
 * Example: 12-46-21
 */
export function getTimeStamp(): string {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
}

export function downloadCanvasPng(
  canvas: HTMLCanvasElement,
  filename: string,
): void {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png', 1.0);
  link.click();
}

/** Most government photo portals (e.g. US CEAC/DS-160) require JPEG, not
 * PNG, and cap the file size (CEAC: 240KB) — 0.92 quality keeps visible
 * quality high while staying well under that on a headshot-sized photo. */
export function downloadCanvasJpeg(
  canvas: HTMLCanvasElement,
  filename: string,
  quality = 0.92,
): void {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/jpeg', quality);
  link.click();
}

export function drawIdPhoto(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  params: IdPhotoDrawParams,
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let targetWidth: number;
  let targetHeight: number;
  if (params.pixelOverride) {
    ({ width: targetWidth, height: targetHeight } = params.pixelOverride);
  } else if (params.useOriginalQuality) {
    // Largest canvas matching the preset's aspect ratio that doesn't exceed
    // the source photo's native resolution — max quality, no upscaling.
    const ratio = params.widthCm / params.heightCm;
    targetHeight = Math.max(
      100,
      Math.round(Math.min(img.naturalHeight, img.naturalWidth / ratio)),
    );
    targetWidth = Math.round(targetHeight * ratio);
  } else {
    targetWidth = Math.round(params.widthCm * pxPerCm(params.dpi));
    targetHeight = Math.round(params.heightCm * pxPerCm(params.dpi));
  }

  canvas.width = targetWidth;
  canvas.height = targetHeight;

  ctx.clearRect(0, 0, targetWidth, targetHeight);

  // Always paint a solid white base first — JPEG has no alpha channel, so
  // any pixel left transparent here (e.g. background-fill off, or zoom <
  // 100% leaving margins uncovered) would otherwise flatten to solid BLACK
  // on export, which is disqualifying for a visa/passport photo.
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, targetWidth, targetHeight);

  if (params.useBgReplace && params.bgColor !== 'transparent') {
    ctx.fillStyle = params.bgColor;
    ctx.fillRect(0, 0, targetWidth, targetHeight);
  }

  ctx.save();
  ctx.filter = `brightness(${params.brightness}%) contrast(${params.contrast}%)`;

  const centerX = targetWidth / 2 + params.pan.x;
  const centerY = targetHeight / 2 + params.pan.y;
  ctx.translate(centerX, centerY);

  ctx.rotate((params.rotation * Math.PI) / 180);
  ctx.scale(params.flipH ? -1 : 1, 1);

  const imgRatio = img.width / img.height;
  const targetRatio = targetWidth / targetHeight;
  let drawW: number;
  let drawH: number;

  if (imgRatio > targetRatio) {
    drawH = targetHeight * params.zoom;
    drawW = drawH * imgRatio;
  } else {
    drawW = targetWidth * params.zoom;
    drawH = drawW / imgRatio;
  }

  ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
  ctx.restore();
}

export function drawPrintSheet(
  sheetCanvas: HTMLCanvasElement,
  srcCanvas: HTMLCanvasElement,
  preset: PresetSize,
): void {
  const ctx = sheetCanvas.getContext('2d');
  if (!ctx) return;

  // 4x6 inch sheet @ 300 DPI = 1200 x 1800 px
  const sheetW = 1200;
  const sheetH = 1800;
  sheetCanvas.width = sheetW;
  sheetCanvas.height = sheetH;

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, sheetW, sheetH);

  const margin = 60;
  const gap = 30;

  // Sheet layout is always physical print size at the standard 300 DPI,
  // independent of the single-photo export quality setting.
  const photoW = Math.round(preset.widthCm * pxPerCm(DEFAULT_DPI));
  const photoH = Math.round(preset.heightCm * pxPerCm(DEFAULT_DPI));

  const cols = Math.floor((sheetW - margin * 2 + gap) / (photoW + gap));
  const rows = Math.floor((sheetH - margin * 2 + gap) / (photoH + gap));

  const totalCount = Math.max(1, cols * rows);

  const gridW = cols * photoW + (cols - 1) * gap;
  const gridH = rows * photoH + (rows - 1) * gap;
  const startX = (sheetW - gridW) / 2;
  const startY = (sheetH - gridH) / 2;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = startX + c * (photoW + gap);
      const y = startY + r * (photoH + gap);

      ctx.drawImage(srcCanvas, x, y, photoW, photoH);

      ctx.strokeStyle = '#CBD5E1';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 4]);
      ctx.strokeRect(x, y, photoW, photoH);
      ctx.setLineDash([]);
    }
  }

  ctx.fillStyle = '#94A3B8';
  ctx.font = '16px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(
    `Print Sheet: ${totalCount}x photos (${preset.name}) • 4x6" Paper • Toro Solutions`,
    sheetW / 2,
    margin / 2 + 5,
  );
}
