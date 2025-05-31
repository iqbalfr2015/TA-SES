import Navbar from "@/Components/Peserta/Navbar";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link, usePage, router } from "@inertiajs/react";

export default function Page({ ujian }) {
    const [timeLeft, setTimeLeft] = useState(ujian.waktu_pengerjaan * 60);
    const [answers, setAnswers] = useState({});
    const [doubtful, setDoubtful] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const validateAnswers = () => {
        const unansweredQuestions = ujian.soals.filter((soal) => {
            return !answers[soal.id] && !doubtful[soal.id];
        });
        const hasDoubtfulQuestions = ujian.soals.some((soal) => doubtful[soal.id]);
        return unansweredQuestions.length === 0 && !hasDoubtfulQuestions;
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    const handleAnswer = (questionId, answer) => {
        if (doubtful[questionId]) {
            setDoubtful({ ...doubtful, [questionId]: false });
        }
        setAnswers({ ...answers, [questionId]: answer });
    };

    const handleEssayAnswer = (questionId, answer) => {
        // Update the answer and check if it's empty
        if (answer.trim() === "") {
            setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: undefined }));
        } else {
            setAnswers({ ...answers, [questionId]: answer });
        }
    };

    const toggleDoubtful = (questionId) => {
        setDoubtful({ ...doubtful, [questionId]: !doubtful[questionId] });
    };

    const showIncompleteAlert = () => {
        Swal.fire("Peringatan!", "Jawaban Anda belum lengkap! Pastikan semua jawaban terisi dan tidak ada yang ditandai ragu-ragu.", "warning");
    };

    const handleFinishExam = () => {
        if (!validateAnswers()) {
            showIncompleteAlert();
            return;
        }
    
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Setelah dikirim, jawaban tidak bisa diubah!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, Simpan Jawaban!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                const dataJawaban = ujian.soals.map((soal) => {
                    let jawaban_id = null;
                    let jawaban_text = null;
    
                    if (soal.tipe === "pilihan_ganda") {
                        // Set jawaban_id ke ID jawaban yang dipilih
                        jawaban_id = answers[soal.id] || null;
                    } else if (soal.tipe === "true_false") {
                        // Set jawaban_id ke ID jawaban yang dipilih
                        const selectedAnswer = answers[soal.id];
                        if (selectedAnswer === "true") {
                            // Cari ID jawaban yang benar untuk "true"
                            const correctAnswer = soal.jawabans.find(j => j.jawaban === "true");
                            jawaban_id = correctAnswer ? correctAnswer.id : null;
                        } else if (selectedAnswer === "false") {
                            // Cari ID jawaban yang benar untuk "false"
                            const correctAnswer = soal.jawabans.find(j => j.jawaban === "false");
                            jawaban_id = correctAnswer ? correctAnswer.id : null;
                        }
                    } else if (soal.tipe === "esai" || soal.tipe === "isian") {
                        jawaban_text = answers[soal.id] || "";
                        // Jika jawaban_text ada, set jawaban_id ke null
                        if (jawaban_text.trim() === "") {
                            jawaban_id = null; // Set null jika tidak ada jawaban
                        } else {
                            // Cek jawaban esai dengan jawaban_id
                            const correctAnswer = soal.jawabans.find(j => j.jawaban === jawaban_text);
                            if (correctAnswer) {
                                jawaban_id = correctAnswer.id; // Set jawaban_id jika cocok
                            }
                        }
                    }
    
                    return {
                        peserta_id: ujian.peserta_id,
                        ujian_id: ujian.id,
                        soal_id: soal.id,
                        jawaban_id: jawaban_id,
                        jawaban_text: jawaban_text,
                    };
                });
    
                router.post("/ujian/simpan-jawaban", { jawaban: dataJawaban }, {
                    onSuccess: () => {
                        Swal.fire("Sukses!", "Jawaban Anda telah disimpan.", "success");
                    },
                    onError: () => {
                        Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan jawaban.", "error");
                    },
                });
            }
        });
    };
    const soal = ujian.soals[currentQuestion];

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="max-w-full mx-auto p-6 pt-20">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <div className="col-span-3 bg-white rounded shadow p-4">
                        <h3 className="text-lg font-semibold mb-2">Soal No {currentQuestion + 1}</h3>
                        {soal.media && (
                            <div className="mb-4 flex justify-center">
                                {/\.(jpg|jpeg|png|gif|webp)$/i.test(soal.media) && (
                                    <img src={soal.media} alt="Soal" className="w-1/4 rounded" />
                                )}
                                {/\.(mp3|wav|ogg)$/i.test(soal.media) && (
                                    <audio controls src={soal.media} className="w-1/4" />
                                )}
                                {/\.(mp4|webm|ogg)$/i.test(soal.media) && (
                                    <video controls src={soal.media} className="w-1/4 rounded" />
                                )}
                            </div>
                        )}
                        <p className="mb-4">{soal.pertanyaan}</p>

                        <div className="space-y-4">
                            {soal.tipe === "pilihan_ganda" && soal.jawabans.map((jawaban, index) => (
                                <label
                                    key={jawaban.id}
                                    className={`block p-4 border rounded cursor-pointer hover:bg-gray-100 ${answers[soal.id] === jawaban.id ? "bg-blue-300" : ""}`}
                                >
                                    <input
                                        type="radio"
                                        name={`question-${soal.id}`}
                                        className="mr-2"
                                        checked={answers[soal.id] === jawaban.id}
                                        onChange={() => handleAnswer(soal.id, jawaban.id)}
                                    />
                                    {String.fromCharCode(65 + index)}. {jawaban.jawaban}
                                </label>
                            ))}
                            {soal.tipe === "true_false" && (
                                <div className="space-y-2">
                                    {["true", "false"].map((option) => (
                                        <label key={option} className="block p-4 border rounded cursor-pointer hover:bg-gray-100">
                                            <input
                                                type="radio"
                                                name={`question-${soal.id}`}
                                                className="mr-2"
                                                checked={answers[soal.id] === option}
                                                onChange={() => handleAnswer(soal.id, option)}
                                            />
                                            {option === "true" ? "Benar" : "Salah"}
                                        </label>
                                    ))}
                                </div>
                            )}
                            {(soal.tipe === "isian" || soal.tipe === "esai") && (
                                <textarea
                                    className="w-full p-2 border rounded"
                                    value={answers[soal.id] || ""}
                                    onChange={(e) => handleEssayAnswer(soal.id, e.target.value)}
                                />
                            )}
                        </div>

                        <div className="flex justify-between mt-6">
                            {currentQuestion > 0 && (
                                <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400" onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}>Sebelumnya</button>
                            )}
                            <label className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="mr-2" 
                                    checked={doubtful[soal.id] || false} 
                                    onChange={() => toggleDoubtful(soal.id)} 
                                /> 
                                Ragu-ragu
                            </label>
                            {currentQuestion < ujian.soals.length - 1 ? (
                                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => setCurrentQuestion(Math.min(ujian.soals.length - 1, currentQuestion + 1))}>Selanjutnya</button>
                            ) : (
                                <button 
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" 
                                    onClick={handleFinishExam} 
                                >
                                    Selesai
                                </button>
                            )}
                        </div>
                    </div>

                    <aside className="bg-white rounded shadow p-4">
                        <div>
                            <h2 className="text-center text-3xl font-bold text-gray-700 mb-2">{formatTime(timeLeft)}</h2>
                        </div>
                        <div className="mt-6">
                            <button className="w-full bg-red-500 text-white py-2 rounded mb-2 hover:bg-red-600" onClick={handleFinishExam}>Selesai</button>
                        </div>
                        <div className="mt-4 grid grid-cols-5 gap-1">
                            {ujian.soals.map((soal, index) => {
                                const isAnswered = answers[soal.id] !== undefined; // Cek jika sudah dijawab
                                const isDoubtful = doubtful[soal.id]; // Cek jika ditandai ragu-ragu

                                return (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentQuestion(index)}
                                        className={`w-12 h-12 rounded-full ${
                                            isDoubtful ? "bg-yellow-500 text-white" : isAnswered ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                );
                            })}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}