import NavbarCustomer from "@/Pages/components/NavbarCustomer";
import { Head } from "@inertiajs/react";
import CekCodePage from "./components/CekCodePage";

export default function CodePage(props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title}></Head>
            <main>
                <NavbarCustomer user={props.auth.user} />
                <CekCodePage />
            </main>
        </div>
    );
}
