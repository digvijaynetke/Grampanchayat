import PageHero from '../PageHero';
import gavImage from '../../images/gav.jpg';

const SavingsGroupPage = () => {
  const savingsGroups = [
    {
      id: 1,
      name: 'बचत गट 1',
      members: '20',
      savings: '₹50,000+',
      description: 'गावातील पहिला बचत गट जिथे सदस्यांना बचत आणि कर्ज सुविधा उपलब्ध आहेत.',
      contact: '+91 XXXXXXXX'
    },
    {
      id: 2,
      name: 'बचत गट 2',
      members: '25',
      savings: '₹75,000+',
      description: 'गावातील दुसरा बचत गट जिथे महिला सदस्यांना आर्थिक सक्षमीकरणासाठी मदत केली जाते.',
      contact: '+91 XXXXXXXX'
    },
    {
      id: 3,
      name: 'बचत गट 3',
      members: '18',
      savings: '₹40,000+',
      description: 'गावातील तिसरा बचत गट जिथे सदस्यांना बचत आणि कर्ज सुविधा मिळतात.',
      contact: '+91 XXXXXXXX'
    }
  ];

  return (
    <div>
      <PageHero 
        title="बचत गट माहिती" 
        subtitle="माहिती"
        image={gavImage}
      />
      <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-teal-800">
            बचत गट माहिती
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {savingsGroups.map((group) => (
              <div
                key={group.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 p-6"
              >
                <h3 className="text-2xl font-bold text-teal-800 mb-3">
                  {group.name}
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {group.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-800">सदस्य:</span>
                    <span className="text-gray-600">{group.members}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-800">बचत:</span>
                    <span className="text-gray-600">{group.savings}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>{group.contact}</span>
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

export default SavingsGroupPage;

