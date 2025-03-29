import api from './config';

export const getPeriodRecords = async (userId) => {
  try {
    const response = await api.get(`/period/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch period records: ${error.message}`);
  }
};

export const savePeriodRecord = async (recordData) => {
  try {
    const response = await api.post('/period', recordData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save period record: ${error.message}`);
  }
};

export const updatePeriodRecord = async (recordId, recordData) => {
  try {
    const response = await api.put(`/period/${recordId}`, recordData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update period record: ${error.message}`);
  }
};

export const deletePeriodRecord = async (recordId) => {
  try {
    await api.delete(`/period/${recordId}`);
  } catch (error) {
    throw new Error(`Failed to delete period record: ${error.message}`);
  }
};