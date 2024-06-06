import NavbarCustomer from "@/Pages/components/NavbarCustomer";
import { Head } from "@inertiajs/react";
import BodyFeedback from "./components/BodyFeedback";

export default function Feedback(props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title}></Head>
            <main>
                <NavbarCustomer />
                <BodyFeedback />
            </main>
        </div>
    );
}
