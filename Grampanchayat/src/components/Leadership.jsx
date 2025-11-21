import { useHomeData } from '../hooks/useHomeData';
import kakaImage from '../images/kaka.jpg'; // Fallback image
import sarpanchImage from '../images/sarpanch.jpeg';
import gavImage from '../images/upsarpanch.jpeg';
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
  // Safe helper to resolve image sources.
  // - If `imageUrl` is falsy, returns the `fallback` image (defaults to `kakaImage`).
  // - If it looks like an absolute URL (http:// or https://) or a data URL, return as-is.
  // - If it starts with a single slash ("/"), treat it as an absolute path already usable by the browser.
  // - If it starts with "/api", append it to the API host (for backend-served files).
  // - If it's an imported asset (string path or module with .default), return it.
  const getImageUrl = (imageUrl, fallback = kakaImage) => {
    if (!imageUrl) return fallback;

    // If the import produced an object (some bundlers), use .default
    if (typeof imageUrl === 'object' && imageUrl?.default) return imageUrl.default;

    // If it's not a string (unexpected), fallback
    if (typeof imageUrl !== 'string') return fallback;

    // Absolute URLs and data URLs
    if (/^https?:\/\//i.test(imageUrl) || /^data:/i.test(imageUrl)) return imageUrl;

    // If it's an absolute path (starts with /) we assume it's usable in the browser
    if (imageUrl.startsWith('/')) {
      // Backend paths may start with /api - construct a full URL for those.
      if (imageUrl.startsWith('/api')) {
        const baseUrl = getApiBaseUrl();
        const baseWithoutApi = baseUrl.replace(/\/api$/, '');
        return `${baseWithoutApi}${imageUrl}`;
      }
      return imageUrl;
    }

    // If it's a relative backend path (unlikely), try the API base
    const baseUrl = getApiBaseUrl();
    return `${baseUrl}/${imageUrl}`;
  };

  // Get leadership data from API
  const leadershipData = data?.leadership;
  const sarpanch = leadershipData?.sarpanch;
  const teamMembers = leadershipData?.teamMembers || [];

  // Default / fallback entries when backend doesn't provide team members
  const defaultUpsarpanch = {
    id: 'upsarpanch-default',
    image: gavImage,
    name: { mr: 'सौ.मोहिनी मनोज शिंदे' },
    role: { mr: 'उपसरपंच' },
    village: { mr: 'राजदेरवाडी' },
  };

  // If teamMembers is empty, show a sensible default set (upsarpanch + placeholders)
  const displayedTeamMembers = teamMembers.length > 0 ? teamMembers : [
    defaultUpsarpanch,
    { id: 'placeholder-2', image: kakaImage, name: { mr: 'संपूर्ण नाव' }, role: { mr: 'ग्राम सचिव' } },
    { id: 'placeholder-3', image: kakaImage, name: { mr: 'संपूर्ण नाव' }, role: { mr: 'सदस्य' } },
  ];

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
                            // Prefer backend image but fall back to local import if backend value missing
                            src={getImageUrl(sarpanch?.image, sarpanchImage)} 
                            alt={sarpanch?.role?.[language] || sarpanch?.role?.mr || 'सरपंच'} 
                            className="w-full h-[400px] object-cover object-center hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                            style={{ imageRendering: 'auto' }}
                          />
                      </div>
                      <div className="text-center space-y-2">
                        <h3 className="text-2xl md:text-3xl font-bold text-blue-800 mb-2">
                          {sarpanch?.name?.[language] || sarpanch?.name?.mr || 'सिद्धार्थ वाळूबा यशवंते'}
                        </h3>
                        <div className="inline-block px-4 py-1 bg-teal-100 rounded-full mb-2">
                          <p className="text-lg font-semibold text-teal-800">
                            {sarpanch?.role?.[language] || sarpanch?.role?.mr || 'सरपंच'}
                          </p>
                        </div>
                        {sarpanch?.village && (
                          <p className="text-base text-gray-600 font-medium">
                            {sarpanch.village?.[language] || sarpanch.village?.mr || ''}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Leadership Description Block */}
                <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-teal-600 bg-gradient-to-br from-teal-700 via-cyan-700 to-slate-900 p-8 md:p-10 flex items-center">
                  <div className="absolute inset-0 opacity-40 pointer-events-none">
                    <div className="absolute -top-16 -right-8 w-48 h-48 bg-teal-400 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-12 -left-10 w-56 h-56 bg-cyan-500 rounded-full blur-3xl"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_55%)]"></div>
                  </div>
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-12 bg-white/90 rounded-full"></div>
                      <div>
                        <p className="uppercase tracking-[0.3em] text-teal-100 text-xs md:text-sm">vision</p>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-white">आमचे नेतृत्व</h3>
                      </div>
                    </div>
                    <p className="text-white/90 text-lg md:text-xl leading-relaxed text-left">
                      {sarpanch?.description?.[language] || sarpanch?.description?.mr || 'गावाच्या सर्वांगीण विकासासाठी, शेतकऱ्यांच्या प्रगतीसाठी, महिला बालकांच्या कल्याणासाठी तसेच सामाजिक ऐक्य राखण्यासाठी आमचे सरपंच नेहमीच पुढाकार घेतात. ग्रामस्थांच्या सक्रिय सहभागाने, पंचायत प्रगती आणि एकतेसाठी काम करते.'}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white/80 text-sm">
                      <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 backdrop-blur-sm">
                        <span className="w-2 h-2 bg-emerald-300 rounded-full"></span>
                        <p className="font-medium">पारदर्शक प्रशासन</p>
                      </div>
                      <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 backdrop-blur-sm">
                        <span className="w-2 h-2 bg-cyan-300 rounded-full"></span>
                        <p className="font-medium">ग्रामस्थांचा सहभाग</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-2 text-white/70 text-sm uppercase tracking-widest">
                      <div className="w-8 h-0.5 bg-white/60"></div>
                      <span>development</span>
                      <div className="w-16 h-0.5 bg-white/60"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Members Section - Three Cards */}
              <div className="mt-24 md:mt-32">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {displayedTeamMembers.length > 0 ? (
                    displayedTeamMembers.map((member) => (
                      <div 
                        key={member.id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                      >
                        <div className="overflow-hidden">
                          <img 
                            src={getImageUrl(member.image, kakaImage)} 
                            alt={member.role?.[language] || member.role?.mr || 'सदस्य'} 
                            className="w-full h-[350px] object-cover object-center hover:scale-110 transition-transform duration-500"
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
                  ) : null}
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
