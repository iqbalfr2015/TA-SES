import Pagination from "@/Components/Layout/Pagination";
import Navbar from "@/Components/Admin/Navbar";
import Sidebar from "@/Components/Admin/Sidebar";
import React, { useState } from "react";
import { FaEye, FaFilter } from "react-icons/fa";

export default function Page() {
    const [filter, setFilter] = useState("");
    const [entries, setEntries] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [lembagas, setSembagas] = useState([
        {
            "id": 1,
            "name": "SDN 0 Solo",
            "pj": "Leon",
            "jenis": "SD",
            "kota": "Solo",
            "staff": "12",
            "peserta": "120"
        },
        {
            "id": 2,
            "name": "SMAN 99 DIY",
            "pj": "Maria",
            "jenis": "SMA",
            "kota": "Yogyakarta",
            "staff": "15",
            "peserta": "150"
        },
        {
            "id": 3,
            "name": "D3 TI UNS",
            "pj": "Andre",
            "jenis": "D3",
            "kota": "Jakarta",
            "staff": "10",
            "peserta": "100"
        },
        {
            "id": 4,
            "name": "S1 Bandung-an",
            "pj": "Jasmine",
            "jenis": "S1",
            "kota": "Bandung",
            "staff": "8",
            "peserta": "80"
        },
        {
            "id": 5,
            "name": "S2 Surabaya",
            "pj": "Riko",
            "jenis": "S2",
            "kota": "Surabaya",
            "staff": "20",
            "peserta": "200"
        },
        {
            "id": 6,
            "name": "D4 Malang DKV",
            "pj": "Tina",
            "jenis": "D4",
            "kota": "Malang",
            "staff": "6",
            "peserta": "60"
        },
        {
            "id": 7,
            "name": "S1 Informatika Semarang",
            "pj": "Erik",
            "jenis": "S1",
            "kota": "Semarang",
            "staff": "10",
            "peserta": "110"
        },
        {
            "id": 8,
            "name": "S3 Medan jaya",
            "pj": "Fiona",
            "jenis": "S3",
            "kota": "Medan",
            "staff": "25",
            "peserta": "250"
        }
    ]
    );

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1); // Reset ke halaman pertama saat filter berubah
    };

    const handleEntriesChange = (e) => {
        setEntries(parseInt(e.target.value));
        setCurrentPage(1); // Reset ke halaman pertama saat jumlah entri berubah
    };

    const filteredSoals = lembagas.filter((sesi) => {
        const lowerCaseFilter = filter.toLowerCase();
        return (
            sesi.name.toLowerCase().includes(lowerCaseFilter) ||
            sesi.pj.toLowerCase().includes(lowerCaseFilter)
        );
    });

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const staffPages = Math.ceil(filteredSoals.length / entries);
    const startIndex = (currentPage - 1) * entries;
    const paginatedSoals = filteredSoals.slice(
        startIndex,
        startIndex + entries
    );

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= staffPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="relative flex h-screen">
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
                <Navbar toggleSidebar={toggleSidebar} />
                <main className="pt-20 p-6 bg-color-accent min-h-screen h-full bg-gray-200">
                    <div className="bg-white rounded-2xl">
                        <div className="p-3 px-6 border-b">
                            <h1 className="text-2xl font-bold text-blue-900">
                                LEMBAGA
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
                                        <th className="p-2 border" >
                                            No.
                                        </th>
                                        <th className="p-2 border" >
                                            Nama Lembaga
                                        </th>
                                        <th className="p-2 border" >
                                            Nama PJ
                                        </th>
                                        <th className="p-2 border" >
                                            Jenis
                                        </th>
                                        <th className="p-2 border" >
                                            Kota
                                        </th>
                                        <th className="p-2 border" >
                                            Staff
                                        </th>
                                        <th className="p-2 border" >
                                            Peserta
                                        </th>
                                        <th className="p-2 border" >
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedSoals.map((sesi, index) => (
                                        <tr
                                            key={sesi.id}
                                            className="hover:bg-gray-100 text-center"
                                        >
                                            <td className="p-2 border">
                                                {startIndex + index + 1}
                                            </td>
                                            <td className="p-2 border">
                                                {sesi.name}
                                            </td>
                                            <td className="p-2 border">
                                                {sesi.pj}
                                            </td>
                                            <td className="p-2 border">
                                                {sesi.jenis}
                                            </td>
                                            <td className="p-2 border">
                                                {sesi.kota}
                                            </td>
                                            <td className="p-2 border">
                                                {sesi.staff}
                                            </td>
                                            <td className="p-2 border">
                                                {sesi.peserta}
                                            </td>
                                            <td className="p-2 border">
                                                <button className="flex mx-auto gap-2 text-blue-500">
                                                    <FaEye />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination
                                currentPage={currentPage}
                                staffPages={staffPages}
                                handlePageChange={handlePageChange}
                                startIndex={startIndex}
                                entries={entries}
                                filtered={filteredSoals}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
