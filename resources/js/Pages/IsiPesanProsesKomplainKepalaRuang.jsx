import { Link, Head } from "@inertiajs/react";
import Navigator from "./components/Navigator";

import NavigationBarProsesKepalaRuang from "./components/NavigationBarProsesKomplainKepalaRuang";
import DataPesanProsesKomplainKepalaRuang from "./components/DataPesanProsesKomplainKepalaRuang";

export default function IsiPesanProsesKomplainKepalaRuang(props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title}></Head>
            <div className="w-full flex">
                <NavigationBarProsesKepalaRuang />
                <main className="grow">
                    <Navigator user={props.auth.user} />
                    <DataPesanProsesKomplainKepalaRuang />
                </main>
            </div>
        </div>
    );
}
