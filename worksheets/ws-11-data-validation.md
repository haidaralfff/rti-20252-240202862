# WS-11: Data Validation & Integrity

> **Bab 11 — Validasi Data & Integritas**

---

## Ringkasan Materi

### Data Trust Model

```
Raw Data → Data Cleaning → Consistency Check → Validation Process → Trusted Data
```

Data mentah belum bisa dipercaya. Harus melewati pipeline validasi sebelum siap untuk analisis statistik.

### Empat Pilar Data Quality

| Pilar | Deskripsi | Contoh Pelanggaran |
|-------|----------|-------------------|
| **Accuracy** | Nilai dalam range masuk akal | Akurasi = 1.5 (di luar [0,1]) |
| **Consistency** | Format seragam di semua run | Run 1: CSV, Run 2: JSON |
| **Completeness** | Tidak ada data hilang dari plan | 97 dari 100 run tercatat |
| **Validity** | Data sesuai desain eksperimen | Parameter baseline tercampur treatment |

### Proses Validasi Progresif

1. **Format validation** — Tipe file, header, kolom
2. **Range validation** — Nilai dalam batas logis
3. **Consistency validation** — Format seragam antar-run
4. **Logic validation** — Data cocok dengan desain eksperimen

Jika gagal di langkah awal → tidak perlu lanjut.

### Anomaly Detection — 3 Jenis

| Jenis | Deskripsi | Deteksi |
|-------|----------|---------|
| **Statistical outlier** | Nilai di luar distribusi normal | IQR: < Q1-1.5×IQR atau > Q3+1.5×IQR |
| **Contextual anomaly** | Normal absolut, abnormal dalam konteks | Run 1-10: ~91%, Run 11-20: ~88% |
| **Pattern anomaly** | Pola sistematis (bukan random) | Performa menurun berurutan |

**Prinsip:** Detect → Investigate → Document → Decide — **JANGAN langsung hapus.**

### Engineering vs Research Validation

| Aspek | Engineering | Research |
|-------|-----------|---------|
| Tujuan | Data sesuai spesifikasi bisnis | Data layak untuk analisis statistik |
| Missing data | Impute / set default | Investigasi penyebab → dokumentasi |
| Outlier | Bug → fix | Mungkin temuan → investigasi |
| Dokumentasi | Minimal (log error) | Komprehensif (anomali + keputusan) |

### Jebakan Kognitif

1. "Logging otomatis ≠ data benar" → bisa ada bug di logger
2. "Outlier = hapus" → bisa jadi temuan penting
3. "Dataset kecil tidak perlu validasi" → justru lebih rentan
4. "Mean normal = data benar" → [94, 95, 93, **44**, 94] → mean 84% terlihat wajar

---

## Template A.11 — Data Validation Checklist

```
DATA VALIDATION CHECKLIST

Completeness:
  [x] Semua skenario tercakup (baseline, db_single, db_complex × Express.js, Gin)
  [x] Jumlah run sesuai rencana (40 run per kombinasi, total 240 runs)
  [x] Tidak ada file output hilang (6 file CSV utama tersedia)
  Missing: 0 dari 240 data points

Format Consistency:
  [x] Semua file format sama (CSV, K6 raw output)
  [x] Header konsisten (metric_name, timestamp, metric_value, check, error, ...)
  [x] Tipe data konsisten (numerik tetap numerik, timestamp dalam Unix epoch)

Range & Logic:
  [x] Nilai dalam range masuk akal (Response Time ≥ 0, CPU 0–100%, Memory ≥ 0)
  [x] Tidak ada waktu negatif
  [x] Metrik CPU 0–100%, tidak di luar range
  Anomali ditemukan: Outlier ekstrem pada Express.js baseline (max RT = 22133.54 ms) — didokumentasikan, bukan dihapus

Cross-Validation:
  [x] Run identik → hasil mendekati (std antar-run wajar)
  [x] Trend konsisten dengan ekspektasi teori (Gin lebih cepat dari Express.js di semua skenario)

Keputusan:
  [x] Data siap analisis
  [ ] Perlu cleaning
  [ ] Perlu re-run (skenario: ____)
```

---

## Latihan 1 — Completeness Check

Verifikasi apakah semua data yang direncanakan sudah terkumpul.

| Skenario | Run Direncanakan | Run Tercatat | Missing | Alasan |
|----------|-----------------|-------------|---------|--------|
| baseline × Express.js | 40 | 40 | 0 | — |
| baseline × Gin | 40 | 40 | 0 | — |
| db_single × Express.js | 40 | 40 | 0 | — |
| db_single × Gin | 40 | 40 | 0 | — |
| db_complex × Express.js | 40 | 40 | 0 | — |
| db_complex × Gin | 40 | 40 | 0 | — |

**Total expected:** 240 | **Total actual:** 240 | **Missing:** 0

**Keputusan untuk data missing:**
> Tidak ada data missing. Semua 240 run (6 kombinasi skenario × framework × 40 replikasi) berhasil tercatat. Logging otomatis K6 dan docker stats menghasilkan file output untuk setiap iterasi tanpa kehilangan data.

---

## Latihan 2 — Anomaly Investigation

Periksa data Anda untuk anomali. Gunakan metode IQR atau z-score.

**Dataset sampel (data Response Time dari Express.js baseline — 40 run):**

| Run | Response Time (ms) |
|-----|-------------------|
| 1 | *66.81* |
| 2 | *5.10* |
| 3 | *3.49* |
| 4 | *3.67* |
| 5 | *4.47* |
| 6 | *2.67* |
| 7 | *2.55* |
| 8 | *3.12* |
| 9 | *4.02* |
| 10 | *4.77* |
| 11 | *3.01* |
| 12 | *6.03* |
| 13 | *4.07* |
| 14 | *3.69* |
| 15 | *2.74* |
| 16 | *3.16* |
| 17 | *3.00* |
| 18 | *3.31* |
| 19 | *4.34* |
| 20 | *12.78* |

**Deteksi outlier (dari ringkasan statistik — baseline Express.js):**
- Mean = 118.88 ms | Median = 51.98 ms | Std = 450.38 ms
- Min = 0.00 ms | Max = 22133.54 ms
- p90 = 246.09 ms | p95 = 443.80 ms | p99 = 669.99 ms
- Outlier IQR: 25.683 data point terdeteksi sebagai outlier dari 274.992 total request

**Investigasi (untuk outlier ekstrem):**

| Outlier | Nilai | Kemungkinan Penyebab | Keputusan |
|---------|-------|---------------------|-----------|
| Max RT = 22133.54 ms | *22.134 ms* | *Cold start / GC pause pada Node.js event loop saat request pertama atau setelah idle* | *Dokumentasikan sebagai temuan — representasi overhead runtime interpreted* |
| p99 = 669.99 ms | *670 ms* | *Tail latency akibat connection pool exhaustion PostgreSQL atau thread scheduling OS* | *Tetap disertakan — merupakan representasi kondisi beban kritis* |
| Outlier IQR: 25.683 dari 274.992 request | *9.3%* | *Spike latency dari kombinasi I/O disk WSL2 dan event loop blocking* | *Tidak dihapus — merupakan karakteristik nyata performa Express.js* |

**Catatan:** Dalam riset performa, outlier seringkali merupakan temuan yang berharga (bukan error). Outlier Express.js yang tinggi mengindikasikan ketidakstabilan runtime interpreted dibandingkan compiled framework Gin.

---

## Latihan 3 — Validation Report

Buat laporan validasi ringkas untuk dataset eksperimen Anda.

**1. Completeness:** 100% data terkumpul (240 dari 240 run)
**2. Format:** [x] Konsisten / [ ] Ada inkonsistensi: —
**3. Range check (anomali):** Ditemukan outlier ekstrem pada Express.js (max RT 22.134 ms, 9.3% request outlier IQR). Tidak ada nilai negatif atau di luar range logis. Semua outlier didokumentasikan sebagai temuan riset.
**4. Logic check:** [x] Parameter sesuai plan / [ ] Ada ketidaksesuaian: —
- 3 skenario (baseline, db_single, db_complex) tercakup
- 2 framework (Express.js, Gin) tercakup
- 40 replikasi per kombinasi tercatat
- Parameter K6 (200 VU, 30 detik) konsisten

**Kesimpulan:** [x] Data siap analisis / [ ] Perlu tindakan: —

---

## Refleksi

> Apa perbedaan antara "data yang benar" dan "data yang dipercaya"? Mengapa proses validasi formal diperlukan meskipun data dikumpulkan secara otomatis?

> "Data yang benar" adalah data yang secara teknis terekam dengan format yang valid — tidak ada error parsing, tidak ada missing field, semua kolom terisi. Namun "data yang dipercaya" adalah data yang sudah melewati proses validasi dan terbukti memenuhi empat pilar kualitas: accuracy, consistency, completeness, dan validity. Data bisa "benar" secara format tapi "tidak dipercaya" secara substantif — misalnya, logging otomatis K6 tetap mencatat request yang di-handle oleh error handler HTTP 500 sebagai "successful request" dengan duration 0 ms.

> Proses validasi formal diperlukan meskipun data dikumpulkan secara otomatis karena: (1) Otomatisasi tidak menjamin kebenaran — bug di logger, race condition di docker stats, atau overhead WSL2 bisa menghasilkan data yang formatnya benar tapi isinya menyesatkan; (2) Dalam riset, outlier bukan selalu error — bisa jadi temuan penting yang menunjukkan batas kemampuan metode; (3) Tanpa validasi formal, kita tidak bisa membedakan antara spike latency yang merupakan karakteristik nyata vs spike yang disebabkan oleh interference dari OS. Validasi formal memberikan jejak audit (audit trail) yang memungkinkan reproduksi dan verifikasi oleh peneliti lain.
