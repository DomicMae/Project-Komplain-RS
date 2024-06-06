import NavbarCustomer from "@/Pages/components/NavbarCustomer";
import { Head } from "@inertiajs/react";
import BodyRiwayatKomplain from "./components/BodyRiwayatKomplain";

export default function Tes(props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title}></Head>
            <main>
                <NavbarCustomer user={props.auth.user} />
                <BodyRiwayatKomplain />
            </main>
        </div>
    );
}
