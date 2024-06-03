import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { Link, Head } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Dashboard(props) {
    const [title, setTitle] = useState("");
    const [nama, setNama] = useState("");
    const [kronologi, setKronologi] = useState("");
    const [isNotif, setisNotif] = useState(false);

    const handleSubmit = () => {
        const data = {
            title,
            nama,
            kronologi,
        };
        Inertia.post("/komplain", data);
        setisNotif(true);
        setTitle("");
        setNama("");
        setKronologi("");
    };

    useEffect(() => {
        if (!props.myKomplain) {
            Inertia.get("/komplain");
        }
        console.log("props:", props);
    }, []);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Daftar Komplain
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white border-b border-gray-500">
                        {isNotif && (
                            <div role="alert" className="alert alert-info">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="stroke-current shrink-0 w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    ></path>
                                </svg>
                                <span>{props.flash.message}</span>
                            </div>
                        )}
                        <input
                            type="text"
                            placeholder="Title"
                            className="m-2 input input-bordered w-full"
                            onChange={(title) => setTitle(title.target.value)}
                            value={title}
                        />
                        <input
                            type="text"
                            placeholder="Nama"
                            className="m-2 input input-bordered w-full"
                            onChange={(nama) => setNama(nama.target.value)}
                            value={nama}
                        />
                        <input
                            type="text"
                            placeholder="Kronologi"
                            className="m-2 input input-bordered w-full"
                            onChange={(kronologi) =>
                                setKronologi(kronologi.target.value)
                            }
                            value={kronologi}
                        />
                        <button
                            className="btn btn-primary"
                            onClick={() => handleSubmit()}
                        >
                            SUBMIT
                        </button>
                    </div>
                </div>
                <div className="p-4">
                    {props.myKomplain && props.myKomplain.length > 0 ? (
                        props.myKomplain.map((komplain, i) => {
                            return (
                                <div
                                    key={i}
                                    className="card w-full lg:w-96 bg-base-100 shadow-xl m-2"
                                >
                                    <div className="card-body">
                                        <h2 className="card-title">
                                            {komplain.title}
                                            <div className="badge badge-secondary">
                                                NEW
                                            </div>
                                        </h2>
                                        <p>{komplain.kronologi}</p>
                                        <div className="card-actions justify-end">
                                            <div className="badge badge-outline">
                                                {komplain.nama}
                                            </div>
                                            <div className="badge badge-outline">
                                                <Link
                                                    href={route(
                                                        "edit.komplain"
                                                    )}
                                                    method="get"
                                                    data={{ id: komplain.id }}
                                                    as="button"
                                                >
                                                    Edit
                                                </Link>
                                            </div>
                                            <div className="badge badge-outline">
                                                <Link
                                                    href={route(
                                                        "delete.komplain"
                                                    )}
                                                    method="post"
                                                    data={{ id: komplain.id }}
                                                    as="button"
                                                >
                                                    Delete
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>Kamu belum ada data</p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
