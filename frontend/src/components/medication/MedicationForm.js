import React from 'react';
import './MedicationForm.css';

export default function MedicationForm({ medication, onSubmit, onCancel }) {
  const [formData, setFormData] = React.useState({
    medicine: '',
    dosage: '',
    frequency: '',
    startDate: '',
    endDate: '',
    notes: '',
    ...medication
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="medication-form">
      <div className="form-group">
        <label>Medicine Name</label>
        <input
          type="text"
          name="medicine"
          value={formData.medicine}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Dosage</label>
        <input
          type="text"
          name="dosage"
          value={formData.dosage}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Frequency</label>
        <select
          name="frequency"
          value={formData.frequency}
          onChange={handleChange}
          required
        >
          <option value="">Select frequency</option>
          <option value="Once daily">Once daily</option>
          <option value="Twice daily">Twice daily</option>
          <option value="Three times daily">Three times daily</option>
          <option value="As needed">As needed</option>
        </select>
      </div>

      <div className="form-row">
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
          <label>End Date (optional)</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Notes (optional)</label>
        <textarea
          name="notes"
          value={formData.notes || ''}
          onChange={handleChange}
          rows="3"
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
        <button type="submit" className="submit-btn">
          Save Medication
        </button>
      </div>
    </form>
  );
}