"use client";

import Navbar from "@/Components/Lembaga/Navbar";
import { usePage } from "@inertiajs/react";
import React from "react";
import Swal from "sweetalert2";

const Peserta = () => {
    const { sesiUjianspeserta, error } = usePage().props;

    const hitungBatasAkhir = (waktu_mulai, waktu_pengerjaan) => {
        if (!waktu_mulai || !waktu_pengerjaan) return "-";

        const [jam, menit] = waktu_mulai.split(":").map(Number);

        let date = new Date();
        date.setHours(jam);
        date.setMinutes(menit);

        date.setMinutes(date.getMinutes() + waktu_pengerjaan);

        const batasJam = String(date.getHours()).padStart(2, "0");
        const batasMenit = String(date.getMinutes()).padStart(2, "0");

        return `${batasJam}:${batasMenit}`;
    };

    const handleStartExam = (ujian) => {
        const { waktu_mulai, tanggal_pelaksanaan } = ujian;

        // Menggabungkan tanggal dan waktu mulai untuk membuat objek Date
        const startDateTime = new Date(`${tanggal_pelaksanaan}T${waktu_mulai}:00`);

        // Mendapatkan waktu saat ini
        const now = new Date();

        if (now < startDateTime) {
            // Jika waktu saat ini sebelum waktu mulai ujian
            Swal.fire({
                title: "Ujian Belum Dimulai",
                text: `Ujian akan dimulai pada ${tanggal_pelaksanaan} pukul ${waktu_mulai}`,
                icon: "info",
                confirmButtonText: "OK",
            });
        } else {
            // Jika waktu sudah melewati waktu mulai, arahkan ke halaman ujian
            window.location.href = `/peserta/detail/${ujian.id}`;
        }
    };

    return (
        <>
            <Navbar />
            <div className="bg-gray-100 mt-16">
                <main className="p-8">
                    {error && (
                        <div className="bg-red-100 text-red-800 p-4 rounded mb-6">
                            <p>{error}</p>
                        </div>
                    )}

                    <div className="bg-blue-100 text-blue-800 p-4 rounded mb-6">
                        <p>Informasi</p>
                        <p>
                            Berikut ini ditampilkan daftar sesi ujian untuk Anda, diurutkan berdasarkan waktu.
                        </p>
                    </div>

                    <h2 className="p-3 text-center border-b border-gray-400 text-2xl font-semibold my-4">
                        Ujian yang akan datang
                    </h2>

                    {sesiUjianspeserta.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {sesiUjianspeserta.map((ujian) => (
                                <div key={ujian.id} className="border p-4 rounded shadow-sm bg-white">
                                    <h3 className="font-semibold">
                                        {ujian.nama_sesi_ujian || "Ujian Tanpa Nama"}
                                    </h3>
                                    <p className="text-blue-600 font-medium">
                                        {ujian.paket_soal && ujian.paket_soal.name ? ujian.paket_soal.name : "Mata Pelajaran Tidak Diketahui"}
                                    </p>
                                    <p>Mulai: {ujian.waktu_mulai}</p>
                                    <p>Sifat: {ujian.mode_peserta || "Tidak Diketahui"}</p>
                                    <p>Durasi: {ujian.waktu_pengerjaan || 0} menit</p>
                                    <p>Batas: {hitungBatasAkhir(ujian.waktu_mulai, ujian.waktu_pengerjaan)}</p>
                                    <div className="mt-4 flex items-center">
                                        <button 
                                            onClick={() => handleStartExam(ujian)} 
                                            className="bg-blue-500 text-white px-3 py-1 rounded"
                                        >
                                            Mulai
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-600">
                            Tidak ada ujian yang tersedia.
                        </p>
                    )}

                    <h2 className="p-3 text-center border-b border-gray-400 text-2xl font-semibold my-4">
                        Histori Ujian
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="border p-4 rounded shadow-sm bg-white">
                            <h3 className="font-semibold">Uji Kompetensi #1</h3>
                            <p className="text-blue-600 font-medium">
                                Bahasa Indonesia
                            </p>
                            <p>Mulai: Senin, 02 Agt 2021 17:45:00</p>
                            <p>Sifat: Serentak</p>
                            <p>Durasi: 120 menit</p>
                            <p>Batas: Senin, 02 Agt 2021 19:45:00</p>
                            <div className="mt-4 flex items-center">
                                <span className="text-4xl font-bold mr-2">80</span>
                                <button className="bg-green-500 text-white px-3 py-1 rounded">
                                    Hasil
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Peserta;