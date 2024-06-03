<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Level_komplain extends Model
{
    use HasFactory;
    protected $table = 'level_komplain';
    protected $primaryKey = 'id';
    protected $fillable = ['namaLevel', 'durasi', 'deskripsiLevel'];
    public $timestamps = true;
}
