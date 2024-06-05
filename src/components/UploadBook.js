import React, { useState } from 'react';
import api from '../api';
import './UploadBook.css';  // Ensure the path to the CSS file is correct

function UploadBook() {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUpload101Status] = useState('');

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
        <div className="upload-area">
            <h2 className="upload-title">Upload a Book</h2>
            <input type="file" onChange={onFileChange} className="upload-input" />
            <button onClick={onFileUpload} className="upload-button">
                Upload
            </button>
            {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
        </div>
    );
}

export default UploadBook;
