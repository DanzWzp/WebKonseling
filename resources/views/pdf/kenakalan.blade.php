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
        h2 {
            text-align: center;
            font-size: 16px;
            margin-bottom: 20px;
        }
        table {
            width: 100%;
        }
        td {
            padding: 4px;
            vertical-align: top;
        }
        .photo {
            width: 100px;
            height: 120px;
            object-fit: cover;
            border: 1px solid #ccc;
            margin: 5px;
        }
    </style>
</head>
<body>
    <h2>Data Kenakalan Remaja</h2>

    <table>
        <tr>
            <td><strong>Nama Siswa</strong></td>
            <td>: {{ $kenakalan->student->name }}</td>
        </tr>
        <tr>
            <td><strong>Tanggal</strong></td>
            <td>: {{ \Carbon\Carbon::parse($kenakalan->tanggal)->translatedFormat('d F Y') }}</td>
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

    @if ($kenakalan->foto && count($kenakalan->foto) > 0)
        <h4 style="margin-top:30px;">Dokumentasi</h4>
        @foreach ($kenakalan->foto as $foto)
            <img src="{{ public_path('storage/' . $foto) }}" class="photo" alt="Dokumentasi">
        @endforeach
    @endif
</body>
</html>
