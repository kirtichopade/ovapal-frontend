import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getHealthRecords } from '../api/health';
import HealthMetricsChart from '../components/health/HealthMetricsChart';
import HealthRecordForm from '../components/health/HealthRecordForm';
import './HealthRecords.css';

const HealthRecords = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const data = await getHealthRecords(user.userId);
        setRecords(data);
      } catch (err) {
        setError(err.message || 'Failed to load health records');
      } finally {
        setLoading(false);
      }
    };

    if (user?.userId) {
      fetchRecords();
    }
  }, [user]);

  if (loading) return <div className="loading">Loading health records...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="health-records">
      <h1>Health Records</h1>
      
      <button className="add-record-btn" onClick={() => setShowForm(true)}>
        + Add Health Record
      </button>

      {showForm && (
        <HealthRecordForm 
          userId={user.userId}
          onClose={() => setShowForm(false)}
          onSave={(newRecord) => {
            setRecords([...records, newRecord]);
            setShowForm(false);
          }}
        />
      )}

      <div className="health-metrics">
        <HealthMetricsChart records={records} />
      </div>

      <div className="records-list">
        <h2>Recent Measurements</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Weight (kg)</th>
              <th>Height (cm)</th>
              <th>Temperature (°C)</th>
              <th>Heart Rate</th>
              <th>Blood Pressure</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.healthId}>
                <td>{new Date(record.recordDate).toLocaleDateString()}</td>
                <td>{record.weight}</td>
                <td>{record.height}</td>
                <td>{record.temperature}</td>
                <td>{record.heartRate}</td>
                <td>{record.bloodPressureSystolic}/{record.bloodPressureDiastolic}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HealthRecords;