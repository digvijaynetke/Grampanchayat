import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { hasPermission, PERMISSIONS } from '../../utils/permissions';
import HeroEditor from './HeroEditor';
import AboutEditor from './AboutEditor';
import LeadershipManager from './LeadershipManager';
import ComplaintsList from './ComplaintsList';
import QRCodeEditor from './QRCodeEditor';

const AdminDashboard = () => {
  const { admin, logout } = useAdmin();
  const [activeSection, setActiveSection] = useState('hero');

  // Filter sections based on permissions
  const allSections = [
    { id: 'hero', label: 'Hero Section', icon: '🏠', permission: PERMISSIONS.MANAGE_HERO },
    { id: 'about', label: 'About Section', icon: '📝', permission: PERMISSIONS.MANAGE_ABOUT },
    { id: 'leadership', label: 'Leadership', icon: '👥', permission: PERMISSIONS.MANAGE_LEADERSHIP },
    { id: 'qrcodes', label: 'QR Codes', icon: '📱', permission: PERMISSIONS.UPLOAD_IMAGES },
    { id: 'complaints', label: 'Complaints', icon: '📋', permission: PERMISSIONS.VIEW_COMPLAINTS },
  ];

  const sections = allSections.filter(section => 
    hasPermission(admin, section.permission)
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'hero':
        return <HeroEditor />;
      case 'about':
        return <AboutEditor />;
      case 'leadership':
        return <LeadershipManager />;
      case 'qrcodes':
        return <QRCodeEditor />;
      case 'complaints':
        return <ComplaintsList />;
      default:
        return <HeroEditor />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
            <button
              onClick={() => {
                logout();
                window.location.hash = 'home';
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64">
            <nav className="bg-white rounded-lg shadow-sm p-4">
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-md transition ${
                        activeSection === section.id
                          ? 'bg-blue-100 text-blue-700 font-semibold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-2">{section.icon}</span>
                      {section.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

