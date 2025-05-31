<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Soal extends Model
{
    use HasFactory;

    protected $fillable = ['paket_soal_id', 'pertanyaan', 'tipe', 'metode_koreksi', 'media'];

    public function paketSoal()
    {
        return $this->belongsTo(PaketSoal::class);
    }

    public function jawabans()
    {
        return $this->hasMany(Jawaban::class);
    }

    public function SesiPeserta()
    {
        return $this->hasMany(SesiPeserta::class);
    }
}
