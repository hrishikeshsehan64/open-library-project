import React from 'react';
import BookCard from './BookCard';
import { Loader2, LibraryBig } from 'lucide-react';

const BookList = ({ books, loading, error, onRead, readBooks }) => {
  if (loading) {
    return (
      <div className="message-container">
        <Loader2 className="spinner" size={48} />
        <p>Fetching amazing books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="message-container">
        <p style={{ color: '#ef4444', fontWeight: 600 }}>{error}</p>
      </div>
    );
  }

  if (!books) {
    return (
      <div className="message-container">
        <LibraryBig size={64} style={{ opacity: 0.5, marginBottom: '1rem' }} />
        <h2>Welcome to the Digital Library</h2>
        <p>Start typing to search for your next favorite book.</p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="message-container">
        <h2>No books found</h2>
        <p>Try searching with different keywords.</p>
      </div>
    );
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard 
          key={book.key} 
          book={book} 
          onRead={onRead} 
          hasRead={readBooks.has(book.key)} 
        />
      ))}
    </div>
  );
};

export default BookList;
