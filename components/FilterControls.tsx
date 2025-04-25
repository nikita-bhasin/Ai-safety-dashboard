import React from 'react';

interface FilterControlsProps {
    selectedSeverity: string;
    onSeverityChange: (severity: string) => void;
    selectedPriority: string;
    onPriorityChange: (priority: string) => void;
    sortOrder: 'newest' | 'oldest';
    onSortChange: (order: 'newest' | 'oldest') => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
    selectedSeverity,
    onSeverityChange,
    selectedPriority,
    onPriorityChange,
    sortOrder,
    onSortChange,
}) => {
    return (
        <div className="filters">
            <div className="filter-group">
                <label htmlFor="severity">Filter by Severity:</label>
                <select
                    id="severity"
                    value={selectedSeverity}
                    onChange={(e) => onSeverityChange(e.target.value)}
                >
                    <option value="All">All Severities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="priority">Filter by Priority:</label>
                <select
                    id="priority"
                    value={selectedPriority}
                    onChange={(e) => onPriorityChange(e.target.value)}
                >
                    <option value="All">All Priorities</option>
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="sort">Sort by Date:</label>
                <select
                    id="sort"
                    value={sortOrder}
                    onChange={(e) => onSortChange(e.target.value as 'newest' | 'oldest')}
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                </select>
            </div>
        </div>
    );
};

export default FilterControls;
  