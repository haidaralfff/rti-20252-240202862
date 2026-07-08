# WS-13: Data Preprocessing

> **Bab 13 — Preprocessing & Persiapan Data untuk Analisis**

---

## Ringkasan Materi

### Data Refinement Pipeline

```
Raw Data → Cleaning → Transformation → Normalization → Processed Data → Analysis Ready
```

Setiap tahap memiliki tujuan berbeda. **Preprocessing bukan langkah teknis biasa** — setiap keputusan preprocessing adalah keputusan riset yang bisa mengubah kesimpulan.

### Empat Prinsip Preprocessing

| Prinsip | Deskripsi |
|---------|----------|
| **Consistency** | Metode sama untuk data yang sama |
| **Transparency** | Setiap langkah terdokumentasi |
| **Reproducibility** | Orang lain bisa mengulang dengan hasil sama |
| **Minimal Distortion** | Ubah sesedikit mungkin; jika normalisasi tidak perlu, jangan lakukan |

### Cleaning Triad

| Masalah | Strategi | Risiko |
|---------|---------|--------|
| **Missing values** | | |
| — Listwise deletion | Missing < 5%, random | Data loss |
| — Mean/median imputation | Sedikit missing, dist. normal | Mengurangi variabilitas |
| — Model-based imputation | Banyak missing, pola sistematis | Introduces dependency |
| — Flag & separate | Missing karena alasan substantif | Kompleksitas analisis |
| **Duplikat** | Identifikasi → verifikasi → hapus | False positive (data mirip ≠ duplikat) |
| **Error format** | Standardisasi tipe, encoding | Kehilangan informasi saat konversi |

### Normalisasi — Kapan & Metode Mana

| Metode | Formula | Output | Sensitif Outlier? |
|--------|---------|--------|-------------------|
| Min-max | (x-min)/(max-min) | [0, 1] | Ya |
| Z-score | (x-mean)/std | Unbounded | Lebih robust |
| Robust scaling | (x-median)/IQR | Unbounded | Paling robust |

**Kunci:** Parameter normalisasi harus dihitung dari **training set saja** — bukan seluruh data. Pelanggaran = **data leakage**.

### Data Leakage Prevention

Data leakage terjadi ketika informasi dari test set "bocor" ke preprocessing:
- Normalisasi parameter dari seluruh dataset ← **SALAH**
- Cross-validation dilakukan sebelum split ← **SALAH**
- Feature selection menggunakan label test set ← **SALAH**

### Jebakan Kognitif

1. "Preprocessing cuma teknis — tidak perlu detail" → bisa ubah kesimpulan
2. "Lebih banyak preprocessing = lebih bersih = lebih baik" → over-processing distorsi data
3. "Normalisasi selalu diperlukan" → belum tentu, tergantung metode analisis
4. "Imputation sama untuk semua situasi" → strategi harus sesuai konteks

---

## Template A.13 — Preprocessing Documentation Log

```
PREPROCESSING LOG

Dataset           : K6 Load Testing Output (Express.js vs Gin REST API)
Jumlah data awal  : 240 runs, ~10.000.000 baris data mentah (6 file CSV)

Cleaning:
| Masalah | Jumlah Kasus | Penanganan | Justifikasi |
|---------|-------------|------------|-------------|
| Missing values | 0 | Tidak ada | Logging otomatis K6 dan docker stats tidak menghasilkan missing values |
| Duplikat | ~2.400 baris | Dihapus (deduplicate berdasarkan timestamp + metric_name) | K6 retry mechanism bisa mencatat request yang sama dua kali |
| Error format (HTTP 500/timeout) | ~18.000 request | Diflag, tidak dihapus | Error rate merupakan temuan riset — menunjukkan batas kemampuan framework |

Transformation:
| Transformasi | Variabel | Detail | Alasan |
|-------------|----------|--------|--------|
| Agregasi per-run | http_req_duration | Mean, median, std, p90, p95, p99 dihitung dari semua request per run | Data mentah per-request terlalu besar untuk analisis langsung |
| Kalkulasi Throughput | http_reqs | Total request sukses per run dibagi durasi | Throughput = jumlah request sukses / waktu |
| Kalkulasi Slowdown Ratio | Response Time | Express_mean / Gin_mean per skenario | Untuk menunjukkan berapa kali Express lebih lambat dari Gin |

Normalization:
  Metode    : Tidak dilakukan
  Alasan    : Perbandingan dilakukan dalam satuan asli (ms, req/s, %, MiB) — normalisasi tidak diperlukan untuk komparasi absolute
  Parameter : N/A

Leakage Check:
  [x] Tidak ada normalisasi → tidak ada potensi leakage
  [x] Tidak ada train-test split dalam eksperimen komparatif
  [x] Semua run diperlakukan sama (40 replikasi per kombinasi)

Jumlah data akhir : 240 runs (6 kombinasi × 40 replikasi), 4 metrik per run
Script tersedia   : [x] Ya → path: 05-kode/analysis/ (Python Pandas pipeline)
```

---

## Latihan 1 — Cleaning Plan

Periksa dataset Anda (atau dataset contoh) dan dokumentasikan masalah yang ditemukan.

| Masalah | Jumlah Kasus | Penanganan | Justifikasi |
|---------|-------------|------------|-------------|
| Missing values | 0 dari ~10 juta baris (0%) | Tidak ada | K6 logging otomatis dan docker stats berjalan kontinu tanpa gap |
| Duplikat (retry request) | ~2.400 dari ~10 juta baris (0.024%) | Dihapus setelah verifikasi | K6 retry mechanism mencatat request yang gagal lalu retry — duplikat ini bukan data baru |
| Error HTTP 500/timeout | ~18.000 request (0.18%) | Diflag sebagai "error" | Error rate merupakan temuan riset — menunjukkan frameExpress.js lebih rentan error dibanding Gin |

**Jumlah data sebelum cleaning:** ~10.000.000 baris data mentah
**Jumlah data setelah cleaning:** ~9.997.600 baris (setelah hapus duplikat)
**Persentase data yang hilang/berubah:** 0.024%

---

## Latihan 2 — Normalisasi Decision

Tentukan apakah data Anda perlu normalisasi, dan jika ya, metode apa yang tepat.

| Variabel | Range Asli | Distribusi | Outlier? | Metode Normalisasi | Alasan |
|----------|-----------|-----------|----------|-------------------|--------|
| Response Time (ms) | 0 – 22.134 ms | Right-skewed (mean >> median) | Ya (max 22.134 ms, p99=670 ms) | Tidak perlu | Perbandingan absolute ms antar framework; normalisasi akan menghilangkan makna satuan |
| Throughput (req/s) | 0 – 274.992 req | Skewed (tergantung skenario) | Tidak ekstrem | Tidak perlu | Dihitung dari jumlah request sukses, sudah dalam satuan yang bisa dibandingkan langsung |
| CPU Usage (%) | 5.2 – 88% | Approx. normal | Tidak | Tidak perlu | Sudah dalam skala [0,100], perbandingan absolute antar framework |
| Memory Usage (MiB) | 140 – 640 MiB | Approx. normal | Tidak | Tidak perlu | Perbandingan absolute MiB antar framework |

**Apakah normalisasi diperlukan?** [ ] Ya / [x] Tidak
**Justifikasi:**
> Eksperimen ini adalah perbandingan komparatif (comparison study) — tujuannya mengetahui berapa kali Express lebih lambat dari Gin dalam satuan asli (ms, req/s, %, MiB). Normalisasi (min-max, z-score, robust) akan mengubah data ke skala relatif yang menghilangkan interpretasi praktis: "Express 118.88 ms vs Gin 4.04 ms" lebih mudah dipahami daripada "Express 2.45 vs Gin -0.32 (z-score)". Selain itu, tidak ada metode analisis berbasis distance (KNN, SVM, clustering) yang membutuhkan normalisasi.

**Leakage check:**
- [x] Parameter dihitung dari training set saja (tidak ada normalisasi → tidak ada parameter)
- [x] Normalisasi diterapkan setelah train-test split (tidak ada split → tidak ada leakage)
- [x] Tidak ada preprocessing yang menggunakan informasi dari test set

---

## Latihan 3 — Preprocessing Report

Buat ringkasan preprocessing lengkap — dokumentasi yang cukup bagi orang lain untuk mereplikasi.

```
PREPROCESSING SUMMARY

1. Dataset: K6 Load Testing Output — Express.js vs Gin REST API Performance Comparison
2. Data awal: ~10.000.000 baris (6 file CSV mentah), 19 kolom per baris
3. Cleaning:
   - Missing values: 0 kasus — logging otomatis K6 dan docker stats
   - Duplikat: ~2.400 kasus (0.024%), tindakan: dihapus (retry request dari K6)
   - Error: ~18.000 request HTTP 500/timeout (0.18%), tindakan: diflag sebagai error, tidak dihapus
4. Transformation:
   - Agregasi per-run: mean, median, std, p90, p95, p99 dari http_req_duration
   - Kalkulasi Throughput: total request sukses / durasi
   - Kalkulasi Slowdown Ratio: Express_mean / Gin_mean per skenario
5. Normalisasi: Tidak dilakukan — perbandingan dalam satuan asli (ms, req/s, %, MiB)
6. Data akhir: 240 runs, 4 metrik per run (Response Time, Throughput, CPU%, Memory MiB)
7. Leakage check: [x] Lulus — tidak ada normalisasi, tidak ada train-test split, tidak ada informasi test set dalam preprocessing
```

---

## Refleksi

> Apakah Anda pernah melakukan normalisasi "karena biasa dilakukan" tanpa mempertimbangkan apakah benar-benar diperlukan? Apa risiko over-preprocessing?

> Pada proyek machine learning sebelumnya, saya perlu melakukan normalisasi z-score pada semua fitur "karena biasa dilakukan" — termasuk fitur kategorikal yang sudah di-encode numerik (0/1). Akibatnya, fitur biner yang sebelumnya bernilai {0, 1} berubah menjadi {-0.5, 0.5} setelah z-score, yang menghilangkan interpretasi aslinya. Tidak ada peningkatan performa model dari normalisasi ini, justru interpretabilitas menurun.

> Risiko over-preprocessing: (1) **Distorsi data** — normalisasi yang tidak perlu bisa mengubah distribusi asli data, terutama pada fitur yang sudah dalam skala bermakna; (2) **Kehilangan interpretabilitas** — angka asli (ms, %, MiB) lebih mudah dipahami daripada skala normalisasi; (3) **Data leakage** — jika normalisasi menggunakan parameter dari seluruh dataset (bukan training set saja), informasi test set bocor ke preprocessing; (4) **False confidence** — merasa data "sudah bersih" padahal over-processing justru menambah noise. Dalam riset ini, keputusan untuk TIDAK melakukan normalisasi sama pentingnya dengan keputusan untuk melakukannya — prinsip "minimal distortion" menjadi panduan utama.
