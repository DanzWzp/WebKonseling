<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('kenakalans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->onDelete('cascade');
            $table->date('tanggal');
            $table->string('jenis');
            $table->text('keterangan')->nullable();
            $table->json('foto')->nullable();
            $table->timestamps();
        });
    }

};