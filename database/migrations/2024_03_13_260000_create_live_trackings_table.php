<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('live_tracking', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_komplain'); // Menambahkan kolom foreign key
            $table->unsignedBigInteger('id_status'); // Menambahkan kolom foreign key
            $table->timestamp('tanggal_sebelum_update')->nullable();
            $table->timestamp('tanggal_update')->nullable();

            $table->foreign('id_komplain')->references('id')->on('komplain');
            $table->foreign('id_status')->references('id')->on('status_komplain');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('live_trackings');
    }
};
