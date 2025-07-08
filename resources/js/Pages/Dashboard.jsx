import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { route } from "ziggy-js";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Bar, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
);
import Footer from "../Components/Footer";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Dashboard({ students = [], stats = {} }) {
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

    // Bar chart data
    const barData = {
        labels: ["Total", "Laki-laki", "Perempuan", "Berprestasi"],
        datasets: [
            {
                label: "Jumlah Siswa",
                data: [
                    stats.total || 0,
                    stats.male || 0,
                    stats.female || 0,
                    stats.withAchievement || 0,
                ],
                backgroundColor: "rgba(59, 130, 246, 0.6)", // biru
                borderRadius: 6,
            },
        ],
    };

    const pieData = {
        labels: ["Laki-laki", "Perempuan"],
        datasets: [
            {
                label: "Jenis Kelamin",
                data: [stats.male || 0, stats.female || 0],
                backgroundColor: ["#3b82f6", "#f472b6"], // biru, pink
            },
        ],
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0,
                    stepSize: 1,
                },
            },
        },
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
                {/* Search Bar */}
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
                            onClick={() => {}}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            title="Cari"
                        >
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 hover:text-blue-600 transition" />
                        </button>
                    </div>
                </div>

                {/* Chart */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {/* Bar Chart */}
                    <div className="bg-white rounded shadow p-4">
                        <h2 className="text-lg font-semibold mb-2 text-center">
                            Analitik Jumlah Siswa (Bar)
                        </h2>
                        <div className="h-72">
                            <Bar data={barData} options={barOptions} />
                        </div>
                    </div>

                    {/* Pie Chart */}
                    <div className="bg-white rounded shadow p-4">
                        <h2 className="text-lg font-semibold mb-2 text-center">
                            Distribusi Gender (Pie)
                        </h2>
                        <div className="h-72">
                            <Pie data={pieData} />
                        </div>
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
            <Footer />
        </div>
    );
}
