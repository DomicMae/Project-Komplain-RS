import React, { useState, useEffect } from "react";
import axios from "axios";
import { Check, FolderInput, SquarePen } from "lucide-react";

const DataPesanRiwayatKomplainKepalaRuang = ({ user }) => {
    const [komplainDetail, setKomplainDetail] = useState(null);
    const [showReplyForm, setShowReplyForm] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");

        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/dataKomplainKepalaRuang/${id}`
                );
                setKomplainDetail(response.data);

                const levelResponse = await axios.get(
                    `http://127.0.0.1:8000/api/countdown_level/${response.data.namaLevel}`
                );
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (id) {
            fetchData();
        }
    }, []);

    const handleLaporan = async (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");

        try {
            // Cek apakah ada laporan dalam respons data.kode
            if (komplainDetail.laporan) {
                // Konstruksi URL lengkap ke file laporan
                const baseUrl = "http://127.0.0.1:8000/uploads"; // Ubah sesuai dengan URL server Anda
                const laporanUrl = `${baseUrl}/${komplainDetail.laporan}`;

                // Buka laporan PDF di Google Chrome
                window.open(laporanUrl, "_blank");
                setShowSelesai(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const [showLevelOptions, setShowLevelOptions] = useState(false);
    const [showGantiunit, setShowGantiunit] = useState(false);
    const [showSelesai, setShowSelesai] = useState(false);

    const handleShowLevelOptionsClick = () => {
        setShowLevelOptions(true);
        setShowReplyForm(false); // Pastikan showReplyForm diubah menjadi false
        setShowGantiunit(false);
    };

    const handleShowGantiunitClick = () => {
        setShowReplyForm(false);
        setShowLevelOptions(false);
        setShowGantiunit(true);
    };
    const handleShowReplyForm = () => {
        addCountdown(); // Memanggil fungsi addCountdown saat tombol "Terima" diklik
        editStatus();
        setShowReplyForm(true);
        sendLiveTracking();
        setShowLevelOptions(false);
        setShowGantiunit(false); // Pastikan showLevelOptions diubah menjadi false
        setShowSelesai(true);
    };

    // Mendefinisikan variabel tanggal, bulan, dan tahun setelah mendapatkan data komplainDetail
    const tanggal = komplainDetail
        ? new Date(komplainDetail.created_at).getDate()
        : null;
    const bulan = komplainDetail
        ? new Date(komplainDetail.created_at).toLocaleString("default", {
              month: "long",
          })
        : null;
    const tahun = komplainDetail
        ? new Date(komplainDetail.created_at).getFullYear()
        : null;

    return (
        <div>
            {komplainDetail ? (
                <div className="px-5 py-5 mb-6">
                    <h1 className="px-16 text-2xl text-gray-800 font-bold pb-2 mb-4 border-b-2">
                        {komplainDetail.judul}
                    </h1>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <img
                                    src="/images/Icon_Unknown.png"
                                    className="rounded-full w-12 h-12 border border-gray-900"
                                />
                                <div className="px-3 flex flex-col ml-2">
                                    <span className="py-1 text-xl text-black font-bold">
                                        {komplainDetail.nama} - {""}
                                        {komplainDetail.jenis_pasien ===
                                        "pasien umum"
                                            ? "Umum"
                                            : "BPJS"}
                                    </span>
                                    <div className="flex items-center ">
                                        <div className="border border-black p-2 rounded-md flex items-center">
                                            <div className="border border-black bg-gray-0 rounded-full px-3 text-black inline-block mr-2">
                                                {komplainDetail.unit}
                                            </div>
                                        </div>
                                        <div
                                            className={`border border-black bg-gray-0 rounded-full px-3 text-black inline-block ml-2 text-center ${
                                                komplainDetail.namaLevel ===
                                                "Hijau"
                                                    ? "bg-green-500"
                                                    : "bg-yellow-500"
                                            }`}
                                        >
                                            Level {komplainDetail.namaLevel}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span className="text-sm text-gray-900">
                            {tanggal} {bulan} {tahun}
                        </span>
                    </div>
                    <div className="py-6 pl-2 text-black">
                        <p className="px-16">{komplainDetail.kronologi}</p>
                        <p className="mt-4 px-16">Regards,</p>
                        <p className="px-16">{komplainDetail.nama}</p>
                    </div>
                    {komplainDetail.gambar !== "Tidak ada gambar" &&
                        komplainDetail.gambar && (
                            <div className="px-16 py-4 flex items-center">
                                {/* Tampilkan gambar hanya jika ada */}
                                <img
                                    src={`/uploads/${komplainDetail.gambar}`}
                                    className="w-48 h-48 border border-gray-900"
                                />
                            </div>
                        )}
                    {komplainDetail.gambar === "Tidak ada gambar" && (
                        <div className="px-16 py-4 flex items-center">
                            <p className="px-2 text-black">
                                "Tidak ada gambar"
                            </p>
                        </div>
                    )}
                    <div className="px-16">
                        <button
                            type="submit"
                            onClick={handleLaporan}
                            className="rounded-none border border-black px-3 py-2 text-sm font-semibold text-blue-600 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Lihat Hasil Laporan Komplain
                        </button>
                    </div>
                    {showSelesai && !showLevelOptions && showReplyForm && (
                        <div className="px-16 py-5">
                            <button
                                type="button"
                                className="px-3 rounded-md bg-green-500 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={() => {
                                    window.location.href = route(
                                        "prosesKomplainKepalaBidang"
                                    );
                                }}
                            >
                                Kembali ke daftar
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default DataPesanRiwayatKomplainKepalaRuang;
