import React, { useState, useEffect } from 'react';
import './PeriodForm.css';

const PeriodForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    flow: 'Medium',
    symptoms: '',
    mood: '',
    notes: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        startDate: initialData.startDate || '',
        endDate: initialData.endDate || '',
        flow: initialData.flow || 'Medium',
        symptoms: initialData.symptoms || '',
        mood: initialData.mood || '',
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
    onSubmit(formData);
  };

  return (
    <form className="period-form" onSubmit={handleSubmit}>
      <h3>{initialData.periodRecId ? 'Edit Period' : 'Add New Period'}</h3>
      
      <div className="form-group">
        <label>Start Date</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>End Date</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
          min={formData.startDate}
        />
      </div>
      
      <div className="form-group">
        <label>Flow</label>
        <select
          name="flow"
          value={formData.flow}
          onChange={handleChange}
          required
        >
          <option value="Light">Light</option>
          <option value="Medium">Medium</option>
          <option value="Heavy">Heavy</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Symptoms</label>
        <input
          type="text"
          name="symptoms"
          value={formData.symptoms}
          onChange={handleChange}
          placeholder="Cramps, headaches, etc."
        />
      </div>
      
      <div className="form-group">
        <label>Mood</label>
        <input
          type="text"
          name="mood"
          value={formData.mood}
          onChange={handleChange}
          placeholder="Happy, tired, etc."
        />
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
          {initialData.periodRecId ? 'Update' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default PeriodForm;