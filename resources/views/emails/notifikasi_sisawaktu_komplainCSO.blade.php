<!-- resources/views/emails/notifikasi_komplain_masuk.blade.php -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<h2>mohon segera membaca komplain tersebut</h2>
    <p>Jenis Pasien: {{ $data_email['jenis_pasien'] }}</p>
    <p>Nama: {{ $data_email['nama'] }}</p>
    <p>Judul Komplain: {{ $data_email['judul'] }}</p>
    <p>Kronologi: {{ $data_email['kronologi'] }}</p>
</body>
</html>
