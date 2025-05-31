import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Pagination from "@/Components/Layout/Pagination";
import Navbar from "@/Components/Admin/Navbar";
import Sidebar from "@/Components/Admin/Sidebar";
import React, { useState } from "react";
import { FaEdit, FaFilter, FaTrashAlt } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";

export default function Page() {
    const [filter, setFilter] = useState("");
    const [entries, setEntries] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [PaketSoals, setPaketSoals] = useState([
        {
            id: 1,
            name: "Iqbal",
            jabatan: "Backend UNS",
            foto: "iqbal.png",
            bintang: "5",
        },
        {
            id: 2,
            name: "Siti",
            jabatan: "Frontend UGM",
            foto: "siti.png",
            bintang: "4",
        },
        {
            id: 3,
            name: "Budi",
            jabatan: "Database ITB",
            foto: "budi.png",
            bintang: "5",
        },
        {
            id: 4,
            name: "Rina",
            jabatan: "Mobile UI/UX UI",
            foto: "rina.png",
            bintang: "4",
        },
        {
            id: 5,
            name: "Andi",
            jabatan: "DevOps UPN",
            foto: "andi.png",
            bintang: "5",
        },
        {
            id: 6,
            name: "Dina",
            jabatan: "Networking UMS",
            foto: "dina.png",
            bintang: "3",
        },
        {
            id: 7,
            name: "Farhan",
            jabatan: "Security UB",
            foto: "farhan.png",
            bintang: "5",
        },
        {
            id: 8,
            name: "Tina",
            jabatan: "Cloud Computing UI",
            foto: "tina.png",
            bintang: "4",
        },
    ]);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1); // Reset ke halaman pertama saat filter berfoto
    };

    const handleEntriesChange = (e) => {
        setEntries(parseInt(e.target.value));
        setCurrentPage(1); // Reset ke halaman pertama saat bintang entri berfoto
    };

    const filtered = PaketSoals.filter((testimoni) => {
        const lowerCaseFilter = filter.toLowerCase();
        return (
            testimoni.name.toLowerCase().includes(lowerCaseFilter) ||
            testimoni.jabatan.toLowerCase().includes(lowerCaseFilter) ||
            testimoni.foto.toLowerCase().includes(lowerCaseFilter)
        );
    });

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const totalPages = Math.ceil(filtered.length / entries);
    const startIndex = (currentPage - 1) * entries;
    const paginatedPaketSoals = filtered.slice(
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
                        {" "}
                        <div className="p-3 px-6">
                            <h1 className="text-2xl font-bold text-blue-900">
                                TABEL TESTIMONI
                            </h1>{" "}
                        </div>
                        <div className="flex justify-between items-center p-3 px-6 border-y">
                            <div className="flex gap-4">
                                <a
                                    href="/lembaga/testimoni/tambah"
                                    className="flex items-center px-4 p-2 gap-2 bg-green-500 hover:bg-green-700 text-white rounded"
                                >
                                    <MdAddCircle />
                                    Tambah
                                </a>
                            </div>
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
                                        <th className="p-2 border">No.</th>
                                        <th className="p-2 border">Nama</th>
                                        <th className="p-2 border">Jabatan</th>
                                        <th className="p-2 border">Foto</th>
                                        <th className="p-2 border">Bintang</th>
                                        <th className="p-2 border">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedPaketSoals.map(
                                        (testimoni, index) => (
                                            <tr
                                                key={testimoni.id}
                                                className="hover:bg-gray-100 text-center"
                                            >
                                                <td className="p-2 border">
                                                    {index + 1}
                                                </td>
                                                <td className="p-2 border">
                                                    {testimoni.name}
                                                </td>
                                                <td className="p-2 border">
                                                    {testimoni.jabatan}
                                                </td>
                                                <td className="p-2 border">
                                                    {testimoni.foto}
                                                </td>
                                                <td className="p-2 border">
                                                    {testimoni.bintang}
                                                </td>
                                                <td className="p-2 border">
                                                    <div className="flex justify-center gap-x-4">
                                                        <a
                                                            href="/lembaga/testimoni/edit"
                                                            className="text-blue-500"
                                                            data-tooltip-id="edit-tooltip"
                                                            data-tooltip-content="Edit"
                                                        >
                                                            <FaEdit />
                                                        </a>
                                                        <button
                                                            data-tooltip-id="delete-tooltip"
                                                            data-tooltip-content="Hapus"
                                                        >
                                                            <FaTrashAlt color="red" />
                                                        </button>
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
