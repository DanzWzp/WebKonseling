import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/register", {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="max-w-md mx-auto mt-10 p-8 bg-white shadow-xl rounded-xl border border-blue-100">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
                    Daftar Akun Baru
                </h2>

                <form onSubmit={submit} className="space-y-5">
                    {/* Name */}
                    <div>
                        <InputLabel htmlFor="name" value="Nama Lengkap" />
                        <div className="relative">
                            <span className="absolute top-2.5 left-3 text-gray-500">
                                <FaUser />
                            </span>
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="pl-10 w-full"
                                autoComplete="name"
                                isFocused
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />
                        </div>
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    {/* Email */}
                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <div className="relative">
                            <span className="absolute top-2.5 left-3 text-gray-500">
                                <FaEnvelope />
                            </span>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="pl-10 w-full"
                                autoComplete="username"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                            />
                        </div>
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    {/* Password */}
                    <div>
                        <InputLabel htmlFor="password" value="Password" />
                        <div className="relative">
                            <span className="absolute top-2.5 left-3 text-gray-500">
                                <FaLock />
                            </span>
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="pl-10 w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                            />
                        </div>
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Konfirmasi Password"
                        />
                        <div className="relative">
                            <span className="absolute top-2.5 left-3 text-gray-500">
                                <FaLock />
                            </span>
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="pl-10 w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </div>
                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    {/* Action */}
                    <div className="flex items-center justify-between">
                        <Link
                            href="/login"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Sudah punya akun?
                        </Link>
                        <PrimaryButton className="ml-4" disabled={processing}>
                            Register
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
