const CHANNEL_ID = 'UCSSz8x0p5YXB_vUjPOtHkcQ';
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

interface Video {
  id: string;
  title: string;
  published: string;
  thumbnail: string;
  url: string;
}

function extractTag(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  return match ? match[1].trim() : '';
}

function extractAllEntries(xml: string): string[] {
  const matches = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];
  return matches.map((m) => m[1]);
}

async function getLatestVideos(): Promise<Video[]> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 21600 } });
    if (!res.ok) return [];
    const xml = await res.text();
    return extractAllEntries(xml)
      .slice(0, 6)
      .map((entry) => {
        const id = extractTag(entry, 'yt:videoId');
        const title = extractTag(entry, 'title').replace(/^<!\[CDATA\[|\]\]>$/g, '');
        const published = extractTag(entry, 'published');
        return {
          id,
          title,
          published,
          thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
          url: `https://www.youtube.com/watch?v=${id}`,
        };
      })
      .filter((v) => v.id);
  } catch {
    return [];
  }
}

export default async function YoutubeSection() {
  const videos = await getLatestVideos();
  if (videos.length === 0) return null;

  return (
    <section className="mt-24" aria-label="Latest YouTube videos">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="inline-block text-xs uppercase tracking-widest text-brand-blue font-bold mb-2">
            YouTube
          </span>
          <h2 className="text-2xl lg:text-3xl font-display font-bold text-brand-ink">
            Latest Videos
          </h2>
        </div>
        <a
          href={`https://www.youtube.com/channel/${CHANNEL_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline"
        >
          View all on YouTube
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v) => (
          <a
            key={v.id}
            href={v.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-video overflow-hidden bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={v.thumbnail}
                alt={v.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#2563eb">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm font-semibold text-brand-ink line-clamp-2 group-hover:text-brand-blue transition-colors">
                {v.title}
              </p>
              <p className="mt-1 text-xs text-gray-400">
                {new Date(v.published).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-6 text-center sm:hidden">
        <a
          href={`https://www.youtube.com/channel/${CHANNEL_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-brand-blue hover:underline"
        >
          View all on YouTube →
        </a>
      </div>
    </section>
  );
}
