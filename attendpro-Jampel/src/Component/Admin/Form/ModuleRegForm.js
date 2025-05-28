import React, { useState } from 'react';

export default function ModuleForm({ onClose, module }) {
    const [moduleName, setModuleName] = useState(module?.modulename ?? "");
    const [moduleCode, setModuleCode] = useState(module?.modulecode ?? "");
    const [numberOfClasses, setNumberOfClasses] = useState(module?.numofc ?? "");
    const [photo, setPhoto] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('modulename', moduleName);
        formData.append('modulecode', moduleCode);
        formData.append('numofc', numberOfClasses);
        if (photo) {
            formData.append('photo', photo);
        }

        let res;
        if (!module) {
            res = await fetch("http://localhost:3001/routes/module/add", {
                method: "POST",
                body: formData,
                credentials: "include"
            });
        } else {
            formData.append('id', module._id)
            res = await fetch("http://localhost:3001/routes/module/update", {
                method: "POST",
                body: formData,
                credentials: "include"
            });
        }


        const message = await res.json();
        if (res.ok) {
            if (!module) {
                
                alert("Module added successfully: " );
            } else {
                
                alert("Module updated successfully: " );
            }
        } else {
            
            alert("Error: " + message);
        }
        

        console.log("Form submitted:", { moduleName, moduleCode, numberOfClasses, photo });
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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="moduleName">
                            Module Name
                        </label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="moduleName" type="text" placeholder="Module Name" value={moduleName} onChange={(e) => setModuleName(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="moduleCode">
                            Module Code
                        </label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="moduleCode" type="text" placeholder="Module Code" value={moduleCode} onChange={(e) => setModuleCode(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numberOfClasses">
                            Number of Classes
                        </label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="numberOfClasses" type="number" placeholder="Number of Classes" value={numberOfClasses} onChange={(e) => setNumberOfClasses(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">
                            Photo
                        </label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="photo" type="file" onChange={(e) => setPhoto(e.target.files[0])} />
                    </div>
                    <div className="d-flex w-100">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ms-auto me-auto" type="submit">
                            { !module ? 'Add' : 'Update'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
