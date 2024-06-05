import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import './UploadBook.css';

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
            <h2>Upload a Book</h2>
            <div className="file-input">
                <label htmlFor="file">Select a file:</label>
                <input type="file" id="file" onChange={onFileChange} />
            </div>
            <button className="upload-button" onClick={onFileUpload}>
                Upload
            </button>
            {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
        </div>
    );
}

export default UploadBook;