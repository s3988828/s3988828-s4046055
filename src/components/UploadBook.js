import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

function UploadBook() {
    const [file, setFile] = useState(null); // State to store the selected file
    const [uploadStatus, setUploadStatus] = useState(''); // State to display upload status

    // Function to handle file selection
    const onFileChange = event => {
        setFile(event.target.files[0]); // Update the state with the selected file
    };

    // Function to handle file upload
    const onFileUpload = () => {
        const formData = new FormData();
        formData.append('file', file); // Append the file to the FormData object

        // Perform the POST request to upload the file
        api.post('/upload', formData, {
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
        <div>
            <h2>Upload a Book</h2>
            <input type="file" onChange={onFileChange} />
            <button onClick={onFileUpload}>
                Upload!
            </button>
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
}

export default UploadBook;
