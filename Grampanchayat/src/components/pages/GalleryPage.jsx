import PageHero from '../PageHero';
import defaultHeroImage from '../../images/gav.jpg';

const imageModules = import.meta.glob('../../images/**/*.{png,jpg,jpeg,gif,webp,avif,svg}', {
  eager: true,
});

const galleryImages = Object.entries(imageModules)
  .map(([path, module], index) => {
    const src = typeof module === 'string' ? module : module?.default;
    if (!src) return null;

    const fileName = path.split('/').pop() || `image-${index + 1}`;
    const title = fileName
      .replace(/\.[^.]+$/, '')
      .replace(/[-_]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return {
      id: index + 1,
      src,
      title: title || `गॅलरी फोटो ${index + 1}`,
      alt: `${title || 'गॅलरी फोटो'} (${fileName})`,
    };
  })
  .filter(Boolean);

const GalleryPage = () => {
  const heroImage = galleryImages[0]?.src || defaultHeroImage;

  return (
    <div>
      <PageHero 
        title="फोटो गॅलरी" 
        subtitle="गावातील सर्व क्षण एकत्र"
        image={heroImage}
      />
      <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Dotted Line */}
          <div className="flex justify-center mb-4">
            <div className="w-32 border-t-2 border-dotted border-gray-400"></div>
          </div>

          {/* Sub-heading */}
          <p className="text-sm text-gray-500 text-center mb-2">माहिती</p>

          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-teal-800">
            फोटो गॅलरी
          </h2>

          {/* Gallery Grid */}
          {galleryImages.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-gray-300 rounded-xl">
              <p className="text-xl font-semibold text-gray-600 mb-2">प्रतिमा उपलब्ध नाहीत</p>
              <p className="text-gray-500">कृपया नंतर पुन्हा भेट द्या. लवकरच नवीन फोटो जोडले जातील.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {galleryImages.map((image) => (
                <figure
                  key={image.id}
                  className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 bg-white"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="w-full h-[320px] object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    {image.title}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
    </div>
  );
};

export default GalleryPage;

