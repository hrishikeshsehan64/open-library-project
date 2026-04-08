import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ query, onSearch, filterOption, onFilter, sortOrder, onSort }) => {
  return (
    <div className="search-section">
      <div className="search-input-wrapper">
        <Search className="search-icon" size={20} />
        <input 
          type="text"
          className="search-input"
          placeholder="Search books by title, author, or keyword..."
          value={query}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <select 
        className="sort-select"
        value={filterOption}
        onChange={(e) => onFilter(e.target.value)}
      >
        <option value="all">Filter: All Books</option>
        <option value="has_cover">Filter: Has Cover Image</option>
        <option value="recent">Filter: Published after 2010</option>
        <option value="classic">Filter: Published before 1950</option>
      </select>
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
