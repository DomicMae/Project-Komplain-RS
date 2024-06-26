<?php

use App\Http\Controllers\CountdownTimerController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\kirimEmailController;
use App\Http\Controllers\KomplainController;
use App\Http\Controllers\LevelKomplainController;
use App\Http\Controllers\LiveTrackingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/dataKomplain', [KomplainController::class, 'getDataKomplain']); //Mengambil data komplain dengan ID status = 1 
Route::get('/dataKomplainWaiting', [KomplainController::class, 'getDataKomplainWaiting']); //Mengambil data komplain (Tidak terpakai)
Route::get('/dataKomplainLevelHijau', [KomplainController::class, 'getDataKomplainLevelHijau']); //Mengambil data komplain dengan ID level = 1 & 2
Route::get('/dataKomplainLevelMerah', [KomplainController::class, 'getDataKomplainLevelMerah']); //Mengambil data komplain dengan ID level = 2 & 3 

Route::get('/dataProsesKomplainLevelMerah', [KomplainController::class, 'getDataProsesKomplainLevelMerah']); //Mengambil data komplain dengan ID status = 3 
Route::get('/dataProsesKomplainLevelHijau', [KomplainController::class, 'getDataProsesKomplainLevelHijau']); //Mengambil data komplain dengan ID status = 3 
Route::get('/dataRiwayatKomplainAllLevel', [KomplainController::class, 'getDataRiwayatKomplainAllLevel']); //Mengambil data komplain dengan ID status = 5 
Route::get('/dataRiwayatKomplainLevelHijau', [KomplainController::class, 'getDataRiwayatKomplainLevelHijau']); //Mengambil data komplain dengan ID status = 5 
Route::get('/dataRiwayatKomplainLevelMerah', [KomplainController::class, 'getDataRiwayatKomplainLevelMerah']); //Mengambil data komplain dengan ID status = 5 

Route::get('/dataKomplainById/{id}', [KomplainController::class, 'getIsiPesanKomplainById']); //Mengambil data untuk isi pesan by id (CSO)
Route::get('/dataKomplainKepalaRuang/{id}', [KomplainController::class, 'getIsiPesanKomplainKepalaRuangById']); //Mengambil data untuk isi pesan by id (Kepala Ruang)
Route::get('/dataKomplainKepalaBidang/{id}', [KomplainController::class, 'getIsiPesanKomplainKepalaBidangById']); //Mengambil data untuk isi pesan by id (Kepala Bidang)
Route::get('/dataKomplainNoTelp/{no_telp}', [KomplainController::class, 'getIsiPesanKomplainByTelepon']); //Cek Riwayat Komplain By Telp

Route::get('/countdown_level/{namaLevel}', [LevelKomplainController::class, 'show']);

Route::get('/livetracking/{kode}', [LiveTrackingController::class, 'getLiveTracking']); //Cek kode live tracking
Route::get('/dataLivetracking/{idKomplain}', [LiveTrackingController::class, 'getDataLiveTracking']); //Cek kode live tracking

Route::get('/livetrackingByTelp/{nomortelepon}', [LiveTrackingController::class, 'getCodeLiveTracking']); //Cek Kode Live Tracking menggunakna nomor telepon

Route::get('/kodekomplains', [KomplainController::class, 'getKodeKomplains']); //Kode pertama kali masuk

Route::get('/countkomplain/{tanggal}', [KomplainController::class, 'getCountKomplainPerDay']);
Route::get('/countkomplain/{tahun}/{bulan}', [KomplainController::class, 'getCountKomplainPerMonth']);

Route::post('/editUnit',[KomplainController::class, 'editUnit'])->name('edit.Unit.komplain');
Route::post('/editPenerima',[KomplainController::class, 'editPenerima'])->name('edit.Penerima.komplain'); //Mengganti penerima pada komplain
Route::post('/reply', [KomplainController::class, 'reply'])->name('reply.komplain'); //Mengganti status,level pada komplain dan penambahan laporan
Route::post('/editLevel', [KomplainController::class, 'edit_level'])->name('edit.Level.komplain'); //Mengganti status,level pada komplain dan penambahan penerima 
Route::post('/editStatus', [KomplainController::class, 'edit_status'])->name('edit.Status.komplain'); //Mengganti status  pada komplain dan penambahan penerima 
Route::post('/editKeterangan', [KomplainController::class, 'editKeterangan'])->name('edit.Keterangan.komplain'); //Mengganti status,level pada komplain dan penambahan laporan

Route::post('/addkomplain', [KomplainController::class, 'store'])->name('create.komplain');
// Untuk menggunakan controller Anda, sesuaikan dengan nama controller Anda
Route::post('/hapuskomplain', [KomplainController::class, 'destroy'])->name('destroy.komplain');
Route::post('/addLiveTracking', [LiveTrackingController::class, 'store'])->name('create.livetracking');
Route::post('/prosesLiveTracking', [LiveTrackingController::class, 'update'])->name('update.livetracking');
Route::post('/addCountdown', [CountdownTimerController::class, 'create'])->name('create.countdown');
Route::get('/showCountdown/{id}', [CountdownTimerController::class, 'show']);

// Route untuk mengirim email setelah penambahan komplain selesai
Route::get('/sendemail', [kirimEmailController::class, 'index'])->name('send.email.after.adding.complaint');
// Route untuk mengirim email ketika customer kurang puas dengan balasan
Route::get('/sendemailCSOAgain', [kirimEmailController::class, 'returnToCso'])->name('send.email.after.adding.complaint');
//Route untuk mengirim email kepada kepala ruang
Route::post('/sendemailToKepalaRuang', [kirimEmailController::class, 'indexKepalaRuang'])->name('send.email.to.kepalaRuang');
//Route untuk mengirim email kepada kepala bidang
Route::post('/sendemailToKepalaBidang', [kirimEmailController::class, 'indexKepalaBidang'])->name('send.email.to.kepalaBidang');
//Route untuk mengirim email ketika laporan akan dikirimkan ke CSO
Route::post('/sendemailToCSOKepalaRuang', [kirimEmailController::class, 'kirimLaporanKepalaRuang'])->name('send.email.to.CSO');
//Route untuk mengirim email ketika laporan akan dikirimkan ke CSO
Route::post('/sendemailToCSOKepalaBidang', [kirimEmailController::class, 'kirimLaporanKepalaBidang'])->name('send.email.to.CSO');
// Route untuk mengirim email setelah komplain lewat 30 menit
Route::get('/sendemailforCSO', [kirimEmailController::class, 'countdown_cso'])->name('send.email.after.a.minute');

Route::post('/makeNewFeedback', [FeedbackController::class, 'store'])->name('create.feedback');