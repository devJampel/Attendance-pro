import React, { useState, useEffect } from 'react';
import TutorSideBar from './TutorSideBar';

const TutorDashboard = () => {
    const [module, setModule] = useState();
    const [students, setStudents] = useState([]);
    const [availableYears, setAvailableYears] = useState([]);
    const [availableClasses, setAvailableClasses] = useState([]);
    const [availableModules, setAvailableModules] = useState([]);
    const [year, setYear] = useState();
    const [classType, setClassType] = useState('');
    const [moduleCode, setModuleCode] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/routes/admin/getAllUser')
            .then((res) => res.ok && res.json())
            .then((json) => {
                const studentData = json.users.filter(u => u.role === 'student');
                setStudents(studentData);
                const years = [...new Set(studentData.map(student => student.year))];
                const classes = [...new Set(studentData.map(student => student.clas))];
                setAvailableYears(years);
                setAvailableClasses(classes);
            })
            .catch((error) => console.error('Error fetching data:', error));

        fetch('http://localhost:3001/routes/module/modules')
            .then((res) => res.ok && res.json())
            .then((json) => { setAvailableModules(json.modules) })
            .catch((error) => console.error('Error fetching modules:', error));
    }, []);

    const handleModuleChange = (e) => {
        const selectedModule = availableModules.find(mod => mod._id === e.target.value);
        setModule(selectedModule);
    };

    const handleYearChange = (e) => setYear(parseInt(e.target.value));
    const handleClassChange = (e) => setClassType(e.target.value);

    const handleAbsentClick = (studentId, dateIndex) => {
        console.log(`Student ID: ${studentId}, Date Index: ${dateIndex}`);
    };

    return (
        <>
            <TutorSideBar />
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700" style={{ marginTop: "6rem" }}>
                    <div className="table-container overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th colSpan={3} rowSpan={3} className="text-center align-middle">Student Information</th>
                                    <th colSpan={2} className="text-center align-middle">
                                        <select
                                            value={year}
                                            onChange={handleYearChange}
                                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        >
                                            <option value="-1">Select A Year</option>
                                            {availableYears.map((year, index) => (
                                                <option key={index} value={year}>{year}</option>
                                            ))}
                                        </select>
                                    </th>
                                    {/* <th colSpan={2} className="text-center align-middle">
                                        <select
                                            value={classType}
                                            onChange={handleClassChange}
                                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        >
                                            <option value="" disabled>Select Class</option>
                                            {availableClasses.map((classType, index) => (
                                                <option key={index} value={classType}>{classType}</option>
                                            ))}
                                        </select>
                                    </th> */}
                                </tr>
                                <tr>
                                    <th colSpan={4} className="text-center align-middle">
                                        <select
                                            value={module ? module._id : null}
                                            onChange={handleModuleChange}
                                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        >
                                            <option value="">Select Module</option>
                                            {availableModules.map((mod, index) => (
                                                <option key={index} value={mod._id}>{mod.modulename}</option>
                                            ))}
                                        </select>
                                    </th>
                                </tr>
                                <tr>
                                    <th colSpan={4} className="text-center">Module Code: {module?.modulecode || 'N/A'}</th>
                                </tr>
                                <tr>
                                    <th>Sl. No</th>
                                    <th>Name</th>
                                    <th>Student ID</th>
                                    <th colSpan={2}>Attendance</th>
                                </tr>
                            </thead>
                            {/* {module ? module.students : "ff"} */}
                            <tbody>
                                {students.filter(std => year ? std.year === year : true).filter(std => module ? module.students.includes(std._id) : true).map((student, index) => (
                                    <tr key={student.id}>
                                        <td>{index + 1} {student._id}</td>
                                        <td>{student.name}</td>
                                        <td>{student.studentno}</td>
                                        <td colSpan={2}>
                                            {student.year}
                                            {/* <div className="flex justify-around">
                                                {student.attendance.map((status, idx) => (
                                                    <div key={idx} className="flex flex-col items-center">
                                                        <span>{status.date}</span>
                                                        {status.status === 'absent' ? (
                                                            <button
                                                                className="bg-red-500 text-white px-2 py-1 rounded"
                                                                onClick={() => handleAbsentClick(student.id, idx)}
                                                            >
                                                                {status.status}
                                                            </button>
                                                        ) : (
                                                            <span>{status.status}</span>
                                                        )}
                                                    </div>
                                                ))}
                                            </div> */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TutorDashboard;
