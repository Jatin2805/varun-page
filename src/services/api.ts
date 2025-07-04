// Environment-based API URL configuration
const getApiBaseUrl = () => {
  // In development, try environment variable first, then fallback
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  }
  
  // In production, use environment variable or relative path
  return import.meta.env.VITE_API_URL || '/api';
};

const API_BASE_URL = getApiBaseUrl();

// Debug logging
console.log('🔧 API Configuration:');
console.log('Environment:', import.meta.env.MODE);
console.log('API Base URL:', API_BASE_URL);
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// API request helper with enhanced error handling
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const fullUrl = `${API_BASE_URL}${endpoint}`;

  try {
    console.log(`🌐 Making API request to: ${fullUrl}`);
    console.log('Request config:', {
      method: config.method || 'GET',
      headers: config.headers,
      body: config.body ? 'Present' : 'None'
    });

    const response = await fetch(fullUrl, config);
    
    console.log(`📡 Response status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
        console.log('❌ Error response data:', errorData);
      } catch (parseError) {
        console.log('❌ Failed to parse error response:', parseError);
        errorData = { 
          message: `HTTP error! status: ${response.status}`,
          status: response.status,
          statusText: response.statusText
        };
      }
      
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ API response:', data);
    return data;
    
  } catch (error) {
    console.error('🚨 API Request Error:', error);
    
    // Network/Connection errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      const networkError = new Error(
        `Unable to connect to server at ${API_BASE_URL}. Please ensure:\n` +
        `1. Backend server is running on http://localhost:5000\n` +
        `2. No firewall is blocking the connection\n` +
        `3. CORS is properly configured`
      );
      networkError.name = 'NetworkError';
      throw networkError;
    }
    
    // CORS errors
    if (error instanceof TypeError && error.message.includes('CORS')) {
      const corsError = new Error(
        'CORS error detected. Please check:\n' +
        '1. Server CORS configuration\n' +
        '2. Frontend origin is allowed\n' +
        '3. Preflight requests are handled'
      );
      corsError.name = 'CORSError';
      throw corsError;
    }
    
    // Re-throw known errors
    if (error instanceof Error) {
      throw error;
    }
    
    // Unknown errors
    throw new Error('An unexpected error occurred during API request');
  }
};

// Test API connection
export const testConnection = async () => {
  try {
    console.log('🔍 Testing API connection...');
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/api/health`);
    const data = await response.json();
    console.log('✅ API connection test successful:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ API connection test failed:', error);
    return { success: false, error: error.message };
  }
};

// Auth API
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  register: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  getProfile: () => apiRequest('/auth/me'),
};

// Funnels API
export const funnelsAPI = {
  getAll: () => apiRequest('/funnels'),
  
  getById: (id: string) => apiRequest(`/funnels/${id}`),
  
  create: (funnelData: any) =>
    apiRequest('/funnels', {
      method: 'POST',
      body: JSON.stringify(funnelData),
    }),
  
  update: (id: string, funnelData: any) =>
    apiRequest(`/funnels/${id}`, {
      method: 'PUT',
      body: JSON.stringify(funnelData),
    }),
  
  delete: (id: string) =>
    apiRequest(`/funnels/${id}`, {
      method: 'DELETE',
    }),
  
  publish: (id: string) =>
    apiRequest(`/funnels/${id}/publish`, {
      method: 'PUT',
    }),
};

// Analytics API
export const analyticsAPI = {
  getDashboard: (period = '30') =>
    apiRequest(`/analytics/dashboard?period=${period}`),
  
  getFunnelAnalytics: (funnelId: string, period = '30') =>
    apiRequest(`/analytics/funnel/${funnelId}?period=${period}`),
  
  track: (eventData: {
    funnelId: string;
    event: string;
    data?: any;
  }) =>
    apiRequest('/analytics/track', {
      method: 'POST',
      body: JSON.stringify(eventData),
    }),
};

// Templates API
export const templatesAPI = {
  getAll: (params?: {
    category?: string;
    featured?: boolean;
    search?: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append('category', params.category);
    if (params?.featured) searchParams.append('featured', 'true');
    if (params?.search) searchParams.append('search', params.search);
    
    const queryString = searchParams.toString();
    return apiRequest(`/templates${queryString ? `?${queryString}` : ''}`);
  },
  
  getById: (id: string) => apiRequest(`/templates/${id}`),
  
  use: (id: string) =>
    apiRequest(`/templates/${id}/use`, {
      method: 'POST',
    }),
};

// Users API
export const usersAPI = {
  updateProfile: (profileData: {
    firstName: string;
    lastName: string;
    phone?: string;
    bio?: string;
  }) =>
    apiRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    }),
  
  updatePassword: (passwordData: {
    currentPassword: string;
    newPassword: string;
  }) =>
    apiRequest('/users/password', {
      method: 'PUT',
      body: JSON.stringify(passwordData),
    }),
};