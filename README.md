# Hajijin Amri — Portfolio

Website portofolio pribadi untuk menampilkan profil profesional, pengalaman, pencapaian, proyek, keahlian, sertifikasi, dan tautan penting Hajijin Amri.

**Demo:** [hajijinamri.me](https://hajijinamri.me)

## Ringkasan

Portofolio ini dibangun sebagai situs statis yang cepat dan responsif. Halaman utama menampilkan empat proyek unggulan, sedangkan seluruh koleksi proyek tersedia pada halaman khusus agar pengalaman membaca tetap fokus dan rapi.

## Fitur

- Profil profesional dan tautan kontak.
- Riwayat pengalaman, pendidikan, pencapaian, serta sertifikasi.
- Empat proyek unggulan di halaman utama.
- Halaman **Semua Proyek** di `/proyek` dengan deskripsi lengkap, teknologi, dan tautan demo, dashboard, repository, atau sertifikat.
- Tema gelap/terang dan navigasi yang responsif untuk perangkat seluler.
- Pratinjau sertifikat serta tautan dokumen pendukung.
- Server Node.js ringan untuk menyajikan hasil build statis, mendukung kompresi Brotli/Gzip dan cache aset.

## Teknologi

- [Astro](https://astro.build/) untuk pembuatan situs statis.
- [TypeScript](https://www.typescriptlang.org/) untuk struktur data proyek.
- [Lucide](https://lucide.dev/) untuk ikon.
- [Tailwind CSS](https://tailwindcss.com/) melalui plugin Vite.
- Node.js HTTP server untuk deployment mandiri.

## Menjalankan Secara Lokal

### Prasyarat

- Node.js 22 atau versi yang kompatibel.
- npm.

### Instalasi

```bash
git clone https://github.com/amri134/portofoliohajijinamri.github.io.git
cd portofoliohajijinamri.github.io
npm install
```

### Mode pengembangan

```bash
npm run dev
```

Buka alamat yang ditampilkan Astro di terminal, biasanya `http://localhost:4321`.

### Build produksi

```bash
npm run build
```

Hasil situs statis akan tersedia pada folder `dist/`.

### Menjalankan hasil build

```bash
npm start
```

Server akan berjalan pada `http://localhost:3000`. Untuk menggunakan port lain, atur environment variable `PORT` sebelum menjalankan perintah tersebut.

## Skrip

| Perintah | Keterangan |
| --- | --- |
| `npm run dev` | Menjalankan Astro dalam mode pengembangan. |
| `npm run build` | Memvalidasi dan membuat berkas produksi ke `dist/`. |
| `npm run preview` | Meninjau hasil build dengan server Astro. |
| `npm start` | Menyajikan folder `dist/` dengan server Node.js. |

## Struktur Proyek

```text
.
├── public/                 # Aset publik: gambar, CV, sertifikat, dan favicon
├── src/
│   ├── components/         # Komponen bagian-bagian halaman portofolio
│   ├── data/projects.ts    # Satu sumber data untuk seluruh proyek
│   └── pages/              # Halaman Astro, termasuk /proyek
├── style.css               # Gaya global situs
├── server.js               # Server statis Node.js untuk produksi
└── astro.config.mjs        # Konfigurasi Astro
```

## Rute

| Rute | Keterangan |
| --- | --- |
| `/` | Halaman utama portofolio. |
| `/proyek` | Daftar lengkap proyek beserta detail dan tautannya. |

## Memperbarui Daftar Proyek

Seluruh data proyek dikelola pada [src/data/projects.ts](src/data/projects.ts). Tambahkan atau ubah satu objek proyek pada file tersebut; perubahan akan digunakan secara otomatis di halaman utama dan halaman `/proyek`.

## Lisensi

Hak cipta © 2026 Hajijin Amri. Konten, sertifikat, dan aset pada repository ini digunakan untuk keperluan portofolio pribadi.
