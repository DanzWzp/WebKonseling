<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bimbingans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->onDelete('cascade');

            $table->date('tanggal');
            $table->integer('bolos')->default(0);
            $table->integer('terlambat_kelas')->default(0);
            $table->integer('terlambat_sekolah')->default(0);
            $table->integer('alpa')->default(0);

            $table->text('mapel_ringkasan')->nullable(); // contoh: "Matematika: Tuntas"
            $table->text('keterangan')->nullable();

            $table->json('foto_bimbingan')->nullable(); // simpan array nama file

            $table->timestamps();
        });
    }

};
