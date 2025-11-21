import { useHomeData } from '../hooks/useHomeData';
import sarpanchImage from '../images/sarpanch.jpg';
import upsarpanchImage from '../images/upsarpanch.jpg';
import sadasya1Image from '../images/sadasya1.jpg';
import sadasya2Image from '../images/sadasya2.jpg';
import sadasya3Image from '../images/sadasya3.jpg';
import dummyImage from '../images/dummy.jpg';
import sadasya4Image from '../images/sadasya4.jpg';
import sadasya5Image from '../images/sadasya5.jpg';
import sadasya6Image from '../images/sadasya6.jpg';
import sadasya7Image from '../images/sadasya7.jpg';
import sadasya8Image from '../images/sadasya8.jpg';
import sadasya9Image from '../images/sadasya9.jpg';
import sadasya10Image from '../images/sadasya10.jpg';
import sadasya11Image from '../images/sadasya11.jpg';
import sadasya12Image from '../images/sadasya12.jpg';
import sadasya13Image from '../images/sadasya13.jpg';
import sadasya14Image from '../images/sadasya14.jpg';
import gramsevakImage from '../images/gramsevak.jpg';

const defaultLeadershipDescription =
  'गावाच्या सर्वांगीण विकासासाठी, शेतकऱ्यांच्या प्रगतीसाठी, महिला बालकांच्या कल्याणासाठी तसेच सामाजिक ऐक्य राखण्यासाठी आमचे सरपंच नेहमीच पुढाकार घेतात. ग्रामस्थांच्या सक्रिय सहभागाने, पंचायत प्रगती आणि एकतेसाठी काम करते.';

const defaultSarpanchProfile = {
  name: { mr: 'श्री. रावसाहेब फकीरराव भालेराव' },
  role: { mr: 'सरपंच' },
  phone: '9011824633 / 9423073433',
  description: { mr: defaultLeadershipDescription },
  imageLocal: sarpanchImage,
};

const fallbackExecutiveMembers = [
  {
    id: 'executive-upsarpanch',
    group: 'executive',
    name: { mr: 'सौ. मंगला पंडितराव देवरे' },
    role: { mr: 'उपसरपंच' },
    phone: '8830583463',
    imageLocal: upsarpanchImage,
  },
  {
    id: 'executive-gramsevak',
    group: 'executive',
    name: { mr: 'श्री. योगेश सुकलाल माळी' },
    role: { mr: 'ग्रामपंचायत अधिकारी' },
    phone: '9673796550',
    imageLocal: gramsevakImage,
  },
];

const fallbackCouncilMembers = [
  {
    id: 'member-1',
    group: 'council',
    name: { mr: 'श्री.अरुण रामभाऊ पवार' },
    role: { mr: 'सदस्य' },
    phone: '8888129180 / 9404185180',
    imageLocal: sadasya1Image,
  },
  {
    id: 'member-2',
    group: 'council',
    name: { mr: 'सौ.प्रतिभा प्रकाश खिराडकर' },
    role: { mr: 'सदस्य' },
    phone: '8626059476',
    imageLocal: sadasya2Image,
  },
  {
    id: 'member-3',
    group: 'council',
    name: { mr: 'सौ. अश्विनी चेतन डंबाळे' },
    role: { mr: 'सदस्य' },
    phone: '7767035371',
    imageLocal: sadasya3Image,
  },
  {
    id: 'member-4',
    group: 'council',
    name: { mr: 'श्री. सुनील दत्तात्रय पाचोरकर' },
    role: { mr: 'सदस्य' },
    phone: '9422248947 / 9011049911',
    imageLocal: dummyImage,
  },
  {
    id: 'member-5',
    group: 'council',
    name: { mr: 'श्री. विजय विठ्ठल शिरसाठ' },
    role: { mr: 'सदस्य' },
    phone: '9822261751',
    imageLocal: sadasya4Image,
  },
  {
    id: 'member-6',
    group: 'council',
    name: { mr: 'सौ. माधुरी शेखर जाधव' },
    role: { mr: 'सदस्य' },
    phone: '9425112571',
    imageLocal: sadasya5Image,
  },
  {
    id: 'member-7',
    group: 'council',
    name: { mr: 'श्री. संजय पुंजाराम पवार' },
    role: { mr: 'सदस्य' },
    phone: '9373484259',
    imageLocal: sadasya6Image,
  },
  {
    id: 'member-8',
    group: 'council',
    name: { mr: 'श्री. योगेश अशोकराव साळुंके' },
    role: { mr: 'सदस्य' },
    phone: '8605642777 / 9130343177',
    imageLocal: sadasya7Image,
  },
  {
    id: 'member-9',
    group: 'council',
    name: { mr: 'सौ. संगिता संजय सागर' },
    role: { mr: 'सदस्य' },
    phone: '9881372521',
    imageLocal: sadasya8Image,
  },
  {
    id: 'member-10',
    group: 'council',
    name: { mr: 'सौ.रत्ना बाळासाहेब माळी' },
    role: { mr: 'सदस्य' },
    phone: '9923583049',
    imageLocal: sadasya9Image,
  },
  {
    id: 'member-11',
    group: 'council',
    name: { mr: 'श्री. सुरेश संपतराव वक्टे' },
    role: { mr: 'सदस्य' },
    phone: '7741056099',
    imageLocal: sadasya10Image,
  },
  {
    id: 'member-12',
    group: 'council',
    name: { mr: 'सौ. सुनिता पंडितराव सलादे' },
    role: { mr: 'सदस्य' },
    phone: '8788604246',
    imageLocal: sadasya11Image,
  },
  {
    id: 'member-13',
    group: 'council',
    name: { mr: 'श्री. अमोल बाळासाहेब माळी' },
    role: { mr: 'सदस्य' },
    phone: '9763326715',
    imageLocal: sadasya12Image,
  },
  {
    id: 'member-14',
    group: 'council',
    name: { mr: 'श्रीमती. मंजुळाबाई भास्कर निमकर' },
    role: { mr: 'सदस्य' },
    phone: '9067314090',
    imageLocal: sadasya13Image,
  },
  {
    id: 'member-15',
    group: 'council',
    name: { mr: 'सौ. भागुबाई साहेबराव बिन्नर' },
    role: { mr: 'सदस्य' },
    phone: '7038114953',
    imageLocal: sadasya14Image,
  },
];

const fallbackTeamMembers = [...fallbackExecutiveMembers, ...fallbackCouncilMembers];

const leadershipHighlights = [
  'ग्राम विकासासाठी पारदर्शक व उत्तरदायी प्रशासन',
  'महिला व शेतकरी सक्षमीकरणासाठी सातत्यपूर्ण उपक्रम',
  'डिजिटल ग्रामसेवा व नागरिकांच्या तक्रारींवर त्वरित प्रतिसाद',
];

const splitPhones = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value
    .split('/')
    .map((phone) => phone.trim())
    .filter(Boolean);
};

const sanitizePhone = (phone) => phone.replace(/[^0-9+]/g, '');

const getLocalizedText = (value, language, fallback = '') => {
  if (!value) return fallback;
  if (typeof value === 'string') return value;
  return value[language] || value.mr || value.en || fallback;
};

const mergeTeamMembers = (fallbackList, apiList = []) => {
  if (!apiList?.length) return fallbackList;

  const normalizedApi = apiList.map((member, index) => ({
    ...member,
    id: member?.id || member?._id || `api-member-${index}`,
  }));

  const merged = fallbackList.map((fallback, index) => ({
    ...fallback,
    ...(normalizedApi[index] || {}),
    group: fallback.group || normalizedApi[index]?.group || 'council',
    imageLocal: fallback.imageLocal,
  }));

  if (normalizedApi.length > fallbackList.length) {
    return merged.concat(
      normalizedApi.slice(fallbackList.length).map((member, index) => ({
        ...member,
        id: member?.id || member?._id || `extra-member-${index}`,
        group: member.group || 'council',
      }))
    );
  }

  return merged;
};

const Leadership = () => {
  const { data, loading } = useHomeData();
  const language = 'mr';

  const getApiBaseUrl = () => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
    }
    return 'https://grampanchayat-website-project-code.onrender.com/api';
  };

  const getImageUrl = (imageUrl, fallback = dummyImage) => {
    if (!imageUrl) return fallback;

    if (typeof imageUrl === 'object' && imageUrl.src) {
      return imageUrl.src;
    }

    if (typeof imageUrl !== 'string') return fallback;

    const cleaned = imageUrl.trim();
    if (!cleaned) return fallback;

    if (
      cleaned.startsWith('http') ||
      cleaned.startsWith('data:') ||
      cleaned.startsWith('blob:') ||
      cleaned.startsWith('/assets/') ||
      cleaned.startsWith('/src/')
    ) {
      return cleaned;
    }

    const baseUrl = getApiBaseUrl();
    if (cleaned.startsWith('/api')) {
      const baseWithoutApi = baseUrl.replace(/\/api$/, '');
      return `${baseWithoutApi}${cleaned}`;
    }

    return `${baseUrl}${cleaned.startsWith('/') ? cleaned : `/${cleaned}`}`;
  };

  const leadershipData = data?.leadership || {};
  const sarpanchFromApi = leadershipData?.sarpanch;
  const teamMembersFromApi = leadershipData?.teamMembers || [];

  const sarpanchProfile = sarpanchFromApi
    ? {
        ...defaultSarpanchProfile,
        ...sarpanchFromApi,
        imageLocal: defaultSarpanchProfile.imageLocal,
        description: sarpanchFromApi.description || defaultSarpanchProfile.description,
      }
    : defaultSarpanchProfile;

  const mergedTeamMembers = mergeTeamMembers(fallbackTeamMembers, teamMembersFromApi);
  const executiveMembers = mergedTeamMembers.filter((member) => member.group === 'executive');
  const councilMembers = mergedTeamMembers.filter((member) => member.group !== 'executive');

  const displayExecutives = executiveMembers.length ? executiveMembers : mergedTeamMembers.slice(0, 2);
  const displayCouncilMembers = executiveMembers.length ? councilMembers : mergedTeamMembers.slice(2);

  const sarpanchImageSrc = getImageUrl(sarpanchProfile.image, sarpanchProfile.imageLocal);

  const renderPhoneBadges = (phoneValue, alignment = 'center') => {
    const phones = splitPhones(phoneValue);
    if (!phones.length) return null;

    const alignmentClass =
      alignment === 'start' ? 'justify-start' : alignment === 'end' ? 'justify-end' : 'justify-center';

    return (
      <div className={`flex flex-wrap gap-2 ${alignmentClass}`}>
        {phones.map((number, index) => (
          <a
            key={`${number}-${index}`}
            href={`tel:${sanitizePhone(number)}`}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-sm font-semibold border border-teal-100 hover:bg-teal-100 transition"
          >
            <span aria-hidden="true">📞</span>
            <span>{number}</span>
          </a>
        ))}
      </div>
    );
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-teal-50/30 to-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-10 right-10 w-72 h-72 bg-teal-200 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100 blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-teal-100 text-teal-800 text-sm font-semibold">
            <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
            ग्राम नेतृत्व समिती
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-4 tracking-tight">
            नेतृत्व
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mt-4 leading-relaxed">
            आमचे आदरणीय सरपंच व ग्रामपंचायत सदस्य गावाच्या प्रगतीसाठी दूरदृष्टी, पारदर्शकता आणि नवनवीन संकल्पनांद्वारे कार्यरत आहेत.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">लोड होत आहे...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-[0_20px_50px_rgba(15,118,110,0.12)] border border-teal-50 overflow-hidden">
                <div className="relative group">
                  <img
                    src={sarpanchImageSrc}
                    alt={getLocalizedText(sarpanchProfile.role, language, 'सरपंच')}
                    className="w-full h-[420px] object-contain object-center bg-gray-100 transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute top-6 left-6">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 text-teal-700 text-xs font-bold uppercase tracking-widest">
                      मुख्य नेतृत्व
                    </span>
                  </div>
                </div>
                <div className="p-8 space-y-4 text-center">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-teal-600">गावाचा आधारस्तंभ</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-3">
                      {getLocalizedText(sarpanchProfile.name, language, 'संपूर्ण नाव')}
                    </h3>
                    <p className="text-lg font-semibold text-teal-700 mt-1">
                      {getLocalizedText(sarpanchProfile.role, language, 'सरपंच')}
                    </p>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {getLocalizedText(sarpanchProfile.description, language, defaultLeadershipDescription)}
                  </p>
                  {renderPhoneBadges(sarpanchProfile.phone)}
                </div>
              </div>

              <div className="relative rounded-3xl bg-gradient-to-br from-teal-800 via-teal-700 to-cyan-600 text-white shadow-2xl overflow-hidden">
                <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 -left-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                <div className="relative p-10 space-y-6">
                  <h3 className="text-3xl font-bold tracking-tight">आमचे नेतृत्व</h3>
                  <p className="text-white/90 text-lg leading-relaxed">
                    {getLocalizedText(sarpanchProfile.description, language, defaultLeadershipDescription)}
                  </p>
                  <ul className="space-y-4 text-white/90">
                    {leadershipHighlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-3">
                        <span className="mt-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/20 text-sm">
                          ✔️
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-white/20 text-sm text-white/80">
                    ग्रामपंचायत वडनेर भैरव | सतत संपर्क, सतत विकास
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20 space-y-12">
              <div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">मुख्य कार्यकारी टीम</h3>
                    <p className="text-gray-500">उपसरपंच व ग्रामपंचायत अधिकारी</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-teal-700 font-semibold">
                    <span className="inline-flex w-2 h-2 rounded-full bg-teal-500"></span>
                    नागरिकांसाठी प्राथमिक संपर्क
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {displayExecutives.map((member) => (
                    <div
                      key={member.id || member.name?.mr || member.name?.en}
                      className="group bg-white/90 border border-teal-50 rounded-2xl shadow-lg overflow-hidden hover:-translate-y-1 transition"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={getImageUrl(member.image, member.imageLocal || dummyImage)}
                          alt={getLocalizedText(member.role, language, 'सदस्य')}
                          className="w-full h-[320px] object-contain object-center bg-gray-50 transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 text-teal-700 text-xs font-semibold">
                          {getLocalizedText(member.role, language, 'सदस्य')}
                        </div>
                      </div>
                      <div className="p-6 space-y-3">
                        <h4 className="text-xl font-bold text-gray-900">
                          {getLocalizedText(member.name, language, 'संपूर्ण नाव')}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          ग्रामपंचायत प्रशासनातील महत्वाची भूमिका सांभाळत गावाच्या विकासाचा मार्ग आखतात.
                        </p>
                        {renderPhoneBadges(member.phone, 'start')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">ग्रामपंचायत सदस्य</h3>
                    <p className="text-gray-500">
                      गावाच्या प्रत्येक भागाचे प्रतिनिधित्व करणारे {displayCouncilMembers.length} सदस्य
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                    सामाजिक बंध वाढविणारे लोकप्रतिनिधी
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayCouncilMembers.map((member) => (
                    <div
                      key={member.id || member.name?.mr || member.name?.en}
                      className="group bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={getImageUrl(member.image, member.imageLocal || dummyImage)}
                          alt={getLocalizedText(member.role, language, 'सदस्य')}
                          className="w-full h-[280px] object-contain object-center bg-gray-50 transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                      </div>
                      <div className="p-5 space-y-2">
                        <h4 className="text-lg font-bold text-gray-900">
                          {getLocalizedText(member.name, language, 'संपूर्ण नाव')}
                        </h4>
                        <p className="inline-flex px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold">
                          {getLocalizedText(member.role, language, 'सदस्य')}
                        </p>
                        {renderPhoneBadges(member.phone, 'start')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Leadership;
