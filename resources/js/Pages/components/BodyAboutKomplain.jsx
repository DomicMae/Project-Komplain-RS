import { Link } from "@inertiajs/react";

const BodyAboutKomplain = () => {
    return (
        <form className="py-12 flex justify-center">
            <div className="max-w-screen-md mx-auto bg-transparant rounded-lg border-x-0 text-container text-center space-y-8">
                <h2 className="text-4xl font-bold text-gray-900">
                    TENTANG KOMPLAIN
                </h2>
                <div className="flex flex-col gap-5 m-3">
                    <div>
                        <div className="flex justify-center">
                            <div className="p-3">
                                <div className="flex gap-3 items-center">
                                    <img
                                        src="/images/Icon_CS.png"
                                        className="object-cover w-12 h-12 rounded-full border-2 border-emerald-400  shadow-emerald-400"
                                    />
                                    <h3 className="font-bold text-black px-1 text-lg">
                                        Pengertian Komplain
                                    </h3>
                                </div>
                                <div className="px-4 md:px-20">
                                    <p className="text-black border border-zinc-950 bg-green-600 rounded-lg p-3">
                                        Komplain adalah pengaduan atau
                                        penyampaian ketidakpuasan,
                                        ketidaknyamanan terhadap pelayanan rumah
                                        sakit.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="p-3">
                                <div className="flex gap-x-3 items-center">
                                    <img
                                        src="/images/Icon_CS.png"
                                        className="object-cover w-12 h-12 rounded-full border-2 border-emerald-400  shadow-emerald-400"
                                    />
                                    <h3 className="font-bold text-black px-1 text-lg">
                                        Perhatikan hal-hal dibawah ini ketika
                                        melapor
                                    </h3>
                                </div>
                                <div className="px-4 md:px-20 space-y-4">
                                    <p className="text-black text-center border border-zinc-950 bg-green-600 rounded-lg p-3">
                                        1. Laporan Anda relevan dengan kinerja
                                        rumah sakit kami
                                    </p>
                                    <p className="text-black text-center border border-zinc-950 bg-green-600 rounded-lg p-3">
                                        2. Menggunakan Bahasa Indonesia yang
                                        baik dan benar
                                    </p>
                                    <p className="text-black text-center border border-zinc-950 bg-green-600 rounded-lg p-3">
                                        3. Bukan merupakan laporan yang sudah
                                        disampaikan dan masih dalam proses
                                        penanganan
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <div className="p-3">
                                <div className="flex gap-3 items-center">
                                    <img
                                        src="/images/Icon_CS.png"
                                        className="object-cover w-12 h-12 rounded-full border-2 border-emerald-400  shadow-emerald-400"
                                    />
                                    <h3 className="font-bold text-black px-1 text-lg">
                                        Perhatikan kolom-kolom yang wajib diisi
                                    </h3>
                                </div>
                                <div className="px-4 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0">
                                    <div>
                                        <h1 className="text-black text-start font-bold">
                                            Wajib
                                        </h1>
                                        <div className="border border-zinc-950 bg-green-600 rounded-lg p-3">
                                            <p className="text-black text-start">
                                                1. Jenis Pasien
                                            </p>
                                            <p className="text-black text-start">
                                                2. Judul Komplain
                                            </p>
                                            <p className="text-black text-start">
                                                3. Nama Pasien
                                            </p>
                                            <p className="text-black text-start">
                                                4. Nomor Telepon
                                            </p>
                                            <p className="text-black text-start">
                                                5. Unit Komplain
                                            </p>
                                            <p className="text-black text-start">
                                                6. Tanggal Kejadian
                                            </p>
                                            <p className="text-black text-start">
                                                7. Tempat Kejadian
                                            </p>
                                            <p className="text-black text-start">
                                                8. Kronologi
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="text-black text-start font-bold">
                                            Opsional
                                        </h1>
                                        <div className="border border-zinc-950 bg-green-600 rounded-lg p-3">
                                            <p className="text-black text-start">
                                                1. Waktu kejadian
                                            </p>
                                            <p className="text-black text-start">
                                                2. Bukti foto
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default BodyAboutKomplain;
