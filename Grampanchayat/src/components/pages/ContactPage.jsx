import PageHero from '../PageHero';
import gavImage from '../../images/gav.jpg';

const ContactPage = () => {
  return (
    <div>
      <PageHero 
        title="संपर्क साधा" 
        subtitle="माहिती"
        image={gavImage}
      />
      <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Dotted Line */}
          <div className="flex justify-center mb-4">
            <div className="w-32 border-t-2 border-dotted border-gray-400"></div>
          </div>

          {/* Sub-heading */}
          <p className="text-sm text-gray-500 text-center mb-2">माहिती</p>

          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-teal-800">
            संपर्क साधा
          </h2>

          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">आमच्याशी संपर्क साधा</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">फोन नंबर</h4>
                      <a href="tel:+91XXXXXXXX" className="text-gray-600 hover:text-teal-600 transition">
                        +91 XXXXXXXX
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">ईमेल</h4>
                      <a href="mailto:chdvadalibhoi@gmail.com" className="text-gray-600 hover:text-teal-600 transition">
                        chdvadalibhoi@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">पत्ता</h4>
                      <p className="text-gray-600">
                        At/Post-XXXXXXXX<br />
                        तालुका-चांदवड<br />
                        जिल्हा-नाशिक
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">संदेश पाठवा</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      नाव
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                      संदेश
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-teal-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-teal-700 transition duration-300"
                  >
                    संदेश पाठवा
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default ContactPage;

