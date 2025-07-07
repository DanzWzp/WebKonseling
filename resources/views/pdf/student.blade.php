<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Data Siswa</title>
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

        .photo {
            border: 1px solid #ccc;
            width: 110px;
            height: 140px;
            object-fit: cover;
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

    <div class="title">Data Siswa</div>

    <table class="data">
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
            <td width="30%" align="center">
                @if ($student->photo)
                    <img src="{{ public_path('storage/' . $student->photo) }}" class="photo" alt="Foto Siswa">
                @else
                    <div class="photo" style="text-align:center; line-height:140px;">Tidak Ada Foto</div>
                @endif
            </td>
        </tr>
    </table>

</body>
</html>
