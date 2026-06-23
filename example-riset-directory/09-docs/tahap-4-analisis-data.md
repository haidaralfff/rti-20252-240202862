# Tahap 4: Ekstraksi Data & Visualisasi

**Status:** Selesai

## 1. Tujuan

Memproses ratusan file JSON/CSV *summary* hasil dari Tahap 3 menjadi data tabel agregat dan grafik yang siap disajikan dalam publikasi jurnal ilmiah. 

## 2. Metrik yang Dianalisis

### Metrik Performa Latensi (dari k6)
- **Mean (Rata-rata)**
- **Median (p50)**: indikator *typical response time* bebas pencilan.
- **p95 (Persentil ke-95)**: *tail latency* (kualitas performa pada beban kritis).

### Metrik Utilisasi Resource (dari Docker Stats)
- **Rata-rata Utilitas CPU (%)** dari masing-masing container (API Express, API Gin, PostgreSQL).
- **Rata-rata Penggunaan Memori (MiB)**.

## 3. Pipeline Pemrosesan Data (Python Pandas)

Skrip Python difungsikan di direktori `05-kode/analysis/`:
1. **Pembersihan**: Menyatukan CSV k6 yang terdistribusi dan log utilisasi CPU docker stats.
2. **Kalkulasi Slowdown Ratio**: Mencari perbandingan kecepatan `Express Latency / Gin Latency` (Berapa *x* kali Express lebih lambat dari Gin).
3. **Agregasi**: Menghasilkan file `descriptive_stats.csv`, `speedup_ratio.csv`, dan `resource_usage.csv` di folder `06-output/tables/`.

## 4. Visualisasi Data (Matplotlib / Seaborn)

Skrip *charting* difungsikan untuk memproduksi plot visual berformat `.png` di direktori `06-output/`:
- `baseline_comparison.png`
- `db_single_comparison.png`
- `db_complex_comparison.png`
- `benchmark_comparison.png` (plot gabungan antar skenario)
