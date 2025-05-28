import React, { useState, useEffect } from 'react';
import Sidebar from './SideBar';

function Dashboard() {
  const [data, setData] = useState({
    totalStudents: 0,
    maleStudents: 0,
    femaleStudents: 0,
    totalTutors: 0,
    maleTutors: 0,
    femaleTutors: 0,
  });
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalModules, setTotalModules] = useState(0);

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
        setData({
          totalStudents: json.users.filter(u => u.role === 'student').length,
          maleStudents: json.users.filter(u => u.role === 'student' && u.gender === 'male').length,
          femaleStudents: json.users.filter(u => u.role === 'student' && u.gender === 'female').length,
          totalTutors: json.users.filter(u => u.role === 'teacher').length,
          maleTutors: json.users.filter(u => u.role === 'teacher' && u.gender === 'male').length,
          femaleTutors: json.users.filter(u => u.role === 'teacher' && u.gender === 'female').length,
        })
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
        setTotalModules(json.modules.length);
      })
      .catch((error) => {
        console.error('Error fetching modules:', error);
      });

    fetch('http://localhost:3001/routes/course/specializations')
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to fetch');
        }
      })
      .then((json) => {
        setTotalCourses(json.specializations.length);
      })
      .catch((error) => {
        console.error('Error fetching specializations:', error);
      });

  }, []);





  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700" style={{ marginTop: "6rem" }}>
          <div className="grid grid-cols-2 gap-4">
            {/* Total Tutors Card */}
            <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Total Tutors</h2>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">{data.totalTutors}</p>
            </div>

            {/* Male Tutors Card */}
            <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Male Tutors</h2>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">{data.maleTutors}</p>
            </div>

            {/* Female Tutors Card */}
            <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Female Tutors</h2>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">{data.femaleTutors}</p>
            </div>

            {/* Total Students Card */}
            <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Total Students</h2>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">{data.totalStudents}</p>
            </div>

            {/* Male Students Card */}
            <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Male Students</h2>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">{data.maleStudents}</p>
            </div>

            {/* Female Students Card */}
            <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Female Students</h2>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">{data.femaleStudents}</p>
            </div>

            {/* Total Courses Card */}
            <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Total Courses</h2>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">{totalCourses}</p>
            </div>

            {/* Total Modules Card */}
            <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Total Modules</h2>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">{totalModules}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
