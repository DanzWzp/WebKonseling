<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Bimbingan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Support\Facades\App;

class StudentController extends Controller
{
    public function __construct()
    {
        // Set lokal ke Indonesia untuk semua metode
        App::setLocale('id');
        setlocale(LC_TIME, 'id_ID');
        Carbon::setLocale('id');
    }

    public function index()
    {
        return Inertia::render('Student', [
            'students' => Student::all(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'photo' => 'nullable|image|max:2048',
            'name' => 'required|string|max:255',
            'birth_place' => 'required|string',
            'birth_date' => 'required|date',
            'gender' => 'required|string',
            'address' => 'required|string',
            'school_origin' => 'required|string',
            'phone' => 'required|string',
            'parent_name' => 'required|string',
            'living_with' => 'required|string',
            'achievement' => 'nullable|string',
        ]);

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('students', 'public');
        }

        Student::create($data);
        return redirect()->back()->with('success', 'Data siswa berhasil ditambahkan.');
    }

    public function update(Request $request, Student $student)
    {
        $data = $request->validate([
            'photo' => 'nullable|image|max:2048',
            'name' => 'required|string|max:255',
            'birth_place' => 'required|string',
            'birth_date' => 'required|date',
            'gender' => 'required|string',
            'address' => 'required|string',
            'school_origin' => 'required|string',
            'phone' => 'required|string',
            'parent_name' => 'required|string',
            'living_with' => 'required|string',
            'achievement' => 'nullable|string',
        ]);

        if ($request->hasFile('photo')) {
            if ($student->photo) {
                Storage::disk('public')->delete($student->photo);
            }
            $data['photo'] = $request->file('photo')->store('students', 'public');
        } else {
            $data['photo'] = $student->photo;
        }

        $student->update($data);
        return redirect()->back()->with('success', 'Data siswa berhasil diperbarui.');
    }

    public function destroy(Student $student)
    {
        if ($student->photo) {
            Storage::disk('public')->delete($student->photo);
        }

        $student->delete();
        return redirect()->back()->with('success', 'Data siswa berhasil dihapus.');
    }

    public function export(Student $student)
    {
        Carbon::setLocale('id'); // pastikan juga di sini
        $pdf = Pdf::loadView('pdf.student', compact('student'));
        return $pdf->download("data-siswa-{$student->name}.pdf");
    }

    public function exportFull($id) 
    {
        \Carbon\Carbon::setLocale('id');

        $student = Student::findOrFail($id);
        $bimbingan = \App\Models\Bimbingan::where('student_id', $id)->get();
        $homevisit = \App\Models\HomeVisit::where('student_id', $id)->get();
        $kenakalan = \App\Models\Kenakalan::where('student_id', $id)->get();

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf.full_student', compact(
            'student',
            'bimbingan',
            'homevisit',
            'kenakalan'
        ));

        return $pdf->download("laporan-konseling-{$student->name}.pdf");
    }

}
