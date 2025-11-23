import PageHero from '../PageHero';
import gavImage from '../../images/gav.jpg';

const HealthPage = () => {
  const healthCenters = [
    {
      id: 1,
      name: 'आरोग्य दवाखाना 1',
      description: 'गावातील मुख्य आरोग्य केंद्र जिथे सर्व प्रकारच्या आरोग्य सेवा उपलब्ध आहेत.',
      services: ['सामान्य उपचार', 'टीकाकरण', 'आरोग्य तपासणी'],
      contact: '+91 7588195225',
      location: 'उर्धूळ'
    },
    {
      id: 2,
      name: 'आरोग्य दवाखाना 2',
      description: 'गावातील दुसरे आरोग्य केंद्र जिथे आरोग्य संबंधित सर्व सेवा मिळतात.',
      services: ['आरोग्य सल्ला', 'दवाखाना', 'आरोग्य माहिती'],
      contact: '+91 7588195225',
      location: 'उर्धूळ'
    }
  ];

  const additionalContacts = [
    { name: 'उपकेंद्र', type: 'प्राथमिक उपचार', contact: '८३२९६१२९४०' },
    { name: 'वैद्यकीय दवाखाना', type: 'खासगी', contact: '९०७५२०११२०' }
  ];

  return (
    <div>
      <PageHero 
        title="आरोग्य दवाखाने" 
        subtitle="माहिती"
        image={gavImage}
      />
      <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-teal-800">
            आरोग्य दवाखाने
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {healthCenters.map((center) => (
              <div
                key={center.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-teal-800 mb-3">
                    {center.name}
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {center.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">सेवा:</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {center.services.map((service, index) => (
                        <li key={index}>{service}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <span>{center.contact}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>{center.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    <section className="py-12 bg-teal-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md border border-teal-100">
          <div className="p-6 md:p-8">
            <h3 className="text-2xl font-bold text-teal-800 mb-4 text-center">
              अतिरिक्त संपर्क माहिती
            </h3>
            <p className="text-gray-600 text-center mb-6">
              आपल्या गावातील महत्त्वाच्या आरोग्य सेवांचे संपर्क तपशील खाली दिलेले आहेत.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-teal-100 text-teal-900">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                      केंद्राचे नाव
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                      सेवा प्रकार
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                      संपर्क क्रमांक
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {additionalContacts.map((contact) => (
                    <tr key={contact.name} className="hover:bg-teal-50">
                      <td className="px-4 py-4 text-gray-800 font-medium">
                        {contact.name}
                      </td>
                      <td className="px-4 py-4 text-gray-600">
                        {contact.type}
                      </td>
                      <td className="px-4 py-4 text-teal-700 font-semibold">
                        {contact.contact}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default HealthPage;

