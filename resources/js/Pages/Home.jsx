import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Hero */}
            <section className="bg-blue-100 py-16">
                <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-8">
                    <div className="text-center md:text-left md:flex-1">
                        <h1 className="text-4xl font-bold text-blue-800 mb-2">
                            Sultan Tarmidzi Korompot
                        </h1>
                        <p className="text-lg text-gray-700 mb-4">
                            Guru Bimbingan Konseling SMA Negeri 3 Gorontalo
                            Utara
                        </p>
                        <p className="text-gray-600">
                            "Mendampingi siswa menemukan solusi terbaik dalam
                            masalah akademik, pribadi, sosial dan karir mereka."
                        </p>
                    </div>
                    <div className="md:flex-1 flex justify-center">
                        <img
                            src="/img/foto.jpg"
                            alt="Foto Profil"
                            className="rounded-full shadow-lg w-52 h-68 object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* About */}
            <section id="about" className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
                        Tentang Website
                    </h2>
                    <p className="text-gray-700 text-center max-w-3xl mx-auto mb-12">
                        Website Konseling Siswa ini bertujuan untuk
                        mendigitalisasi proses pendampingan siswa melalui
                        dokumentasi dan manajemen data yang terstruktur.
                        Fitur-fitur seperti data siswa, laporan bimbingan, home
                        visit, dan pemantauan kasus kenakalan remaja dirancang
                        untuk mendukung peran guru BK dalam menciptakan
                        lingkungan sekolah yang kondusif dan berkarakter.
                    </p>

                    {/* 3 Card Tujuan */}
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-md transition">
                            <h3 className="text-xl font-bold text-blue-700 mb-2">
                                Pendataan Siswa
                            </h3>
                            <p className="text-gray-700 text-sm">
                                Mengelola biodata lengkap siswa secara aman dan
                                terpusat.
                            </p>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-md transition">
                            <h3 className="text-xl font-bold text-blue-700 mb-2">
                                Layanan Bimbingan
                            </h3>
                            <p className="text-gray-700 text-sm">
                                Mendokumentasikan bimbingan akademik, pribadi,
                                dan sosial.
                            </p>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-md transition">
                            <h3 className="text-xl font-bold text-blue-700 mb-2">
                                Pemantauan Masalah
                            </h3>
                            <p className="text-gray-700 text-sm">
                                Mencatat kasus kenakalan dan intervensi untuk
                                penanganan lebih baik.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="py-16 bg-gray-100">
                <div className="container mx-auto px-4 max-w-xl">
                    <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
                        Kontak
                    </h2>
                    <div className="bg-white shadow rounded-lg p-6 space-y-4 text-sm text-gray-700">
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
