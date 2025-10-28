import React from "react";

/*
 SearchBar - input and sort controls
*/
export default function SearchBar({ value, onChange, sortBy, onSortChange }) {
  return (
    <div className="searchbar">
      <input
        className="search-input"
        placeholder="Search by book title (e.g., Pride and Prejudice)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search books by title"
      />

      <div className="controls">
        <label>
          <span className="control-label">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="select"
          >
            <option value="relevance">Relevance</option>
            <option value="first_publish_year">First publish year</option>
          </select>
        </label>
      </div>
    </div>
  );
}
