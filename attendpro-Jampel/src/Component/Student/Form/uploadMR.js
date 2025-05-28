import React, { useState } from 'react';
import axios from 'axios';

const UploadMedicalReport = ({ moduleId, studentId, setShowPopup }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!file) {
            alert('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('photo', file);
        formData.append('module_id', moduleId);
        formData.append('student_id', studentId)

        try {
            const response = await axios.post('http://localhost:3001/routes/notify/MedicalReport', formData, {
                method: "POST",
                body: formData,
                credentials: "include"
            });

            console.log('Response:', response.data);
            // You can handle success response here
            setShowPopup(false); // Close the popup after successful upload
        } catch (error) {
            console.error('Error uploading medical report:', error);
            // You can handle error response here
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-xl mb-4">Upload File for Absent Date</h2>
                <form onSubmit={handleSubmit}>
                    <input type="file" onChange={handleFileChange} required />
                    <div className="mt-4">
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
                        <button
                            type="button"
                            className="bg-gray-500 text-white py-2 px-4 rounded ml-2"
                            onClick={() => setShowPopup(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadMedicalReport;
