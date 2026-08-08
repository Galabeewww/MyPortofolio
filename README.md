# 🚀 Modern Interactive Digital Portfolio & CRUD Showcase

Sebuah aplikasi web portofolio personal yang modern, responsif, dan elegan yang dibangun menggunakan **React.js**, **Tailwind CSS**, **Node.js**, dan **Supabase**. Dilengkapi dengan fitur Manajemen Konten (CRUD), Dukungan Multi-Bahasa (English & Bahasa Indonesia), Animasi _Liquid Theme Spill_, serta Pop-up Detail Proyek Interaktif.

---

## 📌 Fitur Utama

- 🎨 **Desain Monokrom Minimalis & Premium**: Antarmuka modern dengan tipografi besar, efek pita diagonal (_diagonal ribbon overlay_), serta tata letak responsif.
- 🌓 **Mode Terang / Gelap Interaktif (Liquid Theme Spill)**: Saklar tema melayang di sudut kanan bawah dengan efek animasi tumpahan air melingkar yang memancar saat diklik.
- 🌐 **Dukungan Multi-Bahasa (EN / ID)**: Berbahasa Inggris secara default dengan tombol saklar `EN`/`ID` di navbar untuk berpindah ke Bahasa Indonesia secara instan.
- 📱 **Pop-up Detail Proyek Interaktif**: Modal dialog detail proyek yang menampilkan galeri gambar carousel (`1/5`), indikator counter, deskripsi lengkap, metadata tanggal & kategori, tags teknologi, serta navigasi proyek (`Next >` & `< Prev`).
- ⚡ **Manajemen Konten CRUD Penuh (Node.js & Supabase / LocalStorage)**: Dashboard admin privat (`/admin/login`) untuk mengelola Proyek, Keahlian Teknis (Skills), dan Kategori.
- 🔒 **Keamanan Dashboard Admin**: Route terlindungi (`ProtectedRoute`), menu admin tersembunyi dari publik, logo admin berikon dropdown logout, serta **Auto-Logout Otomatis Sesi Admin** setelah 3 menit tidak ada aktivitas.
- 🔄 **Animasi Marquee Bergerak Dinamis**: Barisan keahlian teknis dan teks ribbon diagonal bergerak meluncur secara terintegrasi dan sinkron.

---

## 🛠️ Teknologi & Tools

| Kategori                      | Teknologi / Library                       |
| :---------------------------- | :---------------------------------------- |
| **Frontend Framework**        | React.js (Vite)                           |
| **Styling & Design System**   | Tailwind CSS v4, Custom Vanilla CSS       |
| **Icons & Alerts**            | Lucide React, SweetAlert2                 |
| **Backend & Online Database** | Supabase (PostgreSQL & Storage)           |
| **State & Auth Management**   | React Context API (Theme, Auth, Language) |
| **Deployment Platform**       | Vercel (CI/CD GitHub Integration)         |

---

## 💻 Instalasi & Cara Menjalankan Proyek Lokal

### Prasyarat

- Node.js (Versi 18.x atau terbaru)
- npm / yarn / pnpm

### 1. Clone Repository

```bash
git clone https://github.com/Galabeewww/MyPortofolio.git
cd MyPortofolio
```

### 2. Install Dependensi

```bash
npm install
```

### 3. Konfigurasi Environment Variables (Opsional untuk Supabase)

Buat file `.env` di root direktori proyek jika ingin mengintegrasikan Supabase secara online:

```env
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

_Catatan: Jika Supabase tidak dikonfigurasi, aplikasi secara otomatis menggunakan `LocalStorage` mode sehingga fitur CRUD tetap berjalan 100% tanpa error._

### 4. Jalankan Server Dev Lokal

```bash
npm run dev
```

Buka browser dan akses `http://localhost:5173`.

### 5. Build Produksi

Untuk menguji hasil kompilasi produksi:

```bash
npm run build
```

---

## 👥 Kontributor

Proyek ini dirancang, dikembangkan, dan dipelihara oleh:

| Nama                           | Peran                              | Tautan Profil                                                                                                                                                                                                                                                                                                    |
| :----------------------------- | :--------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Muhammad Abi Rafdi Pratama** | Lead Developer & Quality Assurance | [<img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white" />](https://github.com/Galabeewww) &nbsp; [<img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white" />](https://www.linkedin.com/in/muhammad-abi-rafdi-pratama-436044290/) |

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah lisensi MIT - Bebas digunakan dan dikembangkan kembali.
