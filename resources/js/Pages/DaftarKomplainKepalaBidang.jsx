import { Link, Head } from "@inertiajs/react";
import Navigator from "./components/Navigator";
import DataDaftarKomplainKepalaBidang from "./components/DataDaftarKomplainKepalaBidang";
import NavigationBarDaftarKomplainKepalaBidang from "./components/NavigationBarDaftarKomplainKepalaBidang";

export default function DaftarKomplainKepalaBidang(props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title}></Head>
            <div className="w-full flex">
                <NavigationBarDaftarKomplainKepalaBidang />
                <main className="grow">
                    <Navigator user={props.auth.user} />
                    <DataDaftarKomplainKepalaBidang />
                </main>
            </div>
        </div>
    );
}
