import React, { useState, useEffect } from "react";
import axios from "axios";
import { Reply, Forward, SquarePen } from "lucide-react";

const DataPesanRiwayatKomplainCSO = ({ user }) => {
    const [komplainDetail, setKomplainDetail] = useState(null);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [reply, setReply] = useState(""); // State untuk menyimpan nilai balasan

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleEditLevel = (e) => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");

        e.preventDefault(); // Mencegah perilaku default dari event klik

        // Mengambil ID komplain dari formulir atau sumber lainnya
        const komplainId = id; // Pastikan formData.id tersedia
        const statusId = 2;
        const id_level = mapLevelToNumber(selectedLevel); // Mendefinisikan variabel id_level
        const string_level = mapLevelToString(selectedLevel);
        const penerima = formData.penerima;

        const formDataToSend = {
            id: komplainId, // Mengirim ID komplain yang ingin diubah
            penerima: penerima, // Mengirim nilai baru untuk kolom penerima
            id_status: statusId, // Mengirim nilai baru untuk kolom idStatus
            id_level: id_level, // Mengirim nilai baru untuk kolom idLevel
        };

        axios
            .post("http://193.168.195.191/api/editLevel", formDataToSend)
            .then((response) => {
                // Handle response jika berhasil
                console.log(response.data);
                sendLiveTracking();
                sendEmail(string_level, penerima);
                handleShowSelesai();
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
                setShowSelesai(true);
            })
            .catch((error) => {
                // Handle error jika terjadi kesalahan
                console.error(error);
            });
    };

    const sendEmail = (selectedLevel, penerima) => {
        const dataToSend = {
            jenis_pasien: komplainDetail.jenis_pasien,
            nama: komplainDetail.nama,
            judul: komplainDetail.judul,
            kronologi: komplainDetail.kronologi,
            level: selectedLevel,
        };

        let apiUrl;
        if (penerima.includes("Kepala Ruang")) {
            apiUrl = "http://193.168.195.191/api/sendemailToKepalaRuang";
        } else if (penerima.includes("Kepala Bidang")) {
            apiUrl = "http://193.168.195.191/api/sendemailToKepalaBidang";
        } else {
            console.error("Penerima tidak valid:", penerima);
            return;
        }

        axios
            .post(apiUrl, dataToSend)
            .then((response) => {
                // Handle response jika berhasil
                console.log(response.data);
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
        const penerima = "Admin CSO";
        const jenis_pasien = komplainDetail.jenis_pasien;
        const nama = komplainDetail.nama;
        const judul = komplainDetail.judul;
        const kronologi = komplainDetail.kronologi;
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
            sendLiveTracking();
            console.log(response.data);
            handleShowSelesai();
            editStatus();
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
        const statusId = 5;
        const keterangan = "selesai";

        const formDataToSend = {
            id: komplainId, // Mengirim ID komplain yang ingin diubah
            id_status: statusId, // Mengirim nilai baru untuk kolom idStatus
            keterangan: keterangan, //Mengirim value selesai
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
                const baseUrl = "http://193.168.195.191/uploads"; // Ubah sesuai dengan URL server Anda
                const laporanUrl = `${baseUrl}/${komplainDetail.laporan}`;

                // Buka laporan PDF di Google Chrome
                window.open(laporanUrl, "_blank");
                setShowSelesai(true);
            }
        } catch (error) {
            console.log(error);
        }
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
        setShowReplyForm(true);
        setShowLevelOptions(false);
        setShowGantiunit(false); // Pastikan showLevelOptions diubah menjadi false
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
                                                "Tidak ada"
                                                    ? "bg-white-500"
                                                    : komplainDetail.namaLevel ===
                                                      "Hijau"
                                                    ? "bg-green-500"
                                                    : komplainDetail.namaLevel ===
                                                      "Kuning"
                                                    ? "bg-yellow-500"
                                                    : komplainDetail.namaLevel ===
                                                      "Merah"
                                                    ? "bg-red-500"
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
                    {komplainDetail.keterangan === "selesai" && (
                        <div className="px-16">
                            <button
                                type="submit"
                                onClick={handleLaporan}
                                className="rounded-none border border-black px-3 py-2 text-sm font-semibold text-blue-600 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Lihat Hasil Laporan Komplain
                            </button>
                        </div>
                    )}
                    {!showSelesai && (
                        <div className="px-16 mt-8 flex items-center space-x-4">
                            <button
                                className="rounded-full w-32 flex items-center justify-center space-x-2 py-1.5 text-gray-600 border border-gray-400 hover:bg-gray-200"
                                style={{ width: "150px", height: "40px" }}
                                onClick={handleShowReplyForm}
                            >
                                <Reply />
                                <span>Reply</span>
                            </button>
                            <button
                                className="rounded-full w-32 flex items-center justify-center space-x-2 py-1.5 text-gray-600 border border-gray-400 hover:bg-gray-200"
                                style={{ width: "150px", height: "40px" }}
                                onClick={handleShowLevelOptionsClick}
                            >
                                <Forward />
                                <span>Pilih Level</span>
                            </button>
                        </div>
                    )}
                    {showReplyForm && !showLevelOptions && (
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
                    {showLevelOptions && !showReplyForm && (
                        <div className="py-5 px-16 mt-2">
                            {/* Your level options here */}
                            <h1 className="text-black font-bold">Level</h1>
                            <div className="mt-2 flex justify-between">
                                <div className="flex gap-4 text-sm">
                                    <div
                                        className="rounded-full w-32 flex items-center justify-center space-x-2 py-1.5 text-gray-900 border border-gray-400 hover:border-gray-900 bg-green-500 hover:bg-green-600 cursor-pointer"
                                        style={{
                                            width: "100px",
                                            height: "30px",
                                        }}
                                        value="green"
                                        onClick={(e) => {
                                            setSelectedLevel("green");
                                            console.log(
                                                e.target.getAttribute("value")
                                            );
                                            {
                                                /* Cetak nilai ke konsol */
                                            }
                                        }}
                                    >
                                        {/* Icon atau tanda berwarna hijau */}
                                        <span>Rendah</span>
                                    </div>
                                    <div
                                        className="rounded-full w-32 flex items-center justify-center space-x-2 py-1.5 text-gray-900 border border-gray-400 hover:border-gray-900 bg-yellow-400 hover:bg-yellow-500 cursor-pointer"
                                        style={{
                                            width: "100px",
                                            height: "30px",
                                        }}
                                        value="yellow"
                                        onClick={(e) => {
                                            setSelectedLevel("yellow");
                                            console.log(
                                                e.target.getAttribute("value")
                                            );
                                            {
                                                /* Cetak nilai ke konsol */
                                            }
                                        }}
                                    >
                                        {/* Icon atau tanda berwarna kuning */}
                                        <span>Tinggi</span>
                                    </div>
                                    <div
                                        className="rounded-full w-32 flex items-center justify-center space-x-2 py-1.5 text-gray-900 border border-gray-400 hover:border-gray-900 bg-red-500 hover:bg-red-600 cursor-pointer ml-2"
                                        style={{
                                            width: "100px",
                                            height: "30px",
                                        }}
                                        value="red"
                                        onClick={(e) => {
                                            setSelectedLevel("red");
                                            console.log(
                                                e.target.getAttribute("value")
                                            );
                                            {
                                                /* Cetak nilai ke konsol */
                                            }
                                        }}
                                    >
                                        {/* Icon atau tanda berwarna merah */}
                                        <span>Ekstrim</span>
                                    </div>
                                </div>
                            </div>
                            {selectedLevel && (
                                <div className="mt-4">
                                    {selectedLevel === "green" && (
                                        <div className="text-sm">
                                            <h1>
                                                *Deskripsi untuk Level Hijau
                                            </h1>
                                            <p>Maksimal 7 hari</p>
                                            <p>
                                                tidak menimbulkan kerugian
                                                berarti baik material maupun
                                                immaterial
                                            </p>
                                        </div>
                                    )}
                                    {selectedLevel === "yellow" && (
                                        <div className="text-sm">
                                            <h1>
                                                *Deskripsi untuk Level Kuning
                                            </h1>
                                            <p>Maksimal 3 hari</p>
                                            <p>
                                                cenderung dengan pemberitaan
                                                media, potensi kerugian
                                                immaterial, dan lain-lain
                                            </p>
                                        </div>
                                    )}
                                    {selectedLevel === "red" && (
                                        <div className="text-sm">
                                            <h1>
                                                *Deskripsi untuk Level Merah
                                            </h1>
                                            <p>Maksimal 1 hari</p>
                                            <p>
                                                cenderung berhubungan dengan
                                                polisi, pengadilan, kematian,
                                                mengancam sistem/kelangsungan
                                                organisasi, potensi kerugian
                                                material dan lain-lain
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                            {selectedLevel && (
                                <div>
                                    {selectedLevel === "green" && (
                                        <div className="mt-4 text-black font-bold">
                                            <h2>List Kepala Ruang</h2>
                                            {/* Daftar kepala ruang untuk level hijau */}
                                        </div>
                                    )}
                                    {selectedLevel === "yellow" && (
                                        <div className="mt-4 text-black font-bold">
                                            <h2>
                                                List Kepala Ruang dan Kepala
                                                Bidang
                                            </h2>
                                            {/* Daftar kepala ruang untuk level kuning */}
                                        </div>
                                    )}
                                    {selectedLevel === "red" && (
                                        <div className="mt-4 text-black font-bold">
                                            <h2>List Kepala Bidang</h2>
                                            {/* Daftar kepala bidang untuk level merah */}
                                        </div>
                                    )}
                                </div>
                            )}
                            <select //PERBAIKANNNNNNNNNNNNNNNN
                                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
                                name="penerima"
                                value={formData.penerima}
                                onChange={handleChange}
                            >
                                {selectedLevel === "green" && (
                                    <>
                                        <option className="text-gray-500">
                                            Pilih Unit
                                        </option>
                                        <optgroup label="Kepala Ruang">
                                            <option>Kepala Ruang IGD</option>
                                            <option>
                                                Kepala Ruang Rawat Jalan
                                            </option>
                                            <option>
                                                Kepala Ruang Kamar Operasi
                                            </option>
                                            <option>
                                                Kepala Ruang Rehabilitasi Medis
                                            </option>
                                            <option>
                                                Kepala Ruang Pelayanan Dialisis
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
                                                Kebidanan, Kandungan dan NICU
                                            </option>
                                            <option>
                                                Kepala Ruang Rawat Inap 4 dan
                                                Geriatri
                                            </option>
                                            <option>
                                                Kepala Ruang Pelayanan Intensif
                                                (ICU)
                                            </option>
                                            <option>
                                                Kepala Ruang Human Resources
                                                Development (HRD)
                                            </option>
                                            <option>
                                                Kepala Ruang Pengadaan
                                            </option>
                                            <option>Kepala Ruang Umum</option>
                                            <option>
                                                Kepala Ruang Customer Service
                                            </option>
                                            <option>
                                                Kepala Ruang Pemeliharaan Sarana
                                            </option>
                                        </optgroup>
                                    </>
                                )}

                                {selectedLevel === "yellow" && (
                                    <>
                                        <option className="text-gray-500">
                                            Pilih Unit
                                        </option>
                                        <optgroup label="Kepala Ruang">
                                            <option>Kepala Ruang IGD</option>
                                            <option>
                                                Kepala Ruang Rawat Jalan
                                            </option>
                                            <option>
                                                Kepala Ruang Kamar Operasi
                                            </option>
                                            <option>
                                                Kepala Ruang Rehabilitasi Medis
                                            </option>
                                            <option>
                                                Kepala Ruang Pelayanan Dialisis
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
                                                Kebidanan, Kandungan dan NICU
                                            </option>
                                            <option>
                                                Kepala Ruang Rawat Inap 4 dan
                                                Geriatri
                                            </option>
                                            <option>
                                                Kepala Ruang Pelayanan Intensif
                                                (ICU)
                                            </option>
                                            <option>
                                                Kepala Ruang Human Resources
                                                Development (HRD)
                                            </option>
                                            <option>
                                                Kepala Ruang Pengadaan
                                            </option>
                                            <option>Kepala Ruang Umum</option>
                                            <option>
                                                Kepala Ruang Customer Service
                                            </option>
                                            <option>
                                                Kepala Ruang Pemeliharaan Sarana
                                            </option>
                                        </optgroup>
                                        <optgroup label=" "></optgroup>

                                        <optgroup label="Kepala Bidang">
                                            <option className="">
                                                Kepala Bidang Pelayanan Medis
                                            </option>
                                            <option className="">
                                                Kepala Bidang Penunjang Medis
                                            </option>
                                            <option className="">
                                                Kepala Bidang Keperawatan dan
                                                Kebidanan
                                            </option>
                                            <option className="">
                                                Kepala Bidang Umum dan Kuangan
                                            </option>
                                        </optgroup>
                                    </>
                                )}

                                {selectedLevel === "red" && (
                                    <>
                                        <option className="text-gray-500">
                                            Pilih Unit
                                        </option>
                                        <optgroup label="Kepala Bidang">
                                            <option>
                                                Kepala Bidang Pelayanan Medis
                                            </option>
                                            <option>
                                                Kepala Bidang Penunjang Medis
                                            </option>
                                            <option>
                                                Kepala Bidang Keperawatan dan
                                                Kebidanan
                                            </option>
                                            <option>
                                                Kepala Bidang Umum dan Kuangan
                                            </option>
                                        </optgroup>
                                    </>
                                )}
                            </select>
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button
                                    type="submit"
                                    className="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={handleEditLevel}
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

export default DataPesanRiwayatKomplainCSO;
