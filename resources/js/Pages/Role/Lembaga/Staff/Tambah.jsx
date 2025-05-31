import React, { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import Navbar from "@/Components/Lembaga/Navbar";
import { FaBook, FaCalendarAlt, FaUsers, FaCheckCircle } from "react-icons/fa";
import { GiCctvCamera } from "react-icons/gi";

export default function TambahStaf() {
    const { props } = usePage();
    const [formData, setFormData] = useState({
        nama_staff: "",
        email: "",
        kewenangans: [],
    });

    const allKewenangans = ['peserta', 'paket_soal', 'sesi', 'pengawas'];
    
    const icons = {
        peserta: <FaUsers />, 
        paket_soal: <FaBook />, 
        sesi: <FaCalendarAlt />, 
        pengawas: <GiCctvCamera />,
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handlePermissionChange = (role) => {
        setFormData((prevData) => {
            const isSelected = prevData.kewenangans.includes(role);
            return {
                ...prevData,
                kewenangans: isSelected
                    ? prevData.kewenangans.filter((r) => r !== role)
                    : [...prevData.kewenangans, role],
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Kirim hanya array string dari kewenangans yang dipilih
        const payload = {
            nama_staff: formData.nama_staff,
            email: formData.email,
            kewenangans: formData.kewenangans, // Hanya array string
        };
    
        router.post(route("staff.store"), payload, {
            onSuccess: () => {
                Swal.fire({
                    title: "Berhasil!",
                    text: "Staff berhasil ditambahkan.",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => router.visit("/lembaga/staff"));
            },
            onError: (errors) => {
                Swal.fire({
                    title: "Gagal!",
                    text: errors?.message || "Terjadi kesalahan saat menambahkan staff.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            },
        });
    };
    

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="max-w-3xl mx-auto pt-20">
                <div className="bg-white rounded-lg shadow-md border">
                    <form onSubmit={handleSubmit}>
                        <h1 className="text-2xl font-bold px-6 py-3 text-blue-900">TAMBAH STAFF</h1>
                        <div className="border-y p-6">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Nama Staf</label>
                                <input
                                    type="text"
                                    name="nama_staff"
                                    value={formData.nama_staff}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 border rounded w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 border rounded w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Kewenangan</label>
                                <div className="flex gap-2 mt-2">
                                    {allKewenangans.map((role) => {
                                        const isSelected = formData.kewenangans.includes(role);
                                        return (
                                            <button
                                                key={role}
                                                type="button"
                                                onClick={() => handlePermissionChange(role)}
                                                className={`relative px-3 py-1 rounded w-12 h-12 flex items-center justify-center ${
                                                    isSelected ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"
                                                }`}
                                            >
                                                {icons[role]}
                                                {isSelected && (
                                                    <FaCheckCircle className="h-4 w-4 absolute -bottom-0.5 -right-0.5 text-blue-500 bg-white rounded-full transform translate-x-1/4 translate-y-1/4" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between gap-2 px-6 py-3">
                            <Link
                                href="/data-staf"
                                className="flex items-center px-4 py-2 gap-2 bg-gray-500 hover:bg-gray-700 text-white rounded"
                            >
                                Kembali
                            </Link>
                            <button
                                type="submit"
                                className="flex items-center px-4 py-2 gap-2 bg-green-500 hover:bg-green-700 text-white rounded"
                            >
                                Tambah
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
