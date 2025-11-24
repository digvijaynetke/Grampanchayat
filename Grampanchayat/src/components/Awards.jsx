// You can replace these with actual award images
import awardImage1 from '../images/info.jpg';
import awardImage2 from '../images/mandir.jpg';
import { useEffect, useState } from 'react';
import awardImage3 from '../images/gav.jpg';
import gramPanchayatImage from '../images/grampanchayat.png';
import gramPanchayatImage2 from '../images/grampanchayat1.png';

const useImageSlideshow = (images, interval = 2000) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return images[index];
};

const Awards = () => {
  const gramPanchayatImageSequence = useImageSlideshow(
    [gramPanchayatImage, gramPanchayatImage2],
    2000
  );
  const awards = [
       {
      id: 1,
      image: awardImage1,
      title: 'नमुना पुरस्कार 1 -स्वच्छता',
      description: 'गाव स्वच्छ ठेवण्यावर भर, घनकचरा व्यवस्थापन युनिट, दैनंदिन  कचरा संकलन साठी घंटागाडी ',
      date: 'date month year',
      category: 'पुरस्कार / यशोगाथा',
      village: 'मेटघर किल्ला  '
    },
    {
      id: 2,
      image: awardImage2,
      title: 'नमुना पुरस्कार 2 - पाणीपुरवठा',
      description: 'महाजल अंतर्गत ६.५०लक्ष लिटर जल कुंभ, जल जीवन मिशन अंतर्गत २.५० लक्ष लिटर जल कुंभ, नियमित आणि शुद्ध पाणीपुरवठा,नागरिकांचे आरोग्य लक्षात घेऊन शुध्द जल आरो प्लांट.',
      date: 'date month year',
      category: 'पुरस्कार / यशोगाथा',
      village: 'मेटघर किल्ला  '
    },
    {
      id: 3,
      image: awardImage3,
      title: 'नमुना पुरस्कार 3',
      description: 'या कार्डवरची माहिती लवकरच अद्ययावत केली जाईल.',
      date: '22 Sep 2025',
      category: 'पुरस्कार / यशोगाथा',
      village: 'मेटघर किल्ला  '
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Sub-heading and Line */}
          <div className="mb-4">
            <p className="text-sm text-gray-500 text-center mb-2">माहिती</p>
            <div className="h-px bg-gray-300 w-full"></div>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-teal-800">
            पुरस्कार / यशोगाथा
          </h2>

          {/* Awards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {awards.map((award) => (
              <div 
                key={award.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image Container with Avatar Overlay */}
                <div className="relative">
                  <img 
                    src={award.image} 
                    alt={award.title} 
                    className="w-full h-[250px] object-cover"
                  />
                  {/* Avatar Icon Overlapping Bottom-Left */}
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                {/* Metadata Bar */}
                <div className="px-4 pt-4 pb-2 space-y-2">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      <span>{award.village}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span>{award.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>{award.category}</span>
                    </div>
                  </div>
                </div>

                {/* Award Title */}
                <div className="px-4 pb-3">
                  <h3 className="text-xl md:text-2xl font-bold text-teal-800 mb-3">
                    {award.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="px-4 pb-6">
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    {award.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Gram Panchayat Highlight */}
          <div className="mt-16">
            <div className="bg-gradient-to-br from-teal-50 via-white to-teal-100 rounded-3xl shadow-2xl overflow-hidden border border-teal-100 transform transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(13,148,136,0.2)]">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-80 md:h-full overflow-hidden">
                  <img
                    src={gramPanchayatImageSequence}
                    alt="ग्रामपंचायत"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                    key={gramPanchayatImageSequence}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <span className="absolute top-4 left-4 bg-white/90 text-teal-700 font-semibold px-4 py-1 rounded-full shadow-lg">
                    ग्रामपंचायत
                  </span>
                </div>
                <div className="p-8 flex flex-col justify-center space-y-4">
                  <p className="text-sm uppercase tracking-[0.3em] text-teal-500">आमचे गाव</p>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900">ग्रामपंचायत</h3>
                  <p className="text-gray-700 leading-relaxed">
                    ग्रामपंचायत ही गावातील स्थानिक स्वराज्य संस्था आहे.
                  </p>
                  <div className="space-y-2 text-gray-600 leading-relaxed">
                    <p>
                      <span className="font-semibold text-teal-700">मुख्य जबाबदारी:</span>
                      {' '}गावाचा सर्वांगीण विकास करणे आणि मूलभूत गरजा पुरवणे.
                    </p>
                    <p>
                      <span className="font-semibold text-teal-700">प्रमुख कामे:</span>
                      {' '}पाणीपुरवठा, स्वच्छता, रस्त्यांची देखभाल, दिवाबत्तीची सोय, जन्म-मृत्यूची नोंदणी,
                      घरपट्टी/पाणीपट्टी कर गोळा करणे आणि शासकीय योजनांची अंमलबजावणी करणे.
                    </p>
                    <p>
                      <span className="font-semibold text-teal-700">प्रमुख व्यक्ती:</span>
                      {' '}सरपंच (कार्यकारी प्रमुख) आणि ग्रामसेवक (प्रशासकीय सचिव).
                    </p>
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

export default Awards;

