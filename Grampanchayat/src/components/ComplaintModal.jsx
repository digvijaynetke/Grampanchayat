import { useState } from 'react';
import api from '../config/api';

const ComplaintModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    complaintType: '',
    description: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      await api.submitComplaint({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.complaintType,
        message: formData.description,
      });

      setSubmitSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        complaintType: '',
        description: '',
      });

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error submitting complaint:', error);
      setSubmitError(error.message || 'तक्रार नोंदवताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition"
          aria-label="Close"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Form Content */}
        <div className="p-6 md:p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              आपला आवाज, आमचे कर्तव्य!
            </h2>
            <p className="text-lg text-gray-700">
              "आपल्या गावातील कोणतीही अडचण किंवा समस्या ग्रामपंचायतीपर्यंत पोहोचवण्यासाठी ही सुविधा उपलब्ध आहे. तक्रार नोंदवा आणि आम्हाला कार्यवाही करण्याची संधी द्या."
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 md:p-8 shadow-md">
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

              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  {submitError}
                </div>
              )}

              {submitSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                  तक्रार नोंदवण्यात आली आहे. धन्यवाद!
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {submitting ? 'नोंदवत आहे...' : 'तक्रार नोंदवा'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintModal;

