# WS-09: Implementation & Environment

> **Bab 9 — Implementasi Riset & Kontrol Lingkungan**

---

## Ringkasan Materi

### Implementasi Riset ≠ Coding Biasa

Tujuan implementasi riset bukan membuat software yang berfungsi, melainkan membangun **instrumen pengukuran yang konsisten**. Setiap modul harus di-mapping ke variabel (dari Bab 6), parameter harus config-driven, dan logging aktif dari hari pertama.

### Reproducible Implementation Model

```
Design → Implementation → Environment Setup → Execution Consistency → Reproducibility → Trustworthy Result
```

Setiap transisi memiliki syarat:
- Design → Implementation: kode sesuai mapping variabel-ke-komponen
- Implementation → Environment: versi, dependency, seed, path, OS eksplisit
- Environment → Consistency: seed terkunci, urutan deterministik
- Consistency → Reproducibility: dokumentasi lengkap
- Reproducibility → Trust: siapa pun ikuti dokumentasi → hasil sama/serupa

### Repeatability vs Reproducibility

| Level | Peneliti | Environment | Hasil |
|-------|---------|-------------|-------|
| **Repeatability** | Sama | Sama | Sama persis |
| **Reproducibility** | Berbeda | Berbeda (ikuti docs) | Sama/serupa |

Capai **repeatability** dulu, baru **reproducibility**.

### Engineering vs Research Perspective

| Aspek | Engineering | Research |
|-------|-----------|---------|
| Tujuan | Sistem berfungsi untuk user | Instrumen pengukuran konsisten |
| Dependency | Update ke terbaru | Lock di versi spesifik |
| Testing | Unit, integration, E2E | Repeatability test (run ulang → sama?) |
| Dokumentasi | User guide, API docs | Environment spec, execution steps, expected output |
| Config | Default masuk akal | Setiap parameter eksplisit & adjustable |

### Jebakan Kognitif

1. Menunda environment setup → bug sulit dilacak
2. Tidak pakai version control → hasil tidak bisa direkonstruksi
3. Menolak Docker/container → "di laptop saya bisa" saat review
4. 3× hasil sama ≠ repeatable (bisa cache/state tersimpan)

### Istilah Penting

- **Environment Specification** — Deskripsi lengkap: hardware, OS, runtime, library + versi, config, seed
- **Dependency** — Komponen eksternal yang harus di-lock versinya
- **Config-driven** — Parameter dieksternalisasi ke file konfigurasi, bukan hardcode

---

## Template A.9 — Dokumentasi Setup Eksperimen

```
EXPERIMENT SETUP DOCUMENTATION

Hardware:
  CPU     : *20 Core Virtual CPU (WSL2)*
  RAM     : *8 GB*
  GPU     : *CPU-only (tidak digunakan)*
  Storage : *SSD/NVMe dengan minimum 50 GB ruang kosong*

Software:
  OS        : *Ubuntu 24.04 LTS (WSL2 on Windows 11)*
  Runtime   : *Node.js v20.x LTS (Express.js) dan Go v1.22.x (Gin)*
  Framework : *Express.js v4.x dan Gin v1.x*

Dependencies:
| Library | Version | Sumber | Hash/Checksum |
|---------|---------|--------|---------------|
| Node.js | v20.x LTS | nodejs.org | - |
| Go | v1.22.x | go.dev | - |
| PostgreSQL | v16.x | postgresql.org | - |
| K6 | v0.52.x | grafana.com/k6 | - |
| Prometheus | v2.51.x | prometheus.io | - |
| Grafana | v10.x | grafana.com | - |
| node_exporter | v1.7.x | prometheus.io | - |
| Docker | v26.x | docker.com | - |

Konfigurasi:
  Config file     : *k6/script.js, .env, docker-compose.yml*
  Random seed     : *N/A (load testing deterministik berdasarkan VU dan durasi)*
  Hyperparameters : *20 Virtual Users, 10 menit durasi, 5 skala data (100, 1k, 10k, 100k, 1jt), 3 repetisi per run*

Reproducibility Check:
  [x] Dependency terdokumentasi (requirements.txt / lock file)
  [x] Konfigurasi dan urutan eksekusi ditetapkan secara konsisten (Node.js/Go, framework, database)
  [x] Config di version control
  [x] README instruksi reproduksi lengkap
```

---

## Latihan 1 — Environment Specification

Dokumentasikan environment untuk eksperimen Anda (boleh environment saat ini atau yang direncanakan).

| Komponen | Spesifikasi |
|----------|------------|
| CPU | *20 Core Virtual CPU (WSL2)* |
| RAM | *8 GB* |
| GPU | *CPU-only (tidak digunakan)* |
| OS | *Ubuntu 24.04 LTS (WSL2 on Windows 11)* |
| Runtime | *Node.js v20.x LTS (Express.js) dan Go v1.22.x (Gin)* |
| Framework | *Express.js v4.x dan Gin v1.x* |
| Random Seed | *N/A (load testing deterministik berdasarkan konfigurasi VU dan durasi)* |

**Dependencies (minimal 5):**

| Library | Version | Alasan Dibutuhkan |
|---------|---------|-------------------|
| Node.js | v20.x LTS | *Runtime untuk menjalankan backend Express.js* |
| Go | v1.22.x | *Runtime untuk menjalankan backend Gin* |
| PostgreSQL | v16.x | *Database untuk menyimpan data KRS hingga 1 juta record* |
| K6 | v0.52.x | *Load testing tool untuk menghasilkan beban HTTP* |
| Prometheus | v2.51.x | *Scraping metrik resource dari node_exporter* |

---

## Latihan 2 — Repeatability Test Plan

Rancang tes repeatability sederhana: jalankan kode yang sama 3× di environment yang sama.

| Run | Seed | Metrik Utama | Hasil Sama? |
|-----|------|-------------|-------------|
| 1 | *N/A* | *Throughput (req/s) dan Response Time (ms)* | — |
| 2 | *N/A* | *Throughput (req/s) dan Response Time (ms)* | [x] Ya / [ ] Tidak |
| 3 | *N/A* | *Throughput (req/s) dan Response Time (ms)* | [x] Ya / [ ] Tidak |

**Jika hasil berbeda, kemungkinan penyebab:**
> *Background process OS, kondisi memory WSL (vmmem), cache PostgreSQL yang belum dibersihkan, atau scheduling jitter dari K6 virtual users.*

**Checklist kontrol yang sudah diterapkan:**
- [x] Konfigurasi dan urutan eksekusi ditetapkan secara konsisten di semua level
- [x] Tidak ada background process yang mengganggu
- [x] Cache dibersihkan antar-run
- [x] Config file yang sama untuk semua run

---

## Latihan 3 — README Eksperimen

Tulis README minimum untuk eksperimen Anda (6 komponen wajib).

```
# Judul Eksperimen: Performance Evaluation of Backend Frameworks for REST API: Focused Comparison of Express.js and Gin

## 1. Environment
> WSL2 on Windows 11, Ubuntu 24.04 LTS, 20 Core Virtual CPU, 8 GB RAM, SSD. Runtime: Node.js v20.x LTS (Express.js) dan Go v1.22.x (Gin).

## 2. Installation
> 1. Install WSL2 dan Ubuntu 24.04.
> 2. Install Node.js v20.x LTS dan Go v1.22.x.
> 3. Install Docker dan Docker Compose.
> 4. Jalankan `docker-compose up -d` untuk PostgreSQL, Prometheus, Grafana, dan node_exporter.
> 5. Install K6 sesuai dokumentasi official Grafana.
> 6. Jalankan `npm install` di folder Express.js dan `go mod tidy` di folder Gin.

## 3. Data
> Data tabel KRS (Kartu Rencana Studi) dalam PostgreSQL dengan skema identik, diisi hingga 1.000.000 record. Data diakses melalui endpoint REST API (GET/POST/PUT/DELETE).

## 4. Execution
> 1. Jalankan backend Express.js (`npm start` atau `node server.js`) pada port tertentu.
> 2. Jalankan backend Gin (`go run main.go`) pada port yang sama setelah Express.js dihentikan.
> 3. Jalankan skrip K6: `k6 run script.js` untuk setiap skala data (100, 1k, 10k, 100k, 1jt).
> 4. Ulangi setiap kombinasi framework × skala data minimal 3×.
> 5. Ambil metrik resource dari Grafana dashboard.

## 5. Configuration
> File config utama:
> - `docker-compose.yml` — versi dan port PostgreSQL, Prometheus, Grafana, node_exporter.
> - `.env` — koneksi database dan port backend.
> - `k6/script.js` — jumlah VU (20), durasi (10 menit), target endpoint, dan skala data.
> Parameter kunci: 20 VU, 10 menit, 5 skala data, 3 repetisi.

## 6. Expected Output
> - File CSV/JSON dari K6 berisi `http_req_duration`, `http_reqs`, `http_req_failed`.
> - Dashboard Grafana berisi time-series CPU Usage (%) dan Memory Usage (MB) per framework.
> - Summary metrik rata-rata, p90, p95 untuk Response Time dan Throughput per skala data.
```

---

## Refleksi

> Apakah eksperimen Anda saat ini bisa direproduksi oleh orang lain tanpa bantuan Anda? Komponen apa yang masih hilang?

**Level saat ini:** [x] Repeatability / [ ] Reproducibility / [ ] Belum keduanya
**Komponen yang belum terdokumentasi:**
> *Untuk mencapai Reproducibility penuh, perlu menyediakan Virtual Machine image atau Docker Compose lengkap yang dapat dijalankan di environment lain tanpa konfigurasi manual.*
