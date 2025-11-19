import { useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { hasPermission } from '../../utils/permissions';
import AdminLogin from './AdminLogin';

const ProtectedRoute = ({ children, requiredPermission = null }) => {
  const { admin, isAuthenticated, loading } = useAdmin();

  useEffect(() => {
    // Redirect to admin login if not authenticated
    if (!loading && !isAuthenticated) {
      // Update hash to admin login
      if (window.location.hash !== '#admin-login') {
        window.location.hash = 'admin-login';
      }
    }
  }, [isAuthenticated, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">लोड होत आहे...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  // Check permissions if required
  if (requiredPermission && !hasPermission(admin, requiredPermission)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-700 mb-4">
            You don't have permission to access this section.
          </p>
          <button
            onClick={() => (window.location.hash = 'admin-dashboard')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;

