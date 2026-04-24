import Reveal from '@/components/motion/Reveal';

const images = [
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6894588a297c860ea7933340.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/688667fcd640fe2bec6b6d90.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/688667fd29e384747704e2b1.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/688667fd29e38456a804e2b2.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/688667fd29e3840ce004e2af.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/688667fca2e2e2e29e16466f.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/688667fcdcebe2ffbb6a5c55.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/694e627373a5e05f4028bf11.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/688667fcd640fec1b96b6d8e.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/688667fcb1bd69584f93d1ee.png',
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/688667fcb1bd69032d93d1ed.png',
];

export default function SuccessStoriesMarquee() {
  const doubled = [...images, ...images];

  return (
    <section className="py-20 bg-gray-50 full-bleed-section-ghl relative overflow-hidden">
      <div className="ghl-row-full mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See the amazing results our students have achieved with Frenchify
            </p>
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
                    loading="lazy"
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
