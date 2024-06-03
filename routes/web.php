<?php

use App\Http\Controllers\kirimEmailController;
use App\Http\Controllers\KomplainController;
use App\Http\Controllers\LiveTrackingController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
//Admin
Route::get('/indexCSO', [KomplainController::class, 'index'])->middleware(['auth', 'verified','role:adminCSO'])->name('index'); //Dashboard Admin CSO 
Route::get('/indexKepalaRuang', [KomplainController::class, 'indexKepalaRuang'])->middleware(['auth', 'verified', 'role:adminKepalaRuang'])->name('indexKepalaRuang'); //Dashboard Admin Kepala Ruang
Route::get('/indexKepalaBidang', [KomplainController::class, 'indexKepalaBidang'])->middleware(['auth', 'verified', 'role:adminKepalaBidang'])->name('indexKepalaBidang'); //Dashboard Admin Kepala Bidang
Route::get('/indexDirektur', [KomplainController::class, 'indexDirektur'])->middleware(['auth', 'verified', 'role:adminDirektur'])->name('indexDirektur'); //Dashboard Admin Kepala Bidang

Route::get('/daftarKomplain', [KomplainController::class, 'DaftarKomplain'])->middleware(['auth', 'verified'])->name('daftarKomplain'); //Daftar Komplain Admin untuk CSO
Route::get('/daftarKomplainKepalaRuang', [KomplainController::class, 'DaftarKomplainKepalaRuang'])->middleware(['auth', 'verified', 'role:adminKepalaRuang'])->name('daftarKomplainKepalaRuang'); //Daftar Komplain Admin untuk Kepala Ruang
Route::get('/daftarKomplainKepalaBidang', [KomplainController::class, 'DaftarKomplainKepalaBidang'])->middleware(['auth', 'verified', 'role:adminKepalaBidang'])->name('daftarKomplainKepalaBidang'); //Daftar Komplain Admin untuk Kepala Bidang

Route::get('/isiPesanKomplain', [KomplainController::class, 'IsiPesanKomplain'])->middleware(['auth', 'verified'])->name('isiPesanKomplain'); //Isi Pesan Komplain By ID Komplain Admin CSO
Route::get('/isiPesanKomplainKepalaRuang', [KomplainController::class, 'IsiPesanKomplainKepalaRuang'])->middleware(['auth', 'verified', 'role:adminKepalaRuang'])->name('isiPesanKomplainKepalaRuang'); //Isi Pesan Komplain By ID Komplain Admin Kepala Ruang
Route::get('/isiPesanKomplainKepalaBidang', [KomplainController::class, 'IsiPesanKomplainKepalaBidang'])->middleware(['auth', 'verified', 'role:adminKepalaBidang'])->name('isiPesanKomplainKepalaBidang'); //Isi Pesan Komplain By ID Komplain Admin Kepala Bidang

//Admin CSO
Route::get('/riwayatKomplainCSO', [KomplainController::class, 'RiwayatKomplainCSO'])->middleware(['auth', 'verified', 'role:adminCSO'])->name('riwayatKomplainCSO'); //Daftar Riwayat Komplain Admin untuk CSO
Route::get('/isiPesanRiwayatKomplainCSO', [KomplainController::class, 'IsiPesanKomplainRiwayatCSO'])->middleware(['auth', 'verified', 'role:adminCSO'])->name('isiPesanRiwayatKomplainCSO'); //Isi Pesan Komplain By ID Komplain Admin CSO

//Admin Kepala Ruang
Route::get('/prosesKomplainKepalaRuang', [KomplainController::class, 'ProsesKomplainKepalaRuang'])->middleware(['auth', 'verified', 'role:adminKepalaRuang'])->name('prosesKomplainKepalaRuang'); //Daftar Proses Komplain Admin untuk Kepala Bidang
Route::get('/isiPesanProsesKomplainKepalaRuang', [KomplainController::class, 'IsiPesanProsesKomplainKepalaRuang'])->middleware(['auth', 'verified', 'role:adminKepalaRuang'])->name('isiPesanProsesKomplainKepalaRuang'); //Isi Pesan Komplain By ID Komplain Admin Kepala Bidang
Route::get('/riwayatKomplainKepalaRuang', [KomplainController::class, 'RiwayatKomplainKepalaRuang'])->middleware(['auth', 'verified', 'role:adminKepalaRuang'])->name('riwayatKomplainKepalaRuang'); //Daftar Riwayat Komplain Admin untuk Kepala Ruang
Route::get('/isiPesanRiwayatKomplainKepalaRuang', [KomplainController::class, 'IsiPesanRiwayatKomplainKepalaRuang'])->middleware(['auth', 'verified', 'role:adminKepalaRuang'])->name('isiPesanRiwayatKomplainKepalaRuang'); //Isi Pesan Komplain By ID Komplain Admin Kepala Ruang

//Admin Kepala Bidang
Route::get('/prosesKomplainKepalaBidang', [KomplainController::class, 'ProsesKomplainKepalaBidang'])->middleware(['auth', 'verified', 'role:adminKepalaBidang'])->name('prosesKomplainKepalaBidang'); //Daftar Proses Komplain Admin untuk Kepala Bidang
Route::get('/isiPesanProsesKomplainKepalaBidang', [KomplainController::class, 'IsiPesanProsesKomplainKepalaBidang'])->middleware(['auth', 'verified', 'role:adminKepalaBidang'])->name('isiPesanProsesKomplainKepalaBidang'); //Isi Pesan Komplain By ID Komplain Admin Kepala Bidang
Route::get('/riwayatKomplainKepalaBidang', [KomplainController::class, 'RiwayatKomplainKepalaBidang'])->middleware(['auth', 'verified', 'role:adminKepalaBidang'])->name('riwayatKomplainKepalaBidang'); //Daftar Riwayat Komplain Admin untuk Kepala Bidang
Route::get('/isiPesanRiwayatKomplainKepalaBidang', [KomplainController::class, 'IsiPesanRiwayatKomplainKepalaBidang'])->middleware(['auth', 'verified', 'role:adminKepalaBidang'])->name('isiPesanRiwayatKomplainKepalaBidang'); //Isi Pesan Komplain By ID Komplain Admin Kepala Bidang

//Customer
Route::get('/', [KomplainController::class, 'HomePage'])->name('home');  //Dashboard Customer
Route::get('/about-komplain', [KomplainController::class, 'About'])->name('about');  //About Komplain
Route::get('/riwayat-komplain', [KomplainController::class, 'Riwayat'])->name('riwayat');  //About Komplain
Route::get('/isiPesanKomplainCustomer', [KomplainController::class, 'IsiPesanKomplainCustomer'])->name('isiPesanKomplainCustomer'); //Isi Pesan Komplain By ID Komplain Admin

//Untuk memasukkan data komplain dalam database
Route::get('/isi-komplain', [KomplainController::class, 'showIsiKomplainPage'])->name('isi-komplain'); //Isi Komplain
Route::get('/konfirmasiData-komplain', [KomplainController::class, 'showKonfirmasiKomplainPage'])->name('konfirmasi-komplain'); //Isi Komplain
Route::get('/cekLiveTracking', [LiveTrackingController::class, 'CekLiveTracking'])->name('cekLiveTracking'); //Cek Live Tracking
Route::get('/cekLupaCode', [LiveTrackingController::class, 'CekLupaCode'])->name('cekLupaCode'); //Cek Lupa Kode Live Tracking
Route::get('/isi-feedback', [KomplainController::class, 'IsiFeedback'])->name('feedback'); //Feedback

require __DIR__.'/auth.php';