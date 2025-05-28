import React, { useState } from 'react';

export default function SpecializationForm({ onClose, specialization }) {
    const [specializationName, setSpecializationName] = useState(specialization?.specializationname ?? "");
    const [specializationID, setSpecializationID] = useState(specialization?.specializationId ?? "");
    const [numberOfClasses, setNumberOfClasses] = useState(specialization?.numofc ?? "");



    const handleSubmit = async (e) => {
        e.preventDefault();

        let data = {
            specializationname: specializationName,
            specializationId: specializationID,
            numofc: numberOfClasses,

        };

        try {

            let res;
            if (!specialization) {
                res = await fetch("http://localhost:3001/routes/course/create", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                    credentials: "include"
                });
            } else {
                data = {...data, 'id': specialization._id}
                console.log( data)
                res = await fetch("http://localhost:3001/routes/course/update", {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                    credentials: "include"
                });
            }
            const message = await res.json();
            if (res.ok) {
                if (!specialization) {
                    
                    alert("Course added successfully: " );
                } else {
                    
                    alert("Course updated successfully: " );
                }
            } else {
                
                alert("Error: " + message);
            }
            

            console.log("Form submitted:", { specializationName, specializationID, numberOfClasses });
        } catch (error) {
            console.error("Error submitting the form:", error);
        }
    };

    return (
        <div className="container mx-auto mt-8 mb-4">
            <div className="bg-white shadow-md rounded px-8 py-6 relative">
                <button className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-900" onClick={onClose}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="specializationName">
                            Specialization Name
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="specializationName"
                            type="text"
                            placeholder="Specialization Name"
                            value={specializationName}
                            onChange={(e) => setSpecializationName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="specializationID">
                            Specialization ID
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="specializationID"
                            type="text"
                            placeholder="Specialization ID"
                            value={specializationID}
                            onChange={(e) => setSpecializationID(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numberOfClasses">
                            Number of Classes
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="numberOfClasses"
                            type="number"
                            placeholder="Number of Classes"
                            value={numberOfClasses}
                            onChange={(e) => setNumberOfClasses(e.target.value)}
                        />
                    </div>

                    <div className="d-flex w-100">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ms-auto me-auto"
                            type="submit"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
