<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kenakalan extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'tanggal',
        'jenis',
        'keterangan',
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
