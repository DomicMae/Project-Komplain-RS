<!-- resources/views/emails/notifikasi_komplainlama_masuk.blade.php -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<h1>Anda mendapatkan Komplain Lama dengan Balasan Pasien</h1>
    <p>Jenis Pasien: {{ $data_email['jenis_pasien'] }}</p>
    <p>Nama: {{ $data_email['nama'] }}</p>
    <p>Judul Komplain: {{ $data_email['judul'] }}</p>
    <p>Kronologi: {{ $data_email['kronologi'] }}</p>
    <p>Komplain telah dilihat, namun customer kurang puas karena</p>
    <p>Alasan: {{ $data_email['keterangan'] }}</p>
</body>
</html>