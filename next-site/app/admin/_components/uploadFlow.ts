/**
 * Shared upload pipeline: compress every image in the browser, then stage
 * them to the server in small chunks (Vercel caps request bodies well under
 * what a batch of raw screenshots would need). Publishing afterwards turns
 * all staged blobs into one commit — one deploy per publish, however many
 * images were added.
 */

import { stageImages } from '@/lib/content-admin/actions';
import { compressImage } from './compress';

export type StagedBlob = { sha: string; ext: string };

const CHUNK = 5;

export async function stageAll(
  files: File[],
  onProgress: (done: number, total: number) => void
): Promise<StagedBlob[]> {
  const compressed: File[] = [];
  for (const file of files) {
    compressed.push(await compressImage(file));
  }

  const blobs: StagedBlob[] = [];
  for (let i = 0; i < compressed.length; i += CHUNK) {
    const fd = new FormData();
    for (const file of compressed.slice(i, i + CHUNK)) fd.append('images', file);
    const res = await stageImages(fd);
    if (!res.ok) throw new Error(res.error);
    blobs.push(...res.blobs);
    onProgress(Math.min(i + CHUNK, compressed.length), compressed.length);
  }
  return blobs;
}
