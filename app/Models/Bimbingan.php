<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bimbingan extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'tanggal',
        'bolos',
        'terlambat_kelas',
        'terlambat_sekolah',
        'alpa',
        'mapel_ringkasan',
        'keterangan',
        'foto_bimbingan',
    ];

    protected $casts = [
        'foto_bimbingan' => 'array',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}

