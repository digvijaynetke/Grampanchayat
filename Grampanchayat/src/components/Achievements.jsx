const Achievements = () => {
  const stats = [
    {
      id: 1,
      value: '**%',
      label: 'साक्षरता दर'
    },
    {
      id: 2,
      value: '***+',
      label: 'हेक्टर जमीन'
    },
    {
      id: 3,
      value: '*+',
      label: 'शिक्षण केंद्र'
    },
    {
      id: 4,
      value: '24/7',
      label: 'स्वच्छ पाण्याची सोय'
    }
  ];

  const achievementSections = [
    {
      title: 'स्थानिक प्रशासन',
      content:
        'ग्रामपंचायत ठाणेपाड्याची स्थापना २५ मार्च १९५४ रोजी झाली. सरपंच व ११ सदस्य ग्राम विकास अधिकाऱ्यांच्या मदतीने मूलभूत सोयी-सुविधा व विकास योजना राबवतात. आतापर्यंत ११ सरपंचांनी गावाचे नेतृत्व केले असून कै. मंसारामतात्या पवार यांनी सर्वाधिक ३० वर्षे पद भूषविले. पहिल्या सरपंचपदाचा मान कै. गंगाराम तानाजी घुगे यांना मिळाला. गाव पेसा क्षेत्रात मोडत असून प्राथमिक आरोग्य उपकेंद्र, मासिक आरोग्य/नेत्र तपासणी शिबिरे आणि २७१५ मतदारांची सशक्त लोकशाही प्रक्रिया येथे कार्यरत आहे. जिल्हा परिषदेची प्राथमिक शाळा (१९३९ स्थापनेची) व के डी गावित शिक्षण संस्था १ ली ते १२ वी पर्यंत शिक्षण पुरवतात. एकूण १०३ विद्यार्थी प्राथमिक शाळेत, ४२१ विद्यार्थी प्राथमिक-माध्यमिक-उच्च माध्यमिक शाळेत आणि २६९ विद्यार्थी शासकीय इंग्रजी माध्यमात शिक्षण घेत आहेत. गावात सध्या सु. १०४ नोकरदार आणि ३६ सेवानिवृत्त मानकरी आहेत.'
    },
    {
      title: 'व्यवसाय',
      content:
        'ठाणेपाड्यात पोल्ट्री, किराणा, इलेक्ट्रिक मोटर रिवाइंडिंग, हॉटेल, रेस्टॉरंट, सलून, मिरची-मसाला कांडप, मेडिकल, टेलरिंग, कृषी सेवा, मोबाइल दुरुस्ती, लाँड्री, प्लंबिंग, इलेक्ट्रिशियन, भाजीविक्री, गिरणी, जनरल स्टोअर्स, रेडीमेड कपडे, पान दुकान, गवंडी, सुतार, लोहार, वेल्डिंग, पाईप सप्लाय, रंगकाम इत्यादी व्यवसाय सहज उपलब्ध आहेत. तरीही सु. ८५ कुटुंबे दरवर्षी ४-६ महिने ऊसतोडीसाठी स्थलांतर करतात. शेतीअभावी किंवा कोरडवाहू क्षेत्रामुळे ते आगाऊ रक्कम उचलून स्थलांतर करतात. शासनाच्या योजनांद्वारे अनुदानीत विहिरी, स्थानिक रोजगार व जनजागृतीने हे स्थलांतर कमी करण्याचे प्रयत्न सुरू आहेत. R-SETI ने ३५ महिलांना शिलाई प्रशिक्षण व २० युवकांना कुक्कुटपालन प्रशिक्षण देऊन स्वयंपर रोजगाराला चालना दिली आहे. पेसा निधी अंतर्गत बचत गटांना शिलाई मशीन, पिठाची गिरणी व स्टॉल उपलब्ध करून देण्यात आले आहेत.'
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

          <div className="mt-12 grid grid-cols-1 gap-8">
            {achievementSections.map((section) => (
              <div
                key={section.title}
                className="bg-white border border-gray-100 rounded-2xl shadow-lg p-6 md:p-8 space-y-4"
              >
                <h3 className="text-2xl font-bold text-teal-800">{section.title}</h3>
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;

