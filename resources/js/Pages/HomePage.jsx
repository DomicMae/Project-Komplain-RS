import BodyHomePage from "@/Components/BodyHomePage";
import NavbarCustomer from "@/Pages/components/NavbarCustomer";
import { Head } from "@inertiajs/react";

export default function HomePage(props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title}></Head>
            <main>
                <NavbarCustomer user={props.auth.user} />
                <BodyHomePage />
            </main>
        </div>
    );
}
