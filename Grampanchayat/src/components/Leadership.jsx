import React from 'react';
import { useHomeData } from '../hooks/useHomeData';
import gavImage from '../images/back.jpg';
import infoImage from '../images/back.jpg';
import sarpanchImage from '../images/sarpanch.jpeg';
import upSarpanchImage from '../images/upsarpanch.jpeg';
import gramSevakImage from '../images/gramsevak.jpeg';
import sadhasya1Image from '../images/sadhasya1.jpeg';
import sadhasya2Image from '../images/sadhasya2.jpeg';
import sadhasya3Image from '../images/sadhasya3.jpeg';
import sadhasya4Image from '../images/sadhasya4.jpeg';
import sadhasya5Image from '../images/sadhasya5.jpeg';
import sadhasya6Image from '../images/sadhasya6.jpeg';
import sadhasya7Image from '../images/sadhasya7.jpeg';
import computerOperatorImage from '../images/compguy.jpeg';
import shipaiImage from '../images/shipai.png';
import waterSupplyImage from '../images/paniguy.png';
import kakaImage from '../images/back.jpg';

const fallbackSarpanch = {
  name: 'निलेश अशोक आहेर',
  role: 'सरपंच',
  description:
    'ग्रामस्थांच्या सर्वांगीण विकासासाठी, शेतीसंबंधित प्रगतीसाठी, महिला स्वावलंबनासाठी आणि युवकांच्या शिक्षण व रोजगारासाठी ग्रामपंचायत सतत कार्यरत आहे. पारदर्शक शासन, सामायिक दृष्टिकोन आणि सहकार्याने आमचा गाव आदर्श गाव होण्याच्या दिशेने वाटचाल करीत आहे.',
  image: sarpanchImage,
};

const leadershipTeamFallback = [
  {
    id: 'up-sarpanch',
    image: upSarpanchImage,
    name: 'शालिनी समाधान गांगुर्डे',
    role: 'उपसरपंच',
  },
  {
    id: 'gram-sevak',
    image: gramSevakImage,
    name: 'श्रीमती कविता रघुनाथ कदम',
    role: 'ग्रामपंचायत अधिकारी',
  },
];

const membersFallback = [
  {
    id: 'member-1',
    image: sadhasya1Image,
    name: 'महेश किसनराव कोठुळे',
    role: 'सदस्य',
  },
  {
    id: 'member-2',
    image: sadhasya2Image,
    name: 'सौ. सविता अनिल पाटील',
    role: 'सदस्य',
  },
  {
    id: 'member-3',
    image: sadhasya3Image,
    name: 'सौ. सुजाता संतोष गांगुर्डे',
    role: 'सदस्य',
  },
  {
    id: 'member-4',
    image: sadhasya4Image,
    name: 'सौ. गंगुबाई चिंधू पवार',
    role: 'सदस्य',
  },
  {
    id: 'member-5',
    image: sadhasya5Image,
    name: 'उल्हास माधव गांगुर्डे',
    role: 'सदस्य',
  },
  {
    id: 'member-6',
    image: sadhasya6Image,
    name: 'दामू चंदर पवार',
    role: 'सदस्य',
  },
  {
    id: 'member-7',
    image: sadhasya7Image,
    name: 'मीनाबाई गुलाबराव गायकवाड',
    role: 'सदस्य',
  },
];

const supportStaffFallback = [
  {
    id: 'computer-operator',
    image: computerOperatorImage,
    name: 'शुभम संजय पवार',
    role: 'संगणक परिचालक',
  },
  {
    id: 'shipai',
    image: shipaiImage,
    name: 'संतोष शिवाजी गांगुर्डे',
    role: 'शिपाई',
  },
  {
    id: 'water-supply',
    image: waterSupplyImage,
    name: 'माधव श्रावण निमकर',
    role: 'पाणी पुरठा कर्मचारी',
  },
];

const PersonCard = ({ image, name, role, variant = 'default' }) => {
  const sizeClasses = variant === 'compact' ? 'w-28 h-28 md:w-32 md:h-32' : 'w-40 h-40 md:w-44 md:h-44';
  const titleClasses = variant === 'compact' ? 'text-lg md:text-xl' : 'text-xl md:text-2xl';

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-teal-50 p-6 flex flex-col items-center text-center space-y-3 hover:-translate-y-1.5 transition-transform duration-300">
      <div className={`${sizeClasses} rounded-3xl overflow-hidden border-4 border-teal-500/30 shadow-lg`}>
        <img src={image} alt={name} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <h4 className={`${titleClasses} font-bold text-gray-900`}>{name}</h4>
      <p className="text-teal-700 font-semibold">{role}</p>
    </div>
  );
};

const Leadership = () => {
  const { data, loading } = useHomeData();
  const language = 'mr';

  const getApiBaseUrl = () => {
    if (
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ) {
      return import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
    }
    return 'https://grampanchayat-website-project-code.onrender.com/api';
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return kakaImage;
    if (typeof imageUrl !== 'string') return imageUrl;
    if (imageUrl.startsWith('http')) return imageUrl;

    const baseUrl = getApiBaseUrl();
    if (imageUrl.startsWith('/api')) {
      const baseWithoutApi = baseUrl.replace(/\/api$/, '');
      return `${baseWithoutApi}${imageUrl}`;
    }
    return `${baseUrl}${imageUrl}`;
  };

  const getLocalizedText = (value, fallbackValue = '') => {
    if (!value && fallbackValue) return fallbackValue;
    if (typeof value === 'string') return value;
    if (value && typeof value === 'object') {
      return value[language] || value.mr || value.en || Object.values(value)[0] || fallbackValue;
    }
    return fallbackValue;
  };

  const formatMember = (member, defaultRole = 'सदस्य') => {
    const name = getLocalizedText(member?.name, 'संपूर्ण नाव');
    const role = getLocalizedText(member?.role, defaultRole);
    const rawId = member?.id || member?._id || `${defaultRole}-${name}`;

    return {
      id:
        typeof rawId === 'string'
          ? rawId
          : `${defaultRole}-${name}`.replace(/\s+/g, '-').toLowerCase(),
      name,
      role,
      image: getImageUrl(member?.image),
    };
  };

  const leadershipData = data?.leadership || {};
  const sarpanch = leadershipData?.sarpanch;
  const teamMembers = leadershipData?.teamMembers || [];
  const backendMembers = leadershipData?.members || [];
  const backendSupportStaff = leadershipData?.supportStaff || [];

  const resolvedSarpanch = sarpanch
    ? {
        name: getLocalizedText(sarpanch?.name, fallbackSarpanch.name),
        role: getLocalizedText(sarpanch?.role, fallbackSarpanch.role),
        description: getLocalizedText(sarpanch?.description, fallbackSarpanch.description),
        image: getImageUrl(sarpanch?.image),
      }
    : fallbackSarpanch;

  const leadershipTeamData = teamMembers.length
    ? teamMembers.map((member) => formatMember(member))
    : leadershipTeamFallback;

  const membersData = backendMembers.length
    ? backendMembers.map((member) => formatMember(member, 'सदस्य'))
    : membersFallback;

  const supportStaffData = backendSupportStaff.length
    ? backendSupportStaff.map((member) => formatMember(member, 'सहाय्यक कर्मचारी'))
    : supportStaffFallback;

  return (
    <section className="relative bg-gradient-to-br from-teal-700 via-emerald-600 to-teal-500 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <img src={gavImage} alt="गाव" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 py-24">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide drop-shadow-lg">
          पिंपळणारे ग्रामपंचायत
        </h1>
        <p className="mt-4 max-w-2xl text-base md:text-lg text-teal-100">
          समर्पित नेतृत्व, प्रामाणिक प्रशासन आणि विकासाच्या दृष्टीकोनातून गावाचा सर्वांगीण विकास.
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-16 md:h-24"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 100C120 80 240 40 360 30C480 20 600 40 720 50C840 60 960 60 1080 50C1200 40 1320 20 1380 10L1440 0V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#F9FAFB"
          />
        </svg>
      </div>

      <div className="relative z-30 -mt-24 pb-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="bg-white rounded-3xl shadow-2xl border border-teal-100 p-10 text-center text-gray-700">
              माहिती लोड होत आहे...
            </div>
          ) : (
            <>
              <div className="grid gap-8 lg:grid-cols-[320px,1fr] xl:grid-cols-[360px,1fr]">
                <div className="bg-white rounded-3xl shadow-2xl border border-teal-200 p-8 flex flex-col items-center text-center">
                  <div className="w-44 h-44 mb-6 rounded-3xl overflow-hidden border-4 border-teal-500 shadow-xl">
                    <img
                      src={resolvedSarpanch.image}
                      alt={resolvedSarpanch.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-500 mb-2">
                    Sarpanch
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{resolvedSarpanch.name}</h2>
                  <p className="text-lg font-semibold text-teal-700">{resolvedSarpanch.role}</p>
                </div>

                <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-white/20 bg-gradient-to-br from-teal-700 via-teal-600 to-teal-500 text-white">
                  <img
                    src={infoImage}
                    alt="ग्रामपंचायत माहिती"
                    className="absolute inset-0 w-full h-full object-cover opacity-20"
                  />
                  <div className="relative p-8 md:p-12">
                    <span className="text-sm uppercase tracking-[0.3em] text-emerald-200">वेगळेपण</span>
                    <h3 className="mt-4 text-3xl md:text-4xl font-bold leading-tight">
                      आमचे आदरणीय सरपंचांचे नेतृत्व समर्पण, प्रामाणिकपणा आणि विकासाच्या दृष्टिकोनाने करत आहे.
                    </h3>
                    <p className="mt-6 text-base md:text-lg text-emerald-50 leading-relaxed">
                      {resolvedSarpanch.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-16 space-y-16">
                <div>
                  <div className="text-center mb-10">
                    <p className="text-sm font-semibold text-teal-500 uppercase tracking-[0.3em]">Leadership Team</p>
                    <h3 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">प्रशासनिक नेतृत्व</h3>
                  </div>
                  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {leadershipTeamData.map((person) => (
                      <PersonCard key={person.id} image={person.image} name={person.name} role={person.role} />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-center mb-10">
                    <p className="text-sm font-semibold text-emerald-500 uppercase tracking-[0.3em]">सदस्य मंडळ</p>
                    <h3 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">ग्रामपंचायत सदस्य</h3>
                    <p className="mt-2 text-gray-600">सर्व सदस्य गावाच्या प्रगतीसाठी कटिबद्ध आहेत.</p>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {membersData.map((member) => (
                      <PersonCard
                        key={member.id}
                        image={member.image}
                        name={member.name}
                        role={member.role}
                        variant="compact"
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-center mb-10">
                    <p className="text-sm font-semibold text-cyan-500 uppercase tracking-[0.3em]">Support Staff</p>
                    <h3 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">सहाय्यक कर्मचारी</h3>
                    <p className="mt-2 text-gray-600">दैनंदिन प्रशासन सुरळीत ठेवण्यासाठी सतत कार्यरत.</p>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {supportStaffData.map((staff) => (
                      <PersonCard
                        key={staff.id}
                        image={staff.image}
                        name={staff.name}
                        role={staff.role}
                        variant="compact"
                      />
                    ))}
                  </div>
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
