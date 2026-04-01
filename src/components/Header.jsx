import React from 'react';
import { BookOpen, Moon, Sun, CheckCircle } from 'lucide-react';

const Header = ({ theme, toggleTheme, readingGoal }) => {
  return (
    <header className="header">
      <div className="header-title">
        <BookOpen size={28} />
        <h1>Digital Library</h1>
      </div>
      <div className="header-actions">
        <div className="reading-goal">
          <CheckCircle size={18} />
          <span>Reading Goal:</span>
          <strong>{readingGoal}</strong>
        </div>
        <button 
          onClick={toggleTheme} 
          className="icon-button"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
