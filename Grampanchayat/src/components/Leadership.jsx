import { useHomeData } from '../hooks/useHomeData';
import kakaImage from '../images/kaka.jpg'; // Fallback image
import sarpanchImage from '../images/sarpanch.png';
import upsarpanchImage from '../images/upsarpanch.png';
import gramadhikariImage from '../images/gramadhikari.png';
import sadasya1Image from '../images/sadasya1.png';
import sadasya2Image from '../images/sadasya2.png';
import sadasya3Image from '../images/sadasya3.png';
import sadasya4Image from '../images/sadasya4.png';

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
    if (
      imageUrl.startsWith('http') ||
      imageUrl.startsWith('data:') ||
      imageUrl.startsWith('/assets') ||
      imageUrl.startsWith('/src')
    ) {
      return imageUrl;
    }

    const baseUrl = getApiBaseUrl();
    if (imageUrl.startsWith('/api')) {
      const baseWithoutApi = baseUrl.replace(/\/api$/, '');
      return `${baseWithoutApi}${imageUrl}`;
    }

    if (imageUrl.startsWith('/')) {
      return imageUrl;
    }

    return `${baseUrl}${imageUrl}`;
  };

  // Get leadership data from API
  const leadershipData = data?.leadership;
  const sarpanch = leadershipData?.sarpanch;
  const teamMembers = leadershipData?.teamMembers || [];

  const fallbackSarpanch = {
    image: sarpanchImage,
    name: { mr: 'विशाल यशवंत पवार' },
    role: { mr: 'सरपंच ठाणेपाडा' },
    description: {
      mr: 'ग्रामस्थांच्या सहभागातून विकास, पारदर्शकता आणि सामाजिक ऐक्य उभारणारे समर्पित नेतृत्व.'
    },
    village: { mr: 'ठाणेपाडा' }
  };

  const fallbackTeamMembers = [
    {
      image: upsarpanchImage,
      name: { mr: 'महेंद्र सुभाष पवार' },
      role: { mr: 'उपसरपंच ठाणेपाडा' }
    },
    {
      image: gramadhikariImage,
      name: { mr: 'श्री. रणधीर नथू बैसाणे' },
      role: { mr: 'ग्राम विकास अधिकारी' }
    },
    {
      image: sadasya1Image,
      name: { mr: 'श्री. प्रमोद ग्यांतीलाल साबळे' },
      role: { mr: 'ग्रा. पं. सदस्य' }
    },
    {
      image: sadasya2Image,
      name: { mr: 'श्रीम. महारी रतन कांबळे' },
      role: { mr: 'ग्रा. पं. सदस्य ठाणेपाडा' }
    },
    {
      image: sadasya3Image,
      name: { mr: 'श्री. दशरथ गजू गावित' },
      role: { mr: 'ग्रा. पं. सदस्य ठाणेपाडा' }
    },
    {
      image: sadasya4Image,
      name: { mr: 'श्रीम. इवंताबाई दिलीप पवार' },
      role: { mr: 'ग्रा. पं. सदस्या ठाणेपाडा' }
    }
  ];

  const resolvedSarpanch = {
    image: sarpanch?.image || fallbackSarpanch.image,
    name: sarpanch?.name || fallbackSarpanch.name,
    role: sarpanch?.role || fallbackSarpanch.role,
    description: sarpanch?.description || fallbackSarpanch.description,
    village: sarpanch?.village || fallbackSarpanch.village
  };

  const resolvedTeam =
    fallbackTeamMembers.length > 0
      ? fallbackTeamMembers.map((fallbackMember, index) => {
          const member = teamMembers[index];
          return {
            image: member?.image || fallbackMember.image,
            name: member?.name || fallbackMember.name,
            role: member?.role || fallbackMember.role,
            village: member?.village || fallbackMember.village
          };
        })
      : teamMembers;

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
                <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                  <div className="p-2 bg-gradient-to-br from-teal-50 to-blue-50">
                    <div className="bg-white rounded-lg p-4">
                      <div className="mb-6 overflow-hidden rounded-lg shadow-md">
                        <img
                          src={getImageUrl(resolvedSarpanch.image)}
                          alt={resolvedSarpanch?.role?.[language] || resolvedSarpanch?.role?.mr || 'सरपंच'}
                          className="w-full h-[400px] object-cover object-center hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          style={{ imageRendering: 'auto' }}
                        />
                      </div>
                      <div className="text-center space-y-2">
                        <h3 className="text-2xl md:text-3xl font-bold text-blue-800 mb-2">
                          {resolvedSarpanch?.name?.[language] || resolvedSarpanch?.name?.mr || 'संपूर्ण नाव'}
                        </h3>
                        <div className="inline-block px-4 py-1 bg-teal-100 rounded-full mb-2">
                          <p className="text-lg font-semibold text-teal-800">
                            {resolvedSarpanch?.role?.[language] || resolvedSarpanch?.role?.mr || 'सरपंच'}
                          </p>
                        </div>
                        {resolvedSarpanch?.village && (
                          <p className="text-base text-gray-600 font-medium">
                            {resolvedSarpanch.village?.[language] || resolvedSarpanch.village?.mr || ''}
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
                      {resolvedSarpanch?.description?.[language] ||
                        resolvedSarpanch?.description?.mr ||
                        'गावाच्या सर्वांगीण विकासासाठी, शेतकऱ्यांच्या प्रगतीसाठी, महिला बालकांच्या कल्याणासाठी तसेच सामाजिक ऐक्य राखण्यासाठी आमचे सरपंच नेहमीच पुढाकार घेतात. ग्रामस्थांच्या सक्रिय सहभागाने, पंचायत प्रगती आणि एकतेसाठी काम करते.'}
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
                  {resolvedTeam.map((member, idx) => (
                    <div
                      key={`${member?.name?.mr || member?.name?.en || idx}`}
                      className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                    >
                      <div className="overflow-hidden bg-gray-50">
                        <img
                          src={getImageUrl(member.image)}
                          alt={member.role?.[language] || member.role?.mr || 'सदस्य'}
                          className="w-full h-[350px] object-contain md:object-cover object-center hover:scale-110 transition-transform duration-500"
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
