import { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Home from './components/home/Home';
import AboutPage from './components/pages/AboutPage';
import NewsPage from './components/pages/NewsPage';
import AwardsPage from './components/pages/AwardsPage';
import TourismPage from './components/pages/TourismPage';
import GalleryPage from './components/pages/GalleryPage';
import TemplePage from './components/pages/TemplePage';
import HealthPage from './components/pages/HealthPage';
import SchoolPage from './components/pages/SchoolPage';
import AgriculturePage from './components/pages/AgriculturePage';
import NoticeBoardPage from './components/pages/NoticeBoardPage';
import VillageInfoPage from './components/pages/VillageInfoPage';
import VeterinaryPage from './components/pages/VeterinaryPage';
import SavingsGroupPage from './components/pages/SavingsGroupPage';
import SchemesPage from './components/pages/SchemesPage';
import ContactPage from './components/pages/ContactPage';
import ComplaintModal from './components/ComplaintModal';
import Footer from './components/Footer';
import FloatingComplaintButton from './components/FloatingComplaintButton';
// Admin components
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  // Handle hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home';
      setCurrentPage(hash);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    // Admin routes
    if (currentPage === 'admin-login') {
      return <AdminLogin />;
    }
    if (currentPage === 'admin-dashboard') {
      return (
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      );
    }

    // Public routes
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'about':
        return <AboutPage />;
      case 'news':
        return <NewsPage />;
      case 'awards':
        return <AwardsPage />;
      case 'tourism':
        return <TourismPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'temple':
        return <TemplePage />;
      case 'health':
        return <HealthPage />;
      case 'school':
        return <SchoolPage />;
      case 'agriculture':
        return <AgriculturePage />;
      case 'notice':
        return <NoticeBoardPage />;
      case 'village-info':
        return <VillageInfoPage />;
      case 'veterinary':
        return <VeterinaryPage />;
      case 'savings-group':
        return <SavingsGroupPage />;
      case 'schemes':
        return <SchemesPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <Home />;
    }
  };

  // Don't show header/footer for admin pages
  const isAdminPage = currentPage === 'admin-login' || currentPage === 'admin-dashboard';

  return (
    <div className="min-h-screen">
      {!isAdminPage && (
        <>
          <Header />
          <Navigation 
            onOpenComplaint={() => setIsComplaintModalOpen(true)}
          />
        </>
      )}
      {renderPage()}
      {!isAdminPage && (
        <>
          <Footer />
          <FloatingComplaintButton onOpenComplaint={() => setIsComplaintModalOpen(true)} />
          <ComplaintModal 
            isOpen={isComplaintModalOpen} 
            onClose={() => setIsComplaintModalOpen(false)} 
          />
        </>
      )}
    </div>
  );
}

export default App;
