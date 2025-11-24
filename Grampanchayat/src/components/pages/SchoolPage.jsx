import PageHero from '../PageHero';
import gavImage from '../../images/gav.jpg';
import mandirImage from '../../images/mandir.jpg';
import scImage1 from '../../images/sc1.png';
import scImage2 from '../../images/sc2.png';
import schoolVideo from '../../images/sc2.mp4';

const SchoolPage = () => {
  const schools = [
    {
      id: 1,
      name: 'मेटघर जिल्हा परिषद शाळा',
      description:
        'गावातील मुलांसाठी प्राथमिक ते माध्यमिक शिक्षणाची सोय. आधुनिक प्रयोगशाळा, क्रीडा मैदाने आणि स्मार्ट क्लासरूममुळे विद्यार्थ्यांना सक्षम वातावरण मिळते.',
      level: 'प्राथमिक आणि माध्यमिक',
      students: '200+',
      location: 'मेटघर किल्ला'
    },
    {
      id: 2,
      name: 'मेटघर कनिष्ठ महाविद्यालय',
      description:
        'विज्ञान आणि कला शाखांसाठी कुशल शिक्षकवर्ग, ग्रंथालय आणि प्रयोगशाळांची उत्तम सुविधा. विद्यार्थ्यांचा निकाल सातत्याने श्रेष्ठ राहिला आहे.',
      level: 'उच्च-माध्यमिक',
      students: '150+',
      location: 'मेटघर किल्ला'
    }
  ];

  return (
    <div>
      <PageHero 
        title="शाळा" 
        subtitle="माहिती"
        image={mandirImage}
      />
      <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-teal-800">
            शाळा
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {schools.map((school, index) => (
              <div
                key={school.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={index === 0 ? scImage1 : scImage2}
                    alt={school.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                  <span className="absolute top-4 left-4 bg-white/90 text-teal-700 font-semibold px-4 py-1 rounded-full shadow">
                    मेटघर किल्ला
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-teal-800 mb-3">
                    {school.name}
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {school.description}
                  </p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-semibold">स्तर:</span>
                      <span>{school.level}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-semibold">विद्यार्थी:</span>
                      <span>{school.students}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>{school.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Video Highlight */}
          <div className="mt-12">
            <div className="bg-gradient-to-r from-teal-50 via-white to-teal-50 border border-teal-100 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row items-stretch">
              <div className="md:w-1/2">
                <video
                  src={schoolVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8 space-y-4">
                <p className="text-sm uppercase tracking-[0.3em] text-teal-500">मेटघर किल्ला</p>
                <h3 className="text-3xl font-bold text-gray-900">आमच्या गावातील शिक्षणाचा अभिमान</h3>
                <p className="text-gray-700 leading-relaxed">
                  आधुनिक सुविधा, अनुभवी शिक्षक आणि प्रगत शैक्षणिक उपक्रम यामुळे मेटघर किल्ल्यातील शाळा सतत प्रगतीचा ध्यास घेत आहेत. विद्यार्थ्यांना गुणवत्ता शिक्षण मिळावे म्हणून डिजिटल क्लासरूम, ग्रंथालय, क्रीडा मैदाने आणि विविध उपक्रम राबवले जातात.
                </p>
                <p className="text-gray-600">
                  बालकांपासून ते उच्च-माध्यमिक विद्यार्थ्यांपर्यंत सर्वांसाठी सुरक्षित, सर्जनशील आणि प्रेरणादायी वातावरण निर्माण करणे हे आमचे ध्येय आहे.
                </p>
                <div className="flex flex-wrap gap-3 text-sm font-semibold text-teal-700">
                  <span>📍 मेटघर किल्ला</span>
                  <span>🎓 सर्वसमावेशक शिक्षण</span>
                  <span>🎥 प्रेरणादायी कथा</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default SchoolPage;

