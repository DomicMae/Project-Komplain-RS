<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laporan Komplain</title>
    <style>
        /* Set ukuran halaman A4 */
        @page {
            size: A4;
        }

        /* CSS untuk konten laporan */
        h1.a {
            color: black;
            text-align: center;
            padding-top: 10px;
        }
        span.b {
            color: green;
            text-align: left;
            vertical-align: middle;
            font-size: 30pt;
        }
        span.a {
            color: black;
            text-align: left;
            vertical-align: middle;
            font-size: 30pt;
        }
        div.e{
            height: 100%;
        }

        p {
            font-size: 12pt;
            padding-left: 10px 0;
            text-align: left; /* Tengahkan teks secara horizontal */
        }

        .penerima {
            font-weight: bold;
            color: green;
            text-align: left;
        }
        .laporan {
            font-weight: bold;
            color: blue;
            text-align: left;
        }

        body, html {
            margin: 0;
            padding: 0;
            height: 100%;
        }

    </style>
</head>
<body>
    <h1> <span> <img src="/images/Logo_Background.png" alt="Logo Background" width="30" height="30"> </span> <span class="b"> Rumah Sakit</span> <span class="a"> Gotong Royong </span></h1>
    <br>
    <h1 class="a">Laporan Komplain</h1>
    <p class="penerima">Penerima: {{ $komplain->penerima }}</p>
    <p class="c">Jenis Pasien: {{ $komplain->jenis_pasien }}</p>
    <p class="c">Nama Pasien: {{ $komplain->nama }}</p>
    <p class="c">Judul Komplain: {{ $komplain->judul }}</p>
    <p class="c">Kronologi: {{ $komplain->kronologi }}</p>
    <p class="laporan">Laporan: {{ $komplain->laporan }}</p>
    @if ($komplain->gambar)
        <img src="{{ public_path('uploads/images/' . $komplain->gambar) }}" alt="Gambar Komplain" style="max-width: 100%; height: auto;">
    @else
        <p>Gambar: Tidak ada gambar</p>
    @endif
</body>
</html>
