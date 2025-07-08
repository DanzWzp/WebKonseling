<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Bimbingan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class StudentController extends Controller
{
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

    public function exportFull($id)
    {
        $student = Student::findOrFail($id);
        $bimbingan = Bimbingan::where('student_id', $id)->get();

        $pdf = Pdf::loadView('pdf.full_student', compact('student', 'bimbingan'));
        return $pdf->download("laporan-konseling-{$student->name}.pdf");
    }

    public function export(Student $student)
    {
        $pdf = Pdf::loadView('pdf.student', compact('student'));
        return $pdf->download("data-siswa-{$student->name}.pdf");
    }
}
