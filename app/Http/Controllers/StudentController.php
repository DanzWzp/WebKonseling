<?php

namespace App\Http\Controllers;

use App\Models\Student;
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

        return redirect()->back();
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

        // Jika ada file foto baru, simpan dan hapus foto lama
        if ($request->hasFile('photo')) {
            if ($student->photo) {
                Storage::disk('public')->delete($student->photo);
            }
            $data['photo'] = $request->file('photo')->store('students', 'public');
        } else {
            // Jika tidak ada file baru, gunakan foto lama
            $data['photo'] = $student->photo;
        }

        $student->update($data);

        return redirect()->back();
    }

    public function destroy(Student $student)
    {
        if ($student->photo) {
            Storage::disk('public')->delete($student->photo);
        }

        $student->delete();

        return redirect()->back();
    }
    public function export(Student $student)
    {
        $pdf = Pdf::loadView('pdf.student', compact('student'));
        return $pdf->download('data-siswa-' . $student->name . '.pdf');
    }

}
