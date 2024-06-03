<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status_Komplain extends Model
{
    use HasFactory;
    protected $table = 'status_komplain';
    protected $primaryKey = 'id';
    protected $fillable = ['nama_status'];
    public $timestamps = true;
}
