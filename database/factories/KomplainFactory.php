<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Komplain>
 */
class KomplainFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $idLevel = fake()->numberBetween(1, 4);
        $idStatus = fake()->numberBetween(1, 4);
        // Mendapatkan tahun, bulan, dan tanggal saat ini
        $tahun = date('Y');
        $bulan = date('m');
        $tanggal = date('d');

        // Membuat kode acak sepanjang 4 digit
        $kode_acak = str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT);

        // Menggabungkan kode default 'GR' dengan tahun, bulan, tanggal, dan kode acak
        $kode = 'GR' . $tahun . $bulan . $tanggal . $kode_acak;

        // Jika idStatus adalah 1, 2, atau 3, kode akan diatur sesuai dengan format yang dihasilkan di atas.
        // Jika tidak, kode akan diatur menjadi null.
        $kode = ($idStatus == 1 || $idStatus == 2 || $idStatus == 3 || $idStatus == 4) ? $kode : null;

        // Daftar unit yang tersedia
        $units = [
            'Unit IGD',
            'Unit Rawat Jalan',
            'Unit Kamar Operasi',
            'Unit Rehabilitasi Medis',
            'Unit Pelayanan Dialisis',
            'Unit Farmasi',
            'Unit Laboratorium',
            'Unit Radiologi',
            'Unit Rekam Medis',
            'Unit Gizi',
            'Unit Rawat Inap 1',
            'Unit Rawat Inap 2',
            'Unit Rawat Inap Kebidanan, Kandungan dan NICU',
            'Unit Rawat Inap 4 dan Geriatri',
            'Unit Pelayanan Intensif (ICU)',
            'Unit Human Resources Development (HRD)',
            'Unit Pengadaan',
            'Unit Umum',
            'Unit Customer Service',
            'Unit Pemeliharaan Sarana',
        ];

        // Memilih secara acak satu unit dari daftar unit yang tersedia
        $unit = $units[array_rand($units)];

        return [
            'jenis_pasien' => fake()->randomElement(['pasien BPJS', 'pasien umum']),
            'judul' => fake()->sentence(),
            'nama' => fake()->name(),
            'no_telp' => '08' . fake()->regexify('[0-9]{9}'),
            'unit' => $unit,
            'tanggal_kejadian' => fake()->date(),
            'waktu_kejadian' => fake()->time(),
            'tempat_kejadian' => fake()->address(),
            'kronologi' => fake()->paragraph(2, true),
            'gambar' => fake()->imageUrl(),
            'kode' => $kode,
            'penerima' => fake()->name(),
            'laporan' => fake()->paragraph(),
            'id_level' => $idLevel,
            'id_status' => $idStatus,
        ];
    }
}
