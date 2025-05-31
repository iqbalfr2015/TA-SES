<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('staff', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lembaga_id')->constrained('lembagas')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('nama_staff')->nullable();
            $table->string('email')->unique();
            $table->timestamps();
        });

        Schema::create('kewenangans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('staff_id')->constrained('staff')->onDelete('cascade');
            $table->string('value');
            $table->enum('status', ['aktif', 'non_aktif'])->default('aktif');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('kewenangans');
        Schema::dropIfExists('staff');
    }
};
