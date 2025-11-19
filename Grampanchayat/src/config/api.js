// API Configuration
// Debug: Log environment variable (remove in production)
console.log('VITE_API_BASE_URL from env:', import.meta.env.VITE_API_BASE_URL);
console.log('All VITE env vars:', Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')));
console.log('All env vars with values:', Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')).map(key => `${key}: ${import.meta.env[key]}`));

// API Base URL Configuration
// - Localhost: Always uses localhost backend (ignores env vars)
// - Production: Uses VITE_API_BASE_URL env var if set, otherwise falls back to Render backend
const getApiBaseUrl = () => {
  // If on localhost, ALWAYS use localhost backend (ignore env var for localhost)
  // This ensures local development always connects to local backend
  if (typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'http://localhost:5000/api';
  }
  
  // For production/Netlify: Use env var if set, otherwise use Render backend
  // Production deployments will have hostnames like gpjainagar.netlify.app, etc.
  // They should set VITE_API_BASE_URL in their Netlify/build environment variables
  return import.meta.env.VITE_API_BASE_URL || 'https://grampanchayat-website-project-code.onrender.com/api';
};

const API_BASE_URL = getApiBaseUrl();
console.log('Final API_BASE_URL:', API_BASE_URL);

// Village Domain Configuration
// - Localhost: Always returns "localhost" (ignores env vars)
// - Production: Uses VITE_VILLAGE_DOMAIN env var if set, otherwise uses actual hostname
const getVillageDomainFromEnv = () => {
  // If on localhost, ALWAYS return "localhost" (ignore env var for localhost)
  // This ensures local development always uses localhost database
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('localhost') || hostname.startsWith('127.0.0.1')) {
      return 'localhost';
    }
  }
  
  // For production: use env var if set, otherwise use hostname
  // Production deployments should set VITE_VILLAGE_DOMAIN to match their domain
  // Example: For gpjainagar.netlify.app, set VITE_VILLAGE_DOMAIN=gpjainagar.netlify.app
  if (import.meta.env.VITE_VILLAGE_DOMAIN) {
    return import.meta.env.VITE_VILLAGE_DOMAIN;
  }
  
  // Fallback: use current hostname (works for Netlify, custom domains, etc.)
  const hostname = window.location.hostname;
  return hostname.split(':')[0];
};

const VILLAGE_DOMAIN = getVillageDomainFromEnv();

/**
 * Get village domain from current URL
 */
export const getVillageDomain = () => {
  return VILLAGE_DOMAIN || window.location.hostname;
};

/**
 * Get API headers with village domain
 */
export const getHeaders = (includeAuth = false) => {
  const domain = getVillageDomain();
  console.log('API Request - Village Domain:', domain, 'Hostname:', window.location.hostname);
  
  const headers = {
    'Content-Type': 'application/json',
    'X-Village-Domain': domain,
  };

  if (includeAuth) {
    const token = localStorage.getItem('adminToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

/**
 * API request wrapper
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = getHeaders(options.requireAuth || false);

  const config = {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * API Methods
 */
export const api = {
  // Public endpoints
  getHomeData: () => apiRequest('/v1/data/home'),

  getQRCodes: () => apiRequest('/v1/data/qrcodes'),

  getImage: (imageId) => `${API_BASE_URL}/images/${imageId}`,

  submitComplaint: (complaintData) =>
    apiRequest('/complaints', {
      method: 'POST',
      body: JSON.stringify(complaintData),
    }),

  // Admin endpoints
  admin: {
    login: (email, password) =>
      apiRequest('/admin/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),

    register: (email, password) =>
      apiRequest('/admin/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),

    getHero: () => apiRequest('/admin/hero', { requireAuth: true }),

    updateHero: (data) =>
      apiRequest('/admin/hero', {
        method: 'PUT',
        body: JSON.stringify(data),
        requireAuth: true,
      }),

    getAbout: () => apiRequest('/admin/about', { requireAuth: true }),

    updateAbout: (data) =>
      apiRequest('/admin/about', {
        method: 'PUT',
        body: JSON.stringify(data),
        requireAuth: true,
      }),

    getOfficials: () => apiRequest('/admin/officials', { requireAuth: true }),

    createOfficial: (data) =>
      apiRequest('/admin/officials', {
        method: 'POST',
        body: JSON.stringify(data),
        requireAuth: true,
      }),

    updateOfficial: (id, data) =>
      apiRequest(`/admin/officials/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        requireAuth: true,
      }),

    deleteOfficial: (id) =>
      apiRequest(`/admin/officials/${id}`, {
        method: 'DELETE',
        requireAuth: true,
      }),

    getComplaints: (page = 1, limit = 20, status = null) => {
      const params = new URLSearchParams({ page, limit });
      if (status) params.append('status', status);
      return apiRequest(`/admin/complaints?${params}`, { requireAuth: true });
    },

    getComplaint: (id) =>
      apiRequest(`/admin/complaints/${id}`, { requireAuth: true }),

    updateComplaintStatus: (id, status) =>
      apiRequest(`/admin/complaints/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
        requireAuth: true,
      }),

    uploadImage: async (file, component, category = null, altText = '', order = 0) => {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('component', component);
      if (category) formData.append('category', category);
      formData.append('altText', altText);
      formData.append('order', order);

      const headers = getHeaders(true);
      delete headers['Content-Type']; // Let browser set Content-Type for FormData

      const response = await fetch(`${API_BASE_URL}/admin/images/upload`, {
        method: 'POST',
        headers,
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Image upload failed');
      }
      return data;
    },

    getImages: (component) =>
      apiRequest(`/admin/images/component/${component}`, { requireAuth: true }),

    updateImage: (id, data) =>
      apiRequest(`/admin/images/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        requireAuth: true,
      }),

    deleteImage: (id) =>
      apiRequest(`/admin/images/${id}`, {
        method: 'DELETE',
        requireAuth: true,
      }),

    getQRCodes: () => apiRequest('/admin/qrcodes', { requireAuth: true }),

    getQRCode: (id) =>
      apiRequest(`/admin/qrcodes/${id}`, { requireAuth: true }),

    createQRCode: (data) =>
      apiRequest('/admin/qrcodes', {
        method: 'POST',
        body: JSON.stringify(data),
        requireAuth: true,
      }),

    updateQRCode: (id, data) =>
      apiRequest(`/admin/qrcodes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        requireAuth: true,
      }),

    deleteQRCode: (id) =>
      apiRequest(`/admin/qrcodes/${id}`, {
        method: 'DELETE',
        requireAuth: true,
      }),
  },
};

export default api;

