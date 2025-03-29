import React from 'react';
import { Link } from 'react-router-dom';
import './SummaryCard.css';

const SummaryCard = ({ icon, title, value, link }) => {
  return (
    <Link to={link} className="summary-card">
      <div className="card-icon">{icon}</div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </Link>
  );
};

export default SummaryCard;