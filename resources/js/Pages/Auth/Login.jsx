import { HiMail, HiLockClosed } from "react-icons/hi";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post("/login", {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Login" />

            <div className="max-w-md mx-auto mt-12 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                {/* Icon & Title */}
                <div className="text-center mb-6">
                    <div className="flex justify-center mb-2">
                        <div className="bg-blue-100 p-3 rounded-full shadow">
                            <HiLockClosed className="text-blue-600 text-3xl" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Login ke Akun Anda
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Silakan masukkan email dan password Anda
                    </p>
                </div>

                {/* Status Alert */}
                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={submit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <div className="relative">
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full pl-10"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <HiMail className="absolute left-3 top-3 text-gray-400" />
                        </div>
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    {/* Password */}
                    <div>
                        <InputLabel htmlFor="password" value="Password" />
                        <div className="relative">
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full pl-10"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            <HiLockClosed className="absolute left-3 top-3 text-gray-400" />
                        </div>
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                            />
                            <span className="ml-2 text-sm text-gray-600">
                                Remember me
                            </span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href="/forgot-password"
                                className="text-sm text-blue-600 hover:text-blue-800 underline"
                            >
                                Lupa password?
                            </Link>
                        )}
                    </div>

                    {/* Button */}
                    <PrimaryButton
                        className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white py-2"
                        disabled={processing}
                    >
                        Masuk
                    </PrimaryButton>
                </form>

                {/* Register Link */}
                <p className="mt-6 text-sm text-center text-gray-600">
                    Belum punya akun?{" "}
                    <Link
                        href="/register"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Daftar Sekarang
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}
