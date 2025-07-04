const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// API request helper
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

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Unable to connect to server. Please check if the server is running.');
    }
    throw error;
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