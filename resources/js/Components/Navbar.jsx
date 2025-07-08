import React, { useState, useEffect, useRef } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function Navbar() {
    const { auth } = usePage().props;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef();

    // Klik di luar dropdown → tutup
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo kiri */}
                <div className="font-bold text-lg text-blue-700">
                    Konseling Siswa
                </div>

                {/* Menu kanan */}
                <div className="space-x-6 flex items-center relative">
                    <a
                        href="/"
                        className="text-gray-700 hover:text-blue-700 font-medium"
                    >
                        Home
                    </a>
                    <a
                        href="#about"
                        className="text-gray-700 hover:text-blue-700 font-medium"
                    >
                        About
                    </a>
                    <a
                        href="#contact"
                        className="text-gray-700 hover:text-blue-700 font-medium"
                    >
                        Contact
                    </a>
                    <Link
                        href="/dashboard"
                        className="text-gray-700 hover:text-blue-700 font-medium"
                    >
                        information
                    </Link>

                    {/* ✅ Dropdown klik hanya jika login */}
                    {auth?.user && (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="text-green-700 font-semibold focus:outline-none"
                            >
                                Counseling Guidance ▾
                            </button>

                            {dropdownOpen && (
                                <div className="absolute bg-white border border-black shadow-md mt-2 right-0 min-w-[180px] z-50 rounded-md">
                                    <Link
                                        href="/students"
                                        className="block px-4 py-2 text-green-700 font-semibold hover:bg-green-100 no-underline border-b border-gray-200"
                                    >
                                        Data Siswa
                                    </Link>

                                    <Link
                                        href="/bimbingan"
                                        className="block px-4 py-2 text-green-700 font-semibold hover:bg-green-100 no-underline border-b border-gray-200"
                                    >
                                        Data Bimbingan
                                    </Link>

                                    <Link
                                        href="/home-visit"
                                        className="block px-4 py-2 text-green-700 font-semibold hover:bg-green-100 no-underline"
                                    >
                                        Home Visit
                                    </Link>

                                    <Link
                                        href="/kenakalan"
                                        className="block px-4 py-2 text-green-700 font-semibold hover:bg-green-100 no-underline"
                                    >
                                        Kenakalan Remaja
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ✅ Jika BELUM login */}
                    {!auth?.user && (
                        <>
                            <Link
                                href="/login"
                                className="text-blue-700 hover:text-yellow-700 font-bold"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-medium no-underline"
                            >
                                Register
                            </Link>
                        </>
                    )}

                    {/* ✅ Jika SUDAH login */}
                    {auth?.user && (
                        <>
                            <span className="text-gray-600 text-sm mr-2">
                                {auth.user.name}
                            </span>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-medium"
                            >
                                Logout
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
