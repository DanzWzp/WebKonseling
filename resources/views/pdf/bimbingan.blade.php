<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Data Bimbingan</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
            margin: 40px;
        }

        .kop {
            margin-bottom: 20px;
        }

        .kop-table {
            width: 100%;
            border-collapse: collapse;
        }

        .logo-cell {
            width: 80px;
            text-align: center;
            vertical-align: top;
            padding-top: 5px;
        }

        .logo-cell img {
            width: 75px;
            height: auto;
        }

        .text-cell {
            text-align: center;
            line-height: 1.4;
        }

        .text-cell h1 {
            font-size: 15px;
            font-weight: bold;
            margin: 0;
        }

        .text-cell h2 {
            font-size: 13px;
            font-weight: bold;
            margin: 2px 0;
        }

        .text-cell p {
            font-size: 11px;
            margin-top: 4px;
        }

        .garis {
            margin-top: 6px;
            border-bottom: 3px solid #000;
            width: 100%;
        }

        .title {
            text-align: center;
            margin: 25px 0 15px;
            font-size: 14px;
            font-weight: bold;
            text-transform: uppercase;
        }

        table.data {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        table.data td {
            padding: 6px 4px;
            vertical-align: top;
        }

        .photos-wrapper {
            margin-top: 20px;
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }

        .photo {
            width: 110px;
            height: 140px;
            object-fit: cover;
            border: 1px solid #ccc;
        }
        .card-wrapper {
            margin-top: 20px;
        }

        .card-container {
            text-align: center;
            margin-bottom: 20px;
        }

        .card-photo {
            border: 1px solid #ccc;
            padding: 4px;
            width: 300px;
            height: auto;
            display: block;
            margin: auto; /* ❗️Tengah horizontal */
            page-break-inside: avoid;
        }


    </style>
</head>
<body>

    <div class="kop">
        <table class="kop-table">
            <tr>
                <td class="logo-cell">
                    <img src="{{ public_path('img/logo-sma3gu.png') }}" alt="Logo">
                </td>
                <td class="text-cell">
                    <h1>PEMERINTAH PROVINSI GORONTALO</h1>
                    <h2>KEMENTERIAN PENDIDIKAN PROVINSI GORONTALO</h2>
                    <h2>SMA NEGERI 3 GORONTALO UTARA</h2>
                    <p>Jl. Bintara No.72, Desa Pinontoyonga, Kec. Atinggola, Kab. Gorontalo Utara, Gorontalo, Kode Pos 96653</p>
                </td>
            </tr>
        </table>
        <div class="garis"></div>
    </div>

    <div class="title">Data Bimbingan Konseling</div>

    <table class="data">
        <tr>
            <td><strong>Nama Siswa</strong></td>
            <td>: {{ $bimbingan->student->name }}</td>
        </tr>
        <tr>
            <td><strong>Tanggal</strong></td>
            <td>: {{ \Carbon\Carbon::parse($bimbingan->tanggal)->format('d-m-Y') }}</td>
        </tr>
        <tr>
            <td><strong>Bolos</strong></td>
            <td>: {{ $bimbingan->bolos }}</td>
        </tr>
        <tr>
            <td><strong>Alpa</strong></td>
            <td>: {{ $bimbingan->alpa }}</td>
        </tr>
        <tr>
            <td><strong>Terlambat Masuk Kelas</strong></td>
            <td>: {{ $bimbingan->terlambat_kelas }}</td>
        </tr>
        <tr>
            <td><strong>Terlambat ke Sekolah</strong></td>
            <td>: {{ $bimbingan->terlambat_sekolah }}</td>
        </tr>
        <tr>
            <td><strong>Mapel Belum Tuntas</strong></td>
            <td>: {{ $bimbingan->mapel_ringkasan }}</td>
        </tr>
    </table>

        {{-- Keterangan --}}
    <div style="margin-top: 20px;">
        <strong>Keterangan Tambahan:</strong>
        <p style="margin-top: 5px; text-align: justify; white-space: pre-line;">
            {{ $bimbingan->keterangan ?: '-' }}
        </p>
    </div>

    {{-- Dokumentasi: halaman baru jika perlu --}}
    @if ($bimbingan->foto_bimbingan && count($bimbingan->foto_bimbingan) > 0)
        <div style="page-break-before: always;"></div>
        <div class="title">Dokumentasi Bimbingan</div>

       <div class="card-wrapper">
            @foreach ($bimbingan->foto_bimbingan as $foto)
                <div class="card-container">
                    <img src="{{ public_path('storage/' . $foto) }}" class="card-photo" alt="Foto Dokumentasi">
                    <p style="font-size: 11px; color: #555;">Foto ke-{{ $loop->iteration }}</p>
                </div>
            @endforeach
        </div>
    @endif

</body>
</html>


</body>
</html>
