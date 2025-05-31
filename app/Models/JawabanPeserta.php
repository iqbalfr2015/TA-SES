<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JawabanPeserta extends Model
{
    use HasFactory;

    protected $table = 'jawaban_peserta';

    protected $fillable = [
        'peserta_id',
        'ujian_id',
        'soal_id',
        'jawaban_id',
        'jawaban_text',
        'benar',
    ];

    public function peserta()
    {
        return $this->belongsTo(Peserta::class);
    }

    public function ujian()
    {
        return $this->belongsTo(Ujian::class);
    }

    public function soal()
    {
        return $this->belongsTo(Soal::class);
    }

    public function jawaban()
    {
        return $this->belongsTo(Jawaban::class);
    }
}