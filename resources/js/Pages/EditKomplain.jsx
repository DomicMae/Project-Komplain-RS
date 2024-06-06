import Navbar from "@/Pages/components/NavbarCustomer";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function EditKomplain(props) {
    const [title, setTitle] = useState("");
    const [nama, setNama] = useState("");
    const [kronologi, setKronologi] = useState("");

    const handleSubmit = () => {
        const data = {
            id: props.myKomplain.id,
            title,
            nama,
            kronologi,
        };
        Inertia.post("/komplain/update", data);
        setTitle("");
        setNama("");
        setKronologi("");
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="p-4 text-2xl">EDIT KOMPLAIN</div>
            <Head title={props.title}></Head>
            <Navbar user={props.auth.user} />
            <div className="card-body">
                <input
                    type="text"
                    placeholder="Title"
                    className="m-2 input input-bordered w-full"
                    onChange={(title) => setTitle(title.target.value)}
                    defaultValue={props.myKomplain.title}
                />
                <input
                    type="text"
                    placeholder="Nama"
                    className="m-2 input input-bordered w-full"
                    onChange={(nama) => setNama(nama.target.value)}
                    defaultValue={props.myKomplain.nama}
                />
                <input
                    type="text"
                    placeholder="Kronologi"
                    className="m-2 input input-bordered w-full"
                    onChange={(kronologi) =>
                        setKronologi(kronologi.target.value)
                    }
                    defaultValue={props.myKomplain.kronologi}
                />
                <button
                    className="btn btn-primary"
                    onClick={() => handleSubmit()}
                >
                    UPDATE
                </button>
            </div>
        </div>
    );
}
