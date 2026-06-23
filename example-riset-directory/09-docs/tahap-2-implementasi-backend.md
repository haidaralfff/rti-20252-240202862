# Tahap 2: Implementasi Backend (Express.js & Gin)

**Status:** Selesai

## 1. Tujuan

Mengimplementasikan dua instance backend yang ekuivalen (satu menggunakan Express.js, satu menggunakan Gin) agar *bottleneck* performa yang muncul murni bersumber dari karakteristik kerangka kerja (framework) dan rutinitas bahasa pemrograman, bukan dari ketimpangan struktur kode.

## 2. API Spesifikasi

Kedua layanan mengekspos endpoint HTTP yang identik:

- **GET `/api/simple`**: Return JSON statis `{"message": "Hello World"}` (Skenario `baseline`).
- **GET `/api/users/:id`**: Return 1 record pengguna dari tabel `users` (Skenario `db_single`).
- **GET `/api/users/stats`**: Return rekap agregasi jumlah aktivitas per *activity_type* menggunakan `GROUP BY` dan `JOIN` (Skenario `db_complex`).

## 3. Implementasi Express.js (Node.js)

- **Driver Database**: Menggunakan `pg` (node-postgres) dengan *connection pooling*.
- **Routing**: Express Router standar.
- **Karakteristik**: Berjalan pada single-threaded event loop. Semua interaksi I/O (database) dilakukan secara *asynchronous* (`async/await`) untuk tidak memblokir antrian trafik masuk.

## 4. Implementasi Gin (Go)

- **Driver Database**: Menggunakan `pgx/pgxpool` yang merupakan driver standar tercepat untuk PostgreSQL di Go.
- **Routing**: Radix-tree router bawaan dari framework Gin.
- **Karakteristik**: Menggunakan goroutines (lightweight threads). Tiap HTTP request di-handle oleh goroutine terpisah yang di-*multiplexing* oleh Go scheduler secara otomatis, sangat efektif untuk operasi *blocking* I/O.

## 5. Docker Compose & Environment

Kedua layanan dibungkus dalam *Docker container* dan dibatasi penggunaan resourcenya (CPU limit) untuk memastikan *fair-play* selama proses load testing. Healthcheck dipasang untuk memastikan k6 baru dijalankan setelah koneksi PostgreSQL tersedia.
