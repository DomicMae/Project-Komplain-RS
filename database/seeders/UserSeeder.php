<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminCSO = User::create([
            'name'=>'adminCSO',
            'email'=>'adminCSO@gmail.com',
            'password'=>bcrypt('12345678'),
        ]);
        $adminCSO->assignRole('adminCSO');

        $adminKepalaRuang = User::create([
            'name'=>'adminKepalaRuang',
            'email'=>'adminKepalaRuang@gmail.com',
            'password'=>bcrypt('12345678'),
        ]);
        $adminKepalaRuang->assignRole('adminKepalaRuang');

        $adminKepalaBidang = User::create([
            'name'=>'adminKepalaBidang',
            'email'=>'adminKepalaBidang@gmail.com',
            'password'=>bcrypt('12345678'),
        ]);
        $adminKepalaBidang->assignRole('adminKepalaBidang');

        $adminDirektur = User::create([
            'name'=>'adminDirektur',
            'email'=>'adminDirektur@gmail.com',
            'password'=>bcrypt('12345678'),
        ]);
        $adminDirektur->assignRole('adminDirektur');
    }
}
