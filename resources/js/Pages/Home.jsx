import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Hero */}
            <section className="bg-gray-50 py-24">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
                    {/* Left Text */}
                    <div className="md:w-1/2 text-center md:text-left">
                        <p className="text-sm uppercase tracking-widest text-gray-500">
                            Selamat Datang!
                        </p>
                        <h1 className="text-5xl font-bold text-gray-800 mb-2">
                            Sultan Tarmidzi Korompot
                        </h1>
                        <p className="text-xl text-gray-600 mb-6">
                            Counseling Guidance
                        </p>
                    </div>
                    {/* Right Image */}
                    <div className="md:w-1/2 flex justify-center">
                        <img
                            src="/img/foto.jpg"
                            alt="Foto Profil"
                            className="w-64 h-auto rounded-lg shadow-xl object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* About */}
            <section id="about" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-blue-800 mb-6">
                        Tentang Website
                    </h2>
                    <p className="text-gray-700 text-center max-w-3xl mx-auto mb-12">
                        Website Konseling Siswa ini bertujuan untuk
                        mendigitalisasi proses pendampingan siswa melalui
                        dokumentasi dan manajemen data yang terstruktur.
                    </p>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card */}
                        {[
                            {
                                title: "Pendataan Siswa",
                                desc: "Mengelola biodata lengkap siswa secara aman dan terpusat.",
                            },
                            {
                                title: "Layanan Bimbingan",
                                desc: "Mendokumentasikan bimbingan akademik, pribadi, dan sosial.",
                            },
                            {
                                title: "Pemantauan Masalah",
                                desc: "Mencatat kasus kenakalan dan intervensi untuk penanganan lebih baik.",
                            },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-md transition"
                            >
                                <h3 className="text-xl font-bold text-blue-700 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-700 text-sm">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Awards */}
            <section id="awards" className="py-20 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-blue-800 mb-10">
                        Penghargaan & Prestasi
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Penghargaan Guru BK Teladan",
                                desc: "Diberikan oleh Dinas Pendidikan atas dedikasi dan pendekatan inovatif dalam membimbing siswa.",
                            },
                            {
                                title: "Pemateri Nasional BK 2023",
                                desc: "Menjadi pembicara dalam seminar nasional mengenai konseling digital dan remaja.",
                            },
                            {
                                title: "Inisiator Sistem BK Digital",
                                desc: "Merancang dan mengimplementasikan sistem konseling berbasis website pertama di sekolah.",
                            },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
                            >
                                <h4 className="text-lg font-semibold text-blue-700 mb-2">
                                    🏆 {item.title}
                                </h4>
                                <p className="text-sm text-gray-700">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-xl">
                    <h2 className="text-4xl font-bold text-center text-blue-800 mb-6">
                        Kontak
                    </h2>
                    <div className="bg-gray-50 shadow rounded-lg p-6 space-y-4 text-sm text-gray-700">
                        <p>
                            <strong>Guru BK:</strong> Sultan Tarmidzi Korompot
                        </p>
                        <p>
                            <strong>Email:</strong>{" "}
                            <a
                                href="mailto:bk.sultan@example.com"
                                className="text-blue-600 underline"
                            >
                                bk.sultan@example.com
                            </a>
                        </p>
                        <p>
                            <strong>No. HP:</strong> 0812-3456-7890
                        </p>
                        <p>
                            <strong>Alamat Sekolah:</strong> Jl. Bintara No.72,
                            Desa Pinontoyonga, Kec. Atinggola, Gorontalo Utara
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
