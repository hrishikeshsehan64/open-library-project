import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch, onSort, sortOrder }) => {
  const [inputValue, setInputValue] = useState('');

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(inputValue);
    }, 600); // 600ms denounce

    return () => clearTimeout(timer);
  }, [inputValue, onSearch]);

  return (
    <div className="search-section">
      <div className="search-input-wrapper">
        <Search className="search-icon" size={20} />
        <input 
          type="text"
          className="search-input"
          placeholder="Search books by title, author, or keyword..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <select 
        className="sort-select"
        value={sortOrder}
        onChange={(e) => onSort(e.target.value)}
      >
        <option value="none">Sort by: Relevance</option>
        <option value="asc">Publish Year (Oldest First)</option>
        <option value="desc">Publish Year (Newest First)</option>
      </select>
    </div>
  );
};

export default SearchBar;
