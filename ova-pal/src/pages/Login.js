import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../api/auth';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading when submission starts
    setError(''); // Clear previous errors
    
    try {
      const userData = await loginUser({ email, password });
      login(userData);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.'); // More detailed error
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to OvaPal</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading} // Disable during loading
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading} // Disable during loading
            />
          </div>
          <button 
            type="submit" 
            className="auth-btn"
            disabled={loading} // Disable during loading
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="auth-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
        <p className="auth-link">
          <Link to="/forgot-password">Forgot password?</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;