import React, { useState, useEffect } from 'react';

export default function TutorRegister() {
    const [activeTab, setActiveTab] = useState('single');
    const [employeeName, setEmployeeName] = useState("");
    const [employeeID, setEmployeeID] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [employeeGender, setEmployeeGender] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (selectedFile) {
            setUploadStatus('File uploaded successfully');
        } else {
            setUploadStatus('Please select a file to upload');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: email,
            name: employeeName,
            employeeid: employeeID,
            phoneno: contactNumber,
            gender: employeeGender,
            role: 'teacher',
            password: 'password123',
        };

        try {
            const res = await fetch("http://localhost:3001/routes/admin/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: "include"
            });
            const message = await res.json();
            console.log(message);
            alert(" Tutor Registration successful!");

            console.log("Form submitted:", { employeeName, employeeID, employeeGender, email, contactNumber });
        } catch (error) {
            console.error("Error submitting the form:", error);
        }
    };

    const handleTabClick = (e, tabId) => {
        e.preventDefault();
        setActiveTab(tabId);
    };

    useEffect(() => {
        const handleLoad = () => {
            let theTabs = document.querySelectorAll('[data-target]'),
                contentPanes = document.querySelectorAll('[data-id]'),
                i;

            function theTabClicks(e) {
                e.preventDefault();
                let clickedTab = e.target,
                    activePaneId = clickedTab.getAttribute('data-target'),
                    activePane = document.querySelector('[data-id="' + activePaneId + '"]');

                for (i = 0; i < theTabs.length; i++) {
                    theTabs[i].classList.remove('active');
                    contentPanes[i].classList.remove('active');
                }
                clickedTab.classList.add('active');
                activePane.classList.add('active');
            }

            for (i = 0; i < theTabs.length; i++) {
                theTabs[i].addEventListener('click', theTabClicks);
            }
        };

        window.addEventListener('load', handleLoad);

        return () => {
            window.removeEventListener('load', handleLoad);
        };
    }, []);

    return (
        <div className="justify-center items-center h-screen">
            <div className="p-4 rounded-lg dark:border-gray-700">
                <div className="container mx-auto mt-8">
                    <div className="bg-white shadow-md rounded px-8 py-6">
                        <div className="flex mb-4 w-100 rounded">
                            <div className="ms-auto me-auto rounded-lg">
                                <button onClick={(e) => handleTabClick(e, 'single')} className={`py-2 px-4 ${activeTab === 'single' ? 'bg-blue-500 text-white rounded-lg' : 'bg-gray-300 text-gray-700 rounded-lg'} focus:outline-none`}>Register Tutor</button>
                                <button onClick={(e) => handleTabClick(e, 'bulk')} className={`py-2 px-4 ${activeTab === 'bulk' ? 'bg-blue-500 text-white rounded-lg' : 'bg-gray-300 text-gray-700 rounded-lg'} focus:outline-none`}>Bulk Uploading</button>
                            </div>
                        </div>
                        <div className="mb-4">
                            {activeTab === 'single' && (
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2 shadow-none" htmlFor="employeeName">
                                            Employee Name
                                        </label>
                                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="employeeName" type="text" placeholder="Employee Name" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2 shadow-none" htmlFor="employeeID">
                                            Employee ID
                                        </label>
                                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="employeeID" type="text" placeholder="Employee ID" value={employeeID} onChange={(e) => setEmployeeID(e.target.value)} />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2 shadow-none" htmlFor="employeeGender">
                                            Gender
                                        </label>
                                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="employeeGender" type="text" placeholder="Gender" value={employeeGender} onChange={(e) => setEmployeeGender(e.target.value)} />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2 shadow-none" htmlFor="email">
                                            Email
                                        </label>
                                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2 shadow-none" htmlFor="contactNumber">
                                            Contact Number
                                        </label>
                                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="contactNumber" type="tel" placeholder="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
                                    </div>
                                    <div className='w-100 d-flex'>
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ms-auto me-auto" type="submit">
                                            Add
                                        </button>
                                    </div>
                                </form>
                            )}
                            {activeTab === 'bulk' && (
                                <form onSubmit={(e) => { e.preventDefault(); handleUpload(); }}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2 shadow-none" htmlFor="tutorFile">
                                            Choose File
                                        </label>
                                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="tutorFile" type="file" onChange={handleFileChange} />
                                    </div>
                                    <div className="w-100 d-flex">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ms-auto me-auto" type="button" onClick={handleUpload}>
                                            Upload
                                        </button>
                                    </div>

                                    <div className="text-gray-700">{uploadStatus}</div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
