import React, { useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { IoIosNotifications } from "react-icons/io";
import Sidebar from "@/Components/Staff/Sidebar";
import Navbar from "@/Components/Staff/Navbar";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
// Registrasi chart.js komponen
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Page = () => {
    const chartRef = useRef(null);

    const getGradient = (ctx, chartArea) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
        gradient.addColorStop(0, "rgba(54, 162, 235, 0.1)"); // Light blue at the top
        gradient.addColorStop(1, "rgba(54, 162, 235, 1)"); // Dark blue at the bottom
        return gradient;
    };

    const data = {
        labels: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ],
        datasets: [
            {
                label: "Jumlah Pengunjung",
                data: [100, 150, 200, 250, 300, 350, 100, 50, 150, 300, 400, 450],
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 2,
                fill: true,
                pointBackgroundColor: "rgba(54, 162, 235, 1)",
                pointBorderColor: "#fff",
                pointRadius: 5,
                pointHoverRadius: 7,
                tension: 0.4, // Membuat garis lebih halus
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 100,
                },
            },
        },
    };

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="relative flex bg-gray-200">
            {/* Sidebar */}
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
            />

            {/* Content Wrapper */}
            <div
                className={`flex-1 flex flex-col ${
                    isSidebarOpen ? "ml-56" : "ml-16"
                } transition-all duration-300`}
            >
                {/* Navbar */}
                <Navbar toggleSidebar={toggleSidebar} /> {/* Header */}
                <main className="pt-20 p-6 bg-color-accent h-full bg-gray-200 grid grid-cols-1 gap-6">
                    {/* Header Section */}
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                Welcome!
                            </h1>
                            <p className="text-gray-600">
                                Lihat dan kontrol statistik laporan
                            </p>
                        </div>
                        <div className="flex">
                            {/* Icon Notifikasi (Lonceng) */}
                            <button className="flex items-center justify-center w-10 h-10">
                                <IoIosNotifications size={32} />
                            </button>
                        </div>
                    </div>

                    {/* Kartu Statistik */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white shadow-md rounded-lg p-4 border-t-4 border-l-4 border-blue-600 hover:shadow-lg transition duration-200">
                            <div className="flex items-end">
                                <p className="text-2xl text-blue-600 font-bold w-8 text-end">
                                    12
                                </p>
                                <h2 className="text-lg font-semibold text-gray-800 ml-2">
                                    Lembaga
                                </h2>
                            </div>
                            <div className="flex items-end">
                                <p className="text-gray-600 w-8 text-end">5</p>
                                <p className="text-gray-600 ml-2">Staff</p>
                            </div>
                        </div>

                        <div className="bg-white shadow-md rounded-lg p-4 border-t-4 border-l-4 border-blue-600 hover:shadow-lg transition duration-200">
                            <div className="flex items-end">
                                <p className="text-2xl text-blue-600 font-bold w-8 text-end">
                                    20
                                </p>
                                <h2 className="text-lg font-semibold text-gray-800 ml-2">
                                    Sesi Ujian
                                </h2>
                            </div>
                            <div className="flex items-end">
                                <p className="text-gray-600 w-8 text-end">
                                    900
                                </p>
                                <p className="text-gray-600 ml-2">Peserta</p>
                            </div>
                        </div>

                        <div className="bg-white shadow-md rounded-lg p-4 border-t-4 border-l-4 border-blue-600 hover:shadow-lg transition duration-200">
                            <div className="flex items-end">
                                <p className="text-2xl text-blue-600 font-bold w-8 text-end">
                                    12
                                </p>
                                <h2 className="text-lg font-semibold text-gray-800 ml-2">
                                    Transaksi
                                </h2>
                            </div>
                            <div className="flex items-end">
                                <p className="text-gray-600 w-8 text-end">
                                    500
                                </p>
                                <p className="text-gray-600 ml-2">
                                    Poin Terjual
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Wrapper untuk Grafik dan Histori */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* Grafik */}
                        <div className="col-span-2 p-6 bg-white shadow-md rounded-lg border-t-4 border-l-4 border-blue-600 hover:shadow-lg transition duration-200">
                            <h1 className="text-lg font-semibold text-center text-gray-800 mb-4">
                                Jumlah Pengunjung Setiap Bulan
                            </h1>
                            <div className="flex justify-center h-[300px]">
                                <Line
                                    data={data}
                                    options={options}
                                    ref={chartRef}
                                    style={{ width: "100%" }}
                                />
                            </div>
                        </div>

                        {/* Histori */}
                        <div className="bg-white shadow-md rounded-lg p-6 border-t-4 border-l-4 border-blue-600 hover:shadow-lg transition duration-200">
                            <h3 className="text-lg font-bold mb-4 border-b-2">
                                Histori
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between p-4 bg-gray-100 rounded-lg shadow-md">
                                    <div>
                                        <p className="font-semibold text-sm">
                                            shafath.m@students.uns.ac.id
                                        </p>
                                        <p className="text-sm">
                                            Nama Ruangan: Ruang Guru
                                        </p>
                                        <p className="text-sm">
                                            Tanggal: 13/05/22 | 08.00-12.00
                                        </p>
                                    </div>
                                    <span className="text-yellow-500 font-semibold">
                                        Digunakan
                                    </span>
                                </div>
                                <div className="flex justify-between p-4 bg-gray-100 rounded-lg shadow-md">
                                    <div>
                                        <p className="font-semibold text-sm">
                                            shafath.m@students.uns.ac.id
                                        </p>
                                        <p className="text-sm">
                                            Nama Ruangan: Ruang Guru
                                        </p>
                                        <p className="text-sm">
                                            Tanggal: 13/05/22 | 08.00-12.00
                                        </p>
                                    </div>
                                    <span className="text-red-500 font-semibold">
                                        Dibatalkan
                                    </span>
                                </div>
                                <div className="flex justify-between p-4 bg-gray-100 rounded-lg shadow-md">
                                    <div>
                                        <p className="font-semibold text-sm">
                                            shafath.m@students.uns.ac.id
                                        </p>
                                        <p className="text-sm">
                                            Nama Ruangan: Ruang Guru
                                        </p>
                                        <p className="text-sm">
                                            Tanggal: 13/05/22 | 08.00-12.00
                                        </p>
                                    </div>
                                    <span className="text-green-500 font-semibold">
                                        Selesai
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Page;
