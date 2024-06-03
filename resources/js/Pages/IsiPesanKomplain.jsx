import { Link, Head } from "@inertiajs/react";
import Navigator from "./components/Navigator";
import NavigationBarDaftarKomplain from "./components/NavigationBarDaftarKomplain";
import DataPesanKomplain from "./components/DataPesanKomplain";

export default function IsiPesanKomplain(props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title}></Head>
            <div className="w-full flex">
                <NavigationBarDaftarKomplain />
                <main className="grow">
                    <Navigator user={props.auth.user} />
                    <DataPesanKomplain user={props.auth.user} />
                </main>
            </div>
        </div>
    );
}
