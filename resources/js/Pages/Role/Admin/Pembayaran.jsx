import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Pagination from "@/Components/Layout/Pagination";
import Navbar from "@/Components/Admin/Navbar";
import Sidebar from "@/Components/Admin/Sidebar";
import React, { useState } from "react";
import { FaEdit, FaFilter } from "react-icons/fa";

export default function Page() {
    const [filter, setFilter] = useState("");
    const [entries, setEntries] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [Pembayarans, setPembayarans] = useState([
        {
            id: 1,
            name: "SDN 2 SURAKARTA",
            poin: "100",
            harga: "50.000",
            status: "Proses",
        },
        {
            id: 2,
            name: "SDN 3 SURAKARTA",
            poin: "90",
            harga: "45.000",
            status: "Proses",
        },
        {
            id: 3,
            name: "SDN 4 SURAKARTA",
            poin: "80",
            harga: "40.000",
            status: "Gagal",
        },
        {
            id: 4,
            name: "SDN 5 SURAKARTA",
            poin: "70",
            harga: "35.000",
            status: "Berhasil",
        },
        {
            id: 5,
            name: "SDN 6 SURAKARTA",
            poin: "60",
            harga: "30.000",
            status: "Berhasil",
        },
        {
            id: 6,
            name: "SDN 7 SURAKARTA",
            poin: "50",
            harga: "25.000",
            status: "Gagal",
        },
        {
            id: 7,
            name: "SDN 8 SURAKARTA",
            poin: "40",
            harga: "20.000",
            status: "Berhasil",
        },
        {
            id: 8,
            name: "SDN 9 SURAKARTA",
            poin: "30",
            harga: "15.000",
            status: "Gagal",
        },
    ]);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1); // Reset ke halaman pertama saat filter berharga
    };

    const handleEntriesChange = (e) => {
        setEntries(parseInt(e.target.value));
        setCurrentPage(1); // Reset ke halaman pertama saat status entri berharga
    };

    const filtered = Pembayarans.filter((pembayaran) => {
        const lowerCaseFilter = filter.toLowerCase();
        return (
            pembayaran.name.toLowerCase().includes(lowerCaseFilter) ||
            pembayaran.poin.toLowerCase().includes(lowerCaseFilter) ||
            pembayaran.harga.toLowerCase().includes(lowerCaseFilter) ||
            pembayaran.status.toLowerCase().includes(lowerCaseFilter)
        );
    });

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const totalPages = Math.ceil(filtered.length / entries);
    const startIndex = (currentPage - 1) * entries;
    const paginatedPembayarans = filtered.slice(
        startIndex,
        startIndex + entries
    );

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="relative flex">
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
                <Navbar toggleSidebar={toggleSidebar} />{" "}
                <main className="pt-20 p-6 bg-color-accent min-h-screen h-full bg-gray-200">
                    <div className="bg-white rounded-2xl">
                        <div className="flex justify-between items-center p-3 px-6 border-y">
                            <h1 className="text-2xl font-bold text-blue-900">
                                TABEL PEMBAYARAN
                            </h1>
                        </div>
                        <div className="flex justify-between items-center p-3 px-6">
                            <div>
                                <label className="flex items-center gap-2">
                                    Show
                                    <select
                                        className="p-1 border rounded w-12"
                                        value={entries}
                                        onChange={handleEntriesChange}
                                    >
                                        {[5, 10, 15].map((num) => (
                                            <option key={num} value={num}>
                                                {num}
                                            </option>
                                        ))}
                                    </select>
                                    entries
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    placeholder="Filter..."
                                    value={filter}
                                    onChange={handleFilterChange}
                                    className="h-8 border rounded"
                                />
                                <button className="ml-2 p-2 bg-blue-500 text-white rounded">
                                    <FaFilter />
                                </button>
                            </div>
                        </div>
                        <div className="px-6 pb-3">
                            <table className="w-full border rounded">
                                <thead>
                                    <tr className="bg-blue-500 text-white">
                                        <th className="p-2 border">ID</th>
                                        <th className="p-2 border">Lembaga</th>
                                        <th className="p-2 border">Poin</th>
                                        <th className="p-2 border">Harga</th>
                                        <th className="p-2 border">Status</th>
                                        <th className="p-2 border">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedPembayarans.map(
                                        (pembayaran, index) => (
                                            <tr
                                                key={pembayaran.id}
                                                className="hover:bg-gray-100 text-center"
                                            >
                                                <td className="p-2 border">
                                                    {index + 1}
                                                </td>
                                                <td className="p-2 border">
                                                    {pembayaran.name}
                                                </td>
                                                <td className="p-2 border">
                                                    {pembayaran.poin}
                                                </td>
                                                <td className="p-2 border">
                                                    {pembayaran.harga}
                                                </td>
                                                <td className="py-2 border">
                                                    <span
                                                        className={`p-2 px-4 rounded-2xl font-semibold ${
                                                            pembayaran.status ===
                                                            "Proses"
                                                                ? "bg-yellow-400 text-yellow-700"
                                                                : pembayaran.status ===
                                                                  "Gagal"
                                                                ? "bg-red-400 text-red-700"
                                                                : pembayaran.status ===
                                                                  "Berhasil"
                                                                ? "bg-green-400 text-green-700"
                                                                : ""
                                                        }`}
                                                    >
                                                        {pembayaran.status}
                                                    </span>
                                                </td>

                                                <td className="p-2 border">
                                                    <div className="flex justify-center gap-x-4">
                                                        <a
                                                            href="/admin/pembayaran/edit"
                                                            className="text-blue-500"
                                                            data-tooltip-id="edit-tooltip"
                                                            data-tooltip-content="Edit"
                                                        >
                                                            <FaEdit />
                                                        </a>
                                                    </div>

                                                    {/* Tooltip Components */}
                                                    <Tooltip id="edit-tooltip" />
                                                    <Tooltip id="delete-tooltip" />
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>{" "}
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                handlePageChange={handlePageChange}
                                startIndex={startIndex}
                                entries={entries}
                                filtered={filtered}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
