import React from 'react';
import { format } from 'date-fns';
import './PeriodHistory.css';

const PeriodHistory = ({ records, onEdit, onDelete }) => {
  if (records.length === 0) {
    return <div className="no-records">No period records found</div>;
  }

  return (
    <div className="period-history">
      <h3>Period History</h3>
      <table>
        <thead>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Duration</th>
            <th>Flow</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map(record => (
            <tr key={record.periodRecId}>
              <td>{format(new Date(record.startDate), 'MMM dd, yyyy')}</td>
              <td>{format(new Date(record.endDate), 'MMM dd, yyyy')}</td>
              <td>
                {Math.ceil(
                  (new Date(record.endDate) - new Date(record.startDate)) / 
                  (1000 * 60 * 60 * 24)
                ) + 1} days
              </td>
              <td>
                <span className={`flow-badge ${record.flow.toLowerCase()}`}>
                  {record.flow}
                </span>
              </td>
              <td>
                <button 
                  className="edit-btn"
                  onClick={() => onEdit(record)}
                >
                  Edit
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => onDelete(record.periodRecId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PeriodHistory;