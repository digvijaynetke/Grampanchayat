import PageHero from '../PageHero';
import gavImage from '../../images/back.jpg';
// import infoImage from '../../images/back.jpg';
import sarpanchImage from '../../images/sarpanch.jpeg';
import upSarpanchImage from '../../images/upsarpanch.jpeg';
import gramSevakImage from '../../images/gramsevak.jpeg';
import sadhasya1Image from '../../images/sadhasya1.jpeg';
import sadhasya2Image from '../../images/sadhasya2.jpeg';
import sadhasya3Image from '../../images/sadhasya3.jpeg';
import sadhasya4Image from '../../images/sadhasya4.jpeg';
import sadhasya5Image from '../../images/sadhasya5.jpeg';
import sadhasya6Image from '../../images/sadhasya6.jpeg';
import sadhasya7Image from '../../images/sadhasya7.jpeg';
import computerOperatorImage from '../../images/compguy.jpeg';
// import shipaiImage from '../../images/shipai.png';
import waterSupplyImage from '../../images/paniguy.png';


const GalleryPage = () => {
  const images = [
    { id: 1, src: sarpanchImage, alt: 'Gallery Image 1' },
    { id: 2, src: upSarpanchImage, alt: 'Gallery Image 2' },
    { id: 3, src: gramSevakImage, alt: 'Gallery Image 3' },
    { id: 4, src: sadhasya1Image, alt: 'Gallery Image 4' },
    { id: 5, src: sadhasya2Image, alt: 'Gallery Image 5' },
    { id: 6, src: sadhasya3Image, alt: 'Gallery Image 6' },
    { id: 7, src: sadhasya4Image, alt: 'Gallery Image 7' },
    { id: 8, src: sadhasya5Image, alt: 'Gallery Image 8' },
    { id: 9, src: sadhasya6Image, alt: 'Gallery Image 9' },
    { id: 10, src: sadhasya7Image, alt: 'Gallery Image 10' },
    { id: 11, src: computerOperatorImage, alt: 'Gallery Image 11' },
    { id: 12, src: waterSupplyImage, alt: 'Gallery Image 12' }
    // { id: 13, src: shipaiImage, alt: 'Gallery Image 13' }
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

