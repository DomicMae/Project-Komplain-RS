import { Link } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import axios from "axios";

const BodyRiwayatKomplain = ({ user }) => {
    const [daftarKomplain, setDaftarKomplain] = useState([]);
    const [no_telp, setRiwayatKomplain] = useState("");
    const [selectedKomplain, setSelectedKomplain] = useState(null);
    const [isCekRiwayatClicked, setIsCekRiwayatClicked] = useState(false); // State untuk menandai apakah tombol "CEK RIWAYAT" sudah ditekan atau belum

    const handleRiwayatKomplain = (e) => {
        setRiwayatKomplain(e.target.value);
    };

    const handleCekRiwayat = () => {
        fetchData(); // Panggil fungsi fetchData untuk mengambil data riwayat komplain
        setIsCekRiwayatClicked(true); // Set state isCekRiwayatClicked menjadi true saat tombol "CEK RIWAYAT" ditekan
    };

    // Mendefinisikan fetchData di luar useEffect
    const fetchData = async () => {
        const modifiedNoTelp = no_telp.startsWith("+62")
            ? "0" + no_telp.slice(3)
            : no_telp;
        try {
            const response = await axios.get(
                `http://193.168.195.191/api/dataKomplainNoTelp/${modifiedNoTelp}`
            );
            const data = response.data;
            setDaftarKomplain(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        if (no_telp !== "" && isCekRiwayatClicked) {
            fetchData();
        }
    }, [no_telp, isCekRiwayatClicked]); // Memicu pengambilan data saat no_telp berubah

    return (
        <div className="py-12 flex flex-col items-center justify-center">
            <div className="space-y-12">
                <div className="border-0 border-gray-900/10 pb-12">
                    <div className="text-container text-center">
                        <h2 className="text-4xl font-bold text-gray-900">
                            Riwayat Komplain
                        </h2>
                        <p className="mt-1 text-lg text-gray-600">
                            Masukkan nomor telepon anda untuk menemukan riwayat
                            yang pernah anda isi
                        </p>
                    </div>
                </div>
            </div>
            {/* Input untuk no_telp untuk Riwayat Komplain */}
            <div className="items-center mb-6 w-full max-w-md">
                <div className="sm:col-span-4">
                    <label
                        htmlFor="no-telp"
                        className="block text-sm font-medium leading-6 text-gray-900 text-center"
                    >
                        Masukkan Nomor Telepon
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="no-telp"
                            value={no_telp}
                            onChange={handleRiwayatKomplain}
                            id="no-telp"
                            autoComplete="off"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Masukkan Nomer Telepon Anda"
                            style={{ textAlign: "center" }}
                        />
                    </div>
                </div>
            </div>
            {/* Tombol Submit */}
            <div className="flex items-center justify-center mb-6">
                <button
                    type="button"
                    onClick={handleCekRiwayat}
                    className="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    CEK RIWAYAT
                </button>
            </div>
            {/* Daftar Komplain */}
            <div className={`mt-8 ${isCekRiwayatClicked ? "" : "hidden"}`}>
                {/* Tabel keterangan */}
                <div className="rounded-md py-1 px-4 md:px-5 grid gap-4">
                    <div className="bg-gray-900 rounded-lg p-4 grid grid-cols-1 md:grid-cols-7 gap-4">
                        <div className="col-span-1 md:col-span-1 flex items-center justify-start">
                            <p className="text-left text-white">Nama</p>
                        </div>
                        <div className="col-span-1 md:col-span-2 flex items-center justify-start">
                            <p className="text-left text-white">Judul</p>
                        </div>
                        <div className="col-span-1 md:col-span-2 flex items-center justify-start md:justify-center">
                            <p className="text-left md:text-center text-white">
                                Kronologi
                            </p>
                        </div>
                        <div className="col-span-1 md:col-span-1 flex items-center justify-center">
                            <p className="text-center text-white">Unit</p>
                        </div>
                        <div className="col-span-1 md:col-span-1 flex items-center justify-center">
                            <p className="text-center text-white">Tanggal</p>
                        </div>
                    </div>
                </div>

                <div className="py-1 px-4 md:px-5 grid grid-cols-1 md:grid-cols-7 gap-4">
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
                                key={komplain.id}
                                className={`col-span-1 md:col-span-7 rounded-lg p-4 grid grid-cols-1 md:grid-cols-7 gap-4 border justify-center items-center ${bgClass} ${borderClass}`}
                            >
                                <Link
                                    href={`isiPesanKomplainCustomer?id=${komplain.id}`}
                                    className="col-span-1 md:col-span-7 rounded-lg grid grid-cols-1 md:grid-cols-7 gap-4 justify-center items-center"
                                >
                                    {/* Grid 01: nama */}
                                    <div className="col-span-1 flex items-center justify-start">
                                        <p className="text-sm font-semibold mb-2 text-black">
                                            {komplain.nama}
                                        </p>
                                    </div>
                                    {/* Grid 02: judul */}
                                    <div className="col-span-1 md:col-span-2 flex items-center justify-start">
                                        <p className="text-sm font-semibold mb-2 text-center text-black">
                                            {komplain.judul}
                                        </p>
                                    </div>
                                    {/* Grid 03: kronologi */}
                                    <div className="col-span-1 md:col-span-2 flex items-start justify-start">
                                        <p className="text-sm font-semibold mb-2 text-justify text-black">
                                            {komplain.kronologi}
                                        </p>
                                    </div>
                                    {/* Grid 04: unit */}
                                    <div className="col-span-1 flex items-center justify-center">
                                        <p className="text-sm font-semibold mb-2 text-center text-black">
                                            {komplain.unit}
                                        </p>
                                    </div>
                                    {/* Grid 05: tanggal */}
                                    <div className="col-span-1 flex items-center justify-end">
                                        <p className="text-sm font-semibold mb-2 text-center text-black">
                                            {tanggal} {bulan} {tahun}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default BodyRiwayatKomplain;
