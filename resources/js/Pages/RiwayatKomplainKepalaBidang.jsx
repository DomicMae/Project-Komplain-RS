import { Link, Head } from "@inertiajs/react";
import Navigator from "./components/Navigator";
import DataRiwayatKomplainKepalaBidang from "./components/DataRiwayatKomplainKepalaBidang";
import NavigationBarRiwayatKepalaBidang from "./components/NavigationBarRiwayatKomplainKepalaBidang";

export default function RiwayatKomplainKepalaBidang(props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title}></Head>
            <div className="w-full flex">
                <NavigationBarRiwayatKepalaBidang />
                <main className="grow">
                    <Navigator user={props.auth.user} />
                    <DataRiwayatKomplainKepalaBidang />
                </main>
            </div>
        </div>
    );
}
