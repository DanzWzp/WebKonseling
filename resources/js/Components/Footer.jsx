import React from "react";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto px-4 text-center">
                &copy; {new Date().getFullYear()} Konseling Siswa — Sultan
                Tarmidzi Korompot
            </div>
        </footer>
    );
}
