import PageHero from '../PageHero';
import gavImage from '../../images/gav.jpg';

const galleryImageModules = import.meta.glob('../../images/*.{jpg,jpeg,png}', {
  eager: true,
  import: 'default'
});

const galleryImages = Object.entries(galleryImageModules)
  .map(([path, src], index) => {
    const fileName = path.split('/').pop() || `image-${index + 1}`;
    const readableName = fileName
      .replace(/\.[^.]+$/, '')
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return {
      id: index + 1,
      src,
      fileName,
      alt: `गॅलरी प्रतिमा - ${readableName}`
    };
  })
  .sort((a, b) => a.fileName.localeCompare(b.fileName));

const GalleryPage = () => {
  const heroImage = galleryImages[0]?.src || gavImage;

  return (
    <div>
      <PageHero 
        title="फोटो गॅलरी" 
        subtitle="माहिती"
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
            <div className="text-center text-gray-600 py-12">
              सध्या कोणत्याही प्रतिमा उपलब्ध नाहीत. कृपया नंतर पुन्हा तपासा.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {galleryImages.map((image) => (
                <figure
                  key={image.id}
                  className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="w-full h-[300px] object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white text-sm px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {image.alt}
                  </figcaption>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" aria-hidden="true"></div>
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

