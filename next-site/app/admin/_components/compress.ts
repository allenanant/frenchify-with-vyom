/**
 * Browser-side image compression for admin uploads.
 *
 * Same philosophy as the support desk's TicketForm: shrink in the browser so
 * the server never sees a 12 MB phone screenshot. Result screenshots are
 * mostly text, which WebP handles well — a 1600px q0.8 frame lands around
 * 100–300 KB.
 */

const MAX_EDGE = 1600;
const QUALITY = 0.8;

export async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith('image/')) {
    throw new Error(`"${file.name}" is not an image file.`);
  }
  const bitmap = await createImageBitmap(file).catch(() => null);
  if (!bitmap) {
    throw new Error(`Could not read "${file.name}". If it came from an iPhone, take a screenshot of it and upload that instead.`);
  }
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('This browser cannot process images.');
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();

  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error(`Could not compress "${file.name}".`))), 'image/webp', QUALITY)
  );
  const name = file.name.replace(/\.[^.]+$/, '') + '.webp';
  return new File([blob], name, { type: 'image/webp' });
}
