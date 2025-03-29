import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePreferences } from '../context/PreferencesContext';
import { 
  getMedications, 
  addMedication, 
  updateMedication, 
  deleteMedication 
} from '../api/medication';
import { 
  requestNotificationPermission,
  scheduleMedicationReminders
} from '../utils/notifications';
import MedicationForm from '../components/medication/MedicationForm';
import MedicationList from '../components/medication/MedicationList';
import './Medications.css';

const Medications = () => {
  const { user } = useAuth();
  const { prefs = { notifications: true } } = usePreferences(); // Safe default
  const [state, setState] = useState({
    medications: [],
    loading: true,
    error: null,
    showForm: false,
    editingMed: null
  });

  useEffect(() => {
    const loadMedications = async () => {
      try {
        const data = await getMedications(user.userId);
        setState(prev => ({ ...prev, medications: data, loading: false }));
        
        // Check notifications preference safely
        if (prefs?.notifications) {
          requestNotificationPermission().then(hasPermission => {
            if (hasPermission) {
              scheduleMedicationReminders(data.filter(m => m.reminderTime));
            }
          });
        }
      } catch (error) {
        setState(prev => ({ ...prev, error: error.message, loading: false }));
      }
    };

    loadMedications();
  }, [user, prefs?.notifications]);

  const handleSave = async (formData) => {
    try {
      let updatedMed, updatedList;
      
      if (state.editingMed) {
        updatedMed = await updateMedication(state.editingMed.medicineid, formData);
        updatedList = state.medications.map(m => 
          m.medicineid === updatedMed.medicineid ? updatedMed : m
        );
      } else {
        updatedMed = await addMedication({ userId: user.userId, ...formData });
        updatedList = [...state.medications, updatedMed];
      }

      setState(prev => ({
        ...prev,
        medications: updatedList,
        showForm: false,
        editingMed: null
      }));

      if (prefs?.notifications && formData.reminderTime) {
        requestNotificationPermission().then(hasPermission => {
          if (hasPermission) scheduleMedicationReminders([updatedMed]);
        });
      }
    } catch (error) {
      setState(prev => ({ ...prev, error: error.message }));
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMedication(id);
      setState(prev => ({
        ...prev,
        medications: prev.medications.filter(m => m.medicineid !== id)
      }));
    } catch (error) {
      setState(prev => ({ ...prev, error: error.message }));
    }
  };

  if (state.loading) return <div className="loading">Loading medications...</div>;
  if (state.error) return <div className="error">{state.error}</div>;

  return (
    <div className="medications-page">
      <h1>Medications</h1>
      
      <button 
        className="add-btn"
        onClick={() => setState(prev => ({ ...prev, showForm: true, editingMed: null }))}
      >
        + Add Medication
      </button>

      {state.showForm && (
        <MedicationForm
          medication={state.editingMed}
          onSubmit={handleSave}
          onCancel={() => setState(prev => ({ ...prev, showForm: false, editingMed: null }))}
        />
      )}

      <MedicationList
        medications={state.medications}
        onEdit={(med) => setState(prev => ({ ...prev, showForm: true, editingMed: med }))}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Medications;