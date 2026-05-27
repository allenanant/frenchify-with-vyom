import Reveal from '@/components/motion/Reveal';

const images = [
  'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4ccfe7237c4dd3fbcb8b.jpg',
  'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4ccfe7237c4dd3fbcb8c.jpg',
  'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4ccf190683601a10238d.jpg',
  'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4cce80b446d0fb62a8f3.jpg',
  'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4ccfb935a2d764b020ab.jpg',
  'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4ccfb935a2d764b020b2.jpg',
  'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4ccf1605aaccae17a99e.jpg',
  'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4ccf190683601a10238c.jpg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/698fda91899b8843c9757497.jpeg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/698f52a71afc8eebb797f377.jpeg',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab22b4f0f19b4cd135e.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab215e9b5444d77392d.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab2cc792f2a3c1ec7dc.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab215e9b5efe277392e.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab2cc792f6bae1ec7dd.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab22b4f0f67eacd135d.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab2cef1010936ac866c.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab215e9b5fbf177392b.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab22dd5fdf1e8555c79.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab265a0d783877f83ca.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab2f8a93b452443d49b.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab2cef1013a1aac866d.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab265a0d700f97f83d0.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab2f13bc3ad1918d6eb.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab215e9b58d8c77392c.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab265a0d786007f83cb.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab265a0d738577f83cc.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/69613ab2f13bc3828f18d6ec.png',
];

export default function SuccessStoriesMarquee() {
  const doubled = [...images, ...images];

  return (
    <section className="py-20 bg-gray-50 full-bleed-section-ghl relative overflow-hidden">
      <div className="ghl-row-full mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-8">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              See the amazing results our students have achieved with Frenchify
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-blue-100 shadow-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500" />
              </span>
              <span className="text-sm font-bold tracking-wide text-blue-700">
                {images.length}+ CLB 7+ Verified Results
              </span>
            </div>
          </div>
        </Reveal>

        <div className="relative image-slider-container">
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10" />
          <div className="overflow-hidden image-slider">
            <div className="flex image-slide-track">
              {doubled.map((src, i) => (
                <div key={i} className="flex-shrink-0 w-[350px] p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt="Student Result"
                    className="rounded-xl shadow-lg w-full h-auto transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
