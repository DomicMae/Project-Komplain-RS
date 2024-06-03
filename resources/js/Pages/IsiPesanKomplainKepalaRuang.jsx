import { Link, Head } from "@inertiajs/react";
import Navigator from "./components/Navigator";
import DataPesanKomplainKepalaRuang from "./components/DataPesanKomplainKepalaRuang";
import NavigationBarDaftarKomplainKepalaRuang from "./components/NavigationBarDaftarKomplainKepalaRuang";

export default function IsiPesanKomplainKepalaRuang(props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title}></Head>
            <div className="w-full flex">
                <NavigationBarDaftarKomplainKepalaRuang />
                <main className="grow">
                    <Navigator user={props.auth.user} />
                    <DataPesanKomplainKepalaRuang />
                </main>
            </div>
        </div>
    );
}
