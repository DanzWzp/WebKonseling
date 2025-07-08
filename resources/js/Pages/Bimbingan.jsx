import React, { useRef } from "react";
import Navbar from "../Components/Navbar";
import Footer from "@/Components/Footer";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function Bimbingan({ students = [], bimbinganList = [] }) {
    const fileInputRef = useRef();

    const { data, setData, post, reset, processing, errors } = useForm({
        student_id: "",
        tanggal: "",
        bolos: 0,
        terlambat_kelas: 0,
        terlambat_sekolah: 0,
        alpa: 0,
        mapel_ringkasan: "",
        keterangan: "",
        foto_bimbingan: [],
    });

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key === "foto_bimbingan") {
                for (let i = 0; i < value.length; i++) {
                    formData.append("foto_bimbingan[]", value[i]);
                }
            } else {
                formData.append(key, value);
            }
        });

        post("/bimbingan", {
            data: formData,
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    const [showEditModal, setShowEditModal] = useState(false);
    const [editData, setEditData] = useState(null);

    const [showImageModal, setShowImageModal] = useState(false);
    const [imagePreviewUrl, setImagePreviewUrl] = useState("");

    const [imageList, setImageList] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const handleEdit = (item) => {
        setEditData({
            id: item.id,
            student_id: item.student_id,
            tanggal: item.date,
            bolos: item.bolos,
            terlambat_kelas: item.terlambat_kelas,
            terlambat_sekolah: item.terlambat_sekolah,
            alpa: item.alpa,
            mapel_ringkasan: item.mapel_ringkasan,
            keterangan: item.keterangan,
            foto_bimbingan: [],
        });
        setShowEditModal(true);
    };

    const submitEdit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(editData).forEach(([key, value]) => {
            if (key === "foto_bimbingan") {
                for (let i = 0; i < value.length; i++) {
                    formData.append("foto_bimbingan[]", value[i]);
                }
            } else {
                formData.append(key, value);
            }
        });

        router.post(`/bimbingan/${editData.id}`, formData);
        setShowEditModal(false);
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-5xl mx-auto px-4 py-10">
                <div className="text-center mt-10 mb-8">
                    <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight">
                        Bimbingan Konseling
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Dashboard Input dan Manajemen Data Bimbingan
                    </p>
                </div>

                {/* Form Tambah Bimbingan */}
                <div className="bg-white p-6 rounded shadow mb-10">
                    <h2 className="text-xl font-semibold mb-4">
                        Tambah Bimbingan
                    </h2>
                    <form onSubmit={submit} encType="multipart/form-data">
                        {/* Nama & Tanggal */}
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block font-medium">
                                    Nama Siswa
                                </label>
                                <select
                                    className="w-full border rounded p-2 mt-1"
                                    value={data.student_id}
                                    onChange={(e) =>
                                        setData("student_id", e.target.value)
                                    }
                                >
                                    <option value="">Pilih Siswa</option>
                                    {students.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium">
                                    Tanggal Bimbingan
                                </label>
                                <input
                                    type="date"
                                    className="w-full border rounded p-2 mt-1"
                                    value={data.tanggal}
                                    onChange={(e) =>
                                        setData("tanggal", e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        {/* Input Kasus */}
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block">
                                    Siswa Bolos (hari)
                                </label>
                                <input
                                    type="number"
                                    className="w-full border rounded p-2"
                                    min="0"
                                    value={data.bolos}
                                    onChange={(e) =>
                                        setData("bolos", e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label className="block">
                                    Terlambat Masuk Kelas
                                </label>
                                <input
                                    type="number"
                                    className="w-full border rounded p-2"
                                    min="0"
                                    value={data.terlambat_kelas}
                                    onChange={(e) =>
                                        setData(
                                            "terlambat_kelas",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div>
                                <label className="block">
                                    Terlambat Datang ke Sekolah
                                </label>
                                <input
                                    type="number"
                                    className="w-full border rounded p-2"
                                    min="0"
                                    value={data.terlambat_sekolah}
                                    onChange={(e) =>
                                        setData(
                                            "terlambat_sekolah",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div>
                                <label className="block">Alpa (hari)</label>
                                <input
                                    type="number"
                                    className="w-full border rounded p-2"
                                    min="0"
                                    value={data.alpa}
                                    onChange={(e) =>
                                        setData("alpa", e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        {/* Upload Foto */}
                        <div className="mb-4">
                            <label className="block font-medium">
                                Dokumentasi Bimbingan (Max 3 Foto)
                            </label>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="w-full border rounded p-2"
                                accept="image/*"
                                multiple
                                onChange={(e) =>
                                    setData("foto_bimbingan", e.target.files)
                                }
                            />
                        </div>

                        {/* Mapel Belum Tuntas */}
                        <div className="mb-4">
                            <label className="block font-medium mb-1">
                                Mapel Belum Tuntas
                            </label>
                            <input
                                type="text"
                                className="w-full border rounded p-2"
                                placeholder="Contoh: Matematika: Tuntas, Fisika: Belum Tuntas"
                                value={data.mapel_ringkasan}
                                onChange={(e) =>
                                    setData("mapel_ringkasan", e.target.value)
                                }
                            />
                        </div>

                        {/* Keterangan */}
                        <div className="mb-6">
                            <label className="block font-medium">
                                Keterangan Tambahan
                            </label>
                            <textarea
                                className="w-full border rounded p-2"
                                rows="4"
                                placeholder="Tuliskan keterangan tambahan jika ada..."
                                value={data.keterangan}
                                onChange={(e) =>
                                    setData("keterangan", e.target.value)
                                }
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                            disabled={processing}
                        >
                            Simpan Bimbingan
                        </button>
                    </form>
                </div>

                {/* Riwayat Bimbingan */}
                <div className="bg-white p-6 rounded shadow w-full overflow-x-auto">
                    <h2 className="text-xl font-bold mb-4 text-blue-700">
                        Riwayat Bimbingan
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border text-left">
                            <thead>
                                <tr className="bg-blue-50">
                                    <th className="p-2 border">No</th>
                                    <th className="p-2 border">Siswa</th>
                                    <th className="p-2 border">Tanggal</th>
                                    <th className="p-2 border">Bolos</th>
                                    <th className="p-2 border">Alpa</th>
                                    <th className="p-2 border">Terlambat</th>
                                    <th className="p-2 border">Mapel</th>
                                    <th className="p-2 border">Dokumentasi</th>
                                    <th className="p-2 border text-center">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {bimbinganList.length > 0 ? (
                                    bimbinganList.map((item, i) => (
                                        <React.Fragment key={item.id}>
                                            {/* Baris utama */}
                                            <tr className="hover:bg-gray-50">
                                                <td className="p-2 border text-center">
                                                    {i + 1}
                                                </td>
                                                <td className="p-2 border">
                                                    {item.student_name}
                                                </td>
                                                <td className="p-2 border">
                                                    {item.date}
                                                </td>
                                                <td className="p-2 border text-center">
                                                    {item.bolos}
                                                </td>
                                                <td className="p-2 border text-center">
                                                    {item.alpa}
                                                </td>
                                                <td className="p-2 border text-center">
                                                    {item.terlambat_kelas +
                                                        item.terlambat_sekolah}
                                                </td>
                                                <td className="p-2 border">
                                                    {item.mapel_ringkasan}
                                                </td>
                                                <td className="p-2 border text-center">
                                                    <div className="flex flex-col items-center gap-2">
                                                        {item.photos &&
                                                        item.photos.length >
                                                            0 ? (
                                                            item.photos
                                                                .slice(0, 3)
                                                                .map(
                                                                    (
                                                                        photo,
                                                                        index
                                                                    ) => (
                                                                        <img
                                                                            key={
                                                                                index
                                                                            }
                                                                            src={`/storage/${photo}`}
                                                                            alt={`Foto ${
                                                                                index +
                                                                                1
                                                                            }`}
                                                                            className="w-14 h-14 object-cover rounded border cursor-pointer hover:scale-150 transition-transform duration-200"
                                                                            onClick={() => {
                                                                                setImageList(
                                                                                    item.photos
                                                                                );
                                                                                setCurrentImageIndex(
                                                                                    index
                                                                                );
                                                                                setShowImageModal(
                                                                                    true
                                                                                );
                                                                            }}
                                                                        />
                                                                    )
                                                                )
                                                        ) : (
                                                            <span className="text-gray-400 text-sm">
                                                                –
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="p-2 border text-center">
                                                    <div className="flex gap-1 justify-center">
                                                        <button
                                                            onClick={() =>
                                                                handleEdit(item)
                                                            }
                                                            className="px-2 py-1 bg-yellow-500 text-white rounded text-xs"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    item.id
                                                                )
                                                            }
                                                            className="px-2 py-1 bg-red-600 text-white rounded text-xs"
                                                        >
                                                            Hapus
                                                        </button>
                                                        <a
                                                            href={`/bimbingan/${item.id}/export`}
                                                            target="_blank"
                                                            className="px-2 py-1 bg-green-600 text-white rounded text-xs"
                                                        >
                                                            Export
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>

                                            {/* Baris keterangan */}
                                            <tr className="bg-gray-50 text-sm text-gray-700">
                                                <td
                                                    colSpan="9"
                                                    className="p-3 whitespace-pre-line text-justify leading-relaxed"
                                                >
                                                    <strong>Keterangan:</strong>{" "}
                                                    {item.keterangan || (
                                                        <span className="text-gray-400">
                                                            Tidak ada
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="9"
                                            className="text-center text-gray-500 py-4"
                                        >
                                            Belum ada data bimbingan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div>
                {showEditModal && editData && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl relative">
                            <button
                                className="absolute top-2 right-3 text-gray-600 text-xl"
                                onClick={() => setShowEditModal(false)}
                            >
                                &times;
                            </button>
                            <h2 className="text-xl font-bold mb-4 text-blue-700">
                                Edit Bimbingan
                            </h2>
                            <form
                                onSubmit={submitEdit}
                                encType="multipart/form-data"
                                className="space-y-4"
                            >
                                <div>
                                    <label>Nama Siswa</label>
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
                                        <option value="">Pilih Siswa</option>
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
                                        value={editData.tanggal}
                                        onChange={(e) =>
                                            setEditData({
                                                ...editData,
                                                tanggal: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="number"
                                        placeholder="Bolos"
                                        className="border p-2 rounded"
                                        value={editData.bolos}
                                        onChange={(e) =>
                                            setEditData({
                                                ...editData,
                                                bolos: e.target.value,
                                            })
                                        }
                                    />
                                    <input
                                        type="number"
                                        placeholder="Terlambat Kelas"
                                        className="border p-2 rounded"
                                        value={editData.terlambat_kelas}
                                        onChange={(e) =>
                                            setEditData({
                                                ...editData,
                                                terlambat_kelas: e.target.value,
                                            })
                                        }
                                    />
                                    <input
                                        type="number"
                                        placeholder="Terlambat Sekolah"
                                        className="border p-2 rounded"
                                        value={editData.terlambat_sekolah}
                                        onChange={(e) =>
                                            setEditData({
                                                ...editData,
                                                terlambat_sekolah:
                                                    e.target.value,
                                            })
                                        }
                                    />
                                    <input
                                        type="number"
                                        placeholder="Alpa"
                                        className="border p-2 rounded"
                                        value={editData.alpa}
                                        onChange={(e) =>
                                            setEditData({
                                                ...editData,
                                                alpa: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Mapel Ringkasan"
                                    className="w-full border rounded p-2"
                                    value={editData.mapel_ringkasan}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            mapel_ringkasan: e.target.value,
                                        })
                                    }
                                />
                                <textarea
                                    className="w-full border rounded p-2"
                                    rows={6}
                                    placeholder="Masukkan keterangan tambahan..."
                                    value={editData.keterangan}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            keterangan: e.target.value,
                                        })
                                    }
                                />

                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            foto_bimbingan: e.target.files,
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
            </div>
            <div>
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

                            {/* Navigasi */}
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
            </div>
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center relative">
                        <button
                            onClick={() => setShowDeleteModal(false)}
                            className="absolute top-2 right-3 text-gray-500 text-xl"
                        >
                            &times;
                        </button>
                        <h2 className="text-lg font-bold text-red-600 mb-4">
                            Konfirmasi Hapus
                        </h2>
                        <p className="text-gray-700 mb-6">
                            Apakah kamu yakin ingin menghapus data bimbingan
                            ini?
                            <br />
                            Tindakan ini tidak dapat dibatalkan.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => {
                                    router.delete(`/bimbingan/${deleteId}`);
                                    setShowDeleteModal(false);
                                }}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                            >
                                Ya, Hapus
                            </button>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}
