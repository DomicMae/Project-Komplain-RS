import { Link } from "@inertiajs/react";
import { useState } from "react";

const NavbarCustomer = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    return (
        <div className="navbar bg-white flex items-center justify-between px-4 py-2">
            <div className="flex items-center">
                <img
                    className="w-14 h-14"
                    src="/images/Logo_Background.png"
                    alt="image description"
                />
                {isMobileMenuOpen && (
                    <Link
                        href={route("home")}
                        className="btn btn-ghost text-xl text-green-500"
                        as="button"
                    >
                        RS GOTONG<span className="text-black">ROYONG</span>
                    </Link>
                )}
            </div>
            <div className="flex-none text-black relative">
                <button
                    className="block md:hidden focus:outline-none"
                    onClick={toggleMobileMenu}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {isMobileMenuOpen ? (
                            ""
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        )}
                    </svg>
                </button>
                <ul
                    className={`menu menu-horizontal md:flex space-x-4 ${
                        isMobileMenuOpen ? "block" : "hidden"
                    }`}
                >
                    <li>
                        <Link href={route("riwayat")} as="button">
                            <a
                                className="text-black hover:text-green-600"
                                role="button"
                            >
                                Riwayat Komplain
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={route("cekLiveTracking")} as="button">
                            <a
                                className="text-black hover:text-green-600"
                                role="button"
                            >
                                Live Tracking
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={route("about")} as="button">
                            <a
                                className="text-black hover:text-green-600"
                                role="button"
                            >
                                Tentang Komplain
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={route("isi-komplain")} as="button">
                            <a
                                className="text-black hover:text-green-600"
                                role="button"
                            >
                                Isi Komplain
                            </a>
                        </Link>
                    </li>
                </ul>
                {isMobileMenuOpen && (
                    <button
                        className="absolute top-full right-0 bg-white p-2"
                        onClick={toggleMobileMenu}
                    >
                        <svg
                            className="w-6 h-6 text-black"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default NavbarCustomer;
