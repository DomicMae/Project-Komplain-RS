import { Link, Head } from "@inertiajs/react";
import DashboardAdminCSO from "./components/DashboardAdminCSO";
import Navigator from "./components/Navigator";
import NavigationBarDashboardCSO from "./components/NavigationBarDashboardCSO";

export default function HomepageCSO(props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title}></Head>
            <div className="w-full flex">
                <NavigationBarDashboardCSO />
                <main className="grow">
                    <Navigator user={props.auth.user} />
                    <DashboardAdminCSO />
                </main>
            </div>
        </div>
    );
}
