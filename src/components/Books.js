import React, { useState, useEffect } from 'react';
import api from '../api'; // Ensure this API points to your Flask backend
import './Books.css'; // Make sure to create or update this CSS file

const Books = ({ token }) => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/books', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      setBooks(response.data.map(book => ({
        ...book,
        title: book.key.replace(/_/g, ' ').replace(/\.\w+$/, '')
      })));
    })
    .catch(error => {
      console.error('There was an error fetching the books!', error);
    });
  }, [token]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(search)
  );

  return (
    <div className="books-container">
      <h1>Books</h1>
      <input
        type="search"
        placeholder="Search books..."
        value={search}
        onChange={handleSearchChange}
        className="search-input"
      />
      <ul className="books-list">
        {filteredBooks.map(book => (
          <li key={book.key} className="book-item">
            <div className="book-title">{book.title}</div>
            <a href={book.url} target="_blank" rel="noopener noreferrer" className="download-link">
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
