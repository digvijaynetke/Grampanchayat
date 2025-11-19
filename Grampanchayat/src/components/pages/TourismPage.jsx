import PageHero from '../PageHero';
import mandirImage from '../../images/mandir.jpg';
import gavImage from '../../images/gav.jpg';

const TourismPage = () => {
  const touristPlaces = [
    {
      id: 1,
      image: mandirImage,
      title: 'पर्यटन स्थळ 1',
      description: 'गावातील एक सुंदर पर्यटन स्थळ जिथे आपण निसर्गाचा आनंद घेऊ शकता आणि शांत वातावरणात विश्रांती घेऊ शकता.',
      location: 'वडाळीभोई'
    },
    {
      id: 2,
      image: gavImage,
      title: 'पर्यटन स्थळ 2',
      description: 'हा एक ऐतिहासिक आणि सांस्कृतिक महत्त्वाचा पर्यटन स्थळ आहे जिथे गावाची समृद्ध परंपरा आणि संस्कृती पाहायला मिळते.',
      location: 'वडाळीभोई'
    },
    {
      id: 3,
      image: mandirImage,
      title: 'पर्यटन स्थळ 3',
      description: 'निसर्गाच्या सान्निध्यात असलेले हे स्थळ पर्यटकांसाठी आकर्षक आहे. येथे आपण शांतता आणि सौंदर्याचा अनुभव घेऊ शकता.',
      location: 'वडाळीभोई'
    }
  ];

  return (
    <div>
      <PageHero 
        title="पर्यटन स्थळ" 
        subtitle="माहिती"
        image={gavImage}
      />
      <section className="py-16 bg-white">
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
            पर्यटन स्थळ
          </h2>

          {/* Tourist Places Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {touristPlaces.map((place) => (
              <div
                key={place.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={place.image}
                    alt={place.title}
                    className="w-full h-[250px] object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-teal-800 mb-3">
                    {place.title}
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {place.description}
                  </p>
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>{place.location}</span>
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

export default TourismPage;

