import { Link, usePage } from "@inertiajs/react";
import {
    FaHome,
    FaChalkboardTeacher,
    FaUsers,
    FaBook,
    FaFileAlt,
    FaMoneyBillAlt,
    FaCalendarAlt,
} from "react-icons/fa";
import { GiCctvCamera } from "react-icons/gi";

export default function Sidebar({ isSidebarOpen, toggleSidebar }) {
    const { url } = usePage();

    // Fungsi untuk mengecek apakah menu aktif
    const isActive = (href) => url === href;

    return (
        <div
            className={`fixed top-0 left-0 z-20 h-screen bg-white shadow transition-all duration-300 ${
                isSidebarOpen ? "w-56" : "w-16"
            } mt-16`}
        >
            {/* Tombol Toggle Sidebar */}
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
                <SidebarItem
                    href="/lembaga"
                    icon={<FaHome className="w-6 h-6" />}
                    label="Dashboard"
                    isActive={isActive("/lembaga")}
                    isSidebarOpen={isSidebarOpen}
                />
                <SidebarItem
                    href={route("staff.index")}
                    icon={<FaChalkboardTeacher className="w-6 h-6" />}
                    label="Staff"
                    isActive={isActive("/lembaga/staff")}
                    isSidebarOpen={isSidebarOpen}
                />
                <SidebarItem
                    href="/lembaga/peserta"
                    icon={<FaUsers className="w-6 h-6" />}
                    label="Peserta"
                    isActive={isActive("/lembaga/peserta")}
                    isSidebarOpen={isSidebarOpen}
                />
                <SidebarItem
                    href="/lembaga/paketsoal"
                    icon={<FaBook className="w-6 h-6" />}
                    label="Paket Soal"
                    isActive={isActive("/lembaga/paketsoal")}
                    isSidebarOpen={isSidebarOpen}
                />
                <SidebarItem
                    href="/lembaga/sesi"
                    icon={<FaCalendarAlt className="w-6 h-6" />}
                    label="Sesi"
                    isActive={isActive("/lembaga/sesi")}
                    isSidebarOpen={isSidebarOpen}
                />
                <SidebarItem
                    href="/lembaga/pengawas"
                    icon={<GiCctvCamera className="w-6 h-6" />}
                    label="Pengawas"
                    isActive={isActive("/lembaga/pengawas")}
                    isSidebarOpen={isSidebarOpen}
                />
                <SidebarItem
                    href="/lembaga/laporan"
                    icon={<FaFileAlt className="w-6 h-6" />}
                    label="Laporan"
                    isActive={isActive("/lembaga/laporan")}
                    isSidebarOpen={isSidebarOpen}
                />
                <SidebarItem
                    href="/lembaga/belipoin"
                    icon={<FaMoneyBillAlt className="w-6 h-6" />}
                    label="Beli Poin"
                    isActive={isActive("/lembaga/belipoin")}
                    isSidebarOpen={isSidebarOpen}
                />
            </nav>
        </div>
    );
}

// Komponen Sidebar Item untuk menghindari kode yang berulang
function SidebarItem({ href, icon, label, isActive, isSidebarOpen }) {
    return (
        <Link
            href={href}
            className={`flex items-center px-4 py-2 rounded-2xl transition-all ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`}
        >
            {icon}
            {isSidebarOpen && <span className="ml-2">{label}</span>}
        </Link>
    );
}
