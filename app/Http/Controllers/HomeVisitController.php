<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\HomeVisit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;


class HomeVisitController extends Controller
{
    public function index()
    {
        return Inertia::render('HomeVisit', [
            'students' => Student::select('id', 'name')->get(),
            'homeVisits' => HomeVisit::with('student')->latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'student_id' => 'required|exists:students,id',
            'jumlah_visit' => 'required|integer|min:1',
            'permasalahan' => 'required|string',
            'hasil' => 'required|string',
            'foto.*' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $fotoPaths = [];
        if ($request->hasFile('foto')) {
            foreach ($request->file('foto') as $file) {
                $fotoPaths[] = $file->store('homevisit', 'public');
            }
        }

        $data['foto'] = $fotoPaths;

        HomeVisit::create($data);

        return back()->with('success', 'Data Home Visit berhasil disimpan.');
    }

    public function update(Request $request, HomeVisit $homeVisit)
    {
        $data = $request->validate([
            'student_id' => 'required|exists:students,id',
            'jumlah_visit' => 'required|integer|min:1',
            'permasalahan' => 'required|string',
            'hasil' => 'required|string',
            'foto.*' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $fotoPaths = $homeVisit->foto ?? [];

        if ($request->hasFile('foto')) {
            foreach ($request->file('foto') as $file) {
                $fotoPaths[] = $file->store('homevisit', 'public');
            }
        }

        $data['foto'] = $fotoPaths;

        $homeVisit->update($data);

        return back()->with('success', 'Data Home Visit berhasil diperbarui.');
    }

    public function destroy(HomeVisit $homeVisit)
    {
        if ($homeVisit->foto) {
            foreach ($homeVisit->foto as $foto) {
                Storage::disk('public')->delete($foto);
            }
        }

        $homeVisit->delete();

        return back()->with('success', 'Data Home Visit berhasil dihapus.');
    }
    
    public function export(HomeVisit $homeVisit)
    {
        $homeVisit->load('student');
        $pdf = Pdf::loadView('pdf.home_visit', ['visit' => $homeVisit]);
        return $pdf->download('home-visit-' . $homeVisit->student->name . '.pdf');
    }

}
