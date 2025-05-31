import Navbar from "@/Components/Lembaga/Navbar";
import Sidebar from "@/Components/Lembaga/Sidebar";
import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function Page() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [customPoin, setCustomPoin] = useState("");

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const paketPoin = [
        { nama: "Amarilis", poin: 100, harga: 112500 },
        { nama: "Bouvardia", poin: 250, harga: 262500 },
        { nama: "Cranberry", poin: 500, harga: 487500 },
        { nama: "Daffodil", poin: 750, harga: 675000 },
        { nama: "Euphorbia", poin: 1000, harga: 825000 },
    ];

    const handlePilihPaket = (paket) => {
        Swal.fire({
            title: "Pembelian Paket Poin",
            html: `
                <p>Anda akan membeli paket poin <b>${paket.nama}</b>.</p>
                <p>Poin yang didapatkan: <b>${paket.poin}</b></p>
                <p>Harga Paket: <b>Rp. ${paket.harga.toLocaleString()}</b></p>
            `,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Checkout",
            cancelButtonText: "Batalkan",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Berhasil!", "Paket poin telah dipilih.", "success");
            }
        });
    };

    return (
        <div className="relative flex h-screen">
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
            />

            <div
                className={`flex-1 flex flex-col ${
                    isSidebarOpen ? "ml-56" : "ml-16"
                } transition-all duration-300`}
            >
                <Navbar toggleSidebar={toggleSidebar} />
                <main className="pt-20 p-6 bg-color-accent min-h-screen h-full bg-gray-200">
                    <div className="bg-white rounded-2xl">
                        <div className="border-b p-3 px-6">
                            <h1 className="text-2xl text-blue-900 font-bold">
                                BELI POIN
                            </h1>
                        </div>
                        <div className="px-6 p-3">
                            <h1 className="text-xl font-bold">
                                Pilih Paket Poin *
                            </h1>
                        </div>
                        <div className="grid grid-cols-3 gap-4 p-4 px-6">
                            {paketPoin.map((paket, index) => (
                                <div
                                    key={index}
                                    className="border rounded-lg p-4 text-center shadow-sm"
                                >
                                    <h2 className="text-lg font-semibold">
                                        {paket.nama}
                                    </h2>
                                    <p className="text-2xl font-bold mt-2">
                                        {paket.poin}{" "}
                                        <span className="text-sm">POIN</span>
                                    </p>
                                    <p className="text-lg font-semibold text-gray-600">
                                        Rp. {paket.harga.toLocaleString()}
                                    </p>
                                    <button
                                        onClick={() => handlePilihPaket(paket)}
                                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
                                    >
                                        Pilih
                                    </button>
                                </div>
                            ))}
                            <div className="border rounded-lg p-4 text-center shadow-sm">
                                <h2 className="text-lg font-semibold">
                                    Paket Custom
                                </h2>
                                <input
                                    type="number"
                                    value={customPoin}
                                    onChange={(e) =>
                                        setCustomPoin(e.target.value)
                                    }
                                    className="w-full p-2 border rounded mt-2 text-center"
                                    placeholder="Masukkan poin yang Anda butuhkan..."
                                />
                                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800">
                                    Pilih
                                </button>
                            </div>
                        </div>
                        <p className="mt-4 text-sm text-gray-500">
                            * Harga dapat berubah sewaktu-waktu
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
}
