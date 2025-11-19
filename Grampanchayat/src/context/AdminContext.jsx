import { createContext, useContext, useState, useEffect } from 'react';
import api from '../config/api';

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if admin is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      // Token exists, verify it's still valid by trying to fetch admin data
      // For now, just set authenticated if token exists
      // You can add a verify endpoint later
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.admin.login(email, password);
      if (response.success && response.token) {
        localStorage.setItem('adminToken', response.token);
        // Store admin with role and permissions
        const adminData = {
          ...response.admin,
          role: response.admin.role || 'admin',
          permissions: response.admin.permissions || []
        };
        setAdmin(adminData);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, message: response.message || 'Login failed' };
    } catch (error) {
      return { success: false, message: error.message || 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setAdmin(null);
    setIsAuthenticated(false);
  };

  const value = {
    admin,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

