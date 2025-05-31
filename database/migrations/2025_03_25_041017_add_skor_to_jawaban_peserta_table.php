<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSkorToJawabanPesertaTable extends Migration
{
    public function up()
    {
        Schema::table('jawaban_peserta', function (Blueprint $table) {
            $table->integer('skor')->nullable(); // Menambahkan kolom skor
        });
    }

    public function down()
    {
        Schema::table('jawaban_peserta', function (Blueprint $table) {
            $table->dropColumn('skor'); // Menghapus kolom skor jika migrasi dibatalkan
        });
    }
}