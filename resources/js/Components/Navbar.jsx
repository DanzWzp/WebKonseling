import React from "react";
import { Link, usePage } from "@inertiajs/react";

export default function Navbar() {
    const { auth } = usePage().props;

    return (
        <nav className="bg-white shadow-md sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo kiri */}
                <div className="font-bold text-lg text-blue-700">
                    Konseling Siswa
                </div>

                {/* Menu kanan */}
                <div className="space-x-6 flex items-center">
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

                    {/* ✅ Tampilkan Data Siswa hanya jika login */}
                    {auth?.user && (
                        <Link
                            href="/students"
                            className="text-blue-600 hover:underline"
                        >
                            Data Siswa
                        </Link>
                    )}

                    {/* ✅ Jika BELUM login */}
                    {!auth?.user && (
                        <>
                            <Link
                                href="/login"
                                className="text-blue-700 hover:underline font-medium"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-medium"
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
