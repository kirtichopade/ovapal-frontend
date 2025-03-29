import api from './config';

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    
    // Store authentication token
    localStorage.setItem('authToken', response.data.token);
    
    // Store complete user data
    const userData = {
      userId: response.data.userId || response.data.id,
      name: response.data.name,
      email: response.data.email,
      ...(response.data.user || {}) // Include any additional user fields
    };
    localStorage.setItem('user', JSON.stringify(userData));
    
    return {
      success: true,
      user: userData,
      token: response.data.token
    };
  } catch (error) {
    // Clear storage on error
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    
    // Auto-login after registration
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return {
      success: true,
      user: response.data.user,
      token: response.data.token
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

export const logoutUser = () => {
  // Clear all auth-related storage
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};