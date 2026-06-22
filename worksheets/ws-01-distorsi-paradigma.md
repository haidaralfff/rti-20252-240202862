# WS-01: Distorsi & Paradigma

> **Bab 1 — Research Mindset in IT**

---

## Ringkasan Materi

### Research Trust Model

Pengetahuan ilmiah tidak muncul langsung dari kenyataan. Ia melewati **6 tahap transformasi** yang masing-masing rawan distorsi:

```
Reality → Data → Processing → Analysis → Inference → Knowledge
```

Etika mencegah distorsi yang disengaja (fabrikasi, cherry-picking). Validitas mendeteksi distorsi yang tidak disengaja (confounding variable, sampling bias).

### Tiga Jenis Validitas

| Jenis | Pertanyaan | Contoh Ancaman |
|-------|-----------|----------------|
| **Internal Validity** | Apakah hubungan kausal benar ada? | Confounding variable |
| **External Validity** | Apakah bisa digeneralisasi? | Dataset terlalu homogen |
| **Construct Validity** | Apakah mengukur hal yang benar? | Metrik tidak sesuai klaim |

### Paradigma Riset

Mata kuliah ini menggunakan pendekatan **Positivist** (fenomena TI bisa diukur objektif melalui eksperimen terkontrol) diperkuat **Design Science Research** (artefak dibuat sebagai instrumen pengujian hipotesis, bukan tujuan akhir).

### Mode Berpikir Peneliti

**Curious** (mempertanyakan fenomena) → **Critical** (mengevaluasi klaim berdasarkan bukti) → **Systematic** (merancang investigasi terstruktur dan reproducible).

### Research vs Engineering

| Aspek | Engineering | Research |
|-------|------------|----------|
| Tujuan | Membuat sistem yang bekerja | Menghasilkan pengetahuan yang valid |
| Pertanyaan khas | "Bagaimana membuatnya jalan?" | "Apakah klaim ini benar?" |
| Ukuran sukses | Sistem berfungsi, client puas | Hipotesis terjawab, temuan tervalidasi |
| Kegagalan | Harus dihindari | Harus dilaporkan (negative result = kontribusi) |

### Istilah Penting

- **Research Mindset** — Pola pikir yang menuntut bukti dan mempertanyakan asumsi
- **Research Ethics** — Prinsip perilaku: kejujuran, objektivitas, keterbukaan, akuntabilitas
- **HARKing** — Hypothesizing After Results are Known — merumuskan hipotesis setelah melihat data
- **Falsifiability** — Hipotesis harus bisa dibuktikan salah

---

## Template A.1 — Research Mindset Self-Assessment

```text
Nama Peneliti    : Haidar Habibi Al Farisi
Tanggal          : 15 Mei 2026

1. Ketika membaca klaim "Gin 10x lebih cepat dari Express.js":
   - Pertanyaan pertama saya: Bagaimana kondisi eksperimennya? Berapa spesifikasi server dan jumlah data yang digunakan?
   - Data yang dibutuhkan untuk verifikasi: Metrik evaluasi lengkap (Response Time, Throughput, CPU Usage, Memory Usage), jenis query database, dan konfigurasi server.

2. Posisi paradigma:
   - Pendekatan: [☑] Positivis  [ ] Interpretivis  [ ] Design Science  [ ] Mixed
   - Alasan: Karena penelitian ini berfokus pada hasil pengukuran kuantitatif (waktu respon dan beban server) secara objektif pada kondisi eksperimen yang terkontrol.

3. Identifikasi distorsi:
   - Asumsi tersembunyi: Asumsi bahwa beban kerja API hanya berupa query SELECT sederhana, padahal di dunia nyata ada komputasi yang berat.
   - Sumber bias potensial: Konfigurasi default framework yang tidak disamaratakan (misal satu menggunakan caching, yang lain tidak).
   - Langkah mitigasi: Memastikan semua framework dikonfigurasi dalam mode production dengan optimasi yang seimbang, dan menonaktifkan mekanisme caching internal saat pengujian mentah.

4. Komitmen etika:
   - Data yang tidak akan dimanipulasi: Angka response time yang lambat atau error rate yang tinggi pada framework tertentu saat menangani beban maksimal.
   - Batasan yang diakui sejak awal: Pengujian dibatasi pada operasi CRUD dasar dan tidak mencerminkan kompleksitas logika bisnis yang rumit.
```

---

## Latihan 1 — Identifikasi Distorsi

Pilih satu paper riset di bidang TI yang mengklaim "metode X meningkatkan performa." Telusuri setiap tahap Research Trust Model.

**Paper yang dipilih:**
> Judul: Performance Evaluation of Backend Frameworks for REST API: A Comparative Study of Spring Boot, Flask, Express.js, Laravel FrankenPHP, and Gin
> Penulis (Tahun): Azzahidi et al. (2025)

| Tahap | Apa yang Dilakukan | Potensi Distorsi |
|-------|-------------------|-----------------|
| Reality → Data | *Membangun API CRUD dengan 5 framework dan menggunakan database hingga 1.000.000 data.* | *Construct Validity: Data tabel yang digunakan (KRS) mungkin memiliki struktur yang terlalu sederhana dibandingkan data real-world.* |
| Data → Processing | *Menjalankan load testing menggunakan K6 dengan 20 virtual users selama 10 menit.* | *Internal Validity: Fluktuasi resource di Windows Subsystem for Linux (WSL) bisa menjadi confounding variable yang tidak disadari.* |
| Processing → Analysis | *Mengekstraksi hasil metrics dari K6, Node_exporter, dan Prometheus.* | *Measurement Bias: Keterlambatan interval polling metrik oleh Prometheus bisa gagal menangkap lonjakan CPU/RAM sekilas (spikes).* |
| Analysis → Inference | *Menyimpulkan Spring Boot unggul di throughput tinggi, dan Gin sangat stabil.* | *Overgeneralization: Menyimpulkan kehebatan framework secara mutlak hanya dari 1 jenis skenario database (PostgreSQL tunggal).* |
| Inference → Knowledge | *Mengklaim efektivitas masing-masing framework untuk berbagai skala data API.* | *Context Bias: Mengabaikan arsitektur scaling horizontal (Load Balancing) yang biasa dilakukan di tingkat produksi nyata.* |

**Distorsi paling besar di tahap:** *Reality → Data dan Processing → Analysis (karena eksekusi di environment lokal/WSL berisiko adanya intervensi background process OS yang mendistorsi kemurnian metrik CPU/Memory).*

**Dua distorsi spesifik yang teridentifikasi:**
1. *Confounding Variable* (Faktor WSL dan background process OS lokal yang mempengaruhi kestabilan resource server).
2. *Overgeneralization* (Kesimpulan performa ditarik dari skenario sistem monolitik sederhana, bukan microservices terdistribusi).

---

## Latihan 2 — Analisis Kasus Etika

Skenario: Seorang peneliti menemukan bahwa jika 3 data point outlier dihapus, hasil eksperimennya menjadi signifikan. Dengan outlier, hasilnya tidak signifikan.

| Perspektif | Analisis |
|------------|---------|
| Kejujuran ilmiah | *Laporkan kedua hasil (dengan dan tanpa outlier) agar pembaca mengetahui efek data anomali atau "cold start" pada server.* |
| Transparansi | *Jelaskan metodologi dan justifikasi logis secara transparan di balik penghapusan outlier tersebut (misal karena request pertama kali selalu memakan waktu inisialisasi yang lama).* |
| Peer review | *Menyediakan raw log dari JMeter atau K6 agar reviewer dapat mengecek sendiri kapan outlier tersebut terjadi.* |

**Keputusan akhir dan justifikasi:**
> *Saya akan melaporkan hasil pengujian secara utuh termasuk saat terjadi lonjakan response time (outlier), lalu memberikan analisis terpisah mengapa outlier tersebut terjadi (misalnya karena proses _garbage collection_ di runtime target atau inisialisasi awal database connection pool). Membuang outlier demi metrik rata-rata yang bagus adalah HARKing dan tidak etis, karena di skenario dunia nyata, lonjakan waktu respon tersebut benar-benar akan dialami oleh end-user.*

---

## Latihan 3 — Posisi Paradigma

**Topik riset:** *Analisis Perbandingan Performa RESTful API antara Framework Backend Modern (Express.js dan Gin).*

| Kriteria | Positivis | Interpretivis | Design Science |
|----------|-----------|---------------|----------------|
| Kesesuaian dengan topik (1–5) | *5* | *1* | *3* |
| Jenis data yang dikumpulkan | *Kuantitatif (Response Time dalam ms, Throughput dalam req/s, persentase penggunaan CPU dan Memori)* | *Kualitatif (Pendapat developer tentang seberapa mudah menggunakan framework tersebut)* | *Pembuatan artefak (Sistem REST API untuk pengujian)* |
| Limitasi paradigma | *Hanya mengukur performa mentah secara matematis, mengabaikan aspek "Developer Experience" (DX), waktu development, dan kemudahan _maintenance_ kode.* | *Subjektif dan tidak dapat dijadikan landasan pengambilan keputusan teknis infrastruktur server.* | *Fokus ke pembuatan API, padahal tujuannya adalah membandingkan yang sudah ada.* |

**Paradigma yang dipilih:** *Positivis.*
**Alasan:** *Tujuan utama penelitian ini adalah menguji dan membandingkan performa sistem perangkat lunak secara kuantitatif melalui eksperimen yang sangat terkontrol. Metrik yang dihasilkan bersifat pasti dan terukur (Response Time, Resource Usage), sehingga interpretasi ditarik dari fakta empiris angka statistik, sesuai dengan prinsip paradigma Positivis.*

---

## Refleksi

> Sebelum membaca materi ini, apakah pernah mempertanyakan klaim "95% akurat"? Setelah memahami rantai distorsi, pertanyaan apa yang sekarang akan diajukan saat membaca paper?

**Jawaban:**
> Setelah memahami materi ini, saya akan bertanya saat membaca artikel ilmiah perbandingan framework:
1. Environment-nya apa? (Apakah server dedicated atau shared local VM?)
2. Skala datanya berapa besar?
3. Apakah konfigurasi framework-nya setara (misalnya semua di set ke mode 'production')?
4. Tool apa yang dipakai untuk load testing dan apakah alat test berada di mesin yang sama dengan server (yang bisa memicu perebutan resource)?
5. Apakah metrik yang dilaporkan hanya rata-rata, atau menyertakan persentil (p95, p99) untuk melihat stabilitas nyata?
