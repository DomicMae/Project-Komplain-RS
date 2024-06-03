const BodyHomePage = ({ user }) => {
    return (
        <div className="relative isolate bg-gray-900 py-24 sm:py-0">
            <div className="w-full h-full bg-cover bg-no-repeat">
                <img
                    src="/images/Background.png"
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                    Halaman Pelaporan
                </h2>
                <p className="py-5">
                    Website yang dibuat untuk menampung segala komplain anda
                    terhadap pelayanan kami
                </p>
                <a
                    href={route("isi-komplain")}
                    className="inline-block rounded-md border border-transparent bg-green-600 px-8 py-3 text-center font-medium text-white hover:bg-green-700"
                >
                    MULAI
                </a>
            </div>
        </div>
    );
};

export default BodyHomePage;
