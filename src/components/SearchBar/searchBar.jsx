import React from 'react';
// import './SearchBar.css';

export default function SearchBar({ value, onSearchChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search events by title…"
        value={value}
        onChange={e => onSearchChange(e.target.value)}
      />
    </div>
  );
}