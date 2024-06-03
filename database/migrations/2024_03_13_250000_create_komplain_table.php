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
        Schema::create('komplain', function (Blueprint $table) {
            $table->id();
            $table->string('jenis_pasien');
            $table->string('judul');
            $table->string('nama');
            $table->string('no_telp');
            $table->string('unit');
            $table->date('tanggal_kejadian');
            $table->time('waktu_kejadian');
            $table->string('tempat_kejadian');
            $table->string('kronologi');
            $table->string('gambar');
            $table->string('kode')->nullable(); // Menjadikan kolom 'kode' dapat menerima nilai NULL;
            $table->string('penerima')->nullable();
            $table->string('laporan')->nullable();
            $table->unsignedBigInteger('id_level'); // Menambahkan kolom foreign key
            $table->unsignedBigInteger('id_status'); // Menambahkan kolom foreign key
            $table->string('keterangan')->nullable();
            $table->timestamps();

            $table->foreign('id_status')->references('id')->on('status_komplain');
            $table->foreign('id_level')->references('id')->on('level_komplain');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('komplain');
    }
};
