<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Live_Tracking extends Model
{
    use HasFactory;
    protected $table = 'live_tracking';
    protected $primaryKey = 'id';
    protected $fillable = ['tanggal_sebelum_update', 'tanggal_update'];
    public $timestamps = false;

    // Define the relationship with 'status_komplains' table
    public function status()
    {
        return $this->belongsTo(Status_Komplain::class, 'id_status');
    }

    // Define the relationship with 'komplains' table
    public function komplain()
    {
        return $this->belongsTo(Komplain::class, 'id_komplain');
    }
}
