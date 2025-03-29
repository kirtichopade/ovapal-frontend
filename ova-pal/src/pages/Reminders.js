import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getReminders, setReminder } from '../api/reminders';
import ReminderForm from '../components/reminders/ReminderForm';
import ReminderList from '../components/reminders/ReminderList';
import './Reminders.css';

const Reminders = () => {
  const { user } = useAuth();
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const data = await getReminders(user.userId);
        setReminders(data);
      } catch (err) {
        setError(err.message || 'Failed to load reminders');
      } finally {
        setLoading(false);
      }
    };

    if (user?.userId) {
      fetchReminders();
    }
  }, [user]);

  const handleAddReminder = async (reminderData) => {
    try {
      const newReminder = await setReminder({
        userId: user.userId,
        ...reminderData
      });
      setReminders([...reminders, newReminder]);
      setShowForm(false);
    } catch (err) {
      setError(err.message || 'Failed to add reminder');
    }
  };

  // Check for upcoming reminders
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      reminders.forEach(reminder => {
        const reminderTime = new Date(
          `${reminder.reminderDate}T${reminder.reminderTime}`
        );
        if (reminder.isActive && Math.abs(now - reminderTime) < 60000) {
          // Show notification
          if (Notification.permission === 'granted') {
            new Notification(`Reminder: ${reminder.title}`, {
              body: reminder.description
            });
          }
        }
      });
    };

    const interval = setInterval(checkReminders, 60000);
    return () => clearInterval(interval);
  }, [reminders]);

  if (loading) return <div className="loading">Loading reminders...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="reminders-page">
      <h1>Reminders</h1>
      
      <button className="add-reminder-btn" onClick={() => setShowForm(true)}>
        + Add Reminder
      </button>

      {showForm && (
        <ReminderForm
          onSubmit={handleAddReminder}
          onCancel={() => setShowForm(false)}
        />
      )}

      <ReminderList 
        reminders={reminders}
        onToggleActive={(reminderId, isActive) => {
          // Implement toggle functionality
        }}
        onDelete={(reminderId) => {
          // Implement delete functionality
        }}
      />
    </div>
  );
};

export default Reminders;