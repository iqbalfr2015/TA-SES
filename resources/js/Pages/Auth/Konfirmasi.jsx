import Navbar from "@/Components/Layout/NavbarAuth";
import React from "react";

const Konfirmasi = () => {
    return (
        <>
            {" "}
            <div className="min-h-screen bg-1 flex flex-col items-center justify-center">
                {/* Header */}
                <Navbar />
                {/* Main Content */}
                <main className="container mx-auto px-4">
                    <div className="bg-white border shadow-lg rounded-lg p-6 max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4 border-b">
                            KONFIRMASI TUJUAN
                        </h2>
                        <div className="mb-6">
                            <div className="bg-blue-100 text-blue-700 p-2 rounded-lg mb-4">
                                <h1 className="text-xl font-semibold">
                                    Lembaga
                                </h1>
                                <p>
                                    Jika Anda dari lembaga/panitia ujian yang
                                    ingin mendaftar dan menyelenggarakan ujian
                                    menggunakan platform ini, maka silakan pilih{" "}
                                    <b>Saya dari lembaga</b> dan ikuti
                                    langkah-langkahnya.
                                </p>
                            </div>
                            <div className="bg-yellow-100 text-yellow-700 p-2 rounded-lg">
                                <h1 className="text-xl font-semibold">
                                    Peserta Ujian
                                </h1>
                                <p>
                                    Anda peserta ujian? Silakan login
                                    menggunakan akun (username dan password)
                                    yang diberikan oleh panitia ujian di lembaga
                                    Anda. <b>Jangan</b> melakukan pendaftaran
                                    lembaga secara mandiri.
                                </p>
                            </div>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-medium mb-4">
                                Siapakah Anda?
                            </h3>
                            <div className="flex justify-center space-x-4">
                                <a
                                    href="/register"
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700"
                                >
                                    Saya dari lembaga
                                </a>
                                <a
                                    href="/login"
                                    className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-600"
                                >
                                    Saya peserta ujian
                                </a>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Konfirmasi;
