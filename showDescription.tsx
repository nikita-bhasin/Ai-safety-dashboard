import React, { useState } from 'react';

interface Incident {
  id: number;
  title: string;
  description: string;
  severity: string;
  reported_at: string;
  showDescription: boolean;
}

const App = () => {
  const [incidents, setIncidents] = useState<Incident[]>([
    // Sample incidents...
    {
      id: 1,
      title: 'AI Model Error: Incorrect Output',
      description: 'The AI model produced an incorrect output during testing.',
      severity: 'high',
      reported_at: '2025-04-22T10:30:00Z',
      showDescription: false,
    },
    // Add other incidents here...
  ]);

  const toggleDescription = (id: number) => {
    setIncidents((prevIncidents) =>
      prevIncidents.map((incident) =>
        incident.id === id
          ? { ...incident, showDescription: !incident.showDescription }
          : incident
      )
    );
  };

  return (
    <div className="App">
      <h1>🛡️ AI Safety Incident Dashboard</h1>

      {/* Incident Form */}
      {/* <IncidentForm onAddIncident={handleAddIncident} /> */}

      {/* Filter Controls */}
      <div className="filter-controls">
        {/* FilterControls component would go here */}
      </div>

      {/* Incidents List */}
      <div className="incident-list">
        {incidents.map((incident) => (
          <div key={incident.id} className="incident">
            <h3>{incident.title}</h3>
            <p><strong>Reported:</strong> {new Date(incident.reported_at).toLocaleString()}</p>
            <p><strong>Severity:</strong> {incident.severity}</p>
            <button onClick={() => toggleDescription(incident.id)}>
              {incident.showDescription ? 'Hide Details' : 'View Details'}
            </button>
            {incident.showDescription && <p>{incident.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
