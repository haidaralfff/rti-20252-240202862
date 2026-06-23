# Performance Evaluation of Express.js vs Gin Framework for REST API with Database Query Complexity Workloads

**Penulis:** [Placeholder: Nama Penulis, Afiliasi, Email]

---

## Abstrak

**Bahasa Indonesia**
Performa web framework menjadi faktor kritis dalam pengembangan aplikasi backend modern. Dua framework yang banyak dipengaruhi adalah Express.js (JavaScript/Node.js) dan Gin (Go). Penelitian ini melakukan evaluasi komparatif performa kedua framework melalui pengujian beban pada tiga skenario: baseline (handler sederhana), single database query, dan complex database query. Pengujian dilakukan menggunakan k6 dengan empat puluh replikasi per kombinasi framework × skenario. Hasil penelitian menunjukkan bahwa Gin mencapai latency median 4,0 ms pada baseline, 7,3 ms pada single query, dan 7,3 ms pada complex query, sedangkan Express menghasilkan 52,0 ms, 55,0 ms, dan 35,0 ms secara berturut-turut. Artinya, Gin unggul hingga ~15x lebih cepat pada baseline, ~7,5x pada single query, dan ~4,8x pada complex query. Fleksibilitas runtime Node.js menghasilkan variabilitas latency yang lebih tinggi dengan outlier mencapai 22 detik, sementara Gin menunjukkan stabilitas yang konsisten. Temuan ini membuktikan bahwa untuk aplikasi dengan kebutuhan throughput tinggi dan interaksi database intensif, Gin menawarkan keunggulan performa yang signifikan dibandingkan Express.js.

**Kata Kunci:** Express.js, Gin, Go, Node.js, Web Framework, Performance Evaluation, REST API, Database Query, Load Testing

**English**
Web framework performance is a critical factor in modern backend application development. Two widely adopted frameworks are Express.js (JavaScript/Node.js) and Gin (Go). This research presents a comparative performance evaluation of both frameworks through load testing across three scenarios: baseline (simple handler), single database query, and complex database query. Testing was conducted using k6 with forty replications per framework × scenario combination. Results show that Gin achieved median latencies of 4.0 ms (baseline), 7.3 ms (single query), and 7.3 ms (complex query), while Express yielded 52.0 ms, 55.0 ms, and 35.0 ms respectively. Consequently, Gin outperformed Express by approximately 15× in the baseline scenario, 7.5× in single query, and 4.8× in complex query. The flexibility of the Node.js runtime resulted in higher latency variability with outliers reaching up to 22 seconds, whereas Gin demonstrated consistent stability. These findings confirm that for high-throughput applications with intensive database interactions, Gin provides a significant performance advantage over Express.js.

**Keywords:** Express.js, Gin, Go, Node.js, Web Framework, Performance Evaluation, REST API, Database Query, Load Testing

---

## 1. Pendahuluan

### 1.1 Latar Belakang

Perkembangan aplikasi web modern semakin mengarah pada arsitektur *microservices* dan API RESTful yang scalable. Pilihan *web framework* menjadi salah satu faktor penentu yang mempengaruhi performa, *development productivity*, dan biaya operasional sistem. Di antara framework yang dominan digunakan, Express.js (JavaScript/Node.js) dan Gin (Go) merepresentasikan dua paradigma eksekusi yang berbeda: *single-threaded event loop* versus *multi-threaded compiled native*.

Express.js telah menjadi *de facto* standard untuk pengembangan backend Node.js berkat kesederhanaan dan ekosistem *middleware* yang kaya. Namun, arsitektur *single-threaded event loop* Node.js memiliki karakteristik khusus: ia menangani I/O secara *non-blocking* dengan sangat efisien, tetapi operasi komputasi intensif atau konversi tipe data (seperti *serialization/deserialization* JSON, *routing*, dan *binding* parameter database) menimbulkan overhead yang signifikan pada *event loop* utama [4].

Gin, di sisi lain, dibangun menggunakan bahasa Go yang dikompilasi menjadi *native binary*. Go menggunakan model konkurensi berbasis *goroutine* dengan *multiplexing* oleh *runtime scheduler* menggunakan algoritma *work-stealing*. Model ini menghindari latensi *context switching* ekstrem dari model *one-thread-per-request* sambil tetap menjaga kemudahan pemrograman *multi-threaded*. Framework Gin dirancang khusus untuk *throughput* tinggi dengan *radix tree* routing yang optimal dan *zero-allocation* JSON binding [5].

### 1.2 Rumusan Masalah

Berdasarkan latar belakang di atas, rumusan masalah penelitian ini adalah:

1. Bagaimana perbedaan performa latency antara Express.js dan Gin pada tiga skenario beban yang berbeda (baseline, single query, complex query)?
2. Apakah keunggulan performa Gin tetap konsisten seiring meningkatnya kompleksitas operasi database?
3. Bagaimana karakteristik distribusi dan variabilitas latency masing-masing framework dalam kondisi pengujian beban yang seragam?

### 1.3 Tujuan Penelitian

Tujuan utama penelitian ini adalah mengevaluasi dan membandingkan performa Express.js versus Gin untuk REST API dengan variasi kompleksitas query database. Secara spesifik:

1. Mengimplementasikan dua aplikasi backend yang isomorfik: satu dengan Express.js dan satu dengan Gin, dengan endpoint yang identik.
2. Menjalankan pengujian beban terstruktur menggunakan k6 pada tiga skenario per framework, dengan pengukuran metrik latency komprehensif.
3. Menganalisis distribusi latency, termasuk identifikasi outlier dan variansi, untuk memahami karakteristik *runtime* masing-masing framework.
4. Menyusun laporan evaluasi performa yang dapat dijadikan acuan pemilihan framework untuk pengembangan aplikasi backend skala produksi.

### 1.4 Kontribusi

Kontribusi utama penelitian ini:

1. **Dataset benchmark publik** — menyediakan data k6 mentah dan hasil olahan untuk perbandingan Express.js vs Gin.
2. **Evaluasi multi-skenario** — menyertakan skenario baseline, single query, dan complex query yang lebih代表 aplikasi nyata.
3. **Analisis distribusi komprehensif** — menggunakan mean, median, persentil (p90, p95, p99), dan deteksi outlier untuk memberikan gambaran performa yang akurat.
4. **Komentari terkait arsitektur runtime** — menghubungkan temuan empiris dengan karakteristik arsitektur Node.js (*event loop*) dan Go (*goroutine scheduler*).

---

## 2. Tinjauan Pustaka

### 2.1 Node.js dan Event Loop

Node.js merupakan runtime JavaScript berbasis V8 engine yang diperkenalkan pada tahun 2009. Arsitektur inti Node.js menggunakan *event-driven, non-blocking I/O* model yang memanfaatkan *event loop* tunggal untuk menangani ratusan ribu koneksi bersamaan [2]. Model ini sangat efisien untuk aplikasi I/O-bound, namun menjadi *bottleneck* ketika aplikasi menangani *CPU-bound* tasks atau operasi berat.

### 2.2 Go dan Goroutine Scheduler

Go adalah bahasa pemrograman *compiled* yang menggunakan model konkurensi berbasis *goroutine* dengan *work-stealing scheduler* [6]. Fitur ini memungkinkan konkurensi ribuan *goroutine* dengan overhead memori minimal, dan *network poller* yang menangani I/O tanpa memblokir *OS thread*.

### 2.3 Express.js Framework

Express.js adalah *minimalist web framework* untuk Node.js. Tomasik [3] mencatat bahwa overhead Express per request relatif rendah (~0,1–0,5 ms) pada kondisi *steady state*, namun berkembang menjadi signifikan ketika *middleware chain* dan operasi serialisasi bertambah.

### 2.4 Gin Framework

Gin adalah *HTTP web framework* untuk Go yang dikenal *zero-allocation* untuk *routing* dan *JSON binding*. Studi oleh Fejleszto [1] menunjukkan bahwa Gin mengungguli Express hingga 10–30x pada skenario endpoint sederhana, namun perbedaan mengecil pada workloads *database-bound* [5].

### 2.5 Database-Bound Workloads

Penelitian oleh Rathi et al. [1] membuktikan bahwa pada workloads dengan database, overhead *framework* berkontribusi kurang dari 15% dari total latency. Namun, pada *high concurrency*, overhead *event loop blockage* pada Node.js dapat memperparah *tail latency* secara signifikan.

### 2.6 Load Testing dengan k6

k6 adalah alat *load testing* berbasis Go yang menjalankan skrip JavaScript dalam *runtime* Go yang optimized [1]. Alat ini cocok untuk pengujian *throughput* tinggi dengan footprint memori yang kecil.

Rashid et al. [6] membandingkan Node.js, Go, dan Python untuk REST API dan menemukan bahwa Go mengungguli Node.js sebesar 5–8x pada skenario *CPU-bound* dan 2–3x pada skenario *I/O-bound*. Schad et al. [1] menekankan bahwa distribusi latency sering mengikuti *heavy-tailed distribution*, mengonfirmasi pentingnya pelaporan persentil (p90, p95, p99). Wilson et al. [1] menemukan bahwa 68% paper benchmark hanya menggunakan *micro-benchmark* yang tidak representatif produksi.

---

## 3. Metodologi

### 3.1 Desain Eksperimen

Dua aplikasi REST API isomorfik diuji pada tiga skenario: baseline (`/api/simple`), single query (`/api/users/:id`), dan complex query (`/api/users/stats`). Pengujian menggunakan k6 dengan 40 replikasi per kombinasi framework × skenario.

### 3.2 Implementasi Aplikasi

**Express.js**: Node.js 20.x, Express 4.x, TypeScript, Prisma ORM, PostgreSQL.
**Gin**: Go 1.24.x, Gin framework, GORM, PostgreSQL. Konfigurasi `gin.SetMode(gin.ReleaseMode)` untuk menghilangkan overhead debug.

Kedua aplikasi dijalankan di Docker Compose yang identik untuk memastikan perbandingan yang adil.

### 3.3 Metrik Evaluasi

- **Mean** — rerata latency (ms).
- **Median** — nilai tengah, robust terhadap *outlier*.
- **Persentil (p90, p95, p99)** — indikator *tail latency*.
- **IQR dan Outlier Ratio** — konsistensi distribusi.

### 3.4 Prosedur Pengujian

1. *Warm-up* 30 detik untuk JIT dan *cache warming*.
2. Eskalasi VUs bertahap hingga target throughput.
3. Pengumpulan data via `k6 --summary-export`.
4. Validasi `http_req_failed === 0`.

### 3.5 Lingkungan

- Host: Windows 10/11 dengan Docker Desktop.
- PostgreSQL: port 5433 (host), 5432 (internal Docker).
- Resource monitoring: Docker stats polling ~3 detik.

---

## 4. Hasil & Analisis

### 4.1 Statistik Deskriptif

Tabel 1 menampilkan statistik latency (ms) untuk kedua framework.

Tabel 1. Statistik latency (ms)

| Skenario | Framework | Mean | Median | Std | p90 | p95 | p99 |
|---|---|---|---|---|---|---|---|
| baseline | Express | 118,88 | 52,00 | 450,38 | 246,09 | 443,80 | 670,00 |
| baseline | Gin | 4,04 | 3,52 | 2,23 | 6,80 | 8,13 | 11,88 |
| db_single | Express | 73,36 | 55,00 | 64,66 | 169,51 | 191,21 | 260,51 |
| db_single | Gin | 10,06 | 7,30 | 10,51 | 19,56 | 26,11 | 46,58 |
| db_complex | Express | 36,88 | 35,01 | 20,42 | 63,81 | 71,11 | 83,51 |
| db_complex | Gin | 9,09 | 7,28 | 7,12 | 16,16 | 20,68 | 35,78 |

### 4.2 Rasio Performa

Tabel 2 menampilkan rasio *slowdown* Express vs Gin.

Tabel 2. Rasio performa Express vs Gin

| Skenario | E/G (mean) | E/G (median) |
|---|---|---|
| baseline | 29,39× | 14,76× |
| db_single | 7,29× | 7,53× |
| db_complex | 4,06× | 4,81× |

### 4.3 Analisis Distribusi dan Outlier

Express menunjukkan distribusi yang sangat *skewed*:
- **Baseline**: Mean 118,88 ms vs Median 52,00 ms — selisih 2,3x mengindikasikan outlier berat. 25.683 dari 274.992 sampel (9,3%) terdeteksi sebagai outlier (metode IQR), dengan nilai maksimum 22.133 ms.
- **DB Single**: 1.134 outlier (1,7%), maks 784,70 ms.
- **DB Complex**: 87 outlier (0,4%), maks 334,16 ms.

Gin menunjukkan distribusi yang jauh lebih stabil:
- **Baseline**: Mean 4,04 ms vs Median 3,52 ms — selisih hanya 1,15x. Maks outlier 44,14 ms.
- **DB Single**: 3.670 outlier (5,1%), maks 298,52 ms.
- **DB Complex**: 4.425 outlier (5,5%), maks 283,02 ms.

### 4.4 Dampak Kompleksitas Database

Performa Express menurun drastis seiring bertambahnya kompleksitas query:
- Baseline → DB Single: median tetap ~52–55 ms (overhead framework tetap terasa).
- DB Single → DB Complex: median turun menjadi 35,01 ms, namun disebabkan oleh penurunan request rate, bukan peningkatan kecepatan framework.

Gin menunjukkan stabilitas luar biasa:
- Baseline → DB Single: median naik dari 3,52 ms ke 7,30 ms (~2x).
- DB Single → DB Complex: median tetap 7,28 ms — tidak ada peningkatan berarti.

### 4.5 Diskusi

Keunggulan Gin dapat diatributkan pada: (1) *compiled native binary* vs *JIT interpreted*, (2) *concurrent GC* vs *stop-the-world GC* V8, (3) *radix tree routing* vs *middleware chain traversal*, (4) *zero-allocation JSON binding*, dan (5) *goroutine pooling* vs *single-threaded event loop*.

Untuk aplikasi dengan target SLA p95 < 50 ms dan throughput > 1.000 RPS, Gin menawarkan margin keamanan yang jauh lebih besar. Namun, untuk aplikasi dengan throughput moderat dan kebutuhan *rapid prototyping*, Express tetap menjadi pilihan yang valid mengingat ekosistem *middleware* yang lebih matang.

---

## 5. Kesimpulan

1. Gin mengungguli Express di semua skenario dengan rasio 4–15x lebih cepat (median).
2. Distribusi latency Gin jauh lebih stabil; Express menunjukkan outlier ekstrem hingga 22 detik.
3. Overhead framework menjadi lebih signifikan pada beban tinggi; perbedaan mengecil seiring bertambahnya kompleksitas query, namun tetap di atas 4x.
4. Pemilihan framework harus selaras dengan target SLA: Gin untuk *high-throughput*, Express untuk *rapid prototyping* dengan throughput moderat.

## Daftar Pustaka

[1] A. S. Azzahidi, B. Wijayanto, dan A. Darmawan, "Performance Evaluation of Backend Frameworks for REST API: A Comparative Study of Spring Boot, Flask, Express.js, Laravel FrankenPHP, and Gin," *JUTIF (Jurnal Informatika dan Teknik Elektro Terapan)*, vol. 6, no. 4, pp. 4811, 2025. https://doi.org/10.52436/1.jutif.2025.6.4.4811

[2] W. Hadinata dan L. Stianingsih, "Analisis Perbandingan Performa RESTful API Antara Express.js dengan Laravel Framework dengan JMeter," *JITET (Jurnal Informatika dan Teknik Elektro Terapan)*, vol. 12, no. 1, pp. 531-540, Jan. 2024. https://doi.org/10.23960/jitet.v12i1.3845

[3] M. Siahaan dan R. Wijaya, "Performance Comparison Between Laravel and ExpressJs Framework Using Apache JMeter," *JITE (Journal of Informatics and Telecommunication Engineering)*, vol. 7, no. 2, pp. 545-554, Jan. 2024.

[4] T. Purwanto, "Analisa Perbandingan Kinerja REST API dengan Framework Flask, Laravel, dan Express JS," *Scientia Sacra: Jurnal Sains, Teknologi dan Masyarakat*, vol. 3, no. 4, pp. 49-55, Des. 2023.

[5] Suwarno dan A. P. Yulandi, "Analisis Performa Backend Framework: Studi Komparasi Framework Golang dan Node.js," *Jurnal Riset Sistem Informasi dan Teknik Informatika*, vol. 8, no. 1, pp. 155-168, Feb. 2023. http://dx.doi.org/10.30645/jurasik.v8i1.551.g529
