import PageHero from '../PageHero';
import mandirImage from '../../images/mandir.jpg';
import infoImage from '../../images/info.jpg';
import gavImage from '../../images/gav.jpg';
import kakaImage from '../../images/kaka.jpg';

const GalleryPage = () => {
  const images = [
    { id: 1, src: mandirImage, alt: 'Gallery Image 1' },
    { id: 2, src: infoImage, alt: 'Gallery Image 2' },
    { id: 3, src: gavImage, alt: 'Gallery Image 3' },
    { id: 4, src: kakaImage, alt: 'Gallery Image 4' },
    { id: 5, src: mandirImage, alt: 'Gallery Image 5' },
    { id: 6, src: infoImage, alt: 'Gallery Image 6' },
    { id: 7, src: gavImage, alt: 'Gallery Image 7' },
    { id: 8, src: kakaImage, alt: 'Gallery Image 8' },
    { id: 9, src: mandirImage, alt: 'Gallery Image 9' },
  ];

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

