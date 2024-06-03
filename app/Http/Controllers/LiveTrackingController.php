<?php

namespace App\Http\Controllers;

use App\Models\Live_Tracking;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Komplain;

class LiveTrackingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
            // Mengambil ID dari entri terbaru dalam tabel 'komplain'
            $latestKomplain = Komplain::latest()->first();

            $live_Tracking = new Live_Tracking();
            $live_Tracking->id_komplain = $latestKomplain->id;
            $live_Tracking->id_status = $latestKomplain->id_status;
            $live_Tracking->tanggal_sebelum_update = $latestKomplain->created_at;
            $live_Tracking->tanggal_update = $request->input('tanggal_update');
    
            $live_Tracking->save();
            return response()->json(['message' => 'LiveTracking successfully save'], 201);
            // return redirect()->route('get-kode');
            } catch (\Exception $e) {
            // Tangkap kesalahan dan kembalikan respons yang sesuai
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Live_Tracking  $live_Tracking
     * @return \Illuminate\Http\Response
     */
    public function show(Live_Tracking $live_Tracking)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Live_Tracking  $live_Tracking
     * @return \Illuminate\Http\Response
     */
    public function edit(Live_Tracking $live_Tracking)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Live_Tracking  $live_Tracking
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Live_Tracking $live_Tracking)
    {
        try {
            // Mengambil ID dari entri terbaru dalam tabel 'komplain'
            $idKomplain = $request->input('idKomplain');
            $latestKomplain = Komplain::where('id', $idKomplain)->first();

            if (!$latestKomplain) {
                return response()->json(['error' => 'Komplain not found'], 404);
            }

            // Mengambil ID dari entri terbaru dalam tabel 'komplain'
            $live_Tracking = new Live_Tracking();
            $live_Tracking->id_komplain = $latestKomplain->id;
            $live_Tracking->id_status = $latestKomplain->id_status;
            $live_Tracking->tanggal_sebelum_update = $latestKomplain->created_at;
            $live_Tracking->tanggal_update = $request->input('tanggal_update');
    
            $live_Tracking->save();
            return response()->json(['message' => 'LiveTracking successfully save'], 201);
            // return redirect()->route('get-kode');
            } catch (\Exception $e) {
            // Tangkap kesalahan dan kembalikan respons yang sesuai
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Live_Tracking  $live_Tracking
     * @return \Illuminate\Http\Response
     */
    public function destroy(Live_Tracking $live_Tracking)
    {
        //
    }
    public function CekLiveTracking()
    {
        return Inertia::render('CodePage', [
            'title'=> "Wew Homepage",
            'description' => 'Selamat datang di website',
        ]);
    }
    public function CekLupaCode()
    {
        return Inertia::render('LupaCode', [
            'title'=> "Wew Homepage",
            'description' => 'Selamat datang di website',
        ]);
    }
    public function getLiveTracking($kode)
    {
        $komplain = Komplain::where('kode', $kode)->first();

        if (!$komplain) {
            return response()->json(['message' => 'Komplain not found'], 404);
        }

        return response()->json(['kode' => $komplain]);
    }
    public function getDataLiveTracking($idKomplain)
{
    // Menggunakan where() untuk mendapatkan semua entri yang cocok dengan idKomplain tertentu
    $komplainData = Live_Tracking::join('status_komplain', 'live_tracking.id_status', '=', 'status_komplain.id')
    ->where('id_komplain', $idKomplain)
    ->select('live_tracking.id', 'live_tracking.id_status', 'live_tracking.tanggal_sebelum_update', 'live_tracking.tanggal_update', 'status_komplain.nama_status')
    ->get();

    // Memeriksa apakah ada data yang ditemukan
    if ($komplainData->isEmpty()) {
        return response()->json(['message' => 'Komplain not found'], 404);
    }

    // Menyiapkan array untuk menyimpan data
    $response = [];

    foreach ($komplainData as $komplain) {
        $response[] = [
            'id_status' => $komplain->id_status,
            'nama_status' => $komplain->nama_status,
            'tanggal_sebelum_update' => $komplain->tanggal_sebelum_update, 
            'tanggal_update' => $komplain->tanggal_update
        ];
    }

    return response()->json($response);
}

    public function getCodeLiveTracking($no_telp)
    {
        // Menghilangkan karakter "+" dari nomor telepon
        $no_telp = str_replace('+', '', $no_telp);

        $komplain = Komplain::where('no_telp', $no_telp)->get();

        if ($komplain->isEmpty()) {
            return response()->json(['message' => 'Komplain not found'], 404);
        }
        return response()->json($komplain);

        // $komplain = Komplain::where('kode', $kode)->first();

        // if (!$komplain) {
        //     return response()->json(['message' => 'Komplain not found'], 404);
        // }

        // return response()->json(['kode' => $komplain]);
    }
}
