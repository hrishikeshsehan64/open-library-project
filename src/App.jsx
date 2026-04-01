import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [books, setBooks] = useState(null); // null means hasn't searched yet
  const [sortOrder, setSortOrder] = useState('none');
  const [query, setQuery] = useState('');
  
  const [readingGoal, setReadingGoal] = useState(() => {
    return parseInt(localStorage.getItem('readingGoal')) || 0;
  });
  const [readBooks, setReadBooks] = useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem('readBooks')) || []);
    } catch {
      return new Set();
    }
  });

  // Keep theme synced
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Sync reading goals to local storage
  useEffect(() => {
    localStorage.setItem('readingGoal', readingGoal.toString());
    localStorage.setItem('readBooks', JSON.stringify(Array.from(readBooks)));
  }, [readingGoal, readBooks]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  const fetchBooks = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setBooks(null);
      setError('');
      return;
    }
    setQuery(searchQuery);
    setLoading(true);
    setError('');

    try {
      const formattedQuery = encodeURIComponent(searchQuery.trim());
      const res = await fetch(`https://openlibrary.org/search.json?q=${formattedQuery}&limit=24`);
      if (!res.ok) throw new Error('Failed to fetch from Open Library API');
      
      const data = await res.json();
      setBooks(data.docs || []);
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching books.');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleReadBook = (bookKey) => {
    if (!readBooks.has(bookKey)) {
      setReadBooks(prev => {
        const next = new Set(prev);
        next.add(bookKey);
        return next;
      });
      setReadingGoal(prev => prev + 1);
    }
  };

  // Derived state to sort books gracefully
  const sortedBooks = React.useMemo(() => {
    if (!books) return null;
    if (sortOrder === 'none') return books;

    return [...books].sort((a, b) => {
      const yearA = a.first_publish_year || 0;
      const yearB = b.first_publish_year || 0;
      return sortOrder === 'asc' ? yearA - yearB : yearB - yearA;
    });
  }, [books, sortOrder]);

  return (
    <div className="app-container">
      <Header 
        theme={theme} 
        toggleTheme={toggleTheme} 
        readingGoal={readingGoal} 
      />
      <main className="main-content">
        <SearchBar 
          onSearch={fetchBooks}
          sortOrder={sortOrder}
          onSort={setSortOrder}
        />
        <BookList 
          books={sortedBooks} 
          loading={loading} 
          error={error} 
          onRead={handleReadBook}
          readBooks={readBooks}
        />
      </main>
    </div>
  );
}

export default App;
