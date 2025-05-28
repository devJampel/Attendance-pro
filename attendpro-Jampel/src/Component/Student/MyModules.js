import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StudentNavigation from './StudentNavigation';
import mobileImage from '../image/mobile.png';
import Footer from './Footer';

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

const MyModulesCard = ({ title, image, id }) => {
    // Construct the URL dynamically with the module ID
    const viewAttendanceURL = `/student/viewAttendance/${id}`;

    return (
        <div className="relative w-full md:w-1/2 lg:w-1/3 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <img src={'http://localhost:3001/' + image} alt={title} className="h-full w-full mx-auto mb-4 border-b border-gray-200" style={{ height: "10rem", width: "12rem" }} />
                <h5 className="text-lg font-bold mb-2">{title}</h5>
                {/* Pass the dynamic URL */}
                <Link to={viewAttendanceURL} className="text-white border-2 border-bg-indigo-500 rounded-lg p-1 bg-indigo-500">View Attendance</Link>
            </div>
        </div>
    );
};

const MyModules = () => {
    const [userId, setUserId] = useState();
    const [myModulesFeatures, setMyModulesFeatures] = useState([]);

    useEffect(() => {
        const token = getCookie('token');
        let uid;
        if (token) {
            try {
                const tokenObject = JSON.parse(token);
                setUserId(tokenObject._id);
                uid = tokenObject._id;
            } catch (error) {
                console.error('Failed to parse token cookie', error);
            }
        }

        fetch('http://localhost:3001/routes/module/modules')
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Failed to fetch');
                }
            })
            .then((json) => {
                const modules = json.modules;
                const features = modules.filter(m => m.students.includes(uid)).map(module => ({ 'title': module.modulename, 'image': module.photopath, id: module._id }));
                setMyModulesFeatures(features);
            })
            .catch((error) => {
                console.error('Error fetching modules:', error);
            });
    }, []);

    return (
        <>
            <StudentNavigation />
            <div className="mb-4">
                <div className="container mx-auto px-4 py-8 mt-5">
                    <div className="flex flex-col md:flex-row items-center mt-8">
                        <div className="w-full md:w-1/2 p-4">
                            <h2 className="text-lg font-semibold text-gray-800">Experience the future of attendance management</h2>
                            <h1 className="text-4xl font-bold text-gray-900 mt-4">
                                Transform The Way You{" "}
                                <span
                                    style={{
                                        background: "linear-gradient(to right, #8EA5FE, #BEB3FD, #90D1FF)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent"
                                    }}
                                >
                                    Track Attendance
                                </span>
                            </h1>
                            <p className="text-gray-600 mt-4">Say goodbye to paper records and hello to seamless digital attendance management using Blockchain Technology.</p>
                        </div>
                        <div className="w-full md:w-1/2 p-4">
                            <img src={mobileImage} alt="Mobile" className="w-full h-auto mb-5 mt-5" />
                        </div>
                    </div>
                    <div className="text-center">
                        <h3 className="text-3xl font-bold text-gray-800">MY MODULES</h3>
                        <div className="p-4 border-2 border-gray-200 border rounded-lg dark:border-gray-700 mt-5 mb-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                                {myModulesFeatures.map((feature, index) => (
                                    <MyModulesCard key={index} {...feature} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyModules;
