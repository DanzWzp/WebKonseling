import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import {
    FaUserGraduate,
    FaHandsHelping,
    FaExclamationTriangle,
} from "react-icons/fa";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Hero */}
            <section className="min-h-screen bg-techbg text-white relative bg-hero-pattern overflow-hidden flex items-center">
                <div className="container mx-auto px-6 relative z-10">
                    {/* Konten kiri */}
                    <div className="max-w-2xl pt-24 md:pt-32 lg:pt-40 text-center lg:text-left mx-auto lg:mx-0">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 border-r-4 border-white pr-2 whitespace-nowrap overflow-hidden w-max mx-auto lg:mx-0 animate-typingName">
                            Sultan M. Tarmizi Korompot
                        </h1>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-mono text-green-300 border-r-4 border-green-400 pr-2 whitespace-nowrap overflow-hidden w-max mx-auto lg:mx-0 animate-typingRole mb-6">
                            Counseling & Guidance
                        </h2>
                        <a
                            href="#contact"
                            className="inline-block mt-2 bg-cyan-400 text-black px-6 py-2 rounded-md font-semibold shadow hover:bg-cyan-300 transition"
                        >
                            Hubungi Saya
                        </a>
                    </div>
                </div>

                {/* Gambar kanan bawah (desktop only) */}
                <div className="hidden lg:block absolute bottom-0 right-6 z-0">
                    <img
                        src="/img/foto.png"
                        alt="Foto Profil"
                        className="w-[420px] max-w-none object-contain drop-shadow-xl"
                    />
                </div>
            </section>

            {/* About */}
            <section
                id="about"
                className="relative bg-white overflow-hidden py-24"
            >
                {/* Background Shape */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse -z-10"></div>
                    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-100 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse -z-10"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <h2 className="text-4xl font-bold text-center text-blue-800 mb-4">
                        Tentang Website
                    </h2>
                    <p className="text-gray-700 text-center max-w-3xl mx-auto mb-16 leading-relaxed">
                        Website Konseling Siswa ini bertujuan untuk
                        mendigitalisasi proses pendampingan siswa melalui
                        dokumentasi dan manajemen data yang terstruktur. Sistem
                        ini mendukung guru BK dalam menyusun, memantau, dan
                        mengevaluasi perkembangan siswa baik secara akademik,
                        pribadi, maupun sosial secara terintegrasi dan
                        terdokumentasi.
                    </p>

                    {/* 3 Card */}
                    <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                        {[
                            {
                                icon: (
                                    <FaUserGraduate
                                        size={36}
                                        className="text-blue-600 mb-2"
                                    />
                                ),
                                title: "Pendataan Siswa",
                                desc: "Mengelola biodata lengkap siswa secara aman dan terpusat.",
                            },
                            {
                                icon: (
                                    <FaHandsHelping
                                        size={36}
                                        className="text-blue-600 mb-2"
                                    />
                                ),
                                title: "Layanan Bimbingan",
                                desc: "Mendokumentasikan bimbingan akademik, pribadi, dan sosial.",
                            },
                            {
                                icon: (
                                    <FaExclamationTriangle
                                        size={36}
                                        className="text-blue-600 mb-2"
                                    />
                                ),
                                title: "Pemantauan Masalah",
                                desc: "Mencatat kasus kenakalan dan intervensi untuk penanganan lebih baik.",
                            },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl border hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-1 text-center"
                            >
                                {item.icon}
                                <h3 className="text-xl font-bold text-blue-700 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Profil & Gambar */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="w-full overflow-hidden relative">
                            <div className="transform -skew-x-6 overflow-hidden">
                                <img
                                    src="/img/aboutlogo.jpg"
                                    alt="Ilustrasi Konseling"
                                    className="transform skew-x-6 w-full h-auto object-contain"
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-blue-800 mb-4">
                                Sultan M. Tarmizi Korompot
                            </h3>
                            <p className="text-gray-700 text-justify mb-6 leading-relaxed">
                                Sebagai guru Bimbingan dan Konseling di SMA
                                Negeri 3 Gorontalo Utara, beliau berperan aktif
                                dalam pengembangan sistem konseling digital.
                                Dengan platform ini, beliau ingin menghadirkan
                                layanan konseling yang tidak hanya informatif,
                                tapi juga inspiratif dan profesional.
                            </p>
                            <a
                                href="#quote"
                                className="inline-block bg-blue-600 text-white px-5 py-2 rounded-md font-medium hover:bg-blue-700 transition w-fit"
                            >
                                Lihat Quote
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote */}
            <section
                id="quote"
                className="min-h-screen bg-slate-800 flex items-center justify-center px-4 py-20"
            >
                <div className="max-w-4xl text-center">
                    <blockquote className="text-2xl md:text-3xl font-semibold text-cyan-300 italic leading-relaxed">
                        Setiap orang sukses pasti mempunyai kegagalan Jangan
                        takut gagal karena{" "}
                        <span className="relative inline-block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-500">
                            <span className="relative text-white px-2">
                                kegagalan
                            </span>
                        </span>{" "}
                        adalah bagian dari kesuksesan.
                    </blockquote>
                </div>
            </section>

            {/* Contact */}
            <section
                id="contact"
                className="bg-gradient-to-br from-blue-100 via-white to-blue-50 px-6 pt-16 pb-0 min-h-screen"
            >
                <div className="container mx-auto space-y-12">
                    <h2 className="text-4xl font-bold text-blue-800 text-center mt-12">
                        Kontak Saya
                    </h2>

                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        {/* Informasi Kontak */}
                        <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-md border border-blue-100 text-gray-700 font-[Inter] text-sm leading-relaxed">
                            <div className="flex">
                                <span className="w-36 font-semibold text-gray-800">
                                    Guru BK:
                                </span>
                                <span>Sultan M. Tarmizi Korompot, S.Pd</span>
                            </div>
                            <div className="flex">
                                <span className="w-36 font-semibold text-gray-800">
                                    Email:
                                </span>
                                <a
                                    href="mailto:bk.sultan@example.com"
                                    className="text-blue-600 underline hover:text-blue-800 transition"
                                >
                                    bk.sultan@example.com
                                </a>
                            </div>
                            <div className="flex">
                                <span className="w-36 font-semibold text-gray-800">
                                    No. HP:
                                </span>
                                <span>0812-3456-7890</span>
                            </div>
                            <div className="flex">
                                <span className="w-36 font-semibold text-gray-800">
                                    Alamat Sekolah:
                                </span>
                                <span>
                                    Jl. Bintara No.72, Desa Pinontoyonga, Kec.
                                    Atinggola, Gorontalo Utara
                                </span>
                            </div>
                            <p className="mt-4 text-center text-blue-800 font-semibold text-lg italic tracking-wide">
                                <span className="inline-block text-blue-500 mr-2">
                                    🎓
                                </span>
                                Konselor Profesional
                            </p>
                        </div>

                        {/* Form Kontak */}
                        <form className="bg-gray-900 text-white p-6 rounded-xl shadow-md space-y-4 border border-gray-700">
                            <input
                                type="text"
                                placeholder="Nama Anda"
                                className="w-full p-2 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 text-white"
                            />
                            <input
                                type="email"
                                placeholder="Email Anda"
                                className="w-full p-2 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 text-white"
                            />
                            <textarea
                                placeholder="Pesan..."
                                rows="4"
                                className="w-full p-2 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 text-white"
                            ></textarea>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                            >
                                Kirim
                            </button>
                        </form>
                    </div>

                    {/* Maps */}
                    <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-md">
                        <iframe
                            title="Lokasi SMA N 3 Gorontalo Utara"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31816.93425375909!2d123.1138656!3d0.8942945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x327ead7a71eb4b0f%3A0xfe68dae5b6b3f1d3!2sSMA%20N%203%20Gorontalo%20Utara!5e0!3m2!1sen!2sid!4v1689336975483!5m2!1sen!2sid"
                            className="w-full h-full border-none"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
