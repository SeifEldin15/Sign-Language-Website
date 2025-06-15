// utils/api.js
import { API_BASE_URL, CATEGORY_MAP } from '../config/constants';

// API utility function with error handling
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  const response = await fetch(url, config);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Error handler for API calls
export const handleApiError = (error, fallbackMessage = 'An error occurred') => {
  console.error('API Error:', error);
  return error.message || fallbackMessage;
};

// Category mapping function - maps frontend slugs to database category IDs
export const getCategoryIdBySlug = (slug) => {
  return CATEGORY_MAP[slug] || null;
};

// API methods
export const api = {
  // Question endpoints
  questions: {
    getByLevel: (levelId) => apiCall(`/question/level/${levelId}`),
    getAll: () => apiCall('/question'),
    getById: (id) => apiCall(`/question/${id}`),
  },
  
  // Level endpoints
  levels: {
    getAll: () => apiCall('/level'),
    getById: (id) => apiCall(`/level/${id}`),
    getByCategory: (categoryId) => apiCall(`/category/${categoryId}/level`),
  },
  
  // Category endpoints
  categories: {
    getAll: (token) => apiCall('/category', {
      headers: { token }
    }),
    getById: (id) => apiCall(`/category/${id}`),
  },
  
  // Sign endpoints
  signs: {
    getAll: () => apiCall('/sign'),
    getById: (id) => apiCall(`/sign/${id}`),
  },
  
  // User progress endpoints
  user: {
    getProgress: (userId) => apiCall('/user/progress', {
      headers: { userid: userId }
    }),
    updateProgress: (userId, progressData) => apiCall('/user/progress/update', {
      method: 'PUT',
      headers: { 
        userid: userId,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(progressData),
    }),
    updateQuestionProgress: (userId) => apiCall('/user/progress/question', {
      method: 'PUT',
      headers: { 
        userid: userId,
        'Content-Type': 'application/json'
      },
    }),
    completeLevel: (userId) => apiCall('/user/progress/complete', {
      method: 'PUT',
      headers: { 
        userid: userId,
        'Content-Type': 'application/json'
      },
    }),
  },
  
  // Mistake endpoints (for tracking user mistakes)
  mistakes: {
    getAll: () => apiCall('/mistake'),
    create: (mistakeData) => apiCall('/mistake', {
      method: 'POST',
      body: JSON.stringify(mistakeData),
    }),
  }
};

// Helper functions
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// User session helpers
export const userSession = {
  setUserId: (userId) => {
    localStorage.setItem('userId', userId);
  },
  getUserId: () => {
    return localStorage.getItem('userId');
  },
  clearUserId: () => {
    localStorage.removeItem('userId');
  },
  isLoggedIn: () => {
    return !!localStorage.getItem('userId');
  }
};

// Constants
export const API_ENDPOINTS = {
  QUESTIONS: '/question',
  LEVELS: '/level',
  CATEGORIES: '/category',
  SIGNS: '/sign',
  MISTAKES: '/mistake',
  USER: '/user',
  USER_PROGRESS: '/user/progress',
};

export default api; 