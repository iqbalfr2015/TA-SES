"use client";

import React, { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import Navbar from "@/Components/Lembaga/Navbar";
import Swal from "sweetalert2";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function TambahPeserta() {
    const { props } = usePage();
    const user = props.auth.user;

    const [formData, setFormData] = useState({
        name: "",
        materi: "",
        skala_nilai: 100,
        kkm: 75,
        acak_soal: false,
        acak_jawaban: false,
        petunjuk_pengerjaan: "",
        soal_ids: [],
        user_id: user.id,
        lembaga_id: user.lembaga?.id || null,
    });

    const editor = useEditor({
        extensions: [StarterKit],
        content: formData.petunjuk_pengerjaan,
        onUpdate: ({ editor }) => {
            setFormData((prev) => ({
                ...prev,
                petunjuk_pengerjaan: editor.getHTML(),
            }));
        },
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.lembaga_id) {
            Swal.fire({
                title: "Gagal!",
                text: "Lembaga tidak ditemukan! Pastikan user memiliki lembaga.",
                icon: "error",
                confirmButtonText: "OK",
            });
            return;
        }

        router.post(route("paketsoal.store"), formData, {
            onSuccess: () => {
                Swal.fire({
                    title: "Berhasil!",
                    text: "Paket soal berhasil ditambahkan.",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => router.visit("/lembaga/paketsoal"));
            },
            onError: (errors) => {
                Swal.fire({
                    title: "Gagal!",
                    text: "Terjadi kesalahan saat menambahkan paket soal.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
                console.error(errors);
            },
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="max-w-3xl m-auto pt-20">
                <div className="bg-white rounded-xl shadow-xl">
                    <div className="px-6 p-3">
                        <h1 className="text-2xl font-bold text-blue-900">TAMBAH PAKET SOAL</h1>
                    </div>
                    <form onSubmit={handleSubmit} className="px-6 p-3 border-y">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Nama Paket Soal */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Nama Paket Soal</label>
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="mt-1 p-2 border rounded w-full" required />
                            </div>

                            {/* Materi */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Materi</label>
                                <input type="text" name="materi" value={formData.materi} onChange={handleInputChange} className="mt-1 p-2 border rounded w-full" required />
                            </div>

                            {/* KKM */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">KKM</label>
                                <input type="number" name="kkm" value={formData.kkm} onChange={handleInputChange} className="mt-1 p-2 border rounded w-full" min="1" max={formData.skala_nilai} required />
                            </div>

                            {/* Acak Soal & Acak Jawaban (Sejajar) */}
                            <div className="flex items-center space-x-6">
                                <div className="flex items-center">
                                    <input type="checkbox" name="acak_soal" checked={formData.acak_soal} onChange={handleInputChange} className="mr-2" />
                                    <label className="text-sm font-medium text-gray-700">Acak Soal</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="checkbox" name="acak_jawaban" checked={formData.acak_jawaban} onChange={handleInputChange} className="mr-2" />
                                    <label className="text-sm font-medium text-gray-700">Acak Jawaban</label>
                                </div>
                            </div>
                        </div>

                        {/* Petunjuk Pengerjaan (Tiptap) */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Petunjuk Pengerjaan</label>
                            <div className="border rounded p-2 mt-1 min-h-[100px]">
                                <EditorContent editor={editor} />
                            </div>
                        </div>

                        {/* Tombol Aksi */}
                        <div className="flex justify-between gap-2">
                            <Link href="/lembaga/paketsoal" className="flex items-center px-4 py-2 gap-2 bg-gray-500 hover:bg-gray-700 text-white rounded">Kembali</Link>
                            <button type="submit" className="flex items-center px-4 py-2 gap-2 bg-green-500 hover:bg-green-700 text-white rounded">Tambah Paket</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
