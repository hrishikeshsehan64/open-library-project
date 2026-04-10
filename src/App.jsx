import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [books, setBooks] = useState([]);
  const [sortOrder, setSortOrder] = useState('none');
  const [query, setQuery] = useState('');
  const [filterOption, setFilterOption] = useState('all');
  
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

  useEffect(() => {
    const fetchInitialBooks = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`https://openlibrary.org/search.json?q=programming+technology&limit=100`);
        if (!res.ok) throw new Error('Failed to fetch from Open Library API');
        
        const data = await res.json();
        setBooks(data.docs || []);
      } catch (err) {
        console.error(err);
        setError('An error occurred while loading digital library.');
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInitialBooks();
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

  // Derived state to search, filter, and sort books gracefully
  const processedBooks = React.useMemo(() => {
    if (!books) return [];

    // 1. Array Higher-Order Function: filter() & some() for Searching
    let result = books;
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(book => {
        const matchTitle = book.title?.toLowerCase().includes(q);
        const matchAuthor = book.author_name?.some(author => author.toLowerCase().includes(q));
        return matchTitle || matchAuthor;
      });
    }

    // 2. Array Higher-Order Function: filter() for Filtering
    if (filterOption === 'has_cover') {
      result = result.filter(book => book.cover_i);
    } else if (filterOption === 'recent') {
      result = result.filter(book => book.first_publish_year > 2010);
    } else if (filterOption === 'classic') {
      result = result.filter(book => book.first_publish_year < 1950);
    }

    // 3. Array Higher-Order Function: sort() for Sorting
    if (sortOrder !== 'none') {
      result = [...result].sort((a, b) => {
        const yearA = a.first_publish_year || 0;
        const yearB = b.first_publish_year || 0;
        return sortOrder === 'asc' ? yearA - yearB : yearB - yearA;
      });
    }

    return result;
  }, [books, query, filterOption, sortOrder]);

  return (
    <div className="app-container">
      <Header 
        theme={theme} 
        toggleTheme={toggleTheme} 
        readingGoal={readingGoal} 
      />
      <main className="main-content">
        <SearchBar 
          query={query}
          onSearch={setQuery}
          filterOption={filterOption}
          onFilter={setFilterOption}
          sortOrder={sortOrder}
          onSort={setSortOrder}
        />
        <BookList 
          books={processedBooks} 
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
