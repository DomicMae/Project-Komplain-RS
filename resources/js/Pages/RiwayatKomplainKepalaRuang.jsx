import { Link, Head } from "@inertiajs/react";
import Navigator from "./components/Navigator";
import NavigationBarRiwayatKepalaRuang from "./components/NavigationBarRiwayatKomplainKepalaRuang";
import DataRiwayatKomplainKepalaRuang from "./components/DataRiwayatKomplainKepalaRuang";

export default function RiwayatKomplainKepalaRuang(props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title}></Head>
            <div className="w-full flex">
                <NavigationBarRiwayatKepalaRuang />
                <main className="grow">
                    <Navigator user={props.auth.user} />
                    <DataRiwayatKomplainKepalaRuang />
                </main>
            </div>
        </div>
    );
}
