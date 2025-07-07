<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class StudentController extends Controller
{
    // Tampil semua siswa di Dashboard
    public function index()
    {
        $students = Student::latest()->get();
        return Inertia::render('Dashboard', [
            'students' => $students,
        ]);
    }

    // Tambah siswa
    public function store(Request $request)
    {
        $validated = $request->validate([
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'name' => 'required|string|max:255',
            'birth_place' => 'required|string|max:255',
            'birth_date' => 'required|date',
            'gender' => 'required|in:L,P',
            'address' => 'required|string|max:255',
            'school_origin' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'parent_name' => 'required|string|max:255',
            'living_with' => 'required|string|max:255',
            'achievement' => 'nullable|string|max:255',
        ]);

        if ($request->hasFile('photo')) {
            $validated['photo'] = $request->file('photo')->store('photos', 'public');
        }

        Student::create($validated);

        return redirect()->route('students.index')->with('success', 'Data siswa berhasil ditambahkan.');
    }

    // Update siswa (log sebelum dan sesudah update)
    public function update(Request $request, Student $student)
    {
        \Log::info('RAW REQUEST DATA:', $request->all());
        $validated = $request->validate([
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'name' => 'required|string|max:255',
            'birth_place' => 'required|string|max:255',
            'birth_date' => 'required|date',
            'gender' => 'required|in:L,P',
            'address' => 'required|string|max:255',
            'school_origin' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'parent_name' => 'required|string|max:255',
            'living_with' => 'required|string|max:255',
            'achievement' => 'nullable|string|max:255',
        ]);

        \Log::info('VALIDATED DATA:', $validated);

        // Update foto jika ada file baru
        if ($request->hasFile('photo')) {
            if ($student->photo) {
                Storage::disk('public')->delete($student->photo);
            }
            $validated['photo'] = $request->file('photo')->store('photos', 'public');
        }

        $student->update($validated);

        \Log::info('STUDENT AFTER UPDATE:', $student->fresh()->toArray());

         return redirect()->route('students.index')->with('success', 'Data siswa berhasil diupdate.');
    }


    // Hapus siswa
    public function destroy(Student $student)
    {
        if ($student->photo) {
            Storage::disk('public')->delete($student->photo);
        }
        $student->delete();
        return redirect()->route('students.index')->with('success', 'Data siswa berhasil dihapus.');
    }
}
