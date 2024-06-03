import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    ClipboardList,
    History,
    RefreshCcw,
} from "lucide-react";
import { useState } from "react";

const navLink = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        route: "index",
    },
    {
        name: "Daftar Komplain",
        icon: ClipboardList,
        route: "daftarKomplain",
    },
    {
        name: "Riwayat Komplain",
        icon: History,
        route: "riwayatKomplainCSO",
    },
];
const variants = {
    expanded: { width: "20%" },
    nonExpanded: { width: "7.5%" },
};

const NavigationBarDashboardCSO = ({ user }) => {
    console.log("isUser?", user);
    const [activeNavIndex, setActiveNavIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <motion.div
            animate={isExpanded ? "expanded" : "nonExpanded"}
            variants={variants}
            className={
                "px-5 py-5 flex flex-col border border-r-1 w-1/5 h-screen relative" +
                (isExpanded ? " px-10" : " px-3")
            }
        >
            <div className="flex items-center justify-center">
                <img
                    className={`w-${isExpanded ? 14 : 12} h-${
                        isExpanded ? 14 : 12
                    }
                    }`}
                    src="/images/Logo_Background.png"
                    alt="image description"
                />
            </div>

            <div
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-5 h-5 bg-[#1BBD36] rounded-full -right-[10.5px] top-12 flex items-center justify-center cursor-pointer absolute"
            >
                <img
                    src="/images/chevron-right.svg"
                    alt=""
                    className="w-[15px]"
                />
            </div>
            <div className="mt-10 flex flex-col space-y-8 text-black">
                {navLink.map((item, index) => (
                    <div
                        key={index}
                        className={
                            "flex space-x-2 p-2 rounded" +
                            (activeNavIndex === index
                                ? " bg-[#1BBD36] text-white font-semibold"
                                : "")
                        }
                        onClick={() => {
                            setActiveNavIndex(index);
                        }}
                    >
                        <Link
                            href={route(item.route)}
                            className="flex items-center "
                        >
                            <item.icon size={24} className="mr-2" />
                            <span className={isExpanded ? "block" : "hidden"}>
                                {item?.name}
                            </span>
                        </Link>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default NavigationBarDashboardCSO;
