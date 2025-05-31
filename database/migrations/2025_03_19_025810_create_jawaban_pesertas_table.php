<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('jawaban_peserta', function (Blueprint $table) {
            $table->id();
            $table->foreignId('peserta_id')->constrained('pesertas')->onDelete('cascade');
            $table->foreignId('ujian_id')->constrained('sesi_ujians')->onDelete('cascade');
            $table->foreignId('soal_id')->constrained('soals')->onDelete('cascade');
            $table->foreignId('jawaban_id')->nullable('jawabans')->constrained()->onDelete('set null');
            $table->text('jawaban_text')->nullable();
            $table->boolean('benar')->default(false);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('jawaban_peserta');
    }

};
