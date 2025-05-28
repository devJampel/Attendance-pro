import React, {useEffect, useState } from 'react';
import TutorSidebar from './TutorSideBar';


function Notification() {
    const [notifications, setNotifications] = useState([]);
    const [modules, setModules] = useState([]);
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      const fetchNotifications = async () => {
        try {
          const res = await fetch('http://localhost:3001/routes/notify/reports');
          if (!res.ok) throw new Error('Failed to fetch notifications');
          const json = await res.json();
          setNotifications(json.medicalreports);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      };

      const fetchUsers = async () => {
        try {
          const res = await fetch('http://localhost:3001/routes/admin/getAllUser');
          if (!res.ok) throw new Error('Failed to fetch users');
          const json = await res.json();
          setUsers(json.users.filter(u => u.role === 'student'));
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

      const fetchModules = async () => {
        try {
          const res = await fetch('http://localhost:3001/routes/module/modules');
          if (!res.ok) throw new Error('Failed to fetch modules');
          const json = await res.json();
          setModules(json.modules);
        } catch (error) {
          console.error('Error fetching modules:', error);
          console.log(modules,"modules")
        }
      };
  
      fetchNotifications();
      fetchUsers();
      fetchModules();
    }, []);
  
      

    

    return (
        <>
            <TutorSidebar />
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700" style={{ marginTop: "6rem" }}>
                    <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                    <div className="space-y-4">
                        {notifications.map((notification) => (
                            <div key={notification.id} className="flex items-start p-4 bg-white border border-gray-300 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-600">
                                <div className="flex-shrink-0">
                                    <svg className="h-6 w-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2a9 9 0 0 0-9 9v5H2v2h20v-2h-1v-5a9 9 0 0 0-9-9zm0 2a7 7 0 0 1 7 7v5H5v-5a7 7 0 0 1 7-7zm0 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {
                                        `A medical report is sent by ${users.find(u => notification.student_id === u._id)?.name} for module ${modules.find(m => notification.module_id === m._id)?.modulename}`
                                    }</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{notification.createdAt}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Notification;
