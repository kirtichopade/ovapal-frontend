import axios from './config';

// Health Records API
export const getHealthRecords = (userId) => axios.get(`/health/${userId}`);
export const saveHealthRecord = (recordData) => axios.post('/health', recordData);

// Period Records API
export const getPeriodRecords = (userId) => axios.get(`/period/${userId}`);
export const savePeriodRecord = (recordData) => axios.post('/period', recordData);

// Add other API functions as needed