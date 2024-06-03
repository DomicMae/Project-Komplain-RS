<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Komplain extends Model
{
    use HasFactory;
    protected $table = 'komplain';
    protected $primaryKey = 'id';
    protected $fillable = ['jenis_pasien','judul', 'nama', 'no_telp','unit', 'tanggal_kejadian', 'waktu_kejadian', 'tempat_kejadian', 'kronologi', 'gambar', 'kode', 'penerima', 'laporan', 'keterangan'];
    public $timestamps = true;

    // Mendefinisikan hubungan dengan tabel 'status_komplains'
    public function status()
    {
        return $this->belongsTo(Status_Komplain::class, 'id_status');
        return $this->belongsTo(Level_komplain::class, 'id_level');
    }
    // Define the relationship with 'live_tracking' table
    public function liveTrackings()
    {
        return $this->hasMany(Live_Tracking::class, 'id_komplain', 'id');
    }
}
