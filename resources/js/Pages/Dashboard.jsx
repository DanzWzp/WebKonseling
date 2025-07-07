// resources/js/Pages/Dashboard.jsx
import React from "react";
import Navbar from "../Components/Navbar";

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="text-center mt-20">
                <h1 className="text-4xl font-bold text-blue-700">
                    Selamat Datang
                </h1>
                <p className="mt-4 text-gray-600 text-lg">
                    Sistem Informasi Bimbingan dan Konseling
                </p>
            </div>
        </div>
    );
}
