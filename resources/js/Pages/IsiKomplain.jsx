import NavbarCustomer from "@/Components/NavbarCustomer";
import { Head } from "@inertiajs/react";
import InputDataKomplain from "./components/InputDataKomplain";

export default function IsiKomplain(props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title}></Head>
            <main>
                <NavbarCustomer user={props.auth.user} />
                <InputDataKomplain />
            </main>
        </div>
    );
}
