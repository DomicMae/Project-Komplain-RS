<?php

namespace Database\Seeders;

use App\Models\Status_Komplain;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Input data ke dalam tabel komplain secara manual
        Status_Komplain::create([
            'nama_status' => 'Komplain telah masuk'
        ]);

        Status_Komplain::create([
            'nama_status' => 'Komplain telah diproses'
        ]);

        Status_Komplain::create([
            'nama_status' => 'Komplain sedang ditindaklanjuti'
        ]);

        Status_Komplain::create([
            'nama_status' => 'Komplain telah berhasil ditindaklanjuti'
        ]);

        Status_Komplain::create([
            'nama_status' => 'Komplain telah selesai'
        ]);
        Status_Komplain::create([
            'nama_status' => 'Komplain sedang diulang'
        ]);
    }
}
