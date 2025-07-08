<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $students = Student::all();

        $stats = [
            'total' => $students->count(),
            'male' => $students->where('gender', 'L')->count(),
            'female' => $students->where('gender', 'P')->count(),
            'withAchievement' => $students->whereNotNull('achievement')->where('achievement', '!=', '')->count(),
        ];

        return Inertia::render('Dashboard', [
            'students' => $students,
            'stats' => $stats,
        ]);
    }
}
