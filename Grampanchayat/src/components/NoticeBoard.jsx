import { useEffect, useState } from 'react';
import vr1 from '../images/vr1.png';
import vr2 from '../images/vr2.png';
import vr3 from '../images/vr3.png';
import vr4 from '../images/vr4.png';
import of1 from '../images/of1.png';
import of2 from '../images/of2.png';
import schol from '../images/schol.png';
import img1 from '../images/1.png';
import img2 from '../images/2.png';
import img3 from '../images/3.png';
import img4 from '../images/4.png';
import img5 from '../images/5.png';
import img6 from '../images/6.png';
import img7 from '../images/7.png';

const ImageCarousel = ({ images, interval = 3000 }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images, interval]);

  return (
    <div className="relative w-full h-64 md:h-80 bg-black rounded-2xl overflow-hidden">
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`absolute inset-0 w-full h-full object-contain bg-black transition-opacity duration-700 ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  );
};

const NoticeCard = ({ title, images, interval }) => (
  <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-5 space-y-4">
    <h3 className="text-xl font-bold text-teal-800 text-center">{title}</h3>
    {images.length > 1 ? (
      <ImageCarousel images={images} interval={interval} />
    ) : (
      <div className="w-full h-64 md:h-80 bg-black rounded-2xl overflow-hidden flex items-center justify-center">
        <img src={images[0]} alt={title} className="max-h-full object-contain" />
      </div>
    )}
  </div>
);

const NoticeBoard = () => {
  const firstRowCards = [
    {
      title: 'वृक्षदिंडी – पहिला क्षण',
      images: [vr1, vr2]
    },
    {
      title: 'वृक्षदिंडी – दुसरा क्षण',
      images: [vr3, vr4]
    }
  ];

  const additionalCards = [
    {
      title: 'दिनांक ४ सप्टेंबर, २०२४ रोजी नाशिक येथे सरपंच प्रशिक्षणास उपस्थित सरपंच विशाल पवार',
      images: [of1, of2]
    },
    {
      title: 'दिनांक २ ऑक्टोबर, २०२४ रोजी जि. प. मराठी शाळेत वृक्षारोपण करताना',
      images: [schol]
    },
    {
      title: 'ग्रामपंचायतीचे विविध उपक्रम (क्षणचित्रे)',
      images: [img1, img2, img3, img4, img5, img6, img7]
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-teal-800">
            दिनांक २८ जुलै, २०२४ रोजी के डी गावित विद्यालयात वृक्षदिंडी व वृक्षारोपण करताना
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {firstRowCards.map((card) => (
              <NoticeCard key={card.title} {...card} interval={3000} />
            ))}
          </div>

          <div className="space-y-8">
            {additionalCards.map((card) => (
              <NoticeCard key={card.title} {...card} interval={3000} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoticeBoard;

