import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            {/* Hero */}
            <section className="bg-blue-100 py-16 flex-1">
                <div className="container mx-auto px-4 text-center">
                    <img
                        src="https://ui-avatars.com/api/?name=Sultan+Tarmidzi+Korompot&background=1e293b&color=fff&size=150"
                        alt="Profil Guru BK"
                        className="mx-auto rounded-full mb-4 shadow-lg"
                        width={150}
                        height={150}
                    />
                    <h1 className="text-3xl font-bold mb-2">
                        Sultan Tarmidzi Korompot
                    </h1>
                    <p className="text-lg text-gray-700">
                        Guru Bimbingan Konseling
                    </p>
                </div>
            </section>

            {/* About */}
            <section id="about" className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-4 text-center">
                        Tentang Website
                    </h2>
                    <p className="text-gray-700 text-center">
                        Website ini dibuat untuk memudahkan dokumentasi dan
                        pengelolaan proses bimbingan konseling siswa secara
                        digital, mulai dari data siswa, bimbingan, home visit,
                        hingga pencatatan kasus kenakalan remaja.
                    </p>
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="py-12 bg-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold mb-4">Kontak</h2>
                    <p>
                        Email:{" "}
                        <a
                            href="mailto:bk.sultan@example.com"
                            className="text-blue-600 underline"
                        >
                            bk.sultan@example.com
                        </a>
                    </p>
                    <p>No. HP: 0812-3456-7890</p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
