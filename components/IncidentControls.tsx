import React from "react";

interface FilterControlsProps {
  selectedSeverity: string;
  onSeverityChange: (value: string) => void;
  sortOrder: "newest" | "oldest";
  onSortOrderChange: (value: "newest" | "oldest") => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  selectedSeverity,
  onSeverityChange,
  sortOrder,
  onSortOrderChange,
}) => {
  return (
    <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
      <label>
        Filter by Severity:
        <select
          value={selectedSeverity}
          onChange={(e) => onSeverityChange(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </label>

      <label>
        Sort by Date:
        <select
          value={sortOrder}
          onChange={(e) =>
            onSortOrderChange(e.target.value as "newest" | "oldest")
          }
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </label>
    </div>
  );
};

export default FilterControls;
