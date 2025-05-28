import React, { useState, useEffect } from 'react';
import TutorSidebar from './TutorSideBar';

function MyModule() {
  const [tutorData, setTutorData] = useState({
    totalTutors: 0,
    maleTutors: 0,
    femaleTutors: 0,
  });
  const [modules, setModules] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/routes/admin/getAllUser')
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to fetch');
        }
      })
      .then((json) => {
        setTutorData({
          totalTutors: json.users.filter(u => u.role === 'teacher').length,
          maleTutors: json.users.filter(u => u.role === 'teacher' && u.gender === 'male').length,
          femaleTutors: json.users.filter(u => u.role === 'teacher' && u.gender === 'female').length,
        });
      })
      .catch((error) => {
        console.error('Error fetching tutors:', error);
      });

    fetch('http://localhost:3001/routes/module/modules')
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to fetch');
        }
      })
      .then((json) => {
        setModules(json.modules);
      })
      .catch((error) => {
        console.error('Error fetching modules:', error);
      });
  }, []);

  const handleViewAttendance = moduleId => {
    console.log('View attendance for module:', moduleId);
    // You can handle the navigation or other actions here
  };

  return (
    <>
      <TutorSidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700" style={{ marginTop: "6rem" }}>
          <div className="grid grid-cols-2 gap-4">
            {modules.map(module => (
              <div key={module.id} className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{module.modulename}</h3>
                <p className="text-gray-600 dark:text-gray-400">Students Enrolled: {module.students.length}</p>
                <button
                  className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleViewAttendance(module.id)}
                >
                  View Attendance
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyModule;
