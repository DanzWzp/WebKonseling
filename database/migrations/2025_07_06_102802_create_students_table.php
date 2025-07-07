<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('photo')->nullable();              // Foto profil
            $table->string('name');
            $table->string('birth_place');
            $table->date('birth_date');
            $table->enum('gender', ['L', 'P']);
            $table->string('address');
            $table->string('school_origin');
            $table->string('phone');
            $table->string('parent_name');
            $table->string('living_with');
            $table->string('achievement')->nullable();
            $table->timestamps();
        });
    }

};
