# 🧠 Web Konseling Siswa

Website fullstack untuk layanan Bimbingan dan Konseling Siswa. Dibangun menggunakan **Laravel (Backend)**, **React.js (Frontend)**, dan **Inertia.js** sebagai jembatan. Website ini memiliki fitur manajemen data siswa, bimbingan konseling, home visit, kenakalan remaja, pencarian data, dan export PDF.

---

## 🚀 Fitur Utama

-   ✅ Autentikasi Login
-   📋 Manajemen Data Siswa
-   🧑‍🏫 Bimbingan Konseling (dengan dokumentasi foto)
-   🏠 Home Visit
-   🚨 Kenakalan Remaja
-   🔍 Pencarian & Filter
-   📄 Export PDF per siswa dan per fitur
-   📱 Responsive Design (Desktop, Tablet, Mobile)

---

## 📦 Tech Stack

-   **Backend**: Laravel 10.x
-   **Frontend**: React.js + Inertia.js
-   **Database**: MySQL
-   **Styling**: Tailwind CSS
-   **PDF Export**: DOMPDF (Laravel Package)
-   **Image Handling**: Laravel Storage (public link)

---

## 📁 Struktur Proyek

```
konseling-web/
├── app/               # Backend (Laravel)
├── public/
│   └── img/           # Aset publik (logo, tanda tangan, dll)
├── resources/
│   └── js/            # Frontend React.js via Inertia
│       ├── Pages/     # Komponen halaman
│       └── Components/
├── routes/
│   └── web.php        # Routing Laravel + Inertia
├── storage/
├── .env               # Konfigurasi lingkungan
└── ...
```

---

## 🛠️ Instalasi & Setup

### 1. Clone Repository

```bash
git clone https://github.com/namakamu/konseling-web.git
cd konseling-web
```

### 2. Install Backend (Laravel)

```bash
composer install
```

### 3. Install Frontend (React + Inertia)

```bash
npm install
```

### 4. Salin dan Atur File `.env`

```bash
cp .env.example .env
```

Edit `.env` agar sesuai koneksi MySQL kamu:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=konseling_db
DB_USERNAME=root
DB_PASSWORD=
```

### 5. Generate App Key & Storage Link

```bash
php artisan key:generate
php artisan storage:link
```

### 6. Migrasi Database

```bash
php artisan migrate
```

Jika kamu punya seeder data awal:

```bash
php artisan db:seed
```

### 7. Jalankan Server Laravel

```bash
php artisan serve
```

### 8. Jalankan Frontend (Vite)

```bash
npm run dev
```

---

## 🖥️ Akses Aplikasi

Buka browser dan akses:

```
http://127.0.0.1:8000
```

---

## 🔐 Login

| Role  | Email             | Password |
| ----- | ----------------- | -------- |
| Admin | admin@gmail.com | admin123 |

_Kamu bisa sesuaikan ini lewat database atau fitur register._

---

## 📄 Fitur Export PDF

-   Tersedia untuk: Siswa, Bimbingan, Home Visit, Kenakalan Remaja
-   Bisa export semua data atau per siswa
-   File PDF diatur agar rapi dan mencetak dokumentasi foto dalam halaman baru jika perlu

---

## 📷 Upload Dokumentasi

-   Semua file (foto dokumentasi) disimpan di `storage/app/public`
-   Akses publik via `storage` setelah jalankan:

```bash
php artisan storage:link
```

---

## 🧱 Build untuk Produksi

```bash
npm run build
```

---

## 🛡️ Production Tips

Jika kamu ingin deploy:

-   Gunakan hosting/VPS yang support PHP + Node.js
-   Jalankan `npm run build` untuk frontend
-   Jalankan `php artisan config:cache`, `route:cache`, dan `view:cache`
-   Jangan lupa set folder `storage` dan `bootstrap/cache` menjadi writable

---

## 🙌 Kontribusi

Pull request dan issue terbuka!

```bash
# Langkah kontribusi
1. Fork repository ini
2. Buat branch fitur (`git checkout -b fitur-anda`)
3. Commit perubahan (`git commit -am 'feat: tambah fitur xyz'`)
4. Push ke branch (`git push origin fitur-anda`)
5. Buat Pull Request 🎉
```

---

## 📄 Lisensi

MIT License © 2025 - DanzWzp
