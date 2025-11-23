import gav1Image from '../images/gav1.jpeg';
import gav2Image from '../images/gav2.jpeg';
import gav3Image from '../images/gav3.jpeg';

const projectStatusStyles = {
  'प्रगतीत': {
    badge: 'bg-amber-100 text-amber-800 border border-amber-200',
    text: 'text-amber-700'
  },
  'पूर्ण': {
    badge: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
    text: 'text-emerald-700'
  },
  default: {
    badge: 'bg-gray-100 text-gray-700 border border-gray-200',
    text: 'text-gray-600'
  }
};

const achievementProjects = [
  {
    id: 1,
    name: 'वृक्षरोपण',
    year: '२०२३',
    funds: '₹२,२५,०००',
    status: 'प्रगतीत',
    image: gav1Image
  },
  {
    id: 2,
    name: 'पाणीपुरवठा योजना',
    year: '२०२४',
    funds: '₹३,५०,०००',
    status: 'पूर्ण',
    image: gav3Image
  },
  {
    id: 3,
    name: 'प्राथमिक शाळा बांधकाम',
    year: '२०२२',
    funds: '₹३८,००,०००',
    status: 'पूर्ण',
    image: gav2Image
  }
];

const Awards = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Sub-heading and Line */}
          <div className="mb-4">
            <p className="text-sm text-gray-500 text-center mb-2">माहिती</p>
            <div className="h-px bg-gray-300 w-full"></div>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-teal-800">
           विकास कामे
          </h2>

          {/* Awards Grid (now showing development projects) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {achievementProjects.map((project) => {
              const statusStyle = projectStatusStyles[project.status] || projectStatusStyles.default;

              return (
                <article
                  key={project.id}
                  className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />
                    <span
                      className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide ${statusStyle.badge}`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10m-9 8h8a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v11a2 2 0 002 2z" />
                        </svg>
                        <span className="font-semibold text-gray-800">{project.year}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-2.21 0-4-1.343-4-3s1.79-3 4-3 4 1.343 4 3-1.79 3-4 3zm0 0v13m-4-6h8" />
                        </svg>
                        <span className="font-semibold text-gray-800">{project.funds}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 leading-snug">
                      {project.name}
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      ग्रामपंचायत व स्थानिक नागरिकांच्या संयुक्त प्रयत्नांतून हा प्रकल्प राबवला जात आहे.
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
                      <span className="text-gray-500">प्रकल्प स्थिती</span>
                      <span className={`font-semibold ${statusStyle.text}`}>{project.status}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;

