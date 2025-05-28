import React, { useEffect, useState } from 'react';
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


const OfferedModulesCard = ({ title, image, id, userId }) => {


    const [showEnrollForm, setShowEnrollForm] = useState(false);
    const [password, setPassword] = useState('');

    const handleEnrollClick = () => {
        setShowEnrollForm(true);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleEnrollSubmit = async (event) => {
        event.preventDefault();

        const data = {
            module_id: id,
            user_id: userId,
        };

        try {
            const res = await fetch("http://localhost:3001/routes/enrolledm/enroll", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: "include"
            });
            const message = await res.json();
            
            if(res.ok){
                alert(" Student enrolled successful!");
            }else{
                alert(message.message)
            }

            console.log("Form submitted:", data);
        } catch (error) {
            console.error("Error submitting the form:", error);
        }
    };



    return (
        <div className="relative w-full md:w-1/2 lg:w-1/3 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <img src={`http://localhost:3001/${image}`} alt={title} className="h-full w-full mx-auto mb-4 border-b border-gray-200" style={{ height: "10rem", width: "12rem" }} />
                <h5 className="text-lg font-bold mb-2">{title}</h5>
                <button onClick={handleEnrollClick} className="text-white border-2 border-bg-indigo-500 rounded-lg p-1 bg-indigo-500">Enroll</button>
            </div>
            {showEnrollForm && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center border-2 border-black border rounded-lg bg-black bg-opacity-10 z-50">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Enter Enrollment Password</h2>
                        <form onSubmit={handleEnrollSubmit}>
                            <input type="password" value={password} onChange={handlePasswordChange} className="border border-gray-300 rounded-lg px-4 py-2 mb-2" />
                            <button type="submit" className="bg-indigo-500 text-white rounded-lg px-4 py-2 ms-4">Enroll</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const Modules = () => {
    const [userId, setUserId] = useState();
    const [offeredModulesFeatures, setOfferedModulesFeatures] = useState([
    ]);


    useEffect(() => {
        fetch('http://localhost:3001/routes/module/modules')
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Failed to fetch');
                }
            })
            .then((json) => {
                setOfferedModulesFeatures(json.modules.map(m => ({ 'title': m.modulename, 'image': m.photopath, 'id': m._id })));
            })
            .catch((error) => {
                console.error('Error fetching modules:', error);
            });

        const token = getCookie('token');
        if (token) {
            try {
                const tokenObject = JSON.parse(token);
                setUserId(tokenObject._id);
            } catch (error) {
                console.error('Failed to parse token cookie', error);
            }
        }
    }, []);


    return <>
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
                    <h3 className="text-3xl font-bold text-gray-800">OFFERED MODULES</h3>
                    <div className="p-4 border-2 border-gray-200 border rounded-lg dark:border-gray-700 mt-5 mb-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                            {offeredModulesFeatures.map((feature, index) => {
                                // console.log(feature)
                                return (
                                    <OfferedModulesCard key={index} {...feature} userId={userId}/>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
};

export default Modules;



