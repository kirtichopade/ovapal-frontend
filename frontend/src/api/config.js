import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/ovapal',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Simplified error handling
api.interceptors.response.use(
  response => response,
  error => {
    const errorMessage = error.response?.data?.message || 
                       error.message || 
                       'Network error occurred';
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;