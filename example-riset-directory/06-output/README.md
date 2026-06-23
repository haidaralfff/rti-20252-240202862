# 06-output

Hasil olahan data & visualisasi — **Tahap 4** (lihat [../09-docs/tahap-4-analisis-data.md](../09-docs/tahap-4-analisis-data.md)).

Dihasilkan oleh analisis data k6 dari `04-data/` (6 skenario: 2 framework × 3 skenario beban).

## tables/

| File | Isi |
|---|---|
| `descriptive_stats.csv` | Statistik deskriptif (latensi mean/median/std/min/max/p90/p95/p99, requests, outliers IQR) per (dataset, framework) |
| `speedup_ratio.csv` | Rasio perlambatan Express vs Gin (mean & median slowdown) per skenario |
| `resource_usage.csv` | CPU% & memori (MiB) mean/max per (scenario, container: postgres, express-api, gin-api) |

## figures/

| File | Isi |
|---|---|
| `benchmark_comparison.png` | Perbandingan latency mean & median Express vs Gin (3 skenario) |
| `baseline_comparison.png` | Zoomed view baseline Express vs Gin |
| `db_single_comparison.png` | Zoomed view db_single Express vs Gin |
| `db_complex_comparison.png` | Zoomed view db_complex Express vs Gin |

## Acuan

[../09-docs/tahap-4-analisis-data.md](../09-docs/tahap-4-analisis-data.md)
