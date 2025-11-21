import { useHomeData } from '../hooks/useHomeData';
import kakaImage from '../images/dummy.jpg'; // Fallback image for sarpanch
import upsarpanchImg from '../images/upsarpanch.jpeg';
import gramsevakImg from '../images/gramsevak.jpeg';
import sabhasad1Img from '../images/sabhasad1.jpeg';
import sabhasad2Img from '../images/sabhasad2.jpeg';
import gramvikassadhsayImg from '../images/gramvikassadhsay.jpg';
import sadhshya3Img from '../images/sadhshya3.jpg';

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
  // Helper to get full image URL
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return kakaImage;

    // Already absolute (backend served full URL or base64/blob)
    if (
      imageUrl.startsWith('http') ||
      imageUrl.startsWith('data:') ||
      imageUrl.startsWith('blob:')
    ) {
      return imageUrl;
    }

    // Static assets imported via Vite already resolve to /src/... (dev) or /assets/... (build).
    if (
      imageUrl.startsWith('/src/') ||
      imageUrl.startsWith('/assets/') ||
      imageUrl.startsWith('/images/')
    ) {
      return imageUrl;
    }

    const baseUrl = getApiBaseUrl();

    // API returns URLs like "/api/images/...".
    if (imageUrl.startsWith('/api')) {
      const baseWithoutApi = baseUrl.replace(/\/api$/, '');
      return `${baseWithoutApi}${imageUrl}`;
    }

    // Relative path coming from backend e.g. "images/.." – prefix the API base.
    if (!imageUrl.startsWith('/')) {
      return `${baseUrl}/${imageUrl}`.replace(/([^:]\/+)\/+/g, '$1/');
    }

    // Any other root-relative path can be returned as-is (served by frontend origin).
    return imageUrl;
  };

  // Get leadership data from API
  const leadershipData = data?.leadership;
  const sarpanch = leadershipData?.sarpanch;
  const teamMembers = leadershipData?.teamMembers || [];

  // Default entries (static) - will be merged with backend data.
  const defaultTeam = [
    {
      id: 'upsarpanch',
      image: upsarpanchImg,
      name: { mr: 'दिपक आत्माराम घुमरे' },
      role: { mr: 'उपसरपंच' },
    },
    {
      id: 'gramsevak',
      image: gramsevakImg,
      name: { mr: 'श्रीमती शुभांगी गोरख सुरसे' },
      role: { mr: 'ग्रामपंचायत अधिकारी' },
    },
    {
      id: 'sabhasad1',
      image: sabhasad1Img,
      name: { mr: 'लताबाई बाळकृष्ण गांगुर्डे' },
      role: { mr: 'ग्रा प सदस्य' },
    },
    {
      id: 'sabhasad2',
      image: sabhasad2Img,
      name: { mr: 'नंदकुमार माधवराव चौधरी' },
      role: { mr: 'ग्रा प सदस्य' },
    },
    {
      id: 'gramvikassadhsay',
      image: gramvikassadhsayImg,
      name: { mr: 'श्री छगन शंकर घोलप' },
      role: { mr: 'ग्रा व सदस्य' },
    },
    {
      id: 'sadhshya3',
      image: sadhshya3Img,
      name: { mr: 'सुनीता सचिन सोनवणे' },
      role: { mr: 'ग्रा प सदस्य' },
    }
  ];

  // Merge backend teamMembers with defaults. Backend data wins, defaults fill missing fields.
  const mergedTeam = (() => {
    const map = new Map();
    (teamMembers || []).forEach((m) => {
      const key = m.id || (m.name && (m.name.mr || Object.values(m.name)[0])) || Math.random().toString(36).slice(2);
      map.set(key, { ...m });
    });
    defaultTeam.forEach((def) => {
      const existing = map.get(def.id);
      if (existing) {
        if (!existing.image) existing.image = def.image;
        if (!existing.name) existing.name = def.name;
        if (!existing.role) existing.role = def.role;
      } else {
        map.set(def.id, def);
      }
    });
    return Array.from(map.values());
  })();

  // Ensure sarpanch always has an image - prefer backend but fallback to kakaImage
  let displaySarpanch = sarpanch ? { ...sarpanch } : null;
  if (displaySarpanch) {
    if (!displaySarpanch.image) displaySarpanch.image = kakaImage;
  } else {
    // If no sarpanch from backend, show a simple placeholder with kakaImage
    displaySarpanch = {
      id: 'sarpanch',
      image: kakaImage,
      name: { mr: 'संपूर्ण नाव' },
      role: { mr: 'सरपंच' },
      description: { mr: '' }
    };
  }

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
                <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="p-2 bg-gradient-to-br from-teal-50 to-blue-50">
                    <div className="bg-white rounded-lg p-4">
                      <div className="mb-6 overflow-hidden rounded-lg shadow-md bg-gray-50 flex items-center justify-center h-[420px] p-4">
                          <img 
                            src={getImageUrl(displaySarpanch?.image)} 
                            alt={displaySarpanch?.role?.[language] || displaySarpanch?.role?.mr || 'सरपंच'} 
                            className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                            style={{ imageRendering: 'auto' }}
                          />
                      </div>
                      <div className="text-center space-y-2">
                        <h3 className="text-2xl md:text-3xl font-bold text-blue-800 mb-2">
                          {displaySarpanch?.name?.[language] || displaySarpanch?.name?.mr || 'संपूर्ण नाव'}
                        </h3>
                        <div className="inline-block px-4 py-1 bg-teal-100 rounded-full mb-2">
                          <p className="text-lg font-semibold text-teal-800">
                            {displaySarpanch?.role?.[language] || displaySarpanch?.role?.mr || 'सरपंच'}
                          </p>
                        </div>
                        {displaySarpanch?.village && (
                          <p className="text-base text-gray-600 font-medium">
                            {displaySarpanch.village?.[language] || displaySarpanch.village?.mr || ''}
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
                      {sarpanch?.description?.[language] || sarpanch?.description?.mr || 'गावाच्या सर्वांगीण विकासासाठी, शेतकऱ्यांच्या प्रगतीसाठी, महिला बालकांच्या कल्याणासाठी तसेच सामाजिक ऐक्य राखण्यासाठी आमचे सरपंच नेहमीच पुढाकार घेतात. ग्रामस्थांच्या सक्रिय सहभागाने, पंचायत प्रगती आणि एकतेसाठी काम करते.'}
                    </p>
                    <div className="pt-4 flex items-center gap-2">
                      <div className="w-8 h-0.5 bg-white"></div>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <div className="w-16 h-0.5 bg-white"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Members Section - Three Cards */}
                  <div className="mt-24 md:mt-32">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {mergedTeam.length > 0 ? (
                    mergedTeam.map((member) => (
                      <div 
                        key={member.id || (member.name && member.name.mr) || Math.random()}
                        className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                      >
                        <div className="overflow-hidden bg-gray-50 flex items-center justify-center h-[320px] p-4">
                          <img 
                            src={getImageUrl(member.image)} 
                            alt={member.role?.[language] || member.role?.mr || 'सदस्य'} 
                            className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                            style={{ imageRendering: 'auto' }}
                          />
                        </div>
                        <div className="p-6 text-center space-y-2">
                          <h3 className="text-xl md:text-2xl font-bold text-blue-800 mb-2">
                            {member.name?.[language] || member.name?.mr || 'संपूर्ण नाव'}
                          </h3>
                          <div className="inline-block px-3 py-1 bg-teal-100 rounded-full mb-1">
                            <p className="text-base font-semibold text-teal-800">
                              {member.role?.[language] || member.role?.mr || 'सदस्य'}
                            </p>
                          </div>
                          {member.village && (
                            <p className="text-sm text-gray-600 font-medium">
                              {member.village?.[language] || member.village?.mr || ''}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    // Fallback: show 3 default placeholder cards when mergedTeam somehow empty
                    [1, 2, 3].map((index) => (
                      <div 
                        key={`placeholder-${index}`}
                        className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                      >
                        <div className="overflow-hidden bg-gray-50 flex items-center justify-center h-[320px] p-4">
                          <img 
                            src={kakaImage} 
                            alt="सदस्य" 
                            className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-6 text-center space-y-2">
                          <h3 className="text-xl md:text-2xl font-bold text-blue-800 mb-2">
                            संपूर्ण नाव
                          </h3>
                          <div className="inline-block px-3 py-1 bg-teal-100 rounded-full mb-1">
                            <p className="text-base font-semibold text-teal-800">
                              {index === 1 ? 'उपसरपंच' : index === 2 ? 'ग्राम पंचायत अधिकारी' : 'सदस्य'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
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
