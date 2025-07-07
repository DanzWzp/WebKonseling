<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use Inertia\Inertia;
use App\Models\Student;

// Home page (public)
Route::get('/', function () {
    return inertia('Home');
})->name('home');

// Semua fitur hanya untuk user login
Route::middleware(['auth'])->group(function () {
    // ✅ Dashboard hanya tampilan awal setelah login
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // ✅ Halaman utama Data Siswa
    Route::get('/students', [StudentController::class, 'index'])->name('students.index');
    Route::get('/students/{student}/export', [StudentController::class, 'export'])->name('students.export');

    // ✅ CRUD siswa
    Route::post('students/{student}', [StudentController::class, 'update'])->name('students.update');
    Route::resource('students', StudentController::class)->except(['create', 'edit', 'show']);

});

// Auth routes (Breeze)
require __DIR__.'/auth.php';
