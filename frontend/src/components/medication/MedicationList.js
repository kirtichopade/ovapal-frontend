import React from 'react';
import { FaEdit, FaTrash, FaPills, FaBell } from 'react-icons/fa';
import './MedicationList.css';

const MedicationList = ({ medications, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="medication-list">
      {medications.length === 0 ? (
        <div className="no-medications">No medications found</div>
      ) : (
        medications.map(medication => (
          <div key={medication.medicineid} className="medication-card">
            <div className="medication-header">
              <h3>
                <FaPills /> {medication.medicine}
              </h3>
              <div className="medication-dosage">
                {medication.dosage}
              </div>
            </div>

            <div className="medication-details">
              <div className="detail-item">
                <span className="detail-label">Frequency:</span>
                <span>{medication.frequency}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Start Date:</span>
                <span>{formatDate(medication.startDate)}</span>
              </div>

              {medication.endDate && (
                <div className="detail-item">
                  <span className="detail-label">End Date:</span>
                  <span>{formatDate(medication.endDate)}</span>
                </div>
              )}

              {medication.reminderTime && (
                <div className="detail-item">
                  <span className="detail-label"><FaBell /> Reminder:</span>
                  <span>{medication.reminderTime}</span>
                </div>
              )}
            </div>

            {medication.notes && (
              <div className="medication-notes">
                <p>{medication.notes}</p>
              </div>
            )}

            <div className="medication-actions">
              <button 
                onClick={() => onEdit(medication)}
                className="edit-btn"
              >
                <FaEdit /> Edit
              </button>
              <button 
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this medication?')) {
                    onDelete(medication.medicineid);
                  }
                }}
                className="delete-btn"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MedicationList;