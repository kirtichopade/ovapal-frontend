import api from './config';

export const getHealthRecords = async (userId) => {
  try {
    const response = await api.get(`/health/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch health records: ${error.message}`);
  }
};

export const saveHealthRecord = async (recordData) => {
  try {
    const response = await api.post('/health', recordData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save health record: ${error.message}`);
  }
};

export const updateHealthRecord = async (recordId, recordData) => {
  try {
    const response = await api.put(`/health/${recordId}`, recordData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update health record: ${error.message}`);
  }
};

export const deleteHealthRecord = async (recordId) => {
  try {
    await api.delete(`/health/${recordId}`);
  } catch (error) {
    throw new Error(`Failed to delete health record: ${error.message}`);
  }
};