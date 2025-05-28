import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StudentNavigation from './StudentNavigation';
import Footer from './Footer';
import UploadMedicalReport from './Form/uploadMR';


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

// Sample data generation for days in a month
const generateAttendanceData = (days) => {
    return Array.from({ length: days }, (_, i) => ({
        date: i + 1,
        status: (i + 1) % 2 === 0 ? 'Present' : 'Absent', // Sample data: even days are present, odd days are absent
    }));
};

const months = [
    { name: 'January', days: 31 },
    { name: 'February', days: 28 },
    { name: 'March', days: 31 },
    { name: 'April', days: 30 },
    { name: 'May', days: 31 },
    { name: 'June', days: 30 },
    { name: 'July', days: 31 },
    { name: 'August', days: 31 },
    { name: 'September', days: 30 },
    { name: 'October', days: 31 },
    { name: 'November', days: 30 },
    { name: 'December', days: 31 },
];

const ViewAttendance = () => {
    const currentMonthIndex = new Date().getMonth();
    const [selectedMonth, setSelectedMonth] = useState(currentMonthIndex);
    const [showPopup, setShowPopup] = useState(false);
    const [studentId, setStudentId] = useState();
    const [selectedDate, setSelectedDate] = useState(null);
    // const [selectedFile, setSelectedFile] = useState(null);
    // const [modules, setModules] = useState([]);
    // const [users, setUsers] = useState([]);
    const { moduleId } = useParams();

    useEffect(() => {
        const token = getCookie('token');
        if (token) {
            try {
                const tokenObject = JSON.parse(token);
                
                setStudentId(tokenObject._id);
                
            } catch (error) {
                console.error('Failed to parse token cookie', error);
            }
        }

        const fetchAttendanceData = async () => {
            try {
                const res = await fetch(`http://localhost:3001/routes/attendance/${moduleId}`);
                if (!res.ok) throw new Error('Failed to fetch attendance data');
                const json = await res.json();
                
                const attendanceData = json.attendanceData;
                
                setSelectedMonth(attendanceData[0].month);
            } catch (error) {
                console.error('Error fetching attendance data:', error);
            }
        };

        fetchAttendanceData();
    }, [moduleId]);

    

    const attendanceData = generateAttendanceData(months[selectedMonth].days);

    const handleMonthChange = (e) => {
        setSelectedMonth(Number(e.target.value));
    };

    const handleAbsentClick = (date) => {
        setSelectedDate(date);
        setShowPopup(true);
    };

    // const handleFileChange = (e) => {
    //     setSelectedFile(e.target.files[0]);
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setShowPopup(false);
    //     setSelectedFile(null);
    // };

    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    const renderCalendarDays = () => {
        const year = new Date().getFullYear();
        const firstDayOfMonth = getFirstDayOfMonth(year, selectedMonth);
        const daysInMonth = months[selectedMonth].days;
        const calendarDays = [];

        // Add empty slots for days of the previous month
        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarDays.push(<div key={`empty-${i}`} className="p-2 sm:p-4 border rounded-lg"></div>);
        }

        // Add the actual days of the selected month
        attendanceData.forEach((data, index) => {
            calendarDays.push(
                <div
                    key={index}
                    className={`p-2 sm:p-4 border rounded-lg ${data.status === 'Present' ? 'bg-green-200' : 'bg-red-200 cursor-pointer'}`}
                    onClick={data.status === 'Absent' ? () => handleAbsentClick(data.date) : null}
                >
                    <div className="text-center text-xs sm:text-base">{data.date}</div>
                    <div className="text-center text-xs sm:text-base hidden sm:block">{data.status}</div>
                </div>
            );
        });

        return calendarDays;
    };

    return (
        <>
            <StudentNavigation />
            <div className="p-4 mt-5">
                <h1>Attendance for Module ID: {moduleId}</h1> 
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700" style={{ marginTop: "8rem" }}>
                    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
                        <div className="mb-4">
                            <label htmlFor="month" className="block text-sm font-medium text-gray-700">Select Month:</label>
                            <select
                                id="month"
                                name="month"
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                value={selectedMonth}
                                onChange={handleMonthChange}
                            >
                                {months.map((month, index) => (
                                    <option key={index} value={index}>{month.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="calendar">
                            <div className="grid grid-cols-7 gap-2 sm:gap-4">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                                    <div key={index} className="font-bold text-center text-xs sm:text-base">{day}</div>
                                ))}
                                {renderCalendarDays()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showPopup && (
                <UploadMedicalReport moduleId={moduleId} studentId={studentId}/>
            )}

            <Footer />
        </>
    );
};

export default ViewAttendance;
