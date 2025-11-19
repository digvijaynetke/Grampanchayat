import infoImage from '../images/info.jpg';

const NoticeBoard = () => {
  const notices = [
    {
      id: 1,
      image: infoImage,
      title: 'ग्रामपंचायत सूचना फलक 1',
      description: 'या कार्डवरची माहिती लवकरच अद्ययावत केली जाईल.',
      date: '22 Sep 2025',
      category: 'सूचना फलक',
      village: 'वडनेर भैरव'
    },
    {
      id: 2,
      image: infoImage,
      title: 'ग्रामपंचायत सूचना फलक 2',
      description: 'या कार्डवरची माहिती लवकरच अद्ययावत केली जाईल.',
      date: '22 Sep 2025',
      category: 'सूचना फलक',
      village: 'वडनेर भैरव'
    },
    {
      id: 3,
      image: infoImage,
      title: 'ग्रामपंचायत सूचना फलक 3',
      description: 'या कार्डवरची माहिती लवकरच अद्ययावत केली जाईल.',
      date: '22 Sep 2025',
      category: 'सूचना फलक',
      village: 'वडनेर भैरव'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Dotted Line */}
          <div className="flex justify-center mb-4">
            <div className="w-32 border-t-2 border-dotted border-gray-400"></div>
          </div>

          {/* Sub-heading */}
          <p className="text-sm text-gray-500 text-center mb-2">माहिती</p>

          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-teal-800">
            सूचना फलक
          </h2>

          {/* Notice Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {notices.map((notice) => (
              <div 
                key={notice.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image Container */}
                <div className="relative">
                  <img 
                    src={notice.image} 
                    alt={notice.title} 
                    className="w-full h-[250px] object-cover"
                  />
                  {/* Avatar Icon Overlapping Bottom-Left */}
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                {/* Metadata Bar */}
                <div className="px-4 pt-4 pb-2 space-y-2">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      <span>{notice.village}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span>{notice.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                      <span>{notice.category}</span>
                    </div>
                  </div>
                </div>

                {/* Notice Title */}
                <div className="px-4 pb-3">
                  <h3 className="text-xl md:text-2xl font-bold text-teal-800 mb-3">
                    {notice.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="px-4 pb-6">
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    {notice.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoticeBoard;

