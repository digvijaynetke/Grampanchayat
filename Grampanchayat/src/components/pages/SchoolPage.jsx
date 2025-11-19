import PageHero from '../PageHero';
import gavImage from '../../images/gav.jpg';
import mandirImage from '../../images/mandir.jpg';

const SchoolPage = () => {
  const schools = [
    {
      id: 1,
      name: 'शाळा 1',
      description: 'या कार्डवरची माहिती लवकरच अद्ययावत केली जाईल..',
      level: 'प्राथमिक आणि माध्यमिक',
      students: '200+',
      location: 'XXXXXXXXX '
    },
    {
      id: 2,
      name: 'शाळा 2',
      description: 'या कार्डवरची माहिती लवकरच अद्ययावत केली जाईल..',
      level: 'माध्यमिक',
      students: '150+',
      location: 'XXXXXXXXX '
    },
    {
      id: 3,
      name: 'शाळा 3',
      description: 'या कार्डवरची माहिती लवकरच अद्ययावत केली जाईल..',
      level: 'प्राथमिक',
      students: '100+',
      location: 'XXXXXXXXX '
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {schools.map((school) => (
              <div
                key={school.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={gavImage}
                  alt={school.name}
                  className="w-full h-[200px] object-cover"
                />
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
        </div>
      </div>
    </section>
    </div>
  );
};

export default SchoolPage;

