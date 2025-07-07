import React, { useRef, useState } from "react";
import { useForm } from "@inertiajs/react";
import Navbar from "../Components/Navbar";

export default function Student({ students = [] }) {
    // Form tambah siswa
    const { data, setData, post, processing, errors, reset } = useForm({
        photo: "",
        name: "",
        birth_place: "",
        birth_date: "",
        gender: "",
        address: "",
        school_origin: "",
        phone: "",
        parent_name: "",
        living_with: "",
        achievement: "",
    });

    // Form edit siswa (WAJIB pakai setData satu-satu!)
    const [showEdit, setShowEdit] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const editForm = useForm({
        id: "",
        photo: "",
        name: "",
        birth_place: "",
        birth_date: "",
        gender: "",
        address: "",
        school_origin: "",
        phone: "",
        parent_name: "",
        living_with: "",
        achievement: "",
    });

    const fileInput = useRef();
    const editFileInput = useRef();

    // Submit tambah siswa
    const submit = (e) => {
        e.preventDefault();
        post("/students", {
            forceFormData: true,
            onSuccess: () => {
                reset();
                if (fileInput.current) fileInput.current.value = "";
            },
        });
    };

    // Handle edit: isi data satu-satu
    const handleEdit = (student) => {
        setSelectedStudent(student);
        editForm.setData("id", student.id);
        editForm.setData("photo", "");
        editForm.setData("name", student.name);
        editForm.setData("birth_place", student.birth_place);
        editForm.setData("birth_date", student.birth_date);
        editForm.setData("gender", student.gender);
        editForm.setData("address", student.address);
        editForm.setData("school_origin", student.school_origin);
        editForm.setData("phone", student.phone);
        editForm.setData("parent_name", student.parent_name);
        editForm.setData("living_with", student.living_with);
        editForm.setData("achievement", student.achievement || "");
        setShowEdit(true);
    };

    const submitEdit = (e) => {
        e.preventDefault();
        if (!editForm.data.photo || typeof editForm.data.photo !== "object") {
            editForm.setData("photo", undefined);
        }
        editForm.setData("_method", "PUT");
        editForm.post(`/students/${editForm.data.id}`, {
            forceFormData: true,
            onSuccess: () => {
                setShowEdit(false);
                if (editFileInput.current) editFileInput.current.value = "";
                window.location.reload();
            },
        });
    };

    // Hapus siswa
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    const handleDelete = (studentId) => {
        setConfirmDeleteId(studentId);
    };

    const confirmDelete = () => {
        if (confirmDeleteId) {
            window.axios
                .post(`/students/${confirmDeleteId}`, { _method: "delete" })
                .then(() => {
                    setConfirmDeleteId(null);
                    window.location.reload();
                });
        }
    };

    const cancelDelete = () => {
        setConfirmDeleteId(null);
    };

    const inputClass =
        "mt-1 block w-full rounded border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50";

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="text-center mt-10 mb-8">
                <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight">
                    Bimbingan Konseling
                </h1>
                <p className="text-gray-600 mt-2">
                    Dashboard Input dan Manajemen Data Siswa
                </p>
            </div>

            <div className="p-4 max-w-4xl mx-auto">
                {/* --- Form Tambah Siswa --- */}
                <div className="bg-white rounded-xl shadow p-6 mb-10">
                    <h2 className="text-xl font-bold mb-4 text-blue-800">
                        Input Data Siswa
                    </h2>
                    <form
                        onSubmit={submit}
                        encType="multipart/form-data"
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        <div>
                            <label className="block font-semibold">
                                Foto Profil
                            </label>
                            <input
                                type="file"
                                className={inputClass}
                                ref={fileInput}
                                onChange={(e) =>
                                    setData("photo", e.target.files[0])
                                }
                            />
                            {errors.photo && (
                                <div className="text-red-500 text-xs">
                                    {errors.photo}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block font-semibold">
                                Nama Siswa
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />
                            {errors.name && (
                                <div className="text-red-500 text-xs">
                                    {errors.name}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block font-semibold">
                                Tempat Lahir
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                value={data.birth_place}
                                onChange={(e) =>
                                    setData("birth_place", e.target.value)
                                }
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">
                                Tanggal Lahir
                            </label>
                            <input
                                type="date"
                                className={inputClass}
                                value={data.birth_date}
                                onChange={(e) =>
                                    setData("birth_date", e.target.value)
                                }
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">
                                Jenis Kelamin
                            </label>
                            <select
                                className={inputClass}
                                value={data.gender}
                                onChange={(e) =>
                                    setData("gender", e.target.value)
                                }
                                required
                            >
                                <option value="">Pilih</option>
                                <option value="L">Laki-laki</option>
                                <option value="P">Perempuan</option>
                            </select>
                        </div>
                        <div>
                            <label className="block font-semibold">
                                Alamat
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                value={data.address}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">
                                Asal Sekolah
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                value={data.school_origin}
                                onChange={(e) =>
                                    setData("school_origin", e.target.value)
                                }
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">No HP</label>
                            <input
                                type="text"
                                className={inputClass}
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">
                                Nama Orang Tua
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                value={data.parent_name}
                                onChange={(e) =>
                                    setData("parent_name", e.target.value)
                                }
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">
                                Tinggal dengan Siapa
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                value={data.living_with}
                                onChange={(e) =>
                                    setData("living_with", e.target.value)
                                }
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">
                                Prestasi
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                value={data.achievement}
                                onChange={(e) =>
                                    setData("achievement", e.target.value)
                                }
                            />
                        </div>
                        <div className="col-span-full text-right mt-4">
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl transition-all"
                                disabled={processing}
                            >
                                Simpan Data
                            </button>
                        </div>
                    </form>
                </div>

                {/* --- Tabel Siswa --- */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-lg font-bold mb-4 text-blue-800">
                        Daftar Siswa
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="bg-blue-50">
                                    <th className="p-2 border">No</th>
                                    <th className="p-2 border">Foto</th>
                                    <th className="p-2 border">Nama</th>
                                    <th className="p-2 border">TTL</th>
                                    <th className="p-2 border">JK</th>
                                    <th className="p-2 border">Asal Sekolah</th>
                                    <th className="p-2 border">Ortu</th>
                                    <th className="p-2 border">No HP</th>
                                    <th className="p-2 border">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student, i) => (
                                    <tr
                                        key={student.id}
                                        className="hover:bg-blue-50"
                                    >
                                        <td className="p-2 border text-center">
                                            {i + 1}
                                        </td>
                                        <td className="p-2 border text-center">
                                            {student.photo ? (
                                                <img
                                                    src={`/storage/${student.photo}`}
                                                    alt="Foto"
                                                    className="w-12 h-12 object-cover rounded-full border"
                                                />
                                            ) : (
                                                <span>-</span>
                                            )}
                                        </td>
                                        <td className="p-2 border">
                                            {student.name}
                                        </td>
                                        <td className="p-2 border">
                                            {student.birth_place},{" "}
                                            {student.birth_date}
                                        </td>
                                        <td className="p-2 border">
                                            {student.gender}
                                        </td>
                                        <td className="p-2 border">
                                            {student.school_origin}
                                        </td>
                                        <td className="p-2 border">
                                            {student.parent_name}
                                        </td>
                                        <td className="p-2 border">
                                            {student.phone}
                                        </td>
                                        <td className="p-2 border">
                                            <button
                                                className="bg-yellow-400 text-white px-2 py-1 rounded mr-2"
                                                onClick={() =>
                                                    handleEdit(student)
                                                }
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="bg-red-600 text-white px-2 py-1 rounded"
                                                onClick={() =>
                                                    handleDelete(student.id)
                                                }
                                            >
                                                Hapus
                                            </button>
                                            <a
                                                href={`/students/${student.id}/export`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-green-600 text-white px-2 py-1 rounded"
                                            >
                                                Export PDF
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                                {students.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={9}
                                            className="text-center text-gray-400 py-6"
                                        >
                                            Belum ada data siswa.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- Modal Edit Siswa --- */}
                {showEdit && (
                    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg shadow p-6 w-full max-w-lg relative">
                            <button
                                className="absolute top-2 right-3 text-gray-500 text-xl"
                                onClick={() => setShowEdit(false)}
                            >
                                &times;
                            </button>
                            <h3 className="text-xl font-bold mb-4 text-blue-800">
                                Edit Data Siswa
                            </h3>
                            <form
                                onSubmit={submitEdit}
                                encType="multipart/form-data"
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                            >
                                <div>
                                    <label className="block font-semibold">
                                        Foto Profil (Biarkan kosong jika tidak
                                        ganti)
                                    </label>
                                    <input
                                        type="file"
                                        className={inputClass}
                                        ref={editFileInput}
                                        onChange={(e) =>
                                            editForm.setData(
                                                "photo",
                                                e.target.files[0] || ""
                                            )
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold">
                                        Nama Siswa
                                    </label>
                                    <input
                                        type="text"
                                        className={inputClass}
                                        value={editForm.data.name}
                                        onChange={(e) =>
                                            editForm.setData(
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold">
                                        Tempat Lahir
                                    </label>
                                    <input
                                        type="text"
                                        className={inputClass}
                                        value={editForm.data.birth_place}
                                        onChange={(e) =>
                                            editForm.setData(
                                                "birth_place",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold">
                                        Tanggal Lahir
                                    </label>
                                    <input
                                        type="date"
                                        className={inputClass}
                                        value={editForm.data.birth_date}
                                        onChange={(e) =>
                                            editForm.setData(
                                                "birth_date",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold">
                                        Jenis Kelamin
                                    </label>
                                    <select
                                        className={inputClass}
                                        value={editForm.data.gender}
                                        onChange={(e) =>
                                            editForm.setData(
                                                "gender",
                                                e.target.value
                                            )
                                        }
                                        required
                                    >
                                        <option value="">Pilih</option>
                                        <option value="L">Laki-laki</option>
                                        <option value="P">Perempuan</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block font-semibold">
                                        Alamat
                                    </label>
                                    <input
                                        type="text"
                                        className={inputClass}
                                        value={editForm.data.address}
                                        onChange={(e) =>
                                            editForm.setData(
                                                "address",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold">
                                        Asal Sekolah
                                    </label>
                                    <input
                                        type="text"
                                        className={inputClass}
                                        value={editForm.data.school_origin}
                                        onChange={(e) =>
                                            editForm.setData(
                                                "school_origin",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold">
                                        No HP
                                    </label>
                                    <input
                                        type="text"
                                        className={inputClass}
                                        value={editForm.data.phone}
                                        onChange={(e) =>
                                            editForm.setData(
                                                "phone",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold">
                                        Nama Orang Tua
                                    </label>
                                    <input
                                        type="text"
                                        className={inputClass}
                                        value={editForm.data.parent_name}
                                        onChange={(e) =>
                                            editForm.setData(
                                                "parent_name",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold">
                                        Tinggal dengan Siapa
                                    </label>
                                    <input
                                        type="text"
                                        className={inputClass}
                                        value={editForm.data.living_with}
                                        onChange={(e) =>
                                            editForm.setData(
                                                "living_with",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold">
                                        Prestasi
                                    </label>
                                    <input
                                        type="text"
                                        className={inputClass}
                                        value={editForm.data.achievement}
                                        onChange={(e) =>
                                            editForm.setData(
                                                "achievement",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="col-span-full text-right mt-4">
                                    <button
                                        type="submit"
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-xl transition-all"
                                    >
                                        Update Data
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            {confirmDeleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Konfirmasi Hapus
                        </h3>
                        <p className="mb-6">
                            Yakin ingin menghapus data siswa ini?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
