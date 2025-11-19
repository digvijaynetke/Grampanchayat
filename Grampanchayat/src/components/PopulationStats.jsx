const PopulationStats = () => {
  const summaryCards = [
    {
      title: 'एकूण लोकसंख्या (२०११)',
      value: '३४८८',
      description: 'गावातील ७२२ कुटुंबांचा एकत्रित आकडा'
    },
    {
      title: 'पुरुष',
      value: '१७३८',
      description: 'जनगणनेनुसार पुरुष लोकसंख्या'
    },
    {
      title: 'स्त्रिया',
      value: '१७५०',
      description: 'मातृशक्तीचे प्रमाण अधिक राखलेले'
    },
    {
      title: 'दर हजारी स्त्री-पुरुष प्रमाण',
      value: '१००६',
      description: 'महाराष्ट्र सरासरीपेक्षा उत्तम (९२९)'
    }
  ];

  const demographicTable = [
    { label: 'गावातील कुटुंब संख्या', value: '७२२' },
    { label: 'भौगोलिक क्षेत्रफळ', value: '१८४८ हेक्टर' },
    { label: '७५ वर्षे वरील नागरिक', value: '५४ (सन २०२४ सर्वेक्षण)' },
    { label: 'दिव्यांग बंधू भगिनी', value: '२७ (इंदिरा गांधी पेन्शन लाभार्थी)' },
    { label: 'दारिद्र्यरेषेखालील कुटुंबे', value: '३९० (५४%)' },
    { label: 'गल्ल्या', value: '१२ गल्ल्या' }
  ];

  const tribalStats = [
    {
      category: 'आदिवासी (९७.२७%)',
      male: '१६८८',
      female: '१७०५',
      total: '३३९३'
    },
    {
      category: 'बिगर आदिवासी (२.७३%)',
      male: '५०',
      female: '४५',
      total: '९५'
    }
  ];

  const literacyStats = [
    { label: 'पुरुषांची साक्षरता', value: '६३.५२%' },
    { label: 'स्त्रियांची साक्षरता', value: '४६.४०%' },
    { label: 'एकूण साक्षरता', value: '५४.९३%' },
    { label: 'महाराष्ट्र सरासरी', value: '८२.३४%' }
  ];

  const communityNarrative = [
    'कोकणी व भील आदिवासींसह वंजारी, लोहार, सुतार, जयस्वाल, पांचाळ, वडार इत्यादी समाजबांधव गावात गुण्यागोविंदाने सहजीवन जगतात.',
    'गावातील एकूण लोकसंख्येत आदिवासी बांधवांची संख्या प्रचंड असून सामाजिक परंपरा आणि संस्कृतीचे जतन सामूहिकपणे केले जाते.',
    'बहुतेक दिव्यांग लाभार्थींना इंदिरा गांधी दिव्यांग पेन्शन योजनेंतर्गत नियमित मदत मिळते.',
    'दर वर्षी महादेव यात्रेपासून रामधून कार्यक्रमांपर्यंत गावात सांस्कृतिक सहभागाची परंपरा निरंतर सुरू असते.'
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              ठाणेपाडा लोकसंख्या प्रतिमा
            </h2>
            <p className="text-gray-600 text-lg">
              २०११ च्या जनगणनेतील आकडे आणि २०२४ मधील सर्वेक्षणातून गावाची खरी ओळख
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {summaryCards.map((card) => (
              <div
                key={card.title}
                className="bg-white border border-teal-100 rounded-2xl shadow-lg p-6 text-center hover:-translate-y-1 transition-transform duration-300"
              >
                <p className="text-sm font-semibold text-teal-600 mb-2">{card.title}</p>
                <p className="text-4xl font-black text-gray-900 mb-3">{card.value}</p>
                <p className="text-sm text-gray-600">{card.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-2xl font-bold text-teal-800 mb-4">जीवनमान संबंधित आकडे</h3>
              <ul className="divide-y divide-gray-100">
                {demographicTable.map((row) => (
                  <li key={row.label} className="py-3 flex items-center justify-between">
                    <span className="text-gray-600 font-medium">{row.label}</span>
                    <span className="text-lg text-gray-900 font-semibold">{row.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-teal-600 to-emerald-700 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="text-2xl font-bold mb-4">साक्षरतेचे चित्र</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {literacyStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/10 rounded-xl p-4 text-center border border-white/20"
                  >
                    <p className="text-sm uppercase tracking-wide">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed">
                शिक्षणाचा पाया मजबूत करण्यासाठी ग्रामपंचायत, शाळा आणि सामाजिक संस्थांनी सातत्याने प्रयत्न सुरू ठेवले आहेत.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <h3 className="text-2xl font-bold text-teal-800 mb-6">आदिवासी व बिगर आदिवासी रचना</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-teal-50 text-teal-900">
                    <th className="px-4 py-3">विभाग</th>
                    <th className="px-4 py-3">पुरुष</th>
                    <th className="px-4 py-3">स्त्रिया</th>
                    <th className="px-4 py-3">एकूण</th>
                  </tr>
                </thead>
                <tbody>
                  {tribalStats.map((row, index) => (
                    <tr key={row.category} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-3 font-semibold">{row.category}</td>
                      <td className="px-4 py-3">{row.male}</td>
                      <td className="px-4 py-3">{row.female}</td>
                      <td className="px-4 py-3">{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <h3 className="text-2xl font-bold text-teal-800 mb-4">समुदायाचे स्पंदन</h3>
            <div className="space-y-4">
              {communityNarrative.map((paragraph, idx) => (
                <p key={idx} className="text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopulationStats;

