# Tugas Praktik 1: Pemrograman Berbasis Web (STSI4209)
### Universitas Terbuka

Aplikasi Front-End Web untuk **SITTA (Sistem Informasi Tiras dan Transaksi Bahan Ajar) Universitas Terbuka**.

---

## Live Demo & Deployment
Aplikasi telah dideploy dan dapat diakses secara publik di:
- **Tautan Live:** [https://sitta-praktik-eight.vercel.app](https://sitta-praktik-eight.vercel.app)
- **Repositori GitHub:** [https://github.com/Thalassa09/TUGAS_1_Pemrograman_Berbasis_Web_-STSI4209](https://github.com/Thalassa09/TUGAS_1_Pemrograman_Berbasis_Web_-STSI4209)

---

## Struktur Direktori Proyek

```text
sitta-praktik/
├── index.html          # Gerbang utama / Halaman Login (entry point)
├── login.html          # Salinan halaman login untuk routing spesifik
├── dashboard.html      # Menu Utama, Greeting Waktu Lokal, & Dropdown Navigasi
├── tracking.html       # Lacak Resi DO, Visual Stepper Progress, & Timeline Logistik
├── stok.html           # Tabel Dinamis Master BMP & Modal Tambah Stok via DOM
├── css/
│   └── style.css       # External Stylesheet (Palet Resmi UT #003B73 & #F4C542)
├── js/
│   ├── data.js         # Sumber Data Dummy (Pengguna, Bahan Ajar, & Tracking Resi)
│   └── script.js       # Logika Manipulasi DOM, Validasi Form, & Event Handler
├── img/                # Asset Gambar Cover Buku Materi Pokok (BMP)
├── assets/
│   ├── logo-ut.png     # Logo Resmi Universitas Terbuka
│   └── covers/         # Cadangan Asset Visual Cover BMP
└── README.md
```

---

## Fitur & Implementasi Halaman

### 1. Halaman Login (`index.html` / `login.html`)
- Validasi kredensial email & password terhadap `dataPengguna` pada `data.js`.
- Muncul pop-up alert: *"email/password yang anda masukkan salah"* apabila kredensial tidak sesuai.
- Modal box pop-up interaktif untuk fitur **Lupa Password** dan **Daftar Akun Baru**.
- Sesi aktif disimpan pada `localStorage` dan diarahkan ke `dashboard.html`.

### 2. Dashboard Menu (`dashboard.html`)
- Ucapan salam (*greeting*) dinamis berdasarkan waktu lokal pengguna via `new Date().getHours()`:
  - *Selamat pagi* (04:00 - 10:59)
  - *Selamat siang* (11:00 - 14:59)
  - *Selamat sore* (15:00 - 17:59)
  - *Selamat malam* (18:00 - 03:59)
- Jam digital live clock WIB & penunjuk tanggal bahasa Indonesia.
- Navigasi semantik mencakup *Informasi Bahan Ajar*, *Tracking Pengiriman*, dropdown menu *Laporan* (*Monitoring DO* & *Rekap*), dan *Histori Transaksi*.

### 3. Tracking Pengiriman (`tracking.html`)
- Pencarian resi berbasis Nomor Delivery Order (DO) dari `dataTracking` di `data.js`.
- *Uji Coba Resi Dummy:*
  - `2023001234` : Rina Wulandari (JNE), Status: *Dalam Perjalanan*
  - `2023005678` : Agus Pranoto (Pos Indonesia), Status: *Selesai Antar*
- Simulasi visual progress status dengan **Stepper Bar 4 Tahap**.
- Linimasa logistik riwayat perjalanan paket dirender kronologis.

### 4. Informasi Stok Bahan Ajar (`stok.html`)
- Menampilkan data master BMP secara dinamis dari konstanta `dataBahanAjar` pada `data.js`.
- Fitur penambahan baris stok baru menggunakan manipulasi DOM murni (`document.createElement('tr')` dan `appendChild`) tanpa reload halaman.
- Indikator status stok aman (>300), sedang (181-300), dan menipis (<=180).
- Fitur pencarian instan (*live search*) pada tabel bahan ajar.

---

## Teknologi yang Digunakan
- **HTML5** (Semantik & Standar W3C)
- **CSS3** (CSS Variables, Flexbox, CSS Grid, Transisi Halus)
- **JavaScript (ES6+)** (DOM Manipulation, Event Handling, LocalStorage)
