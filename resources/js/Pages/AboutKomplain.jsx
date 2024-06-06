import BodyAboutKomplain from "@/Pages/components/BodyAboutKomplain";
import NavbarCustomer from "@/Pages/components/NavbarCustomer";
import { Head } from "@inertiajs/react";

export default function Tes(props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title}></Head>
            <main>
                <NavbarCustomer />
                <BodyAboutKomplain />
            </main>
        </div>
    );
}
