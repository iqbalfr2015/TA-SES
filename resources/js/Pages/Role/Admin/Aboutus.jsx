import Navbar from "@/Components/Admin/Navbar";
import Sidebar from "@/Components/Admin/Sidebar";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

export default function Page() {
    const [PaketSoals, setPaketSoals] = useState([
        {
            id: 1,
            name: "PT. BIPTEK TOKODATA INDONESIA",
            logo: "logo_SES.png",
            slogan1: "Miliki aplikasi CBT untuk ujian online tanpa ribet.",
            subSlogan: "Daftarkan segera lembaga Anda di Smart Exam System dan selenggarakan ujian online dengan semua fitur yang dirancang khusus untuk kemudahan penyelenggaraan ujian!",
            deskripsi: "Kami di Smart Exam System menawarkan layanan CBT Online sejak tahun 2025. Software kami didesain khusus untuk penyelenggaraan ujian online dengan mudah, dengan fitur yang melimpah, dan dengan biaya yang sangat murah!",
            alamat: "Jl. Slamet Riyadi No.17 Kartasura Sukoharjo 57169 Jawa Tengah Indonesia",
            phone: "+62 0271-738343",
            email: "info@example.com",
            linkYT: "https://www.youtube.com/c",
        },
    ]);

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [editing, setEditing] = useState({ id: null, field: null }); // State untuk mode edit
    const [tempValue, setTempValue] = useState(""); // State untuk nilai sementara saat edit

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Fungsi untuk mengaktifkan mode edit
    const handleEdit = (id, field, value) => {
        setEditing({ id, field });
        setTempValue(value);
    };

    // Fungsi untuk menyimpan perubahan
    const handleSave = (id, field) => {
        const updatedPaketSoals = PaketSoals.map((item) =>
            item.id === id ? { ...item, [field]: tempValue } : item
        );
        setPaketSoals(updatedPaketSoals);
        setEditing({ id: null, field: null }); // Matikan mode edit
    };

    // Fungsi untuk menangani tombol Enter
    const handleKeyDown = (e, id, field) => {
        if (e.key === "Enter") {
            handleSave(id, field);
        }
    };

    return (
        <div className="relative flex">
            {/* Sidebar */}
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Content Wrapper */}
            <div className={`flex-1 flex flex-col ${isSidebarOpen ? "ml-56" : "ml-16"} transition-all duration-300`}>
                {/* Navbar */}
                <Navbar toggleSidebar={toggleSidebar} />

                {/* Main Content */}
                <main className="pt-20 p-6 bg-gray-200 min-h-screen">
                    <div className="bg-white rounded-2xl">
                        <div className="flex justify-between items-center p-3 px-6 border-y">
                            <h1 className="text-2xl font-bold text-blue-900">TABEL ABOUT US</h1>
                        </div>
                        <div className="p-6">
                            <table className="w-full border rounded">
                                <thead>
                                    <tr className="bg-blue-500 text-white">
                                        <th className="p-2 border w-32">Konten</th>
                                        <th className="p-2 border">Isi</th>
                                        <th className="p-2 border w-20">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {PaketSoals.map((about) => (
                                        <React.Fragment key={about.id}>
                                            {/* Nama PT */}
                                            <tr className="hover:bg-gray-100 text-center">
                                                <td className="p-2 border bg-blue-400 text-white">Nama PT</td>
                                                <td className="p-2 border text-start">
                                                    {editing.id === about.id && editing.field === "name" ? (
                                                        <input
                                                            type="text"
                                                            value={tempValue}
                                                            onChange={(e) => setTempValue(e.target.value)}
                                                            onKeyDown={(e) => handleKeyDown(e, about.id, "name")}
                                                            className="w-full px-2 py-1 border rounded"
                                                            autoFocus
                                                        />
                                                    ) : (
                                                        <span onClick={() => handleEdit(about.id, "name", about.name)}>
                                                            {about.name}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-2 border">
                                                    <div className="flex justify-center">
                                                        <button
                                                            onClick={() => handleEdit(about.id, "name", about.name)}
                                                            className="text-blue-500"
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            {/* Logo */}
                                            <tr className="hover:bg-gray-100 text-center">
                                                <td className="p-2 border bg-blue-400 text-white">Logo</td>
                                                <td className="p-2 border text-start">
                                                    {editing.id === about.id && editing.field === "logo" ? (
                                                        <input
                                                            type="text"
                                                            value={tempValue}
                                                            onChange={(e) => setTempValue(e.target.value)}
                                                            onKeyDown={(e) => handleKeyDown(e, about.id, "logo")}
                                                            className="w-full px-2 py-1 border rounded"
                                                            autoFocus
                                                        />
                                                    ) : (
                                                        <span onClick={() => handleEdit(about.id, "logo", about.logo)}>
                                                            <img src={`/images/${about.logo}`} alt="Logo" className="w-16 h-16" />
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-2 border">
                                                    <div className="flex justify-center">
                                                        <button
                                                            onClick={() => handleEdit(about.id, "logo", about.logo)}
                                                            className="text-blue-500"
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            {/* Slogan 1 */}
                                            <tr className="hover:bg-gray-100 text-center">
                                                <td className="p-2 border bg-blue-400 text-white">Slogan 1</td>
                                                <td className="p-2 border text-start">
                                                    {editing.id === about.id && editing.field === "slogan1" ? (
                                                        <input
                                                            type="text"
                                                            value={tempValue}
                                                            onChange={(e) => setTempValue(e.target.value)}
                                                            onKeyDown={(e) => handleKeyDown(e, about.id, "slogan1")}
                                                            className="w-full px-2 py-1 border rounded"
                                                            autoFocus
                                                        />
                                                    ) : (
                                                        <span onClick={() => handleEdit(about.id, "slogan1", about.slogan1)}>
                                                            {about.slogan1}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-2 border">
                                                    <div className="flex justify-center">
                                                        <button
                                                            onClick={() => handleEdit(about.id, "slogan1", about.slogan1)}
                                                            className="text-blue-500"
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            {/* Sub Slogan */}
                                            <tr className="hover:bg-gray-100 text-center">
                                                <td className="p-2 border bg-blue-400 text-white">Sub Slogan</td>
                                                <td className="p-2 border text-start">
                                                    {editing.id === about.id && editing.field === "subSlogan" ? (
                                                        <input
                                                            type="text"
                                                            value={tempValue}
                                                            onChange={(e) => setTempValue(e.target.value)}
                                                            onKeyDown={(e) => handleKeyDown(e, about.id, "subSlogan")}
                                                            className="w-full px-2 py-1 border rounded"
                                                            autoFocus
                                                        />
                                                    ) : (
                                                        <span onClick={() => handleEdit(about.id, "subSlogan", about.subSlogan)}>
                                                            {about.subSlogan}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-2 border">
                                                    <div className="flex justify-center">
                                                        <button
                                                            onClick={() => handleEdit(about.id, "subSlogan", about.subSlogan)}
                                                            className="text-blue-500"
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            {/* Deskripsi */}
                                            <tr className="hover:bg-gray-100 text-center">
                                                <td className="p-2 border bg-blue-400 text-white">Deskripsi</td>
                                                <td className="p-2 border text-start">
                                                    {editing.id === about.id && editing.field === "deskripsi" ? (
                                                        <input
                                                            type="text"
                                                            value={tempValue}
                                                            onChange={(e) => setTempValue(e.target.value)}
                                                            onKeyDown={(e) => handleKeyDown(e, about.id, "deskripsi")}
                                                            className="w-full px-2 py-1 border rounded"
                                                            autoFocus
                                                        />
                                                    ) : (
                                                        <span onClick={() => handleEdit(about.id, "deskripsi", about.deskripsi)}>
                                                            {about.deskripsi}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-2 border">
                                                    <div className="flex justify-center">
                                                        <button
                                                            onClick={() => handleEdit(about.id, "deskripsi", about.deskripsi)}
                                                            className="text-blue-500"
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            {/* Alamat */}
                                            <tr className="hover:bg-gray-100 text-center">
                                                <td className="p-2 border bg-blue-400 text-white">Alamat</td>
                                                <td className="p-2 border text-start">
                                                    {editing.id === about.id && editing.field === "alamat" ? (
                                                        <input
                                                            type="text"
                                                            value={tempValue}
                                                            onChange={(e) => setTempValue(e.target.value)}
                                                            onKeyDown={(e) => handleKeyDown(e, about.id, "alamat")}
                                                            className="w-full px-2 py-1 border rounded"
                                                            autoFocus
                                                        />
                                                    ) : (
                                                        <span onClick={() => handleEdit(about.id, "alamat", about.alamat)}>
                                                            {about.alamat}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-2 border">
                                                    <div className="flex justify-center">
                                                        <button
                                                            onClick={() => handleEdit(about.id, "alamat", about.alamat)}
                                                            className="text-blue-500"
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            {/* Phone */}
                                            <tr className="hover:bg-gray-100 text-center">
                                                <td className="p-2 border bg-blue-400 text-white">Phone</td>
                                                <td className="p-2 border text-start">
                                                    {editing.id === about.id && editing.field === "phone" ? (
                                                        <input
                                                            type="text"
                                                            value={tempValue}
                                                            onChange={(e) => setTempValue(e.target.value)}
                                                            onKeyDown={(e) => handleKeyDown(e, about.id, "phone")}
                                                            className="w-full px-2 py-1 border rounded"
                                                            autoFocus
                                                        />
                                                    ) : (
                                                        <span onClick={() => handleEdit(about.id, "phone", about.phone)}>
                                                            {about.phone}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-2 border">
                                                    <div className="flex justify-center">
                                                        <button
                                                            onClick={() => handleEdit(about.id, "phone", about.phone)}
                                                            className="text-blue-500"
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            {/* Email */}
                                            <tr className="hover:bg-gray-100 text-center">
                                                <td className="p-2 border bg-blue-400 text-white">Email</td>
                                                <td className="p-2 border text-start">
                                                    {editing.id === about.id && editing.field === "email" ? (
                                                        <input
                                                            type="text"
                                                            value={tempValue}
                                                            onChange={(e) => setTempValue(e.target.value)}
                                                            onKeyDown={(e) => handleKeyDown(e, about.id, "email")}
                                                            className="w-full px-2 py-1 border rounded"
                                                            autoFocus
                                                        />
                                                    ) : (
                                                        <span onClick={() => handleEdit(about.id, "email", about.email)}>
                                                            {about.email}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-2 border">
                                                    <div className="flex justify-center">
                                                        <button
                                                            onClick={() => handleEdit(about.id, "email", about.email)}
                                                            className="text-blue-500"
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            {/* Link YouTube */}
                                            <tr className="hover:bg-gray-100 text-center">
                                                <td className="p-2 border bg-blue-400 text-white">Buku Panduan</td>
                                                <td className="p-2 border text-start">
                                                    {editing.id === about.id && editing.field === "linkYT" ? (
                                                        <input
                                                            type="text"
                                                            value={tempValue}
                                                            onChange={(e) => setTempValue(e.target.value)}
                                                            onKeyDown={(e) => handleKeyDown(e, about.id, "linkYT")}
                                                            className="w-full px-2 py-1 border rounded"
                                                            autoFocus
                                                        />
                                                    ) : (
                                                        <span onClick={() => handleEdit(about.id, "linkYT", about.linkYT)}>
                                                            <a href={about.linkYT} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                                {about.linkYT}
                                                            </a>
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-2 border">
                                                    <div className="flex justify-center">
                                                        <button
                                                            onClick={() => handleEdit(about.id, "linkYT", about.linkYT)}
                                                            className="text-blue-500"
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="hover:bg-gray-100 text-center">
                                                <td className="p-2 border bg-blue-400 text-white">Link YouTube</td>
                                                <td className="p-2 border text-start">
                                                    {editing.id === about.id && editing.field === "linkYT" ? (
                                                        <input
                                                            type="text"
                                                            value={tempValue}
                                                            onChange={(e) => setTempValue(e.target.value)}
                                                            onKeyDown={(e) => handleKeyDown(e, about.id, "linkYT")}
                                                            className="w-full px-2 py-1 border rounded"
                                                            autoFocus
                                                        />
                                                    ) : (
                                                        <span onClick={() => handleEdit(about.id, "linkYT", about.linkYT)}>
                                                            <a href={about.linkYT} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                                {about.linkYT}
                                                            </a>
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-2 border">
                                                    <div className="flex justify-center">
                                                        <button
                                                            onClick={() => handleEdit(about.id, "linkYT", about.linkYT)}
                                                            className="text-blue-500"
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}