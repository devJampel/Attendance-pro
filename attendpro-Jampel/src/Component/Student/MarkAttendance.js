import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import StudentNavigation from './StudentNavigation';
import mobileImage from '../image/mobile.png';
import Footer from './Footer';
import msmo from '../image/quotes.png';
import scanImg from '../image/scan_1.png';

const MarkAttendance = () => {
    const [scanResult, setScanResult] = useState('');

    const handleScan = (data) => {
        if (data) {
            setScanResult(data);
            console.log('Scanned data:', data);
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

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
                    <h1 className="flex w-full font-semibold text-center items-center justify-center">Mark Your Attendance</h1>
                    <div className="mt-16 flex flex-col md:flex-row items-center">
                        <div className="flex w-full md:w-1/2 p-4 text-center items-center justify-center">
                            <img src={msmo} alt="AttendPro" className="mt-5" style={{ height: "35rem" }} />
                        </div>
                        <div className="relative w-full md:w-1/2 p-4 text-center items-center justify-center">
                            <div className="relative" style={{ height: "33rem", width: "33rem" }}>
                                <img src={scanImg} alt="ScanArea" className="w-full h-full object-cover" />
                                <p className="font-semibold text-gray-600">Scan the QR code provided by your teacher here!</p>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-full h-full">
                                        <QrReader
                                            delay={300}
                                            onError={handleError}
                                            onResult={(result, error) => {
                                                if (!!result) {
                                                    handleScan(result?.text);
                                                }
                                                if (!!error) {
                                                    handleError(error);
                                                }
                                            }}
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {scanResult && (
                        <div className="mt-4 text-center">
                            <p className="text-green-600 font-semibold">Scanned Data: {scanResult}</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MarkAttendance;
