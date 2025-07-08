import React, { useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useForm, router } from "@inertiajs/react";

export default function Kenakalan({ students = [], list = [] }) {
    const fileInputRef = useRef();

    const { data, setData, post, processing, reset } = useForm({
        student_id: "",
        tanggal: "",
        jenis: "",
        keterangan: "",
        foto: [],
    });

    const [editItem, setEditItem] = useState(null);
    const [showDeleteId, setShowDeleteId] = useState(null);
    const [modalImageList, setModalImageList] = useState([]);
    const [modalImageIndex, setModalImageIndex] = useState(0);

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key === "foto") {
                for (let i = 0; i < value.length; i++) {
                    formData.append("foto[]", value[i]);
                }
            } else {
                formData.append(key, value);
            }
        });
        post("/kenakalan", {
            data: formData,
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    const submitEdit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(editItem).forEach(([key, value]) => {
            if (key === "foto") {
                for (let i = 0; i < value.length; i++) {
                    formData.append("foto[]", value[i]);
                }
            } else {
                formData.append(key, value);
            }
        });
        router.post(`/kenakalan/${editItem.id}`, formData);
        setEditItem(null);
    };

    const confirmDelete = () => {
        router.delete(`/kenakalan/${showDeleteId}`);
        setShowDeleteId(null);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-5xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold text-center text-red-700 mb-6">
                    Kenakalan Remaja
                </h1>

                <form
                    onSubmit={submit}
                    className="bg-white p-6 rounded shadow space-y-6"
                    encType="multipart/form-data"
                >
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label>Nama Siswa</label>
                            <select
                                className="w-full border rounded p-2"
                                value={data.student_id}
                                onChange={(e) =>
                                    setData("student_id", e.target.value)
                                }
                            >
                                <option value="">Pilih siswa</option>
                                {students.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Tanggal</label>
                            <input
                                type="date"
                                className="w-full border rounded p-2"
                                value={data.tanggal}
                                onChange={(e) =>
                                    setData("tanggal", e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <label>Jenis Kenakalan</label>
                        <input
                            type="text"
                            className="w-full border rounded p-2"
                            placeholder="Contoh: Merokok, Tawuran"
                            value={data.jenis}
                            onChange={(e) => setData("jenis", e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Keterangan</label>
                        <textarea
                            className="w-full border rounded p-2"
                            rows="3"
                            value={data.keterangan}
                            onChange={(e) =>
                                setData("keterangan", e.target.value)
                            }
                        ></textarea>
                    </div>

                    <div>
                        <label>Dokumentasi (max 2)</label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={(e) => setData("foto", e.target.files)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-red-600 text-white px-6 py-2 rounded"
                    >
                        Simpan
                    </button>
                </form>

                <div className="bg-white p-6 rounded shadow mt-10 overflow-x-auto">
                    <h2 className="text-xl font-semibold mb-4 text-red-700">
                        Riwayat Kenakalan
                    </h2>
                    <table className="w-full text-sm text-left">
                        <thead className="bg-red-100">
                            <tr>
                                <th className="border px-3 py-2">Siswa</th>
                                <th className="border px-3 py-2">Tanggal</th>
                                <th className="border px-3 py-2">Jenis</th>
                                <th className="border px-3 py-2">Keterangan</th>
                                <th className="border px-3 py-2">Foto</th>
                                <th className="border px-3 py-2">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="border px-3 py-2">
                                        {item.student?.name}
                                    </td>
                                    <td className="border px-3 py-2">
                                        {item.tanggal}
                                    </td>
                                    <td className="border px-3 py-2">
                                        {item.jenis}
                                    </td>
                                    <td className="border px-3 py-2">
                                        {item.keterangan || "-"}
                                    </td>
                                    <td className="border px-3 py-2">
                                        <div className="flex gap-2">
                                            {(item.foto || []).map((f, i) => (
                                                <img
                                                    key={i}
                                                    src={`/storage/${f}`}
                                                    className="w-14 h-14 rounded object-cover border cursor-pointer hover:scale-150 transition-transform"
                                                    onClick={() => {
                                                        setModalImageList(
                                                            item.foto
                                                        );
                                                        setModalImageIndex(i);
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </td>
                                    <td className="border px-3 py-2">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() =>
                                                    setEditItem({
                                                        ...item,
                                                        foto: [],
                                                    })
                                                }
                                                className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setShowDeleteId(item.id)
                                                }
                                                className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Hapus
                                            </button>
                                            <a
                                                href={`/kenakalan/${item.id}/export`}
                                                target="_blank"
                                                className="bg-green-600 text-white px-2 py-1 rounded text-xs ml-1"
                                            >
                                                Export
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />

            {modalImageList.length > 0 && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                    <img
                        src={`/storage/${modalImageList[modalImageIndex]}`}
                        className="max-h-[80vh] rounded shadow-lg"
                    />
                    <button
                        onClick={() => setModalImageList([])}
                        className="absolute top-5 right-8 text-white text-4xl"
                    >
                        &times;
                    </button>
                    {modalImageList.length > 1 && (
                        <>
                            <button
                                onClick={() =>
                                    setModalImageIndex((prev) =>
                                        prev === 0
                                            ? modalImageList.length - 1
                                            : prev - 1
                                    )
                                }
                                className="absolute left-5 top-1/2 -translate-y-1/2 text-white text-4xl"
                            >
                                &#10094;
                            </button>
                            <button
                                onClick={() =>
                                    setModalImageIndex((prev) =>
                                        prev === modalImageList.length - 1
                                            ? 0
                                            : prev + 1
                                    )
                                }
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-white text-4xl"
                            >
                                &#10095;
                            </button>
                        </>
                    )}
                </div>
            )}

            {editItem && (
                <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
                    <div className="bg-white rounded p-6 shadow-lg w-full max-w-xl relative">
                        <button
                            onClick={() => setEditItem(null)}
                            className="absolute top-2 right-4 text-gray-500 text-2xl"
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold mb-4 text-yellow-600">
                            Edit Kenakalan
                        </h2>
                        <form
                            onSubmit={submitEdit}
                            encType="multipart/form-data"
                            className="space-y-4"
                        >
                            <select
                                className="w-full border p-2 rounded"
                                value={editItem.student_id}
                                onChange={(e) =>
                                    setEditItem({
                                        ...editItem,
                                        student_id: e.target.value,
                                    })
                                }
                            >
                                <option value="">Pilih Siswa</option>
                                {students.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.name}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="date"
                                className="w-full border p-2 rounded"
                                value={editItem.tanggal}
                                onChange={(e) =>
                                    setEditItem({
                                        ...editItem,
                                        tanggal: e.target.value,
                                    })
                                }
                            />
                            <input
                                type="text"
                                className="w-full border p-2 rounded"
                                value={editItem.jenis}
                                onChange={(e) =>
                                    setEditItem({
                                        ...editItem,
                                        jenis: e.target.value,
                                    })
                                }
                            />
                            <textarea
                                className="w-full border p-2 rounded"
                                rows="3"
                                value={editItem.keterangan}
                                onChange={(e) =>
                                    setEditItem({
                                        ...editItem,
                                        keterangan: e.target.value,
                                    })
                                }
                            ></textarea>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) =>
                                    setEditItem({
                                        ...editItem,
                                        foto: e.target.files,
                                    })
                                }
                            />
                            <div className="text-right">
                                <button
                                    type="submit"
                                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showDeleteId && (
                <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
                    <div className="bg-white rounded p-6 shadow-lg w-full max-w-md text-center relative">
                        <button
                            onClick={() => setShowDeleteId(null)}
                            className="absolute top-2 right-4 text-gray-500 text-2xl"
                        >
                            &times;
                        </button>
                        <h2 className="text-lg font-bold text-red-600 mb-4">
                            Konfirmasi Hapus
                        </h2>
                        <p className="text-gray-700 mb-6">
                            Apakah Anda yakin ingin menghapus data ini?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={confirmDelete}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                            >
                                Ya, Hapus
                            </button>
                            <button
                                onClick={() => setShowDeleteId(null)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
