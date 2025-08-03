<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Konseling Siswa</title>
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
        .photo {
            border: 1px solid #ccc;
            width: 110px;
            height: 140px;
            object-fit: cover;
        }
        table.data {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        table.data td, table.data th {
            border: 1px solid #666;
            padding: 6px 4px;
            vertical-align: top;
            text-align: left;
        }
        table.data-siswa td, table.data th {
            padding: 6px 4px;
            vertical-align: top;
            text-align: left;
        }
        .card-photo {
            border: 1px solid #ccc;
            padding: 4px;
            width: 300px;
            height: auto;
            display: block;
            margin: auto;
            page-break-inside: avoid;
        }
        .card-container {
            text-align: center;
            margin-bottom: 20px;
        }
        .ttd {
            page-break-before: always;
            margin-top: 60px;
        }
        .ttd td {
            text-align: center;
        }
        .ttd-img {
            width: 130px;
            height: auto;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    {{-- KOP --}}
    <div class="kop">
        <table class="kop-table">
            <tr>
                <td class="logo-cell">
                    <img src="{{ public_path('img/logo-sma3gu.png') }}" alt="Logo SMA">
                </td>
                <td class="text-cell">
                    <h1>PEMERINTAH PROVINSI GORONTALO</h1>
                    <h2>KEMENTERIAN PENDIDIKAN PROVINSI GORONTALO</h2>
                    <h2>SMA NEGERI 3 GORONTALO UTARA</h2>
                    <p>Jl. Bintara No.72, Desa Pinontoyonga, Kec. Atinggola, Kab. Gorontalo Utara</p>
                </td>
                <td class="logo-cell">
                    <img src="{{ public_path('img/konselor-logo.png') }}" alt="Logo Konselor">
                </td>
            </tr>
        </table>
        <div class="garis"></div>
    </div>

    {{-- Data Siswa --}}
    <div class="title">Data Siswa</div>
    <table class="data-siswa">
        <tr>
            <td width="70%">
                <table>
                    <tr><td><strong>Nama</strong></td><td>: {{ $student->name }}</td></tr>
                    <tr><td><strong>Tempat, Tanggal Lahir</strong></td><td>: {{ $student->birth_place }}, {{ \Carbon\Carbon::parse($student->birth_date)->translatedFormat('d F Y') }}</td></tr>
                    <tr><td><strong>Jenis Kelamin</strong></td><td>: {{ $student->gender == 'L' ? 'Laki-laki' : 'Perempuan' }}</td></tr>
                    <tr><td><strong>Alamat</strong></td><td>: {{ $student->address }}</td></tr>
                    <tr><td><strong>Asal Sekolah</strong></td><td>: {{ $student->school_origin }}</td></tr>
                    <tr><td><strong>No HP</strong></td><td>: {{ $student->phone }}</td></tr>
                    <tr><td><strong>Nama Orang Tua</strong></td><td>: {{ $student->parent_name }}</td></tr>
                    <tr><td><strong>Tinggal dengan</strong></td><td>: {{ $student->living_with }}</td></tr>
                    <tr><td><strong>Prestasi</strong></td><td>: {{ $student->achievement }}</td></tr>
                </table>
            </td>
            <td width="40%" align="center">
                @if ($student->photo)
                    <img src="{{ public_path('storage/' . $student->photo) }}" class="photo" alt="Foto Siswa">
                @else
                    <div class="photo" style="text-align:center; line-height:140px;">Tidak Ada Foto</div>
                @endif
            </td>
        </tr>
    </table>

    {{-- Bimbingan --}}
    @if($bimbingan->count())
    <div class="title" style="page-break-before: always;">Data Bimbingan Konseling</div>
    <table class="data">
        <thead>
            <tr>
                <th>Tanggal</th><th>Bolos</th><th>Alpa</th><th>Terlambat Masuk</th><th>Terlambat Sekolah</th><th>Mapel</th><th>Keterangan</th>
            </tr>
        </thead>
        <tbody>
            @foreach($bimbingan as $item)
            <tr>
                <td>{{ \Carbon\Carbon::parse($item->tanggal)->translatedFormat('d F Y') }}</td>
                <td>{{ $item->bolos }}</td><td>{{ $item->alpa }}</td>
                <td>{{ $item->terlambat_kelas }}</td><td>{{ $item->terlambat_sekolah }}</td>
                <td>{{ $item->mapel_ringkasan }}</td><td>{{ $item->keterangan ?: '-' }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
    @endif

     {{-- Home Visit --}}
    @if($homevisit->count())
    <div class="title" style="page-break-before: always;">Data Home Visit</div>
    <table class="data">
        <thead>
            <tr><th>Tanggal</th><th>Jumlah</th><th>Permasalahan</th><th>Hasil</th></tr>
        </thead>
        <tbody>
            @foreach($homevisit as $v)
            <tr>
                <td>{{ \Carbon\Carbon::parse($v->created_at)->translatedFormat('d F Y') }}</td>
                <td>{{ $v->jumlah_visit }}</td><td>{{ $v->permasalahan }}</td><td>{{ $v->hasil }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
    @endif

    {{-- Kenakalan --}}
    @if($kenakalan->count())
    <div class="title" style="page-break-before: always;">Data Kenakalan Remaja</div>
    <table class="data">
        <thead>
            <tr><th>Tanggal</th><th>Jenis</th><th>Keterangan</th></tr>
        </thead>
        <tbody>
            @foreach($kenakalan as $k)
            <tr>
                <td>{{ \Carbon\Carbon::parse($k->tanggal)->translatedFormat('d F Y') }}</td>
                <td>{{ $k->jenis }}</td>
                <td>{{ $k->keterangan }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
    @endif

    {{-- Dokumentasi Bimbingan --}}
    @foreach ($bimbingan as $item)
        @if ($item->foto_bimbingan && count($item->foto_bimbingan))
            <div style="page-break-before: always;"></div>
            <div class="title">Dokumentasi Bimbingan - {{ \Carbon\Carbon::parse($item->tanggal)->translatedFormat('d F Y') }}</div>
            @foreach ($item->foto_bimbingan as $foto)
            <div class="card-container">
                <img src="{{ public_path('storage/' . $foto) }}" class="card-photo">
            </div>
            @endforeach
        @endif
    @endforeach


    {{-- Dokumentasi Home Visit --}}
    @foreach($homevisit as $v)
        @if($v->foto && count($v->foto))
            <div style="page-break-before: always;"></div>
            <div class="title">Dokumentasi Home Visit</div>
            @foreach ($v->foto as $foto)
            <div class="card-container">
                <img src="{{ public_path('storage/' . $foto) }}" class="card-photo">
            </div>
            @endforeach
        @endif
    @endforeach


    {{-- Dokumentasi Kenakalan --}}
    @foreach($kenakalan as $k)
        @if($k->foto && count($k->foto))
            <div style="page-break-before: always;"></div>
            <div class="title">Dokumentasi Kenakalan Remaja</div>
            @foreach ($k->foto as $foto)
            <div class="card-container">
                <img src="{{ public_path('storage/' . $foto) }}" class="card-photo">
            </div>
            @endforeach
        @endif
    @endforeach

   {{-- Tanda Tangan Akhir --}}
    <div style="page-break-before: always; height: 1000px; position: relative;">
        <div style="position: absolute; bottom: 40px; right: 40px; text-align: center;">
            <p style="margin-bottom: 4px;">Gorontalo Utara, {{ \Carbon\Carbon::now()->translatedFormat('l, d F Y') }}</p>
            <p style="font-weight: bold; margin-bottom: 30px;">Konselor</p>
            <img src="{{ public_path('img/tanda-tangan.png') }}" alt="Tanda Tangan" style="width: 100px; margin-bottom: 10px;">
            <p style="font-weight: bold; margin: 0;">Sultan M. Tarmizi, S.Pd</p>
            <p style="margin: 0;">NIP. 1994022420232110009</p>
        </div>
    </div>


</body>
</html>