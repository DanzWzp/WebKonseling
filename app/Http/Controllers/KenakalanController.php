<?php


namespace App\Http\Controllers;

use App\Models\Kenakalan;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;


class KenakalanController extends Controller
{
    public function index()
    {
        return Inertia::render('Kenakalan', [
            'students' => Student::select('id', 'name')->get(),
            'list' => Kenakalan::with('student')->latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'student_id' => 'required|exists:students,id',
            'tanggal' => 'required|date',
            'jenis' => 'required|string',
            'keterangan' => 'nullable|string',
            'foto.*' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $fotoPaths = [];
        if ($request->hasFile('foto')) {
            foreach ($request->file('foto') as $file) {
                $fotoPaths[] = $file->store('kenakalan', 'public');
            }
        }

        $data['foto'] = $fotoPaths;

        Kenakalan::create($data);

        return back()->with('success', 'Data kenakalan berhasil disimpan.');
    }

    public function update(Request $request, $id)
    {
        $kenakalan = Kenakalan::findOrFail($id);

        $data = $request->validate([
            'student_id' => 'required|exists:students,id',
            'tanggal' => 'required|date',
            'jenis' => 'required|string',
            'keterangan' => 'nullable|string',
            'foto.*' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $fotoPaths = $kenakalan->foto ?? [];

        if ($request->hasFile('foto')) {
            foreach ($request->file('foto') as $file) {
                $fotoPaths[] = $file->store('kenakalan', 'public');
            }
        }

        $data['foto'] = $fotoPaths;

        $kenakalan->update($data);

        return back()->with('success', 'Data kenakalan berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $kenakalan = Kenakalan::findOrFail($id);

        if ($kenakalan->foto && is_array($kenakalan->foto)) {
            foreach ($kenakalan->foto as $path) {
                Storage::disk('public')->delete($path);
            }
        }

        $kenakalan->delete();

        return back()->with('success', 'Data kenakalan berhasil dihapus.');
    }

    public function export($id)
    {
        $kenakalan = Kenakalan::with('student')->findOrFail($id);

        $pdf = Pdf::loadView('pdf.kenakalan', ['kenakalan' => $kenakalan]);
        return $pdf->download('kenakalan-' . $kenakalan->student->name . '.pdf');
    }
}
