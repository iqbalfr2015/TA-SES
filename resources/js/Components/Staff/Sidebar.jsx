import { Link, usePage } from "@inertiajs/react"; // Impor usePage
import {
    FaHome,
    FaUsers,
    FaBook, // Ikon untuk Soal
    FaFileAlt, // Ikon untuk Laporan
    FaCalendarAlt, // Ikon untuk Pembayaran
} from "react-icons/fa"; // Contoh ikon dari react-icons
import { GiCctvCamera } from "react-icons/gi";

export default function Sidebar({ isSidebarOpen, toggleSidebar }) {
    const { url } = usePage(); // Ambil URL saat ini

    // Fungsi untuk memeriksa apakah menu aktif
    const isActive = (href) => {
        if (href === "/staff") {
            // Hanya aktif jika URL persis "/staff"
            return url === href;
        } else {
            // Aktif jika URL dimulai dengan href dan bukan subpath lainnya
            return url.startsWith(href) && url !== "/staff";
        }
    };

    return (
        <div
            className={`${
                isSidebarOpen ? "w-56" : "w-16"
            } bg-white shadow h-screen fixed top-0 left-0 z-20 transition-all duration-300 mt-16`}
        >
            {/* Tombol Toggle di Pojok Kanan Atas */}
            <div className="flex justify-end p-2">
                <button
                    onClick={toggleSidebar}
                    className="text-gray-600 focus:outline-none hover:bg-gray-200 rounded-full p-1"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        ></path>
                    </svg>
                </button>
            </div>

            {/* Menu Sidebar */}
            <nav className={`mt-4 space-y-2 ${isSidebarOpen ? "p-4" : "p-1"}`}>
                <Link
                    href="/staff"
                    className={`flex items-center px-4 py-2 hover:bg-gray-200 rounded-2xl ${
                        isActive("/staff") ? "bg-blue-500 text-white" : ""
                    }`}
                >
                    <FaHome className="w-6 h-6" />
                    {isSidebarOpen && <span className="ml-2">Dashboard</span>}
                </Link>
                <Link
                    href="/staff/peserta"
                    className={`flex items-center px-4 py-2 hover:bg-gray-200 rounded-2xl ${
                        isActive("/staff/peserta")
                            ? "bg-blue-500 text-white"
                            : ""
                    }`}
                >
                    <FaUsers className="w-6 h-6" />
                    {isSidebarOpen && <span className="ml-2">Peserta</span>}
                </Link>
                {/* Menu Soal */}
                <Link
                    href="/staff/paketsoal"
                    className={`flex items-center px-4 py-2 hover:bg-gray-200 rounded-2xl ${
                        isActive("/staff/paketsoal")
                            ? "bg-blue-500 text-white"
                            : ""
                    }`}
                >
                    <FaBook className="w-6 h-6" />
                    {isSidebarOpen && <span className="ml-2">Paket Soal</span>}
                </Link>
                {/* SESI */}
                <Link
                    href="/staff/sesi"
                    className={`flex items-center px-4 py-2 hover:bg-gray-200 rounded-2xl ${
                        isActive("/staff/sesi")
                            ? "bg-blue-500 text-white"
                            : ""
                    }`}
                >
                    <FaCalendarAlt className="w-6 h-6" />
                    {isSidebarOpen && <span className="ml-2">Sesi</span>}
                </Link>
                {/* Pengawas */}
                <Link
                    href="/staff/pengawas"
                    className={`flex items-center px-4 py-2 hover:bg-gray-200 rounded-2xl ${
                        isActive("/staff/pengawas")
                            ? "bg-blue-500 text-white"
                            : ""
                    }`}
                >
                    <GiCctvCamera className="w-6 h-6" />
                    {isSidebarOpen && <span className="ml-2">pengawas</span>}
                </Link>
                {/* Menu Laporan */}
                <Link
                    href="/staff/laporan"
                    className={`flex items-center px-4 py-2 hover:bg-gray-200 rounded-2xl ${
                        isActive("/staff/laporan")
                            ? "bg-blue-500 text-white"
                            : ""
                    }`}
                >
                    <FaFileAlt className="w-6 h-6" />
                    {isSidebarOpen && <span className="ml-2">Laporan</span>}
                </Link>
            </nav>
        </div>
    );
}
