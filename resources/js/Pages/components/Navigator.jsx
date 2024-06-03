import { Link } from "@inertiajs/react";

const Navigator = ({ user }) => {
    return (
        <div className="navbar bg-base flex flex-wrap justify-between items-center px-2 py-1 bg-green-500">
            <ul className="menu menu-horizontal ml-auto">
                {user && (
                    <li className="border border-black rounded-md bg-white">
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="text-black text-xl"
                        >
                            Logout
                        </Link>
                    </li>
                )}
                {user && (
                    <li>
                        <div className="flex items-center space-x-1">
                            <img
                                src="/images/Avatar_Admin.png"
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full"
                            />
                            <span className="text-black text-xl">
                                Hello, {user.name}
                            </span>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Navigator;
