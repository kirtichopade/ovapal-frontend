import api from './config';

export const getReminders = async (userId) => {
  try {
    const response = await api.get(`/reminders/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch reminders: ${error.message}`);
  }
};

export const setReminder = async (reminderData) => {
  try {
    const response = await api.post('/reminders', reminderData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create reminder: ${error.message}`);
  }
};

export const updateReminder = async (reminderId, reminderData) => {
  try {
    const response = await api.put(`/reminders/${reminderId}`, reminderData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update reminder: ${error.message}`);
  }
};

export const deleteReminder = async (reminderId) => {
  try {
    await api.delete(`/reminders/${reminderId}`);
  } catch (error) {
    throw new Error(`Failed to delete reminder: ${error.message}`);
  }
};

export const toggleReminderStatus = async (reminderId, isActive) => {
  try {
    const response = await api.patch(`/reminders/${reminderId}/status`, { isActive });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to toggle reminder status: ${error.message}`);
  }
};