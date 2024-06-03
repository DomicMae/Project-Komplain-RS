import { Link, Head } from "@inertiajs/react";
import Navigator from "./components/Navigator";
import DashboardAdminKepalaBidang from "./components/DashboardAdminKepalaBidang";
import NavigationBarDashboardKepalaBidang from "./components/NavigationBarDashboardKepalaBidang";

export default function HomepageKepalaBidang(props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title}></Head>
            <div className="w-full flex">
                <NavigationBarDashboardKepalaBidang />
                <main className="grow">
                    <Navigator user={props.auth.user} />
                    <DashboardAdminKepalaBidang />
                </main>
            </div>
        </div>
    );
}
