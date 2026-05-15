# WS-04: Research Question & Hypothesis

> **Bab 4 — Research Question, Contribution & Hypothesis**

---

## Ringkasan Materi

### RQ Bukan Pertanyaan Biasa

Research Question yang baik secara implisit mengandung cetak biru eksperimen: subjek, baseline, metrik, domain, dataset.

| Kualitas | Contoh |
|----------|--------|
| **Buruk** | "Bagaimana pengaruh deep learning terhadap deteksi malware?" |
| **Baik** | "Apakah CNN menghasilkan F1-Score lebih tinggi dari RF pada CIC-MalMem-2022?" |

Perbedaan: RQ yang baik menyebutkan **metode spesifik**, **metrik terukur**, **baseline**, dan **dataset**.

### Tiga Jenis RQ

| Jenis | Pola | Kebutuhan |
|-------|------|-----------|
| **Comparison** | A vs B → mana lebih baik? | ≥ 2 metode, metrik sama |
| **Improvement** | A' vs A → modifikasi lebih baik? | Pre/post, bukti perbaikan |
| **Exploratory** | Faktor X₁...Xₙ → pengaruh terhadap Y? | Multi-variabel, korelasi/regresi |

### Contribution Statement

Tiga jenis kontribusi: **Improvement** (metode terbukti lebih baik), **Comparison** (perbandingan sistematis yang belum ada), **Novel Approach** (pendekatan baru). Kontribusi harus terhubung langsung dengan gap — kontribusi tanpa gap = klaim tanpa justifikasi.

### Hypothesis H₀ / H₁

- **H₀** (Null) = Tidak ada perbedaan signifikan — asumsi default, harus dibuktikan salah
- **H₁** (Alternative) = Ada perbedaan signifikan — diterima hanya jika H₀ ditolak
- Harus **falsifiable**, mengandung **metrik terukur**, dirumuskan **SEBELUM eksperimen**

### Rantai Operasionalisasi

```
RQ → Variable → Metric → Data → Analysis
```

Jika rantai ini tidak lengkap, RQ belum mature. Bi-directional: RQ yang tidak bisa jadi hipotesis testable harus direvisi mundur.

### Research vs Engineering

| Aspek | Engineering | Research |
|-------|------------|----------|
| Tujuan pertanyaan | Apa yang harus dibangun? | Apa yang harus dibuktikan? |
| Bentuk jawaban | Sistem yang berfungsi | Bukti empiris terukur |
| Sukses diukur oleh | User satisfaction, uptime | Signifikansi statistik, effect size |
| Jika gagal | Debug dan perbaiki | Laporkan, analisis mengapa |

### Istilah Penting

- **Research Question (RQ)** — Pertanyaan spesifik: variabel terukur + metrik + konteks
- **Contribution Statement** — Apa yang diketahui setelah riset selesai yang sebelumnya belum ada
- **H₀ / H₁** — Null vs Alternative Hypothesis
- **Falsifiability** — Kondisi hipotesis ditolak harus bisa didefinisikan sebelum eksperimen
- **Operationalization** — Proses mewujudkan konsep abstrak menjadi variabel terukur

---

## Template A.4 — RQ-Contribution-Hypothesis

```text
RQ-CONTRIBUTION-HYPOTHESIS

Gap Statement  : Kekosongan konsensus mengenai performa ekstrem komparatif dari kelima framework backend (Express, Laravel, Flask, Spring, Gin) saat dihadapkan pada pengujian dengan beban skala masif hingga jutaan request, untuk melihat breaking point CPU dan Memory secara nyata.

Research Question:
  Tipe         : [x] Comparison  [ ] Improvement  [ ] Exploratory
  Formulasi    : Apakah terdapat perbedaan yang signifikan pada metrik Response Time, Throughput, CPU Usage, dan Memory Usage antara framework backend modern (Express.js, Laravel FrankenPHP, Flask, Spring Boot, Gin) ketika menangani beban RESTful API dari skala ratusan hingga satu juta data?
  Variabel IV  : Jenis Framework Backend (Express.js, Laravel, Flask, Spring Boot, Gin) dan Skala Beban Data (Load).
  Variabel DV  : Kinerja Server/API.
  Metrik       : Response Time (ms), Throughput (req/s), CPU Usage (%), dan Memory Usage (MB/%).
  Dataset      : Data tabel KRS berjumlah hingga 1.000.000 record dari PostgreSQL.
  Baseline     : Laravel dan Express.js (Sebagai representasi dari PHP dan Node.js).

Quality Check RQ:
  [x] Variabel spesifik
  [x] Metrik jelas
  [x] Baseline ada
  [x] Konteks disebutkan
  [x] Memerlukan eksperimen (bukan hanya survei literatur)

Contribution Statement:
  Apa yang baru diketahui : Bukti empiris perbandingan ketahanan dan batas skalabilitas resource kelima framework modern tersebut ketika digempur oleh beban request ekstrem di lingkungan produksi.
  Jenis kontribusi        : [ ] Improvement  [x] Comparison  [ ] Novel approach
  Gap yang diisi          : Performance & Data Gap — menyajikan benchmark dengan skala dataset yang jauh lebih masif (hingga 1 juta baris data) daripada literatur sebelumnya.

Hypothesis Pair:
  H₀ : Tidak ada perbedaan signifikan pada metrik Response Time, Throughput, maupun Resource Usage di antara kelima framework backend dalam memproses permintaan API pada semua skala beban data.
  H₁ : Terdapat framework tertentu (seperti Spring Boot atau Gin) yang menghasilkan Throughput secara signifikan lebih tinggi dan stabilitas Resource Usage yang lebih baik dibandingkan framework lainnya saat beban trafik mencapai 1.000.000 data.
  Threshold              : Terdapat perbedaan Throughput > 20% dan p-value < 0.05 (signifikansi statistik).
  Justifikasi threshold  : Perbedaan throughput sebesar 20% memiliki arti yang sangat besar bagi penghematan cost server secara vertikal (hardware scaling) pada sebuah perusahaan.
```

---

## Latihan 1 — Dari Gap ke RQ

Gunakan gap yang ditemukan di WS-03. Transformasikan menjadi Research Question.

**Gap dari WS-03:** *Kekosongan konsensus mengenai performa ekstrem komparatif dari kelima framework backend (Express, Laravel, Flask, Spring, Gin) saat dihadapkan pada pengujian dengan beban skala masif hingga jutaan request, untuk melihat breaking point CPU dan Memory secara nyata.*

**RQ versi pertama (tulis bebas):**
> *Framework backend apa yang paling cepat dan bagus saat diakses oleh banyak user sekaligus?*

**Evaluasi RQ:**

| Komponen | Ada? | Isi |
|----------|------|-----|
| Metode spesifik | *Tidak* | *Masih terlalu umum, tidak menyebut framework apa saja.* |
| Metrik terukur | *Tidak* | *"Cepat dan bagus" itu tidak terukur.* |
| Baseline | *Tidak* | *Tidak ada metode standar pembanding.* |
| Dataset/konteks | *Tidak* | *Hanya menyebut "banyak user".* |

**Tipe RQ:** [x] Comparison / [ ] Improvement / [ ] Exploratory

**RQ versi revisi (setelah evaluasi):**
> *Apakah kerangka kerja (framework) Spring Boot dan Gin menghasilkan Throughput (req/s) dan stabilitas Response Time (ms) yang secara signifikan lebih tinggi dibandingkan dengan Express.js dan Laravel ketika menangani beban REST API dengan dataset KRS mencapai 1.000.000 record?*

---

## Latihan 2 — Hypothesis Pair

Rumuskan pasangan hipotesis dari RQ di Latihan 1.

| Komponen | Isi |
|----------|-----|
| H₀ | *Tidak ada perbedaan yang signifikan pada metrik Throughput (req/s) dan Response Time (ms) antara framework Spring Boot, Gin, Express.js, dan Laravel saat menangani beban API dengan dataset mencapai 1.000.000 record.* |
| H₁ | *Framework _compiled_ seperti Spring Boot dan Gin menghasilkan metrik Throughput (req/s) yang secara signifikan lebih tinggi dan Response Time yang lebih rendah dibandingkan framework _interpreted_ (Express.js dan Laravel) pada beban dataset 1.000.000 record.* |
| Metrik | *Throughput (req/s) dan Response Time (ms).* |
| Threshold | *Selisih rata-rata throughput > 10% dan didukung oleh p-value < 0.05 melalui Uji Statistik T-Test / ANOVA.* |
| Justifikasi threshold | *Di dunia rekayasa perangkat lunak, margin kinerja sebesar 10% pada beban jutaan request bisa berarti menghindari ribuan status HTTP 500/Timeout yang berimbas pada kerugian bisnis.* |

**Apakah hipotesis ini falsifiable?** [x] Ya / [ ] Tidak
> Bagaimana cara membuktikannya salah? *Dengan melakukan load testing K6. Jika pada log eksperimen ternyata Express.js menghasilkan Throughput yang lebih tinggi atau sama dengan Spring Boot, maka H₀ gagal ditolak dan H₁ dianggap salah/falsified.*

---

## Latihan 3 — Rantai Operasionalisasi

Lengkapi rantai dari RQ hingga metode analisis.

| Tahap | Isi |
|-------|-----|
| RQ | *Apakah Spring Boot/Gin menghasilkan Throughput yang lebih baik dari Laravel/Express pada beban besar?* |
| Variable (IV) | *Jenis Framework Backend (Spring, Gin, Laravel, Express) dan Beban Request.* |
| Variable (DV) | *Performa Web Server (Kinerja Eksekusi).* |
| Metric | *Throughput (req/s), Response Time (ms), CPU Usage (%).* |
| Data source | *File hasil log dari K6 Load Testing dan telemetri Node_exporter/Prometheus (di-export dari Grafana).* |
| Analysis method | *Analisis deskriptif berupa komparasi nilai rata-rata tiap metrik, divisualisasikan dengan Line Chart / Bar Chart, serta dievaluasi melalui uji ANOVA.* |

**Apakah rantai lengkap?** [x] Ya / [ ] Tidak
> Jika tidak, tahap mana yang perlu direvisi? *Sudah lengkap dan operasional.*

---

## Refleksi

> Ambil satu judul skripsi/paper yang pernah dibaca. Coba ekstrak RQ-nya. Apakah RQ tersebut memenuhi semua komponen (metode, metrik, baseline, konteks)? Jika tidak, apa yang hilang?

**Judul:** *Analisa Perbandingan Kinerja Rest Api Dengan Framework Flask, Laravel, Dan Express Js*
**RQ yang diekstrak:** *Bagaimana perbandingan response time antara Flask, Laravel, dan Express.js?*
**Komponen yang hilang:** *Tidak mencantumkan Konteks Dataset (berapa besaran data yang diuji), dan Metrik hanya dibatasi pada Response Time saja tanpa menyertakan Throughput atau konsumsi Resource RAM/CPU secara eksplisit dalam pertanyaannya.*
