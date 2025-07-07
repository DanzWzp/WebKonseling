<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'photo',
        'name',
        'birth_place',
        'birth_date',
        'gender',
        'address',
        'school_origin',
        'phone',
        'parent_name',
        'living_with',
        'achievement',
    ];
}
