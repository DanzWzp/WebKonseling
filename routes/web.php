<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\BimbinganController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeVisitController;
use App\Http\Controllers\KenakalanController;
use Inertia\Inertia;



// 🌐 Halaman publik
Route::get('/', function () {
    return inertia('Home');
})->name('home');

// 🛡 Semua fitur di bawah hanya untuk user login
Route::middleware(['auth'])->group(function () {

    // ✅ Halaman Dashboard utama (menampilkan data siswa)
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // ✅ Halaman Data Siswa (CRUD)
    Route::get('/students', [StudentController::class, 'index'])->name('students.index');
    Route::post('/students/{student}', [StudentController::class, 'update'])->name('students.update');
    Route::resource('students', StudentController::class)->except(['create', 'edit', 'show']);
    Route::get('/students/{student}/export', [StudentController::class, 'export'])->name('students.export');

    // ✅ Export lengkap Data Siswa + Bimbingan per siswa
    Route::get('/export/full/student/{id}', [StudentController::class, 'exportFull'])->name('export.student.full');

    // ✅ Halaman Data Bimbingan
    Route::get('/bimbingan', [BimbinganController::class, 'index'])->name('bimbingan.index');
    Route::post('/bimbingan', [BimbinganController::class, 'store'])->name('bimbingan.store');
    Route::post('/bimbingan/{bimbingan}', [BimbinganController::class, 'update'])->name('bimbingan.update');
    Route::delete('/bimbingan/{bimbingan}', [BimbinganController::class, 'destroy'])->name('bimbingan.destroy');
    Route::get('/bimbingan/{bimbingan}/export', [BimbinganController::class, 'export'])->name('bimbingan.export');

});

// Home Visit

Route::middleware(['auth'])->group(function () {
    Route::get('/home-visit', [HomeVisitController::class, 'index'])->name('homevisit.index');
    Route::post('/home-visit', [HomeVisitController::class, 'store'])->name('homevisit.store');
    Route::post('/home-visit/{homeVisit}', [HomeVisitController::class, 'update'])->name('homevisit.update');
    Route::delete('/home-visit/{homeVisit}', [HomeVisitController::class, 'destroy'])->name('homevisit.destroy');
    Route::get('/home-visit/{homeVisit}/export', [HomeVisitController::class, 'export'])->name('homevisit.export');
});

// kenakalan
Route::middleware(['auth'])->group(function () {
    Route::get('/kenakalan', [KenakalanController::class, 'index'])->name('kenakalan.index');
    Route::post('/kenakalan', [KenakalanController::class, 'store'])->name('kenakalan.store');
    Route::post('/kenakalan/{id}', [KenakalanController::class, 'update'])->name('kenakalan.update');
    Route::delete('/kenakalan/{id}', [KenakalanController::class, 'destroy'])->name('kenakalan.destroy');
    Route::get('/kenakalan/{id}/export', [KenakalanController::class, 'export'])->name('kenakalan.export');

});



// Auth bawaan (Laravel Breeze/Fortify)
require __DIR__.'/auth.php';
