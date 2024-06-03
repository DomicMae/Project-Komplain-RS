<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['name'=>'tambah-user']);
        Permission::create(['name'=>'edit-user']);
        Permission::create(['name'=>'hapus-user']);
        Permission::create(['name'=>'lihat-user']);

        Permission::create(['name'=>'tambah-komplain']);
        Permission::create(['name'=>'edit-komplain']);
        Permission::create(['name'=>'hapus-komplain']);
        Permission::create(['name'=>'lihat-komplain']); 

        Role::create(['name'=>'adminCSO']);
        Role::create(['name'=>'adminKepalaRuang']);
        Role::create(['name'=>'adminKepalaBidang']);
        Role::create(['name'=>'adminDirektur']);

        $roleAdmin = Role::findByName('adminCSO');
        $roleAdmin->givePermissionTo('tambah-user');
        $roleAdmin->givePermissionTo('edit-user');
        $roleAdmin->givePermissionTo('hapus-user');
        $roleAdmin->givePermissionTo('lihat-user');

        $rolePenulis = Role::findByName('adminDirektur');
        $rolePenulis->givePermissionTo('tambah-komplain');
        $rolePenulis->givePermissionTo('edit-komplain');
        $rolePenulis->givePermissionTo('hapus-komplain');
        $rolePenulis->givePermissionTo('lihat-komplain');
    }
}
