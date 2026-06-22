# WS-10: Experiment Execution & Data Collection

> **Bab 10 — Eksekusi Eksperimen & Pengumpulan Data**

---

## Ringkasan Materi

### Experiment Execution Pipeline

```
Design → Execution Plan → Controlled Execution → Data Collection → Data Logging → Dataset for Analysis
```

### Multiple Run = Non-Negotiable

Single run **tidak pernah cukup** untuk klaim ilmiah. Minimum 5-10 run per skenario dengan seed berbeda. Multiple run menghasilkan:
- Mean, std, confidence interval
- Distribusi hasil → uji statistik
- Variabilitas → error bar di grafik

### Execution Plan

Setiap eksperimen harus memiliki plan sebelum eksekusi:
- Daftar skenario
- Jumlah run per skenario
- Random seed per run (pre-determined!)
- Urutan eksekusi (randomisasi/counterbalancing)
- Pre-execution checklist

### Data Logging Komprehensif

Setiap run menghasilkan log terstruktur:
1. **Identitas** — Run ID, timestamp, skenario
2. **Konfigurasi** — Semua parameter, seed, code version
3. **Hasil** — Semua metrik, output detail
4. **Metadata** — Waktu eksekusi, resource usage, warning/error

Format: CSV/JSON/database — **bukan stdout yang di-copy-paste**.

### Engineering vs Research Execution

| Aspek | Engineering | Research |
|-------|-----------|---------|
| Run | Sekali (deploy) | Multiple (min 5-10, seed berbeda) |
| Logging | Error log, access log | Semua parameter, metrik, metadata |
| Anomali | Bug → fix → redeploy | Investigasi → dokumentasi → analisis |
| Urutan | Tidak penting | Bisa bias — perlu randomisasi |

### Anomali = Dokumentasi, Bukan Hapus

Run gagal/anomali tidak boleh dihapus tanpa dokumentasi. Bisa jadi:
- **Bug** → fix & re-run (dokumentasikan!)
- **Batas kemampuan metode** → DNF = temuan
- **Data yang bias** jika hanya simpan run "berhasil"

### Jebakan Kognitif

1. "Satu angka cukup" → tanpa distribusi, tidak bisa diuji
2. "Seed tidak penting" → bahkan algoritma deterministik bisa dipengaruhi library stokastik
3. "Run gagal langsung hapus" → kehilangan temuan potensial
4. "Semua run harus hari ini" → thermal throttling, fatigue

---

## Template A.10 — Execution Plan & Data Log

```
EXECUTION PLAN

| Run # | Skenario | Seed | Parameter | Status | Waktu | Output File |
|-------|----------|------|-----------|--------|-------|-------------|
| 1 | Express.js_100 | N/A | framework=Express.js, scale=100, VU=20, durasi=10m | Planned | | results/express_100_run1.json |
| 2 | Express.js_100 | N/A | framework=Express.js, scale=100, VU=20, durasi=10m | Planned | | results/express_100_run2.json |
| 3 | Express.js_100 | N/A | framework=Express.js, scale=100, VU=20, durasi=10m | Planned | | results/express_100_run3.json |
| 4 | Express.js_1k | N/A | framework=Express.js, scale=1k, VU=20, durasi=10m | Planned | | results/express_1k_run1.json |
| ... | (10 skenario × 3 run) | N/A | framework={Express.js|Gin}, scale={100|1k|10k|100k|1jt}, VU=20, durasi=10m | Planned | | results/{framework}_{scale}_run{N}.json |
| 30 | Gin_1jt | N/A | framework=Gin, scale=1jt, VU=20, durasi=10m | Planned | | results/gin_1jt_run3.json |

Jumlah runs per skenario : *3*
Total runs               : *30*

DATA LOG (per run):
  Run ID    : *run-{framework}-{scale}-run{N}*
  Timestamp : *ISO-8601, contoh: 2026-06-22T10:00:00Z*
  Skenario  : *{Express.js|Gin}_{100|1k|10k|100k|1jt}*
  Input     : *framework, data scale, K6 VU, K6 duration, PostgreSQL state, code commit hash*
  Output    : *K6 JSON/CSV, Grafana/Prometheus metrics export*
  Anomali   : *catatan jika terjadi error, crash, atau outlier*
  Catatan   : *background process, WSL memory state, urutan eksekusi*
```

---

## Latihan 1 — Execution Plan

Susun execution plan untuk eksperimen Anda. Tentukan skenario, jumlah run, dan seed sebelum eksekusi.

| Run # | Skenario | Seed | Parameter Kunci | Status |
|-------|----------|------|----------------|--------|
| *1* | *Express.js_100* | *N/A* | *framework=Express.js, scale=100, VU=20, durasi=10m* | *Planned* |
| *2* | *Express.js_100* | *N/A* | *framework=Express.js, scale=100, VU=20, durasi=10m* | *Planned* |
| *3* | *Express.js_1k* | *N/A* | *framework=Express.js, scale=1k, VU=20, durasi=10m* | *Planned* |
| *4* | *Gin_100* | *N/A* | *framework=Gin, scale=100, VU=20, durasi=10m* | *Planned* |
| *5* | *Gin_1jt* | *N/A* | *framework=Gin, scale=1jt, VU=20, durasi=10m* | *Planned* |

**Total skenario:** *10 (5 skala data × 2 framework)*
**Run per skenario:** *3*
**Total run keseluruhan:** *30*

> *Catatan: Load testing dengan K6 bersifat deterministik berdasarkan konfigurasi VU dan durasi, sehingga kolom Seed diberi nilai N/A. Urutan eksekusi framework di-randomisasi untuk menghindari efek memori WSL yang menumpuk.*

---

## Latihan 2 — Data Log Terstruktur

Desain format data log untuk eksperimen Anda. Tentukan field apa saja yang akan dicatat.

**Identitas:**
| Field | Contoh |
|-------|--------|
| Run ID | *run-express-100-run1* |
| Timestamp | *2026-06-22T10:00:00Z* |
| Framework | *Express.js* |
| Data Scale | *100* |
| Run Number | *1* |

**Konfigurasi:**
| Field | Contoh |
|-------|--------|
| Seed / Run Order | *N/A / urutan #5* |
| Code version | *commit abc1234* |
| K6 VU | *20* |
| K6 Duration | *10m* |
| PostgreSQL Version | *v16.x* |

**Hasil:**
| Metrik | Tipe Data | Range Valid |
|--------|----------|-------------|
| Response Time (ms) | float | ≥ 0 |
| Throughput (req/s) | float | ≥ 0 |
| CPU Usage (%) | float | 0 – 100 |
| Memory Usage (MB) | float | ≥ 0 |
| Error Rate (%) | float | 0 – 100 |

**Format output:** [ ] CSV / [x] JSON / [ ] Database / [ ] Lainnya: *JSON utama; CSV sebagai export sekunder untuk visualisasi*

---

## Latihan 3 — Anomaly Protocol

Rencanakan bagaimana menangani anomali. Untuk setiap jenis, tentukan langkah yang diambil.

| Jenis Anomali | Contoh | Tindakan |
|---------------|--------|----------|
| Run gagal (crash) | *PostgreSQL connection pool habis atau framework crash saat skala 1jt.* | *Dokumentasi error; restart PostgreSQL + cooling-down 2 menit; re-run dengan konfigurasi identik; catat apakah anomali terulang.* |
| Hasil ekstrem | *Throughput Gin tiba-tiba 10× lebih tinggi karena 90% request error HTTP 500.* | *Investigasi error rate; tolak run jika error > 5%; simpan sebagai DNF atau temuan jika konsisten.* |
| Waktu eksekusi anomali | *Response Time Express.js melonjak di menit ke-8 saat WSL memory pressure tinggi.* | *Catat kondisi vmmem OS; bersihkan cache; re-run; bandingkan dengan run lain pada skenario sama.* |
| Inkonsistensi dengan run lain | *Run 1 Throughput Express.js_1jt = 1.200 req/s, Run 2 = 800 req/s (selisih > 20%).* | *Periksa background process dan urutan eksekusi; tambahkan jumlah run; gunakan median/p95, bukan hanya rata-rata.* |

**Prinsip:** Detect → Investigate → Document → Decide

---

## Refleksi

> Pernahkah Anda melaporkan hasil riset/tugas dari single run? Apa risikonya? Bagaimana multiple run mengubah kepercayaan terhadap hasil?

**Pengalaman sebelumnya:**
> *Pernah melaporkan hasil load test dari single run saat menguji endpoint API. Hasilnya terlihat cepat, tetapi tidak bisa diuji signifikansinya dan rentan terhadap spike sementara.*

**Yang akan dilakukan berbeda:**
> *Menjalankan minimal 3 run per skenario, mencatat distribusi metrik, dan menggunakan ANOVA serta effect size untuk mengukur keandalan perbedaan. Anomali tidak dihapus, melainkan didokumentasi dan dianalisis sebagai bagian dari temuan.*
