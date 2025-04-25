import React, { useState, useEffect } from "react";
import IncidentForm from "./components/IncidentForm";
import FilterControls from "./components/FilterControls";
import Statistics from "./components/Statistics";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import "./index.css"; // Ensure this file exists or comment it out

interface Incident {
  id: number;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  tags: string[];
  reported_at: string;
  showDescription: boolean;
}

interface User {
  username: string;
  password: string;
  email: string;
}

const App = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [severityFilter, setSeverityFilter] = useState<string>("All");
  const [priorityFilter, setPriorityFilter] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [users, setUsers] = useState<User[]>(() => {
    // Initialize users from localStorage
    const savedUsers = localStorage.getItem('dashboardUsers');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  // Save users to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('dashboardUsers', JSON.stringify(users));
  }, [users]);

  const handleLogin = async (username: string, password: string) => {
    try {
      // Check if user exists and password matches
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        setIsAuthenticated(true);
        // Store current user in localStorage
        localStorage.setItem('currentUser', JSON.stringify({ username }));
      } else {
        throw new Error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const handleSignUp = async (username: string, password: string, email: string) => {
    try {
      // Check if username already exists
      if (users.some(u => u.username === username)) {
        throw new Error("Username already exists. Please choose another one.");
      }

      // Check if email already exists
      if (users.some(u => u.email === email)) {
        throw new Error("Email already registered. Please use another email.");
      }

      // Create new user
      const newUser: User = {
        username,
        password,
        email
      };

      // Add user to the list
      setUsers(prevUsers => [...prevUsers, newUser]);
      
      // Switch to login form
      setShowSignUp(false);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  // Check for existing session on component mount
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setIsAuthenticated(true);
    }
  }, []);

  // Add new incident
  const handleAddIncident = (incidentData: Omit<Incident, 'id' | 'reported_at' | 'showDescription'>) => {
    const newIncident: Incident = {
      ...incidentData,
      id: Date.now(),
      reported_at: new Date().toISOString(),
      showDescription: false,
    };
    setIncidents((prev) => [...prev, newIncident]);
  };

  // Toggle details visibility
  const toggleDescription = (id: number) => {
    setIncidents((prev) =>
      prev.map((incident) =>
        incident.id === id
          ? { ...incident, showDescription: !incident.showDescription }
          : incident
      )
    );
  };

  // Filter + sort logic
  const filtered = incidents.filter((incident) => {
    const severityMatch = severityFilter === "All" ? true : incident.severity === severityFilter;
    const priorityMatch = priorityFilter === "All" ? true : incident.priority === priorityFilter;
    return severityMatch && priorityMatch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.reported_at).getTime() - new Date(a.reported_at).getTime();
    } else {
      return new Date(a.reported_at).getTime() - new Date(b.reported_at).getTime();
    }
  });

  if (!isAuthenticated) {
    return showSignUp ? (
      <SignUp 
        onSignUp={handleSignUp} 
        onSwitchToLogin={() => setShowSignUp(false)} 
      />
    ) : (
      <Login 
        onLogin={handleLogin} 
        onSwitchToSignUp={() => setShowSignUp(true)} 
      />
    );
  }

  return (
    <div className="App">
      <div className="header-container">
        <h1 className="dashboard-heading">🛡️ AI Safety Incident Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      {/* Statistics */}
      <Statistics incidents={incidents} />

      {/* Form */}
      <IncidentForm onAddIncident={handleAddIncident} />

      {/* Filters */}
      <div className="filter-controls">
        <FilterControls
          selectedSeverity={severityFilter}
          onSeverityChange={setSeverityFilter}
          selectedPriority={priorityFilter}
          onPriorityChange={setPriorityFilter}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />
      </div>

      {/* Incident List */}
      <div className="incident-list">
        {sorted.map((incident) => (
          <div key={incident.id} className={`incident-card ${incident.severity}-severity`}>
            <h3>{incident.title}</h3>
            <p><strong>Severity:</strong> {incident.severity}</p>
            <p><strong>Priority:</strong> {incident.priority}</p>
            <p><strong>Reported:</strong> {new Date(incident.reported_at).toLocaleString()}</p>
            
            {incident.tags.length > 0 && (
              <div className="tags-list">
                {incident.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            )}

            <button onClick={() => toggleDescription(incident.id)}>
              {incident.showDescription ? "Hide Details" : "View Details"}
            </button>

            {incident.showDescription && (
              <p className="incident-description">{incident.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
