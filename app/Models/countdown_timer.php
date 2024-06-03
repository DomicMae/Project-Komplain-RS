<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class countdown_timer extends Model
{
    use HasFactory;
    protected $table = 'countdown_timer';
    protected $primaryKey = 'id';
    protected $fillable = ['tanggal_sebelum_update', 'tanggal_update'];
    public $timestamps = false;

        // Mendefinisikan hubungan dengan tabel 'status_komplains'
    public function status()
    {
        return $this->belongsTo(Komplain::class, 'id_komplain');
    }
}