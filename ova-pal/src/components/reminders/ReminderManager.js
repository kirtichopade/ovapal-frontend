// src/components/ReminderManager.js
import React, { useState } from 'react';
import { useReminders } from '../api/hooks';
import ReminderForm from './ReminderForm';
import ReminderList from './ReminderList';
import {
  setReminder,
  updateReminder,
  deleteReminder
} from '../api/reminders';
import './ReminderManager.css';

const ReminderManager = ({ userId }) => {
  const { data: reminders, loading, error, refetch } = useReminders(userId);
  const [editingReminder, setEditingReminder] = useState(null);

  const handleSubmit = async (reminderData) => {
    try {
      if (editingReminder) {
        await updateReminder(editingReminder.reminderId, reminderData);
      } else {
        await setReminder({ ...reminderData, userId });
      }
      refetch();
      setEditingReminder(null);
    } catch (error) {
      console.error('Error saving reminder:', error);
    }
  };

  const handleDelete = async (reminderId) => {
    try {
      await deleteReminder(reminderId);
      refetch();
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };

  const handleToggleActive = async (reminderId, isActive) => {
    try {
      await updateReminder(reminderId, { isActive: !isActive });
      refetch();
    } catch (error) {
      console.error('Error toggling reminder:', error);
    }
  };

  if (loading) return <div className="loading">Loading reminders...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="reminder-manager">
      <div className="reminder-header">
        <h2>Reminders</h2>
        <button
          onClick={() => setEditingReminder({})}
          className="add-reminder-btn"
        >
          + Add Reminder
        </button>
      </div>

      {editingReminder && (
        <ReminderForm
          initialData={editingReminder}
          onSubmit={handleSubmit}
          onCancel={() => setEditingReminder(null)}
        />
      )}

      <ReminderList
        reminders={reminders}
        onEdit={setEditingReminder}
        onDelete={handleDelete}
        onToggleActive={handleToggleActive}
      />
    </div>
  );
};

export default ReminderManager;