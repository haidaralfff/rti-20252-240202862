# Proposal Penelitian: Evaluasi Komparatif Performa Express.js vs Gin untuk REST API dengan Variasi Kompleksitas Query Database

## 1. Latar Belakang

Perkembangan aplikasi web modern semakin mengarah pada arsitektur *microservices* dan API RESTful yang scalable. Pilihan *web framework* menjadi salah satu faktor penentu yang mempengaruhi performa, *development productivity*, dan biaya operasional sistem. Di antara framework yang dominan digunakan, Express.js (JavaScript/Node.js) dan Gin (Go) merepresentasikan dua paradigma eksekusi yang berbeda: *single-threaded event loop* versus *multi-threaded compiled native*.

Express.js telah menjadi *de facto* standard untuk pengembangan backend Node.js berkat kesederhanaan dan ekosistem *middleware* yang kaya. Namun, arsitektur *single-threaded event loop* Node.js memiliki karakteristik khusus: ia menangani I/O secara *non-blocking* dengan sangat efisien, tetapi operasi komputasi intensif atau konversi tipe data (seperti *serialization/deserialization* JSON, *routing*, dan *binding* parameter database) menimbulkan overhead yang signifikan pada *event loop* utama.

Gin, di sisi lain, dibangun menggunakan bahasa Go yang dikompilasi menjadi *native binary*. Go menggunakan model konkurensi berbasis *goroutine* dengan *multiplexing* oleh *runtime scheduler* menggunakan algoritma *work-stealing*. Model ini menghindari latensi *context switching* ekstrem dari model *one-thread-per-request* sambil tetap menjaga kemudahan pemrograman *multi-threaded*. Framework Gin dirancang khusus untuk *throughput* tinggi dengan *radix tree* routing yang optimal dan *zero-allocation* JSON binding.

Performa kedua framework ini telah menjadi subjek banyak diskusi komunitas, namun literatur akademis yang menyajikan evaluasi komparatif kuantitatif dengan metodologi yang rigor masih terbatas. Banyak benchmark yang ada bersifat *micro-benchmark* (satu endpoint, satu VU) yang tidak mencerminkan beban produksi nyata dengan kombinasi *handler* sederhana, *database query* tunggal, dan *query* kompleks beragregasi.

## 2. Rumusan Masalah

Berdasarkan latar belakang di atas, rumusan masalah penelitian ini adalah:

1. Bagaimana perbedaan performa latency antara Express.js dan Gin pada tiga skenario beban yang berbeda (baseline, single query, complex query)?
2. Apakah keunggulan performa Gin tetap konsisten seiring meningkatnya kompleksitas operasi database?
3. Bagaimana karakteristik distribusi dan variabilitas latency masing-masing framework dalam kondisi pengujian beban yang seragam?

## 3. Tujuan Penelitian

Tujuan utama penelitian ini adalah mengevaluasi dan membandingkan performa Express.js versus Gin untuk REST API dengan variasi kompleksitas query database. Secara spesifik:

1. Mengimplementasikan dua aplikasi backend yang isomorfik: satu dengan Express.js dan satu dengan Gin, dengan endpoint yang identik (`/api/simple`, `/api/users/:id`, `/api/users/stats`).
2. Menjalankan pengujian beban terstruktur menggunakan k6 pada tiga skenario per framework, dengan pengukuran metrik latency komprehensif (mean, median, p90, p95, p99).
3. Menganalisis distribusi latency, termasuk identifikasi outlier dan variansi, untuk memahami karakteristik *runtime* masing-masing framework.
4. Menyusun laporan evaluasi performa yang dapat dijadikan acuan pemilihan framework untuk pengembangan aplikasi backend skala produksi.

## 4. urgensi

Pemilihan framework backend memiliki dampak langsung terhadap biaya operasional, skalabilitas, dan pengalaman pengguna. Untuk sistem dengan target latency p95 < 50 ms dan throughput > 1000 RPS, margin keamanan yang diberikan oleh framework dapat menjadi faktor penentu kelayakan sistem. Dengan adanya data empiris yang komprehensif, pengembang dapat membuat keputusan yang lebih tepat antara Express.js (ekosistem matang, kurva belajar landai) dan Gin (perform compiled native, throughput tinggi).

## 5. Metodologi (Ringkasan)

### 5.1. Skenario Eksperimen

| Skenario | Endpoint | Deskripsi |
|---|---|---|
| `baseline` | `/api/simple` | Handler sederhana tanpa database query. |
| `db_single` | `/api/users/:id` | Single database query: `SELECT * FROM users WHERE id = ?`. |
| `db_complex` | `/api/users/stats` | Complex database query: agregasi dengan `COUNT`, `GROUP BY`, dan `JOIN`. |

### 5.2. Konfigurasi Pengujian

- **Tool**: k6 (Grafana k6)
- **Replikasi**: 40 replikasi per kombinasi framework × skenario
- **Metrik**: `http_req_duration` (latensi per request), `http_reqs` (total request), `http_req_failed` (request gagal)
- **Lingkungan**: Docker Compose dengan PostgreSQL 15, container terisolasi

### 5.3. Metrik Evaluasi

1. **Mean** — rerata latency (ms)
2. **Median** — nilai tengah, robust terhadap *outlier*
3. **Persentil (p90, p95, p99)** — indikator *tail latency*
4. **IQR dan Outlier Ratio** — konsistensi distribusi

## 6. Daftar Pustaka (Preliminary)

[1] Mangapul Siahaan dan Ricky Wijaya, "Performance Comparison Between Laravel and ExpressJs Framework Using Apache JMeter," *JITE*, 2024.

[2] Tedi Purwanto, "Analisa Perbandingan Kinerja REST API dengan Framework Flask, Laravel, dan Express JS," 2023.

[3] Supria et al., "Perbandingan Performa Framework Laravel, Flask API Python, dan PHP Native untuk Aplikasi API pada Data AIS Polbeng," *Politeknik Negeri Bengkalis*.

[4] Wira Hadinata dan Lilis Stianingsih, "Analisis Perbandingan Performa RESTful API Antara Express.js dengan Laravel Framework dengan JMeter," *JITET*, 2024.

[5] Aufa Syaihan Azzahidi, Bangun Wijayanto, dan Agus Darmawan, "Performance Evaluation of Backend Frameworks for REST API: A Comparative Study of Spring Boot, Flask, Express.js, Laravel FrankenPHP, and Gin," *JUTIF*, 2025.
