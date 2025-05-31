import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Pagination from "@/Components/Layout/Pagination";
import Navbar from "@/Components/Lembaga/Navbar";
import Sidebar from "@/Components/Lembaga/Sidebar";
import React, { useState } from "react";
import { FaCheckCircle, FaEdit, FaTrashAlt, FaUsers, FaBook, FaCalendarAlt } from "react-icons/fa";
import { GiCctvCamera } from "react-icons/gi";
import { MdAddCircle } from "react-icons/md";
import { usePage, router } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Page() {
    const { staffs = [] } = usePage().props;
    const [filter, setFilter] = useState("");
    const [entries, setEntries] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const icons = {
        peserta: { icon: <FaUsers />, label: "PESERTA" },
        paket_soal: { icon: <FaBook />, label: "PSOAL" },
        sesi: { icon: <FaCalendarAlt />, label: "SESI" },
        pengawas: { icon: <GiCctvCamera />, label: "PENGAWAS" },
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1);
    };

    const handleEntriesChange = (e) => {
        setEntries(parseInt(e.target.value));
        setCurrentPage(1);
    };

    const handleDelete = (staffId) => {
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Data staff ini akan dihapus secara permanen!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/lembaga/staff/${staffId}`, {
                    onSuccess: () => {
                        Swal.fire("Berhasil!", "Data staff telah dihapus.", "success");
                    },
                    onError: () => {
                        Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data.", "error");
                    },
                });
            }
        });
    };
    
    const updateStatusKewenangan = (staffId, kewenanganValue, currentStatus) => {
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Anda akan mengubah status akses ini!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, ubah!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                router.patch(
                    `/lembaga/staff/update-status`,
                    {
                        staff_id: staffId,
                        value: kewenanganValue,
                        status: currentStatus === "aktif" ? "tidak_aktif" : "aktif",
                    },
                    {
                        onSuccess: () => {
                            Swal.fire("Berhasil!", "Status akses telah diperbarui.", "success");
                        },
                        onError: () => {
                            Swal.fire("Gagal!", "Terjadi kesalahan saat memperbarui status.", "error");
                        },
                    }
                );
            }
        });
    };

    const filtered = staffs.filter((s) => {
        const lowerCaseFilter = filter.toLowerCase();
        return s.nama_staff.toLowerCase().includes(lowerCaseFilter) || s.email.toLowerCase().includes(lowerCaseFilter);
    });

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const totalPages = Math.ceil(filtered.length / entries);
    const startIndex = (currentPage - 1) * entries;
    const paginatedStaffs = filtered.slice(startIndex, startIndex + entries);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="relative flex h-screen">
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className={`flex-1 flex flex-col ${isSidebarOpen ? "ml-56" : "ml-16"} transition-all duration-300`}>
                <Navbar toggleSidebar={toggleSidebar} />
                <main className="pt-20 p-6 bg-gray-200 min-h-screen h-full">
                    <div className="bg-white rounded-2xl">
                        <div className="p-3 px-6">
                            <h1 className="text-2xl font-bold text-blue-900">TABEL STAFF</h1>
                        </div>
                        <div className="flex justify-between items-center p-3 px-6 border-y">
                            <a href="/lembaga/staff/tambah" className="flex items-center px-4 p-2 gap-2 bg-green-500 hover:bg-green-700 text-white rounded">
                                <MdAddCircle />
                                Tambah
                            </a>
                        </div>
                        <div className="px-6 pb-3">
                            <table className="w-full border rounded">
                                <thead>
                                    <tr className="bg-blue-500 text-white">
                                        <th className="p-2 border">No.</th>
                                        <th className="p-2 border text-center">Nama Staff</th>
                                        <th className="p-2 border text-center">Email</th>
                                        <th className="p-2 border">Kewenangan</th>
                                        <th className="p-2 border">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedStaffs.map((s, index) => (
                                        <tr key={s.id} className="hover:bg-gray-100">
                                            <td className="p-2 border text-center">{index + 1}</td>
                                            <td className="p-2 border text-center">{s.nama_staff}</td>
                                            <td className="p-2 border text-center">{s.email}</td>
                                            <td className="p-2 border">
                                                <div className="flex gap-3 justify-center">
                                                    {(s.kewenangans || []).map((kewenangan, idx) => {
                                                        const isSelected = kewenangan.status === 'aktif';
                                                        return (
                                                            <div key={idx} className="relative flex items-center gap-1">
                                                                <button
                                                                    className={`p-2 rounded flex items-center justify-center ${isSelected ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                                                                    onClick={() => updateStatusKewenangan(s.id, kewenangan.value, kewenangan.status)}
                                                                >
                                                                    {icons[kewenangan.value.toLowerCase()]?.icon || "❓"}
                                                                    {isSelected && (
                                                                        <FaCheckCircle className="h-4 w-4 absolute -bottom-1 -right-1 text-blue-500 bg-white rounded-full" />
                                                                    )}
                                                                </button>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </td>
                                            <td className="p-2 border">
                                                <div className="flex gap-4 justify-center">
                                                    {/* <a href="/lembaga/staff/edit" className="text-blue-500" data-tooltip-id="edit-tooltip" data-tooltip-content="Edit">
                                                        <FaEdit />
                                                    </a> */}
                                                    <button
                                                        data-tooltip-id="delete-tooltip"
                                                        data-tooltip-content="Hapus"
                                                        onClick={() => handleDelete(s.id)}
                                                    >
                                                        <FaTrashAlt color="red" />
                                                    </button>

                                                </div>
                                                <Tooltip id="edit-tooltip" />
                                                <Tooltip id="delete-tooltip" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
