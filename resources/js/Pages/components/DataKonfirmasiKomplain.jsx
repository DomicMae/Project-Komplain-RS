import { useState } from "react";
import { Link } from "@inertiajs/react";
import axios from "axios";
import Datepicker from "react-tailwindcss-datepicker";
import "../../../css/time.css";

const DataKonfirmasiKomplain = ({ title, description }) => {
    const [showModal, setShowModal] = useState(false);
    const [apiResponse, setApiResponse] = useState(null);
    const [formData, setFormData] = useState({
        judul: "",
        nama: "",
        no_telp: "",
        unit: "",
        tanggal_kejadian: "",
        waktu_kejadian: "",
        tempat_kejadian: "",
        kronologi: "",
        gambar: "",
    });
    const [value, setValue] = useState({
        startDate: null,
        endDate: null,
    });
    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue);
        setValue(newValue);
        setFormData({ ...formData, tanggal_kejadian: newValue.startDate });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        const formattedTime = value.includes(".")
            ? value.replace(".", ":") + ":00"
            : value;
        // Update state formData dengan waktu kejadian yang diformat
        setFormData((prevState) => ({
            ...prevState,
            [name]: formattedTime,
        }));
        // Validasi nomor telepon
        if (name === "no_telp") {
            // Menghapus angka 0 di depan dan menambahkan +62 di depan jika diperlukan
            let formattedValue = value.startsWith("0")
                ? "+62" + value.substr(1)
                : value;
            // Memastikan jumlah angka setelah pemformatan lebih dari 8
            if (formattedValue.replace(/[^\d]/g, "").length > 8) {
                // Jika jumlah angka lebih dari 8, update state
                setFormData((prevState) => ({
                    ...prevState,
                    [name]: formattedValue,
                }));
            }
        } else {
            // Untuk input selain nomor telepon, gunakan nilai langsung
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    // Fungsi handleFileChange untuk memperbarui nilai formData.gambar
    const handleFileChange = (file) => {
        // Cek apakah file yang dipilih memiliki ekstensi yang diizinkan
        const allowedExtensions = ["png", "jpg", "jpeg"];
        const fileExtension = file.name.split(".").pop().toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            alert("File harus dalam format PNG, JPG, atau JPEG.");
            return;
        }
        // Jika ekstensi file sesuai, update nilai formData.gambar
        setFormData({ ...formData, gambar: file });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Mencegah perilaku default dari event klik

        // Validasi input nomor telepon jika telah diisi
        if (
            formData.no_telp &&
            formData.no_telp.replace(/[^\d]/g, "").length <= 8
        ) {
            // Menampilkan pesan alert jika nomor telepon tidak memenuhi syarat
            alert("Nomor telepon harus terdiri dari minimal 9 digit angka.");
            return;
        }

        if (
            formData.judul.trim() === "" ||
            formData.tanggal_kejadian.trim() === "" ||
            formData.nama.trim() === "" ||
            formData.tempat_kejadian.trim() === "" ||
            formData.no_telp.trim() === "" ||
            formData.kronologi.trim() === "" ||
            formData.unit.trim() === ""
        ) {
            // Menampilkan alert jika ada input yang kurang lengkap
            alert("Harap lengkapi semua input sebelum mengirimkan formulir.");
            return;
        }

        // Set waktu kejadian menjadi null jika tidak diisi
        const waktuKejadian =
            formData.waktu_kejadian.trim() !== ""
                ? formData.waktu_kejadian
                : "00:00:00";

        const formDataToSend = new FormData();
        formDataToSend.append("judul", formData.judul);
        formDataToSend.append("nama", formData.nama);
        formDataToSend.append("no_telp", formData.no_telp);
        formDataToSend.append("unit", formData.unit);
        formDataToSend.append("tanggal_kejadian", formData.tanggal_kejadian);
        formDataToSend.append("waktu_kejadian", waktuKejadian);
        formDataToSend.append("tempat_kejadian", formData.tempat_kejadian);
        formDataToSend.append("kronologi", formData.kronologi);
        formDataToSend.append(
            "gambar",
            formData.gambar ? formData.gambar : null
        ); // Set gambar menjadi null jika tidak diisi

        axios
            .post("http://127.0.0.1:8000/api/komplainSS", formDataToSend)
            .then((response) => {
                // Handle response jika berhasil
                setApiResponse(response.data);
                setShowModal(true);
            })
            .catch((error) => {
                // Handle error jika terjadi kesalahan
                console.error(error);
            });
    };

    const handleMark = () => {
        router.push("/about"); // Navigasi ke route "/about" saat tombol diklik
    };

    const handleCopyToClipboard = () => {
        if (apiResponse && apiResponse.kode) {
            navigator.clipboard
                .writeText(apiResponse.kode)
                .then(() => alert("Data copied to clipboard!"))
                .catch((error) =>
                    console.error("Failed to copy data: ", error)
                );
        }
    };

    return (
        <form className="py-12 flex justify-center">
            <div className="max-w-3xl w-full">
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="text-container text-center">
                            <h2 className="text-4xl font-bold text-gray-900">
                                Welcome Komplain Layanan
                            </h2>
                            <h2 className="text-4xl font-bold text-gray-900">
                                Rumah Sakit Gotong Royong
                            </h2>
                        </div>
                    </div>
                </div>

                <div>
                    <div>
                        <div className="card border-secondary">
                            <div className="text-2xl rounded-lg card-header text-white text-center bg-[#1BBD36] py-2">
                                Sampaikan Laporan Anda
                            </div>
                            <div className="card-body">
                                <div className="mt-3 flex items-center justify-end pb-5">
                                    <p className="text-xl text-center text-gray-900">
                                        Perhatikan cara menyampaikan pengaduan
                                        yang baik dan benar
                                    </p>
                                    <Link href={route("about")} as="button">
                                        <button className="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                            ?
                                        </button>
                                    </Link>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label
                                            htmlFor="Judul Komplain"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Pasien
                                        </label>
                                        <div className="flex items-center px-4 border-0 border-gray-200 rounded dark:border-gray-700">
                                            <input
                                                id="bordered-radio-1"
                                                type="radio"
                                                value=""
                                                name="bordered-radio"
                                                className="w-4 h-4 text-green-600  focus:ring-black dark:focus:ring-black dark:bg-white dark:border-black"
                                            />
                                            <label
                                                htmlFor="bordered-radio-1"
                                                className="w-full py-4 ms-2 text-sm font-medium text-black"
                                            >
                                                Umum
                                            </label>
                                            <input
                                                checked
                                                id="bordered-radio-2"
                                                type="radio"
                                                value=""
                                                name="bordered-radio"
                                                className="w-4 h-4 text-green-600  focus:ring-black dark:focus:ring-black dark:bg-white dark:border-black"
                                            />
                                            <label
                                                htmlFor="bordered-radio-2"
                                                className="w-full py-4 ms-2 text-sm font-medium text-black"
                                            >
                                                BPJS
                                            </label>
                                        </div>
                                    </div>

                                    <div className="">
                                        <label
                                            htmlFor="Tanggal Kejadian"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Tanggal Kejadian
                                        </label>
                                        <div className="mt-2 mb-4 ">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                                <Datepicker
                                                    useRange={false}
                                                    asSingle={true}
                                                    value={value}
                                                    onChange={handleValueChange}
                                                    id="tanggal_kejadian"
                                                    autoComplete="tanggal_kejadian"
                                                    className="block flex-1 border-0 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 "
                                                    placeholder="Tanggal Kejadian"
                                                    configs={{
                                                        backgroundColor:
                                                            "#FFFFFF", // Menetapkan warna latar belakang ke putih
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="">
                                        <label
                                            htmlFor="Judul Komplain"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Judul Komplain
                                        </label>
                                        <div className="mt-2 mb-4 ">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 bg-white">
                                                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                                <input
                                                    type="text"
                                                    name="judul"
                                                    value={formData.judul}
                                                    onChange={handleChange}
                                                    id="judul"
                                                    autoComplete="judul"
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                    placeholder="Judul Komplain"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="">
                                        <label
                                            htmlFor="Waktu Kejadian"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Waktu Kejadian
                                        </label>
                                        <div className="mt-2 mb-4">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 bg-white">
                                                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                                <input
                                                    type="text" // Menggunakan input teks biasa
                                                    name="waktu_kejadian"
                                                    value={
                                                        formData.waktu_kejadian
                                                    }
                                                    onChange={handleChange}
                                                    id="waktu_kejadian"
                                                    autoComplete="waktu_kejadian"
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                    placeholder="Waktu Kejadian (contoh: 17.00)"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="">
                                        <label
                                            htmlFor="Nama Pasien"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Nama Pasien
                                        </label>
                                        <div className="mt-2 mb-4">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 bg-white">
                                                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                                <input
                                                    type="text"
                                                    name="nama"
                                                    value={formData.nama}
                                                    onChange={handleChange}
                                                    id="nama"
                                                    autoComplete="nama"
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                    placeholder="Nama Pasien"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="">
                                        <label
                                            htmlFor="Tempat Kejadian"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Tempat Kejadian
                                        </label>
                                        <div className="mt-2 mb-4">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 bg-white">
                                                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                                <input
                                                    type="text"
                                                    name="tempat_kejadian"
                                                    value={
                                                        formData.tempat_kejadian
                                                    }
                                                    onChange={handleChange}
                                                    id="tempat_kejadian"
                                                    autoComplete="tempat_kejadian"
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                    placeholder="Tempat Kejadian"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="">
                                        <label
                                            htmlFor="Nomor Telepon"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Nomor Telepon
                                        </label>
                                        <div className="mt-2 mb-4">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 bg-white">
                                                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                                <input
                                                    type="text"
                                                    name="no_telp"
                                                    value={formData.no_telp}
                                                    onChange={handleChange}
                                                    id="no_telp"
                                                    autoComplete="no_telp"
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                    placeholder="Nomor Telepon"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="">
                                        <label
                                            htmlFor="Nomor Telepon"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Unit
                                        </label>
                                        <div className="mt-2 mb-4">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                                <select
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    name="unit"
                                                    value={formData.unit}
                                                    onChange={handleChange}
                                                >
                                                    <option className="text-gray-500">
                                                        Pilih Unit
                                                    </option>
                                                    <optgroup label="Bidang Pelayanan Medis">
                                                        <option>
                                                            Unit IGD
                                                        </option>
                                                        <option>
                                                            Unit Rawat Jalan
                                                        </option>
                                                        <option>
                                                            Unit Kamar Operasi
                                                        </option>
                                                        <option>
                                                            Unit Rehabilitasi
                                                            Medis
                                                        </option>
                                                        <option>
                                                            Unit Pelayanan
                                                            Dialisis
                                                        </option>
                                                    </optgroup>
                                                    <optgroup label="Bidang Penunjang Medis">
                                                        <option>
                                                            Unit Farmasi
                                                        </option>
                                                        <option>
                                                            Unit Laboratorium
                                                        </option>
                                                        <option>
                                                            Unit Radiologi
                                                        </option>
                                                        <option>
                                                            Unit Rekam Medis
                                                        </option>
                                                        <option>
                                                            Unit Gizi
                                                        </option>
                                                    </optgroup>
                                                    <optgroup label="Bidang Keperawatan dan Kebidanan">
                                                        <option>
                                                            Unit Rawat Inap 1
                                                        </option>
                                                        <option>
                                                            Unit Rawat Inap 2
                                                        </option>
                                                        <option>
                                                            Unit Rawat Inap
                                                            Kebidanan, Kandungan
                                                            dan NICU
                                                        </option>
                                                        <option>
                                                            Unit Rawat Inap 4
                                                            dan Geriatri
                                                        </option>
                                                        <option>
                                                            Unit Pelayanan
                                                            Intensif (ICU)
                                                        </option>
                                                    </optgroup>
                                                    <optgroup label="Bidang Umum dan Keuangan">
                                                        <option>
                                                            Unit Human Resources
                                                            Development (HRD)
                                                        </option>
                                                        <option>
                                                            Unit Pengadaan
                                                        </option>
                                                        <option>
                                                            Unit Umum
                                                        </option>
                                                        <option>
                                                            Unit Customer
                                                            Service
                                                        </option>
                                                    </optgroup>
                                                    <optgroup label="Sarana dan Prasarana">
                                                        <option>
                                                            Unit Pemeliharaan
                                                            Sarana
                                                        </option>
                                                    </optgroup>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label
                                        htmlFor="kronologi"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Kronologi
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="kronologi"
                                            name="kronologi"
                                            rows={3}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={formData.kronologi}
                                            onChange={handleChange}
                                            placeholder="Kronologi"
                                        />
                                    </div>
                                    <p className="mb-4 text-sm leading-6 text-gray-600">
                                        Ceritakan tentang kronologi yang ingin
                                        disampaikan
                                    </p>
                                </div>

                                <div className="col-span-full">
                                    <label
                                        htmlFor="gambar"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Bukti foto
                                    </label>
                                    <div className="mt-2 mb-4 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-white">
                                        <div className="text-center">
                                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                <label
                                                    htmlFor="gambar"
                                                    className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 mt-3 flex items-center justify-end"
                                                >
                                                    <input
                                                        id="gambar"
                                                        name="gambar"
                                                        type="file"
                                                        accept=".png, .jpg, .jpeg" // Hanya menerima file dengan ekstensi tertentu
                                                        className="appearance-none"
                                                        onChange={(e) =>
                                                            handleFileChange(
                                                                e.target
                                                                    .files[0]
                                                            )
                                                        } // Tangkap nilai file dan panggil fungsi handleFileChange
                                                    />
                                                </label>
                                            </div>
                                            <p className="text-black">
                                                Upload a file or drag and drop
                                            </p>
                                            <p className="text-xs leading-5 text-gray-600">
                                                PNG, JPG, JPEG up to 10MB
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="mt-6 flex items-center justify-center gap-x-6">
                                    <div className="">
                                        <button
                                            type="submit"
                                            className="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                    {showModal && (
                                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                    {/*header*/}
                                                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                                        <h3 className="text-3xl font-semibold text-black">
                                                            Komplain anda
                                                            berhasil disimpan
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
                                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="button"
                                                            onClick={() =>
                                                                setShowModal(
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            Close
                                                        </button>
                                                        <button
                                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="button"
                                                            onClick={() => {
                                                                handleCopyToClipboard();
                                                                setShowModal(
                                                                    false
                                                                );
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default DataKonfirmasiKomplain;
