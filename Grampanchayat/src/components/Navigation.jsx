import { useState } from 'react';
import logo from '../images/logo.png';

const Navigation = ({ onOpenComplaint }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'होम', link: '#home' },
    { label: 'आमच्याबद्दल', link: '#about' },
    { label: 'न्युज/अपडेट्स', link: '#news' },
    { label: 'पुरस्कार / यशोगाथा', link: '#awards' },
    { label: 'पर्यटन स्थळ', link: '#tourism' },
    { label: 'फोटो गॅलरी', link: '#gallery' },
    {
      label: 'इतर',
      submenu: [
        { label: 'मंदिर', link: '#temple' },
        { label: 'आरोग्य दवाखाने', link: '#health' },
        { label: 'शाळा', link: '#school' },
        { label: 'शेती', link: '#agriculture' },
        { label: 'सूचना फलक', link: '#notice' },
        { label: 'गावाची माहिती', link: '#village-info' },
        { label: 'पशुवैद्यकीय दवाखाने', link: '#veterinary' },
        { label: 'बचत गट माहिती', link: '#savings-group' },
        { label: 'लोकप्रिय योजना', link: '#schemes' },
        { label: 'Admin', link: '#admin-login' },
      ],
    },
    { label: 'संपर्क साधा', link: '#contact' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Left Side - Logo and Village Name */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="logo" className="w-12 h-12 object-cover rounded-full shadow-md" />
            <div className="text-left">
              <div className="text-lg md:text-xl font-bold text-gray-800">
                XXXXXXXX ग्रामपंचायत
              </div>
              <div className="text-sm md:text-sm text-gray-600">
                पंचायत समिती चांदवड, तालुका चांदवड, जि.नाशिक
              </div>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-5">
              {menuItems.map((item, index) => (
                <li key={index} className="relative group">
                  <a
                    href={item.link || '#'}
                    className="text-gray-700 hover:text-teal-600 transition py-2 block text-sm font-medium"
                  >
                    {item.label}
                  </a>
                  {item.submenu && (
                    <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-100">
                      {item.submenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <a
                            href={subItem.link}
                            className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition text-sm"
                          >
                            {subItem.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            
            {/* Complaint Button */}
            <button
              onClick={onOpenComplaint}
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition text-sm font-medium"
            >
              <span>तक्रार नोंदवा</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 mt-3 pt-3">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link || '#'}
                    className="block py-2 text-gray-700 hover:text-teal-600 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                  {item.submenu && (
                    <ul className="pl-4 mt-2 space-y-1">
                      {item.submenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <a
                            href={subItem.link}
                            className="block py-1 text-sm text-gray-600 hover:text-teal-600 transition"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                onOpenComplaint();
              }}
              className="w-full mt-4 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 transition"
            >
              <span>तक्रार नोंदवा</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
