import PageHero from '../PageHero';
import gavImage from '../../images/back.jpg';

const statCards = [
  { label: '७/१२ धारक', value: '५२२' },
  { label: 'एकूण शेती क्षेत्र', value: '६७३.२८ हे.' },
  { label: 'बागायती क्षेत्र', value: '२६१ हे.' },
  { label: 'कोरडवाहू क्षेत्र', value: '४१२.२८ हे.' },
  { label: 'शेतवस्ती असलेली कुटुंबे', value: '२००+' }
];

const irrigationHighlights = [
  'तांबेबारा धरणातून पाइपलाईनद्वारे जलसिंचन आणि धरण दुरुस्तीची कामे प्रगतीपथावर.',
  'कापरा लघुपाटबंधारे तलावातून प्रस्तावित PDN पाइपलाईनमुळे पाण्याची बचत व जास्त क्षेत्राला सिंचन.',
  'कालव्याद्वारे (पाट) रब्बी हंगामात नियोजित पाणीपुरवठा.'
];

const cropSeasons = [
  {
    title: 'खरीप हंगाम',
    crops: ['मका', 'ज्वारी', 'बाजरी', 'भात', 'भुईमूग', 'सोयाबीन', 'मिरची', 'कांदे', 'हळद', 'उडीद', 'मूग', 'चवळी', 'मठ']
  },
  {
    title: 'रब्बी हंगाम',
    crops: ['कांदे', 'गहू', 'हरभरा', 'भुईमूग']
  },
  {
    title: 'भाजीपाला',
    crops: ['कोबी', 'गवार', 'वालखड', 'भेंडी', 'वांगी', 'टमाटे', 'मेथी', 'गिलके', 'कोथिंबीर']
  }
];

const fieldNames = [
  'वरला थळ', 'खालना थळ', 'बांड्या तलाव', 'कडायबारी', 'पातळखडक', 'खारुट्या', 'झिरण्या', 'वाकड्या',
  'मेंढ्याबैडा', 'इमान', 'देवकल', 'भरडबारा', 'सागनाबैडा', 'डायम', 'माळ', 'नवादा', 'कसाड', 'जांभळा'
];

const supportPrograms = [
  'बायफ, DSC व लुपिन संस्थेमार्फत ठिबक सिंचन, मंडप शेती व आंबावाडी प्रकल्प.',
  'संयुक्तिक सोलर पंप, विहीर पुनर्भरण, तलाव गाळ काढणे व माती बंधारे उभारणी.',
  'गुरांसाठी चारा बियाणे, परसबाग रोपे, सीड बॉल व सोलर लॅम्प वाटप.',
  'R-SETI व ग्रामपंचायतच्या सहकार्याने महिला व युवकांसाठी शिलाई, कुक्कुटपालन व सूक्ष्म व्यवसाय प्रशिक्षण.'
];

const forestNarrative = [
  'ठाणेपाड्याला सन २०१२ मध्ये १५७६.४७ हेक्टर सामूहिक वनहक्क मिळाला असून २ एकर वनजमीन पाणीपुरवठा विहिरीसाठी मंजूर आहे.',
  'टाटा इन्स्टिट्यूट ऑफ सोशल सायन्सेसच्या सहकार्याने सीमांकन व आराखडा तयार केला जात आहे.',
  '१९७२ पासूनची वन विभागाची नर्सरी आंबा, साग, मोहू ते कॅक्टस गार्डनपर्यंत विविध रोपे तयार करून मनरेगा अंतर्गत रोजगार उपलब्ध करते.',
  'राखीव वनक्षेत्रात निसर्ग पर्यटन, कॅक्टस गार्डन, बालोद्यान व जलविहाराची सुविधा असून बिबट्या, मोर व विविध पक्ष्यांचे अधिवास जपले जातात.',
  'संयुक्त वन व्यवस्थापन समिती आणि DSC यांच्या सहकार्याने देवराई प्रकल्पांतर्गत १००० झाडांची लागवड व ठिबक सिंचन व्यवस्था करण्यात आली आहे.'
];

const AgriculturePage = () => {
  return (
    <div>
      <PageHero title="शेती व वनक्षेत्र" subtitle="ठाणेपाडा शिवार" image={gavImage} />
      <section className="py-16 bg-gradient-to-b from-white to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold text-emerald-800">शेतीचे हृदयस्पंदन</h2>
              <p className="text-gray-600 text-lg">
                जलसिंचन, पिकांची विविधता आणि संस्थात्मक सहकार्यामुळे ठाणेपाडा कृषीसमृद्धीच्या वाटेवर आहे.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {statCards.map((card) => (
                <div
                  key={card.label}
                  className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-4 text-center"
                >
                  <p className="text-sm text-gray-500">{card.label}</p>
                  <p className="text-2xl font-bold text-emerald-700 mt-1">{card.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-emerald-800 mb-6">सिंचन अधोसंरचना</h3>
              <div className="space-y-4">
                {irrigationHighlights.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="w-3 h-3 rounded-full bg-emerald-600 mt-2"></span>
                    <p className="text-gray-700 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cropSeasons.map((season) => (
                <div key={season.title} className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6">
                  <h4 className="text-xl font-bold text-emerald-800 mb-4">{season.title}</h4>
                  <div className="flex flex-wrap gap-2">
                    {season.crops.map((crop) => (
                      <span key={crop} className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-emerald-800 mb-4">शिवारातील विशिष्ट स्थळे</h3>
              <div className="flex flex-wrap gap-3">
                {fieldNames.map((name) => (
                  <span key={name} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
                    {name}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl text-white p-8 shadow-2xl">
              <h3 className="text-2xl font-bold mb-4">कृषी सहाय्य उपक्रम</h3>
              <div className="space-y-3">
                {supportPrograms.map((program) => (
                  <div key={program} className="flex items-start gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-white mt-2"></span>
                    <p className="leading-relaxed">{program}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-emerald-800 text-center">वनक्षेत्र</h3>
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 space-y-4">
                {forestNarrative.map((para, idx) => (
                  <p key={idx} className="text-gray-700 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgriculturePage;

