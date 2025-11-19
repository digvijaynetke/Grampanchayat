import PageHero from '../PageHero';
import gavImage from '../../images/gav.jpg';
import mandirImage from '../../images/mandir.jpg';

const SchemesPage = () => {
  const schemes = [
    {
      id: 1,
      title: 'लोकप्रिय योजना 1',
      description: 'शेतकऱ्यांसाठी विशेष योजना ज्यामुळे त्यांना आर्थिक मदत मिळते आणि शेती सुधारते.',
      benefits: ['आर्थिक मदत', 'शेती सुविधा', 'बीज वितरण'],
      eligibility: 'सर्व शेतकरी'
    },
    {
      id: 2,
      title: 'लोकप्रिय योजना 2',
      description: 'महिलांसाठी विशेष योजना ज्यामुळे त्यांना आर्थिक सक्षमीकरण मिळते.',
      benefits: ['कर्ज सुविधा', 'प्रशिक्षण', 'रोजगार संधी'],
      eligibility: 'महिला सदस्य'
    },
    {
      id: 3,
      title: 'लोकप्रिय योजना 3',
      description: 'युवकांसाठी विशेष योजना ज्यामुळे त्यांना रोजगार आणि उद्योजकता संधी मिळतात.',
      benefits: ['रोजगार', 'उद्योजकता', 'प्रशिक्षण'],
      eligibility: 'युवक'
    },
    {
      id: 4,
      title: 'लोकप्रिय योजना 4',
      description: 'आरोग्य संबंधित योजना ज्यामुळे गावातील लोकांना आरोग्य सेवा मिळतात.',
      benefits: ['आरोग्य सेवा', 'वैद्यकीय सुविधा', 'टीकाकरण'],
      eligibility: 'सर्व नागरिक'
    }
  ];

  return (
    <div>
      <PageHero 
        title="लोकप्रिय योजना" 
        subtitle="माहिती"
        image={mandirImage}
      />
      <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-teal-800">
            लोकप्रिय योजना
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {schemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={gavImage}
                  alt={scheme.title}
                  className="w-full h-[200px] object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-teal-800 mb-3">
                    {scheme.title}
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {scheme.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">लाभ:</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {scheme.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-sm">
                    <span className="font-semibold text-gray-800">पात्रता:</span>
                    <span className="text-gray-600 ml-2">{scheme.eligibility}</span>
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

export default SchemesPage;

