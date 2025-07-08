<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeVisit extends Model
{
    protected $fillable = [
        'student_id',
        'jumlah_visit',
        'permasalahan',
        'hasil',
        'foto',
    ];

    protected $casts = [
        'foto' => 'array',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
