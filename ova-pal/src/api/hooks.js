import { useState, useEffect } from 'react';
import {
  getHealthRecords,
  getPeriodRecords
} from './api';

export const useHealthRecords = (userId) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const data = await getHealthRecords(userId);
      setRecords(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  return { records, loading, error, refetch: fetchData };
};

export const usePeriodRecords = (userId) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const data = await getPeriodRecords(userId);
      setRecords(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  return { records, loading, error, refetch: fetchData };
};