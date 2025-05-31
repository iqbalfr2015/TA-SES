<?php

namespace App\Http\Controllers;

use App\Models\JawabanPeserta;
use App\Models\Soal;
use Illuminate\Support\Facades\Validator;
use GuzzleHttp\Client;
use App\Models\SesiUjian;
use App\Models\PaketSoal;
use App\Models\SesiPeserta;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use App\Models\Peserta;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class UjianPesertaController extends Controller
{
    public function index(Request $request): Response
    {
        // Ambil user yang sedang login dan relasi peserta serta sesi ujian
        $user = $request->user()->load(['pesertas.sesiUjians.paketSoal']);

        // Pastikan user memiliki role 'peserta' dan memiliki data peserta
        if ($user->role === 'peserta' && $user->pesertas->isNotEmpty()) {
            $lembaga_id = $user->pesertas->first()->lembaga_id;

            // Ambil semua peserta ujian berdasarkan `lembaga_id`
            $pesertaujian = Peserta::where('lembaga_id', $lembaga_id)->get();

            // Ambil semua sesi ujian yang berkaitan dengan peserta
            $sesiUjians = $user->pesertas->flatMap(function ($peserta) {
                return $peserta->sesiUjians;
            })->unique('id')->values();

        } else {
            // Jika bukan peserta atau tidak ada relasi peserta, kembalikan data kosong
            $pesertaujian = collect([]);
            $sesiUjians = collect([]);
        }

        return Inertia::render('Role/Peserta/Peserta', [
            'pesertaujian' => $pesertaujian->toArray(),
            'sesiUjianspeserta' => $sesiUjians->toArray(), // Pastikan dikonversi ke array
        ]);
    }


    


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Ambil data ujian dengan relasi paketSoal
        $ujian = SesiUjian::with(['paketSoal' => function ($query) {
            $query->withCount('soals'); // Hitung jumlah soal dalam paketSoal
        }])->findOrFail($id);
        
        // Hitung waktu mulai dan waktu akhir berdasarkan waktu_mulai + waktu_pengerjaan
        $waktuMulai = Carbon::parse($ujian->tanggal_pelaksanaan . ' ' . $ujian->waktu_mulai);
        $waktuAkhir = $waktuMulai->copy()->addMinutes($ujian->waktu_pengerjaan);
        
        // Mendapatkan waktu saat ini
        $now = Carbon::now();
    
        // Periksa apakah waktu saat ini sudah melewati waktu mulai ujian
        if ($now < $waktuMulai) {
            // Jika belum, kembalikan respons yang sesuai
            return Redirect::back()->with('error', 'Ujian belum dimulai. Ujian akan dimulai pada ' . $waktuMulai->format('d-m-Y H:i:s'));
        }
    
        return Inertia::render('Role/Peserta/Detail', [
            'ujian' => [
                'id' => $ujian->id,
                'nama_sesi_ujian' => $ujian->nama_sesi_ujian,
                'mode_peserta' => $ujian->mode_peserta,
                'waktu_mulai' => $waktuMulai->toDateTimeString(),
                'waktu_akhir' => $waktuAkhir->toDateTimeString(),
                'waktu_pengerjaan' => $ujian->waktu_pengerjaan,
                'jumlah_soal' => $ujian->paketSoal->soals_count ?? 0, // Ambil jumlah soal dari soals_count
                'petunjuk_pengerjaan' => $ujian->paketSoal->petunjuk_pengerjaan ?? '', // Ambil petunjuk pengerjaan
            ]
        ]);
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function detailUjian($id)
{
    // Ambil data ujian dengan relasi ke paketSoal, soals, dan jawaban
    $ujian = SesiUjian::with([
        'paketSoal' => function ($query) {
            $query->with([
                'soals' => function ($query) {
                    $query->with('jawabans'); // Ambil semua jawaban dalam soal
                }
            ])->withCount('soals'); // Hitung jumlah soal dalam paketSoal
        }
    ])->findOrFail($id);

    // Hitung waktu akhir berdasarkan waktu_mulai + waktu_pengerjaan
    $waktuMulai = Carbon::parse($ujian->waktu_mulai);
    $waktuAkhir = $waktuMulai->copy()->addMinutes($ujian->waktu_pengerjaan);

    return Inertia::render('Role/Peserta/Ujian', [
        'ujian' => [
            'id' => $ujian->id,
            'nama_sesi_ujian' => $ujian->nama_sesi_ujian,
            'mode_peserta' => $ujian->mode_peserta,
            'waktu_mulai' => $ujian->waktu_mulai,
            'waktu_akhir' => $waktuAkhir->toDateTimeString(),
            'waktu_pengerjaan' => $ujian->waktu_pengerjaan,
            'jumlah_soal' => $ujian->paketSoal->soals_count ?? 0,
            'petunjuk_pengerjaan' => $ujian->paketSoal->petunjuk_pengerjaan ?? '',
            'soals' => $ujian->paketSoal->soals->map(function ($soal) {
    $mediaUrl = $soal->media ? asset(Storage::url($soal->media)) : null;
    $mediaType = null;

    if ($mediaUrl) {
        $extension = pathinfo($mediaUrl, PATHINFO_EXTENSION);
        if (in_array($extension, ['jpg', 'jpeg', 'png', 'gif', 'webp'])) {
            $mediaType = 'image';
        } elseif (in_array($extension, ['mp3', 'wav', 'ogg'])) {
            $mediaType = 'audio';
        } elseif (in_array($extension, ['mp4', 'webm', 'ogg'])) {
            $mediaType = 'video';
        }
    }

    return [
        'id' => $soal->id,
        'pertanyaan' => $soal->pertanyaan,
        'tipe' => $soal->tipe,
        'media' => $mediaUrl,
        'media_type' => $mediaType,
        'jawabans' => $soal->jawabans->map(function ($jawaban) {
            return [
                'id' => $jawaban->id,
                'jawaban' => $jawaban->jawaban,
                'benar' => $jawaban->benar,
            ];
        })
    ];
}),

        ]
    ]);
}
public function simpanJawaban(Request $request)
{
    // Dump and die untuk melihat semua data yang diterima
    // dd($request->all());

    // Validasi incoming request
    $validator = Validator::make($request->all(), [
        'jawaban' => 'required|array',
        'jawaban.*.ujian_id' => 'required|exists:sesi_ujians,id',
        'jawaban.*.soal_id' => 'required|exists:soals,id',
        'jawaban.*.jawaban_id' => 'nullable|exists:jawabans,id',
        'jawaban.*.jawaban_text' => 'nullable|string',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    // Mendapatkan pengguna yang terautentikasi
    $user = auth()->user();
    $peserta = $user->pesertas()->first();

    if (!$peserta) {
        return response()->json(['error' => 'Peserta not found for the authenticated user.'], 404);
    }

    foreach ($request->jawaban as $jawaban) {
        $soal = Soal::find($jawaban['soal_id']);
        $benar = false;

        // Cek jawaban untuk pilihan ganda
        if ($soal->tipe === 'pilihan_ganda' && isset($jawaban['jawaban_id'])) {
            $benar = $soal->jawabans()->where('id', $jawaban['jawaban_id'])->where('benar', true)->exists();
        }

        // Cek jawaban untuk esai dan isian
        if (in_array($soal->tipe, ['esai', 'isian'])) {
            // Cek jika jawaban_id cocok
            if ($jawaban['jawaban_id'] !== null) {
                $benar = $soal->jawabans()->where('id', $jawaban['jawaban_id'])->where('jawaban', $jawaban['jawaban_text'])->exists();
            } else {
                // Jika jawaban_id tidak ada, gunakan AI untuk evaluasi
                $benar = $this->evaluateEssayAnswer($jawaban['jawaban_text'], $soal);
            }
        }

        // Buat catatan jawaban
        JawabanPeserta::create([
            'peserta_id' => $peserta->id,
            'ujian_id' => $jawaban['ujian_id'],
            'soal_id' => $jawaban['soal_id'],
            'jawaban_id' => $jawaban['jawaban_id'], // Ambil dari jawaban_id yang dikirim
            'jawaban_text' => $jawaban['jawaban_text'],
            'benar' => $benar,
        ]);
    }

    return response()->json(['message' => 'Jawaban berhasil disimpan.'], 200);
}
private function evaluateEssayAnswer($jawabanText, $soal)
{
    $client = new Client();
    $apiKey = env('OPENAI_API_KEY');

    // Buat prompt untuk OpenAI
    $prompt = "Evaluasi jawaban berikut: '{$jawabanText}'. Apakah jawaban ini benar untuk soal: '{$soal->pertanyaan}'? Berikan penilaian 'benar' atau 'salah'.";

    try {
        $response = $client->post('https://api.openai.com/v1/chat/completions', [
            'headers' => [
                'Authorization' => 'Bearer ' . $apiKey,
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'model' => 'gpt-3.5-turbo', // Ganti dengan model yang sesuai
                'messages' => [
                    ['role' => 'user', 'content' => $prompt],
                ],
                'max_tokens' => 10, // Batasi jumlah token untuk respons
            ],
        ]);

        $data = json_decode($response->getBody(), true);
        $answer = $data['choices'][0]['message']['content'] ?? '';

        // Cek apakah jawaban benar atau salah
        return stripos($answer, 'benar') !== false; // Mengembalikan true jika mengandung kata 'benar'
    } catch (\Exception $e) {
        // Tangani kesalahan jika ada
        return false; // Kembalikan false jika terjadi kesalahan
    }
}



public function hitungSkor($ujian_id, $peserta_id)
{
    $totalSoal = Soal::whereHas('paketSoal', function ($query) use ($ujian_id) {
        $query->whereHas('sesiUjian', function ($q) use ($ujian_id) {
            $q->where('id', $ujian_id);
        });
    })->count();

    $jawabanBenar = JawabanPeserta::where([
        ['ujian_id', $ujian_id],
        ['peserta_id', $peserta_id],
        ['is_correct', 1]
    ])->count();

    $skor = $totalSoal > 0 ? ($jawabanBenar / $totalSoal) * 100 : 0;

    return response()->json([
        'peserta_id' => $peserta_id,
        'ujian_id' => $ujian_id,
        'jawaban_benar' => $jawabanBenar,
        'total_soal' => $totalSoal,
        'skor' => round($skor, 2)
    ]);
}
public function submitUjian(Request $request)
{
    dd($request->all());
    $peserta_id = $request->peserta_id;
    $ujian_id = $request->ujian_id;

    $totalSoal = Soal::whereHas('paketSoal', function ($query) use ($ujian_id) {
        $query->whereHas('sesiUjian', function ($q) use ($ujian_id) {
            $q->where('id', $ujian_id);
        });
    })->count();

    $jawabanBenar = JawabanPeserta::where([
        ['ujian_id', $ujian_id],
        ['peserta_id', $peserta_id],
        ['is_correct', 1]
    ])->count();

    $skor = $totalSoal > 0 ? ($jawabanBenar / $totalSoal) * 100 : 0;

    DB::table('sesi_ujian_pesertas')->updateOrInsert(
        ['peserta_id' => $peserta_id, 'ujian_id' => $ujian_id],
        ['skor' => $skor, 'status_pengerjaan' => 'selesai', 'updated_at' => now()]
    );

    return back()->with(['skor' => round($skor, 2)]);
}

}
