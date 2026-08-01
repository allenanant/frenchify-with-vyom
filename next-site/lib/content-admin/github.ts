/**
 * Minimal GitHub Data API client for the content admin.
 *
 * The website's content is markdown + images in this repo; publishing means
 * committing to the deploy branch, which Vercel then builds. Everything here
 * funnels into commitFiles(), which makes exactly ONE commit per admin action
 * no matter how many files it touches — so one "publish" is one deploy.
 */

import 'server-only';

const REPO = process.env.CONTENT_REPO || 'allenanant/frenchify-with-vyom';
const BRANCH = process.env.CONTENT_BRANCH || 'main';
const API = 'https://api.github.com';

function token(): string {
  const t = process.env.GITHUB_CONTENT_TOKEN || process.env.GITHUB_TOKEN;
  if (!t) throw new Error('GITHUB_CONTENT_TOKEN is not set on the server.');
  return t;
}

async function gh(path: string, init?: RequestInit): Promise<any> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token()}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
      ...init?.headers,
    },
    cache: 'no-store',
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`GitHub ${init?.method ?? 'GET'} ${path} → ${res.status}: ${body.slice(0, 200)}`);
  }
  return res.json();
}

/** Every file under a repo directory, one Trees API call. */
export async function listTree(prefix: string): Promise<Array<{ path: string; sha: string }>> {
  const data = await gh(`/repos/${REPO}/git/trees/${encodeURIComponent(BRANCH)}?recursive=1`);
  return (data.tree as Array<{ path: string; type: string; sha: string }>)
    .filter((n) => n.type === 'blob' && n.path.startsWith(prefix))
    .map((n) => ({ path: n.path, sha: n.sha }));
}

/** Blob content decoded to UTF-8 text. */
export async function readBlob(sha: string): Promise<string> {
  const data = await gh(`/repos/${REPO}/git/blobs/${sha}`);
  return Buffer.from(data.content, 'base64').toString('utf-8');
}

/** Upload raw bytes as an orphan blob; harmless until a commit references it. */
export async function createBlob(base64: string): Promise<string> {
  const data = await gh(`/repos/${REPO}/git/blobs`, {
    method: 'POST',
    body: JSON.stringify({ content: base64, encoding: 'base64' }),
  });
  return data.sha as string;
}

export type CommitInput = {
  message: string;
  /** New or replaced files: text goes as content, uploads as an existing blob sha. */
  files?: Array<{ path: string; content?: string; blobSha?: string }>;
  /** Paths to remove. Missing paths are ignored rather than failing the commit. */
  deletions?: string[];
};

export async function commitFiles({ message, files = [], deletions = [] }: CommitInput): Promise<string> {
  const ref = await gh(`/repos/${REPO}/git/ref/heads/${encodeURIComponent(BRANCH)}`);
  const parentSha = ref.object.sha as string;
  const parent = await gh(`/repos/${REPO}/git/commits/${parentSha}`);

  const tree: Array<Record<string, unknown>> = files.map((f) => ({
    path: f.path,
    mode: '100644',
    type: 'blob',
    ...(f.blobSha ? { sha: f.blobSha } : { content: f.content ?? '' }),
  }));

  if (deletions.length > 0) {
    const existing = new Set(
      (await gh(`/repos/${REPO}/git/trees/${parentSha}?recursive=1`)).tree.map(
        (n: { path: string }) => n.path
      )
    );
    for (const path of deletions) {
      if (existing.has(path)) tree.push({ path, mode: '100644', type: 'blob', sha: null });
    }
  }

  if (tree.length === 0) return parentSha;

  const newTree = await gh(`/repos/${REPO}/git/trees`, {
    method: 'POST',
    body: JSON.stringify({ base_tree: parent.tree.sha, tree }),
  });
  const commit = await gh(`/repos/${REPO}/git/commits`, {
    method: 'POST',
    body: JSON.stringify({ message, tree: newTree.sha, parents: [parentSha] }),
  });
  await gh(`/repos/${REPO}/git/refs/heads/${encodeURIComponent(BRANCH)}`, {
    method: 'PATCH',
    body: JSON.stringify({ sha: commit.sha, force: false }),
  });
  return commit.sha as string;
}
