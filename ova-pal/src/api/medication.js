import api from './config';

export const getMedications = async (userId) => {
  if (!userId) {
    throw new Error('User ID is required');
  }
  try {
    const response = await api.get(`/medications/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch medications: ${error.response?.data?.message || error.message}`);
  }
};

export const addMedication = async (medicationData) => {
  if (!medicationData.userId) {
    throw new Error('User ID is required in medication data');
  }
  try {
    const response = await api.post('/medications', medicationData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to add medication: ${error.response?.data?.message || error.message}`);
  }
};

export const updateMedication = async (medicationId, medicationData) => {
  if (!medicationId) {
    throw new Error('Medication ID is required');
  }
  try {
    const response = await api.put(`/medications/${medicationId}`, medicationData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update medication: ${error.response?.data?.message || error.message}`);
  }
};

export const deleteMedication = async (medicationId) => {
  if (!medicationId) {
    throw new Error('Medication ID is required');
  }
  try {
    await api.delete(`/medications/${medicationId}`);
  } catch (error) {
    throw new Error(`Failed to delete medication: ${error.response?.data?.message || error.message}`);
  }
};