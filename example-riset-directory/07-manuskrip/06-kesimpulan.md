# Kesimpulan & Saran Penelitian Lanjutan

## 6.1. Kesimpulan

Penelitian ini telah melakukan evaluasi komparatif performa antara Express.js (Node.js) dan Gin (Go) untuk REST API dengan beban database yang bervariasi. Berdasarkan 400 run eksperimen (2 framework × 3 skenario × 40 replikasi) menggunakan k6, disimpulkan sebagai berikut:

1. **Gin mengungguli Express di semua skenario**. Pada baseline (handler tanpa database), Gin mencapai latency median 3,52 ms dibanding 52,00 ms Express — sekitar 15x lebih cepat. Pada skenario dengan database, Gin tetap lebih cepat dengan rasio ~7,5x (single query) dan ~4,8x (complex query).

2. **Stabilitas distribusi latency Gin lebih tinggi**. Express menunjukkan variabilitas yang ekstrem dengan outlier hingga 22 detik pada baseline (9,3% dari sampel), mengindikasinkan *event loop blockage* yang tidak terprediksi. Gin sebaliknya menunjukkan distribusi yang konsisten dengan outlier maksimum hanya 44 ms pada baseline.

3. **Overhead framework menjadi signifikan pada beban tinggi**. Meskipun latency database mendominasi total response time, overhead *framework* tetap terasa pada skenario *high-throughput*. Perbedaan median antara kedua framework mengecil seiring bertambahnya kompleksitas query, namun rasio performa tetap berada di atas 4x.

4. **Pemilihan framework harus selaras dengan target SLA**. Untuk aplikasi dengan target latency p95 < 50 ms dan throughput > 1000 RPS, Gin menawarkan margin keamanan yang jauh lebih besar. Untuk aplikasi dengan throughput moderat dan kebutuhan *rapid prototyping*, Express dapat menjadi pilihan yang cukup.

## 6.2. Saran Penelitian Lanjutan

Berdasarkan temuan dan keterbatasan penelitian ini, beberapa arah penelitian lanjutan dapat dijelajahi:

1. **Ekspansi skenario workload** — menambahkan skenario *streaming* (WebSocket, SSE), *CPU-bound computation*, dan *file upload* untuk menguji batas arsitektur masing-masing framework di luar REST API klasik.

2. **Analisis throughput maksimal** — menentukan *breakpoint* RPS di mana masing-masing framework mulai menunjukkan degradasi signifikan, dengan fokus pada *error rate* dan *tail latency* (p99, p999).

3. **Evaluasi memory footprint dan CPU utilization** — mengukur konsumsi memori *heap* dan utilisasi CPU secara paralel menggunakan profilasing, untuk menghubungkan temuan latency dengan utilization resource.

4. **Komparasi dengan framework lain di ekosistem yang sama** — memperluas studi dengan menambahkan Fastify (Node.js), Fiber (Go), dan ASP.NET Core untuk mendapatkan gambaran broader dari landscape framework modern.

5. **Studi kasus migrasi nyata** — melakukan *case study* migrasi aplikasi produksi dari Express ke Gin (atau sebaliknya) dengan mengukur dampak performa pada environment produksi, bukan hanya laboratorium.

6. ** Pengaruh database driver dan ORM** — memisahkan variabel *framework* dari variabel *database access layer* (misalnya, membandingkan Prisma vs GORM) untuk mengukur kontribusi masing-masing komponen terhadap total latency.

7. **Benchmark pada lingkungan tanpa container** — mengulangi eksperimen di *bare metal* atau VM tanpa Docker overhead untuk memastikan bahwa hasil yang diamati benar-benar berasal dari karakteristik framework, bukan overhead virtualization.
