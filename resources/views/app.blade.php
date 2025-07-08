<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Konseling Siswa</title>
    
    {{-- Inject route ke Ziggy agar bisa digunakan di React --}}
    @routes

    {{-- Hot reload dan bundling --}}
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="bg-gray-100 text-gray-900">
    @inertia
</body>
</html>
