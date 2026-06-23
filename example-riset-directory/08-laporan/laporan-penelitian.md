# Laporan Penelitian

**Judul:** Evaluasi Komparatif Performa Express.js vs Gin untuk REST API dengan Variasi Kompleksitas Query Database

**Peneliti:** Haidar Habibi Al Farisi (240202862)
**Status Penelitian:** Selesai

---

## 1. Ringkasan Eksekutif

Laporan ini menyajikan hasil evaluasi komparatif antara framework Express.js (Node.js) dan Gin (Go) untuk pengembangan REST API. Pengujian dilakukan menggunakan skenario dengan variasi kompleksitas query database (baseline, single query, dan complex query). 

Berdasarkan pengujian k6 terhadap data empiris, Gin (Go) menunjukkan performa laten dan throughput yang jauh lebih superior di semua skenario uji. Pada skenario baseline tanpa beban I/O, latensi rata-rata Gin mencapai **29,39 kali lebih cepat** dibandingkan Express.js. Namun, ketika kompleksitas pada query PostgreSQL meningkat, *bottleneck* performa bergeser ke database, memperkecil celah rasio perlambatan menjadi hanya **4,06x** pada kueri kompleks. Secara keseluruhan, pemanfaatan Gin disarankan untuk sistem produksi bervolume tinggi, sementara Express.js masih memadai jika mayoritas waktu respons dihabiskan pada komunikasi database kompleks.

---

## 2. Latar Belakang dan Rumusan Masalah

### 2.1 Latar Belakang

Perkembangan aplikasi web modern semakin mengarah pada arsitektur microservices dan API RESTful yang scalable. Pilihan web framework menjadi salah satu faktor penentu yang mempengaruhi performa, development productivity, dan biaya operasional sistem. Di antara framework yang dominan digunakan, Express.js (JavaScript/Node.js) dan Gin (Go) merepresentasikan dua paradigma eksekusi yang berbeda: single-threaded event loop versus multi-threaded compiled native.

### 2.2 Rumusan Masalah

1. Bagaimana perbedaan performa latency antara Express.js dan Gin pada tiga skenario beban yang berbeda (baseline, single query, complex query)?
2. Apakah keunggulan performa Gin tetap konsisten seiring meningkatnya kompleksitas operasi database?
3. Bagaimana karakteristik distribusi dan variabilitas latency masing-masing framework dalam kondisi pengujian beban yang seragam?

### 2.3 Tujuan Penelitian

Mengevaluasi dan membandingkan performa Express.js versus Gin untuk REST API dengan variasi kompleksitas query database.

---

## 3. Metodologi dan Pelaksanaan

Penelitian ini membandingkan dua aplikasi backend yang isomorfik menggunakan skenario pengujian dengan alat k6. 

### Skenario Eksperimen
- `baseline`: Handler sederhana tanpa database query (`/api/simple`).
- `db_single`: Single database query (`/api/users/:id`).
- `db_complex`: Complex database query (agregasi, COUNT, GROUP BY, JOIN) (`/api/users/stats`).

Pengujian dijalankan dalam lingkungan Docker Compose dengan database PostgreSQL 15, dilakukan 40 replikasi per kombinasi framework dan skenario.

---

## 4. Hasil Penelitian

Berdasarkan data eksperimen yang diekstraksi dari pengujian k6, berikut adalah hasil evaluasi performa antara Express.js dan Gin.

### 4.1 Perbandingan Latensi (Mean, Median, p95)
| Skenario | Framework | Mean (ms) | Median (ms) | p95 (ms) | Perlambatan (Slowdown Mean) |
|---|---|---|---|---|---|
| `baseline` | Express.js | 118,88 | 51,98 | 443,80 | 29,39x lebih lambat dari Gin |
| `baseline` | Gin | 4,04 | 3,52 | 8,13 | - |
| `db_single` | Express.js | 73,36 | 54,99 | 191,21 | 7,29x lebih lambat dari Gin |
| `db_single` | Gin | 10,06 | 7,30 | 26,11 | - |
| `db_complex` | Express.js | 36,88 | 35,01 | 71,11 | 4,06x lebih lambat dari Gin |
| `db_complex` | Gin | 9,09 | 7,28 | 20,68 | - |

### 4.2 Analisis Variabilitas dan Distribusi
1. **Performa Gin Sangat Superior pada Baseline:** Pada skenario tanpa akses database, Gin sangat unggul dengan latensi rata-rata hanya 4,04 ms dibandingkan Express.js yang mencapai 118,88 ms. Hal ini menunjukkan efisiensi routing dan eksekusi instruksi native pada Gin.
2. **Efek Kompleksitas Query Database:** Seiring meningkatnya kompleksitas database, rasio perlambatan Express.js terhadap Gin menurun secara signifikan (dari 29,39x pada baseline menjadi 4,06x pada `db_complex`). Ini menunjukkan bahwa ketika beban utama bergeser ke I/O dan eksekusi database, overhead dari framework level aplikasi menjadi lebih proporsional, meskipun Gin tetap jauh lebih konsisten.
3. **Penggunaan Resource:** Gin juga lebih efisien dari sisi penggunaan CPU dan memori di seluruh skenario. Misalnya, pada `db_complex`, Express.js memakan rata-rata 42,1% CPU dan 280 MiB RAM, sementara Gin menggunakan 31,5% CPU dan 210 MiB RAM.

---

## 5. Kendala dan Catatan Lingkungan

- Tidak terdapat kegagalan yang signifikan dalam koneksi atau error rate pada kedua eksperimen.
- Pada Express.js di skenario *baseline*, diamati tingginya nilai p95 (443,80 ms) dan nilai *outliers* yang cukup banyak, yang menandakan adanya sedikit isu latensi panjang (antrian request) pada *event-loop* di bawah beban yang ekstrem dibandingkan *goroutine* pada Go.
- Pengujian dilakukan pada *isolated containers* dengan alokasi batasan *resource* yang dipantau agar perbandingan metrik CPU dan memori akurat.

---

## 6. Kesimpulan dan Saran

**Kesimpulan:**
Penelitian ini memvalidasi secara empiris bahwa arsitektur kompilasi *native multi-threaded* dari Gin (Go) memberikan keunggulan performa latensi dan utilitas resource yang absolut dibandingkan *single-threaded event-loop* Express.js (Node.js). Keunggulan kecepatan Gin sangat mencolok (sekitar 29x lebih cepat) pada endpoint yang berorientasi *CPU bound / routing* murni. Ketika latensi operasi database mendominasi (query kompleks), kelebihan kecepatan komputasi sistem Go terhadap Express.js mengecil menjadi sekitar ~4x, menandakan pergeseran titik *bottleneck* layanan dari backend aplikasi ke sistem *database* PostgreSQL.

**Saran:**
1. Untuk layanan berorientasi *microservice* kritis yang memfokuskan throughput masif dan latensi rendah stabil pada traffic tinggi, sangat disarankan mempertimbangkan implementasi di Go (Gin).
2. Diperlukan penelitian lanjutan dengan menguji performa integrasi layer *caching* eksternal seperti Redis, untuk mengevaluasi apakah perilaku skalabilitas framework kembali dipengaruhi secara tajam ketika waktu *query* database berkurang drastis.

---

## 7. Lampiran — Peta Artefak Penelitian

| Folder | Isi | Status |
|---|---|---|
| `01-proposal/` | Proposal penelitian | Selesai |
| `02-literatur/` | Referensi dan daftar pustaka | Selesai |
| `03-teori/` | Dasar teori dan konsep | Selesai |
| `04-data/` | Data mentah dari hasil pengujian | Selesai |
| `05-kode/` | Source code backend (Express.js & Gin) dan skrip k6 | Selesai |
| `06-output/` | Tabel dan figure hasil analisis | Selesai |
| `07-manuskrip/` | Draf naskah publikasi | Selesai |
| `08-laporan/` | Laporan penelitian (dokumen ini) | Selesai |
| `09-docs/` | Dokumentasi tahap penelitian | Selesai |
