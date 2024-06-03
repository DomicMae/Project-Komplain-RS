import { Link, Head } from "@inertiajs/react";
import Navigator from "./components/Navigator";

import NavigationBarProsesKepalaBidang from "./components/NavigationBarProsesKomplainKepalaBidang";
import DataPesanProsesKomplainKepalaBidang from "./components/DataPesanProsesKomplainKepalaBidang";

export default function IsiPesanProsesKomplainKepalaBidang(props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title}></Head>
            <div className="w-full flex">
                <NavigationBarProsesKepalaBidang />
                <main className="grow">
                    <Navigator user={props.auth.user} />
                    <DataPesanProsesKomplainKepalaBidang />
                </main>
            </div>
        </div>
    );
}
