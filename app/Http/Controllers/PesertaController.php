<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Peserta;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Imports\PesertaImport; // Untuk proses impor peserta
use Maatwebsite\Excel\Facades\Excel; // Untuk fitur import Excel

use Illuminate\Support\Facades\Redirect;

class PesertaController extends Controller
{
    /**
     * Menampilkan daftar peserta.
     */
    public function index()
    {
        $peserta = Peserta::where('lembaga_id', Auth::user()->lembaga_id)->get();
        $peserta = Peserta::all();
        return Inertia::render('Role/Lembaga/Peserta', [
            'pesertas' => $peserta
        ]);
    }

    /**
     * Menampilkan form tambah peserta.
     */
    public function create()
    {
        return Inertia::render('Role/Lembaga/Peserta/Tambah');
    }

    /**
     * Menyimpan data peserta baru.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama_peserta' => 'required|string|max:255',
            'email' => 'required|email|unique:pesertas,email',
            'no_peserta' => 'required|string|unique:pesertas,no_peserta',
            'kelompok' => 'required|string|max:50',
        ]);

        Peserta::create([
            'user_id' => Auth::id(),
            'lembaga_id' => Auth::user()->lembaga_id,
            'nama_peserta' => $request->nama_peserta,
            'email' => $request->email,
            'no_peserta' => $request->no_peserta,
            'kelompok' => $request->kelompok,
        ]);

        return Redirect::route('peserta.index')->with('success', 'Peserta berhasil ditambahkan.');
    }

    /**
     * Menampilkan detail peserta.
     */
    public function show($id)
    {
        $peserta = Peserta::findOrFail($id);
        return Inertia::render('Role/Lembaga/Peserta/Show', compact('peserta'));
    }

    /**
     * Menampilkan form edit peserta.
     */
    public function edit($id)
    {
        $peserta = Peserta::findOrFail($id);
        return Inertia::render('Role/Lembaga/Peserta/Edit', compact('peserta'));
    }

    /**
     * Mengupdate data peserta.
     */
    public function update(Request $request, $id)
    {
        $peserta = Peserta::findOrFail($id);

        $request->validate([
            'nama_peserta' => 'required|string|max:255',
            'email' => 'required|email|unique:pesertas,email,' . $peserta->id,
            'no_peserta' => 'required|string|unique:pesertas,no_peserta,' . $peserta->id,
            'kelompok' => 'required|string|max:50',
        ]);

        $peserta->update([
            'nama_peserta' => $request->nama_peserta,
            'email' => $request->email,
            'no_peserta' => $request->no_peserta,
            'kelompok' => $request->kelompok,
        ]);

        return Redirect::route('peserta.index')->with('success', 'Peserta berhasil diperbarui.');
    }

    /**
     * Menghapus peserta.
     */
    public function destroy($id)
    {
        $peserta = Peserta::findOrFail($id);
        $peserta->user()->delete(); 
        $peserta->delete();

        return Redirect::route('peserta.index')->with('success', 'Peserta berhasil dihapus.');
    }

    public function destroyAll()
    {
        // Hapus semua peserta satu per satu agar event delete tetap terpanggil
        Peserta::all()->each(function ($peserta) {
            $peserta->user()->delete(); // Hapus user terkait jika ada
            $peserta->delete(); // Hapus peserta
        });
    
        return Redirect::route('peserta.index')->with('success', 'Semua peserta dan relasi terkait berhasil dihapus.');
    }
    
    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx|max:2048', 
        ]);

        Excel::import(new PesertaImport, $request->file('file'));

        return Redirect::route('peserta.index')->with('success');
    }
}
