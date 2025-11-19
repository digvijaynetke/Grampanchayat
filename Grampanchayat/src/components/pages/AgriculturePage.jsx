import PageHero from '../PageHero';
import gavImage from '../../images/gav.jpg';

const AgriculturePage = () => {
  const agricultureInfo = [
    {
      id: 1,
      title: 'शेतीची माहिती',
      description: 'गावातील शेती ही मुख्य व्यवसाय आहे. येथे विविध प्रकारची पिके घेतली जातात आणि शेतकऱ्यांना सरकारी योजनांचा लाभ मिळतो.',
      crops: ['गहू', 'तांदूळ', 'कापूस', 'सोयाबीन'],
      area: '500+ हेक्टर'
    },
    {
      id: 2,
      title: 'शेती सुविधा',
      description: 'गावात शेतीसाठी आवश्यक सर्व सुविधा उपलब्ध आहेत ज्यामुळे शेतकऱ्यांना उत्तम उत्पादन मिळते.',
      facilities: ['सिंचन सुविधा', 'शेती यंत्रे', 'बीज वितरण', 'खत सुविधा'],
      area: 'सर्व गाव'
    }
  ];

  return (
    <div>
      <PageHero 
        title="शेती" 
        subtitle="माहिती"
        image={gavImage}
      />
      <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-teal-800">
            शेती
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {agricultureInfo.map((info) => (
              <div
                key={info.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={gavImage}
                  alt={info.title}
                  className="w-full h-[250px] object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-teal-800 mb-3">
                    {info.title}
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {info.description}
                  </p>
                  
                  {info.crops && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">मुख्य पिके:</h4>
                      <div className="flex flex-wrap gap-2">
                        {info.crops.map((crop, index) => (
                          <span key={index} className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
                            {crop}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {info.facilities && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">सुविधा:</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {info.facilities.map((facility, index) => (
                          <li key={index}>{facility}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">क्षेत्र:</span> {info.area}
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

export default AgriculturePage;

