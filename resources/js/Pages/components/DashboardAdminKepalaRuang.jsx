import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const DashboardAdminKepalaRuang = ({ user }) => {
    const [kodeDataHariIni, setKodeDataHariIni] = useState(null);
    const [kodeDataBulanIni, setKodeDataBulanIni] = useState(null);

    useEffect(() => {
        const fetchKomplainCountHariIni = async () => {
            try {
                const today = new Date();
                const formattedDate = today.toISOString().split("T")[0]; // Mendapatkan tanggal hari ini dan memformatnya sebagai YYYY-MM-DD
                const response = await axios.get(
                    `http://193.168.195.191/api/countkomplain/${formattedDate}`
                );
                setKodeDataHariIni(response.data.count);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchKomplainCountBulanIni = async () => {
            try {
                const today = new Date();
                const year = today.getFullYear();
                const month = today.getMonth() + 1;
                const response = await axios.get(
                    `http://193.168.195.191/api/countkomplain/${year}/${month}`
                );
                setKodeDataBulanIni(response.data.count);
            } catch (error) {
                console.log(error);
            }
        };

        fetchKomplainCountHariIni();
        fetchKomplainCountBulanIni();
    }, []);

    return (
        <div className="flex flex-col py-12 px-14 text-black">
            <h2>Dashboard</h2>

            <div className="flex space-x-8">
                <div className="w-2/5 h-[150px] border rounded flex flex-col justify-center p-4 mt-5 text-gray-600">
                    <span className="py-3 text-center">
                        Jumlah komplain yang masuk hari ini
                    </span>
                    <span className="text-2xl text-center">
                        {kodeDataHariIni}
                    </span>
                    {/* Menampilkan jumlah komplain yang diterima hari ini */}
                </div>
                <div className="w-2/5 h-[150px] border rounded flex flex-col justify-center p-4 mt-5 text-gray-600">
                    <span className="py-3 text-center">
                        Jumlah komplain yang masuk bulan ini
                    </span>
                    <span className="text-2xl text-center">
                        {kodeDataBulanIni}
                    </span>
                    {/* Menampilkan jumlah komplain yang diterima hari ini */}
                </div>
            </div>
        </div>
    );
};

export default DashboardAdminKepalaRuang;
