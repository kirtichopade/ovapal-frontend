import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getPeriodRecords, savePeriodRecord } from '../api/period';
import PeriodCalendar from '../components/period/PeriodCalendar';
import PeriodForm from '../components/period/PeriodForm';
import PeriodHistory from '../components/period/PeriodHistory';
import './PeriodTracker.css';

const PeriodTracker = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const data = await getPeriodRecords(user.userId);
        setRecords(data);
      } catch (error) {
        console.error('Error fetching records:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user?.userId) {
      fetchRecords();
    }
  }, [user]);

  const handleAddRecord = async (newRecord) => {
    try {
      const savedRecord = await savePeriodRecord({
        userId: user.userId,
        ...newRecord
      });
      setRecords([...records, savedRecord]);
      setShowForm(false);
    } catch (error) {
      console.error('Error saving record:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="period-tracker">
      <h1>Period Tracker</h1>
      
      <div className="tracker-container">
        <div className="calendar-section">
          <PeriodCalendar records={records} />
          <button 
            className="add-record-btn"
            onClick={() => setShowForm(true)}
          >
            + Add Period Record
          </button>
        </div>
        
        {showForm && (
          <div className="form-section">
            <PeriodForm 
              onSubmit={handleAddRecord}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}
        
        <div className="history-section">
          <PeriodHistory records={records} />
        </div>
      </div>
    </div>
  );
};

export default PeriodTracker;