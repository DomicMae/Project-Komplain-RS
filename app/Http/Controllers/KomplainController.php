<?php

namespace App\Http\Controllers;

use App\Http\Resources\KomplainCollection;
use App\Models\Komplain;
use App\Models\Live_Tracking;
use Illuminate\Http\Request;
use Inertia\Inertia;
use TCPDF;

class KomplainController extends Controller
{
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('HomePageAdminCSO', [
            'title'=> "Wew Homepage",
            'description' => 'Selamat datang di website',
        ]);
    }
    public function indexKepalaRuang()
    {
        return Inertia::render('HomePageAdminKepalaRuang', [
            'title'=> "Wew Homepage",
            'description' => 'Selamat datang di website',
        ]);
    }
    public function indexKepalaBidang()
    {
        return Inertia::render('HomePageAdminKepalaBidang', [
            'title'=> "Wew Homepage",
            'description' => 'Selamat datang di website',
        ]);
    }
    public function HomePage()
    {
        return Inertia::render('HomePage', [
            'title'=> " Homepage",
            'description' => 'Selamat datang di website',
        ]);
    }
    public function About()
    {
        return Inertia::render('AboutKomplain', [
            'title'=> " Homepage",
            'description' => 'Selamat datang di website',
        ]);
    }
    public function Riwayat()
    {
        return Inertia::render('RiwayatKomplain', [
            'title'=> " Homepage",
            'description' => 'Selamat datang di website',
        ]);
    }
    public function admin()
    {
        return Inertia::render('Admin', [
            'title'=> " Homepage",
            'description' => 'Selamat datang di website',
        ]);
    }
    public function getAllKomplains()
    {  
        $komplains = Komplain::all();
        return response()->json($komplains);
    }
    public function getCountKomplainPerDay($tanggal)
    {  
        // Ubah format tanggal dari URL ke dalam format yang sesuai
        $tanggalFormatted = date('Y-m-d', strtotime($tanggal));

        // Debugging: Cetak format tanggal yang telah diformat
        // echo $tanggalFormatted;

        // Gunakan Carbon untuk mengonversi tanggal ke dalam zona waktu yang benar
        $tanggalDateTime = \Carbon\Carbon::createFromFormat('Y-m-d', $tanggalFormatted);

        // Debugging: Cetak tanggal yang telah dikonversi
        // echo $tanggalDateTime;

        // Gunakan whereDate untuk mencocokkan tanggal dengan format yang benar
        $countKomplain = Komplain::whereDate('created_at', $tanggalFormatted)->count();
    
        // Debugging: Cetak jumlah komplain yang ditemukan
        // echo $countKomplain;

        return response()->json(['count' => $countKomplain]);
    }

    public function getCountKomplainPerMonth($tahun, $bulan)
    {  
        // Buat tanggal awal dan akhir dari bulan yang diberikan
        $startDate = \Carbon\Carbon::create($tahun, $bulan, 1)->startOfMonth();
        $endDate = $startDate->copy()->endOfMonth();

        // Hitung jumlah komplain dalam rentang tanggal tersebut
        $countKomplain = Komplain::whereBetween('created_at', [$startDate, $endDate])->count();
    
        return response()->json(['count' => $countKomplain]);
    }

    public function getDataKomplain()
    {  
        $komplains = Komplain::where('id_status', 1)
            ->where('id_level', 1)
            ->whereNull('keterangan')
            ->select('id', 'nama', 'judul', 'unit', 'created_at')->get();
        return response()->json($komplains);
    }
    public function getDataKomplainLevel()
{  
    $komplains = Komplain::join('level_komplain', 'komplain.id_level', '=', 'level_komplain.id')
    ->where(function($query) {
        $query->where('komplain.id_level', 2)
            ->orWhere('komplain.id_level', 3)
            ->orWhere('komplain.id_level', 4);
    })
    ->where(function($query) {
        $query->where('komplain.id_status', 2)
            ->orWhere('komplain.id_status', 3)
            ->orWhere('komplain.id_status', 4);
    })
    ->where(function($query) {
        $query->where('penerima', 'LIKE', '%Kepala Ruang%')
            ->orWhere('penerima', 'LIKE', '%Kepala Bidang%');
    })
        ->select('komplain.id', 'komplain.nama', 'komplain.judul', 'komplain.unit', 'komplain.created_at', 'level_komplain.namaLevel', 'komplain.id_level', 'komplain.id_status', 'komplain.penerima')
        ->get();
    
    return response()->json($komplains);
}
    public function getDataKomplainLevelHijau()
{  
    $komplains = Komplain::join('level_komplain', 'komplain.id_level', '=', 'level_komplain.id')
        ->where(function($query) {
            $query->where('komplain.id_level', 2)
                ->orWhere('komplain.id_level', 3)
                ->where('penerima', 'LIKE', '%Kepala Ruang%');
        })
        ->where('komplain.id_status', 2)
        ->select('komplain.id', 'komplain.nama', 'komplain.judul', 'komplain.unit', 'komplain.created_at', 'level_komplain.namaLevel')
        ->get();
    
    return response()->json($komplains);
}
public function getDataProsesKomplainLevelHijau()
{  
    $komplains = Komplain::join('level_komplain', 'komplain.id_level', '=', 'level_komplain.id')
        ->where(function($query) {
            $query->where('komplain.id_level', 2)
                ->orWhere('komplain.id_level', 3);
        })
        ->where('penerima', 'LIKE', '%Kepala Ruang%')
        ->where(function($query) {
            $query->where('komplain.id_status', 3)
            ->orWhere('komplain.id_status', 4);
        })
        ->select('komplain.id', 'komplain.nama', 'komplain.judul', 'komplain.unit', 'komplain.created_at', 'level_komplain.namaLevel', 'komplain.keterangan')
        ->get();
    
    return response()->json($komplains);
}
public function getDataRiwayatKomplainAllLevel()
{  
    $komplains = Komplain::join('level_komplain', 'komplain.id_level', '=', 'level_komplain.id')
        ->where(function($query) {
            $query->where('komplain.id_level', 1)
                ->orWhere('komplain.id_level', 2)
                ->orWhere('komplain.id_level', 3)
                ->orWhere('komplain.id_level', 4);
        })
        ->where(function($query) {
            $query->where('komplain.id_status', 1)
            ->orWhere('komplain.id_status', 5);
        })
        ->whereNotNull('komplain.keterangan')
        ->select('komplain.id', 'komplain.nama', 'komplain.judul', 'komplain.unit', 'komplain.created_at', 'komplain.keterangan',  'level_komplain.namaLevel')
        ->get();
    
    return response()->json($komplains);
}
public function getDataRiwayatKomplainLevelHijau()
{  
    $komplains = Komplain::join('level_komplain', 'komplain.id_level', '=', 'level_komplain.id')
        ->where(function($query) {
            $query->where('komplain.id_level', 2)
                ->orWhere('komplain.id_level', 3);
        })
        ->where('penerima', 'LIKE', '%Kepala Ruang%')
        ->where('komplain.id_status', 5)
        ->select('komplain.id', 'komplain.nama', 'komplain.judul', 'komplain.unit', 'komplain.created_at', 'level_komplain.namaLevel')
        ->get();
    
    return response()->json($komplains);
}
public function getDataKomplainLevelMerah()
{  
    $komplains = Komplain::join('level_komplain', 'komplain.id_level', '=', 'level_komplain.id')
        ->where(function($query) {
            $query->where('komplain.id_level', 3)
                ->orWhere('komplain.id_level', 4);
        })
        ->where('penerima', 'LIKE', '%Kepala Bidang%')
        ->where('komplain.id_status', 2)
        ->select('komplain.id', 'komplain.nama', 'komplain.judul', 'komplain.unit', 'komplain.created_at', 'level_komplain.namaLevel')
        ->get();
    
    return response()->json($komplains);
}
public function getDataProsesKomplainLevelMerah()
{  
    $komplains = Komplain::join('level_komplain', 'komplain.id_level', '=', 'level_komplain.id')
        ->where(function($query) {
            $query->where('komplain.id_level', 3)
                ->orWhere('komplain.id_level', 4);
        })
        ->where('penerima', 'LIKE', '%Kepala Bidang%')
        ->where(function($query) {
            $query->where('komplain.id_status', 3)
            ->orWhere('komplain.id_status', 4);
        })
        ->select('komplain.id', 'komplain.nama', 'komplain.judul', 'komplain.unit', 'komplain.created_at', 'level_komplain.namaLevel', 'komplain.keterangan')
        ->get();
    
    return response()->json($komplains);
}
public function getDataRiwayatKomplainLevelMerah()
{  
    $komplains = Komplain::join('level_komplain', 'komplain.id_level', '=', 'level_komplain.id')
        ->where(function($query) {
            $query->where('komplain.id_level', 3)
                ->orWhere('komplain.id_level', 4);
        })
        ->where('penerima', 'LIKE', '%Kepala Bidang%')
        ->where('komplain.id_status', 5)
        ->select('komplain.id', 'komplain.nama', 'komplain.judul', 'komplain.unit', 'komplain.created_at', 'level_komplain.namaLevel')
        ->get();
    
    return response()->json($komplains);
}
    public function getKodeKomplains()
    {  
        // Ambil komplain yang memiliki status 'aktif'
        $kodeKomplain = Komplain::whereNotNull('kode')->latest()->first();
        return response()->json(['kode' => $kodeKomplain ? $kodeKomplain->kode : null]); 
    }
    public function getIsiPesanKomplainById($id)
    {
        $komplain = Komplain::find($id);

        if (!$komplain) {
            return response()->json(['message' => 'Komplain not found'], 404);
        }

        return response()->json($komplain);
    }
    public function getIsiPesanKomplainKepalaRuangById($id)
    {
        $komplain = Komplain::leftJoin('level_komplain', 'komplain.id_level', '=', 'level_komplain.id')
                        ->where('komplain.id', $id)
                        ->select('komplain.*', 'level_komplain.namaLevel')
                        ->first();

        if (!$komplain) {
            return response()->json(['message' => 'Komplain not found'], 404);
        }

        return response()->json($komplain);
    }
    public function getIsiPesanKomplainKepalaBidangById($id)
    {
        $komplain = Komplain::leftJoin('level_komplain', 'komplain.id_level', '=', 'level_komplain.id')
                        ->where('komplain.id', $id)
                        ->select('komplain.*', 'level_komplain.namaLevel')
                        ->first();

        if (!$komplain) {
            return response()->json(['message' => 'Komplain not found'], 404);
        }

        return response()->json($komplain);
    }
    public function getIsiPesanKomplainByTelepon($no_telp)
    {
        // Menghilangkan karakter "+" dari nomor telepon
        $no_telp = str_replace('+', '', $no_telp);

        $komplain = Komplain::where('no_telp', $no_telp)->get();

        if ($komplain->isEmpty()) {
            return response()->json(['message' => 'Komplain not found'], 404);
        }
        return response()->json($komplain);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            // Mendapatkan tanggal kejadian dari request
            $tanggal_kejadian = $request->input('tanggal_kejadian');
    
            // Mengambil tahun, bulan, dan tanggal dari tanggal kejadian
            $tahun = date('y', strtotime($tanggal_kejadian));
            $bulan = date('m', strtotime($tanggal_kejadian));
            $tanggal = date('d', strtotime($tanggal_kejadian));
    
            // Membuat kode acak sepanjang 4 digit
            $kode_acak = str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT);
    
            // Menggabungkan kode default 'GR' dengan tahun, bulan, tanggal, dan kode acak
            $kode = 'GR' . $tahun . $bulan . $tanggal . $kode_acak;
    
            $komplain = new Komplain();
            $jenis_pasien = $request->input('jenis_pasien');

            // Menambahkan kata-kata tambahan berdasarkan jenis pasien
            if ($jenis_pasien === 'BPJS') {
                $jenis_pasien = 'pasien BPJS';
            } else if ($jenis_pasien === 'Umum') {
                $jenis_pasien = 'pasien umum';
            }

            $komplain->jenis_pasien = $jenis_pasien;
            $komplain->judul = $request->input('judul');
            $komplain->nama = $request->input('nama');
    
            // Ganti awalan nomor telepon jika dimulai dengan "+62" menjadi "0"
            $no_telp = $request->input('no_telp');
            if (substr($no_telp, 0, 3) === '+62') {
                $no_telp = '0' . substr($no_telp, 3);
            }
            $komplain->no_telp = $no_telp;
    
            $komplain->unit = $request->input('unit');
            $komplain->tanggal_kejadian = $request->input('tanggal_kejadian');
            $komplain->waktu_kejadian = $request->input('waktu_kejadian');
            $komplain->tempat_kejadian = $request->input('tempat_kejadian');
            $komplain->kronologi = $request->input('kronologi');
            $komplain->id_status = 1;
            $komplain->id_level = 1;
    
            // Simpan gambar di server
            if ($request->hasFile('gambar')) {
                $file = $request->file('gambar');
                $fileName = time() . '_' . $file->getClientOriginalName(); //mengirim gambar dengan format file (time + nama file)
                $file->move(public_path('uploads'), $fileName);
                $komplain->gambar = $fileName;
            } else {
                // Jika input gambar kosong, set gambar menjadi "Tidak ada gambar"
                $komplain->gambar = "Tidak ada gambar";
            }
    
            $komplain->kode = $kode;
            $komplain->penerima = null;
            $komplain->laporan = null;
            $komplain->keterangan = $request->input('keterangan');
    
            // Set created_at dan updated_at ke waktu sekarang
            $now = \Carbon\Carbon::now();
            $komplain->created_at = $now;
            $komplain->updated_at = $now;
    
            $komplain->save();
            return response()->json(['message' => 'Komplain created successfully', 'kode' => $kode], 201);
            // return redirect()->route('get-kode');
            } catch (\Exception $e) {
            // Tangkap kesalahan dan kembalikan respons yang sesuai
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Komplain  $komplain
     * @return \Illuminate\Http\Response
     */
    public function show(Komplain $komplain)
    {
        $myKomplain = $komplain::where('author', auth()->user()->email)->get();
        return Inertia::render('Dashboard', [
            'myKomplain' => $myKomplain,
        ]);
    }

    public function showIsiKomplainPage()
    {
        return inertia('IsiKomplain', [
            'title' => 'Isi Komplain',
            'description' => 'Halaman untuk mengisi komplain'
        ]);
    }
    public function showKonfirmasiKomplainPage()
    {
        return inertia('KonfirmasiDataPage', [
            'title' => 'Isi Komplain',
            'description' => 'Halaman untuk mengisi komplain'
        ]);
    }

    public function getKode()
    {
        // Ambil komplain yang memiliki status 'aktif'
        $kodeKomplain = Komplain::whereNotNull('kode')->latest()->first();
        return response()->json(['kode' => $kodeKomplain ? $kodeKomplain->kode : null]);

        // Jika ada komplain yang aktif, ambil kode-nya
        if ($kodeKomplain) {
            $kode = $kodeKomplain->kode;

            // Render halaman Dashboard dengan komplain yang memiliki kode aktif
            return Inertia::render('Dashboard', [
                'kode' => $kode,
                'komplain' => $kodeKomplain,
            ]);
        } else {
            // Jika tidak ada komplain aktif, lakukan sesuatu (misalnya, tampilkan pesan kesalahan)
            return "Tidak ada komplain aktif saat ini.";
        }
    }

    // Method untuk menampilkan halaman daftar komplain
    public function indexKomplain()
    {
        $komplains = Komplain::all();
        return view('daftar_komplain', compact('komplain'));
    }



    public function showKomplain(Komplain $komplain)
    {
        $myKomplain = $komplain::where('author', auth()->user()->email)->get();
        return Inertia::render('Dashboard', [
            'myKomplain' => $myKomplain,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Komplain  $komplain
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        try { 
            $komplain = Komplain::findOrFail($request->input('id'));
            $komplain->id_status = $request->input('id_status');
            $komplain->create_at = $request->input('create_at');
    
            // Simpan data komplain
            $komplain->save();
    
            return response()->json(['message' => 'Komplain berhasil diperbarui'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Komplain  $komplain
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        Komplain::where('id',$request->id)->update([
            'title' => $request->title,
            'nama' => $request->nama,
            'kronologi' => $request->kronologi,
        ]);
        return to_route('dashboard')->with('message', 'update komplain berhasil');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Komplain  $komplain
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        try {
            $komplain = Komplain::findOrFail($request->id);
        
            // Hapus terlebih dahulu entri terkait dalam tabel live_tracking
            $komplain->liveTrackings()->delete();
        
            // Hapus entri dari tabel komplain
            $komplain->delete();
            return response()->json(['message' => 'Data berhasil dihapus'], 201);
        } catch (\Exception $e) {
            // Tangani kesalahan jika terjadi
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function DaftarKomplain()
    {
        return Inertia::render('DaftarKomplain', [
            'title'=> "Wew Homepage",
            'description' => 'Selamat datang di website',
        ]);
    }
    public function DaftarKomplainKepalaRuang()
    {
        return Inertia::render('DaftarKomplainKepalaRuang', [
            'title'=> "Wew Homepage",
            'description' => 'Selamat datang di website',
        ]);
    }
    public function DaftarKomplainKepalaBidang()
    {
        return Inertia::render('DaftarKomplainKepalaBidang', [
            'title'=> "Wew Homepage",
            'description' => 'Selamat datang di website',
        ]);
    }
    public function IsiPesanKomplain()
    {
        return Inertia::render('IsiPesanKomplain', [
            'title'=> "Wew Homepage",
            'description' => 'Selamat datang di website',
        ]);
    }
    public function IsiPesanKomplainRiwayatCSO()
    {
        return Inertia::render('IsiPesanRiwayatKomplainCSO', [
            'title'=> "Wew Homepage",
            'description' => 'Selamat datang di website',
        ]);
    }
    public function IsiPesanKomplainCustomer()
    {
        return Inertia::render('IsiPesanKomplainCustomer', [
            'title'=> "Wew Homepage",
            'description' => 'Selamat datang di website',
        ]);
    }
    public function IsiPesanKomplainKepalaRuang()
    {
        return Inertia::render('IsiPesanKomplainKepalaRuang', [
            'title'=> "Wew Homepage",
            'description' => 'Selamat datang di website',
        ]);
    }
    public function IsiPesanProsesKomplainKepalaRuang()
    {
        return Inertia::render('IsiPesanProsesKomplainKepalaRuang', [
            'title'=> "Wew Homepage",
            'description' => 'Selamat datang di website',
        ]);
    }
    public function IsiPesanRiwayatKomplainKepalaRuang()
    {
        return Inertia::render('IsiPesanRiwayatKomplainKepalaRuang', [
            'title'=> "Wew Homepage",
            'description' => 'Selamat datang di website',
        ]);
    }
    public function IsiPesanKomplainKepalaBidang()
    {
        return Inertia::render('IsiPesanKomplainKepalaBidang', [
            'title'=> "Wew Homepage",
            'description' => 'Selamat datang di website',
        ]);
    }
    public function IsiPesanProsesKomplainKepalaBidang()
    {
        return Inertia::render('IsiPesanProsesKomplainKepalaBidang', [
            'title'=> "Wew Homepage",
            'description' => 'Selamat datang di website',
        ]);
    }
    public function IsiPesanRiwayatKomplainKepalaBidang()
    {
        return Inertia::render('IsiPesanRiwayatKomplainKepalaBidang', [
            'title'=> "Wew Homepage",
            'description' => 'Selamat datang di website',
        ]);
    }
    public function IsiFeedback()
    {
        return Inertia::render('Feedback', [
            'title'=> "Wew Homepage",
            'description' => 'Selamat datang di website',
        ]);
    }
    public function RiwayatKomplainCSO()
    {
        return Inertia::render('RiwayatKomplainCSO', [
            'title'=> "Wew Homepage",
            'description' => 'Selamat datang di website',
        ]);
    }
    public function ProsesKomplainKepalaRuang()
    {
        return Inertia::render('ProsesKomplainKepalaRuang', [
            'title'=> "Wew Homepage",
            'description' => 'Selamat datang di website',
        ]);
    }
    public function RiwayatKomplainKepalaRuang()
    {
        return Inertia::render('RiwayatKomplainKepalaRuang', [
            'title'=> "Wew Homepage",
            'description' => 'Selamat datang di website',
        ]);
    }
    public function ProsesKomplainKepalaBidang()
    {
        return Inertia::render('ProsesKomplainKepalaBidang', [
            'title'=> "Wew Homepage",
            'description' => 'Selamat datang di website',
        ]);
    }
    public function RiwayatKomplainKepalaBidang()
    {
        return Inertia::render('RiwayatKomplainKepalaBidang', [
            'title'=> "Wew Homepage",
            'description' => 'Selamat datang di website',
        ]);
    }
    public function editUnit(Request $request){
        try {
        $komplain = Komplain::findOrFail($request->input('id'));

        // Ubah nilai kolom 'unit' sesuai input dari request
        $komplain->unit = $request->input('unit');

        $komplain->save();
        return response()->json(['message' => 'unit komplain berhasil diubah'], 201);
        // return redirect()->route('get-kode');
        } catch (\Exception $e) {
        // Tangkap kesalahan dan kembalikan respons yang sesuai
        return response()->json(['error' => $e->getMessage()], 500);
    }
    }
    public function editPenerima(Request $request){
        try {
        $komplain = Komplain::findOrFail($request->input('id'));

        // Ubah nilai kolom 'penerima' sesuai input dari request
        $komplain->penerima = $request->input('penerima');

        $komplain->save();
        return response()->json(['message' => 'penerima komplain berhasil diupdate'], 201);
        // return redirect()->route('get-kode');
        } catch (\Exception $e) {
        // Tangkap kesalahan dan kembalikan respons yang sesuai
        return response()->json(['error' => $e->getMessage()], 500);
    }
    }
    public function edit_level(Request $request){
        try {
        $komplain = Komplain::findOrFail($request->input('id'));

        $komplain->penerima = $request->input('penerima');
        
        // Ubah nilai kolom 'id_level & id_status' sesuai input dari request
        $komplain->id_level = $request->input('id_level');
        $komplain->id_status = $request->input('id_status');

        $komplain->save();
            return response()->json(['message' => 'komplain berhasil terkirim'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
    }
}
    public function edit_status(Request $request){
        try {
        $komplain = Komplain::findOrFail($request->input('id'));
        $komplain->id_status = $request->input('id_status');
        $komplain->keterangan = $request->input('keterangan');

        $komplain->save();
            return response()->json(['message' => 'komplain berhasil terupdate'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
    }
    }
    public function reply(Request $request){
        try {
            $komplain = Komplain::findOrFail($request->input('id'));
            $komplain->penerima = $request->input('penerima');
            $komplain->laporan = $request->input('laporan');
            $komplain->jenis_pasien = $request->input('jenis_pasien');
            $komplain->nama = $request->input('nama');
            $komplain->judul = $request->input('judul');
            $komplain->kronologi = $request->input('kronologi');

            // Simpan PDF di server
            $fileName = time() . '_laporan.pdf';
    
            // Menyimpan konten HTML dari view blade ke variabel
            $html = view('laporan', compact('komplain'))->render();

            // Buat instance TCPDF dengan kertas A4 (210x297 mm)
            $pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8', false);
    
            $pdf->SetTitle('Laporan Komplain');

            // Tambahkan halaman baru
            $pdf->AddPage();

            // Tulis konten ke dokumen
            $pdf->writeHTML($html, true, false, true, false, '');

            // Tambahkan gambar ke PDF jika ada
            if ($request->hasFile('gambar')) {
                $imgFile = $request->file('gambar');
                $imgPath = $imgFile->getPathName();
                $pdf->Image($imgPath, 15, 140, 75, 113, 'JPG', '', 'T', false, 300, '', false, false, 1, false, false, false);
            }
            
            $pdf->Output(public_path('uploads/' . $fileName), 'F');
    
            $komplain->laporan = $fileName; // Simpan nama file PDF
            $komplain->id_status = $request->input('id_status');
    
            // Simpan data komplain
            $komplain->save();
    
            return response()->json(['message' => 'Komplain berhasil terkirim dan PDF disimpan'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
