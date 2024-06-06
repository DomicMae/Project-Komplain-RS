import { Link, Head } from "@inertiajs/react";
import Navigator from "./components/Navigator";

import NavigationBarProsesKomplainCSO from "./components/NavigationBarProsesKomplainCSO";
import DataProsesKomplainCSO from "./components/DataProsesKomplainCSO";

export default function ProsesKomplainCSO(props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title}></Head>
            <div className="w-full flex">
                <NavigationBarProsesKomplainCSO />
                <main className="grow">
                    <Navigator user={props.auth.user} />
                    <DataProsesKomplainCSO />
                </main>
            </div>
        </div>
    );
}
