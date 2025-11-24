import { useHomeData } from '../hooks/useHomeData';
import kakaImage from '../images/kaka.jpg'; // Generic fallback image
import sarpanchImage from '../images/sarpanch.png';
import gramsevakImage from '../images/gramsevak.png';

const Leadership = () => {
  const { data, loading } = useHomeData();
  const language = 'mr'; // Default to Marathi
  const fallbackSarpanchName = 'संपूर्ण नाव';
  const fallbackSarpanchRole = 'सरपंच';
  const fallbackSarpanchDescription =
    'गावाच्या सर्वांगीण विकासासाठी, शेतकऱ्यांच्या प्रगतीसाठी, महिला बालकांच्या कल्याणासाठी तसेच सामाजिक ऐक्य राखण्यासाठी आमचे सरपंच नेहमीच पुढाकार घेतात. ग्रामस्थांच्या सक्रिय सहभागाने, पंचायत प्रगती आणि एकतेसाठी काम करते.';
  const fallbackContacts = {
    sarpanch: '+91 9876543210',
    उपसरपंच: '+91 9876500001',
    'ग्राम पंचायत अधिकारी': '+91 9876500002',
    सदस्य: '+91 9876500003',
  };
  const placeholderTeamMembers = [
    {
      id: 'placeholder-1',
      name: 'संपूर्ण नाव',
      role: 'उपसरपंच',
      image: kakaImage,
      contact: fallbackContacts['उपसरपंच'],
    },
    {
      id: 'placeholder-2',
      name: 'गणेश पागर',
      role: 'ग्राम पंचायत अधिकारी',
      image: gramsevakImage,
      contact: fallbackContacts['ग्राम पंचायत अधिकारी'],
    },
    {
      id: 'placeholder-3',
      name: 'संपूर्ण नाव',
      role: 'सदस्य',
      image: kakaImage,
      contact: fallbackContacts['सदस्य'],
    },
  ];

  const getLocalizedField = (field, fallback = '') => {
    if (!field) return fallback;
    if (typeof field === 'string') return field || fallback;
    return field[language] || field.mr || field.en || fallback;
  };

  const normalizeContact = (contact, fallback) => {
    const value = contact?.toString().trim();
    if (!value) return fallback;
    if (value.startsWith('+91')) return value;
    if (/^\d{10}$/.test(value)) {
      return `+91 ${value}`;
    }
    return value;
  };

  const getApiBaseUrl = () => {
    // If on localhost, check .env file first
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
    }
    // For production/Netlify: Always use Render backend
    return 'https://grampanchayat-website-project-code.onrender.com/api';
  };
  // Helper to get full image URL
  const getImageUrl = (imageUrl, fallbackImage = kakaImage) => {
    if (!imageUrl) return fallbackImage;
    if (imageUrl.startsWith('http')) return imageUrl;
    
    // API returns URLs like "/api/images/..." 
    // VITE_API_BASE_URL is "http://localhost:5000/api"
    // So we need to remove /api from base URL if URL already starts with /api
    const baseUrl = getApiBaseUrl();
    if (imageUrl.startsWith('/api')) {
      // Remove /api from base URL to avoid double /api
      const baseWithoutApi = baseUrl.replace(/\/api$/, '');
      return `${baseWithoutApi}${imageUrl}`;
    }
    return `${baseUrl}${imageUrl}`;
  };

  // Get leadership data from API
  const leadershipData = data?.leadership;
  const sarpanch = leadershipData?.sarpanch;
  const teamMembers = leadershipData?.teamMembers || [];
  const sarpanchName = getLocalizedField(sarpanch?.name, fallbackSarpanchName);
  const sarpanchRoleLabel = getLocalizedField(sarpanch?.role, fallbackSarpanchRole);
  const sarpanchDescription = getLocalizedField(
    sarpanch?.description,
    fallbackSarpanchDescription
  );
  const sarpanchImageSrc = getImageUrl(sarpanch?.image, sarpanchImage);
  const sarpanchContact = normalizeContact(sarpanch?.contact, fallbackContacts.sarpanch);

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
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
                  <div className="p-2 bg-gradient-to-br from-teal-50 to-blue-50">
                    <div className="bg-white rounded-2xl p-5">
                      <div className="mb-6 overflow-hidden rounded-2xl shadow-md bg-gradient-to-b from-slate-50 to-white flex items-center justify-center h-[420px] relative">
                          <img 
                            src={sarpanchImageSrc} 
                            alt={sarpanchRoleLabel} 
                            className="w-full h-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-105"
                            loading="lazy"
                            style={{ imageRendering: 'auto' }}
                          />
                          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-white opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
                      </div>
                      <div className="text-center space-y-2">
                        <h3 className="text-2xl md:text-3xl font-bold text-blue-800 mb-2">
                          {sarpanchName}
                        </h3>
                        <div className="inline-block px-4 py-1 bg-teal-100 rounded-full mb-2">
                          <p className="text-lg font-semibold text-teal-800">
                            {sarpanchRoleLabel}
                          </p>
                        </div>
                        {sarpanch?.village && (
                          <p className="text-base text-gray-600 font-medium">
                            {sarpanch.village?.[language] || sarpanch.village?.mr || ''}
                          </p>
                        )}
                        <div className="flex items-center justify-center gap-2 text-base font-semibold text-teal-700">
                          <span className="inline-flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h2l3.6 7.59a1 1 0 00.9.59H17a1 1 0 010 2h-5M6 5V3a1 1 0 011-1h2m8 0h2a1 1 0 011 1v2m-2 16h-2a1 1 0 01-1-1v-2M7 21H5a1 1 0 01-1-1v-2" />
                            </svg>
                            {sarpanchContact}
                          </span>
                        </div>
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
                      {sarpanchDescription}
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
                  {teamMembers.length > 0 ? (
                    teamMembers.map((member, index) => {
                      const roleLabelRaw = getLocalizedField(member.role, 'सदस्य');
                      const roleLabel = roleLabelRaw?.trim() || 'सदस्य';
                      const isGramPanchayatOfficer = roleLabel === 'ग्राम पंचायत अधिकारी';
                      const fallbackMemberName = isGramPanchayatOfficer ? 'गणेश पागर' : 'संपूर्ण नाव';
                      const memberName = getLocalizedField(member.name, fallbackMemberName);
                      const memberImageSrc = getImageUrl(
                        member.image,
                        isGramPanchayatOfficer ? gramsevakImage : kakaImage
                      );
                      const memberVillage = getLocalizedField(member.village, '');
                      const fallbackContact = isGramPanchayatOfficer
                        ? fallbackContacts['ग्राम पंचायत अधिकारी']
                        : fallbackContacts[roleLabel] || fallbackContacts['सदस्य'];
                      const memberContact = normalizeContact(
                        member.contact,
                        fallbackContact || `+91 98765000${index}`
                      );

                      return (
                        <div
                          key={member.id}
                          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                        >
                          <div className="overflow-hidden bg-gradient-to-b from-slate-50 to-white flex items-center justify-center h-[360px]">
                            <img
                              src={memberImageSrc}
                              alt={roleLabel}
                              className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                              style={{ imageRendering: 'auto' }}
                            />
                          </div>
                          <div className="p-6 text-center space-y-2">
                            <h3 className="text-xl md:text-2xl font-bold text-blue-800 mb-2">
                              {memberName}
                            </h3>
                            <div className="inline-block px-3 py-1 bg-teal-100 rounded-full mb-1">
                              <p className="text-base font-semibold text-teal-800">
                                {roleLabel}
                              </p>
                            </div>
                            {memberVillage && (
                              <p className="text-sm text-gray-600 font-medium">
                                {memberVillage}
                              </p>
                            )}
                            <p className="text-sm font-semibold text-teal-700 tracking-wide">
                              {memberContact}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    placeholderTeamMembers.map((member) => (
                      <div
                        key={member.id}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                      >
                        <div className="overflow-hidden bg-gradient-to-b from-slate-50 to-white flex items-center justify-center h-[360px]">
                          <img
                            src={member.image}
                            alt={member.role}
                            className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-6 text-center space-y-2">
                          <h3 className="text-xl md:text-2xl font-bold text-blue-800 mb-2">
                            {member.name}
                          </h3>
                          <div className="inline-block px-3 py-1 bg-teal-100 rounded-full mb-1">
                            <p className="text-base font-semibold text-teal-800">
                              {member.role}
                            </p>
                          </div>
                          <p className="text-sm font-semibold text-teal-700 tracking-wide">
                            {member.contact}
                          </p>
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
