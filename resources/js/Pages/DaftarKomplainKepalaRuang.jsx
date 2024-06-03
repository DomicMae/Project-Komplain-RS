import { Link, Head } from "@inertiajs/react";
import Navigator from "./components/Navigator";
import DataDaftarKomplainKepalaRuang from "./components/DataDaftarKomplainKepalaRuang";
import NavigationBarDaftarKomplainKepalaRuang from "./components/NavigationBarDaftarKomplainKepalaRuang";

export default function DaftarKomplainKepalaRuang(props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title}></Head>
            <div className="w-full flex">
                <NavigationBarDaftarKomplainKepalaRuang />
                <main className="grow">
                    <Navigator user={props.auth.user} />
                    <DataDaftarKomplainKepalaRuang />
                </main>
            </div>
        </div>
    );
}
