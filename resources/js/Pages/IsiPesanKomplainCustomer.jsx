import NavbarCustomer from "@/Components/NavbarCustomer";
import { Head } from "@inertiajs/react";
import IsiKomplainCustomer from "./components/IsiKomplainCustomer";

export default function Tes(props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title}></Head>
            <main>
                <NavbarCustomer user={props.auth.user} />
                <IsiKomplainCustomer />
            </main>
        </div>
    );
}
