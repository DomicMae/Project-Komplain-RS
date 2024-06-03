import { Link, Head } from "@inertiajs/react";
import Navigator from "./components/Navigator";

import NavigationBarRiwayatKomplainCSO from "./components/NavigationBarRiwayatKomplainCSO";
import DataRiwayatKomplainCSO from "./components/DataRiwayatKomplainCSO";

export default function RiwayatKomplainKepalaBidang(props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title}></Head>
            <div className="w-full flex">
                <NavigationBarRiwayatKomplainCSO />
                <main className="grow">
                    <Navigator user={props.auth.user} />
                    <DataRiwayatKomplainCSO />
                </main>
            </div>
        </div>
    );
}
