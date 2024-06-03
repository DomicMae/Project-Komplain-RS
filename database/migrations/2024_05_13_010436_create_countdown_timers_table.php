<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('countdown_timer', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_komplain'); // Menambahkan kolom foreign key
            $table->timestamp('tanggal_sebelum_update')->nullable();
            $table->timestamp('tanggal_update')->nullable();

            $table->foreign('id_komplain')->references('id')->on('komplain');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('countdown_timer');
    }
};
