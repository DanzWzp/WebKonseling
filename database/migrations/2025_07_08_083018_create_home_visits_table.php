<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
{
    Schema::create('home_visits', function (Blueprint $table) {
        $table->id();
        $table->foreignId('student_id')->constrained()->onDelete('cascade');
        $table->unsignedInteger('jumlah_visit');
        $table->text('permasalahan');
        $table->text('hasil');
        $table->json('foto')->nullable();
        $table->timestamps();
    });
}

};
