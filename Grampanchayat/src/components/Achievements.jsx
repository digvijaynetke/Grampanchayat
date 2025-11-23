import awardImage1 from '../images/info.jpg';
import awardImage2 from '../images/mandir.jpg';
import awardImage3 from '../images/gav.jpg';

const achievementHighlights = [
  {
    id: 1,
    image: awardImage1,
    title: 'नमुना पुरस्कार -1 स्वच्छता',
    description:
      'गाव स्वच्छ ठेवण्यावर भर, घनकचरा व्यवस्थापन युनिट, दैनंदिन कचरा संकलन साठी घंटागाडी',
    date: 'date month year',
    category: 'पुरस्कार / यशोगाथा',
    village: 'उर्धुळ'
  },
  {
    id: 2,
    image: awardImage2,
    title: 'नमुना पुरस्कार -2 पाणीपुरवठा',
    description:
      'महाजल अंतर्गत ६.५० लक्ष लिटर जल कुंभ, जल जीवन मिशन अंतर्गत २.५० लक्ष लिटर जल कुंभ, नियमित आणि शुद्ध पाणीपुरवठा, शुध्द जल आरो प्लांट.',
    date: 'date month year',
    category: 'पुरस्कार / यशोगाथा',
    village: 'उर्धुळ'
  },
  {
    id: 3,
    image: awardImage3,
    title: 'नमुना पुरस्कार -3',
    description: 'या कार्डवरची माहिती लवकरच अद्ययावत केली जाईल.',
    date: '22 Sep 2025',
    category: 'पुरस्कार / यशोगाथा',
    village: 'उर्धुळ'
  }
];

const keyFactors = [
  { factor: 'स्वच्छता', detail: 'गाव स्वच्छ ठेवण्यावर भर' },
  { factor: 'पाणीपुरवठा', detail: 'नियमित आणि शुद्ध पाणी उपलब्ध करणे' },
  { factor: 'शिक्षण', detail: 'डिजिटल शाळा' },
  { factor: 'आरोग्य', detail: 'प्राथमिक आरोग्य सेवा उपलब्ध करणे' },
  { factor: 'पर्यावरण', detail: 'वृक्षारोपण आणि जलसंधारण' }
];

const educationInstitutes = [
  { name: 'जिल्हा परिषद शाळा', type: 'प्राथमिक', contact: '९७६३२८९०९२' },
  { name: 'माध्यमिक विद्यालय', type: 'माध्यमिक', contact: '९४२०३६१५५५' }
];

const healthCenters = [
  { name: 'उपकेंद्र', type: 'प्राथमिक उपचार', contact: '८३२९६१२९४०' },
  { name: 'वैद्यकीय दवाखाना', type: 'खासगी', contact: '९०७५२०११२०' }
];

const Achievements = () => {

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

          {/* Achievements Grid (now showing awards highlights) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {achievementHighlights.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <div className="px-5 pt-5 pb-6 space-y-3">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{item.village}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>{item.category}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Key Factors Table */}
          <div className="mt-12 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-teal-600 to-green-500 text-white">
              <p className="text-sm uppercase tracking-widest opacity-80">उत्कर्षाचे घटक</p>
              <h3 className="text-2xl font-semibold">ग्रामपंचायत आदर्श तक्ता</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      प्रगती घटक
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      उपक्रम / तपशील
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {keyFactors.map((item, index) => (
                    <tr key={item.factor} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 text-base font-semibold text-teal-800 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                        {item.factor}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {item.detail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Education & Health Tables */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
                <p className="text-sm uppercase tracking-widest opacity-80">शिक्षण सुविधा</p>
                <h3 className="text-2xl font-semibold">स्थानिक शाळा व संपर्क</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        संस्थेचे नाव
                      </th>
                      <th scope="col" className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        प्रकार
                      </th>
                      <th scope="col" className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        संपर्क क्रमांक
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {educationInstitutes.map((school, index) => (
                      <tr key={school.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 text-base font-semibold text-slate-800">
                          {school.name}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600">{school.type}</td>
                        <td className="px-4 py-4 text-sm font-medium text-teal-700">{school.contact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-emerald-600 to-lime-500 text-white">
                <p className="text-sm uppercase tracking-widest opacity-80">आरोग्य सुविधा</p>
                <h3 className="text-2xl font-semibold">आरोग्य केंद्रे व संपर्क</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        केंद्राचे नाव
                      </th>
                      <th scope="col" className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        प्रकार
                      </th>
                      <th scope="col" className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        संपर्क क्रमांक
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {healthCenters.map((center, index) => (
                      <tr key={center.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 text-base font-semibold text-slate-800">
                          {center.name}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600">{center.type}</td>
                        <td className="px-4 py-4 text-sm font-medium text-teal-700">{center.contact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;

