# WS-02: Problem Statement

> **Bab 2 — Problem Formulation & System Context**

---

## Ringkasan Materi

### Problem Formation Model

Masalah riset melewati 5 tahap transformasi. Melompat langsung dari Reality ke Variable adalah kesalahan paling umum.

```
Reality → Observed Issue (Symptom) → Diagnosed Problem (Root Cause)
→ Researchable Problem (Scoped) → Measurable Variable (Operationalized)
```

### Topic ≠ Problem ≠ Research Problem

| Level | Contoh | Status |
|-------|--------|--------|
| **Topik** | Keamanan IoT | Terlalu luas, tidak bisa diuji |
| **Problem** | MQTT tidak terenkripsi | Spesifik tapi belum riset |
| **Research Problem** | Belum ada studi membandingkan overhead TLS 1.3 vs DTLS pada MQTT di IoT RAM < 64KB | Bisa dirancang eksperimennya |

### Symptom vs Root Cause

Apa yang diamati (gejala) ≠ mengapa terjadi (akar masalah). Gunakan **5 Whys** atau **Fishbone Diagram** untuk menggali.

Contoh: "User meninggalkan checkout" (symptom) → "Waktu loading > 8 detik karena API call sequential" (root cause).

### System Thinking

Setiap masalah riset TI harus terikat pada komponen sistem: **Input → Process → Output → Outcome → Constraints → Stakeholders**.

### Problem Quality Check

Masalah riset yang layak harus memenuhi 5 kriteria:
- **Clarity** — Satu orang membaca akan paham
- **Measurability** — Ada metrik kuantitatif
- **Relevance** — Penting untuk domain
- **Testability** — Bisa gagal (falsifiable)
- **Impact** — Ada kontribusi jika terjawab

### Research vs Engineering

| Aspek | Engineering | Research |
|-------|------------|----------|
| Tujuan | Menyelesaikan masalah (*solve*) | Memahami dan membuktikan (*understand & prove*) |
| Masalah | Bug, error, fitur belum ada | Gap dalam pengetahuan |
| Scope | Selesaikan semua yang perlu | Batasi agar bisa dibuktikan |
| Output | Working system | Evidence, paper, replicable findings |

### Istilah Penting

- **Problem Statement** — Formulasi tertulis: konteks sistem + gap + dampak + justifikasi
- **System Context** — Deskripsi lengkap: input, proses, output, outcome, constraints, stakeholders
- **Problem Drift** — Masalah "bermutasi" dari pendahuluan ke metodologi karena statement awal tidak presisi
- **Solution-First Thinking** — Memulai dari solusi tanpa masalah yang jelas — berbahaya dalam riset
- **Operational Definition** — Definisi variabel yang cukup jelas agar peneliti lain bisa mengukur hal yang sama

---

## Template A.2 — Problem Statement Builder

```text
PROBLEM STATEMENT BUILDER

Domain & Konteks
  Domain   : Web Development / Software Engineering
  Konteks  : Evaluasi kinerja framework backend (Express.js, Gin) dalam menangani RESTful API.

System Context
  Input       : HTTP Request dengan variasi metode (GET, POST, dll) dan variasi beban (100 - 1 juta request).
  Process     : Pemrosesan request oleh server, parsing data, eksekusi logic framework, query database.
  Output      : HTTP Response, data JSON dengan metrik performa (Response Time, Throughput).
  Outcome     : Penentuan arsitektur framework terbaik untuk aplikasi skala kecil hingga sangat besar.
  Constraints : Spesifikasi server terbatas, karakteristik bahasa bawaan (compiled vs interpreted).
  Stakeholders: Web Developer, Software Architect, Perusahaan IT.

Fenomena → Problem
  Fenomena yang diamati         : Aplikasi web modern semakin bergantung pada arsitektur microservices dan REST API, mendorong kemunculan berbagai framework.
  Gejala (symptom) yang terukur : Sering terjadi penurunan performa drastis (bottleneck), latency tinggi, atau server crash saat trafik aplikasi mendadak melonjak.
  Masalah yang didiagnosis      : Kurangnya pemahaman berbasis bukti tentang arsitektur dan karakteristik performa spesifik setiap framework di bawah beban kerja riil skala besar.
  Masalah riset (researchable)  : Bagaimana perbandingan tingkat efisiensi dan performa (Response Time, Throughput, CPU, dan Memory Usage) antara framework backend modern saat menangani beban REST API pada berbagai skala data?
  Variabel yang terukur         : Jenis Framework, Skala Data (Beban Request), Response Time (ms), Throughput (req/s), CPU Usage (%), dan Memory Usage (%).

Problem Quality Check
  [x] Clarity      — Apakah satu orang membaca akan paham?
  [x] Measurability — Apakah ada metrik kuantitatif?
  [x] Relevance    — Apakah penting untuk domain?
  [x] Testability  — Apakah bisa gagal?
  [x] Impact       — Apakah ada kontribusi jika terjawab?

Problem Statement :
  Perkembangan aplikasi web modern sangat bergantung pada performa dan stabilitas RESTful API. Saat ini, banyak web developer yang memilih backend framework (seperti Express.js atau Gin) hanya berdasarkan tren bahasa pemrograman atau kemudahan penulisan kode, tanpa mempertimbangkan batas performanya secara empiris. Masalah riset yang muncul adalah belum adanya panduan komparatif empiris tentang bagaimana perilaku performa kedua framework tersebut ketika menangani lonjakan beban trafik nyata dari skala kecil hingga sangat besar (hingga 1 juta request). Oleh karena itu, diperlukan penelitian yang mengevaluasi secara komprehensif performa framework tersebut berdasarkan metrik Response Time, Throughput, serta penggunaan CPU dan Memory. Penelitian ini penting agar developer dan software architect dapat mengambil keputusan infrastruktur backend secara tepat (evidence-based) untuk mencegah bottleneck dan crash pada aplikasi skala besar.
```

---

## Latihan 1 — Dari Topik ke Masalah Riset

Pilih satu topik di bidang TI yang diminati. Transformasikan melalui 5 tahap Problem Formation Model.

**Topik awal:** *Evaluasi Perbandingan Kinerja Framework Backend REST API pada Berbagai Skala Beban Data.*

| Tahap | Hasil |
|-------|-------|
| Reality | *Saat ini banyak perusahaan mulai beralih dari arsitektur monolith ke microservices menggunakan REST API dengan berbagai bahasa pemrograman.* |
| Observed Issue (Symptom) | *Banyak aplikasi mengalami kelambatan respon atau bahkan error saat menghadapi lonjakan pengunjung, meskipun kode logic-nya tidak bermasalah.* |
| Diagnosed Problem (Root Cause) | *Pemilihan framework backend tidak didasari oleh analisis kecocokan antara karakteristik beban (load) aplikasi dan arsitektur pemrosesan framework.* |
| Researchable Problem | *Bagaimana perbandingan efisiensi metrik performa (Response Time, Throughput, dan Resource Usage) pada 2 framework backend berbeda saat menangani rentang beban mulai dari ratusan hingga jutaan request?* |
| Measurable Variable | *Jenis framework (Express.js, Gin), Jumlah Data/Request, Response Time (ms), CPU Usage (%), Memory Usage (%).* |

**Apakah terjebak solution-first thinking?** [ ] Ya / [x] Tidak
> Rumusan masalah tidak memaksakan satu framework tertentu (misal: "Mengapa Gin terbaik"), melainkan menanyakan perbandingan untuk mengetahui kondisi ideal masing-masing framework.

---

## Latihan 2 — System Context Decomposition

Gambarkan konteks sistem dari masalah riset di Latihan 1.

| Komponen | Deskripsi |
|----------|----------|
| Input | *Ribuan hingga jutaan HTTP Request dummy (GET, POST, PUT, DELETE) yang dikirim oleh alat pengujian (seperti JMeter atau K6) menuju endpoint API.* |
| Process | *API framework menerima request, mengeksekusi routing, menjalankan query ke PostgreSQL, memproses data ke dalam format JSON, dan mengembalikannya ke klien.* |
| Output | *Nilai kuantitatif Response Time, Throughput, Error Rate, serta log beban CPU dan RAM server selama proses pemrosesan.* |
| Outcome | *Terciptanya panduan berbasis bukti bagi pengembang software untuk memilih teknologi backend yang paling tahan banting.* |
| Constraints | *Pengujian dilakukan dalam batasan environment server lokal/VM yang sama (CPU dan RAM tetap) sehingga bisa dipengaruhi resource internal mesin.* |
| Stakeholders | *Backend Developer, System Administrator, Software Architect, dan pelaku industri TI.* |

**Komponen mana yang paling relevan dengan masalah riset?** Process (Cara framework menangani routing/koneksi) dan Output (Metrik Kinerja).

---

## Latihan 3 — Problem Quality Check

Evaluasi problem statement yang sudah dibuat menggunakan 5 kriteria.

| Kriteria | Skor (1-5) | Justifikasi |
|----------|-----------|-------------|
| Clarity | *5* | *Masalah sangat jelas: ingin mengetahui framework mana yang paling cepat dan stabil untuk API.* |
| Measurability | *5* | *Metrik evaluasi sangat rigid (Response Time, Throughput, Persentase CPU/Memori).* |
| Relevance | *5* | *Isu krusial di dunia kerja profesional, dimana biaya server dan kecepatan aplikasi adalah metrik bisnis utama.* |
| Testability | *5* | *Hipotesis dapat langsung diuji melalui tools Load Testing standar (K6/JMeter).* |
| Impact | *5* | *Mencegah perusahaan membuang anggaran (cost) server yang tidak perlu akibat salah memilih stack teknologi.* |

**Skor total:** 25 / 25

**Problem statement versi final (1 paragraf):**
> Perkembangan aplikasi web modern sangat bergantung pada performa dan stabilitas RESTful API. Saat ini, banyak web developer yang memilih backend framework (seperti Express.js atau Gin) hanya berdasarkan tren bahasa pemrograman atau kemudahan penulisan kode, tanpa mempertimbangkan batas performanya secara empiris. Masalah riset yang muncul adalah belum adanya panduan komparatif empiris tentang bagaimana perilaku performa kedua framework tersebut ketika menangani lonjakan beban trafik nyata dari skala kecil hingga sangat besar (hingga 1 juta request). Oleh karena itu, diperlukan penelitian yang mengevaluasi secara komprehensif performa framework tersebut berdasarkan metrik Response Time, Throughput, serta penggunaan CPU dan Memory. Penelitian ini penting agar developer dan software architect dapat mengambil keputusan infrastruktur backend secara tepat (evidence-based) untuk mencegah bottleneck dan crash pada aplikasi skala besar.

---

## Refleksi

> Bandingkan "masalah" yang biasa ditemui saat coding (bug, error) dengan masalah riset. Apa perbedaan fundamental dalam cara mendefinisikan dan mendekati keduanya?

**Jawaban:**
> Masalah saat coding (bug) bersifat deterministik dan taktis: framework mengeluarkan error "Timeout" saat query database, kita cari penyebab di kode, lalu diperbaiki agar jalan.
> Masalah riset bersifat metodologis dan strategis: alih-alih hanya memperbaiki timeout, kita bertanya "Mengapa di beban 1 juta request, framework X mengalami timeout sementara framework Y tidak? Apa perbedaan konsumsi resource-nya?" Ini menuntut pengujian perbandingan, pengumpulan metrik, dan validasi statistik, bukan sekadar perbaikan kode sementara.