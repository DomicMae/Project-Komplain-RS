import React, { useState, useEffect } from "react";
import axios from "axios";
import { Send, PencilLine } from "lucide-react";

const DataPesanProsesKomplainCSO = ({ user }) => {
    const [komplainDetail, setKomplainDetail] = useState(null);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [reply, setReply] = useState("");

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
                    `http://193.168.195.191/api/dataKomplainById/${id}`
                );
                setKomplainDetail(response.data);

                const levelResponse = await axios.get(
                    `http://193.168.195.191/api/countdown_level/${response.data.namaLevel}`
                );
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (id) {
            fetchData();
        }
    }, []);

    const handleKirim = async (e) => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");

        e.preventDefault(); // Mencegah perilaku default dari event klik

        // Mengambil ID komplain dari formulir atau sumber lainnya
        const komplainId = id; // Pastikan formData.id tersedia
        const keterangan = "selesai";

        const formData = new FormData();
        formData.append("id", komplainId);
        formData.append("keterangan", keterangan);

        try {
            const response = await axios.post(
                "http://193.168.195.191/api/editKeterangan",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            // Handle response jika berhasil
            console.log(response.data);
            setShowSelesai(true);
        } catch (error) {
            // Handle error jika terjadi kesalahan
            console.error(error);
        }
    };

    const handleEditLaporan = async (e) => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");

        e.preventDefault(); // Mencegah perilaku default dari event klik

        // Mengambil ID komplain dari formulir atau sumber lainnya
        const komplainId = id; // Pastikan formData.id tersedia
        const statusId = 5;
        const penerima = komplainDetail.penerima;
        const jenis_pasien = komplainDetail.jenis_pasien;
        const nama = komplainDetail.nama;
        const judul = komplainDetail.judul;
        const kronologi = komplainDetail.kronologi;
        const keterangan = "selesai";
        // Mengambil gambar dari input file (contoh: gambarInput)
        const gambarInput = document.querySelector('input[name="gambar"]');
        const gambarFile = gambarInput ? gambarInput.files[0] : null;

        const formData = new FormData();
        formData.append("id", komplainId);
        formData.append("penerima", penerima);
        formData.append("laporan", reply);
        formData.append("id_status", statusId);
        formData.append("jenis_pasien", jenis_pasien);
        formData.append("nama", nama);
        formData.append("judul", judul);
        formData.append("kronologi", kronologi);
        formData.append("keterangan", keterangan);
        if (gambarFile) {
            formData.append("gambar", gambarFile);
        }

        try {
            const response = await axios.post(
                "http://193.168.195.191/api/reply",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            // Handle response jika berhasil
            console.log(response.data);
            setShowSelesai(true);
            setShowReplyForm(true);
        } catch (error) {
            // Handle error jika terjadi kesalahan
            console.error(error);
        }
    };

    const handleLaporan = async (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");

        try {
            // Cek apakah ada laporan dalam respons data.kode
            if (komplainDetail.laporan) {
                // Konstruksi URL lengkap ke file laporan
                const baseUrl = "http://193.168.195.191/uploads"; // Ubah sesuai dengan URL server Anda
                const laporanUrl = `${baseUrl}/${komplainDetail.laporan}`;

                // Buka laporan PDF di Google Chrome
                window.open(laporanUrl, "_blank");
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
                                                "Merah"
                                                    ? "bg-red-500"
                                                    : komplainDetail.namaLevel ===
                                                      "Kuning"
                                                    ? "bg-yellow-500"
                                                    : komplainDetail.namaLevel ===
                                                      "Hijau"
                                                    ? "bg-green-500"
                                                    : ""
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
                                    className="h-48 border border-gray-900"
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
                    {!showSelesai && (
                        <div className="px-16 mt-8 flex items-center space-x-4">
                            <button
                                className="rounded-full w-32 flex items-center justify-center space-x-2 py-1.5 text-gray-600 border border-gray-400 hover:bg-gray-200"
                                style={{ width: "150px", height: "40px" }}
                                onClick={handleKirim}
                            >
                                <Send />
                                <span>Kirim</span>
                            </button>
                            <button
                                className="rounded-full w-32 flex items-center justify-center space-x-2 py-1.5 text-gray-600 border border-gray-400 hover:bg-gray-200"
                                style={{ width: "150px", height: "40px" }}
                                onClick={handleShowLevelOptionsClick}
                            >
                                <PencilLine />
                                <span>Edit Laporan</span>
                            </button>
                        </div>
                    )}
                    {showLevelOptions && !showReplyForm && !showSelesai && (
                        <div>
                            <form
                                className="py-5 pr-3 mt-4 flex items-start"
                                onSubmit={handleEditLaporan}
                            >
                                <div className="flex items-start w-full">
                                    <img
                                        src="/images/Avatar_Admin.png"
                                        className="rounded-full w-12 h-12 border border-gray-900 mr-4"
                                    />
                                    <textarea
                                        className="flex-1 border border-gray-300 rounded-md resize-none px-3 py-2 focus:outline-none focus:border-indigo-500 text-black"
                                        rows="4"
                                        placeholder="Type your reply here..."
                                        value={reply}
                                        onChange={(e) =>
                                            setReply(e.target.value)
                                        }
                                    ></textarea>
                                </div>
                            </form>
                            <div className="px-16">
                                {komplainDetail.unit ===
                                    "Unit Pemeliharaan Sarana" && (
                                    <input
                                        type="file"
                                        name="gambar"
                                        accept="image/*"
                                        className="mt-2"
                                    />
                                )}
                            </div>
                            <div className="px-3 flex justify-end">
                                <button
                                    type="submit"
                                    className="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={handleEditLaporan}
                                >
                                    Kirim
                                </button>
                            </div>
                        </div>
                    )}
                    {showSelesai && !showLevelOptions && showReplyForm && (
                        <div className="px-16 py-5">
                            <button
                                type="button"
                                className="px-3 rounded-md bg-green-500 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={() => {
                                    window.location.href =
                                        route("prosesKomplainCSO");
                                }}
                            >
                                Kembali ke daftar
                            </button>
                        </div>
                    )}
                    {showSelesai && showLevelOptions && !showReplyForm && (
                        <div className="px-16 py-5">
                            <button
                                type="button"
                                className="px-3 rounded-md bg-green-500 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={() => {
                                    window.location.href =
                                        route("prosesKomplainCSO");
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

export default DataPesanProsesKomplainCSO;
