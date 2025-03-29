import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import MedicationForm from './MedicationForm';
import MedicationList from './MedicationList';
import {
  getMedications,
  addMedication,
  updateMedication,
  deleteMedication
} from '../api/medication';
import './MedicationManager.css';

const MedicationManager = () => {
  const { user } = useAuth();
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingMed, setEditingMed] = useState(null);

  useEffect(() => {
    const loadMedications = async () => {
      if (!user?.userId) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        const data = await getMedications(user.userId);
        setMedications(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMedications();
  }, [user?.userId]);

  const handleSubmit = async (medicationData) => {
    try {
      if (editingMed?.medicationId) {
        await updateMedication(editingMed.medicationId, medicationData);
      } else {
        await addMedication({ ...medicationData, userId: user.userId });
      }
      // Refresh the list after successful operation
      const updatedData = await getMedications(user.userId);
      setMedications(updatedData);
      setEditingMed(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (medicationId) => {
    try {
      await deleteMedication(medicationId);
      // Refresh the list after successful deletion
      const updatedData = await getMedications(user.userId);
      setMedications(updatedData);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div className="loading">Loading medications...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="medication-manager">
      <div className="medication-header">
        <h2>Medications</h2>
        <button
          onClick={() => setEditingMed({})}
          className="add-medication-btn"
        >
          + Add Medication
        </button>
      </div>

      {editingMed && (
        <MedicationForm
          medication={editingMed}
          onSubmit={handleSubmit}
          onCancel={() => setEditingMed(null)}
        />
      )}

      <MedicationList
        medications={medications}
        onEdit={setEditingMed}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default MedicationManager;