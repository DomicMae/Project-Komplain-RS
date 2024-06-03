import { useEffect, useState } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false); // State untuk menentukan apakah password ditampilkan atau tidak
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword); // Mengubah nilai state untuk menampilkan atau menyembunyikan password
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <div className="flex items-center">
                <img
                    className="w-36 mx-auto mb-5 max-w-full max-h-ful"
                    src="/images/Logo_Background.png"
                    alt="image description"
                />
            </div>
            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={handleOnChange}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4 my-16 relative">
                    <InputLabel htmlFor="password" value="Password" />
                    <div className="relative">
                        <TextInput
                            id="password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full pr-10"
                            autoComplete="current-password"
                            onChange={handleOnChange}
                        />
                        {/* Tombol untuk mengubah visibilitas password */}
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center justify-center focus:outline-none"
                            onClick={toggleShowPassword}
                        >
                            {showPassword ? (
                                <EyeOff className="h-6 w-6 text-gray-400" /> // Icon untuk menunjukkan password tidak terlihat
                            ) : (
                                <Eye className="h-6 w-6 text-gray-400" /> // Icon untuk menunjukkan password terlihat
                            )}
                        </button>
                    </div>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-center mt-4">
                    <PrimaryButton className="ml-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
