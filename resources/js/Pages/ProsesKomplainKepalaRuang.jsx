import { Link, Head } from "@inertiajs/react";
import Navigator from "./components/Navigator";
import NavigationBarProsesKepalaRuang from "./components/NavigationBarProsesKomplainKepalaRuang";
import DataProsesKomplainKepalaRuang from "./components/DataProsesKomplainKepalaRuang";

export default function ProsesKomplainKepalaRuang(props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title}></Head>
            <div className="w-full flex">
                <NavigationBarProsesKepalaRuang />
                <main className="grow">
                    <Navigator user={props.auth.user} />
                    <DataProsesKomplainKepalaRuang />
                </main>
            </div>
        </div>
    );
}
