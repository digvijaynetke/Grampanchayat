import { useHomeData } from '../hooks/useHomeData';
// import VideoPlayer from './VideoPlayer';

const About = () => {
  const { data, loading } = useHomeData();
  const language = 'mr'; // Default to Marathi

  // Get about data from API or use fallback
  const aboutData = data?.about;
  const title = aboutData?.title?.[language] || aboutData?.title?.mr || 'आपला अभिमान, आपलं गाव';
  const description = aboutData?.description?.[language] || aboutData?.description?.mr || 'हे गाव एक शांत आणि सांस्कृतिक वारसा जपणारे ठिकाण आहे. शिक्षणाचा दर्जा चांगला असून साक्षरतेच्या दृष्टीने हे गाव प्रगत मानले जाते. स्वतःची ग्रामपंचायत असल्याने स्थानिक पातळीवर प्रशासनाची सुविधा उपलब्ध आहे. जवळच महत्त्वाची शहरे आणि बाजारपेठा असल्याने खरेदी-विक्री आणि व्यवहार सोयीस्कर होतात. गावाजवळून जाणारे राष्ट्रीय महामार्ग वाहतूक आणि संपर्कासाठी महत्त्वाचे साधन ठरतात.';
  // const videoUrl = aboutData?.videoUrl; // Video feature temporarily disabled

  return (
    <>
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-800">
              आपला अभिमान, आपलं गाव
            </h2>
            <h3 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-blue-800">
              आमच्या गावात आपले मनःपूर्वक स्वागत आहे.
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed text-justify mb-8">
              हे गाव एक शांत आणि सांस्कृतिक वारसा जपणारे ठिकाण आहे. शिक्षणाचा दर्जा चांगला असून साक्षरतेच्या दृष्टीने हे गाव प्रगत मानले जाते. स्वतःची ग्रामपंचायत असल्याने स्थानिक पातळीवर प्रशासनाची सुविधा उपलब्ध आहे. जवळच महत्त्वाची शहरे आणि बाजारपेठा असल्याने खरेदी-विक्री आणि व्यवहार सोयीस्कर होतात. गावाजवळून जाणारे राष्ट्रीय महामार्ग वाहतूक आणि संपर्कासाठी महत्त्वाचे साधन ठरतात.
            </p>

            {/* स्थान माहिती */}
            <div className="bg-blue-50 rounded-2xl shadow-md p-6 mb-8">
              <h4 className="text-2xl font-semibold text-blue-900 mb-4">🗺️ स्थान (Location)</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>राज्य:</strong> महाराष्ट्र (Maharashtra)</li>
                <li><strong>जिल्हा:</strong> नाशिक (Nashik)</li>
                <li><strong>तालुका:</strong> चांदवड (Chandvad)</li>
                <li><strong>मुख्यालयापासून अंतर:</strong> तालुका मुख्यालय चांदवडपासून सुमारे २६ किमी आणि जिल्हा मुख्यालय नाशिकपासून सुमारे ५३ किमी</li>
                <li><strong>पिन कोड:</strong> ४२३१११ (423111)</li>
                <li><strong>साक्षरता दर:</strong> सुमारे ६१.६१% (पुरुष: ६७.१२%, महिला: ५५.९८%)</li>
                <li><strong>एकूण क्षेत्रफळ:</strong> ९३५ हेक्टर</li>
              </ul>
            </div>

            {/* प्रशासन माहिती */}
            <div className="bg-green-50 rounded-2xl shadow-md p-6 mb-8">
              <h4 className="text-2xl font-semibold text-green-900 mb-4">🏛️ प्रशासन (Administration)</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>ग्रामपंचायत:</strong> पिंपळणारे</li>
                <li><strong>प्रमुख:</strong> सरपंच</li>
                <li><strong>विधानसभा मतदारसंघ:</strong> चांदवड</li>
                <li><strong>लोकसभा मतदारसंघ:</strong> दिंडोरी (Dindori)</li>
              </ul>
            </div>

            {/* कनेक्टिव्हिटी */}
            <div className="bg-yellow-50 rounded-2xl shadow-md p-6 mb-8">
              <h4 className="text-2xl font-semibold text-yellow-900 mb-4">🚌 कनेक्टिव्हिटी (Connectivity)</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>बस सेवा:</strong> गावात सार्वजनिक बस सेवा उपलब्ध आहे.</li>
                <li><strong>जवळचे शहर:</strong> नाशिक (सर्व प्रमुख आर्थिक व्यवहारांसाठी)</li>
              </ul>
            </div>

            {/* Video feature disabled: button removed to prevent VideoPlayer errors */}
         </div>
        </div>
      </section>

      {/* Video Player Modal disabled to avoid errors */}
    </>
  );
};

export default About;
