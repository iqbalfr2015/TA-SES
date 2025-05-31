<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Peserta extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'lembaga_id','nama_peserta', 'email', 'no_peserta', 'kelompok'
    ];

    /**
     * Relasi ke model User.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function lembaga()
    {
        return $this->belongsTo(Lembaga::class, 'lembaga_id');
    }
  // Relasi ke tabel sesi_pesertas
  public function sesiPesertas()
  {
      return $this->hasMany(SesiPeserta::class, 'peserta_id');
  }

  // Relasi ke tabel sesi_ujians melalui sesi_pesertas
  public function sesiUjians()
  {
      return $this->belongsToMany(SesiUjian::class, 'sesi_pesertas', 'peserta_id', 'sesi_id')->withPivot('status');
  }
}
