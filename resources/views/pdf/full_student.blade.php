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

        .photo {
            border: 1px solid #ccc;
            width: 110px;
            height: 140px;
            object-fit: cover;
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
            margin: auto;
            page-break-inside: avoid;
        }
    </style>
</head>
<body>

    {{-- Kop & Header --}}
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
                    <p>Jl. Bintara No.72, Desa Pinontoyonga, Kec. Atinggola, Kab. Gorontalo Utara, Kode Pos 96653</p>
                </td>
            </tr>
        </table>
        <div class="garis"></div>
    </div>

    {{-- Biodata --}}
    <div class="title">Data Siswa</div>

    <table width="100%" style="margin-bottom: 20px;">
        <tr>
            <td style="width: 70%; vertical-align: top;">
                <div style="display: table;">
                    <div style="display: table-row;">
                        <div style="display: table-cell; padding: 4px 0; font-weight: bold;">Nama</div>
                        <div style="display: table-cell; padding: 4px 0;">: {{ $student->name }}</div>
                    </div>
                    <div style="display: table-row;">
                        <div style="display: table-cell; padding: 4px 0; font-weight: bold;">Tempat, Tanggal Lahir</div>
                        <div style="display: table-cell; padding: 4px 0;">: {{ $student->birth_place }}, {{ \Carbon\Carbon::parse($student->birth_date)->translatedFormat('d F Y') }}</div>
                    </div>
                    <div style="display: table-row;">
                        <div style="display: table-cell; padding: 4px 0; font-weight: bold;">Jenis Kelamin</div>
                        <div style="display: table-cell; padding: 4px 0;">: {{ $student->gender == 'L' ? 'Laki-laki' : 'Perempuan' }}</div>
                    </div>
                    <div style="display: table-row;">
                        <div style="display: table-cell; padding: 4px 0; font-weight: bold;">Alamat</div>
                        <div style="display: table-cell; padding: 4px 0;">: {{ $student->address }}</div>
                    </div>
                    <div style="display: table-row;">
                        <div style="display: table-cell; padding: 4px 0; font-weight: bold;">Asal Sekolah</div>
                        <div style="display: table-cell; padding: 4px 0;">: {{ $student->school_origin }}</div>
                    </div>
                    <div style="display: table-row;">
                        <div style="display: table-cell; padding: 4px 0; font-weight: bold;">No HP</div>
                        <div style="display: table-cell; padding: 4px 0;">: {{ $student->phone }}</div>
                    </div>
                    <div style="display: table-row;">
                        <div style="display: table-cell; padding: 4px 0; font-weight: bold;">Nama Orang Tua</div>
                        <div style="display: table-cell; padding: 4px 0;">: {{ $student->parent_name }}</div>
                    </div>
                    <div style="display: table-row;">
                        <div style="display: table-cell; padding: 4px 0; font-weight: bold;">Tinggal dengan</div>
                        <div style="display: table-cell; padding: 4px 0;">: {{ $student->living_with }}</div>
                    </div>
                    <div style="display: table-row;">
                        <div style="display: table-cell; padding: 4px 0; font-weight: bold;">Prestasi</div>
                        <div style="display: table-cell; padding: 4px 0;">: {{ $student->achievement ?: '-' }}</div>
                    </div>
                </div>
            </td>
            <td style="width: 30%; text-align: center;">
                @if ($student->photo)
                    <img src="{{ public_path('storage/' . $student->photo) }}" style="width: 120px; height: 160px; object-fit: cover;" alt="Foto Siswa">
                @else
                    <div style="width: 120px; height: 160px; border: 1px solid #aaa; text-align:center; line-height:160px;">
                        Tidak Ada Foto
                    </div>
                @endif
            </td>
        </tr>
    </table>


    {{-- Bimbingan --}}
    <div class="title" style="page-break-before: always;">Data Bimbingan Konseling</div>

    @if($bimbingan->count() > 0)
    <table class="data">
        <thead>
            <tr>
                <th>Tanggal</th>
                <th>Bolos</th>
                <th>Alpa</th>
                <th>Terlambat Masuk</th>
                <th>Terlambat Sekolah</th>
                <th>Mapel</th>
                <th>Keterangan</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($bimbingan as $item)
                <tr>
                    <td>{{ \Carbon\Carbon::parse($item->tanggal)->format('d-m-Y') }}</td>
                    <td>{{ $item->bolos }}</td>
                    <td>{{ $item->alpa }}</td>
                    <td>{{ $item->terlambat_kelas }}</td>
                    <td>{{ $item->terlambat_sekolah }}</td>
                    <td>{{ $item->mapel_ringkasan }}</td>
                    <td>{{ $item->keterangan ?: '-' }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
    @else
        <p><em>Tidak ada data bimbingan ditemukan.</em></p>
    @endif

    {{-- Dokumentasi Foto --}}
    @foreach ($bimbingan as $item)
        @if ($item->foto_bimbingan && count($item->foto_bimbingan) > 0)
            <div style="page-break-before: always;"></div>
            <div class="title">Dokumentasi Bimbingan - {{ $item->tanggal }}</div>
            <div class="card-wrapper">
                @foreach ($item->foto_bimbingan as $foto)
                    <div class="card-container">
                        <img src="{{ public_path('storage/' . $foto) }}" class="card-photo" alt="Foto Bimbingan">
                        <p style="font-size: 11px; color: #555;">Foto ke-{{ $loop->iteration }}</p>
                    </div>
                @endforeach
            </div>
        @endif
    @endforeach

</body>
</html>
