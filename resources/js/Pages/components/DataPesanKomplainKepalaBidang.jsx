import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipboardCheck, FolderInput, SquarePen } from "lucide-react";

const DataPesanKomplainKepalaBidang = ({ user }) => {
    const [komplainDetail, setKomplainDetail] = useState(null);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [duration, setDuration] = useState(null);
    const [selectedPenerima, setSelectedPenerima] = useState(""); // State untuk menyimpan penerima yang dipilih

    const [selectedLevel, setSelectedLevel] = useState("");

    const [formData, setFormData] = useState({
        unit: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSelectChange = (e) => {
        setSelectedPenerima(e.target.value);
    };

    const handleSubmit = (e) => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");

        e.preventDefault(); // Mencegah perilaku default dari event klik

        // Mengambil ID komplain dari formulir atau sumber lainnya
        const komplainId = id; // Pastikan formData.id tersedia

        const formDataToSend = {
            id: komplainId, // Mengirim ID komplain yang ingin diubah
            unit: formData.unit, // Mengirim nilai baru untuk kolom unit
        };

        axios
            .post("http://193.168.195.191/api/editUnit", formDataToSend)
            .then((response) => {
                // Handle response jika berhasil
                console.log(response.data);
                window.location.reload();
            })
            .catch((error) => {
                // Handle error jika terjadi kesalahan
                console.error(error);
            });
    };
    const handleSubmitReply = async (e) => {
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
        const keterangan = "menunggu konfirmasi";
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
                "http://127.0.0.1:8000/api/reply",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            // Handle response jika berhasil
            console.log(response.data);
            sendLiveTracking();
            setShowSelesai(true);
        } catch (error) {
            // Handle error jika terjadi kesalahan
            console.error(error);
        }
    };
    const editStatus = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        // Mengambil ID komplain dari formulir atau sumber lainnya
        const komplainId = id; // Pastikan formData.id tersedia
        const statusId = 3;

        const formDataToSend = {
            id: komplainId, // Mengirim ID komplain yang ingin diubah
            id_status: statusId, // Mengirim nilai baru untuk kolom idStatus
        };

        axios
            .post("http://193.168.195.191/api/editStatus", formDataToSend)
            .then((response) => {
                // Handle response jika berhasil
                console.log(response.data);
            })
            .catch((error) => {
                // Handle error jika terjadi kesalahan
                console.error(error);
            });
    };

    const sendLiveTracking = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        const komplainId = id; // Pastikan formData.id tersedia
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        const hours = String(today.getHours()).padStart(2, "0");
        const minutes = String(today.getMinutes()).padStart(2, "0");
        const seconds = String(today.getSeconds()).padStart(2, "0");

        const tanggalUpdate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        axios
            .post("http://193.168.195.191/api/prosesLiveTracking", {
                idKomplain: komplainId,
                tanggal_update: tanggalUpdate,
            })
            .then((response) => {
                // Handle response jika berhasil
                console.log(response.data);
            })
            .catch((error) => {
                // Handle error jika terjadi kesalahan
                console.error(error);
            });
    };

    const addCountdown = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");

        // Mengambil ID komplain dari formulir atau sumber lainnya
        const komplainId = id; // Pastikan formData.id tersedia

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        const hours = String(today.getHours()).padStart(2, "0");
        const minutes = String(today.getMinutes()).padStart(2, "0");
        const seconds = String(today.getSeconds()).padStart(2, "0");

        const tanggal = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        // Pastikan duration telah diinisialisasi sebelum digunakan
        if (!duration) {
            console.error("Durasi belum diinisialisasi.");
            return;
        }

        // Mengambil durasi level dari database (misalnya 24 jam)
        const durasiLevel = duration;

        // Mengonversi durasiLevel ke objek Date
        const durasiLevelParts = durasiLevel.split(":");
        const durasiLevelMilliseconds =
            durasiLevelParts[0] * 60 * 60 * 1000 +
            durasiLevelParts[1] * 60 * 1000 +
            durasiLevelParts[2] * 1000;

        // Menambahkan durasiLevel ke tanggal
        const tanggalObj = new Date(tanggal);
        const tanggalUpdateObj = new Date(
            tanggalObj.getTime() + durasiLevelMilliseconds
        );

        // Format tanggal_update ke dalam format yang diinginkan
        const yearUpdate = tanggalUpdateObj.getFullYear();
        const monthUpdate = String(tanggalUpdateObj.getMonth() + 1).padStart(
            2,
            "0"
        );
        const dayUpdate = String(tanggalUpdateObj.getDate()).padStart(2, "0");
        const hoursUpdate = String(tanggalUpdateObj.getHours()).padStart(
            2,
            "0"
        );
        const minutesUpdate = String(tanggalUpdateObj.getMinutes()).padStart(
            2,
            "0"
        );
        const secondsUpdate = String(tanggalUpdateObj.getSeconds()).padStart(
            2,
            "0"
        );

        const tanggalUpdate = `${yearUpdate}-${monthUpdate}-${dayUpdate} ${hoursUpdate}:${minutesUpdate}:${secondsUpdate}`;

        const formDataToSend = {
            idKomplain: komplainId, // Mengirim ID komplain yang ingin diubah
            tanggal_sebelum_update: tanggal, // Mengirim nilai baru untuk kolom tanggal hari ini
            tanggal_update: tanggalUpdate, // Mengirim nilai baru untuk kolom tanggal terbaru
        };

        axios
            .post(`http://193.168.195.191/api/addCountdown`, formDataToSend)
            .then((response) => {
                // Handle response jika berhasil
                console.log(response.data);
                showCountdown();
            })
            .catch((error) => {
                // Handle error jika terjadi kesalahan
                console.error(error);
            });
    };

    const showCountdown = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        axios
            .get(`http://193.168.195.191/api/showCountdown/${id}`)
            .then((response) => {
                const { tanggal_sebelum_update, tanggal_update } =
                    response.data;
                const timeRemainingInSeconds = getTimeRemaining(
                    tanggal_sebelum_update,
                    tanggal_update
                );
                // Mengatur nilai timeRemaining dengan format "HH:MM:SS"
                const formattedTimeRemaining = formatTime(
                    timeRemainingInSeconds
                );
                setTimeRemaining(formattedTimeRemaining);
            })
            .catch((error) => {
                if (error.response && error.response.status === 429) {
                    // Jika terlalu banyak permintaan, beri pesan kesalahan yang sesuai
                    console.error(
                        "Terlalu banyak permintaan. Silakan coba lagi nanti."
                    );
                } else {
                    // Jika kesalahan lainnya, tangani dengan pesan kesalahan umum
                    console.error("Error fetching countdown data:", error);
                }
            });
    };

    // Fungsi untuk mengonversi detik menjadi format "HH:MM:SS"
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        const formattedTime = [
            String(hours).padStart(2, "0"),
            String(minutes).padStart(2, "0"),
            String(remainingSeconds).padStart(2, "0"),
        ].join(":");

        return formattedTime;
    };

    const getTimeRemaining = (start, end) => {
        const diffInMilliseconds = new Date(end) - new Date(start);
        return Math.floor(diffInMilliseconds / 1000);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");

        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://193.168.195.191/api/dataKomplainKepalaBidang/${id}`
                );
                setKomplainDetail(response.data);

                const levelResponse = await axios.get(
                    `http://193.168.195.191/api/countdown_level/${response.data.namaLevel}`
                );
                const duration = levelResponse.data[0].durasi;

                setDuration(duration); // Set nilai duration ke dalam state
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (id) {
            fetchData();
        }
    }, []);

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
                                            <button
                                                className="w-32 flex items-center justify-center space-x-2 py-1.5 text-gray-600 hover:bg-gray-200"
                                                style={{
                                                    width: "20px",
                                                    height: "20px",
                                                }}
                                                onClick={
                                                    handleShowGantiunitClick
                                                }
                                            >
                                                <SquarePen />
                                            </button>
                                        </div>
                                        <div
                                            className={`border border-black bg-gray-0 rounded-full px-3 text-black inline-block ml-2 text-center ${
                                                komplainDetail.namaLevel ===
                                                "Merah"
                                                    ? "bg-red-500"
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
                        <div className="flex text-black border-gray-300">
                            <div className="border border-black p-4 ">
                                {/* Menampilkan waktu tersisa jika showReplyForm true */}
                                <p className="text-center">
                                    Waktu tersisa untuk membalas :
                                </p>
                                <p className="text-center">{timeRemaining}</p>
                            </div>
                        </div>
                    </div>
                    {!showSelesai && komplainDetail.keterangan === null && (
                        <div className="px-16 mt-8 flex items-center space-x-4">
                            <button
                                className="rounded-full w-32 flex items-center justify-center space-x-2 py-1.5 text-gray-600 border border-gray-400 hover:bg-gray-200"
                                style={{
                                    width: "200px",
                                    height: "40px",
                                }} //Ukuran kotak icon
                                onClick={handleShowReplyForm}
                            >
                                <Check />
                                <span>Selesaikan Komplain</span>
                            </button>
                        </div>
                    )}
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
                    {!showSelesai &&
                        komplainDetail.keterangan === "menunggu laporan" && (
                            <div>
                                <form
                                    className="py-5 pr-3 mt-4 flex items-start"
                                    onSubmit={handleSubmitReply}
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
                                        onClick={handleSubmitReply}
                                    >
                                        Kirim
                                    </button>
                                </div>
                            </div>
                        )}
                    {showSelesai && !showLevelOptions && !showReplyForm && (
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
                    {showLevelOptions && !showReplyForm && (
                        <div className="py-5 px-16 mt-2">
                            {/* Your level options here */}
                            <h1 className="text-black font-bold">Pilih unit</h1>
                            <div className="mt-2">
                                <select
                                    className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
                                    name="unit"
                                    value={formData.unit}
                                    onChange={handleChange}
                                >
                                    {/* Kondisional untuk level kuning */}
                                    {komplainDetail.namaLevel === "Kuning" && (
                                        <>
                                            <option className="text-gray-500">
                                                Kepala Ruang atau Kepala Bidang
                                            </option>
                                            <optgroup label="Kepala Ruang">
                                                <option>
                                                    Kepala Ruang IGD
                                                </option>
                                                <option>
                                                    Kepala Ruang Rawat Jalan
                                                </option>
                                                <option>
                                                    Kepala Ruang Kamar Operasi
                                                </option>
                                                <option>
                                                    Kepala Ruang Rehabilitasi
                                                    Medis
                                                </option>
                                                <option>
                                                    Kepala Ruang Pelayanan
                                                    Dialisis
                                                </option>
                                                <option>
                                                    Kepala Ruang Farmasi
                                                </option>
                                                <option>
                                                    Kepala Ruang Laboratorium
                                                </option>
                                                <option>
                                                    Kepala Ruang Radiologi
                                                </option>
                                                <option>
                                                    Kepala Ruang Rekam Medis
                                                </option>
                                                <option>
                                                    Kepala Ruang Unit Gizi
                                                </option>
                                                <option>
                                                    Kepala Ruang Rawat Inap 1
                                                </option>
                                                <option>
                                                    Kepala Ruang Rawat Inap 2
                                                </option>
                                                <option>
                                                    Kepala Ruang Rawat Inap
                                                    Kebidanan, Kandungan dan
                                                    NICU
                                                </option>
                                                <option>
                                                    Kepala Ruang Rawat Inap 4
                                                    dan Geriatri
                                                </option>
                                                <option>
                                                    Kepala Ruang Pelayanan
                                                    Intensif (ICU)
                                                </option>
                                                <option>
                                                    Kepala Ruang Human Resources
                                                    Development (HRD)
                                                </option>
                                                <option>
                                                    Kepala Ruang Pengadaan
                                                </option>
                                                <option>
                                                    Kepala Ruang Umum
                                                </option>
                                                <option>
                                                    Kepala Ruang Customer
                                                    Service
                                                </option>
                                                <option>
                                                    Kepala Ruang Pemeliharaan
                                                    Sarana
                                                </option>
                                            </optgroup>
                                            {/* Opsi tambahan */}
                                            <optgroup label=" "></optgroup>
                                            {/* Daftar kepala bidang */}
                                            <optgroup label="Kepala Bidang">
                                                <option>
                                                    Kepala Bidang Pelayanan
                                                    Medis
                                                </option>
                                                <option>
                                                    Kepala Bidang Penunjang
                                                    Medis
                                                </option>
                                                <option>
                                                    Kepala Bidang Keperawatan
                                                    dan Kebidanan
                                                </option>
                                                <option>
                                                    Kepala Bidang Umum dan
                                                    Keuangan
                                                </option>
                                                <option>
                                                    Kepala Sarana dan Prasarana
                                                </option>
                                            </optgroup>
                                        </>
                                    )}
                                    {/* Kondisional untuk level merah */}
                                    {komplainDetail.namaLevel === "Merah" && (
                                        <>
                                            <option className="text-gray-500">
                                                Kepala Bidang
                                            </option>
                                            <optgroup label="Kepala Bidang">
                                                <option>
                                                    Kepala Bidang Pelayanan
                                                    Medis
                                                </option>
                                                <option>
                                                    Kepala Bidang Penunjang
                                                    Medis
                                                </option>
                                                <option>
                                                    Kepala Bidang Keperawatan
                                                    dan Kebidanan
                                                </option>
                                                <option>
                                                    Kepala Bidang Umum dan
                                                    Kuangan
                                                </option>
                                                <option>
                                                    Kepala Sarana dan Prasarana
                                                </option>
                                            </optgroup>
                                        </>
                                    )}
                                </select>
                            </div>
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button
                                    type="submit"
                                    className="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    )}
                    {showGantiunit && (
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <select
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    name="unit"
                                    value={formData.unit}
                                    onChange={handleChange}
                                >
                                    <option disabled selected>
                                        Pilih unit
                                    </option>
                                    <optgroup label="Bidang Pelayanan Medis">
                                        <option>Unit IGD</option>
                                        <option>Unit Rawat Jalan</option>
                                        <option>Unit Kamar Operasi</option>
                                        <option>Unit Rehabilitasi Medis</option>
                                        <option>Unit Pelayanan Dialisis</option>
                                    </optgroup>
                                    <optgroup label="Bidang Penunjang Medis">
                                        <option>Unit Farmasi</option>
                                        <option>Unit Laboratorium</option>
                                        <option>Unit Radiologi</option>
                                        <option>Unit Rekam Medis</option>
                                        <option>Unit Gizi</option>
                                    </optgroup>
                                    <optgroup label="Bidang Keperawatan dan Kebidanan">
                                        <option>Unit Rawat Inap 1</option>
                                        <option>Unit Rawat Inap 2</option>
                                        <option>
                                            Unit Rawat Inap Kebidanan, Kandungan
                                            dan NICU
                                        </option>
                                        <option>
                                            Unit Rawat Inap 4 dan Geriatri
                                        </option>
                                        <option>
                                            Unit Pelayanan Intensif (ICU)
                                        </option>
                                    </optgroup>
                                    <optgroup label="Bidang Umum dan Keuangan">
                                        <option>
                                            Unit Human Resources Development
                                            (HRD)
                                        </option>
                                        <option>Unit Pengadaan</option>
                                        <option>Unit Umum</option>
                                        <option>Unit Customer Service</option>
                                    </optgroup>
                                    <optgroup label="Sarana dan Prasarana">
                                        <option>
                                            Unit Pemeliharaan Sarana
                                        </option>
                                    </optgroup>
                                </select>
                            </div>
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button
                                    type="submit"
                                    className="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default DataPesanKomplainKepalaBidang;
