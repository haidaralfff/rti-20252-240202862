# Metodologi

## 3.1. Desain Eksperimen

### 3.1.1. Objek Penelitian

Dua aplikasi REST API yang mengimplementasikan endpoint yang identik:

1. **Express.js API** — dibangun dengan Node.js 20.x, Express 4.x, TypeScript, Prisma ORM, dan PostgreSQL.
2. **Gin API** — dibangun dengan Go 1.24.x, Gin framework, GORM, dan PostgreSQL.

Kedua aplikasi dijalankan di lingkungan yang identik (Docker Compose) untuk memastikan perbandingan yang adil (*apples-to-apples*).

### 3.1.2. Skenario Eksperimen

Tiga skenario beban digunakan untuk menguji berbagai tingkat kompleksitas operasi:

| Skenario | Endpoint | Deskripsi |
|---|---|---|
| `baseline` | `/api/simple` | Handler sederhana tanpa database query. |
| `db_single` | `/api/users/:id` | Single database query: `SELECT * FROM users WHERE id = ?`. |
| `db_complex` | `/api/users/stats` | Complex database query: agregasi dengan `COUNT`, `GROUP BY`, dan `JOIN` pada tabel users dan orders. |

### 3.1.3. Konfigurasi Pengujian

- **Tool**: k6 (Grafana k6)
- **Durasi**: Mencakup sampai 275.000 request untuk baseline, 65.000 untuk db_single, 20.000 untuk db_complex (Express); dan jumlah request yang dihasilkan secara alami oleh setiap framework pada durasi yang sama.
- **Replikasi**: 40 replikasi per kombinasi framework × skenario.
- **Metrik**: `http_req_duration` (latensi per request), `http_reqs` (total request), `http_req_failed` (request gagal).
- **Lingkungan**: Docker Compose dengan container terisolasi, PostgreSQL 15, dan resource monitor.

### 3.1.4. Metrik Evaluasi

Empat metrik statistik digunakan untuk setiap kombinasi:

1. **Mean** — rerata latency (ms), sensitif terhadap outlier.
2. **Median** — nilai tengah, lebih robust terhadap distribusi skewed.
3. **Persentil (p90, p95, p99)** — indikator *tail latency*, penting untuk evaluasi QoS.
4. **IQR dan Outlier Ratio** — mengukur konsistensi distribusi dan ekstremitas nilai.

Rasio performa dihitung sebagai:

$$\text{Slowdown}_{E/G} = \frac{T_{Express}}{T_{Gin}}$$

di mana $T$ adalah metrik latency tertentu (mean atau median). Nilai > 1 menunjukkan Express lebih lambat.

## 3.2. Implementasi Aplikasi

### 3.2.1. Express.js Application

Aplikasi Express dibangun dengan struktur modular:
- **Framework**: Express 4.x dengan TypeScript.
- **Database**: PostgreSQL diakses via Prisma ORM.
- **Endpoints**:
  - `GET /api/simple` — handler langsung tanpa DB.
  - `GET /api/users/:id` — query single user berdasarkan ID.
  - `GET /api/users/stats` — query agregasi kompleks.
- **Middleware**: CORS, JSON parsing, request logging.

### 3.2.2. Gin Application

Aplikasi Gin dibangun dengan struktur hexagonal/clean architecture:
- **Framework**: Gin dengan Go modules.
- **Database**: PostgreSQL diakses via GORM.
- **Endpoints**: sama persis dengan Express untuk memastikan perbandingan yang valid.
- **Konfigurasi**: `gin.SetMode(gin.ReleaseMode)` untuk menghilangkan overhead debug.

## 3.3. Prosedur Pengujian

1. **Warm-up**: Jalankan setiap aplikasi selama 30 detik sebelum pengukuran untuk menjamin *JIT compilation* (Node.js) dan *cache warming* (database).
2. **Eskalasi**: Tingkatkan VUs secara bertahap hingga mencapai target throughput yang wajar.
3. **Pengumpulan Data**: k6 menghasilkan ringkasan metrics secara otomatis (`--summary-export`). Tidak ada output raw per-request untuk menghindari volume data yang tidak terkelola.
4. **Validasi**: Semua run memeriksa `http_req_failed === 0` untuk memastikan tidak ada error yang menutupi performa.

## 3.4. Lingkungan Eksperimen

- **Host**: Windows 10/11 dengan Docker Desktop.
- **PostgreSQL**: Port 5433 (host), di-expose untuk isolasi.
- **Resource Monitoring**: Docker stats polling setiap ~3 detik untuk memantau CPU dan memori container selama pengujian.
