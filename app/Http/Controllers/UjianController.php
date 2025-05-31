<?php

namespace App\Http\Controllers;

use App\Models\HasilUjian;
use App\Models\JawabanPeserta;
use Illuminate\Http\Request;

class UjianController extends Controller {
    public function koreksiOtomatis($hasilUjianId) {
        $jawabanPeserta = JawabanPeserta::where('hasil_ujian_id', $hasilUjianId)->get();
        
        foreach ($jawabanPeserta as $jawaban) {
            $jawaban->koreksi();
        }

        $totalSkor = $jawabanPeserta->sum('nilai');
        HasilUjian::where('id', $hasilUjianId)->update(['total_skor' => $totalSkor]);

        return response()->json(['message' => 'Koreksi selesai', 'total_skor' => $totalSkor]);
    }
}
