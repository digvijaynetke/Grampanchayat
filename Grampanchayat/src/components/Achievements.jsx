const Achievements = () => {
  const stats = [
    {
      id: 1,
      value: '76%',
      label: 'साक्षरता दर'
    },
    {
      id: 2,
      value: '500+',
      label: 'हेक्टर जमीन'
    },
    {
      id: 3,
      value: '6+',
      label: 'शिक्षण केंद्र'
    },
    {
      id: 4,
      value: '24/7',
      label: 'स्वच्छ पाण्याची सोय'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Dotted Line */}
          <div className="flex justify-center mb-4">
            <div className="w-32 border-t-2 border-dotted border-gray-400"></div>
          </div>

          {/* Sub-heading */}
          <p className="text-center text-gray-600 mb-2 text-lg">
            आमचे गाव, आमची ओळख
          </p>

          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            एक गाव – अनेक उपलब्धी
          </h2>

          {/* Statistics Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat) => (
              <div 
                key={stat.id}
                className="bg-white rounded-xl shadow-md p-6 md:p-8 text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="text-4xl md:text-5xl font-bold text-teal-700 mb-3">
                  {stat.value}
                </div>
                <div className="text-base md:text-lg text-gray-800 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;

