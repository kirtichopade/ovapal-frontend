import React from 'react';
import { FaEdit, FaTrash, FaBell, FaBellSlash } from 'react-icons/fa';
import './ReminderList.css';

const ReminderList = ({ reminders, onToggleActive, onDelete }) => {
  const formatDateTime = (date, time) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(`${date}T${time}`).toLocaleString(undefined, options);
  };

  const handleToggleActive = (reminderId, isActive) => {
    if (window.confirm(`Are you sure you want to ${isActive ? 'activate' : 'deactivate'} this reminder?`)) {
      onToggleActive(reminderId, isActive);
    }
  };

  const handleDelete = (reminderId) => {
    if (window.confirm('Are you sure you want to delete this reminder?')) {
      onDelete(reminderId);
    }
  };

  return (
    <div className="reminder-list">
      {reminders.length === 0 ? (
        <div className="no-reminders">No reminders found</div>
      ) : (
        reminders.map(reminder => (
          <div key={reminder.reminderId} className={`reminder-card ${!reminder.isActive ? 'inactive' : ''}`}>
            <div className="reminder-header">
              <h3>{reminder.title}</h3>
              <div className="reminder-status">
                <button 
                  onClick={() => handleToggleActive(reminder.reminderId, !reminder.isActive)}
                  className="toggle-btn"
                >
                  {reminder.isActive ? <FaBell /> : <FaBellSlash />}
                  {reminder.isActive ? ' Active' : ' Inactive'}
                </button>
              </div>
            </div>

            <div className="reminder-datetime">
              {formatDateTime(reminder.reminderDate, reminder.reminderTime)}
              {reminder.isRepeating && (
                <span className="repeat-frequency">
                  ({reminder.repeatFrequency})
                </span>
              )}
            </div>

            {reminder.description && (
              <div className="reminder-description">
                {reminder.description}
              </div>
            )}

            <div className="reminder-actions">
              <button 
                onClick={() => handleDelete(reminder.reminderId)}
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

export default ReminderList;