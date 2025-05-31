<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Staff;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Kewenangan;

class StaffController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() 
    {
        $user = Auth::user();
        if (!$user || $user->role !== 'lembaga') {
            return redirect()->route('dashboard')->with('error', 'Unauthorized');
        }
    
        // Mengambil staff dengan kewenangans yang statusnya aktif atau tidak aktif
        $staff = Staff::with('kewenangans')
        ->where('lembaga_id', $user->lembaga->id)
        ->get()
        ->map(function ($s) {
            return [
                'id' => $s->id,
                'nama_staff' => $s->nama_staff,
                'email' => $s->email,
                'kewenangans' => $s->kewenangans->map(function ($kewenangan) {
                    return [
                        'value' => $kewenangan->value,
                        'status' => $kewenangan->status, // 'aktif' atau 'tidak_aktif'
                    ];
                })->toArray(), // Sudah diubah ke array di sini
            ];
        });
    
        return Inertia::render('Role/Lembaga/Staff', [
            'staffs' => $staff ?? [] // Ubah 'staff' menjadi 'staffs'
        ]);
        
    
    }
    

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Role/Lembaga/Staff/Tambah');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        if (!$user || $user->role !== 'lembaga') {
            return redirect()->route('dashboard')->with('error', 'Unauthorized');
        }

        $request->validate([
            'nama_staff' => 'required|string|max:255',
            'email' => 'required|email|unique:staff,email',
        ]);

        Staff::create([
            'lembaga_id' => $user->lembaga->id,
            'nama_staff' => $request->nama_staff,
            'email' => $request->email,
        ]);

        return redirect()->route('staff.index')->with('success', 'Staff added successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = Auth::user();
        if (!$user || $user->role !== 'lembaga') {
            return redirect()->route('dashboard')->with('error', 'Unauthorized');
        }

        $staff = Staff::with('kewenangans')->where('id', $id)->where('lembaga_id', $user->lembaga->id)->first();
        if (!$staff) {
            return redirect()->route('staff.index')->with('error', 'Staff not found');
        }

        return Inertia::render('Role/Lembaga/Staff/Edit', [
            'staff' => $staff
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return $this->show($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = Auth::user();
        if (!$user || $user->role !== 'lembaga') {
            return redirect()->route('dashboard')->with('error', 'Unauthorized');
        }

        $staff = Staff::where('id', $id)->where('lembaga_id', $user->lembaga->id)->first();
        if (!$staff) {
            return redirect()->route('staff.index')->with('error', 'Staff not found');
        }

        $request->validate([
            'nama_staff' => 'required|string|max:255',
            'email' => 'required|email|unique:staff,email,' . $id,
        ]);

        $staff->update([
            'nama_staff' => $request->nama_staff,
            'email' => $request->email,
        ]);

        return redirect()->route('staff.index')->with('success', 'Staff updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = Auth::user();
        if (!$user || $user->role !== 'lembaga') {
            return redirect()->route('staff.index')->with('error', 'Unauthorized');
        }

        $staff = Staff::where('id', $id)->where('lembaga_id', $user->lembaga->id)->first();
        if (!$staff) {
            return redirect()->route('staff.index')->with('error', 'Staff not found');

        }
        $staff->user()->delete(); 
        $staff->delete();
        return redirect()->route('staff.index')->with('success', 'Staff deleted successfully');
    }

    public function updateStatusKewenangan(Request $request)
    {
        $request->validate([
            'staff_id' => 'required|exists:staff,id',
            'value' => 'required|string',
        ]);
    
        // Cari kewenangan berdasarkan staff_id dan value
        $kewenangan = Kewenangan::where('staff_id', $request->staff_id)
            ->where('value', $request->value)
            ->first();
    
        if (!$kewenangan) {
            return redirect()->route('staff.index')->with('error', 'Gagal! Kewenangan tidak ditemukan.');
        }
    
        // Toggle status
        $kewenangan->status = $kewenangan->status === 'aktif' ? 'tidak_aktif' : 'aktif';
        $kewenangan->save();
    
        return redirect()->route('staff.index')->with('success', 'Status kewenangan berhasil diperbarui.');
    }
    
    
}
