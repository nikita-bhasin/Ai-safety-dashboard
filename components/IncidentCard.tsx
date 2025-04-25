import React, { useState } from 'react';
import { Incident } from '../types/Incidentfile';

type IncidentCardProps = {
  incident: Incident;
};

const IncidentCard: React.FC<IncidentCardProps> = ({ incident }) => {
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="incident-card" style={styles.card}>
      <h3>{incident.title}</h3>
      <p><strong>Severity:</strong> {incident.severity}</p>
      <p><strong>Reported Date:</strong> {new Date(incident.reported_at).toLocaleString()}</p>
      <button onClick={toggleDescription} style={styles.button}>
        {showDescription ? 'Hide Details' : 'View Details'}
      </button>
      {showDescription && <p style={styles.description}>{incident.description}</p>}
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    padding: '1rem',
    margin: '1rem 0',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  button: {
    marginTop: '0.5rem',
    padding: '0.4rem 0.8rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  description: {
    marginTop: '0.8rem',
    color: '#333'
  }
};

export default IncidentCard;
