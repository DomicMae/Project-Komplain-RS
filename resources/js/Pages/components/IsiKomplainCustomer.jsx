import React, { useState, useEffect } from "react";
import axios from "axios";
import { Reply, Forward, SquarePen } from "lucide-react";

const IsiKomplainCustomer = ({ user }) => {
    const [komplainDetail, setKomplainDetail] = useState(null);

    const [formData, setFormData] = useState({
        unit: "",
    });

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

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        if (id) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(
                        `http://193.168.195.191/api/dataKomplainById/${id}`
                    );
                    setKomplainDetail(response.data);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData();
        }
    }, []);

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
                <div className="px-10 py-5 mb-6">
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
                                        {komplainDetail.nama}
                                    </span>
                                    <div className="flex items-center">
                                        <div className="border border-black bg-gray-0 rounded-full px-3 text-black inline-block mr-2">
                                            {komplainDetail.unit}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span className="text-sm text-gray-900">
                            tanggal {tanggal} {bulan} {tahun}
                        </span>
                    </div>
                    <div className="py-6 pl-2 text-black">
                        <p className="px-16">{komplainDetail.kronologi}</p>
                        <p className="mt-4 px-16">Regards,</p>
                        <p className="px-16">{komplainDetail.nama}</p>
                    </div>
                    {komplainDetail.gambar !== "Tidak ada gambar" &&
                        komplainDetail.gambar && (
                            <div className="px-16 flex items-center">
                                {/* Tampilkan gambar hanya jika ada */}
                                <img
                                    src={`/uploads/${komplainDetail.gambar}`}
                                    className="w-48 h-48 border border-gray-900"
                                />
                            </div>
                        )}
                    {komplainDetail.gambar === "Tidak ada gambar" && (
                        <div className="px-16 flex items-center">
                            <p className="px-2 text-black">
                                "Tidak ada gambar"
                            </p>
                        </div>
                    )}
                    <div className="flex justify-end px-16 py-6 text-black">
                        <div className="border border-black rounded-md inline-block p-5">
                            <p className="text-right">Penerima</p>
                            <p className="text-right">
                                {komplainDetail.penerima}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default IsiKomplainCustomer;
