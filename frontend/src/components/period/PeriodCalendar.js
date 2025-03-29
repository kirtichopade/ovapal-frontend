// src/components/PeriodCalendar.js
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import PeriodForm from './PeriodForm';
import './PeriodCalendar.css';
import { usePeriodRecords } from '../../api/hooks';
import { savePeriodRecord } from '../../api/api';  // Import from api.js instead
const localizer = momentLocalizer(moment);

const PeriodCalendar = ({ userId }) => {
  const { data: records, loading, error, refetch } = usePeriodRecords(userId);
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = records?.map(record => ({
    title: 'Period',
    start: new Date(record.startDate),
    end: new Date(record.endDate),
    allDay: true,
    resource: record
  })) || [];

  const handleSaveRecord = async (recordData) => {
    try {
      await savePeriodRecord({ ...recordData, userId });
      refetch();
      setShowForm(false);
    } catch (error) {
      console.error('Error saving period record:', error);
    }
  };

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: getFlowColor(event.resource.flow),
      borderRadius: '4px',
      color: '#000',
      border: '0px'
    }
  });

  const getFlowColor = (flow) => {
    switch (flow) {
      case 'Heavy': return '#ff6b6b';
      case 'Medium': return '#f8a5c2';
      default: return '#f5e6ff';
    }
  };

  if (loading) return <div className="loading">Loading period data...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="period-calendar">
      <div className="calendar-header">
        <h2>Period Tracker</h2>
        <button onClick={() => setShowForm(true)} className="add-record-btn">
          + Add Period
        </button>
      </div>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={setSelectedEvent}
      />

      {showForm && (
        <PeriodForm
          onSubmit={handleSaveRecord}
          onCancel={() => setShowForm(false)}
        />
      )}

      {selectedEvent && (
        <div className="event-details">
          <h3>Period Details</h3>
          <p>Start: {moment(selectedEvent.start).format('LL')}</p>
          <p>End: {moment(selectedEvent.end).format('LL')}</p>
          <p>Flow: {selectedEvent.resource.flow}</p>
          <button onClick={() => setSelectedEvent(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default PeriodCalendar;