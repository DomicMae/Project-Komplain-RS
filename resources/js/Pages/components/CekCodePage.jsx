import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import axios from "axios";
import { Mail } from "lucide-react";

const CekCodePage = ({ title, description }) => {
    const [liveTrackingCode, setLiveTrackingCode] = useState("");
    const [kodeData, setKodeData] = useState(null);
    const [liveTracking, setLiveTracking] = useState(null);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [liveTrackingData, setLiveTrackingData] = useState({
        jenis_pasien: "",
        judul: "",
        nama: "",
        no_telp: "",
        unit: "",
        tanggal_kejadian: "",
        waktu_kejadian: "",
        tempat_kejadian: "",
        kronologi: "",
        gambar: "",
        keterangan: "",
    }); // State untuk menyimpan data dari API pertama
    const [reply, setReply] = useState(""); // State untuk menyimpan nilai balasan
    const [apiResponse, setApiResponse] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Mendefinisikan variabel tanggal, bulan, dan tahun setelah mendapatkan data kodeData
    const tanggal = kodeData ? new Date(kodeData.created_at).getDate() : null;
    const bulan = kodeData
        ? new Date(kodeData.created_at).toLocaleString("default", {
              month: "long",
          })
        : null;
    const tahun = kodeData ? new Date(kodeData.created_at).getFullYear() : null;
    //Untuk menambahkan waktu
    const jam = kodeData ? new Date(kodeData.created_at).getHours() : null;
    const menit = kodeData ? new Date(kodeData.created_at).getMinutes() : null;

    const handleLiveTrackingCodeChange = (e) => {
        setLiveTrackingCode(e.target.value);
    };
    const handleShowReplyForm = () => {
        setShowReplyForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(
                `http://193.168.195.191/api/livetracking/${liveTrackingCode}`
                // `http://localhost/laract10/public/api/livetracking/${liveTrackingCode}`
            );
            setKodeData(response.data.kode);
            console.log(response.data);

            // Simpan data ke state
            setLiveTrackingData(response.data.kode);

            // Memperoleh ID komplain dari respons API sebelumnya
            const idKomplain = response.data.kode.id;

            // Mendapatkan data komplain berdasarkan ID komplain
            const komplainResponse = await axios.get(
                `http://193.168.195.191/api/dataLivetracking/${idKomplain}`
            );
            setLiveTracking(komplainResponse.data);
            // Menampilkan data komplain di tampilan
            console.log(komplainResponse.data);
        } catch (e) {
            console.log(e);
        }
    };

    const handleLaporan = async (e) => {
        e.preventDefault();

        try {
            // Cek apakah ada laporan dalam respons data.kode
            if (kodeData.laporan) {
                // Konstruksi URL lengkap ke file laporan
                const baseUrl = "http://193.168.195.191/uploads"; // Ubah sesuai dengan URL server Anda
                const laporanUrl = `${baseUrl}/${kodeData.laporan}`;

                // Buka laporan PDF di Google Chrome
                window.open(laporanUrl, "_blank");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmitReply = async (e) => {
        e.preventDefault(); // Mencegah perilaku default dari event klik

        const formDataToSend = new FormData();
        formDataToSend.append("jenis_pasien", liveTrackingData.jenis_pasien);
        formDataToSend.append("judul", liveTrackingData.judul);
        formDataToSend.append("nama", liveTrackingData.nama);
        formDataToSend.append("no_telp", liveTrackingData.no_telp);
        formDataToSend.append("unit", liveTrackingData.unit);
        formDataToSend.append(
            "tanggal_kejadian",
            liveTrackingData.tanggal_kejadian
        );
        formDataToSend.append(
            "waktu_kejadian",
            liveTrackingData.waktu_kejadian
        );
        formDataToSend.append(
            "tempat_kejadian",
            liveTrackingData.tempat_kejadian
        );
        formDataToSend.append("kronologi", liveTrackingData.kronologi);

        if (liveTrackingData.gambar) {
            formDataToSend.append("gambar", liveTrackingData.gambar);
        }

        formDataToSend.append("keterangan", reply);

        try {
            const response = await axios.post(
                "http://193.168.195.191/api/addkomplain",
                formDataToSend
            );

            // Handle response jika berhasil
            setApiResponse(response.data);
            setShowModal(true);

            // Panggil fungsi sendEmail dan sendLiveTracking setelah respons berhasil
            await sendEmail();

            // Reload the window after all actions have successfully completed
            window.location.reload();
        } catch (error) {
            // Handle error jika terjadi kesalahan
            console.error(error);
        }
    };
    const sendEmail = async () => {
        try {
            const response = await axios.get(
                "http://193.168.195.191/api/sendemailCSOAgain"
            );
            // Handle response jika berhasil
            console.log(response.data);
        } catch (error) {
            // Handle error jika terjadi kesalahan
            console.error(error);
        }
    };
    const handleCopyToClipboard = (kode) => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard
                .writeText(kode)
                .then(() => alert("Kode berhasil disalin ke clipboard!"))
                .catch((error) =>
                    console.error("Gagal menyalin kode ke clipboard: ", error)
                );
        } else {
            // Fallback untuk browser yang tidak mendukung Clipboard API
            const textArea = document.createElement("textarea");
            textArea.value = kode;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand("copy");
                alert("Kode berhasil disalin ke clipboard!");
            } catch (error) {
                console.error("Gagal menyalin kode ke clipboard: ", error);
            }
            document.body.removeChild(textArea);
        }
    };

    return (
        <form className="py-12 flex justify-center" onSubmit={handleSubmit}>
            <div className="max-w-3xl w-full">
                {/* ...Form lainnya di sini... */}
                <div className="text-container text-center">
                    <h2 className="text-4xl font-bold text-gray-900">
                        LIVE TRACKING KOMPLAIN
                    </h2>
                    <p className="mt-1 text-lg text-gray-600">
                        Masukkan kode komplain di bawah ini
                    </p>
                </div>

                {/* Input untuk kode live tracking */}
                <div className="mt-10 flex items-center justify-center">
                    <div className="">
                        <div className="mt-2 sm:col-span-2">
                            <label
                                htmlFor="Kode Live Tracking"
                                className="block text-sm font-medium leading-6 text-gray-900 text-center"
                            >
                                Kode Live Tracking
                            </label>
                        </div>
                        <div className="mt-2 sm:col-span-2">
                            <input
                                type="text"
                                name="live-tracking-code"
                                value={liveTrackingCode}
                                onChange={handleLiveTrackingCodeChange}
                                id="live-tracking-code"
                                autoComplete="off"
                                className="rounded-md border-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="Masukkan Kode"
                                style={{ textAlign: "center" }}
                            />
                        </div>
                    </div>
                </div>

                {/* Tombol Submit */}
                <div className="mt-6 flex items-center justify-center gap-x-6">
                    <button
                        type="submit"
                        className="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Submit
                    </button>
                </div>
                <div className="py-3 text-end">
                    <Link
                        href={route("cekLupaCode")}
                        className="btn btn-ghost text-sm font-medium text-violet-600 hover:underline"
                        as="button"
                    >
                        Lupa Kode Live Tracking?
                    </Link>
                </div>
                <div className="py-9 text-black">
                    {kodeData && (
                        <div>
                            <h3>{kodeData.title}</h3>
                            <p>Nama: {kodeData.nama}</p>
                            <p>Kronologi: {kodeData.kronologi}</p>
                            <p>
                                Tanggal: {tanggal} {bulan} {tahun}
                            </p>
                        </div>
                    )}
                </div>

                {kodeData && (
                    <>
                        <div className="text-container  text-center">
                            <h2 className="text-4xl font-bold text-gray-900">
                                Detail Status Komplain
                            </h2>
                        </div>
                        <div className="status-container mt-4 p-4 border border-gray-300 rounded-md shadow-sm bg-white">
                            {/* Untuk membuat garis */}
                            <ol className="mx-4 relative border-s-4 border-gray-200 dark:border-green-500">
                                {liveTracking && (
                                    <div>
                                        {liveTracking.map((status, index) => (
                                            <li
                                                key={index}
                                                className="mb-2 ms-6"
                                            >
                                                <span className="absolute flex items-center justify-center w-10 h-10 rounded-full left-0 transform -translate-x-1/2 bg-[#1BBD36]">
                                                    <Mail
                                                        size={15}
                                                        className="text-black"
                                                    />
                                                </span>
                                                <h3 className="px-3 flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-black">
                                                    {status.nama_status}
                                                </h3>
                                                <time className="px-3 py-2 flex mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                                    {status.tanggal_update}
                                                </time>
                                            </li>
                                        ))}
                                    </div>
                                )}
                            </ol>
                        </div>
                    </>
                )}
                {kodeData &&
                    kodeData.id_status === 5 &&
                    kodeData.keterangan === "selesai" && (
                        <>
                            <div className="flex justify-center items-center py-5 gap-x-6">
                                <button
                                    type="submit"
                                    onClick={handleLaporan}
                                    className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Cek Laporan Komplain
                                </button>
                            </div>
                            <p className="text-center">
                                Bagaimana tanggapan anda mengenai hasil laporan
                                kami?{" "}
                            </p>
                            <div className="flex justify-center items-center py-5 gap-x-6">
                                <button
                                    type="submit"
                                    onClick={handleShowReplyForm}
                                    className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Tidak Puas
                                </button>
                                <button
                                    type="button"
                                    className="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={() => {
                                        window.location.href =
                                            route("feedback");
                                    }}
                                >
                                    Puas
                                </button>
                            </div>
                        </>
                    )}

                {showReplyForm && (
                    <div>
                        <form className="py-2 pr-3 mt-4 flex flex-col items-start">
                            <textarea
                                className="flex-1 border border-gray-300 rounded-md resize-none px-3 py-2 focus:outline-none focus:border-indigo-500 text-black w-full"
                                rows="4"
                                placeholder="Tuliskan alasan anda kenapa tidak puas dengan laporan komplain kami.."
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                            ></textarea>
                            <div className="px-3 flex justify-center w-full mt-2">
                                <button
                                    type="button" // Change type to "button"
                                    className="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={handleSubmitReply} // Handle click event
                                >
                                    Kirim
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {showModal && (
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold text-black">
                                        Komplain anda berhasil disimpan
                                    </h3>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto text-black">
                                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                        Kode Anda :{" "}
                                        {apiResponse
                                            ? apiResponse.kode
                                            : "Memuat..."}{" "}
                                    </p>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => {
                                            console.log("Copy button clicked"); // Debugging
                                            handleCopyToClipboard(
                                                apiResponse.kode
                                            ); // Pastikan parameter diteruskan
                                            setShowModal(false);
                                            setKonfirmasiData(false);
                                        }}
                                    >
                                        Copy
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </form>
    );
};

export default CekCodePage;
