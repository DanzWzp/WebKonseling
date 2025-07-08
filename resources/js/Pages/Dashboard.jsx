import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { route } from "ziggy-js";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function Dashboard({ students = [] }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleIndividualExport = (studentId, type) => {
        if (type === "full") {
            window.open(route("export.student.full", studentId), "_blank");
        }
    };

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

            <div className="max-w-6xl mx-auto mt-12 px-4">
                {/* Search Center */}
                <div className="flex justify-center mb-6">
                    <div className="relative w-full md:w-1/3">
                        <input
                            type="text"
                            placeholder="Cari nama siswa..."
                            className="border border-blue-400 focus:ring-blue-400 ring-1 rounded px-4 py-2 w-full pr-10"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <button
                            onClick={() => alert(`Cari: ${searchTerm}`)} // ganti sesuai fungsimu
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            title="Cari"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-500 hover:text-blue-600 transition"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 15z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Tabel Siswa */}
                <div className="overflow-x-auto bg-white shadow rounded">
                    <table className="min-w-full text-left">
                        <thead className="bg-blue-100">
                            <tr>
                                <th className="px-4 py-2 border">Nama</th>
                                <th className="px-4 py-2 border">
                                    Jenis Kelamin
                                </th>
                                <th className="px-4 py-2 border">
                                    Asal Sekolah
                                </th>
                                <th className="px-4 py-2 border text-center">
                                    Export
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((student) => (
                                <tr
                                    key={student.id}
                                    className="hover:bg-gray-100"
                                >
                                    <td className="px-4 py-2 border">
                                        {student.name}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {student.gender}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {student.school_origin}
                                    </td>
                                    <td className="px-4 py-2 border text-center">
                                        <select
                                            defaultValue=""
                                            onChange={(e) =>
                                                handleIndividualExport(
                                                    student.id,
                                                    e.target.value
                                                )
                                            }
                                            className="border border-gray-300 rounded px-2 py-1"
                                        >
                                            <option value="">Export</option>
                                            <option value="full">
                                                Data Siswa + Bimbingan
                                            </option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                            {filteredStudents.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="text-center py-4 text-gray-500"
                                    >
                                        Tidak ada siswa ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
