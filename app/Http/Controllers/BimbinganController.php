<?php

namespace App\Http\Controllers;

use App\Models\Bimbingan;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Support\Facades\App;

class BimbinganController extends Controller
{
     public function __construct()
    {
        App::setLocale('id');
        setlocale(LC_TIME, 'id_ID');
        Carbon::setLocale('id');
    }

    public function index()
    {
        return Inertia::render('Bimbingan', [
            'students' => Student::select('id', 'name')->get(),
            'bimbinganList' => Bimbingan::with('student')
                ->latest()
                ->get()
                ->map(function ($b) {
                    return [
                        'id' => $b->id,
                        'student_id' => $b->student_id,
                        'student_name' => $b->student->name,
                        'date' => $b->tanggal,
                        'bolos' => $b->bolos,
                        'alpa' => $b->alpa,
                        'terlambat_kelas' => $b->terlambat_kelas,
                        'terlambat_sekolah' => $b->terlambat_sekolah,
                        'mapel_ringkasan' => $b->mapel_ringkasan,
                        'keterangan' => $b->keterangan,
                        'photos' => $b->foto_bimbingan,
                    ];
                }),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'student_id' => 'required|exists:students,id',
            'tanggal' => 'required|date',
            'bolos' => 'nullable|integer',
            'terlambat_kelas' => 'nullable|integer',
            'terlambat_sekolah' => 'nullable|integer',
            'alpa' => 'nullable|integer',
            'mapel_ringkasan' => 'nullable|string',
            'keterangan' => 'nullable|string',
            'foto_bimbingan.*' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $fotoPaths = [];

        if ($request->hasFile('foto_bimbingan')) {
            foreach ($request->file('foto_bimbingan') as $foto) {
                $fotoPaths[] = $foto->store('bimbingan', 'public');
            }
        }

        $data['foto_bimbingan'] = $fotoPaths;

        Bimbingan::create($data);

        return back()->with('success', 'Data bimbingan berhasil disimpan.');
    }

    public function update(Request $request, Bimbingan $bimbingan)
    {
        $data = $request->validate([
            'student_id' => 'required|exists:students,id',
            'tanggal' => 'required|date',
            'bolos' => 'nullable|integer',
            'terlambat_kelas' => 'nullable|integer',
            'terlambat_sekolah' => 'nullable|integer',
            'alpa' => 'nullable|integer',
            'mapel_ringkasan' => 'nullable|string',
            'keterangan' => 'nullable|string',
            'foto_bimbingan.*' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $fotoPaths = $bimbingan->foto_bimbingan ?? [];

        if ($request->hasFile('foto_bimbingan')) {
            foreach ($request->file('foto_bimbingan') as $foto) {
                $fotoPaths[] = $foto->store('bimbingan', 'public');
            }
        }

        $data['foto_bimbingan'] = $fotoPaths;

        $bimbingan->update($data);

        return back()->with('success', 'Data bimbingan berhasil diperbarui.');
    }

    public function destroy(Bimbingan $bimbingan)
    {
        // Hapus file lama dari storage
        if ($bimbingan->foto_bimbingan) {
            foreach ($bimbingan->foto_bimbingan as $foto) {
                Storage::disk('public')->delete($foto);
            }
        }

        $bimbingan->delete();

        return back()->with('success', 'Data bimbingan berhasil dihapus.');
    }

    public function export(Bimbingan $bimbingan)
    {
        $bimbingan->load('student');

        $pdf = Pdf::loadView('pdf.bimbingan', ['bimbingan' => $bimbingan]);
        return $pdf->download('bimbingan_' . $bimbingan->student->name . '.pdf');
    }
}
