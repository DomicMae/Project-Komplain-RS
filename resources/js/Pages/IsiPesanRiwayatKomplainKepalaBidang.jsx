import { Link, Head } from "@inertiajs/react";
import Navigator from "./components/Navigator";
import NavigationBarRiwayatKepalaBidang from "./components/NavigationBarRiwayatKomplainKepalaBidang";
import DataPesanRiwayatKomplainKepalaBidang from "./components/DataPesanRiwayatKomplainKepalaBidang";

export default function IsiPesanProsesKomplainKepalaBidang(props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title}></Head>
            <div className="w-full flex">
                <NavigationBarRiwayatKepalaBidang />
                <main className="grow">
                    <Navigator user={props.auth.user} />
                    <DataPesanRiwayatKomplainKepalaBidang />
                </main>
            </div>
        </div>
    );
}
