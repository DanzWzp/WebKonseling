<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Data Kenakalan Remaja</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
            margin: 30px;
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
            margin: 2px 0;
        }

        .garis {
            border-bottom: 2px solid #000;
            margin-top: 10px;
            margin-bottom: 20px;
        }

        .title {
            text-align: center;
            font-size: 15px;
            font-weight: bold;
            margin-bottom: 20px;
        }

        table {
            width: 100%;
            margin-bottom: 15px;
        }

        td {
            padding: 4px;
            vertical-align: top;
        }

        .doc-title {
            text-align: center;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 30px;
            margin-top: 20px;
            clear: both;
        }

        .photo-wrapper {
            margin-top: 30px;
            clear: both;
        }

        .photo-item {
            page-break-inside: avoid;
            text-align: center;
            margin-bottom: 40px;
        }

        .photo-label {
            font-weight: bold;
            margin-bottom: 10px;
            font-size: 13px;
        }

        .photo {
            width: 250px;
            height: auto;
            border: 1px solid #ccc;
            margin-top: 5px;
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
                    <p>Jl. Bintara No.72, Desa Pinontoyonga, Kec. Atinggola, Kab. Gorontalo Utara, Gorontalo, Kode Pos 96653</p>
                </td>
                <td class="logo-cell">
                    <img src="{{ public_path('img/konselor-logo.png') }}" alt="Logo Konseling">
                </td>
            </tr>
        </table>
        <div class="garis"></div>
    </div>

    {{-- JUDUL --}}
    <div class="title">Data Kenakalan Remaja</div>

    {{-- DATA --}}
    <table>
        <tr>
            <td><strong>Nama Siswa</strong></td>
            <td>: {{ $kenakalan->student->name }}</td>
        </tr>
        <tr>
            <td><strong>Tanggal</strong></td>
            <td>: {{ \Carbon\Carbon::parse($kenakalan->tanggal)->translatedFormat('l, d F Y') }}</td>
        </tr>
        <tr>
            <td><strong>Jenis Kenakalan</strong></td>
            <td>: {{ $kenakalan->jenis }}</td>
        </tr>
        <tr>
            <td><strong>Keterangan</strong></td>
            <td>: {{ $kenakalan->keterangan ?? '-' }}</td>
        </tr>
    </table>

    {{-- DOKUMENTASI --}}
    @if ($kenakalan->foto && count($kenakalan->foto) > 0)
        <div style="page-break-before: always;"></div>

        <div class="doc-title">Dokumentasi Kenakalan Remaja</div>

        <div class="photo-wrapper">
            @foreach ($kenakalan->foto as $index => $foto)
                <div class="photo-item">
                    <div class="photo-label">Foto ke-{{ $index + 1 }}</div>
                    <img src="{{ public_path('storage/' . $foto) }}" class="photo" alt="Foto Kenakalan {{ $index + 1 }}">
                </div>
            @endforeach
        </div>
    @endif

    {{-- HALAMAN TANDA TANGAN --}}
    <div style="page-break-before: always; position: relative; height: 100vh;">
        <div style="position: absolute; bottom: 40px; right: 40px; text-align: center;">
            Gorontalo Utara, {{ \Carbon\Carbon::now()->translatedFormat('l, d F Y') }}<br>
            <strong>Konselor</strong><br><br>
            <img src="{{ public_path('img/tanda-tangan.png') }}" style="width: 130px; height: auto;"><br>
            <strong>Sultan M. Tarmizi, S.Pd</strong><br>
            NIP. 1994022420232110009
        </div>
    </div>

</body>
</html>
