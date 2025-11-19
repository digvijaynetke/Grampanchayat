import PageHero from '../PageHero';
import gavImage from '../../images/back.jpg';

const VillageInfoPage = () => {
  const infoSections = [
    {
      id: 'history',
      title: '१. ऐतिहासिक आणि राजकीय महत्त्व',
      accent: 'from-orange-500 to-pink-500',
      description:
        'पिंपळनेर (पूर्वीचे पिंपळेश्वर) हे चालुक्य राजवटीपासून उल्लेखनीय महत्त्व असलेले ठिकाण असून राजकीय दृष्टीनेही प्रभावी केंद्र राहिले आहे.',
      points: [
        { label: 'जुने नाव', detail: 'पिंपळनेरला पूर्वी पिंपळेश्वर म्हणून ओळखले जात असे.' },
        {
          label: 'ब्रिटिश काळातील स्थान',
          detail: 'ब्रिटिश राजवटीत, पिंपळनेर हे तालुक्याचे ठिकाण होते आणि ते एका उपविभागाचे केंद्र (Sub-Divisional Headquarter) होते.',
        },
        {
          label: 'राजधानीचे स्थलांतर',
          detail: '१८८७ मध्ये अतिवृष्टी व जंगलप्रदेशातील दळणवळण मर्यादा लक्षात घेऊन प्रशासकीय मुख्यालय पिंपळनेरहून साक्री येथे हलवण्यात आले.',
        },
        {
          label: 'ऐतिहासिक पुरावे',
          detail: 'चालुक्य राजवटीतील चौथ्या शतकातील ताम्रपट, पांझरा नदीकाठचा किल्ला आणि हेमाडपंती मंदिरांचे अवशेष या शहराच्या वैभवाची साक्ष देतात.',
        },
      ],
    },
    {
      id: 'geography',
      title: '२. भौगोलिक स्थान आणि दळणवळण',
      accent: 'from-teal-500 to-emerald-500',
      description: 'भौगोलिकदृष्ट्या पिंपळनेर हे व्यापार आणि संपर्काच्या दृष्टीने महत्त्वाच्या स्थानावर आहे.',
      points: [
        { label: 'नदी', detail: 'गाव पांझरा नदीच्या काठावर वसलेले असल्याने कृषीस लागणारे पाणी व सुपीक भूमी उपलब्ध होते.' },
        { label: 'स्थान', detail: 'हे नाशिक आणि धुळे जिल्ह्याच्या सीमेवरील दुवा म्हणून कार्य करते.' },
        {
          label: 'प्रमुख रस्ते',
          detail: 'नाशिक-धुळे (NH-3) राष्ट्रीय महामार्गाजवळ असून येथून साक्री, धुळे, नाशिक आणि नंदुरबारकडे थेट मार्ग उपलब्ध आहेत.',
        },
        {
          label: 'जवळचे शहर',
          detail: 'धुळे (६५-७० किमी) आणि नाशिक (११०-१२० किमी) ही प्रमुख शहरं व्यवहारासाठी सहज गाठता येतात.',
        },
      ],
    },
    {
      id: 'economy',
      title: '३. अर्थव्यवस्था आणि बाजारपेठ',
      accent: 'from-amber-500 to-red-500',
      description: 'प्रादेशिक अर्थव्यवस्थेचा कणा मानल्या जाणाऱ्या पिंपळनेरची बाजारपेठ कृषी उत्पादनांवर आधारित आहे.',
      points: [
        { label: 'कृषी केंद्र', detail: 'आसपासच्या गावांसाठी हे एक मोठे कृषी बाजार केंद्र आहे.' },
        { label: 'कांदा बाजार', detail: 'पिंपळनेरची कांदा बाजारपेठ राज्यभर प्रसिद्ध असून वर्षभर हालचाल सुरू असते.' },
        {
          label: 'रोहिश (रोशा) गवत',
          detail: 'पूर्वी सुगंधी तेलासाठी वापरल्या जाणाऱ्या रोहिश गवताच्या निर्यातीसाठी पिंपळनेर विशेष ओळखले जात असे.',
        },
        { label: 'उद्योग', detail: 'पिंपळनेर सहकारी साखर कारखाना आणि इतर व्यवसायिक प्रकल्प येथील अर्थव्यवस्थेला उभारी देतात.' },
      ],
    },
    {
      id: 'education',
      title: '४. शैक्षणिक सुविधा',
      accent: 'from-indigo-500 to-sky-500',
      description:
        'पिंपळनेरमध्ये प्राथमिक शिक्षणापासून ते महाविद्यालयीन शिक्षणापर्यंतच्या (कला, वाणिज्य व विज्ञान शाखा) सुविधा सुस्थितीत उपलब्ध आहेत.',
      points: [
        {
          label: 'सर्वस्तरीय शिक्षण',
          detail: 'विद्यार्थ्यांसाठी दर्जेदार शाळा, कनिष्ठ व वरिष्ठ महाविद्यालये तसेच कौशल्यवर्धन अभ्यासक्रम उपलब्ध आहेत.',
        },
        {
          label: 'विद्यार्थी सुविधा',
          detail: 'ग्रंथालय, प्रयोगशाळा, क्रीडांगण आणि करिअर मार्गदर्शनामुळे ग्रामीण भागातील विद्यार्थ्यांना समतुल्य संधी मिळतात.',
        },
      ],
    },
    {
      id: 'tourism',
      title: '५. पर्यटन आणि भेट देण्याची ठिकाणे',
      accent: 'from-purple-500 to-fuchsia-500',
      description: 'निसर्गरम्य परिसर आणि ऐतिहासिक वास्तू पर्यटकांना खास अनुभव देतात.',
      points: [
        { label: 'लाटीपाडा धरण', detail: 'पिंपळनेरपासून सुमारे ५ किमी अंतरावर असलेले हे धरण पिकनिक आणि विश्रांतीसाठी आदर्श ठिकाण आहे.' },
        {
          label: 'पांझरा नदीचा किनारा',
          detail: 'नदीकाठी असलेल्या मंदिरांच्या अवशेषांसह शांत वातावरण मनाला वेगळाच आनंद देते.',
        },
        { label: 'स्थानिक मंदिरे', detail: 'गावात व परिसरात अनेक प्राचीन मंदिरे असून ती स्थानिक श्रद्धास्थाने आहेत.' },
      ],
    },
  ];

  return (
    <div>
      <PageHero title="गावाची माहिती" subtitle="माहिती" image={gavImage} />
      <section className="py-16 bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-teal-600 uppercase tracking-[0.3em]">पिंपळणारे</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">पिंपळनेर: अधिक माहिती</h2>
              <p className="mt-4 text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                समृद्ध इतिहास, सक्षम प्रशासन, कृषी आधारीत अर्थव्यवस्था आणि विकसित शिक्षण-सुविधा यामुळे पिंपळनेर
                हे गाव आदर्श विकासाचा प्रवास दाखवते.
              </p>
            </div>

            <div className="grid gap-10">
              {infoSections.map((section) => (
                <div
                  key={section.id}
                  className="relative bg-white/90 rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
                >
                  <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${section.accent}`}></div>
                  <div className="relative p-8 md:p-10 space-y-6">
                    <div className="inline-flex items-center px-4 py-1 rounded-full bg-teal-50 text-teal-700 text-sm font-semibold">
                      {section.title}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{section.description}</p>
                    <div className="grid gap-4 md:grid-cols-2">
                      {section.points.map((point) => (
                        <div
                          key={`${section.id}-${point.label}`}
                          className="bg-gray-50 rounded-2xl border border-gray-100 p-4 hover:border-teal-200 transition"
                        >
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">
                            {point.label}
                          </p>
                          <p className="mt-2 text-gray-700 leading-relaxed">{point.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* <Achievements /> */}
      {/* <PopulationStats /> */}
    </div>
  );
};

export default VillageInfoPage;

