# Frontend CRUD Comments App

Aplikasi web sederhana yang dibangun dengan **Next.js** untuk menampilkan, membuat, dan menghapus data komentar. Aplikasi ini memiliki sistem otentikasi berbasis _cookie_ untuk melindungi halaman utamanya.

Data komentar awal diambil dari API publik [JSONPlaceholder](https://jsonplaceholder.typicode.com/), sementara data yang baru dibuat atau dihapus akan disimpan di `localStorage` pada sesi _browser_ pengguna.

## Fitur Utama

- **Otentikasi Pengguna**: Halaman _dashboard_ dan _create_ dilindungi dan hanya bisa diakses setelah _login_.
- **CRUD Komentar**:
  - **Read**: Menampilkan data komentar dalam tabel interaktif.
  - **Create**: Menambahkan komentar baru melalui formulir dengan validasi.
  - **Delete**: Menghapus komentar dengan dialog konfirmasi.
- **Tabel Interaktif**: Fitur pencarian, pengurutan (_sorting_), dan paginasi (_pagination_) pada tabel data.
- **Navigasi Cepat**: Perpindahan antar halaman yang mulus menggunakan `next/link`.
- **Penyimpanan Lokal**: Komentar baru dan data yang dihapus akan tersimpan di `localStorage` agar perubahan tetap ada selama sesi _browser_.

## Tumpukan Teknologi (Tech Stack)

- **Framework**: [Next.js](https://nextjs.org/) (dengan Turbopack)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**:
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Bootstrap 5](https://getbootstrap.com/)
- **Komponen UI**:
  - [PrimeReact](https://primereact.org/) (khususnya untuk `DataTable` & `ConfirmDialog`)
  - [PrimeIcons](https://primefaces.org/primeicons/)
  - [PrimeFlex](https://primeflex.org/)

## Cara Menjalankan Proyek

### Prasyarat

- [Node.js](https://nodejs.org/en/) (v18.18.0 atau yang lebih baru)
- [npm](https://www.npmjs.com/) (atau `yarn`/`pnpm`)

### Instalasi

1.  **Clone repositori ini:**

    ```bash
    git clone [https://github.com/fauqaji/frontend_development_test.git](https://github.com/fauqaji/frontend_development_test.git)
    cd frontend_development_test
    ```

2.  **Instal semua _dependency_ yang dibutuhkan:**
    ```bash
    npm install
    ```

### Menjalankan Server Pengembangan

1.  **Jalankan server pengembangan dengan Turbopack:**

    ```bash
    npm run dev
    ```

2.  Buka browser Anda dan akses <http://localhost:3000>.

### Informasi Login

Untuk masuk ke aplikasi, Anda bisa menggunakan _username_ dan _password_ apa pun, selama kedua _field_ tersebut tidak kosong.

## Struktur Proyek

```
/
├── components/         # Komponen React yang dapat digunakan kembali
│   ├── CommentsTable.tsx # Tabel untuk menampilkan data
│   └── LogoutButton.tsx  # Tombol untuk logout
├── public/             # Aset statis
└── src/
    ├── app/            # Direktori App Router dari Next.js
    │   ├── create/
    │   ├── dashboard/
    │   ├── login/
    │   └── layout.tsx    # Layout utama aplikasi
    └── middleware.ts     # Middleware untuk otentikasi
```

## Proses Pengembangan

Proyek ini dibangun dari _template_ standar `create-next-app` dan kemudian dikembangkan dengan menambahkan beberapa _library_ UI dan logika kustom.

- **Otentikasi**: Menggunakan Next.js Middleware untuk memeriksa _cookie_ `auth`. Logika ini terpusat di `src/middleware.ts` dan melindungi rute yang ditentukan.
- **Manajemen Data**: Data awal diambil di sisi server (_server-side_) pada halaman `/dashboard`. Setiap perubahan (penambahan atau penghapusan) kemudian disinkronkan dengan `localStorage` di sisi klien untuk memberikan pengalaman pengguna yang responsif.
- **Styling**: Proyek ini menggabungkan Bootstrap untuk komponen dasar (seperti tombol dan form), PrimeReact untuk komponen kompleks (tabel), dan Tailwind CSS untuk tata letak dan _styling_ kustom.
