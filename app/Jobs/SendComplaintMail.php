<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Komplain;
use Illuminate\Support\Facades\Mail;

class SendComplaintMail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
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
    }
}
