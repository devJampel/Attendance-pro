import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../image/logo.png";
import notifBell from "../image/bell_icon.png";


function getCookie(name) {
    const cookieArray = document.cookie.split('; ');
    for (let cookie of cookieArray) {
      let [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }

const StudentNavigation = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');


    const handleLogout = () => {
        // Clear the authentication cookie
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        // Redirect to the login page
        window.location.href = '/';
    };
    useEffect(() => {
        const token = getCookie('token');
        if (token) {
          try {
            const tokenObject = JSON.parse(token);
            setEmail(tokenObject.email);
            setName(tokenObject.name);
          } catch (error) {
            console.error('Failed to parse token cookie', error);
          }
        }
      }, []);



    const [sidebarOpen, setSidebarOpen] = useState(false);

    
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-white dark:bg-gray-800 dark:border-gray-700 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <button onClick={toggleSidebar} aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <span className="sr-only">Open sidebar</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button>
                        <Link to="/" className="flex ms-2">
                            <img src={logo} className="h-12 w-20 ms-5 mt-4" alt="AttendPro Logo" />
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white"></span>
                        </Link>
                    </div>
                    <div className="hidden sm:flex sm:items-center sm:h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 mt-5 ms-auto me-auto">
                        <ul className="flex space-x-4 font-medium">
                            <li>
                                <Link to="/student" className="flex items-center p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <span className="flex-1 ms-3 whitespace-nowrap">HOME</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/student/modules" className="flex items-center p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <span className="flex-1 ms-3 whitespace-nowrap">MODULES</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/student/myModules" className="flex items-center p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <span className="flex-1 ms-3 whitespace-nowrap">MY MODULES</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/student/markAttendance" className="flex items-center p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <span className="flex-1 ms-3 whitespace-nowrap">MARK ATTENDANCE</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/student/notification" className="flex items-center p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"> {/* Adjusted margin-right to move it left */}
                                    <span className="sr-only">Open Notification</span>
                                    <img src={notifBell} alt="Notification Bell" className="ms-4" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center ms-3 me-4">
                            <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                <span className="sr-only">Open user menu</span>
                                <img className="w-10 h-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="User Profile" />
                            </button>
                        </div>
                        <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                            <div className="px-4 py-3" role="none">
                                <p className="text-sm text-gray-900 dark:text-white" role="none">
                                    {name}
                                </p>
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                                    {email}
                                </p>
                            </div>
                            <ul className="py-1" role="none">
                                <li>
                                    <Link to="/student/studentSetting" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</Link>
                                </li>
                                <li>
                                    <Link onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign Out</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <div className={`fixed inset-0 z-40 ${sidebarOpen ? 'block' : 'hidden'}`}>
                <div className="fixed inset-0" onClick={toggleSidebar}></div>
                <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 overflow-y-auto">
                    <div className="flex items-center justify-between p-4">
                        <Link to="/" className="flex items-center">
                            <img src={logo} className="h-12 w-20" alt="AttendPro Logo" />
                        </Link>
                        <button onClick={toggleSidebar} className="text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-lg p-2 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                            </svg>
                        </button>
                    </div>
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link to="/student" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="flex-1 ms-3 whitespace-nowrap">HOME</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/student/modules" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="flex-1 ms-3 whitespace-nowrap">MODULES</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/student/myModules" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="flex-1 ms-3 whitespace-nowrap">MY MODULES</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/student/markAttendance" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="flex-1 ms-3 whitespace-nowrap">MARK ATTENDANCE</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/student/notify" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="flex-1 ms-3 whitespace-nowrap">NOTIFICATION</span>
                            </Link>
                        </li>
                    </ul>
                    <ul class="space-y-2 font-medium absolute bottom-0 left-0 pb-4 ms-2">
                        <li>
                            <Link  onClick={handleLogout} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="flex-1 ms-3 whitespace-nowrap">SIGN OUT</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default StudentNavigation;
