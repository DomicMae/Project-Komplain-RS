import BodyTes from "@/Components/BodyHomePage";
import KomplainList from "@/Components/Homepage/KomplainList";
import Navbar1 from "@/Components/NavbarCustomer";
import { Head } from "@inertiajs/react";

export default function Tes(props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title}></Head>
            <BodyTes />
        </div>
    );
}
