// src/components/HealthMetricsChart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useHealthRecords } from '../../api/hooks';
import './HealthMetricsChart.css';

const HealthMetricsChart = ({ userId }) => {
  const { data: records, loading, error } = useHealthRecords(userId);

  if (loading) return <div>Loading health data...</div>;
  if (error) return <div>Error loading health data: {error}</div>;
  if (!records || records.length === 0) return <div>No health records found</div>;

  const chartData = records.map(record => ({
    date: new Date(record.recordDate).toLocaleDateString(),
    weight: record.weight,
    temperature: record.temperature,
    heartRate: record.heartRate,
    systolicBP: record.bloodPressureSystolic,
    diastolicBP: record.bloodPressureDiastolic
  }));

  return (
    <div className="health-chart">
      <h3>Health Metrics</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="weight" stroke="#8884d8" name="Weight (kg)" />
          <Line yAxisId="left" type="monotone" dataKey="heartRate" stroke="#ff7300" name="Heart Rate" />
          <Line yAxisId="right" type="monotone" dataKey="temperature" stroke="#82ca9d" name="Temperature (°C)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HealthMetricsChart;