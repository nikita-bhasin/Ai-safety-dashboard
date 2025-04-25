export interface Incident {
    id: number; // Ensure each incident has a unique id
    title: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
    priority: 'low' | 'normal' | 'high' | 'urgent';
    tags: string[];
    reported_at: string; // Date of reporting
    showDescription: boolean; // Add this property to toggle description visibility
  }
  