<?php

namespace App\Http\Controllers;

use App\Models\Level_komplain;
use Illuminate\Http\Request;

class LevelKomplainController extends Controller
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Level_komplain  $level_komplain
     * @return \Illuminate\Http\Response
     */
    public function show($namaLevel)
    {

        $level = Level_komplain::where('namaLevel', $namaLevel)->get();

        if ($level->isEmpty()) {
            return response()->json(['message' => 'Komplain not found'], 404);
        }
        return response()->json($level);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Level_komplain  $level_komplain
     * @return \Illuminate\Http\Response
     */
    public function edit(Level_komplain $level_komplain)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Level_komplain  $level_komplain
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Level_komplain $level_komplain)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Level_komplain  $level_komplain
     * @return \Illuminate\Http\Response
     */
    public function destroy(Level_komplain $level_komplain)
    {
        //
    }
}
