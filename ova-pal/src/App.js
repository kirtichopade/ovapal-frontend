import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PreferencesProvider } from './context/PreferencesContext'; // Add this import
import PrivateRoute from './components/shared/PrivateRoute';
import Layout from './components/shared/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PeriodTracker from './pages/PeriodTracker';
import HealthRecords from './pages/HealthRecords';
import Medications from './pages/Medications';
import Reminders from './pages/Reminders';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <PreferencesProvider> {/* Wrap with PreferencesProvider */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="period" element={<PrivateRoute><PeriodTracker /></PrivateRoute>} />
            <Route path="health" element={<PrivateRoute><HealthRecords /></PrivateRoute>} />
            <Route path="medications" element={<PrivateRoute><Medications /></PrivateRoute>} />
            <Route path="reminders" element={<PrivateRoute><Reminders /></PrivateRoute>} />
          </Route>
        </Routes>
      </PreferencesProvider>
    </AuthProvider>
  );
}

export default App;