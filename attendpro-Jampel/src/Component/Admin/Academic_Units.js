import React, { useState, useEffect } from 'react';
import SpecializationForm from './Form/SpecializationRegForm';
import ModuleForm from './Form/ModuleRegForm';
import Sidebar from './SideBar';

function AcademicUnit() {
    const [specializations, setSpecializations] = useState([]);
    const [modules, setModules] = useState([]);
    const [showSpecializationForm, setShowSpecializationForm] = useState(false);
    const [showModuleForm, setShowModuleForm] = useState(false);
    const [editingSpecialization, setEditingSpecialization] = useState(null);
    const [editingModule, setEditingModule] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3001/routes/module/modules').then((res) => {
            if (res.ok) {
                res.json().then((json) => {
                    setModules(json.modules)
                })
            }
        })

        fetch('http://localhost:3001/routes/course/specializations').then((res) => {
            if (res.ok) {
                res.json().then((json) => {
                    console.log(json)
                    setSpecializations(json.specializations)
                })
            }
        })
    }, []);

    const handleDeleteSpecialization = (index, id) => {
        fetch('http://localhost:3001/routes/course/delete', {
            method: "DELETE",
            body: JSON.stringify({ id }),
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },

        }).then((res) => {
            if (res.ok) {
                const updatedSpecializations = [...specializations];
                updatedSpecializations.splice(index, 1);
                setSpecializations(updatedSpecializations);
                alert("Specialization deleted successfully!");
            } else {
                console.log(res);
                alert("Error deleting specialization.");
            }
        })
    };

    const handleDeleteModule = (index, id) => {
        fetch('http://localhost:3001/routes/module/delete', {
            method: "DELETE",
            body: JSON.stringify({ id }),
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },

        }).then((res) => {
            if (res.ok) {
                const updatedModules = [...modules];
                updatedModules.splice(index, 1);
                setModules(updatedModules);
                alert("Specialization deleted successfully!");
            } else {
                console.log(res);
                alert("Error deleting module.");
            }
        })
    };

    

    

    const handleEditSpecialization = (index) => {
        setEditingSpecialization(specializations[index]);
        setShowSpecializationForm(true);
        setShowModuleForm(false); 
    };

    const handleEditModule = (m) => {
        setEditingModule(m);
        setShowModuleForm(true);
        setShowSpecializationForm(false); // Close SpecializationForm if open
    };

    const handleToggleSpecializationForm = () => {
        setShowSpecializationForm(!showSpecializationForm);
        setShowModuleForm(false); // Close ModuleForm if open
        setEditingSpecialization(null);
    };

    const handleToggleModuleForm = () => {
        setShowModuleForm(!showModuleForm);
        setShowSpecializationForm(false); // Close SpecializationForm if open
        setEditingModule(null);
    };

    return (
        <>
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-24" style={{ marginTop: "6rem" }}>
                    <div className="flex justify-start mb-4">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600" onClick={handleToggleSpecializationForm}>
                            {editingSpecialization ? 'Edit Specialization' : 'Add Specialization'}
                        </button>
                        <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600" onClick={handleToggleModuleForm}>
                            {editingModule ? 'Edit Module' : 'Add Module'}
                        </button>
                    </div>
                    {showSpecializationForm && <SpecializationForm specialization={editingSpecialization} onClose={handleToggleSpecializationForm} />}
                    {showModuleForm && <ModuleForm module={editingModule} onClose={handleToggleModuleForm}/>}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-lg font-bold mb-2">Specializations</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full border border-gray-300 text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="bg-gray-200 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-4 py-2">Specialization Name</th>
                                            <th className="px-4 py-2">Specialization ID</th>
                                            <th className="px-4 py-2">Classes</th>
                                            <th className="px-4 py-2">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {specializations.map((specialization, index) => (
                                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-4 py-2">{specialization.specializationname}</td>
                                                <td className="px-4 py-2">{specialization.specializationId}</td>
                                                <td className="px-4 py-2">{specialization.numofc}</td>
                                                <td className="px-4 py-2 flex items-center">
                                                    <button className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600" onClick={() => handleEditSpecialization(index)}>Edit</button>
                                                    <button className="px-2 py-1 ml-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600" onClick={() => handleDeleteSpecialization(index, specialization._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold mb-2">Modules</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full border border-gray-300 text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="bg-gray-200 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-4 py-2">Module Name</th>
                                            <th className="px-4 py-2">Module Code</th>
                                            <th className="px-4 py-2">Classes</th>
                                            <th className="px-4 py-2">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {modules.map((module, index) => (
                                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-4 py-2">{module.modulename}</td>
                                                <td className="px-4 py-2">{module.modulecode}</td>
                                                <td className="px-4 py-2">{module.numofc}</td>
                                                <td className="px-4 py-2 flex items-center">
                                                    <button className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600" onClick={() => handleEditModule(module)}>Edit</button>
                                                    <button className="px-2 py-1 ml-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600" onClick={() => handleDeleteModule(index, module._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AcademicUnit;