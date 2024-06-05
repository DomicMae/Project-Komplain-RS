import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "@inertiajs/react";
import { data } from "autoprefixer";

const CekLupaCode = ({ title, description }) => {
    const [daftarKomplain, setDaftarKomplain] = useState([]);
    const [no_telp, setRiwayatKomplain] = useState("");
    const [isCekRiwayatClicked, setIsCekRiwayatClicked] = useState(false); // State untuk menandai apakah tombol "CEK RIWAYAT" sudah ditekan atau belum

    const handleCopyToClipboard = (kode) => {
        navigator.clipboard
            .writeText(kode)
            .then(() => alert("Kode berhasil disalin ke clipboard!"))
            .catch((error) =>
                console.error("Gagal menyalin kode ke clipboard: ", error)
            );
    };

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
                `http://193.168.195.191/api/livetrackingByTelp/${modifiedNoTelp}`
                // `http://localhost/laract10/public/api/livetracking/${liveTrackingCode}`
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
                            Cek Kode Live Tracking
                        </h2>
                        <p className="mt-1 text-lg text-gray-600">
                            Masukkan nomor telepon anda untuk mendapatkan kode
                            di bawah ini
                        </p>
                    </div>
                </div>
            </div>
            {/* Input untuk no_telp untuk Riwayat Komplain */}
            <div className="items-center mb-6">
                <div className="sm:col-span-4">
                    <label
                        htmlFor="Riwayat Komplain"
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
                <div className="rounded-md py-1 px-5 grid grid-cols-7 gap-4">
                    <div className="bg-gray-900 col-span-7 rounded-lg p-4 grid grid-cols-7 gap-4">
                        <div className="col-span-1 flex items-center justify-start">
                            <p className="text-left text-white">Nama</p>
                        </div>
                        <div className="col-span-2 flex items-center justify-start">
                            <p className="text-left text-white">Judul</p>
                        </div>
                        <div className="col-span-1 flex items-center justify-center">
                            <p className="text-center text-white">Unit</p>
                        </div>
                        <div className="col-span-1 flex items-center justify-center">
                            <p className="text-center text-white">Tanggal</p>
                        </div>
                        <div className="col-span-1 flex items-center justify-center">
                            <p className="text-center text-white">Kode</p>
                        </div>
                        <div className="col-end flex items-center justify-center">
                            <p className="text-center text-white">Action</p>
                        </div>
                    </div>
                </div>
                <div className="py-1 px-5 grid grid-cols-7 gap-4">
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
                                <div
                                    key={komplain.kode}
                                    className={`col-span-7 rounded-lg grid grid-cols-7 gap-4 justify-center items-center ${bgClass} ${borderClass}`}
                                >
                                    {/* Grid 01: nama */}
                                    <div className="col-span-1 flex items-center justify-start">
                                        <p className="text-sm font-semibold mb-2 text-black">
                                            {komplain.nama}
                                        </p>
                                    </div>
                                    {/* Grid 02: kronologi */}
                                    <div className="col-span-2 flex items-center justify-start">
                                        <p className="text-sm font-semibold mb-2 text-black">
                                            {komplain.kronologi}
                                        </p>
                                    </div>
                                    {/* Grid 03: unit */}
                                    <div className="col-span-1 flex items-center justify-center">
                                        <p className="text-sm font-semibold mb-2 text-center text-black">
                                            {komplain.unit}
                                        </p>
                                    </div>

                                    {/* Grid 04: tanggal */}
                                    <div className="col-span-1 flex items-center justify-center">
                                        <p className="text-sm font-semibold mb-2 text-center text-black">
                                            {tanggal} {bulan} {tahun}
                                        </p>
                                    </div>
                                    {/* Grid 05: kode */}
                                    <div className="col-span-1 flex items-center justify-center">
                                        <p className="text-sm font-semibold mb-2 text-center text-black">
                                            {komplain.kode}
                                        </p>
                                    </div>
                                    {/* Grid 06: copy */}
                                    <div className="col-span-1 flex items-center justify-end">
                                        <button
                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => {
                                                handleCopyToClipboard(
                                                    komplain.kode
                                                );
                                            }}
                                        >
                                            Copy
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CekLupaCode;
