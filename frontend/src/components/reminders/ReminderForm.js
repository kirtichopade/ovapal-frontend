import React, { useState } from 'react';
import { FaCalendarAlt, FaClock, FaBell, FaRedo } from 'react-icons/fa';
import './ReminderForm.css';

const ReminderForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    reminderDate: '',
    reminderTime: '',
    isRepeating: false,
    repeatFrequency: 'daily',
    isActive: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="reminder-form-container">
      <h2>Add New Reminder</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label><FaCalendarAlt /> Date</label>
            <input
              type="date"
              name="reminderDate"
              value={formData.reminderDate}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="form-group">
            <label><FaClock /> Time</label>
            <input
              type="time"
              name="reminderTime"
              value={formData.reminderTime}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="isRepeating"
              checked={formData.isRepeating}
              onChange={handleChange}
            />
            <FaRedo /> Repeating Reminder
          </label>
        </div>

        {formData.isRepeating && (
          <div className="form-group">
            <label>Frequency</label>
            <select
              name="repeatFrequency"
              value={formData.repeatFrequency}
              onChange={handleChange}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        )}

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
            <FaBell /> Active Reminder
          </label>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Save Reminder
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReminderForm;