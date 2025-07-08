<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Home Visit</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
            margin: 40px;
        }
        .title {
            text-align: center;
            font-weight: bold;
            font-size: 14px;
            margin-bottom: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
        }
        td {
            padding: 6px 4px;
            vertical-align: top;
        }
        .photo {
            width: 150px;
            height: auto;
            border: 1px solid #ccc;
            margin: 10px;
        }
    </style>
</head>
<body>

    <div class="title">LAPORAN HOME VISIT SISWA</div>

    <table>
        <tr><td><strong>Nama Siswa</strong></td><td>: {{ $visit->student->name }}</td></tr>
        <tr><td><strong>Jumlah Kunjungan</strong></td><td>: {{ $visit->jumlah_visit }}</td></tr>
        <tr><td><strong>Permasalahan</strong></td><td>: {{ $visit->permasalahan }}</td></tr>
        <tr><td><strong>Hasil</strong></td><td>: {{ $visit->hasil }}</td></tr>
    </table>

    @if($visit->foto && count($visit->foto) > 0)
        <div class="title">Dokumentasi</div>
        @foreach($visit->foto as $foto)
            <img src="{{ public_path('storage/' . $foto) }}" class="photo" alt="Foto Home Visit">
        @endforeach
    @endif

</body>
</html>
