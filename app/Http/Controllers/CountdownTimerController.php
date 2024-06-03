<?php

namespace App\Http\Controllers;

use App\Models\countdown_timer;
use App\Models\Komplain;
use Illuminate\Http\Request;

class CountdownTimerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        try {
            // Mengambil ID dari entri terbaru dalam tabel 'komplain'


            // Mengambil ID dari entri terbaru dalam tabel 'komplain'
            $countdown_timer = new countdown_timer();
            $countdown_timer->id_komplain = $request->input('idKomplain');
            $countdown_timer->tanggal_sebelum_update = $request->input('tanggal_sebelum_update');
            $countdown_timer->tanggal_update = $request->input('tanggal_update');
    
            $countdown_timer->save();
            return response()->json(['message' => 'Countdown Timer successfully save'], 201);
            // return redirect()->route('get-kode');
            } catch (\Exception $e) {
            // Tangkap kesalahan dan kembalikan respons yang sesuai
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Mengambil countdown_timer berdasarkan id_komplain
        $countdown_timer = countdown_timer::where('id_komplain', $id)->first();

        // Memeriksa apakah countdown_timer ditemukan
        if (!$countdown_timer) {
            return response()->json(['message' => 'Countdown timer not found'], 404);
        }

        // Mengambil tanggal_sebelum_update dan tanggal_update dari countdown_timer
        $tanggalSebelumUpdate = $countdown_timer->tanggal_sebelum_update;
        $tanggalUpdate = $countdown_timer->tanggal_update;

        // Mengembalikan data tanggal_sebelum_update dan tanggal_update dalam format JSON
        return response()->json([
            'tanggal_sebelum_update' => $tanggalSebelumUpdate,
            'tanggal_update' => $tanggalUpdate
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(countdown_timer $countdown_timer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, countdown_timer $countdown_timer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(countdown_timer $countdown_timer)
    {
        //
    }
}
