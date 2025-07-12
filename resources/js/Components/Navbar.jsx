import React, { useState, useEffect, useRef } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { HiOutlineMenu, HiX } from "react-icons/hi";

export default function Navbar() {
    const { auth } = usePage().props;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const dropdownRef = useRef();

    // Tutup dropdown saat klik luar
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const scrollToSection = (hash) => {
        router.visit(`/#${hash}`, {
            preserveScroll: false,
            preserveState: true,
            onSuccess: () => {
                setTimeout(() => {
                    const el = document.getElementById(hash);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 100);
            },
        });
        setMobileOpen(false); // Tutup nav saat mobile
    };

    return (
        <nav className="bg-white shadow-md fixed top-0 w-full z-50 border-b border-gray-100 backdrop-blur-md bg-opacity-95">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="text-2xl font-bold tracking-tight">
                    <span className="text-blue-700">Web</span>
                    <span className="text-black">Konseling</span>
                </div>

                {/* Tombol hamburger */}
                <div className="md:hidden">
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="text-gray-700 focus:outline-none"
                    >
                        {mobileOpen ? (
                            <HiX size={28} />
                        ) : (
                            <HiOutlineMenu size={28} />
                        )}
                    </button>
                </div>

                {/* Menu utama (desktop) */}
                <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <a
                        href="/"
                        className="text-gray-700 hover:text-blue-700 transition"
                    >
                        Home
                    </a>
                    <button
                        onClick={() => scrollToSection("about")}
                        className="text-gray-700 hover:text-blue-700 transition"
                    >
                        About
                    </button>
                    <button
                        onClick={() => scrollToSection("contact")}
                        className="text-gray-700 hover:text-blue-700 transition"
                    >
                        Contact
                    </button>
                    <Link
                        href="/dashboard"
                        className="text-gray-700 hover:text-blue-700 transition"
                    >
                        Information
                    </Link>

                    {/* Dropdown Guidance */}
                    {auth?.user && (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="text-green-700 font-semibold hover:text-green-800 transition"
                            >
                                Counseling Guidance ▾
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg w-52 z-50 animate-fade-in">
                                    <Link
                                        href="/students"
                                        className="block px-4 py-2 hover:bg-green-50 text-green-800 border-b"
                                    >
                                        Data Siswa
                                    </Link>
                                    <Link
                                        href="/bimbingan"
                                        className="block px-4 py-2 hover:bg-green-50 text-green-800 border-b"
                                    >
                                        Data Bimbingan
                                    </Link>
                                    <Link
                                        href="/home-visit"
                                        className="block px-4 py-2 hover:bg-green-50 text-green-800 border-b"
                                    >
                                        Home Visit
                                    </Link>
                                    <Link
                                        href="/kenakalan"
                                        className="block px-4 py-2 hover:bg-green-50 text-green-800"
                                    >
                                        Kenakalan Remaja
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Auth */}
                    {!auth?.user ? (
                        <>
                            <Link
                                href="/login"
                                className="text-blue-700 hover:text-yellow-600 font-bold"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <>
                            <span className="text-gray-800 font-medium">
                                <span className="text-red-700">
                                    Selamat Datang
                                </span>{" "}
                                {auth.user.name}
                            </span>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
                            >
                                Logout
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4 border-t border-gray-200">
                    <a
                        href="/"
                        onClick={() => setMobileOpen(false)}
                        className="block text-gray-700 hover:text-blue-700"
                    >
                        Home
                    </a>
                    <button
                        onClick={() => scrollToSection("about")}
                        className="block text-gray-700 hover:text-blue-700"
                    >
                        About
                    </button>
                    <button
                        onClick={() => scrollToSection("contact")}
                        className="block text-gray-700 hover:text-blue-700"
                    >
                        Contact
                    </button>
                    <Link
                        href="/dashboard"
                        className="block text-gray-700 hover:text-blue-700"
                        onClick={() => setMobileOpen(false)}
                    >
                        Information
                    </Link>

                    {auth?.user && (
                        <>
                            <Link
                                href="/students"
                                className="block text-green-800"
                                onClick={() => setMobileOpen(false)}
                            >
                                Data Siswa
                            </Link>
                            <Link
                                href="/bimbingan"
                                className="block text-green-800"
                                onClick={() => setMobileOpen(false)}
                            >
                                Data Bimbingan
                            </Link>
                            <Link
                                href="/home-visit"
                                className="block text-green-800"
                                onClick={() => setMobileOpen(false)}
                            >
                                Home Visit
                            </Link>
                            <Link
                                href="/kenakalan"
                                className="block text-green-800"
                                onClick={() => setMobileOpen(false)}
                            >
                                Kenakalan Remaja
                            </Link>
                        </>
                    )}

                    {!auth?.user ? (
                        <>
                            <Link
                                href="/login"
                                className="block text-blue-700 font-semibold"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="block text-white bg-green-600 px-4 py-2 rounded-md w-fit hover:bg-green-700"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <>
                            <div className="text-gray-800 font-medium">
                                <span className="text-red-700">
                                    Selamat Datang
                                </span>{" "}
                                {auth.user.name}
                            </div>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-fit mt-2"
                            >
                                Logout
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
