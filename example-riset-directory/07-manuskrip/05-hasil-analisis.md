# Hasil & Analisis

Bagian ini menyajikan hasil empiris dari 400 run eksperimen (2 framework × 3 skenario × 40 replikasi) yang dibagi menjadi empat sub-bagian: (1) statistik deskriptif latency, (2) perbandingan rasio performa, (3) analisis distribusi dan outlier, serta (4) diskusi temuan.

## 5.1. Statistik Deskriptif Latensi

Tabel 1 menampilkan statistik latency (ms) untuk kedua framework pada tiga skenario. Semua nilai dihitung dari >20.000 sampel per kombinasi.

Tabel 1. Statistik latency (ms) per framework dan skenario

| Skenario | Framework | Mean | Median | Std | Min | Max | p90 | p95 | p99 |
|---|---|---|---|---|---|---|---|---|---|
| baseline | Express | 118,88 | 52,00 | 450,38 | 0,00 | 22133,54 | 246,09 | 443,80 | 670,00 |
| baseline | Gin | 4,04 | 3,52 | 2,23 | 0,00 | 44,14 | 6,80 | 8,13 | 11,88 |
| db_single | Express | 73,36 | 55,00 | 64,66 | 1,06 | 784,70 | 169,51 | 191,21 | 260,51 |
| db_single | Gin | 10,06 | 7,30 | 10,51 | 0,00 | 298,52 | 19,56 | 26,11 | 46,58 |
| db_complex | Express | 36,88 | 35,01 | 20,42 | 1,75 | 334,16 | 63,81 | 71,11 | 83,51 |
| db_complex | Gin | 9,09 | 7,28 | 7,12 | 0,51 | 283,02 | 16,16 | 20,68 | 35,78 |

## 5.2. Rasio Performa (Slowdown Express vs Gin)

Tabel 2 menampilkan rasio performa Express dibanding Gin. Rasio dihitung dari mean (E/G mean) dan median (E/G median). Nilai > 1 menandakan Express lebih lambat.

Tabel 2. Rasio performa Express vs Gin

| Skenario | E/G (mean) | E/G (median) | Interpretasi |
|---|---|---|---|
| baseline | 29,39× | 14,76× | Express ~29x lebih lambat (mean), ~15x lebih lambat (median) |
| db_single | 7,29× | 7,53× | Express ~7,3x lebih lambat |
| db_complex | 4,06× | 4,81× | Express ~4x lebih lambat |

Visualisasi perbandingan ditampilkan pada Gambar 1–4. Gambar 1 menunjukkan perbedaan baseline yang dramatis; Gambar 2–3 menampilkan skenario database; Gambar 4 menggabungkan ketiga skenario dalam satu chart perbandingan.

## 5.3. Analisis Distribusi dan Outlier

Distribusi latency Express menunjukkan pola yang berbeda drastis dibanding Gin:

- **Express Baseline**: Mean (118,88 ms) terdistorsi jauh di atas median (52,00 ms) karena adanya outlier ekstrem hingga 22.133 ms. Secara IQR, 25.683 dari 274.992 sampel (9,3%) terdeteksi sebagai outlier. Ini mengindikasikan bahwa runtime Node.js mengalami *event loop blockage* berkala — kemungkinan akibat *garbage collection*, *JIT compilation*, atau *hot path* yang tidak terprediksi.
- **Express DB Single**: 1.134 outlier dari 65.029 sampel (1,7%). Outlier masih signifikan meskipun lebih sedikit dibanding baseline.
- **Express DB Complex**: 87 outlier dari 20.446 sampel (0,4%). Outlier berkurang seiring meningkatnya kompleksitas query, kemungkinan karena request rate menurun (response time lebih lama mengurangi throughput).
- **Gin**: Outlier terdeteksi pada semua skenario (6.732 baseline, 3.670 db_single, 4.425 db_complex), namun proporsinya lebih stabil dan nilai outlier maksimum (44 ms baseline, 298 ms db_single, 283 ms db_complex) tetap berada dalam kisaran yang dapat diterima dibanding Express.

Pola ini mengonfirmasi bahwa Node.js *event loop* lebih rentan terhadap *stop-the-world GC pauses* dan *JIT deoptimization*, sementara Go *runtime* dengan *preemptive scheduling* dan *concurrent garbage collector* memberikan distribusi latensi yang lebih stabil.

## 5.4. Dampak Kompleksitas Query Database

Performa Express menurun drastis seiring meningkatnya kompleksitas database:
- Baseline → DB Single: median turun dari 52,0 ms ke 55,0 ms (cenderung stabil di angka ~50–55 ms).
- DB Single → DB Complex: median turun menjadi 35,0 ms (tapi ini karena request rate menurun, bukan karena framework menjadi lebih cepat).

Sebaliknya, Gin menunjukkan stabilitas yang luar biasa:
- Baseline → DB Single: median naik dari 3,5 ms ke 7,3 ms (~2x).
- DB Single → DB Complex: median tetap di 7,3 ms (tidak ada peningkatan berarti).

Ini menunjukkan bahwa overhead Gin untuk database access sangat terkompresi, sedangkan Express mengalami *event loop starvation* ketika *middleware chain* dan serialisasi JSON bertambah.

## 5.5. Diskusi

### 5.5.1. Mengapa Gin lebih cepat?

Beberapa faktor arsitektur menjelaskan keunggulan Gin:

1. **Compiled Native vs Interpreted**: Go dikompilasi ke *native binary*, eliminasi overhead *JIT compilation* dan *bytecode interpretation* yang ada pada V8.
2. **Memory Management**: Go menggunakan *concurrent, tri-color mark-and-sweep GC* yang dapat berjalan paralel dengan aplikasi, mengurangi *pause time* secara signifikan dibanding *stop-the-world* V8.
3. **Routing**: Gin menggunakan *radix tree* (compressed trie) untuk routing, sedangkan Express menggunakan linear *middleware chain* traversal.
4. **JSON Binding**: Gin menggunakan `jsoniter` atau *zero-copy* unmarshaling, sementara Express harus melakukan *parse + serialize* penuh untuk setiap request.
5. **Concurrency Model**: Go *goroutine* dipool secara otomatis oleh *runtime*, sementara Node.js *event loop* harus menangani semua konkurensi dalam satu *thread*—bencala adanya operasi sinkron atau *CPU spike*.

### 5.5.2. Kapan Express masih bisa dipertimbangkan?

Meskipun secara performa kalah, Express memiliki keunggulan ekosistem:
- *Middleware* yang lebih matang (autentikasi, validasi, logging).
- Kurva belajar lebih landai untuk developer JavaScript.
- Dukungan *hot-reload* dan tooling yang lebih baik untuk development cepat.

Untuk aplikasi dengan *throughput* moderat (<100 RPS) atau *prototyping* cepat, Express tetap menjadi pilihan yang valid. Namun, untuk sistem *high-throughput* dengan interaksi database intensif, keunggulan performa Gin menjadi decisive factor.

### 5.5.3. Keterbatasan

Beberapa keterbatasan penelitian ini perlu diakui:
1. Sumber daya server (CPU, RAM, I/O) tidak di-*isolate* secara ketat; Docker Desktop pada Windows memperkenalkan overhead virtualization.
2. Hanya satu representative workload JSON REST API diuji; hasil mungkin berbeda untuk *streaming*, *WebSocket*, atau *CPU-bound* workloads.
3. Versi tertentu dari setiap framework digunakan; upgrade major dapat mengubah perbandingan.
