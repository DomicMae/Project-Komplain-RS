import { Link, Head } from "@inertiajs/react";
import Navigator from "./components/Navigator";
import DataDaftarKomplain from "./components/DataDaftarKomplain";
import NavigationBarDaftarKomplain from "./components/NavigationBarDaftarKomplain";

export default function DaftarKomplain(props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title}></Head>
            <div className="w-full flex">
                <NavigationBarDaftarKomplain />
                <main className="grow">
                    <Navigator user={props.auth.user} />
                    <DataDaftarKomplain />
                </main>
            </div>
        </div>
    );
}
