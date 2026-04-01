import React, { useState } from 'react';
import { BookMarked, Check } from 'lucide-react';

const BookCard = ({ book, onRead, hasRead }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // If there's no cover, we just show a placeholder color block.
  // Large cover id -> M (medium) or L (large) size
  const coverUrl = book.cover_i 
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : null;

  // Since open library search doesn't return full synopsis reliably, 
  // we'll display subjects or substitute text.
  let descriptionText = "No description available.";
  if (book.first_sentence && book.first_sentence.length > 0) {
    descriptionText = typeof book.first_sentence[0] === 'string' ? book.first_sentence[0] : book.first_sentence;
  } else if (book.subject && book.subject.length > 0) {
    descriptionText = `Topics include: ${book.subject.slice(0, 5).join(', ')}`;
  }

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleReadClick = (e) => {
    e.stopPropagation(); // prevent flipping when clicking button
    if (!hasRead) {
      onRead(book.key);
    }
  };

  return (
    <div className="book-card-container">
      <div 
        className={`book-card ${isFlipped ? 'is-flipped' : ''}`}
        onClick={handleCardClick}
      >
        <div className="card-face card-front">
          <div className="card-image-wrapper">
            {coverUrl ? (
              <img src={coverUrl} alt={book.title} className="card-image" loading="lazy" />
            ) : (
              <span className="image-placeholder">No Cover Available</span>
            )}
          </div>
          <div className="card-content-front">
            <h3 className="book-title" title={book.title}>{book.title}</h3>
            <p className="book-author" title={book.author_name?.join(', ')}>
              {book.author_name ? book.author_name.join(', ') : 'Unknown Author'}
            </p>
            <span className="book-year">
              {book.first_publish_year || 'Unknown Year'}
            </span>
          </div>
        </div>

        <div className="card-face card-back">
          <div className="card-back-scroll">
            <h4 className="book-desc-title">About this Book</h4>
            <p className="book-description">
              {descriptionText}
            </p>
          </div>
          <button 
            className={`btn-read ${hasRead ? 'read' : ''}`}
            onClick={handleReadClick}
            disabled={hasRead}
          >
            {hasRead ? (
              <>
                <Check size={18} />
                Read
              </>
            ) : (
              <>
                <BookMarked size={18} />
                I've Read This
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
