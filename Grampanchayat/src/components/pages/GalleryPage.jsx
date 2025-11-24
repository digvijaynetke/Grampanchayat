import PageHero from '../PageHero';
import mandirImage from '../../images/mandir.jpg';
import gavImage from '../../images/gav.jpg';

const imageModules = import.meta.glob('../../images/*.{png,jpg,jpeg,jpe,jfif,gif,webp}', {
  eager: true,
});

const GalleryPage = () => {
  const images = Object.entries(imageModules)
    .map(([path, module], index) => {
      const fileName = path.split('/').pop();
      return {
        id: index + 1,
        src: module.default || module,
        alt: fileName?.replace(/[-_]/g, ' ') || `Gallery Image ${index + 1}`,
      };
    })
    .sort((a, b) => a.alt.localeCompare(b.alt));

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-[300px] object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default GalleryPage;

