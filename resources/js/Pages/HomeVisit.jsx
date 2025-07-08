import React, { useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useForm, router } from "@inertiajs/react";

export default function HomeVisit({ students = [], homeVisits = [] }) {
    const fileInputRef = useRef();
    const { data, setData, post, processing, reset } = useForm({
        student_id: "",
        jumlah_visit: 1,
        permasalahan: "",
        hasil: "",
        foto: [],
    });

    const [editData, setEditData] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

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
        post("/home-visit", {
            data: formData,
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(editData).forEach(([key, value]) => {
            if (key === "foto") {
                for (let i = 0; i < value.length; i++) {
                    formData.append("foto[]", value[i]);
                }
            } else {
                formData.append(key, value);
            }
        });
        router.post(`/home-visit/${editData.id}`, formData);
        setShowEditModal(false);
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const [showImageModal, setShowImageModal] = useState(false);
    const [imageList, setImageList] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
                    Form Home Visit
                </h1>

                <form
                    onSubmit={submit}
                    className="bg-white p-6 rounded shadow space-y-6"
                    encType="multipart/form-data"
                >
                    <div>
                        <label className="block font-semibold">
                            Nama Siswa
                        </label>
                        <select
                            className="w-full border rounded p-2 mt-1"
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
                        <label className="block font-semibold">
                            Jumlah Home Visit
                        </label>
                        <input
                            type="number"
                            min="1"
                            className="w-full border rounded p-2 mt-1"
                            value={data.jumlah_visit}
                            onChange={(e) =>
                                setData("jumlah_visit", e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">
                            Permasalahan
                        </label>
                        <textarea
                            className="w-full border rounded p-2 mt-1"
                            rows="3"
                            value={data.permasalahan}
                            onChange={(e) =>
                                setData("permasalahan", e.target.value)
                            }
                        ></textarea>
                    </div>
                    <div>
                        <label className="block font-semibold">
                            Hasil Kunjungan
                        </label>
                        <textarea
                            className="w-full border rounded p-2 mt-1"
                            rows="4"
                            value={data.hasil}
                            onChange={(e) => setData("hasil", e.target.value)}
                        ></textarea>
                    </div>
                    <div>
                        <label className="block font-semibold">
                            Foto Dokumentasi (max 2)
                        </label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            ref={fileInputRef}
                            className="w-full border rounded p-2 mt-1"
                            onChange={(e) => setData("foto", e.target.files)}
                        />
                    </div>
                    <div className="text-right">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                        >
                            Simpan Home Visit
                        </button>
                    </div>
                </form>

                <div className="bg-white mt-12 p-6 rounded shadow">
                    <h2 className="text-xl font-bold mb-4 text-blue-600">
                        Riwayat Home Visit
                    </h2>
                    <table className="w-full text-sm border text-left">
                        <thead>
                            <tr className="bg-blue-50">
                                <th className="p-2 border">No</th>
                                <th className="p-2 border">Siswa</th>
                                <th className="p-2 border">Jumlah</th>
                                <th className="p-2 border">Permasalahan</th>
                                <th className="p-2 border">Hasil</th>
                                <th className="p-2 border">Foto</th>
                                <th className="p-2 border text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {homeVisits.map((item, i) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="p-2 border text-center">
                                        {i + 1}
                                    </td>
                                    <td className="p-2 border">
                                        {item.student.name}
                                    </td>
                                    <td className="p-2 border text-center">
                                        {item.jumlah_visit}
                                    </td>
                                    <td className="p-2 border">
                                        {item.permasalahan}
                                    </td>
                                    <td className="p-2 border">{item.hasil}</td>
                                    <td className="p-2 border text-center">
                                        <div className="flex gap-2 justify-center">
                                            {item.foto &&
                                            item.foto.length > 0 ? (
                                                item.foto.map((foto, idx) => (
                                                    <img
                                                        key={idx}
                                                        src={`/storage/${foto}`}
                                                        alt={`Foto ${idx + 1}`}
                                                        className="w-16 h-16 object-cover rounded border cursor-pointer transition-transform duration-200 hover:scale-150"
                                                        onClick={() => {
                                                            setImageList(
                                                                item.foto
                                                            );
                                                            setCurrentImageIndex(
                                                                idx
                                                            );
                                                            setShowImageModal(
                                                                true
                                                            );
                                                        }}
                                                    />
                                                ))
                                            ) : (
                                                <span className="text-gray-400 text-sm">
                                                    -
                                                </span>
                                            )}
                                        </div>
                                    </td>

                                    <td className="p-2 border text-center">
                                        <button
                                            onClick={() => {
                                                setEditData({
                                                    id: item.id,
                                                    student_id: item.student_id,
                                                    jumlah_visit:
                                                        item.jumlah_visit,
                                                    permasalahan:
                                                        item.permasalahan,
                                                    hasil: item.hasil,
                                                    foto: [],
                                                });
                                                setShowEditModal(true);
                                            }}
                                            className="bg-yellow-500 text-white px-2 py-1 rounded text-xs mr-1"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(item.id)
                                            }
                                            className="bg-red-600 text-white px-2 py-1 rounded text-xs"
                                        >
                                            Hapus
                                        </button>
                                        <a
                                            href={`/home-visit/${item.id}/export`}
                                            target="_blank"
                                            className="px-2 py-1 bg-green-600 text-white rounded text-xs"
                                        >
                                            Export
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Edit */}
            {showEditModal && editData && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow w-full max-w-lg relative">
                        <button
                            onClick={() => setShowEditModal(false)}
                            className="absolute top-2 right-3 text-xl"
                        >
                            &times;
                        </button>
                        <h3 className="text-lg font-bold mb-4 text-blue-700">
                            Edit Home Visit
                        </h3>
                        <form
                            onSubmit={handleEditSubmit}
                            encType="multipart/form-data"
                            className="space-y-4"
                        >
                            <select
                                className="w-full border rounded p-2"
                                value={editData.student_id}
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        student_id: e.target.value,
                                    })
                                }
                            >
                                <option value="">Pilih siswa</option>
                                {students.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.name}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                className="w-full border rounded p-2"
                                value={editData.jumlah_visit}
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        jumlah_visit: e.target.value,
                                    })
                                }
                            />
                            <textarea
                                className="w-full border rounded p-2"
                                rows="3"
                                value={editData.permasalahan}
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        permasalahan: e.target.value,
                                    })
                                }
                            ></textarea>
                            <textarea
                                className="w-full border rounded p-2"
                                rows="4"
                                value={editData.hasil}
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        hasil: e.target.value,
                                    })
                                }
                            ></textarea>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        foto: e.target.files,
                                    })
                                }
                            />
                            <div className="text-right">
                                <button
                                    type="submit"
                                    className="bg-yellow-600 text-white px-4 py-2 rounded"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Hapus */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow w-full max-w-md text-center relative">
                        <button
                            onClick={() => setShowDeleteModal(false)}
                            className="absolute top-2 right-3 text-gray-600 text-xl"
                        >
                            &times;
                        </button>
                        <h2 className="text-lg font-bold text-red-600 mb-4">
                            Konfirmasi Hapus
                        </h2>
                        <p className="text-gray-700 mb-6">
                            Yakin ingin menghapus data Home Visit ini?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => {
                                    router.delete(`/home-visit/${deleteId}`);
                                    setShowDeleteModal(false);
                                }}
                                className="bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Ya, Hapus
                            </button>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showImageModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
                    <div className="relative max-w-3xl w-full px-6">
                        <img
                            src={`/storage/${imageList[currentImageIndex]}`}
                            alt="Preview"
                            className="max-h-[80vh] mx-auto rounded shadow-lg"
                        />
                        <button
                            className="absolute top-2 right-4 text-white text-3xl"
                            onClick={() => setShowImageModal(false)}
                        >
                            &times;
                        </button>

                        {/* Navigasi jika lebih dari 1 */}
                        {imageList.length > 1 && (
                            <>
                                <button
                                    onClick={() =>
                                        setCurrentImageIndex((prev) =>
                                            prev === 0
                                                ? imageList.length - 1
                                                : prev - 1
                                        )
                                    }
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl"
                                >
                                    ‹
                                </button>
                                <button
                                    onClick={() =>
                                        setCurrentImageIndex((prev) =>
                                            prev === imageList.length - 1
                                                ? 0
                                                : prev + 1
                                        )
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl"
                                >
                                    ›
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
