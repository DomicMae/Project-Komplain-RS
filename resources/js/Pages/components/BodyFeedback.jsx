import React, { useState, useEffect } from "react";
import axios from "axios";
import { Mail } from "lucide-react";

const BodyFeedback = ({ title, description }) => {
    const [rating, setRating] = useState(0); // State untuk menyimpan nilai rating

    const [formData, setFormData] = useState({
        bintang: "",
        keterangan: "",
    });

    const handleRatingChange = (event) => {
        const value = parseInt(event.target.value); // Mendapatkan nilai rating yang diklik
        setRating(value); // Mengubah nilai rating sesuai dengan input yang diklik
        setFormData({ ...formData, bintang: event.target.value }); // Update nilai formData.bintang
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(value); // Menampilkan nilai value yang dipilih ke konsol
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validasi input sebelum mengirimkan data
        if (
            formData.bintang.trim() === "" ||
            formData.keterangan.trim() === ""
        ) {
            // Menampilkan alert jika ada input yang kurang lengkap
            alert("Harap lengkapi semua input feedback.");
            return;
        }

        try {
            const response = await axios.post(
                "http://193.168.195.191/api/makeNewFeedback",
                formData
            );
            console.log(response.data);
            alert("Feedback berhasil ditambahkan");
            window.location.reload();
        } catch (error) {
            // Handle error jika terjadi kesalahan
            console.error(error);
            alert("Terjadi kesalahan saat menambahkan feedback");
        }
    };

    return (
        <form className="py-12 flex justify-center" onSubmit={handleSubmit}>
            <div className="max-w-3xl w-full">
                <div className="text-container text-center">
                    <h2 className="text-4xl font-bold text-gray-900">
                        Silahkan Masukkan Feedback
                    </h2>
                </div>
                <div className="text-container text-center">
                    <p className="py-4 mt-1 text-lg text-gray-600">
                        Bagaimana apakah anda puas dengan pelayanan kami?
                    </p>
                </div>
                {/* Bagian input untuk rating */}
                <div className="flex justify-center">
                    <div className="rating rating-lg">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <input
                                key={value}
                                type="radio"
                                name="bintang"
                                className="mask mask-star-2 bg-orange-400"
                                value={value}
                                checked={parseInt(formData.bintang) === value}
                                onChange={handleChange}
                            />
                        ))}
                    </div>
                </div>
                {/* Input untuk kode live tracking */}
                <div className="py-10 max-w-3xl w-full">
                    <div className="text-container text-center">
                        <label
                            htmlFor="Berikan keterangan"
                            className="py-4 mt-1 text-lg text-gray-600"
                        >
                            Saran dan kritik
                        </label>
                        <div className="mt-2">
                            <textarea
                                id="keterangan"
                                name="keterangan"
                                rows={3}
                                value={formData.keterangan}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Berikan keterangan ..."
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
};

export default BodyFeedback;
