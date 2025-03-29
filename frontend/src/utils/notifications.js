// src/utils/notifications.js
const isClient = typeof window !== 'undefined';

/**
 * Requests permission for browser notifications
 * @returns {Promise<boolean>} Whether permission was granted
 */
export const requestNotificationPermission = () => {
  if (!isClient || !('Notification' in window)) {
    return Promise.resolve(false);
  }

  switch (Notification.permission) {
    case 'granted':
      return Promise.resolve(true);
    case 'denied':
      return Promise.resolve(false);
    default:
      return Notification.requestPermission()
        .then(permission => permission === 'granted')
        .catch(() => false);
  }
};

/**
 * Shows a browser notification
 * @param {string} title - Notification title
 * @param {Object} [options] - Notification options
 * @returns {boolean} Whether notification was shown
 */
export const showNotification = (title, options = {}) => {
  if (!isClient) return false;
  
  try {
    if (Notification.permission === 'granted') {
      new Notification(title, {
        icon: '/logo192.png',
        ...options
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Notification failed:', error);
    return false;
  }
};

/**
 * Schedules medication reminders
 * @param {Array} medications - List of medications with reminder times
 */
export const scheduleMedicationReminders = (medications = []) => {
  if (!isClient || !('Notification' in window)) return;

  medications.forEach(med => {
    if (!med?.reminderTime) return;
    
    const [hours, minutes] = med.reminderTime.split(':').map(Number);
    const now = new Date();
    const reminderTime = new Date();
    
    reminderTime.setHours(hours, minutes, 0, 0);
    
    // If time already passed today, schedule for tomorrow
    if (reminderTime <= now) {
      reminderTime.setDate(reminderTime.getDate() + 1);
    }

    const timeout = reminderTime - now;

    setTimeout(() => {
      showNotification(
        `💊 Time for ${med.medicine}`,
        {
          body: `Dosage: ${med.dosage}`,
          icon: '/logo192.png',
          tag: `med-reminder-${med.medicineid}`
        }
      );
    }, timeout);
  });
};

/**
 * Schedules daily health summary notifications
 * @param {string} time - Time in HH:MM format
 * @param {Object} userData - User information
 */
export const scheduleDailySummary = (time, userData = {}) => {
  if (!isClient || !('Notification' in window)) return;

  const [hours, minutes] = time.split(':').map(Number);
  const now = new Date();
  const notifyTime = new Date();
  
  notifyTime.setHours(hours, minutes, 0, 0);
  
  if (notifyTime <= now) {
    notifyTime.setDate(notifyTime.getDate() + 1);
  }
  
  const timeout = notifyTime - now;
  
  setTimeout(() => {
    showNotification(
      '📊 Your Daily Health Summary',
      {
        body: `Hello ${userData.name}! Check your health metrics today.`,
        icon: '/logo192.png'
      }
    );
    // Reschedule for next day
    scheduleDailySummary(time, userData); 
  }, timeout);
};