<?php

namespace App\Console;

use App\Http\Controllers\kirimEmailController;
use App\Models\Komplain;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->call(function () {
            Log::info('Task Scheduler: Task started');
            // Ambil semua entri yang memenuhi kriteria dari tabel 'komplain'
            $komplains = Komplain::where('created_at', '=', now())
                                ->where('id_status', '=', 1) // Misalnya Anda ingin filter berdasarkan id_status
                                ->where('id_level', '=', 1)  // Misalnya Anda ingin filter berdasarkan id_level
                                ->get();
        
            // Jika tidak ada entri yang memenuhi kriteria, keluar dari fungsi
            if ($komplains->isEmpty()) {
                return;
            }
        
            // Inisialisasi variabel untuk menyimpan entri yang akan diproses
            $selectedKomplain = null;
        
            // Iterasi melalui semua entri yang memenuhi kriteria
            foreach ($komplains as $komplain) {
                // Periksa apakah belum ada entri yang dipilih atau entri saat ini lebih lama dari entri yang sudah dipilih
                if (!$selectedKomplain || $komplain->created_at < $selectedKomplain->created_at) {
                    // Tetapkan entri saat ini sebagai entri yang dipilih
                    $selectedKomplain = $komplain; 
                }
            }
        
            // Kirim email untuk entri yang dipilih
            // Anda perlu menyesuaikan ini sesuai dengan logika pengiriman email Anda
            // Contoh, Anda dapat memanggil controller atau model yang memiliki method untuk mengirim email
            if ($selectedKomplain) {
                $emailController = new kirimEmailController();
                $emailController->countdown_cso();
        
                // Set status email_sent menjadi true setelah email dikirim
                $selectedKomplain->update(['email_sent' => true]);
            }
        })->dailyAt('07:00');
        
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
