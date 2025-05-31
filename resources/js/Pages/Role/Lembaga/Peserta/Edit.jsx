import React, { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import Navbar from "@/Components/Lembaga/Navbar";

export default function EditPeserta() {
    const { peserta } = usePage().props;

    const [formData, setFormData] = useState({
        nama_peserta: peserta.nama_peserta,
        email: peserta.email,
        no_peserta: peserta.no_peserta,
        kelompok: peserta.kelompok,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Pastikan data yang diubah sudah benar.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Lanjutkan!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                router.put(`/lembaga/peserta/${peserta.id}`, formData, {
                    onSuccess: () => {
                        Swal.fire(
                            "Berhasil!",
                            "Data peserta berhasil diperbarui.",
                            "success"
                        );
                        router.visit("/lembaga/peserta");
                    },
                });
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="max-w-3xl m-auto pt-20">
                <div className="bg-white rounded-lg shadow-md">
                    <div className="p-3 px-6">
                        <h1 className="text-2xl font-bold text-blue-900">
                            EDIT PESERTA
                        </h1>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="border-y p-3 px-6 grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Nama Peserta
                            </label>
                            <input
                                type="text"
                                name="nama_peserta"
                                value={formData.nama_peserta}
                                onChange={handleInputChange}
                                className="mt-1 p-2 border rounded w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                No Peserta
                            </label>
                            <input
                                type="text"
                                name="no_peserta"
                                value={formData.no_peserta}
                                className="mt-1 p-2 border rounded w-full bg-gray-200 cursor-not-allowed"
                                disabled
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                className="mt-1 p-2 border rounded w-full bg-gray-200 cursor-not-allowed"
                                disabled
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Kelompok
                            </label>
                            <input
                                type="text"
                                name="kelompok"
                                value={formData.kelompok}
                                onChange={handleInputChange}
                                className="mt-1 p-2 border rounded w-full"
                                required
                            />
                        </div>
                        <div className="col-span-2 flex justify-between gap-2 p-3 px-6">
                            <Link
                                href="/lembaga/peserta"
                                className="flex items-center px-4 py-2 gap-2 bg-gray-500 hover:bg-gray-700 text-white rounded"
                            >
                                Kembali
                            </Link>
                            <button
                                type="submit"
                                className="flex items-center px-4 py-2 gap-2 bg-green-500 hover:bg-green-700 text-white rounded"
                            >
                                Simpan Perubahan
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
