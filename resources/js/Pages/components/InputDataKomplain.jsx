import { useState } from "react";
import { Link } from "@inertiajs/react";
import axios from "axios";
import Datepicker from "react-tailwindcss-datepicker";
import "../../../css/time.css";

const InputDataKomplain = ({ title, description }) => {
    const [showModal, setShowModal] = useState(false);
    const [showKonfirmasiData, setKonfirmasiData] = useState(false);
    const [apiResponse, setApiResponse] = useState(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        handleFileChange(file);
    };
    const [formData, setFormData] = useState({
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
        const { name, value, checked } = e.target;
        let formattedValue = value;
        console.log("Name:", name);
        console.log("Value:", value);

        // Menggunakan setState hanya sekali dengan seluruh pembaruan state yang dibutuhkan
        setFormData((prevState) => ({
            ...prevState,
            [name]: value, // Memperbarui nilai formData sesuai dengan input yang berubah
        }));

        // Memeriksa apakah input adalah radio button jenis_pasien dan telah dicentang (checked)
        if (name === "jenis_pasien" && checked) {
            formattedValue = value; // Jika ya, set nilai formattedValue sesuai dengan nilai input
        }

        // Memeriksa apakah input adalah waktu_kejadian
        if (name === "waktu_kejadian") {
            formattedValue = value.includes(".")
                ? value.replace(".", ":") + ":00"
                : value;
        }

        // Memeriksa apakah input adalah nomor telepon
        if (name === "no_telp") {
            // Menghapus angka 0 di depan dan menambahkan +62 di depan jika diperlukan
            formattedValue = value.startsWith("0")
                ? "+62" + value.substr(1)
                : value;

            // Memastikan jumlah angka setelah pemformatan lebih dari 8
            if (formattedValue.replace(/[^\d]/g, "").length <= 8) {
                // Jika jumlah angka kurang dari atau sama dengan 8, update state
                setFormData((prevState) => ({
                    ...prevState,
                    [name]: formattedValue,
                }));
            }
        }

        // Update state formData dengan nilai formattedValue
        setFormData((prevState) => ({
            ...prevState,
            [name]: formattedValue,
        }));
    };

    const handleFileChange = (file) => {
        const { name } = file; // Hanya mendestrukturisasi 'name' dari 'file'
        console.log("Name:", name);

        // Cek apakah file yang dipilih memiliki ekstensi yang diizinkan
        const allowedExtensions = ["png", "jpg", "jpeg"];
        const fileExtension = name.split(".").pop().toLowerCase(); // Menggunakan 'name' untuk mendapatkan ekstensi file
        if (!allowedExtensions.includes(fileExtension)) {
            alert("File harus dalam format PNG, JPG, atau JPEG.");
            return;
        }

        // Set formData langsung dengan file gambar
        setSelectedImage(URL.createObjectURL(file)); // Menampilkan gambar yang dipilih
        setFormData({
            ...formData,
            gambar: file,
        });
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
            formData.jenis_pasien.trim() === "" ||
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
        formDataToSend.append("jenis_pasien", formData.jenis_pasien);
        formDataToSend.append("judul", formData.judul);
        formDataToSend.append("nama", formData.nama);
        formDataToSend.append("no_telp", formData.no_telp);
        formDataToSend.append("unit", formData.unit);
        formDataToSend.append("tanggal_kejadian", formData.tanggal_kejadian);
        formDataToSend.append("waktu_kejadian", waktuKejadian);
        formDataToSend.append("tempat_kejadian", formData.tempat_kejadian);
        formDataToSend.append("kronologi", formData.kronologi);
        formDataToSend.append("gambar", formData.gambar);

        axios
            .post("http://193.168.195.191/api/addkomplain", formDataToSend)
            .then((response) => {
                // Handle response jika berhasil
                setApiResponse(response.data);
                setShowModal(true);

                // Panggil fungsi sendEmail setelah respons berhasil
                sendEmail();
                sendLiveTracking();
                window.location.reload();
            })
            .catch((error) => {
                // Handle error jika terjadi kesalahan
                console.error(error);
            });
    };

    const sendEmail = () => {
        axios
            .get("http://193.168.195.191/api/sendemail")
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
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        const hours = String(today.getHours()).padStart(2, "0");
        const minutes = String(today.getMinutes()).padStart(2, "0");
        const seconds = String(today.getSeconds()).padStart(2, "0");

        const tanggalUpdate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        axios
            .post("http://193.168.195.191/api/addLiveTracking", {
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
        <form className="py-6 sm:py-12 flex justify-center">
            <div className="max-w-3xl w-full">
                <div className="space-y-6 sm:space-y-12">
                    <div className="border-b border-gray-900/10 pb-6 sm:pb-12">
                        <div className="text-container text-center">
                            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900">
                                Welcome Komplain Layanan
                            </h2>
                            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900">
                                Rumah Sakit Gotong Royong
                            </h2>
                        </div>
                    </div>
                </div>

                <div>
                    <div>
                        <div className="card border-secondary">
                            <div className="text-lg sm:text-2xl rounded-lg card-header text-white text-center bg-[#1BBD36] py-2 sm:py-4">
                                Sampaikan Laporan Anda
                            </div>
                            <div className="card-body">
                                <div className="mt-2 sm:mt-3 flex flex-col sm:flex-row items-center justify-between pb-2 sm:pb-5">
                                    <div className="flex items-center">
                                        <p className="text-sm sm:text-xl text-center sm:text-left text-gray-900">
                                            Perhatikan cara menyampaikan
                                            pengaduan yang baik dan benar
                                        </p>
                                        <span className="ml-2 sm:ml-3">
                                            <Link
                                                href={route("about")}
                                                as="button"
                                            >
                                                <button className="rounded-md bg-green-500 px-3 py-2 text-sm sm:text-base font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                                    ?
                                                </button>
                                            </Link>
                                        </span>
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label
                                            htmlFor="Jenis Pasien"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Pasien{" "}
                                            <span class="text-red-500">*</span>
                                        </label>
                                        <div className="flex items-center px-4 border-0 border-gray-200 rounded dark:border-gray-700">
                                            <input
                                                id="bordered-radio-1"
                                                type="radio"
                                                value="Umum"
                                                name="jenis_pasien"
                                                className="w-4 h-4 text-green-600  focus:ring-black dark:focus:ring-black dark:bg-white dark:border-black"
                                                onChange={handleChange}
                                                checked={
                                                    formData.jenis_pasien ===
                                                    "Umum"
                                                }
                                            />
                                            <label
                                                htmlFor="bordered-radio-1"
                                                className="w-full py-4 ms-2 text-sm font-medium text-black"
                                            >
                                                Umum
                                            </label>
                                            <input
                                                id="bordered-radio-2"
                                                type="radio"
                                                value="BPJS"
                                                name="jenis_pasien"
                                                className="w-4 h-4 text-green-600  focus:ring-black dark:focus:ring-black dark:bg-white dark:border-black"
                                                onChange={handleChange}
                                                checked={
                                                    formData.jenis_pasien ===
                                                    "BPJS"
                                                }
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
                                            Tanggal Kejadian{" "}
                                            <span class="text-red-500">*</span>
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
                                            Judul Komplain{" "}
                                            <span class="text-red-500">*</span>
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
                                            Nama Pasien{" "}
                                            <span class="text-red-500">*</span>
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
                                            Tempat Kejadian{" "}
                                            <span class="text-red-500">*</span>
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
                                            Nomor Telepon{" "}
                                            <span class="text-red-500">*</span>
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
                                            Unit{" "}
                                            <span class="text-red-500">*</span>
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
                                        Kronologi{" "}
                                        <span class="text-red-500">*</span>
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
                                    <div
                                        className={`mt-2 mb-4 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 ${
                                            isDragOver
                                                ? "bg-gray-200"
                                                : "bg-white"
                                        }`}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                    >
                                        <div className="text-center">
                                            {selectedImage ? (
                                                <div className="relative">
                                                    <img
                                                        src={selectedImage}
                                                        alt="Selected"
                                                        className="w-64 h-64 object-cover rounded-lg border border-gray-900"
                                                    />
                                                    <button
                                                        onClick={() =>
                                                            setSelectedImage(
                                                                null
                                                            )
                                                        }
                                                        className="absolute top-0 right-0 mt-2 mr-2 bg-white text-gray-800 rounded-full p-1 hover:bg-gray-200 focus:outline-none"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-6 w-6"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M6 18L18 6M6 6l12 12"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="mt-4 flex flex-col items-center text-sm leading-6 text-gray-600">
                                                    <label
                                                        htmlFor="gambar"
                                                        className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 mt-3 flex flex-col items-center justify-center w-full"
                                                    >
                                                        <svg
                                                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 20 16"
                                                        >
                                                            <path
                                                                stroke="currentColor"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                            />
                                                        </svg>
                                                        <p className="text-black">
                                                            Upload a file or
                                                            drag and drop
                                                        </p>
                                                        <p className="text-xs leading-5 text-gray-600">
                                                            PNG, JPG, JPEG up to
                                                            10MB
                                                        </p>
                                                        <input
                                                            id="gambar"
                                                            name="gambar"
                                                            type="file"
                                                            accept=".png, .jpg, .jpeg"
                                                            className="appearance-none hidden"
                                                            onChange={(e) =>
                                                                handleFileChange(
                                                                    e.target
                                                                        .files[0]
                                                                )
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="mt-6 flex items-center justify-center gap-x-6">
                                    <div className="">
                                        <button
                                            type="button"
                                            className="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            onClick={() =>
                                                setKonfirmasiData(true)
                                            }
                                        >
                                            Submit
                                        </button>
                                    </div>
                                    {showKonfirmasiData && (
                                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                    <span className="py-10"></span>
                                                    {/*header*/}
                                                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                                        <h3 className="text-3xl font-semibold text-black">
                                                            Mohon Konfirmasi
                                                            Data dibawah ini
                                                        </h3>
                                                    </div>
                                                    {/*body*/}
                                                    <div className="relative p-6 flex-auto text-black">
                                                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                                            Jenis Pasien :{" "}
                                                            {
                                                                formData.jenis_pasien
                                                            }
                                                        </p>
                                                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                                            Judul Komplain :{" "}
                                                            {formData.judul}
                                                        </p>
                                                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                                            Nama Pasien :{" "}
                                                            {formData.nama}
                                                        </p>
                                                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                                            Nomor Telepon :{" "}
                                                            {formData.no_telp}
                                                        </p>
                                                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                                            Unit :{" "}
                                                            {formData.unit}
                                                        </p>
                                                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                                            Tanggal Kejadian :{" "}
                                                            {
                                                                formData.tanggal_kejadian
                                                            }
                                                        </p>
                                                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                                            Waktu Kejadian :{" "}
                                                            {
                                                                formData.waktu_kejadian
                                                            }
                                                        </p>
                                                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                                            Tempat Kejadian :{" "}
                                                            {
                                                                formData.tempat_kejadian
                                                            }
                                                        </p>
                                                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                                            Kronologi :{" "}
                                                            {formData.kronologi}
                                                        </p>
                                                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                                            Foto :{" "}
                                                            {formData.gambar && (
                                                                <img
                                                                    src={URL.createObjectURL(
                                                                        formData.gambar
                                                                    )} // Gunakan URL.createObjectURL untuk menampilkan preview gambar
                                                                    alt="Preview"
                                                                    className="w-32 h-auto"
                                                                />
                                                            )}
                                                        </p>
                                                    </div>
                                                    {/*footer*/}
                                                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                                        <button
                                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="button"
                                                            onClick={() =>
                                                                setKonfirmasiData(
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            className="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                            onClick={
                                                                handleSubmit
                                                            }
                                                        >
                                                            Kirim
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
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
                                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="button"
                                                            onClick={() => {
                                                                console.log(
                                                                    "Copy button clicked"
                                                                ); // Debugging
                                                                handleCopyToClipboard(
                                                                    apiResponse.kode
                                                                ); // Pastikan parameter diteruskan
                                                                setShowModal(
                                                                    false
                                                                );
                                                                setKonfirmasiData(
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

export default InputDataKomplain;
