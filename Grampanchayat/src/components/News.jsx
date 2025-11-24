import { useEffect, useState, useRef } from 'react';
import bram1 from '../images/bram1.png';
import bram2 from '../images/bram2.png';
import bram3 from '../images/bram3.png';
import bram4 from '../images/bram4.png';
import bram5 from '../images/bram5.png';
import bram6 from '../images/bram6.png';
import bram7 from '../images/bram7.png';
import gavVideo from '../images/gav.mp4';
import { touristPlaces } from '../data/touristPlaces';

const slideshowGroups = [
  {
    id: 'bramhagiri-1',
    title: 'ब्रह्मगिरी फोटो संच - १',
    subtitle: 'ब्रह्मगिरीची अप्रतिम छायाचित्रे',
    description:
      'सोनेरी कडेकोट डोंगररांगा आणि गडद हिरव्या वनराईतून डोकावणारे ब्रह्मगिरीचे नयनरम्य दृश्य.',
    location: 'ब्रह्मगिरी, मेटघर',
    images: [bram1, bram2, bram4, bram6],
  },
  {
    id: 'bramhagiri-2',
    title: 'ब्रह्मगिरी फोटो संच - २',
    subtitle: 'प्रकृतीची दुसरी बाजू',
    description:
      'धुक्याच्या सरी, पाचू सारखी कुरणे आणि घाटांवरील किल्ल्यांचे दृश्य — प्रत्येक फोटोत ब्रह्मगिरीचा नवा रंग.',
    location: 'ब्रह्मगिरी, मेटघर',
    images: [bram3, bram5, bram7],
  },
];

const SlideshowCard = ({ title, subtitle, description, location, images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [images.length]);

  const currentImage = images[activeIndex];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
      <div className="relative h-72 w-full overflow-hidden">
        <img
          key={currentImage}
          src={currentImage}
          alt={title}
          className="w-full h-full object-cover transition-all duration-700 ease-out"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 text-white">
          <p className="text-sm font-semibold tracking-wide">{subtitle}</p>
        </div>
        <div className="absolute top-4 right-4 bg-white/80 text-sm px-3 py-1 rounded-full shadow">
          {activeIndex + 1}/{images.length}
        </div>
      </div>
      <div className="p-6 space-y-4 flex-1">
        <div>
          <h3 className="text-2xl font-bold text-teal-800 mb-2">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10a3 3 0 100-6 3 3 0 000 6z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.1 8.9a7 7 0 119.8 9.8L12 21.8l-2.9-3.1a7 7 0 01-4-9.8z" />
          </svg>
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
};

const VideoHighlightCard = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;

    const handleFullScreenChange = () => {
      if (!document.fullscreenElement || document.fullscreenElement !== containerRef.current) {
        video.muted = true;
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  const handleToggleFullscreen = async () => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    try {
      if (document.fullscreenElement !== container) {
        if (container.requestFullscreen) {
          await container.requestFullscreen();
        }
        video.muted = false;
        await video.play();
      } else {
        video.muted = true;
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (error) {
      console.error('Fullscreen toggle failed', error);
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleToggleFullscreen}
      className="mt-12 bg-gradient-to-r from-teal-50 via-white to-teal-50 border border-teal-100 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-6 p-6 cursor-pointer hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="flex-1 w-full">
        <video
          ref={videoRef}
          src={gavVideo}
          autoPlay
          muted
          loop
          playsInline
          className="w-full rounded-2xl shadow-md object-cover aspect-video"
        />
      </div>
      <div className="md:w-2/5 space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-teal-500">मेटघर अनुभव</p>
        <h3 className="text-2xl font-bold text-gray-900">मेटघर गावाचा उत्साह</h3>
        <p className="text-gray-600 leading-relaxed">
          व्हिडिओ कार्ड स्वयंचलितपणे सुरू राहते. पूर्ण स्क्रीनमध्ये आवाजासह अनुभवण्यासाठी कार्डवर टॅप करा.
        </p>
        <div className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m0 0l3-3m-3 3l-3-3" />
          </svg>
          पूर्ण स्क्रीनमध्ये पाहा
        </div>
      </div>
    </div>
  );
};

const TouristPlacesGrid = () => (
  <div className="mt-20">
    <div className="flex justify-center mb-4">
      <div className="w-32 border-t-2 border-dotted border-gray-300"></div>
    </div>
    <p className="text-sm text-gray-500 text-center mb-2">|-|</p>
    <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-teal-800">पर्यटन स्थळ</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {touristPlaces.map((place) => (
        <div
          key={place.id}
          className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
        >
          <div className="relative">
            <img src={place.image} alt={place.title} className="w-full h-[250px] object-cover" />
          </div>
          <div className="p-6 space-y-3">
            <h4 className="text-2xl font-bold text-teal-800">{place.title}</h4>
            <p className="text-gray-600 leading-relaxed">{place.description}</p>
            <div className="flex items-center gap-2 text-gray-500 font-medium">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{place.location}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const News = () => {

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 text-center">
            <p className="text-sm text-gray-500 mb-2">मेटघर पर्यटन माहिती</p>
            <div className="h-px bg-gradient-to-r from-transparent via-teal-300 to-transparent"></div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-teal-800">
            पर्यटन स्थळ
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            ब्रह्मगिरीभोवतीचे रमणीय दृश्य, सांस्कृतिक स्थळे आणि गावाची धडधडणारी उत्सवधारा — सर्व काही एका ठिकाणी अनुभवण्यासाठी खालील खास संग्रह पहा.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {slideshowGroups.map((group) => (
              <SlideshowCard key={group.id} {...group} />
            ))}
          </div>

          <VideoHighlightCard />

          <TouristPlacesGrid />
        </div>
      </div>
    </section>
  );
};

export default News;

