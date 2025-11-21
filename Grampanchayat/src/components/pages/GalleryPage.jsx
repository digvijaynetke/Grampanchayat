import PageHero from '../PageHero';
import gavImage from '../../images/gav.jpg';

// Eagerly import every image inside src/images (and nested folders) so the gallery can display all of them automatically.
const imageModules = import.meta.glob('../../images/**/*.{jpg,jpeg,png,gif,webp}', {
  eager: true,
  import: 'default'
});

const formatAltText = (filePath) => {
  const fileName = filePath.split('/').pop() || 'gallery image';
  const label = fileName.replace(/\.[^.]+$/, '') // remove extension
    .replace(/[-_]+/g, ' ') // replace separators with spaces
    .trim();
  return label.length ? label.charAt(0).toUpperCase() + label.slice(1) : 'Gallery image';
};

const galleryImages = Object.entries(imageModules)
  .sort(([aPath], [bPath]) => aPath.localeCompare(bPath))
  .map(([path, src], index) => ({
    id: index + 1,
    src,
    alt: formatAltText(path),
    label: path.replace('../../images/', '')
  }));

const GalleryPage = () => {
  const images = galleryImages;

  return (
    <div>
      <PageHero 
        title="फोटो गॅलरी" 
        subtitle="माहिती"
        image={gavImage}
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
          {images.length === 0 ? (
            <p className="text-center text-gray-500">सध्या कोणत्याही फोटोंची नोंद उपलब्ध नाही.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {images.map((image) => (
                <figure
                  key={image.id}
                  className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="w-full h-[280px] object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white text-sm px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {image.alt}
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

