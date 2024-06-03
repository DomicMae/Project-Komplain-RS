import { Link, Head } from "@inertiajs/react";
import Navigator from "./components/Navigator";
import NavigationBarDaftarKomplain from "./components/NavigationBarDaftarKomplain";
import DataLevel from "./components/DataLevel";

export default function PilihLevelCSO(props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title}></Head>
            <div className="w-full flex">
                <NavigationBarDaftarKomplain />
                <main className="grow">
                    <Navigator user={props.auth.user} />
                    <DataLevel />
                </main>
            </div>
        </div>
    );
}
