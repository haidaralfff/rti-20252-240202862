# Pendahuluan

## Latar Belakang

Perkembangan aplikasi web modern semakin mengarah pada arsitektur *microservices* dan API RESTful yang scalable. Pilihan *web framework* menjadi salah satu faktor penentu yang mempengaruhi performa, 개발 생산성, dan biaya operasional sistem. Di antara framework yang dominan digunakan, Express.js (JavaScript/Node.js) dan Gin (Go) merepresentasikan dua paradigma eksekusi yang berbeda: *single-threaded event loop* versus *multi-threaded compiled native*.

Express.js telah menjadi *de facto* standard untuk pengembangan backend Node.js berkat kesederhanaan dan ekosistem middleware yang kaya. Namun, arsitektur *single-threaded event loop* Node.js memiliki karakteristik khusus: ia menangani I/O secara *non-blocking* dengan sangat efisien, tetapi operasi komputasi intensif atau konversi tipe data (seperti *serialization/deserialization* JSON, *routing*, dan *binding* parameter database) menimbulkan overhead yang signifikan pada *event loop* utama.

Gin, di sisi lain, dibangun menggunakan bahasa Go yang dikompilasi menjadi *native binary*. Go menggunakan model konkurensi berbasis *goroutine* dengan *multiplexing* oleh *runtime scheduler* pada *thread pool* berbasis *work-stealing*. Model ini menghindari latensi *context switching* ekstrem dari model *one-thread-per-request* sambil tetap menjaga kemudahan pemrograman *multi-threaded*. Framework Gin dirancang specifically untuk *throughput* tinggi dengan *radix tree* routing yang optimal dan *zero-allocation* JSON binding.

Performa kedua framework ini telah menjadi subjek banyak diskusi komunitas, namun literatur akademis yang menyajikan evaluasi komparatif kuantitatif dengan metodologi yang rigor masih terbatas. Banyak benchmark yang ada bersifat *micro-benchmark* (satu endpoint, satu VU) yang tidak mencerminkan beban produksi nyata dengan kombinasi *handler* sederhana, *database query* tunggal, dan *query* kompleks beragregasi.

## Rumusan Masalah

Berdasarkan latar belakang di atas, rumusan masalah penelitian ini adalah:

1. Bagaimana perbedaan performa latency antara Express.js dan Gin pada three skenario beban yang berbeda (baseline, single query, complex query)?
2. Apakah keunggulan performa Gin tetap konsisten seiring meningkatnya kompleksitas operasi database?
3. Bagaimana karakteristik distribusi dan variabilitas latency masing-masing framework dalam kondisi pengujian beban yang seragam?

## Tujuan Penelitian

Tujuan utama penelitian ini adalah mengevaluasi dan membandingkan performa Express.js versus Gin untuk REST API dengan variasi kompleksitas query database. Secara spesifik:

1. Mengimplementasikan dua aplikasi backend yang isomorfik: satu dengan Express.js dan satu dengan Gin, dengan endpoint yang identik (`/api/simple`, `/api/users/:id`, `/api/users/stats`).
2. Menjalankan pengujian beban terstruktur menggunakan k6 pada tiga skenario per framework, dengan pengukuran metrik latency komprehensif (mean, median, p90, p95, p99).
3. Menganalisis distribusi latency, termasuk identifikasi outlier dan variansi, untuk memahami karakteristik *runtime* masing-masing framework.
4. Menyusun laporan evaluasi performa yang dapat dijadikan acuan pemilihan framework untuk pengembangan aplikasi backend skala produksi.

## Kontribusi

Kontribusi utama penelitian ini:

1. **Dataset benchmark publik** — menyediakan data k6 mentah dan hasil olahan untuk perbandingan Express.js vs Gin, mencakup >640k data point.
2. **Evaluasi multipl skenario** — tidak hanya *handler* kosong, melainkan menyertakan skenario database single query dan complex query yang lebih representatif aplikasi nyata.
3. **Analisis distribusi komprehensif** — menggunakan mean, median, persentil (p90, p95, p99), dan deteksi outlier (IQR method) untuk memberikan gambaran performa yang akurat dan tidak bias terhadap distribusi skewed.
4. **Komentari terkait arsitektur runtime** — menghubungkan temuan empiris dengan karakteristik arsitektur Node.js (*event loop*) dan Go (*goroutine scheduler*).
