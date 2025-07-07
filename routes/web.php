<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;

// Home page (public)
Route::get('/', function () {
    return inertia('Home');
})->name('home');

// Semua fitur siswa & dashboard hanya untuk user login
Route::middleware(['auth'])->group(function () {
    // Dashboard = list siswa
    Route::get('/dashboard', [StudentController::class, 'index'])->name('dashboard');

    // CRUD siswa
    Route::post('students/{student}', [StudentController::class, 'update'])->name('students.update');
    Route::resource('students', StudentController::class)->except(['create', 'edit', 'show']);

});

// Auth routes (Breeze)
require __DIR__.'/auth.php';
