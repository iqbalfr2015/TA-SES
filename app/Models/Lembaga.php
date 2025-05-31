<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lembaga extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'nama_lembaga',
        'alamat',
        'kabupaten',
        'jenis',
        'username',
        'email',
        'nama_lengkap',
        'whatsapp'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function staff()
    {
        return $this->hasMany(Staff::class, 'lembaga_id');
    }
}
