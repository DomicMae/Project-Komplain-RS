import { Link, Head } from "@inertiajs/react";
import Navigator from "./components/Navigator";
import NavigationBarProsesKepalaBidang from "./components/NavigationBarProsesKomplainKepalaBidang";
import DataProsesKomplainKepalaBidang from "./components/DataProsesKomplainKepalaBidang";

export default function ProsesKomplainKepalaBidang(props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title}></Head>
            <div className="w-full flex">
                <NavigationBarProsesKepalaBidang />
                <main className="grow">
                    <Navigator user={props.auth.user} />
                    <DataProsesKomplainKepalaBidang />
                </main>
            </div>
        </div>
    );
}
