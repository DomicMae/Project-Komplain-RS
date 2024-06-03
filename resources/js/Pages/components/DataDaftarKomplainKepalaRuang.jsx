import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "@inertiajs/react";
import { Trash2 } from "lucide-react";

const DataDaftarKomplainKepalaRuang = ({ user }) => {
    const [daftarKomplain, setDaftarKomplain] = useState([]);
    const [sortBy, setSortBy] = useState("latest"); // State untuk opsi sort by

    const handleTrashClick = async (id) => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/hapuskomplain",
                { id }
            );
            console.log(response.data);
            // Kemungkinan lainnya, Anda dapat memperbarui daftar komplain setelah penghapusan dengan mengambil ulang data
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDaftarKomplain((prevDaftarKomplain) => {
                return prevDaftarKomplain.map((komplain) => {
                    return { ...komplain };
                });
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    // Fungsi untuk mengubah opsi sort by
    const handleSortByChange = (e) => {
        setSortBy(e.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/dataKomplainLevelHijau`
                );
                let sortedKomplain = response.data;

                // Mengurutkan data berdasarkan tanggal
                sortedKomplain.sort((a, b) => {
                    const dateA = new Date(a.created_at);
                    const dateB = new Date(b.created_at);
                    return sortBy === "latest" ? dateB - dateA : dateA - dateB;
                });

                setDaftarKomplain(sortedKomplain);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [sortBy]); // Memicu pengambilan data saat sortBy berubah

    return (
        <div className="w-full">
            <div>
                <div className="py-3 px-5 flex items-center justify-between">
                    <h1 className="px-5 text-2xl font-bold mb-4 text-black ">
                        Daftar Komplain
                    </h1>
                    <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-900 bg-gray-0 hover:bg-gray-100 cursor-pointer rounded">
                        <p>Sort By :</p>
                        <select
                            className="focus:outline-none bg-transparent ml-1"
                            value={sortBy}
                            onChange={handleSortByChange}
                        >
                            <option
                                value="latest"
                                className="text-sm text-indigo-800"
                            >
                                Latest
                            </option>
                            <option
                                value="oldest"
                                className="text-sm text-indigo-800"
                            >
                                Oldest
                            </option>
                        </select>
                    </div>
                </div>
                {/* Tabel keterangan */}
                <div className="px-5">
                    <div className="px-5 py-3 bg-gray-900 rounded-lg grid grid-cols-7 gap-4">
                        <div className="col-span-1">
                            <p className="text-left text-white">Nama</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-left text-white">Judul</p>
                        </div>
                        <div className="col-span-1">
                            <p className="text-center text-white">Level</p>
                        </div>
                        <div className="col-span-1">
                            <p className="text-center text-white">Unit</p>
                        </div>
                        <div className="col-span-1">
                            <p className="text-center text-white">Tanggal</p>
                        </div>
                        <div className="col-end">
                            <p className="text-center text-white">Action</p>
                        </div>
                    </div>
                </div>
                <div className="py-2 px-5 grid grid-cols-7 gap-4">
                    {daftarKomplain.map((komplain) => {
                        // Mengubah format tanggal dari ISO string menjadi objek tanggal
                        const createdAt = new Date(komplain.created_at);
                        // Mendapatkan tanggal, bulan, dan tahun
                        const tanggal = createdAt.getDate();
                        const bulan = createdAt.toLocaleString("default", {
                            month: "long",
                        });
                        const tahun = createdAt.getFullYear();
                        const bgClass =
                            komplain.id % 2 === 1
                                ? "bg-gray-200"
                                : "bg-gray-200";
                        const borderClass =
                            komplain.id % 2 === 1
                                ? "border-black"
                                : "border-black";

                        return (
                            <div
                                className={`col-span-7 rounded-lg p-4 grid grid-cols-7 gap-4 border justify-center items-center ${bgClass} ${borderClass}`}
                            >
                                <Link
                                    key={komplain.id}
                                    href={`isiPesanKomplainKepalaRuang?id=${komplain.id}`}
                                    className={`col-span-6 rounded-lg grid grid-cols-6 gap-4 justify-center items-center ${bgClass} ${borderClass}`}
                                >
                                    {/* Grid 01: komplain.nama */}
                                    <div className="flex justify-start items-center col-span-1">
                                        <p className="text-sm font-semibold mb-2 text-black">
                                            {komplain.nama}
                                        </p>
                                    </div>
                                    {/* Grid 02: komplain.judul */}
                                    <div className="flex justify-start items-center col-span-2">
                                        <p className="text-sm font-semibold mb-2 text-black">
                                            {komplain.judul}
                                        </p>
                                    </div>
                                    {/* Grid 03: countdown */}
                                    <div
                                        className={`flex justify-center items-center ${
                                            komplain.namaLevel === "Hijau"
                                                ? "text-green-500"
                                                : "text-yellow-500"
                                        }`}
                                    >
                                        <p className="text-sm font-semibold mb-2 text-center">
                                            Level {komplain.namaLevel}
                                        </p>
                                    </div>
                                    {/* Grid 04: unit */}
                                    <div className="flex justify-center items-center">
                                        <p className="text-sm font-semibold mb-2 text-center text-black">
                                            {komplain.unit}
                                        </p>
                                    </div>
                                    {/* Grid 05: tanggal */}
                                    <div className="flex justify-center items-center">
                                        <p className="text-sm font-semibold mb-2 text-center text-black">
                                            {tanggal} {bulan} {tahun}
                                        </p>
                                    </div>
                                </Link>
                                {/* Tombol delete di luar struktur Link */}
                                <div className="flex justify-center items-center">
                                    <button
                                        onClick={() =>
                                            handleTrashClick(komplain.id)
                                        }
                                        className="flex bg-red-500 text-white rounded-full p-2 hover:bg-red-600 focus:outline-none focus:bg-red-600"
                                    >
                                        <Trash2 className="mr-1" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DataDaftarKomplainKepalaRuang;
