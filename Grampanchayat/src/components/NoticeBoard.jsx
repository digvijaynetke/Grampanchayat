import { useEffect, useState } from 'react';
import vr1 from '../images/vr1.png';
import vr2 from '../images/vr2.png';
import vr3 from '../images/vr3.png';
import vr4 from '../images/vr4.png';

const useSlideshow = (images, interval = 2000) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return images[index];
};

const NoticeBoard = () => {
  const currentImage = useSlideshow([vr1, vr2, vr3, vr4], 2000);

  return (
    <section className="py-16 bg-gray-50">
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
            विकास कामे
          </h2>

          {/* Tree Plantation Highlight */}
          <div className="mt-8">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-teal-100 transform transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(13,148,136,0.2)]">
              <div className="flex flex-col lg:flex-row">
                <div className="relative lg:w-1/2 h-72 lg:h-auto">
                  <img
                    src={currentImage}
                    alt="वृक्षारोपण कार्यक्रम"
                    className="w-full h-full object-cover transition-all duration-700 ease-out"
                    key={currentImage}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/50"></div>
                  <div className="absolute top-4 left-4 bg-white/90 text-teal-700 font-semibold px-4 py-1 rounded-full shadow">
                    वृक्षारोपण उत्सव
                  </div>
                  <div className="absolute bottom-4 right-4 text-xs font-semibold text-white bg-black/40 px-3 py-1 rounded-full">
                    1/4 फोटो
                  </div>
                </div>
                <div className="lg:w-1/2 p-8 space-y-4">
                  <p className="text-sm uppercase tracking-[0.3em] text-teal-500">आजचा कार्यक्रम</p>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                    वृक्षारोपण गौरव
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    आज, दि. [तारीख लिहा], आमच्या गावात भव्य वृक्षारोपण समारंभ उत्साहात पार पडला.
                  </p>
                  <div className="space-y-3 text-gray-600 leading-relaxed">
                    <p>
                      <span className="font-semibold text-teal-700">उद्देश:</span>
                      {' '}पर्यावरणाचे रक्षण करणे आणि गावाची हिरवळ वाढवणे.
                    </p>
                    <p>
                      <span className="font-semibold text-teal-700">झाडे लावली:</span>
                      {' '}विविध प्रकारची [उदा. ५००] झाडे लावण्यात आली.
                    </p>
                    <p>
                      <span className="font-semibold text-teal-700">सहभाग:</span>
                      {' '}गावातील नागरिक, तरुण मंडळे आणि ग्रामपंचायतीच्या प्रतिनिधींनी मोठ्या उत्साहाने यात सहभाग घेतला.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="inline-flex items-center gap-1 font-semibold text-teal-700">
                      📍 मेटघर किल्ला
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-teal-700">
                      📆 22 Sep 2025
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-teal-700">
                      🌱 सामुदायिक सहभाग
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoticeBoard;

