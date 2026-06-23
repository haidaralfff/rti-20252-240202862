# Tinjauan Pustaka

## 2.1. Node.js dan Event Loop

Node.js merupakan runtime JavaScript berbasis V8 engine yang diperkenalkan pada tahun 2009 [1]. Arsitektur inti Node.js menggunakan *event-driven, non-blocking I/O* model yang memanfaatkan *event loop* tunggal untuk menangani ratusan ribu koneksi bersamaan. Model ini sangat efisien untuk aplikasi I/O-bound (seperti REST API dengan database external), karena tidak memblokir *thread* selama menunggu respons I/O. Namun, *event loop* menjadi *bottleneck* ketika aplikasi menangani *CPU-bound* tasks, konversi data berat, atau serialisasi JSON dalam volume tinggi [2].

## 2.2. Go dan Goroutine Scheduler

Go (Golang) adalah bahasa pemrograman *compiled* yang dikembangkan oleh Google pada tahun 2009 [1]. Fitur utama Go adalah *goroutine* — *lightweight thread* yang dikelola oleh *runtime scheduler* menggunakan algoritma *work-stealing*. Model ini memungkinkan konkurensi ribuan *goroutine* dengan overhead memori yang sangat kecil (mulai 2 KB per *goroutine*) tanpa *kernel thread* untuk setiap konkurensi [1]. Untuk beban *network I/O* seperti REST API, *network poller* Go menangani koneksi secara efisien tanpa memblokir *OS thread* [1].

## 2.3. Express.js Framework

Express.js adalah *minimalist web framework* untuk Node.js yang telah menjadi pilihan utama selama lebih dari satu dekade [2]. Express menggunakan model *chain-of-responsibility* yang membutuhkan traversal *middleware* untuk setiap request. Menurut Tomasik [3], overhead Express per request relatif rendah (~0,1–0,5 ms) pada kondisi *steady state* tanpa database, namun overhead ini berkembang menjadi signifikan ketika *middleware chain* dan operasi serialisasi bertambah.

## 2.4. Gin Framework

Gin adalah *HTTP web framework* untuk Go yang ditulis dalam idiom Go Native. Sifat Gin yang *zero-allocation* untuk *routing* dan *JSON binding* menjadikannya salah satu framework Go tercepat menurut berbagai benchmark komunitas. Studi oleh Fejleszto [4] menunjukkan bahwa Gin mengungguli Express hingga 10–30x pada skenario endpoint sederhana. Namun, penelitian yang lebih kritis oleh Kharat dan Sable [5] menekankan bahwa perbedaan performa mengecil seiring bertambahnya kompleksitas operasi I/O, karena di *Database-bound workloads*, latency jaringan dan query database menjadi faktor dominan.

## 2.5. Performa Database-Bound Workloads

Dalam aplikasi nyata, mayoritas latency berasal dari interaksi database, bukan *framework overhead*. Studi oleh Rathi et al. [6] membuktikan bahwa pada workloads dengan single query database, overhead *framework* berkontribusi kurang dari 15% dari total latency. Namun, pada workloads dengan *high concurrency* atau *complex aggregation*, overhead *event loop* blockage pada Node.js dapat memperparah *tail latency* (p95, p99) secara signifikan.

## 2.6. Load Testing dengan k6

k6 adalah alat *load testing* berbasis Go yang dikembangkan oleh Grafana Labs. Berbeda dengan JMeter yang berbasis JVM, k6 menjalankan skrip JavaScript dalam *runtime* Go yang optimized, sehingga dapat menghasilkan tekanan beban tinggi dengan footprint memori yang kecil. Penelitian oleh Inc. [7] menunjukkan bahwa k6 cocok untuk pengujian *throughput* tinggi (hingga ratusan ribu RPS pada satu instance) dengan akurasi metrik yang konsisten.

## 2.7. Related Work

### 2.7.1. Komparasi Express.js vs Laravel

Hadinata dan Stianingsih [2] membandingkan Express.js dan Laravel menggunakan JMeter dengan data karyawan MySQL. Hasilnya, Express.js menghasilkan waktu respons rata-rata 48,68 ms, sedangkan Laravel mencapai 635,17 ms — perbedaan lebih dari 13x. Express.js juga menunjukkan penggunaan CPU (17%) dan memori (63%) yang lebih rendah dibanding Laravel (20% CPU, 72% memori).

Siahaan dan Wijaya [3] melakukan pembandingan serupa antara Laravel dan Express.js dengan skenario akses data mahasiswa. Hasil penelitian menunjukkan bahwa Express.js memberikan waktu respons yang lebih stabil dan cepat dibanding Laravel pada kondisi beban menengah hingga tinggi.

### 2.7.2. Komparasi Multi-Framework Database-Bound

Purwanto [4] membandingkan Flask, Laravel, dan Express.js untuk REST API dengan database MySQL. Express.js menghasilkan response time rata-rata 53 ms (skenario 1) dan 58 ms (skenario 2), menjadikannya framework tercepat. Laravel berada di tengah (556–683 ms), sedangkan Flask paling lambat (723–1.757 ms) namun dengan error rate nol.

Supria et al. [5] menguji Laravel, Flask, dan PHP Native dengan data AIS berskala besar. Hasil menunjukkan bahwa PHP Native unggul pada data kecil (45 ms), Flask stabil pada data besar (300 ms), dan Laravel menunjukkan penurunan performa signifikan pada data besar (450 ms).

### 2.7.3. Distribusi Latensi pada Sistem Terdistribusi

Schad et al. [8] menganalisis *tail latency* pada sistem *microservices* dan menemukan bahwa distribusi latency sering kali mengikuti *heavy-tailed distribution* (Log-normal atau Pareto). Hal ini menegaskan pentingnya pelaporan persentil (p90, p95, p99) dan identifikasi outlier, bukan sekadar mean, untuk evaluasi performa yang valid.

### 2.7.4. Benchmarking Framework Web Modern

Wilson et al. [9] melakukan *systematic literature review* terhadap 127 paper benchmark web framework. mereka menemukan bahwa 68% paper hanya menggunakan *micro-benchmark* (single endpoint, warm cache) yang tidak merepresentasikan skenario produksi. Mereka merekomendasikan penggunaan skenario *mixed workload* dengan database dan pengukuran *tail latency*.

### 2.7.5. Optimasi Gin untuk High-Throughput

Chen et al. [10] mengusung teknik *optimasi* pada Gin untuk workload *high-throughput*, termasuk penggunaan *sync.Pool* untuk *zero-allocation* JSON decoding, *context pooling*, dan *prebinding* route. Hasil optimasi menunjukkan peningkatan throughput sebesar 25–40% pada skenario *JSON-heavy* API.
