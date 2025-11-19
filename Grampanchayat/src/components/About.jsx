import { useState } from 'react';
import { useHomeData } from '../hooks/useHomeData';
import VideoPlayer from './VideoPlayer';

const About = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const { data, loading } = useHomeData();
  const language = 'mr'; // Default to Marathi

  // Get about data from API or use fallback
  const aboutData = data?.about;
  const title = aboutData?.title?.[language] || aboutData?.title?.mr || 'आपला अभिमान, आपलं गाव';
  const description =
    aboutData?.description?.[language] ||
    aboutData?.description?.mr ||
    'हे गाव एक शांत आणि सांस्कृतिक वारसा जपणारे ठिकाण आहे. शिक्षणाचा दर्जा चांगला असून साक्षरतेच्या दृष्टीने हे गाव प्रगत मानले जाते. स्वतःची ग्रामपंचायत असल्याने स्थानिक पातळीवर प्रशासनाची सुविधा उपलब्ध आहे. जवळच महत्त्वाची शहरे आणि बाजारपेठा असल्याने खरेदी-विक्री आणि व्यवहार सोयीस्कर होतात. गावाजवळून जाणारे राष्ट्रीय महामार्ग वाहतूक आणि संपर्कासाठी महत्त्वाचे साधन ठरतात.';
  const videoUrl = aboutData?.videoUrl;
  const downloads = [
    {
      label: 'click here to download "ग्रामपंचायतीमार्फत देण्यात येणारे दाखले/प्रमाणपत्रे"',
      url: 'https://drive.google.com/file/d/1SiBAPjY26mCKJH5NEiXu25krJ2JrdFh7/view?usp=sharing'
    },
    {
      label:
        'download "मुख्यमंत्री समृद्ध पंचायत राज अभियान अंतर्गत ग्रामपंचायतींकडून भनवासी मालमत्ता कर व अन्य कर थकबाकी वसुलीत सवलत देणेबाबत"',
      url: 'https://drive.google.com/file/d/1CoPR4c3BDI3MTgXvNqijIArRDavjkyF2/view?usp=sharing'
    }
  ];

  return (
    <>
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="text-center">
                <p className="text-lg text-gray-600">लोड होत आहे...</p>
              </div>
            ) : (
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-800">
                  {title}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed text-justify mb-8">
                  {description}
                </p>
                <div className="space-y-3 mb-10">
                  {downloads.map((doc) => (
                    <a
                      key={doc.label}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl bg-teal-600 text-white font-semibold shadow-lg hover:bg-teal-700 transition"
                    >
                      {doc.label}
                    </a>
                  ))}
                </div>
            
                {/* Play Button - Only show if video URL exists */}
                {videoUrl && (
                  <div className="flex justify-center">
                    <button
                      onClick={() => setIsVideoOpen(true)}
                      className="w-20 h-20 md:w-24 md:h-24 bg-teal-800 hover:bg-teal-900 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
                      aria-label="Play Video"
                    >
                      <svg 
                        className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" 
                        fill="teal" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Video Player Modal */}
      {/* {isVideoOpen && videoUrl && (
        <VideoPlayer 
          videoUrl={videoUrl}
          onClose={() => setIsVideoOpen(false)} 
        />
      )} */}
    </>
  );
};

export default About;
