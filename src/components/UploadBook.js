import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import './UploadBook.css'; // Import the CSS file

function UploadBook() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const onFileChange = event => {
    setFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append('file', file);

    api.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log('File uploaded successfully');
        setUploadStatus('File uploaded successfully');
      })
      .catch(error => {
        console.error('Error uploading file:', error);
        setUploadStatus('Error uploading file');
      });
  };

  return (
    <div className="upload-book">
      <h2 className="upload-book__title">Upload a Book</h2>
      <div className="upload-book__input-container">
        <label htmlFor="file-input" className="upload-book__label">
          Select a file
        </label>
        <input
          id="file-input"
          type="file"
          onChange={onFileChange}
          className="upload-book__input"
        />
      </div>
      <button onClick={onFileUpload} className="upload-book__button">
        Upload
      </button>
      {uploadStatus && <p className="upload-book__status">{uploadStatus}</p>}
    </div>
  );
}

export default UploadBook;