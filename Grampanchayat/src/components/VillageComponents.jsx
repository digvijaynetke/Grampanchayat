const highlightCards = [
  {
    title: '२०११ एकूण लोकसंख्या',
    value: '३४८८',
    description: 'गावातील प्रत्येक कुटुंबाचा आवाज या आकड्यात सामावलेला आहे.'
  },
  {
    title: 'पुरुष : स्त्रिया',
    value: '१७३८ : १७५०',
    description: 'संतुलित लोकसंख्या आणि १००६ स्त्री-पुरुष प्रमाण.'
  },
  {
    title: 'कुटुंब संख्या',
    value: '७२२',
    description: 'गावातील १२ गल्ल्यांमधील सामूहिक जीवनशैली.'
  },
  {
    title: 'आदिवासी उपस्थिती',
    value: '९७.२७%',
    description: 'कोकणी, भील व इतर पारंपरिक समाजांचे प्रमुख केंद्र.'
  }
];

const populationMatrix = [
  { label: 'पुरुष लोकसंख्या', value: '१७३८' },
  { label: 'स्त्री लोकसंख्या', value: '१७५०' },
  { label: 'भौगोलिक क्षेत्र', value: '१८४८ हेक्टर' },
  { label: '७५ वर्षांवरील नागरिक', value: '५४' },
  { label: 'दिव्यांग लाभार्थी', value: '२७' },
  { label: 'दारिद्र्यरेषेखालील कुटुंबे', value: '३९० (५४%)' }
];

const tribalComposition = [
  {
    group: 'आदिवासी बांधव',
    male: '१६८८',
    female: '१७०५',
    total: '३३९३',
    highlight: 'संपूर्ण लोकसंख्येच्या ९७.२७% प्रतिनिधित्व'
  },
  {
    group: 'बिगर आदिवासी',
    male: '५०',
    female: '४५',
    total: '९५',
    highlight: '२.७३% समाजबंध'
  }
];

const literacyFocus = [
  { title: 'पुरुष साक्षरता', value: '६३.५२%' },
  { title: 'स्त्री साक्षरता', value: '४६.४०%' },
  { title: 'एकूण साक्षरता', value: '५४.९३%' },
  { title: 'महाराष्ट्र सरासरी', value: '८२.३४%' }
];

const narrativeBlocks = [
  {
    title: 'सामाजिक बांधिलकी',
    content:
      'कुटुंब आधारित जीवनशैली, निसर्गाशी नाते आणि परंपरांचा आदर यामुळे ठाणेपाडा गावात सहजीवनाची मजबूत घडी दिसून येते.'
  },
  {
    title: 'समावेशक समाज',
    content:
      'कोकणी व भील समवेत वंजारी, लोहार, सुतार, जयस्वाल, पांचाळ, वडार यांसारख्या विविध समाजांचे सदस्य गावाच्या प्रगतीसाठी हातात हात घालून कार्य करतात.'
  },
  {
    title: 'संरक्षण आणि कल्याण',
    content:
      'दिव्यांग बंधू-भगिनींसाठी इंदिरा गांधी दिव्यांग पेन्शन योजना, तर ज्येष्ठ नागरिकांसाठी गावपातळीवरील सर्वेक्षणांमधून आरोग्य व सुरक्षा उपक्रम राबविले जातात.'
  }
];

const culturalHighlights = [
  'दरवर्षी महादेव यात्रा आणि रामधून परंपरा गावाच्या आध्यात्मिक वारशाची साक्ष देते.',
  'गावातील १२ गल्ल्या विविध सामाजिक उपक्रमांमुळे सदैव सतेज राहतात.',
  'गावाला लागून असलेली आमराई नदी व डोंगररांगांची हरित झेप निसर्गप्रेमाला उभारी देते.'
];

const StatCard = ({ title, value, description }) => (
  <div className="bg-white rounded-2xl border border-teal-100 shadow-lg p-6 hover:-translate-y-1 transition-transform duration-300">
    <p className="text-sm font-semibold text-teal-600 mb-2">{title}</p>
    <p className="text-4xl font-black text-gray-900 mb-3">{value}</p>
    <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const VillageStatisticsComponents = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-teal-50" id="village-stats">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              ठाणेपाडा गावाची आकडेवारी
            </h2>
            <p className="text-gray-600 text-lg">
              २०११ च्या जनगणनेपासून २०२४ पर्यंतच्या सर्वेक्षणाचे समृद्ध चित्र
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlightCards.map((card) => (
              <StatCard key={card.title} {...card} />
            ))}
          </div>

          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
            <h3 className="text-2xl font-bold text-teal-800 mb-6">जीवनमान सारणी</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {populationMatrix.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between bg-gray-50 rounded-2xl p-4 border border-gray-100"
                >
                  <span className="text-gray-600 font-medium">{item.label}</span>
                  <span className="text-lg font-semibold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-teal-600 to-emerald-700 rounded-3xl p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-6">साक्षरतेचा फोकस</h3>
              <div className="grid grid-cols-2 gap-4">
                {literacyFocus.map((item) => (
                  <div key={item.title} className="bg-white/10 rounded-2xl p-4 border border-white/20 text-center">
                    <p className="text-sm uppercase tracking-wide">{item.title}</p>
                    <p className="text-3xl font-bold mt-2">{item.value}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-base leading-relaxed">
                महिला व पुरुष साक्षरतेतील अंतर कमी करण्यासाठी स्थानिक शाळा व स्वयंसेवी संस्था विशेष मोहिमा राबवत आहेत.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-2xl font-bold text-teal-800 mb-4">आदिवासी व बिगर आदिवासी मांडणी</h3>
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
                    {tribalComposition.map((row, index) => (
                      <tr key={row.group} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-4 py-3">
                          <p className="font-semibold text-gray-900">{row.group}</p>
                          <p className="text-sm text-gray-500">{row.highlight}</p>
                        </td>
                        <td className="px-4 py-3">{row.male}</td>
                        <td className="px-4 py-3">{row.female}</td>
                        <td className="px-4 py-3 font-semibold">{row.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {narrativeBlocks.map((block) => (
              <div
                key={block.title}
                className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300"
              >
                <h4 className="text-xl font-bold text-teal-800 mb-3">{block.title}</h4>
                <p className="text-gray-700 leading-relaxed">{block.content}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <h3 className="text-2xl font-bold text-teal-800 mb-4">संस्कृतीचे रंग</h3>
            <div className="space-y-3">
              {culturalHighlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100"
                >
                  <span className="text-teal-600 text-xl font-bold">•</span>
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { VillageStatisticsComponents };
