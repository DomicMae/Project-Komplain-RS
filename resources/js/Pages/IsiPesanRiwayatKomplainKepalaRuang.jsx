import { Link, Head } from "@inertiajs/react";
import Navigator from "./components/Navigator";
import DataPesanRiwayatKomplainKepalaRuang from "./components/DataPesanRiwayatKomplainKepalaRuang";
import NavigationBarRiwayatKepalaRuang from "./components/NavigationBarRiwayatKomplainKepalaRuang";

export default function IsiPesanProsesKomplainKepalaRuang(props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title}></Head>
            <div className="w-full flex">
                <NavigationBarRiwayatKepalaRuang />
                <main className="grow">
                    <Navigator user={props.auth.user} />
                    <DataPesanRiwayatKomplainKepalaRuang />
                </main>
            </div>
        </div>
    );
}
