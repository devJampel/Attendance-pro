import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../image/logo.png";

const LandingNavigation = ({ featuresRef, aboutRef, howItWorksRef, contactRef }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();
    const navRef = useRef(null);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 991);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const scrollToRef = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleClick = () => {
        navigate('/signin');
    };

    return (
        <div>
            <nav ref={navRef} className="fixed top-0 z-50 w-full bg-white dark:bg-gray-800 dark:border-gray-700 border-b border-gray-200 overflow-x-auto">
                <div className="flex items-center justify-between px-4 py-2">
                    <div className="flex items-center justify-start rtl:justify-end">
                        {isMobile && (
                            <button onClick={toggleDrawer} aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                        )}
                        <div className="flex items-center">
                            <img src={logo} className="h-12 sm:h-16 lg:h-20" alt="AttendPro Logo" />
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white"></span>
                        </div>
                    </div>
                    <div className="hidden sm:flex sm:items-center sm:h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 mt-5 ms-auto me-auto">
                        <ul className="flex space-x-4 font-medium">
                            <li>
                                <div onClick={() => scrollToRef(featuresRef)} className="flex items-center p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer">
                                    <span className="flex-1 ms-3 whitespace-nowrap">FEATURES</span>
                                </div>
                            </li>
                            <li>
                                <div onClick={() => scrollToRef(aboutRef)} className="flex items-center p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer">
                                    <span className="flex-1 ms-3 whitespace-nowrap">ABOUT US</span>
                                </div>
                            </li>
                            <li>
                                <div onClick={() => scrollToRef(howItWorksRef)} className="flex items-center p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer">
                                    <span className="flex-1 ms-3 whitespace-nowrap">HOW IT WORKS</span>
                                </div>
                            </li>
                            <li>
                                <div onClick={() => scrollToRef(contactRef)} className="flex items-center p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer">
                                    <span className="flex-1 ms-3 whitespace-nowrap">CONTACT</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center ms-3 me-4">
                            <button type="button" className="flex text-sm bg-indigo-500 rounded-lg text-white p-3 me-5 text-center justify-center font-bold items-center align-center" style={{ width: "10rem" }} onClick={handleClick}>
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            {/* Sidebar */}
            {isDrawerOpen && isMobile && (
                <div className="fixed inset-0 z-40">
                    <div className="fixed inset-0" onClick={toggleDrawer}></div>
                    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 overflow-y-auto">
                        <div className="flex items-center justify-between p-4">
                            <div onClick={() => scrollToRef(featuresRef)} className="flex items-center">
                                <img src={logo} className="h-12 w-20" alt="AttendPro Logo" />
                            </div>
                            <button onClick={toggleDrawer} className="text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-lg p-2 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                                </svg>
                            </button>
                        </div>
                        <ul className="space-y-2 font-medium">
                            <li>
                                <div onClick={() => scrollToRef(featuresRef)} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer">
                                    <span className="flex-1 ms-3 whitespace-nowrap">FEATURES</span>
                                </div>
                            </li>
                            <li>
                                <div onClick={() => scrollToRef(aboutRef)} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer">
                                    <span className="flex-1 ms-3 whitespace-nowrap">ABOUT</span>
                                </div>
                            </li>
                            <li>
                                <div onClick={() => scrollToRef(howItWorksRef)} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer">
                                    <span className="flex-1 ms-3 whitespace-nowrap">HOW IT WORKS</span>
                                </div>
                            </li>
                            <li>
                                <div onClick={() => scrollToRef(contactRef)} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer">
                                    <span className="flex-1 ms-3 whitespace-nowrap">CONTACT</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LandingNavigation;
