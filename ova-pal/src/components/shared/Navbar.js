import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaHeartbeat, FaPills, FaBell } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>OvaPal</h1>
      </div>
      <ul className="navbar-menu">
        <li>
          <Link to="/">
            <FaHome /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/period">
            <FaCalendarAlt /> Period Tracker
          </Link>
        </li>
        <li>
          <Link to="/health">
            <FaHeartbeat /> Health Records
          </Link>
        </li>
        <li>
          <Link to="/medications">
            <FaPills /> Medications
          </Link>
        </li>
        <li>
          <Link to="/reminders">
            <FaBell /> Reminders
          </Link>
        </li>
      </ul>
      <div className="navbar-user">
        {user && (
          <>
            <span>Welcome, {user.name}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;