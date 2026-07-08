# WS-12: Result Presentation & Visualization

> **Bab 12 — Penyajian Hasil & Visualisasi**

---

## Ringkasan Materi

### Data → Insight Model

```
Validated Data → Structured Presentation → Visualization → Pattern Recognition → Insight
```

Penyajian **mendahului** analisis. Tabel dan grafik membantu peneliti "melihat" data sebelum menghitung. Langsung ke uji statistik tanpa visualisasi berisiko kesimpulan yang secara teknis benar tapi kontekstual salah (Anscombe's Quartet, 1973).

### Tabel = Presisi, Grafik = Pola

Keduanya **saling melengkapi**:
- Tabel: angka presisi, self-contained (dipahami tanpa teks), sortable
- Grafik: pola visual, tren, perbandingan cepat

### Jenis Grafik Berdasarkan Tujuan

| Tujuan | Jenis Grafik |
|--------|-------------|
| Perbandingan antar-skenario | Bar chart (grouped/stacked) |
| Distribusi per-skenario | Box plot / violin plot |
| Tren temporal | Line chart |
| Korelasi dua variabel | Scatter plot |
| Proporsi (total = 100%) | Pie chart (hati-hati!) |

### Contoh Tabel Hasil yang Baik

| Model | Accuracy (%) | F1-Score (%) | Training Time (min) |
|-------|-------------|-------------|---------------------|
| BERT | 88.4 ± 1.2 | 87.1 ± 1.4 | 45.2 ± 3.1 |
| LSTM | 86.1 ± 1.8 | 84.5 ± 2.0 | 12.8 ± 1.2 |
| SVM | 82.3 ± 0.9 | 80.7 ± 1.1 | 0.3 ± 0.1 |

*N=10 per model. Mean ± std. Diurutkan berdasarkan Accuracy.*

### Visualization Bias — Yang Harus Dihindari

| Bias | Deskripsi | Dampak |
|------|----------|--------|
| Truncated axis | Y tidak dari 0 | Memperbesar perbedaan kecil |
| Inconsistent scale | Dua grafik skala beda | Perbandingan menyesatkan |
| Cherry-picked data | Hanya tampilkan yang "menang" | Selektif, tidak jujur |
| 3D effects | Efek 3D tanpa dimensi data ke-3 | Distorsi tanpa informasi |
| Missing error bar | Tidak ada variabilitas | Menyembunyikan ketidakpastian |

### Engineering vs Research Presentation

| Aspek | Engineering | Research |
|-------|-----------|---------|
| Tujuan grafik | Dashboard monitoring | Mendukung argumen ilmiah |
| Informasi wajib | KPI, threshold | Mean, std, CI, N, p-value |
| Bias handling | Less critical | Wajib dihindari (peer-review) |

---

## Template A.12 — Result Presentation Plan

```
RESULT PRESENTATION PLAN

Research Question : Apakah terdapat perbedaan yang signifikan pada metrik Response Time, Throughput, CPU Usage, dan Memory Usage antara framework backend modern (Express.js dan Gin) ketika menangani beban RESTful API dengan variasi kompleksitas query database?
Metrik Utama      : Response Time (ms), Throughput (req/s)

Tabel Hasil:
| Skenario | Response Time Express.js (mean ± std ms) | Response Time Gin (mean ± std ms) | Slowdown Ratio | n |
|----------|------------------------------------------|-----------------------------------|----------------|---|
| Baseline | 118.88 ± 450.38 | 4.04 ± 2.23 | 29.39× | 40 |
| DB Single | 73.36 ± 64.66 | 10.06 ± 10.51 | 7.29× | 40 |
| DB Complex | 36.88 ± 20.42 | 9.09 ± 7.12 | 4.06× | 40 |

Visualisasi yang Direncanakan:
| # | Jenis Grafik | Pesan Utama | Metrik |
|---|-------------|-------------|--------|
| 1 | Bar chart + error bar | Express.js secara konsisten lebih lambat dari Gin di semua skenario | Response Time mean ± std per framework per skenario |
| 2 | Grouped bar chart | Gin menggunakan lebih sedikit CPU dan Memory di semua skenario | CPU% dan Memory (MiB) per container per skenario |
| 3 | Line chart (slowdown trend) | Perbedaan performa menyusut seiring meningkatnya kompleksitas query | Slowdown ratio per skenario |

Bias Check:
  [x] Y-axis mulai dari 0 (atau dijustifikasi)
  [x] Error bar/CI ditampilkan
  [x] Semua data disertakan (tidak cherry-picked)
  [x] Tidak menggunakan 3D tanpa alasan
```

---

## Latihan 1 — Tabel Hasil

Buat tabel hasil eksperimen Anda (boleh dengan data simulasi jika belum punya data riil).

**Tabel 1: Response Time per Skenario (N=40 per kombinasi)**

| Skenario | Express.js RT (mean ± std ms) | Gin RT (mean ± std ms) | Express.js Median (ms) | Gin Median (ms) |
|----------|------------------------------|------------------------|----------------------|----------------|
| Baseline | 118.88 ± 450.38 | 4.04 ± 2.23 | 51.98 | 3.52 |
| DB Single Query | 73.36 ± 64.66 | 10.06 ± 10.51 | 54.99 | 7.30 |
| DB Complex Query | 36.88 ± 20.42 | 9.09 ± 7.12 | 35.01 | 7.28 |

**Tabel 2: Throughput dan Outlier per Skenario**

| Skenario | Express.js Throughput (req) | Gin Throughput (req) | Express Outlier (IQR) | Gin Outlier (IQR) |
|----------|---------------------------|---------------------|----------------------|-------------------|
| Baseline | 274.992 | 178.666 | 25.683 (9.3%) | 6.732 (3.8%) |
| DB Single Query | 65.029 | 72.481 | 1.134 (1.7%) | 3.670 (5.1%) |
| DB Complex Query | 20.446 | 80.239 | 87 (0.4%) | 4.425 (5.5%) |

**Tabel 3: Resource Usage (CPU & Memory)**

| Skenario | Container | CPU Mean (%) | CPU Max (%) | Memory Mean (MiB) | Memory Max (MiB) |
|----------|-----------|-------------|------------|-------------------|------------------|
| Baseline | PostgreSQL | 5.2 | 18.0 | 256.0 | 384.0 |
| Baseline | Express API | 28.5 | 65.0 | 180.0 | 280.0 |
| Baseline | Gin API | 22.0 | 55.0 | 140.0 | 220.0 |
| DB Single | PostgreSQL | 8.5 | 25.0 | 320.0 | 480.0 |
| DB Single | Express API | 35.2 | 78.0 | 220.0 | 350.0 |
| DB Single | Gin API | 26.8 | 62.0 | 170.0 | 260.0 |
| DB Complex | PostgreSQL | 15.3 | 42.0 | 450.0 | 640.0 |
| DB Complex | Express API | 42.1 | 88.0 | 280.0 | 420.0 |
| DB Complex | Gin API | 31.5 | 70.0 | 210.0 | 320.0 |

**Checklist tabel:**
- [x] Self-contained (judul jelas, satuan ada, N tercantum)
- [x] Mean ± std (bukan single number)
- [x] Diurutkan berdasarkan metrik utama (Response Time)
- [x] Format konsisten di semua baris

---

## Latihan 2 — Rencana Visualisasi

Rencanakan 2-3 grafik untuk menyajikan data dari Latihan 1. Setiap grafik = satu pesan.

| # | Jenis Grafik | Pesan | Data yang Digunakan |
|---|-------------|-------|---------------------|
| 1 | Bar chart + error bar | Express.js secara konsisten memiliki Response Time yang jauh lebih tinggi dari Gin di semua skenario. Perbedaan paling besar terjadi pada baseline (29.39×). | Mean Response Time ± std per framework per skenario |
| 2 | Grouped bar chart | Gin menggunakan lebih sedikit CPU dan Memory dibandingkan Express.js di semua skenario, dengan gap yang melebar seiring kompleksitas query meningkat. | CPU% mean dan Memory MiB mean per container per skenario |
| 3 | Line chart | Slowdown ratio Express/Gin menurun seiring meningkatnya kompleksitas query (baseline: 29.39× → db_single: 7.29× → db_complex: 4.06×), menunjukkan bahwa beban database "menyamarkan" perbedaan framework. | Slowdown ratio per skenario |

**Keterangan grafik:**
- Grafik 1: X-axis = Skenario (baseline, db_single, db_complex), grouped bar (Express vs Gin), error bar = std
- Grafik 2: X-axis = Skenario, 3 grouped bar per skenario (PostgreSQL, Express API, Gin API), warna berbeda per container
- Grafik 3: X-axis = Skenario (ordered by complexity), Y-axis = Slowdown Ratio, single line dengan titik data

---

## Latihan 3 — Bias Detection

Evaluasi visualisasi berikut untuk bias (skenario dari contoh):

**Skenario:** Metode A = 91.2%, Metode B = 90.8%. Bar chart dengan Y-axis mulai dari 90%.

| Pertanyaan | Jawaban |
|-----------|---------|
| Apakah Y-axis menyesatkan? | *Ya — A terlihat 2× B padahal beda hanya 0.4%. Y-axis dari 90 memperbesar perbedaan kecil secara visual.* |
| Apakah error bar ditampilkan? | *Tidak — tanpa error bar, kita tidak tahu apakah perbedaan 0.4% signifikan atau hanya noise.* |
| Apakah semua kondisi ditampilkan? | *Tidak jelas — tidak ada informasi tentang jumlah run atau kondisi pengujian.* |
| Apa solusinya? | *Mulai Y-axis dari 0, tampilkan error bar (std/CI), cantumkan N dan satuan.* |

**Evaluasi grafik Anda sendiri dari Latihan 2:**

**Grafik 1 (Bar chart Response Time):**
- [x] Y-axis mulai dari 0 — dikonfirmasi dari skala data (0 – 120 ms)
- [x] Error bar ditampilkan — std dari data
- [x] Semua kondisi ditampilkan — 3 skenario × 2 framework
- [x] Tidak ada 3D
- **Catatan:** Skala Express.js (mean 118.88 ms) sangat berbeda dari Gin (mean 4.04 ms), sehingga bar Gin hampir tidak terlihat. Solusi: gunakan log scale atau tampilkan dalam dua panel terpisah.

**Grafik 2 (Grouped bar Resource Usage):**
- [x] Y-axis mulai dari 0
- [x] Semua container ditampilkan (PostgreSQL, Express, Gin)
- [x] Format konsisten
- **Catatan:** Skala CPU (0-100%) dan Memory (0-640 MiB) berbeda, perlu dual-axis atau dua grafik terpisah.

**Grafik 3 (Line chart Slowdown Ratio):**
- [x] Semua skenario ditampilkan
- [x] Tidak ada cherry-picking
- **Catatan:** Hanya3 titik data — line chart mungkin kurang tepat, bar chart bisa lebih jelas.

**Kesimpulan evaluasi:**
- [x] Semua bias check lulus (dengan catatan perbaikan skala)
- [ ] Ada yang perlu diperbaiki: *Pertimbangkan log scale untuk Grafik 1 dan dual panel untuk Grafik 2*

---

## Refleksi

> Mengapa tabel dan grafik keduanya diperlukan — tidak cukup salah satu saja? Pernahkah Anda membuat grafik yang (tanpa sengaja) menyesatkan?

> Tabel dan grafik memiliki fungsi yang saling melengkapi dan tidak bisa saling menggantikan. Tabel memberikan presisi angka yang dibutuhkan untuk reproduksi dan verifikasi — misalnya, nilai mean 118.8768 ms tidak bisa dibaca secara akurat dari grafik. Namun tabel tidak bisa menunjukkan pola secara cepat — pembaca harus membandingkan angka satu per satu. Grafik sebaliknya, memungkinkan pembaca "melihat" pola dalam hitungan milidetik: Express.js selalu lebih tinggi dari Gin, dan gap menyusut seiring kompleksitas query meningkat. Tanpa grafik, insight tentang tren "slowdown ratio menurun" akan tersembunyi di balik angka-angka tabel.

> Pernah membuat grafik yang menyesatkan: Pada eksperimen awal, saya membuat bar chart perbandingan Response Time Express vs Gin dengan Y-axis dari 0-50 ms. Hasilnya, bar Express.js tidak terlihat sama sekali karena mean-nya 118.88 ms (di luar skala). Ini menyesatkan karena seolah-olah tidak ada data Express.js. Solusinya adalah menggunakan log scale atau split panel. Pengalaman ini mengajarkan bahwa pilihan skala axis bukan sekadar teknis — itu adalah keputusan presentasi yang mempengaruhi interpretasi pembaca.
