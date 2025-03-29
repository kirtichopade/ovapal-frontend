import React, { useState, useEffect } from 'react';
import './HealthRecordForm.css';

const HealthRecordForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    recordDate: '',
    weight: '',
    height: '',
    temperature: '',
    heartRate: '',
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    notes: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        recordDate: initialData.recordDate || '',
        weight: initialData.weight || '',
        height: initialData.height || '',
        temperature: initialData.temperature || '',
        heartRate: initialData.heartRate || '',
        bloodPressureSystolic: initialData.bloodPressureSystolic || '',
        bloodPressureDiastolic: initialData.bloodPressureDiastolic || '',
        notes: initialData.notes || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      temperature: parseFloat(formData.temperature),
      heartRate: parseInt(formData.heartRate),
      bloodPressureSystolic: parseInt(formData.bloodPressureSystolic),
      bloodPressureDiastolic: parseInt(formData.bloodPressureDiastolic)
    });
  };

  return (
    <form className="health-record-form" onSubmit={handleSubmit}>
      <h3>{initialData.healthId ? 'Edit Health Record' : 'Add Health Record'}</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="recordDate"
            value={formData.recordDate}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Weight (kg)</label>
          <input
            type="number"
            step="0.1"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Height (cm)</label>
          <input
            type="number"
            step="0.1"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Temperature (°C)</label>
          <input
            type="number"
            step="0.1"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Heart Rate (bpm)</label>
          <input
            type="number"
            name="heartRate"
            value={formData.heartRate}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Blood Pressure</label>
          <div className="bp-inputs">
            <input
              type="number"
              name="bloodPressureSystolic"
              placeholder="Systolic"
              value={formData.bloodPressureSystolic}
              onChange={handleChange}
              required
            />
            <span>/</span>
            <input
              type="number"
              name="bloodPressureDiastolic"
              placeholder="Diastolic"
              value={formData.bloodPressureDiastolic}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>
      
      <div className="form-group">
        <label>Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Any additional notes..."
        />
      </div>
      
      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="submit-btn">
          {initialData.healthId ? 'Update' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default HealthRecordForm;