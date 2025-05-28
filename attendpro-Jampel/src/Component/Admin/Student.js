import React, { useState, useEffect } from 'react';
import StudentRegister from './Form/StudentRegisterForm';
import Sidebar from './SideBar';

function Student() {
    const [students, setStudent] = useState([]);


    useEffect(() => {
        fetch('http://localhost:3001/routes/admin/getAllUser').then((res) => {
            if (res.ok) {
                res.json().then((json) => {
                    console.log(json)
                    setStudent(json.users.filter(u => u.role === 'student'))
                })
            }
        })


    }, []);

    const [editedStudent, setEditedStudent] = useState(null);
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const handleEdit = (student) => {
        setEditedStudent(student);
    };

    const handleSave = () => {
        const data = {
            id: editedStudent._id,
            email: editedStudent.email,
            name: editedStudent.name,
            studentno: editedStudent.studentno,
            phoneno: editedStudent.phoneno,
            gender: editedStudent.gender,
            role: 'student',
            password: 'password123',
        };

        fetch("http://localhost:3001/routes/admin/update", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: "include"
        }).then(res => {
            if (res.ok) {
                const updatedStudents = students.map(student => {
                    if (student.id === editedStudent.id) {
                        return { ...editedStudent, isEditing: false };
                    }
                    return student;
                });
                setStudent(updatedStudents);

                setEditedStudent(null);

                alert("updated successful");
            } else {
                alert("Error")
            }
        });


    };

    const handleDelete = (index, id) => {
        const updatedStudents = students.filter(student => student.id !== id);
        setStudent(updatedStudents);
        fetch('http://localhost:3001/routes/admin/delete', {
            method: "DELETE",
            body: JSON.stringify({ id }),
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },

        }).then((res) => {
            if (res.ok) {
                const updatedStudents = [...students];
                updatedStudents.splice(index, 1);
                setStudent(updatedStudents);
                alert("Student deleted successfully!");
            } else {
                console.log(res);
                alert("Error deleting the student.");
            }
        })
    };

    const handleChange = (e) => {
        setEditedStudent({ ...editedStudent, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700" style={{ marginTop: "6rem" }}>
                    <div className="flex justify-start mb-4">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600" onClick={() => setShowRegisterForm(!showRegisterForm)}>Add Student</button>
                    </div>

                    {/* Render TutorRegister component conditionally */}
                    {showRegisterForm && <StudentRegister />}

                    <div className="overflow-x-auto">
                        <table className="w-full border-1 border-black text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs border-1 border-black text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Sl. No.</th>
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-6 py-3">Student Number</th>
                                    <th scope="col" className="px-6 py-3">Gender</th>
                                    <th scope="col" className="px-6 py-3">Email</th>
                                    <th scope="col" className="px-6 py-3">Phone Number</th>
                                    <th scope="col" className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student, index) => (
                                    <tr key={student.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-4 py-2">{index + 1}</td>
                                        <td className="px-4 py-2">{student.isEditing ? student.name : <span>{student.name}</span>}</td>
                                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{student.studentno}</td>
                                        <td className="px-4 py-2">{student.gender}</td>
                                        <td className="px-4 py-2">{student.email}</td>
                                        <td className="px-4 py-2">{student.phoneno}</td>
                                        <td className="px-4 py-2 flex items-center">
                                            {student.isEditing ? (
                                                <>
                                                    <button className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 mr-2" onClick={() => handleSave(student.id)}>Save</button>
                                                    <button className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600" onClick={() => setEditedStudent(null)}>Cancel</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-2" onClick={() => handleEdit(student)}>Edit</button>
                                                    <button className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600" onClick={() => handleDelete(index, student._id)}>Delete</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {editedStudent && (
                <div className="p-4 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
                        <h2 className="text-lg font-bold mb-4">Edit Student</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" name="name" value={editedStudent.name} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Studnet Number</label>
                                <input type="text" name="studentno" value={editedStudent.studentno} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full text-gray-500" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Gender</label>
                                <input type="text" name="gender" value={editedStudent.gender} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full text-gray-500" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="text" name="email" value={editedStudent.email} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input type="text" name="phoneNumber" value={editedStudent.phoneno} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                            </div>
                            <div className="text-right">
                                <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-2" onClick={handleSave}>Save</button>
                                <button type="button" className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600" onClick={() => setEditedStudent(null)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Student;
