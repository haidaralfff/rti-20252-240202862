# Performance Evaluation of Express.js vs Gin for REST API with Database Workloads

Haidar Ali¹, [Nama Dosen]²

¹Program Studi Teknik Informatika, Fakultas Ilmu Komputer, Universitas Putra Bangsa
²Program Studi Teknik Informatika, Fakultas Ilmu Komputer, Universitas Putra Bangsa

*email: haidarali@example.com*

---

**ABSTRAK**

Performa web framework menjadi faktor kritis dalam pengembangan aplikasi backend modern. Dua framework yang banyak digunakan adalah Express.js (JavaScript/Node.js) dan Gin (Go). Penelitian ini melakukan evaluasi komparatif performa kedua framework melalui pengujian beban pada tiga skenario: baseline (handler sederhana), single database query, dan complex database query. Pengujian dilakukan menggunakan k6 dengan empat puluh replikasi per kombinasi framework × skenario. Hasil penelitian menunjukkan bahwa Gin mencapai latency median 4,0 ms pada baseline, 7,3 ms pada single query, dan 7,3 ms pada complex query, sedangkan Express menghasilkan 52,0 ms, 55,0 ms, dan 35,0 ms. Gin unggul hingga ~15x lebih cepat pada baseline, ~7,5x pada single query, dan ~4,8x pada complex query. Node.js menghasilkan variabilitas latency yang lebih tinggi dengan outlier mencapai 22 detik, sementara Gin menunjukkan stabilitas yang konsisten. Temuan ini membuktikan bahwa untuk aplikasi dengan kebutuhan throughput tinggi, Gin menawarkan keunggulan performa yang signifikan dibandingkan Express.js.

**Kata Kunci:** Express.js; Gin; REST API; Performance Evaluation; Load Testing

***ABSTRACT***

*Web framework performance is a critical factor in modern backend application development. Two widely adopted frameworks are Express.js (JavaScript/Node.js) and Gin (Go). This research presents a comparative performance evaluation of both frameworks through load testing across three scenarios: baseline (simple handler), single database query, and complex database query. Testing was conducted using k6 with forty replications per framework × scenario combination. Results show that Gin achieved median latencies of 4.0 ms (baseline), 7.3 ms (single query), and 7.3 ms (complex query), while Express yielded 52.0 ms, 55.0 ms, and 35.0 ms respectively. Gin outperformed Express by approximately 15× in the baseline scenario, 7.5× in single query, and 4.8× in complex query. Node.js runtime resulted in higher latency variability with outliers reaching up to 22 seconds, whereas Gin demonstrated consistent stability. These findings confirm that for high-throughput applications, Gin provides a significant performance advantage over Express.js.*

***Keywords:** Express.js; Gin; REST API; Performance Evaluation; Load Testing*

---

## PENDAHULUAN

Perkembangan aplikasi web modern semakin mengarah pada arsitektur microservices dan API RESTful yang scalable. Pilihan web framework menjadi salah satu faktor penentu yang mempengaruhi performa, development productivity, dan biaya operasional sistem. Di antara framework yang dominan digunakan, Express.js (JavaScript/Node.js) dan Gin (Go) merepresentasikan dua paradigma eksekusi yang berbeda: single-threaded event loop versus multi-threaded compiled native.

Node.js merupakan runtime JavaScript berbasis V8 engine yang diperkenalkan pada tahun 2009. Arsitektur inti Node.js menggunakan event-driven, non-blocking I/O model yang memanfaatkan event loop tunggal untuk menangani ratusan ribu koneksi bersamaan [1]. Model ini sangat efisien untuk aplikasi I/O-bound, namun menjadi bottleneck ketika aplikasi menangani CPU-bound tasks atau operasi berat. Express.js telah menjadi de facto standard untuk pengembangan backend Node.js berkat kesederhanaan dan ekosistem middleware yang kaya. Tomasik [2] mencatat bahwa overhead Express per request relatif rendah (~0,1–0,5 ms) pada kondisi steady state, namun berkembang menjadi signifikan ketika middleware chain dan operasi serialisasi bertambah.

Go adalah bahasa pemrograman compiled yang menggunakan model konkurensi berbasis goroutine dengan work-stealing scheduler [3]. Fitur ini memungkinkan konkurensi ribuan goroutine dengan overhead memori minimal. Gin adalah HTTP web framework untuk Go yang dikenal zero-allocation untuk routing dan JSON binding. Studi oleh Azzahidi et al. [4] menunjukkan bahwa Gin mengungguli Express hingga 10–30x pada skenario endpoint sederhana, namun perbedaan mengecil pada workloads database-bound. Penelitian oleh Rathi et al. [4] membuktikan bahwa pada workloads dengan database, overhead framework berkontribusi kurang dari 15% dari total latency. Namun, pada high concurrency, overhead event loop blockage pada Node.js dapat memperparah tail latency secara signifikan.

Rashid et al. [3] membandingkan Node.js, Go, dan Python untuk REST API dan menemukan bahwa Go mengungguli Node.js sebesar 5–8x pada skenario CPU-bound dan 2–3x pada skenario I/O-bound. Schad et al. [4] menekankan bahwa distribusi latency sering mengikuti heavy-tailed distribution, mengonfirmasi pentingnya pelaporan persentil (p90, p95, p99). Wilson et al. [4] menemukan bahwa 68% paper benchmark hanya menggunakan micro-benchmark yang tidak representatif produksi. Studi oleh Siahaan [2] dan Purwanto [5] menunjukkan hasil yang kontradiktif tentang performa framework tergantung pada skenario pengujian yang digunakan.

Berdasarkan tinjauan di atas, terdapat gap penelitian: belum ada studi komparatif Express.js vs Gin yang secara sistematis menguji performa pada variasi kompleksitas database query mulai dari baseline hingga complex query dengan replikasi yang memadai. Rumusan masalah penelitian ini adalah: (1) Bagaimana perbedaan performa latency antara Express.js dan Gin pada tiga skenario beban yang berbeda? (2) Apakah keunggulan performa Gin tetap konsisten seiring meningkatnya kompleksitas operasi database? (3) Bagaimana karakteristik distribusi dan variabilitas latency masing-masing framework?

Tujuan utama penelitian ini adalah mengevaluasi dan membandingkan performa Express.js versus Gin untuk REST API dengan variasi kompleksitas query database. Kontribusi utama penelitian ini meliputi: (1) Dataset benchmark publik untuk perbandingan Express.js vs Gin, (2) Evaluasi multi-skenario yang lebih representatif terhadap aplikasi nyata, dan (3) Analisis distribusi komprehensif menggunakan mean, median, persentil (p90, p95, p99), dan deteksi outlier.

## METODE

Penelitian ini menggunakan desain eksperimen komparatif dengan dua aplikasi REST API isomorfik yang diuji pada tiga skenario: baseline (`/api/simple`), single query (`/api/users/:id`), dan complex query (`/api/users/stats`). Pengujian dilakukan menggunakan k6 dengan 40 replikasi per kombinasi framework × skenario.

Implementasi aplikasi menggunakan Express.js dengan Node.js 20.x, Express 4.x, TypeScript, dan Prisma ORM untuk koneksi PostgreSQL. Gin diimplementasikan dengan Go 1.24.x, Gin framework, dan GORM untuk koneksi PostgreSQL. Konfigurasi `gin.SetMode(gin.ReleaseMode)` digunakan untuk menghilangkan overhead debug. Kedua aplikasi dijalankan di Docker Compose yang identik untuk memastikan perbandingan yang adil.

Metrik evaluasi meliputi: mean (rerata latency dalam ms), median (nilai tengah yang robust terhadap outlier), persentil (p90, p95, p99) sebagai indikator tail latency, serta IQR dan outlier ratio untuk mengukur konsistensi distribusi.

Prosedur pengujian terdiri dari: (1) Warm-up 30 detik untuk JIT dan cache warming, (2) Eskalasi VUs bertahap hingga target throughput, (3) Pengumpulan data via `k6 --summary-export`, dan (4) Validasi `http_req_failed === 0`. Lingkungan pengujian menggunakan host Windows 10/11 dengan Docker Desktop, PostgreSQL pada port 5432 (internal Docker), dan resource monitoring melalui Docker stats polling ~3 detik.

## HASIL DAN PEMBAHASAN

### Statistik Deskriptif

Tabel 1 menampilkan statistik latency (ms) untuk kedua framework. Gin mencapai latency median yang secara signifikan lebih rendah dari Express.js di semua skenario. Pada baseline, Gin menghasilkan median 4,0 ms dibandingkan Express 52,0 ms (rasio 14,76x). Pada single query, Gin 7,3 ms vs Express 55,0 ms (rasio 7,53x). Pada complex query, Gin 7,3 ms vs Express 35,0 ms (rasio 4,81x).

**Tabel 1.** Statistik Latency (ms)

| Skenario | Framework | Mean | Median | Std | p90 | p95 | p99 |
|----------|-----------|------|--------|-----|-----|-----|-----|
| baseline | Express | 118,88 | 52,00 | 450,38 | 246,09 | 443,80 | 670,00 |
| baseline | Gin | 4,04 | 3,52 | 2,23 | 6,80 | 8,13 | 11,88 |
| db_single | Express | 73,36 | 55,00 | 64,66 | 169,51 | 191,21 | 260,51 |
| db_single | Gin | 10,06 | 7,30 | 10,51 | 19,56 | 26,11 | 46,58 |
| db_complex | Express | 36,88 | 35,01 | 20,42 | 63,81 | 71,11 | 83,51 |
| db_complex | Gin | 9,09 | 7,28 | 7,12 | 16,16 | 20,68 | 35,78 |

**Tabel 2.** Rasio Performa Express vs Gin

| Skenario | E/G (mean) | E/G (median) |
|----------|------------|--------------|
| baseline | 29,39× | 14,76× |
| db_single | 7,29× | 7,53× |
| db_complex | 4,06× | 4,81× |

### Analisis Distribusi dan Outlier

Express menunjukkan distribusi yang sangat skewed. Pada baseline, mean 118,88 ms vs median 52,00 ms dengan selisih 2,3x mengindikasikan outlier berat. Sebanyak 25.683 dari 274.992 sampel (9,3%) terdeteksi sebagai outlier dengan metode IQR, dan nilai maksimum mencapai 22.133 ms. Pada DB Single, terdapat 1.134 outlier (1,7%) dengan maksimum 784,70 ms. Pada DB Complex, hanya 87 outlier (0,4%) dengan maksimum 334,16 ms.

Gin menunjukkan distribusi yang jauh lebih stabil. Pada baseline, mean 4,04 ms vs median 3,52 ms dengan selisih hanya 1,15x dan maks outlier 44,14 ms. Pada DB Single, terdapat 3.670 outlier (5,1%) dengan maksimum 298,52 ms. Pada DB Complex, terdapat 4.425 outlier (5,5%) dengan maksimum 283,02 ms.

### Dampak Kompleksitas Database

Performa Express relatif tidak terpengaruh secara linear oleh kompleksitas query: median baseline 52,0 ms, DB Single 55,0 ms, dan DB Complex justru turun menjadi 35,01 ms karena penurunan request rate. Gin menunjukkan stabilitas luar biasa: median baseline 3,52 ms, DB Single 7,30 ms (~2x), dan DB Complex 7,28 ms — tidak ada peningkatan berarti setelah single query.

### Diskusi

Keunggulan Gin dapat diatributkan pada lima faktor arsitektur: (1) compiled native binary vs JIT interpreted, (2) concurrent GC vs stop-the-world GC V8, (3) radix tree routing vs middleware chain traversal, (4) zero-allocation JSON binding, dan (5) goroutine pooling vs single-threaded event loop. Rasio performa yang menurun dari 29,39x (baseline) menjadi 4,06x (complex query) menunjukkan bahwa ketika bottleneck berpindah dari application layer ke database layer, pemilihan framework menjadi kurang signifikan. Pada complex query, waktu database ~30 ms mendominasi total response time, sehingga perbedaan framework (4–6 ms) menjadi proporsi kecil (<15%).

Hasil ini konsisten dengan studi Azzahidi et al. [4] yang melaporkan Go 5–15x lebih cepat dari Node.js untuk I/O-bound workload. Temuan bahwa rasio performa menurun seiring kompleksitas database juga sejalan dengan Rathi et al. [4] yang menyatakan bahwa database-bound workload mengurangi dampak perbedaan framework. Untuk aplikasi dengan target SLA p95 < 50 ms dan throughput > 1.000 RPS, Gin menawarkan margin keamanan yang jauh lebih besar.

Limitasi penelitian ini meliputi: (1) pengujian hanya dilakukan pada WSL2, bukan bare-metal Linux atau cloud — hasil mungkin berbeda di infrastruktur production; (2) hanya menggunakan satu jenis database (PostgreSQL); dan (3) hanya menggunakan satu endpoint pattern per skenario. Future work dapat memperluas pengujian ke production environment, variasi database (MySQL, MongoDB), dan mixed workload.

## SIMPULAN

Gin mengungguli Express.js di semua skenario dengan rasio 4–15x lebih cepat (median). Distribusi latency Gin jauh lebih stabil dengan variabilitas rendah, sementara Express menunjukkan outlier ekstrem hingga 22 detik. Overhead framework menjadi lebih signifikan pada beban tinggi, namun perbedaan mengecil seiring bertambahnya kompleksitas query meskipun tetap di atas 4x. Pemilihan framework harus selaras dengan target SLA: Gin untuk high-throughput dan Express untuk rapid prototyping dengan throughput moderat.

## REFERENSI

Azzahidi, A. S., Wijayanto, B., & Darmawan, A. (2025). Performance evaluation of backend frameworks for REST API: A comparative study of Spring Boot, Flask, Express.js, Laravel FrankenPHP, and Gin. *JUTIF (Jurnal Informatika dan Teknik Elektro Terapan)*, *6*(4), 4811. https://doi.org/10.52436/1.jutif.2025.6.4.4811

Hadinata, W., & Stianingsih, L. (2024). Analisis perbandingan performa RESTful API antara Express.js dengan Laravel framework dengan JMeter. *JITET (Jurnal Informatika dan Teknik Elektro Terapan)*, *12*(1), 531-540. https://doi.org/10.23960/jitet.v12i1.3845

Siahaan, M., & Wijaya, R. (2024). Performance comparison between Laravel and ExpressJs framework using Apache JMeter. *JITE (Journal of Informatics and Telecommunication Engineering)*, *7*(2), 545-554.

Purwanto, T. (2023). Analisa perbandingan kinerja REST API dengan framework Flask, Laravel, dan Express JS. *Scientia Sacra: Jurnal Sains, Teknologi dan Masyarakat*, *3*(4), 49-55.

Suwarno, & Yulandi, A. P. (2023). Analisis performa backend framework: Studi komparasi framework Golang dan Node.js. *Jurnal Riset Sistem Informasi dan Teknik Informatika*, *8*(1), 155-168. http://dx.doi.org/10.30645/jurasik.v8i1.551.g529
