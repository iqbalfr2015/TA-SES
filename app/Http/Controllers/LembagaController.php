<?php

namespace App\Http\Controllers;

use App\Models\Lembaga;
use App\Models\User;
use App\Models\Peserta;
use App\Models\Staff;
use App\Models\Kewenangan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Mews\Captcha\Facades\Captcha;
use Inertia\Inertia;

class LembagaController extends Controller {

                 //LEMBAGA//
    

    public function index() {
        $lembagas = Lembaga::all();
        return response()->json($lembagas);
    }


    public function show($id)
    {
        // Ambil user yang sedang login
        $user = Auth::user();
    
        // Cari lembaga berdasarkan ID
        $lembaga = Lembaga::select(
            'id', 
            'nama_lembaga', 
            'alamat', 
            'kabupaten', 
            'jenis', 
            'username', 
            'email', 
            'nama_lengkap', 
            'whatsapp'
        )->findOrFail($id);
    
        // Pastikan user hanya bisa melihat lembaganya sendiri
        if ($user->email !== $lembaga->email) {
            abort(403, 'Anda tidak memiliki akses ke lembaga ini.');
        }
    
        return Inertia::render('Role/Lembaga/Dashboard', [
            'lembaga' => $lembaga
        ]);
    }    

    
    

    public function store(Request $request) {
        $request->validate([
            'nama_lembaga' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'kabupaten' => 'required|string|max:255',
            'jenis' => 'required|string|max:225',
            'username' => 'required|string|max:255|unique:lembagas,username',
            'email' => 'required|string|email|max:255|unique:lembagas,email|unique:users,email',
            'nama_lengkap' => 'required|string|max:225',
            'whatsapp' => 'required|string|max:20',
            'captcha' => 'required|captcha',
        ]);
    
        // Generate password acak
        $password = Str::random(8);
    
        // Buat user untuk login
        $user = User::create([
            'name' => $request->nama_lengkap,
            'email' => $request->email,
            'password' => Hash::make($password),
            'role' => 'lembaga',
            'google_id' => null, 
        ]);
    
        // Simpan data ke tabel lembaga dengan user_id
        $lembaga = Lembaga::create([
            'nama_lembaga' => $request->nama_lembaga,
            'alamat' => $request->alamat,
            'kabupaten' => $request->kabupaten,
            'jenis' => $request->jenis,
            'username' => $request->username,
            'email' => $request->email,
            'nama_lengkap' => $request->nama_lengkap,
            'whatsapp' => $request->whatsapp,
            'user_id' => $user->id, // Simpan user_id
        ]);
    
        // Kirim email dengan kredensial login
        Mail::raw("Akun Anda telah dibuat. \nEmail: {$request->email} \nPassword: {$password}", function ($message) use ($request) {
            $message->to($request->email)
                ->subject('Akun Lembaga Anda');
        });
    
        return redirect()->route('login')->with('success', 'Pendaftaran berhasil! Cek email Anda untuk kredensial login.');
    }
    



    public function getJenisLembaga() {
        $jenis = [
            ['id' => 1, 'nama' => 'SD/Sederajat'],
            ['id' => 2, 'nama' => 'SMP/Sederajat'],
            ['id' => 3, 'nama' => 'SMA/Sederajat'],
            ['id' => 4, 'nama' => 'Perguruan Tinggi'],
            ['id' => 5, 'nama' => 'Perusahaan'],
        ];
        return response()->json($jenis);
    }

    public function getKabupatenKota() {
        $kabupatenKota = json_decode(file_get_contents(storage_path('app/kabupaten_kota.json')), true);
        return response()->json($kabupatenKota);
    }


    
    public function storeStaff(Request $request)
    {
        try {
            $user = auth()->user();
            if (!$user || $user->role !== 'lembaga') {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
    
            $lembaga = Lembaga::where('user_id', $user->id)->first();
            if (!$lembaga) {
                return response()->json(['message' => 'Lembaga tidak ditemukan atau belum terdaftar'], 404);
            }
    
            $validated = $request->validate([
                'nama_staff' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:staff,email|unique:users,email',
                'kewenangans' => 'required|array|min:1',
                'kewenangans.*' => 'string|in:peserta,paket_soal,sesi,pengawas',
            ]);
    
            $password = Str::random(8);
    
            $userStaff = User::create([
                'name' => $validated['nama_staff'],
                'email' => $validated['email'],
                'password' => Hash::make($password),
                'role' => 'staff',
            ]);
    
            $staff = Staff::create([
                'lembaga_id' => $lembaga->id,
                'nama_staff' => $validated['nama_staff'],
                'email' => $validated['email'],
                'user_id' => $userStaff->id,
            ]);
    
            // Semua kewenangan yang tersedia
            $allKewenangans = ['peserta', 'paket_soal', 'sesi', 'pengawas'];
    
            foreach ($allKewenangans as $kewenangan) {
                Kewenangan::create([
                    'staff_id' => $staff->id,
                    'value' => $kewenangan,
                    'status' => in_array($kewenangan, $validated['kewenangans']) ? 'aktif' : 'tidak_aktif',
                ]);
            }
    
            Mail::raw("Akun staff Anda telah dibuat.\nEmail: {$validated['email']}\nPassword: {$password}", function ($message) use ($validated) {
                $message->to($validated['email'])
                    ->subject('Akun Staff Anda');
            });
    
            return redirect()->route('staff.index')->with('success', 'Pendaftaran berhasil! Cek email Anda untuk kredensial login.');
    
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan, silakan coba lagi',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function storePeserta(Request $request) {
        $request->validate([
            'nama_peserta' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:pesertas,email|unique:users,email',
            'kelompok' => 'required|string|max:255',
         
        ]);
    
        // Ambil user yang sedang login
        $user = auth()->user();
    
        // Pastikan user adalah bagian dari lembaga
        $lembaga = Lembaga::where('user_id', $user->id)->first();
        if (!$lembaga) {
            return response()->json(['message' => 'Lembaga tidak ditemukan atau belum terdaftar'], 404);
        }
            // Generate nomor peserta (mulai dari 100 dan bertambah)
        $lastPeserta = Peserta::latest('id')->first();
        $noPesertaBaru = $lastPeserta ? str_pad($lastPeserta->id + 1, 8, '0', STR_PAD_LEFT) : '00000001';



    
        $password = Str::random(8);
    
        $userPeserta = User::create([
            'name' => $request->nama_peserta,
            'email' => $request->email,
            'password' => Hash::make($password),
            'role' => 'peserta',
        ]);
    
        $peserta = Peserta::create([
            'user_id' => $userPeserta->id,
            'lembaga_id' => $lembaga->id, // Menyimpan lembaga_id
            'nama_peserta' => $request->nama_peserta,
            'email' => $request->email,
            'no_peserta' => $noPesertaBaru, // No peserta otomatis
            'kelompok' => $request->kelompok,
        
        ]);
    
        Mail::raw("Akun peserta Anda telah dibuat.\nEmail: {$request->email}\nPassword: {$password}", function ($message) use ($request) {
            $message->to($request->email)
                ->subject('Akun Peserta Anda');
        });
    
        return redirect()->route('peserta.index')->with('success', 'Pendaftaran peserta berhasil! Cek email untuk kredensial login.');
    }
    
    
}








