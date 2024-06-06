import NavbarCustomer from "@/Pages/components/NavbarCustomer";
import { Head } from "@inertiajs/react";
import DataKonfirmasiKomplain from "./components/DataKonfirmasiKomplain";

export default function KonfirmasiDataPage(props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title}></Head>
            <main>
                <NavbarCustomer user={props.auth.user} />
                <DataKonfirmasiKomplain />
            </main>
        </div>
    );
}
