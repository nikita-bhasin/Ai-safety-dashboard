import React from 'react';
import { Incident } from '../types/Incidentfile';

interface StatisticsProps {
  incidents: Incident[];
}

const Statistics: React.FC<StatisticsProps> = ({ incidents }) => {
  const totalIncidents = incidents.length;
  const highSeverity = incidents.filter(i => i.severity === 'high').length;
  const mediumSeverity = incidents.filter(i => i.severity === 'medium').length;
  const lowSeverity = incidents.filter(i => i.severity === 'low').length;

  const getSeverityPercentage = (count: number) => {
    return totalIncidents > 0 ? Math.round((count / totalIncidents) * 100) : 0;
  };

  return (
    <div className="statistics-container">
      <h2>📊 Incident Statistics</h2>
      <div className="statistics-grid">
        <div className="stat-card">
          <h3>Total Incidents</h3>
          <p className="stat-number">{totalIncidents}</p>
        </div>
        <div className="stat-card high-severity">
          <h3>High Severity</h3>
          <p className="stat-number">{highSeverity}</p>
          <p className="stat-percentage">{getSeverityPercentage(highSeverity)}%</p>
        </div>
        <div className="stat-card medium-severity">
          <h3>Medium Severity</h3>
          <p className="stat-number">{mediumSeverity}</p>
          <p className="stat-percentage">{getSeverityPercentage(mediumSeverity)}%</p>
        </div>
        <div className="stat-card low-severity">
          <h3>Low Severity</h3>
          <p className="stat-number">{lowSeverity}</p>
          <p className="stat-percentage">{getSeverityPercentage(lowSeverity)}%</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics; 