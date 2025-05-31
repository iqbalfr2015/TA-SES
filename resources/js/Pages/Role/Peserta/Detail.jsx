import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import Navbar from "@/Components/Lembaga/Navbar";

const Detail = () => {
    const { ujian } = usePage().props;

    // Konversi waktu pengerjaan dari menit ke detik
    const initialTimeLeft = ujian.waktu_pengerjaan * 60;
    const [timeLeft, setTimeLeft] = useState(initialTimeLeft);

    useEffect(() => {
        if (timeLeft <= 0) return; // Jika waktu habis, hentikan timer

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    useEffect(() => {
        // Menampilkan SweetAlert dengan petunjuk_pengerjaan
        Swal.fire({
            title: "Petunjuk Pengerjaan",
            html: ujian.petunjuk_pengerjaan,
            icon: "info",
            confirmButtonText: "Mengerti",
        });
    }, []);
    

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor(time % 60);
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 p-4 pt-28">
                <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-center text-lg font-semibold text-gray-700">
                        IKATAN MOTOR INDONESIA
                    </h2>
                    <h1 className="text-center text-2xl font-bold mt-2 text-gray-900">
                        {ujian.nama_sesi_ujian}
                    </h1>
                    <p className="text-center text-sm text-gray-500 mt-1">
                        {ujian.mode_peserta} 
                    </p>

                    <div className="mt-4 text-center">
                        <p className="text-gray-600">
                            Waktu Pengerjaan: {" "}
                            <span className="font-medium">{ujian.waktu_pengerjaan} menit</span>
                        </p>
                        <p className="text-gray-600">
                            Jumlah Soal: {" "}
                            <span className="font-medium">{ujian.jumlah_soal} butir</span>
                        </p>
                    </div>

                    <p className="mt-6 text-center text-red-600 font-medium">
                        Sisa waktu tes:
                    </p>

                    <div className="text-center mt-4">
                        <p className="text-2xl font-bold text-gray-800">
                            {formatTime(timeLeft)}
                        </p>
                    </div>

                    <div className="mt-6 text-center space-x-2">
                        <a
                            href="/peserta"
                            className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg shadow hover:bg-red-600"
                        >
                            Kembali
                        </a>
                        <a
                            href={`/peserta/ujian/${ujian.id}`}
                            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600"
                        >
                            Kerjakan
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Detail;
