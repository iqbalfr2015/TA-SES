<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SesiUjianPeserta extends Model
{
    use HasFactory;

    protected $table = 'sesi_ujian_pesertas';
    protected $fillable = ['peserta_id', 'ujian_id', 'skor', 'status_pengerjaan'];

    public function peserta()
    {
        return $this->belongsTo(Peserta::class);
    }

    public function ujian()
    {
        return $this->belongsTo(SesiUjian::class);
    }
}
