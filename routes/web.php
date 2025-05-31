<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\{
    ProfileController,
    FiturController,
    CaptchaController,
    GoogleController,
    LembagaController,
    LoginController,
    StaffController,
    PesertaController,
    PaketSoalController,
    UjianController,
    SoalController,
    SoalImportController,
    SesiUjianController,
    PengawasUjianController,
    UjianPesertaController





};


// Halaman Utama
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Dashboard (Hanya untuk pengguna yang terautentikasi)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Profile (Hanya untuk pengguna yang login)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Halaman Autentikasi
Route::get('/konfirmasi', fn() => Inertia::render('Auth/Konfirmasi'));
Route::get('/daftar', fn() => Inertia::render('Auth/Daftar'));

// =========================
// Rute Khusus Berdasarkan Role
// =========================

// PESERTA (Hanya untuk role 'peserta')
Route::middleware(['auth', 'role:peserta'])->group(function () {
    // Route::get('/peserta', fn() => Inertia::render('Role/Peserta/Peserta'));
    Route::get('/peserta', [UjianPesertaController::class, 'index'])->name('pesertaujian.index');
    Route::get('/peserta/detail/{id}', [UjianPesertaController::class, 'show'])->name('show.index');
    Route::get('/peserta/ujian/{id}', [UjianPesertaController::class, 'detailUjian'])->name('ujian.peserta');
    // Route::get('/peserta/ujian', fn() => Inertia::render('Role/Peserta/Ujian'));
    Route::post('/ujian/simpan-jawaban', [UjianPesertaController::class, 'simpanJawaban'])->name('ujian.simpanJawaban');
    Route::post('/ujian/submit', [UjianPesertaController::class, 'submitUjian'])->name('ujian.submit');
    Route::get('/ujian/hitung-skor/{ujian_id}/{peserta_id}', [UjianPesertaController::class, 'hitungSkor'])->name('ujian.hitungSkor');
});

// ADMIN (Hanya untuk role 'admin')
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin', fn() => Inertia::render('Role/Admin/Dashboard'));
    Route::get('/admin/lembaga', fn() => Inertia::render('Role/Admin/Lembaga'));
    Route::get('/admin/fitur', fn() => Inertia::render('Role/Admin/Fitur'));
    Route::get('/admin/fitur/tambah', fn() => Inertia::render('Role/Admin/Fitur/Tambah'));
    Route::get('/admin/aboutus', fn() => Inertia::render('Role/Admin/Aboutus'));
    Route::get('/admin/keunggulan', fn() => Inertia::render('Role/Admin/Keunggulan'));
    Route::get('/admin/testimoni', fn() => Inertia::render('Role/Admin/Testimoni'));
    Route::get('/admin/pembayaran', fn() => Inertia::render('Role/Admin/Pembayaran'));
    Route::get('/admin/pembayaran/edit', fn() => Inertia::render('Role/Admin/Pembayaran/Edit'));
});

// LEMBAGA (Hanya untuk role 'lembaga')
Route::middleware(['auth', 'role:lembaga'])->group(function () {
    Route::get('/lembaga', fn() => Inertia::render('Role/Lembaga/Dashboard'))->name('lembaga.dashboard');
    Route::get('/lembaga/staff', [StaffController::class, 'index'])->name('staff.index');
    Route::get('/lembaga/staff/tambah', [StaffController::class, 'create'])->name('staff.create');
    Route::post('/lembaga/staff', [StaffController::class, 'store'])->name('staff.store');
    Route::get('/lembaga/staff/{id}', [StaffController::class, 'show'])->name('staff.show');
    Route::get('/lembaga/staff/{id}/edit', [StaffController::class, 'edit'])->name('staff.edit');
    Route::put('/lembaga/staff/{id}', [StaffController::class, 'update'])->name('staff.update');
    Route::delete('/lembaga/staff/{id}', [StaffController::class, 'destroy'])->name('staff.destroy');

    // Peserta Routes
    Route::get('/lembaga/peserta', [PesertaController::class, 'index'])->name('peserta.index');
    Route::get('/lembaga/peserta/import', fn() => Inertia::render('Role/Lembaga/Peserta/Import'))->name('peserta.import');
    Route::post('/peserta/import', [PesertaController::class, 'import'])->name('store.import');
    Route::get('/lembaga/peserta/tambah', [PesertaController::class, 'create'])->name('peserta.create');
    Route::post('/lembaga/peserta', [PesertaController::class, 'store'])->name('peserta.store');
    Route::get('/lembaga/peserta/{id}/edit', [PesertaController::class, 'edit'])->name('peserta.edit');
    Route::put('/lembaga/peserta/{id}', [PesertaController::class, 'update'])->name('peserta.update');
    Route::delete('/lembaga/peserta/{id}', [PesertaController::class, 'destroy'])->name('peserta.destroy');
    Route::delete('/lembaga/peserta', [PesertaController::class, 'destroyAll'])->name('peserta.destroyAll');
    ///PAKETSOAL//
    Route::get('/lembaga/paketsoal', [PaketSoalController::class, 'index'])->name('paket.index');
    Route::post('lembaga/paketsoal', [PaketSoalController::class, 'store'])->name('paketsoal.store');
    Route::get('lembaga/paketsoal/{id}/edit', [PaketSoalController::class, 'edit'])->name('paketsoal.edit');
    Route::put('lembaga/paketsoal/{id}', [PaketSoalController::class, 'update'])->name('paketsoal.update');
    Route::delete('lembaga/paketsoal/{id}', [PaketSoalController::class, 'destroy'])->name('paketsoal.destroy');
    Route::get('/lembaga/paketsoal/tambah', fn() => Inertia::render('Role/Lembaga/PaketSoal/Tambah'));
    Route::get('/lembaga/paketsoal/edit', fn() => Inertia::render('Role/Lembaga/PaketSoal/Edit'));
    ////SOAL///
    Route::post('/soal/store', [SoalController::class, 'store'])->name('soal.store');
    Route::get('/lembaga/paketsoal/{id}/show', [SoalController::class, 'show'])->name('soal.show');
    Route::delete('/lembaga/paketsoal/{paketSoal}/soal/{soal}', [SoalController::class, 'destroy'])->name('soal.destroy');
    Route::get('/lembaga/paketsoal/{paketSoal}/soal/{soal}/edit', [SoalController::class, 'edit'])->name('soal.edit');

    // Update soal
    Route::put('/lembaga/paketsoal/{paketSoal}/soal/{soal}', [SoalController::class, 'update'])->name('soal.update');

   
    Route::get('/lembaga/paketsoal/soal/{id}', function ($id) {
        return Inertia::render('Role/Lembaga/PaketSoal/Soal', [
            'id' => $id, // Kirim ID ke frontend
        ]);
    });
    ///EXCEL//
    Route::get('/lembaga/paketsoal/soal/{paketSoal}/import', [SoalImportController::class, 'show'])->name('import.excel');
    Route::post('/import-excel', [SoalImportController::class, 'importExcel'])->name('import.soal');
    // Route::post('/import-word', [SoalImportController::class, 'importWord'])->name('import.word');

    ///SESI//
    Route::get('/lembaga/sesi', [SesiUjianController::class, 'index'])->name('sesi_ujian.index');
    Route::get('/lembaga/sesi/tambah', [SesiUjianController::class, 'create'])->name('sesi_ujian.create');
    Route::post('/lembaga/sesi', [SesiUjianController::class, 'store'])->name('sesi_ujian.store');
    Route::get('/lembaga/sesi/{sesiUjian}/show', [SesiUjianController::class, 'show'])->name('sesi_ujian.show');
    Route::get('/lembaga/sesi/{sesiUjian}/edit', [SesiUjianController::class, 'edit'])->name('sesi_ujian.edit');
    Route::put('/lembaga/sesi/{sesiUjian}', [SesiUjianController::class, 'update'])->name('sesi_ujian.update');
    Route::delete('/lembaga/sesi/{sesiUjian}', [SesiUjianController::class, 'destroy'])->name('sesi_ujian.destroy');

    

    Route::patch('/sesi-ujian/{id}/set-status', [SesiUjianController::class, 'setPesertaStatus'])
    ->name('sesi_ujian.set_status');

    // Route::get('/lembaga/pengawas', fn() => Inertia::render('Role/Lembaga/Pengawas'));
    Route::get('/lembaga/pengawas', [PengawasUjianController::class, 'index'])->name('pengawas.index');
    Route::get('/lembaga/pengawas/{sesiUjian}/show', [PengawasUjianController::class, 'show'])->name('pengawas.show');
    Route::get('/lembaga/laporan', fn() => Inertia::render('Role/Lembaga/Laporan'));
    Route::get('/lembaga/belipoin', fn() => Inertia::render('Role/Lembaga/Belipoin'));
    Route::get('/lembaga/belipoin/pilih', fn() => Inertia::render('Role/Lembaga/BeliPoin/Pilih'));

    //post//
    Route::post('/staff-store', [LembagaController::class, 'storeStaff'])->name('staff.store');
    Route::post('/peserta-store', [LembagaController::class, 'storePeserta'])->name('peserta.store');
    Route::patch('/lembaga/staff/update-status', [StaffController::class, 'updateStatusKewenangan'])->name('staff.update-status');
});

// STAFF (Hanya untuk role 'staff')
Route::middleware(['auth', 'role:staff'])->group(function () {
    Route::get('/staff', fn() => Inertia::render('Role/Staff/Dashboard'));
});

// =========================
// CAPTCHA
// =========================
Route::get('/captcha-image', [CaptchaController::class, 'getCaptchaImage'])->name('captcha-image');
Route::get('/captcha/{config?}', fn($config = 'default') => Captcha::create($config))->name('captcha');
Route::post('/verify-captcha', [CaptchaController::class, 'verifyCaptcha']);

// =========================
// Autentikasi Google
// =========================
Route::get('auth/google', [GoogleController::class, 'googlepage'])->name('auth.google');
Route::get('auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);

/**
 * Routes untuk lembaga & autentikasi
 */
Route::post('/lembaga/register', [LembagaController::class, 'store']);
Route::post('/login/role', [LoginController::class, 'login']);
Route::get('/lembaga/jenis', [LembagaController::class, 'getJenisLembaga']);
Route::get('/kabupaten/kota', [LembagaController::class, 'getKabupatenKota']);


Route::get('/ujian/koreksi/{id}', [UjianController::class, 'koreksiOtomatis']);


// =========================
// Rute Otentikasi Laravel
// =========================
require __DIR__.'/auth.php';
