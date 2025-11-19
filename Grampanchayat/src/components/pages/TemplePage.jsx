import PageHero from '../PageHero';
import mandirImage from '../../images/mandir.jpg';

const templeHighlights = [
  {
    title: 'महादेवाची यात्रा व तमाशा',
    content:
      'दर एप्रिलमध्ये भरारी घेणारी महादेवाची यात्रा ही गावाच्या श्रद्धेचे केंद्र आहे. वर्गणीसह उभ्या राहणाऱ्या दोन रात्रींच्या तमाशा मनोरंजन कार्यक्रमातून गावकऱ्यांचा सहभाग आणि आनंद झळकतो.'
  },
  {
    title: 'अखंड रामधून परंपरा',
    content:
      'संपूर्ण गावाच्या पुढाकारातून गेल्या ३५ वर्षांपासून ऑगस्ट महिन्यात प. पू. संत दगाबापू महाराज यांच्या सान्निध्यात २४ तास अखंड “हरे राम हरे कृष्ण” रामधूनचा जप महादेव मंदिरात केला जातो.'
  },
  {
    title: 'भजन मंडळांची सांस्कृतिक ठेव',
    content:
      'रामधून मंडळ, रामचंद्र मंडळ, गुरुमाऊली मंडळ, भातीजी महाराज मंडळ आणि जय मल्हार मंडळ आठवड्याला सोमवार-गुरुवारी जप व भजनांनी वातावरण भारून टाकतात. पहाटे ५ ते ६ या वेळेत भक्तिगीते वाजण्याची परंपरा आहे.'
  }
];

const mandalDetails = [
  'महादेव मंदिर',
  'हनुमान मंदिर',
  'गोऱ्यादेव (पुरातन) मंदिरे'
];

const TemplePage = () => {
  return (
    <div>
      <PageHero title="मंदिर" subtitle="आध्यात्मिक वारसा" image={mandirImage} />
      <section className="py-16 bg-gradient-to-b from-white to-teal-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold text-teal-800">भक्ती आणि परंपरा</h2>
              <p className="text-gray-600 text-lg">
                गावातील देवस्थान आणि आध्यात्मिक उपक्रम गावकऱ्यांच्या एकत्रित श्रद्धेचे प्रतिक आहेत.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {templeHighlights.map((item) => (
                <div
                  key={item.title}
                  className="bg-white border border-gray-100 rounded-3xl shadow-xl p-6 hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-xl mb-4">
                    ॐ
                  </div>
                  <h3 className="text-2xl font-bold text-teal-800 mb-3">{item.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{item.content}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-teal-800">रामधून आणि आध्यात्मिक प्रवचन</h3>
                  <p className="text-gray-700 leading-relaxed">
                    संत मंडळींची प्रवचने आणि अखंड रामधूनचा जयघोष महादेव मंदिराच्या प्रांगणात वर्षानुवर्षे गुंजत राहतो. भक्तांचे सामूहिक सामर्थ्य आणि श्रेयस यांनी ही परंपरा अखंड ठेवली आहे.
                  </p>
                </div>
                <div className="bg-teal-700 rounded-3xl text-white p-6 space-y-4 shadow-lg">
                  <h4 className="text-xl font-semibold">मंदिरे</h4>
                  <ul className="space-y-2">
                    {mandalDetails.map((mandal) => (
                      <li key={mandal} className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                        <span>{mandal}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm leading-relaxed">
                    या सर्व देवस्थानांवर नियमित अर्चा, जप आणि ग्रामस्थांच्या वर्गणीतील उपक्रमांद्वारे सेवाभाव जपला जातो.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-2xl font-bold text-teal-800 mb-4">भक्तिमार्गातील अनुशासन</h3>
              <p className="text-gray-700 leading-relaxed">
                गावात रामधून, भजन आणि जागर या परंपरा फक्त धार्मिक कार्यक्रमांपुरत्या मर्यादित नाहीत; त्या सामाजिक बांधिलकीचा धागा आहेत. सामूहिक भजनातून गावात संध्याकाळी भक्तिमय वातावरण तयार होते, तर पहाटे रामचंद्र मंडळाच्या मार्गदर्शनाखाली भक्तिगीते प्रतिध्वनित होतात.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TemplePage;

