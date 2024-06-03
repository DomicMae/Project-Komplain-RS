import { Link } from "@inertiajs/react";

const Navbar = ({ user }) => {
    console.log("isUser?", user);
    return (
        <div className="navbar bg-base-100">
            <div className="flex-none">
                <button className="btn btn-square btn-ghost">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-5 h-5 stroke-current"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </button>
            </div>
            <div className="flex-1">
                <Link className="btn btn-ghost text-xl" as="button">
                    KomplainNews
                </Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-3">
                    <li>
                        <Link>Tentang Komplain</Link>
                    </li>
                    <li>
                        <Link href={route("register")} as="button">
                            Register
                        </Link>
                    </li>
                    <li>
                        <Link href={route("login")} as="button">
                            Login
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
