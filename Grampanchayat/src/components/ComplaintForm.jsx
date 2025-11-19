import { useState } from 'react';

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    complaintType: '',
    description: '',
  });

  const complaintTypes = [
    'कामातील त्रुटी आणि अनियमितता',
    'नियमबाह्य कामे',
    'कर्मचाऱ्यांचे गैरवर्तन',
    'माहिती न देणे',
    'अस्वच्छता आणि आरोग्य',
    'गैरकारभार व भ्रष्टाचाराची प्रकरणे',
    'अयोग्य शुल्क आकारणी',
    'ग्रामसभेच्या निर्णयांचे उल्लंघन',
    'अवैध बांधकामे',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Complaint submitted:', formData);
    alert('तक्रार नोंदवण्यात आली आहे. धन्यवाद!');
    setFormData({
      name: '',
      phone: '',
      email: '',
      complaintType: '',
      description: '',
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="complaint" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              आपला आवाज, आमचे कर्तव्य!
            </h2>
            <p className="text-lg text-gray-700">
              "आपल्या गावातील कोणतीही अडचण किंवा समस्या ग्रामपंचायतीपर्यंत पोहोचवण्यासाठी ही सुविधा उपलब्ध आहे. तक्रार नोंदवा आणि आम्हाला कार्यवाही करण्याची संधी द्या."
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 shadow-md">
            <h3 className="text-2xl font-bold mb-6 text-center text-blue-600">
              तक्रार निवारण फॉर्म
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  नाव
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                  फोन नंबर
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  ईमेल
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="complaintType" className="block text-gray-700 font-medium mb-2">
                  तक्रारीचा प्रकार
                </label>
                <select
                  id="complaintType"
                  name="complaintType"
                  value={formData.complaintType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">निवडा तक्रारीचा प्रकार</option>
                  {complaintTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                  तक्रारीचे वर्णन
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
              >
                तक्रार नोंदवा
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplaintForm;

