import NavbarCustomer from "@/Components/NavbarCustomer";
import { Head } from "@inertiajs/react";
import CekLupaCode from "./components/CekLupaCode";


export default function LupaCode(props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title}></Head>
            <main>
                <NavbarCustomer user={props.auth.user} />
                <CekLupaCode />
            </main>
        </div>
    );
}