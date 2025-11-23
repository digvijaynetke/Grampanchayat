import { useHomeData } from '../hooks/useHomeData';
import kakaImage from '../images/kaka.jpg'; // Generic fallback image
import gavImage from '../images/gav.jpg';
import gramadhikariImage from '../images/gramadhikari.png';
import paniputraImage from '../images/panipurotha_karmachari.png';
import shipaiImage from '../images/shipaii.png';
import sarpanchImage from '../images/sarpanch.png';

const Leadership = () => {
  const { data, loading } = useHomeData();
  const language = 'mr'; // Default to Marathi

  const getApiBaseUrl = () => {
    // If on localhost, check .env file first
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
    }
    // For production/Netlify: Always use Render backend
    return 'https://grampanchayat-website-project-code.onrender.com/api';
  };
  // Helper to get full image URL when coming from backend
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return kakaImage;
    if (imageUrl.startsWith('http')) return imageUrl;

    const baseUrl = getApiBaseUrl();
    if (imageUrl.startsWith('/api')) {
      const baseWithoutApi = baseUrl.replace(/\/api$/, '');
      return `${baseWithoutApi}${imageUrl}`;
    }
    return `${baseUrl}${imageUrl}`;
  };

  const getLocalizedValue = (value, fallbackValue = '') => {
    if (!value) return fallbackValue;
    if (typeof value === 'string') return value;
    return value[language] || value.mr || value.en || fallbackValue;
  };

  const fallbackSarpanch = {
    image: sarpanchImage,
    name: { mr: 'कविता श्रीहरी ठाकरे' },
    role: { mr: 'सरपंच' },
    village: { mr: 'उर्धूळ' },
    contact: '७६६६९८१७५५',
    description: {
      mr: 'गावाच्या प्रगतीसाठी सक्रिय नेतृत्व, महिला व समाजकल्याणासाठी ठोस उपक्रम आणि विकासाचे स्पष्ट धोरण हे आमच्या सरपंचांच्या कार्याचे वैशिष्ट्य आहे.'
    },
    isStatic: true
  };

  const fallbackTeamMembers = [
    {
      id: 'upsarpanch',
      image: kakaImage,
      name: { mr: 'सौ. मीरा दत्तात्रय ठाकरे' },
      contact: '९९२१६१९५३१',
      role: { mr: 'उपसरपंच' },
      village: { mr: 'उर्धूळ' },
      isStatic: true
    },
    {
      id: 'gramadhikari',
      image: gramadhikariImage,
      name: { mr: 'योगेश दादा पापल' },
      contact: '7588195225',
      role: { mr: 'ग्रामपंचायत अधिकारी' },
      village: { mr: 'उर्धूळ' },
      isStatic: true
    },
    {
      id: 'panipuravatha',
      image: paniputraImage,
      name: { mr: 'दत्तू कुशाबा खूटे' },
      contact: '७६२०७८३६७६',
      role: { mr: 'पाणीपुरवठा कर्मचारी' },
      village: { mr: 'उर्धूळ' },
      isStatic: true
    },
    {
      id: 'shipai',
      image: shipaiImage,
      name: { mr: 'सिहरी शिपाई' },
      contact: '7666981755',
      role: { mr: 'सदस्य' },
      village: { mr: 'उर्धूळ' },
      isStatic: true
    }
  ];

  // Get leadership data from API
  const leadershipData = data?.leadership;
  const sarpanch = leadershipData?.sarpanch;
  const teamMembers = leadershipData?.teamMembers || [];

  const resolvedSarpanch = sarpanch
    ? { ...fallbackSarpanch, ...sarpanch, isStatic: !sarpanch?.image }
    : fallbackSarpanch;

  const resolvedTeamMembers = (() => {
    if (!teamMembers.length) return fallbackTeamMembers;
    const maxLength = Math.max(teamMembers.length, fallbackTeamMembers.length);
    return Array.from({ length: maxLength }, (_, index) => {
      const backendMember = teamMembers[index];
      const fallbackMember = fallbackTeamMembers[index];
      if (backendMember) {
        const mergedMember = {
          ...(fallbackMember || {}),
          ...backendMember
        };
        return {
          ...mergedMember,
          isStatic: !backendMember?.image && (fallbackMember?.isStatic ?? false)
        };
      }
      return fallbackMember;
    }).filter(Boolean);
  })();

  const resolveImageSource = (member) => {
    if (member?.isStatic) {
      return member?.image || kakaImage;
    }
    return member?.image ? getImageUrl(member.image) : (member?.image || kakaImage);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Heading with horizontal lines */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-teal-600"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mx-6 tracking-wide">
              नेतृत्व
            </h2>
            <div className="flex-1 h-0.5 bg-gradient-to-l from-transparent via-teal-400 to-teal-600"></div>
          </div>

          {/* Descriptive Paragraph */}
          <p className="text-lg md:text-xl text-center text-gray-700 mb-16 max-w-3xl mx-auto leading-relaxed">
            आमचे आदरणीय सरपंच नेतृत्व समर्पण, प्रामाणिकपणा आणि विकासाच्या दृष्टिकोनाने करतात.
          </p>
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">लोड होत आहे...</p>
            </div>
          ) : (
            <>
              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                {/* Left Column - Sarpanch Card */}
                <div className="group bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                  <div className="p-2 bg-gradient-to-br from-teal-50 to-blue-50">
                    <div className="bg-white rounded-lg p-4">
                      <div className="mb-6 overflow-hidden rounded-xl shadow-md">
                          <img 
                            src={resolveImageSource(resolvedSarpanch)} 
                            alt={getLocalizedValue(resolvedSarpanch.role, 'सरपंच')} 
                            className="w-full h-[420px] object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                            style={{ imageRendering: 'auto' }}
                          />
                      </div>
                      <div className="text-center space-y-2">
                        <h3 className="text-2xl md:text-3xl font-bold text-blue-800 mb-1">
                          {getLocalizedValue(resolvedSarpanch.name, 'संपूर्ण नाव')}
                        </h3>
                        <div className="inline-flex items-center gap-2 px-4 py-1 bg-teal-100 rounded-full mb-1">
                          <svg className="w-4 h-4 text-teal-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12l4.243-4.243a4 4 0 10-5.657-5.657L7.757 6.343a8 8 0 1011.314 11.314l-1.414-1.414z" />
                          </svg>
                          <p className="text-lg font-semibold text-teal-800">
                            {getLocalizedValue(resolvedSarpanch.role, 'सरपंच')}
                          </p>
                        </div>
                        {resolvedSarpanch?.village && (
                          <p className="text-base text-gray-600 font-medium">
                            {getLocalizedValue(resolvedSarpanch.village, 'उर्धूळ')}
                          </p>
                        )}
                        {resolvedSarpanch?.contact && (
                          <p className="flex items-center justify-center gap-2 text-base text-gray-700 font-semibold">
                            <svg className="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.57 2.28a2 2 0 01-.45 1.864l-1.12 1.12a16 16 0 006.586 6.586l1.12-1.12a2 2 0 011.864-.45l2.28.57A2 2 0 0121 18.72V21a2 2 0 01-2 2h-1C9.163 23 1 14.837 1 4V3a2 2 0 012-2z" />
                            </svg>
                            {resolvedSarpanch.contact}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Leadership Description Block */}
                <div className="bg-gradient-to-br from-teal-700 to-teal-900 rounded-xl shadow-xl p-8 md:p-10 flex items-center border border-teal-800">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1 h-12 bg-white rounded-full"></div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white">आमचे नेतृत्व</h3>
                    </div>
                    <p className="text-white text-lg md:text-xl leading-relaxed text-left">
                      {getLocalizedValue(
                        resolvedSarpanch.description,
                        'गावाच्या सर्वांगीण विकासासाठी, शेतकऱ्यांच्या प्रगतीसाठी, महिला बालकांच्या कल्याणासाठी तसेच सामाजिक ऐक्य राखण्यासाठी आमचे सरपंच नेहमीच पुढाकार घेतात. ग्रामस्थांच्या सक्रिय सहभागाने, पंचायत प्रगती आणि एकतेसाठी काम करते.'
                      )}
                    </p>
                    <div className="pt-4 flex items-center gap-2">
                      <div className="w-8 h-0.5 bg-white"></div>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <div className="w-16 h-0.5 bg-white"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Members Section - Cards */}
              <div className="mt-24 md:mt-32">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
                  {resolvedTeamMembers.map((member) => (
                    <div 
                      key={member?.id || getLocalizedValue(member?.name)}
                      className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                    >
                      <div className="overflow-hidden">
                        <img 
                          src={resolveImageSource(member)} 
                          alt={getLocalizedValue(member?.role, 'सदस्य')} 
                          className="w-full h-[320px] object-cover object-center transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                          style={{ imageRendering: 'auto' }}
                        />
                      </div>
                      <div className="p-6 text-center space-y-3">
                        <h3 className="text-xl md:text-2xl font-bold text-blue-800">
                          {getLocalizedValue(member?.name, 'संपूर्ण नाव')}
                        </h3>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100 rounded-full">
                          <svg className="w-4 h-4 text-teal-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12l4.243-4.243a4 4 0 10-5.657-5.657L7.757 6.343a8 8 0 1011.314 11.314l-1.414-1.414z" />
                          </svg>
                          <p className="text-base font-semibold text-teal-800">
                            {getLocalizedValue(member?.role, 'सदस्य')}
                          </p>
                        </div>
                        {member?.village && (
                          <p className="text-sm text-gray-600 font-medium">
                            {getLocalizedValue(member.village, 'उर्धूळ')}
                          </p>
                        )}
                        {member?.contact && (
                          <p className="flex items-center justify-center gap-2 text-sm text-gray-700 font-semibold">
                            <svg className="w-4 h-4 text-teal-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.57 2.28a2 2 0 01-.45 1.864l-1.12 1.12a16 16 0 006.586 6.586l1.12-1.12a2 2 0 011.864-.45l2.28.57A2 2 0 0121 18.72V21a2 2 0 01-2 2h-1C9.163 23 1 14.837 1 4V3a2 2 0 012-2z" />
                            </svg>
                            {member.contact}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Leadership;
