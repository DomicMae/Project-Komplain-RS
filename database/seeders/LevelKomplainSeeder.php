<?php

namespace Database\Seeders;
use App\Models\Level_komplain;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LevelKomplainSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Input data ke dalam tabel komplain secara manual
        Level_komplain::create([
            'namaLevel' => 'Tidak ada',
            'durasi' => '24:00:00',
            'deskripsiLevel' => 'Komplain telah masuk'
        ]);

        Level_komplain::create([
            'namaLevel' => 'Hijau',
            'durasi' => '168:00:00',
            'deskripsiLevel' => 'Komplain ini tidak menimbulkan kerugian berarti baik material maupun immaterial'
        ]);

        Level_komplain::create([
            'namaLevel' => 'Kuning',
            'durasi' => '72:00:00',
            'deskripsiLevel' => 'Komplain ini cenderung dengan pemberitaan media, potensi kerugian immaterial, dan lain-lain'
        ]);

        Level_komplain::create([
            'namaLevel' => 'Merah',
            'durasi' => '24:00:00',
            'deskripsiLevel' => 'Komplain ini cenderung berhubungan dengan polisi, pengadilan, kematian, mengancam sistem/kelangsungan organisasi, potensi kerugian material dan lain-lain'
        ]);

        Level_komplain::create([
            'namaLevel' => 'Selesai',
            'durasi' => '00:00:00',
            'deskripsiLevel' => 'Komplain telah selesai'
        ]);
    }
}
