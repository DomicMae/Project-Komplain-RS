<?php

namespace App\Http\Controllers;

use App\Mail\CountdownCSO;
use App\Mail\NotifikasiBidangKomplainMasuk;
use App\Mail\NotifikasiKomplainLamaMasuk;
use App\Models\Komplain;
use App\Mail\NotifikasiKomplainMasuk;
use App\Mail\NotifikasiRuangKomplainMasuk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class kirimEmailController extends Controller
{
    public function index(){
        $komplains = Komplain::latest()->first();
        // $komplains = "<p><b>Halo, BJORKA</b></p>";
        $data_email = [
            'jenis_pasien' => $komplains->jenis_pasien,
            'nama' => $komplains->nama,
            'judul' => $komplains->judul,
            'kronologi' => $komplains->kronologi,
        ];

        // Catat waktu mulai pengiriman email
        $start_time = now();
        Log::info('NotifikasiKomplainMasuk run');

        Mail::to(["ardontallan0904@gmail.com", "ardonyunors147@gmail.com","marketingrsgr@gmail.com", "csorgsr@gmai.com"])->send(new NotifikasiKomplainMasuk($data_email));

        // Catat waktu selesai pengiriman email
        $end_time = now();
        Log::info('NotifikasiKomplainMasuk done');
        
        // Hitung waktu eksekusi
        $execution_time = $end_time->diffInSeconds($start_time);
        Log::info("Execution time: {$execution_time} seconds");
        return 'Sukses mengirimkan email';
    }

    public function returnToCso(){
        $komplains = Komplain::latest()->first();
        $data_email = [
            'jenis_pasien' => $komplains->jenis_pasien,
            'nama' => $komplains->nama,
            'judul' => $komplains->judul,
            'kronologi' => $komplains->kronologi,
            'keterangan' => $komplains->keterangan,
        ];

        // Catat waktu mulai pengiriman email
        $start_time = now();
        Log::info('NotifikasiKomplainMasuk run');

        Mail::to(["ardontallan0904@gmail.com", "ardonyunors147@gmail.com", "csorgsr@gmai.com"])->send(new NotifikasiKomplainLamaMasuk($data_email));

        // Catat waktu selesai pengiriman email
        $end_time = now();
        Log::info('NotifikasiKomplainMasuk done');
        
        // Hitung waktu eksekusi
        $execution_time = $end_time->diffInSeconds($start_time);
        Log::info("Execution time: {$execution_time} seconds");
        return 'Sukses mengirimkan email';
    }

    public function indexKepalaRuang(Request $request){
        // Ambil data input dari permintaan
        $jenis_pasien = $request->input('jenis_pasien');
        $nama = $request->input('nama');
        $judul = $request->input('judul');
        $kronologi = $request->input('kronologi');
        $level = $request->input('level');

        $data_email = [
            'jenis_pasien' => $jenis_pasien,
            'nama' => $nama,
            'judul' => $judul,
            'kronologi' => $kronologi,
            'level' => $level,
        ];

        // Catat waktu mulai pengiriman email
        $start_time = now();
        Log::info('NotifikasiKomplainMasuk run');

        Mail::to(["kepalaruangrsgr@gmail.com"])->send(new NotifikasiRuangKomplainMasuk($data_email));

        // Catat waktu selesai pengiriman email
        $end_time = now();
        Log::info('NotifikasiKomplainMasuk done');
        
        // Hitung waktu eksekusi
        $execution_time = $end_time->diffInSeconds($start_time);
        Log::info("Execution time: {$execution_time} seconds");
        return 'Sukses mengirimkan email>';
    }

    public function indexKepalaBidang(Request $request){
        // Ambil data input dari permintaan
        $jenis_pasien = $request->input('jenis_pasien');
        $nama = $request->input('nama');
        $judul = $request->input('judul');
        $kronologi = $request->input('kronologi');
        $level = $request->input('level');

        $data_email = [
            'jenis_pasien' => $jenis_pasien,
            'nama' => $nama,
            'judul' => $judul,
            'kronologi' => $kronologi,
            'level' => $level,
        ];

        // Catat waktu mulai pengiriman email
        $start_time = now();
        Log::info('NotifikasiKomplainMasuk run');

        Mail::to(["kepalabidangrsgr@gmail.com"])->send(new NotifikasiBidangKomplainMasuk($data_email));

        // Catat waktu selesai pengiriman email
        $end_time = now();
        Log::info('Notifikasi Komplain Masuk done');
        
        // Hitung waktu eksekusi
        $execution_time = $end_time->diffInSeconds($start_time);
        Log::info("Execution time: {$execution_time} seconds");
        return 'Sukses mengirimkan email';
    }

    public function countdown_cso(){
        $komplains = Komplain::where('created_at', '=', now())
                            ->where('id_status', '=', 1) // Misalnya Anda ingin filter berdasarkan id_status
                            ->where('id_level', '=', 1)  // Misalnya Anda ingin filter berdasarkan id_level
                            ->get();
        
        // Jika tidak ada komplain yang memenuhi kriteria, keluar dari fungsi
        if ($komplains->isEmpty()) {
            return;
        }
    
        foreach ($komplains as $komplain) {
            $data_email = [
                'jenis_pasien' => $komplain->jenis_pasien,
                'nama' => $komplain->nama,
                'judul' => $komplain->judul,
                'kronologi' => $komplain->kronologi,
            ];
    
            // Kirim email dengan data yang disiapkan
            Mail::to(["ardontallan0904@gmail.com", "ardonyunors147@gmail.com"])->send(new CountdownCSO($data_email));
    
            // Set status email_sent menjadi true setelah email dikirim
            $komplain->update(['email_sent' => true]);
        }
    
        return 'Sukses mengirimkan email';
    }
}
