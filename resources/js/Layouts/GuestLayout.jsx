import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-hero-pattern bg-digital bg-cover bg-center flex items-center justify-center px-4">
            <div className="w-full max-w-md space-y-6">
                {/* Logo / Judul */}
                <Link href="/" className="block text-center text-3xl font-bold">
                    <span className="text-blue-700">Web</span>
                    <span className="text-white">Konseling</span>
                </Link>

                {/* Card Form */}
                <div className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-md">
                    {children}
                </div>
            </div>
        </div>
    );
}
