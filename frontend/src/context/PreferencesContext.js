// src/context/PreferencesContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const PreferencesContext = createContext();

export const PreferencesProvider = ({ children }) => {
  // Load preferences from localStorage or use defaults
  const loadPreferences = () => {
    try {
      const savedPrefs = localStorage.getItem('ovapalPreferences');
      return savedPrefs ? JSON.parse(savedPrefs) : {
        theme: 'light',
        notifications: true,
        medicationReminders: true,
        periodReminders: true,
        fontSize: 'normal',
        language: 'en',
        firstDayOfWeek: 0 // Sunday
      };
    } catch (error) {
      console.error('Failed to load preferences', error);
      return getDefaultPreferences();
    }
  };

  const getDefaultPreferences = () => ({
    theme: 'light',
    notifications: true,
    medicationReminders: true,
    periodReminders: true,
    fontSize: 'normal',
    language: 'en',
    firstDayOfWeek: 0
  });

  const [prefs, setPrefs] = useState(loadPreferences());

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('ovapalPreferences', JSON.stringify(prefs));
  }, [prefs]);

  // Update specific preferences while keeping others
  const updatePreferences = (newPrefs) => {
    setPrefs(prev => ({ ...prev, ...newPrefs }));
  };

  // Reset to default preferences
  const resetPreferences = () => {
    setPrefs(getDefaultPreferences());
  };

  return (
    <PreferencesContext.Provider value={{
      prefs,
      updatePreferences,
      resetPreferences,
      toggleTheme: () => updatePreferences({ theme: prefs.theme === 'light' ? 'dark' : 'light' }),
      toggleNotifications: () => updatePreferences({ notifications: !prefs.notifications })
    }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};