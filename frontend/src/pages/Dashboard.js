import React from 'react';
import { useAuth } from '../context/AuthContext';
import SummaryCard from '../components/shared/SummaryCard';
import { FaCalendarAlt, FaHeartbeat, FaPills, FaBell } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <h1>Welcome back, {user?.name}</h1>
      
      <div className="summary-grid">
        <SummaryCard 
          icon={<FaCalendarAlt size={24} />}
          title="Period Tracker"
          value="Current Cycle: Day 5"
          link="/period"
        />
        
        <SummaryCard 
          icon={<FaHeartbeat size={24} />}
          title="Health Records"
          value="Last checkup: 2 weeks ago"
          link="/health"
        />
        
        <SummaryCard 
          icon={<FaPills size={24} />}
          title="Medications"
          value="3 active medications"
          link="/medications"
        />
        
        <SummaryCard 
          icon={<FaBell size={24} />}
          title="Reminders"
          value="2 active reminders"
          link="/reminders"
        />
      </div>
      
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <span>Logged period for March 15-19</span>
            <small>2 days ago</small>
          </div>
          <div className="activity-item">
            <span>Added new medication</span>
            <small>1 week ago</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;