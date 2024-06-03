import { Link, Head } from "@inertiajs/react";
import Navigator from "./components/Navigator";
import DashboardAdminKepalaRuang from "./components/DashboardAdminKepalaRuang";
import NavigationBarDashboardKepalaRuang from "./components/NavigationBarDashboardKepalaRuang";

export default function HomepageKepalaRuang(props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title}></Head>
            <div className="w-full flex">
                <NavigationBarDashboardKepalaRuang />
                <main className="grow">
                    <Navigator user={props.auth.user} />
                    <DashboardAdminKepalaRuang />
                </main>
            </div>
        </div>
    );
}
