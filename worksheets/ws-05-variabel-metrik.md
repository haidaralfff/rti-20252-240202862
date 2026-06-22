# WS-05: Variabel & Metrik

> **Bab 5 — Metric, Measurement & Data**

---

## Ringkasan Materi

### Measurement Alignment Model

Setiap pengukuran yang valid harus bisa ditelusuri melalui rantai ini tanpa lompatan logis:

```
Problem → Concept → Variable → Metric → Data → Result
```

### Operationalization = Keputusan Desain

Menerjemahkan konsep abstrak menjadi variabel terukur bukan proses mekanis. "Code quality" yang diukur via SonarQube code smells membawa asumsi implisit. Setiap operasionalisasi harus didokumentasikan dan dijustifikasi.

### Empat Tipe Data (NOIR)

| Tipe | Ciri | Contoh | Operasi Valid |
|------|------|--------|---------------|
| **Nominal** | Kategori, tanpa urutan | Jenis algoritma (RF, SVM, CNN) | Modus, chi-square |
| **Ordinal** | Urutan, interval tidak sama | Skala Likert (1-5) | Median, Spearman |
| **Interval** | Jarak bermakna, tanpa nol absolut | Suhu Celsius | Mean, Pearson, t-test |
| **Ratio** | Jarak bermakna + nol absolut | Waktu eksekusi (ms) | Semua operasi |

Tipe data menentukan uji statistik yang valid. Kebanyakan metrik performa TI = ratio; persepsi pengguna = ordinal.

### Kriteria Pemilihan Metrik

- **Representative** — Mewakili konsep yang diteliti
- **Sensitive** — Cukup peka menangkap perbedaan bermakna (hindari ceiling effect)
- **Feasible** — Bisa dikumpulkan dalam batasan waktu dan biaya

### Pre-registration

Metrik harus ditentukan **sebelum** eksperimen. Memilih metrik setelah melihat data = **p-hacking**. Metrik tambahan yang ditemukan kemudian dilaporkan sebagai *exploratory*, bukan *confirmatory*.

### Primary vs Secondary Metric

- **Primary Metric** — Langsung terikat ke hipotesis, menentukan kesimpulan
- **Secondary Metric** — Pendukung, dilaporkan di samping primary; statusnya suplementer

### Research vs Engineering

| Aspek | Engineering | Research |
|-------|------------|----------|
| Pemilihan metrik | Berdasarkan kebiasaan/tool yang ada | Berdasarkan construct validity |
| Anomali | Dihapus untuk laporan bersih | Diinvestigasi — bisa jadi temuan |
| Kapan dipilih | Setelah sistem jadi (monitoring) | Sebelum eksperimen (by design) |

### Istilah Penting

- **Operationalization** — Transformasi konsep abstrak menjadi variabel terukur
- **Construct Validity** — Sejauh mana pengukuran benar-benar mengukur konsep yang dimaksud
- **Measurement Scale** — Klasifikasi data (NOIR) yang menentukan analisis valid
- **Multi-metric Evaluation** — Menggunakan beberapa metrik untuk menangkap konsep kompleks

---

## Template A.5 — Definisi Variabel, Metrik & Justifikasi

```text
VARIABLE & METRIC DEFINITION

Research Question: Apakah terdapat perbedaan yang signifikan pada metrik Response Time, Throughput, CPU Usage, dan Memory Usage antara framework backend modern (Express.js dan Gin) ketika menangani beban RESTful API dari skala ratusan hingga satu juta data?

| Variabel | Tipe | Konsep | Metrik | Skala | Satuan | Cara Mengukur | Justifikasi |
|----------|------|--------|--------|-------|--------|---------------|-------------|
| Jenis Framework | IV | Teknologi Backend / Engine | Kategori (Express.js, Gin) | Nominal | — | Dinyalakan/dimatikan sesuai jadwal pengujian | Subjek utama komparasi |
| Skala Data | IV | Beban Request Sistem | Kategori Jumlah Data (100, 1k, 10k, 100k, 1jt) | Ratio | Entri (baris) | Setting pada script parameter K6 | Untuk melihat degradasi performa |
| Kecepatan | DV | Responsivitas Server | Response Time | Ratio | Milidetik (ms) | Log output K6 Dashboard | Metrik utama interaksi end-user |
| Kestabilan Beban | DV | Kapasitas Server / Volume | Throughput | Ratio | Req/s | Jumlah total req dibagi waktu (K6) | Metrik utama skalabilitas |
| Konsumsi CPU | DV | Beban Komputasi Prosesor | Persentase Pemakaian CPU | Ratio | Persen (%) | Dashboard Prometheus/Grafana | Indikasi efisiensi komputasi framework |
| Konsumsi Memori | DV | Alokasi RAM Server | Pemakaian Memori | Ratio | MB | Dashboard Prometheus/Grafana | Indikasi potensi *memory leak* |

Alignment Check:
  RQ → Concept → Variable → Metric → Data → Result
  [x] Setiap langkah terdokumentasi
  [x] Tidak ada "lompatan logis"
  [x] Metrik mengukur apa yang dimaksud (construct validity)
```

---

## Latihan 1 — Operationalization Chain

Gunakan RQ dari WS-04. Definisikan variabel dan metriknya.

**RQ:** *Apakah kerangka kerja (framework) Gin menghasilkan Throughput (req/s) dan stabilitas Response Time (ms) yang secara signifikan lebih tinggi dibandingkan dengan Express.js ketika menangani beban REST API dengan dataset KRS mencapai 1.000.000 record?*

| Variabel | Tipe | Konsep Abstrak | Metrik Konkret | Skala (NOIR) | Satuan |
|----------|------|---------------|----------------|-------------|--------|
| *Jenis Framework* | *IV* | *Teknologi pemrosesan server backend* | *Kategori: Express.js, Gin* | *Nominal* | *—* |
| *Beban Load* | *IV* | *Intensitas trafik dari pengguna aplikasi* | *Jumlah hit query data ke server* | *Ratio* | *Angka Data (100 - 1 Juta)* |
| *Kapasitas Volume* | *DV* | *Kemampuan menangani banyak antrean* | *Throughput (req/s)* | *Ratio* | *Req/s* |
| *Responsivitas* | *DV* | *Waktu tunggu user* | *Response Time Rata-rata* | *Ratio* | *ms* |
| *Lingkungan OS* | *CV* | *Kapasitas hardware dan sistem operasi* | *Penggunaan versi Kernel Linux dan Spesifikasi CPU/RAM yang konstan* | *Nominal* | *—* |

**Apakah ada lompatan logis dalam rantai?** [ ] Ya / [x] Tidak
> Jika ya, di mana? *Tidak ada. Semua konsep seperti "Kapasitas Volume" telah diturunkan menjadi angka pasti yaitu Throughput yang sangat objektif.*

---

## Latihan 2 — Evaluasi Metrik

Evaluasi metrik DV yang dipilih di Latihan 1 menggunakan 3 kriteria.

| Kriteria | Skor (1-5) | Justifikasi |
|----------|-----------|-------------|
| Representative | *5* | *Throughput dan Response Time merupakan ukuran standar emas (gold standard) di industri TI untuk menakar kualitas API server.* |
| Sensitive | *5* | *Dalam rentang milidetik, bahkan perbedaan efisiensi algoritma router pada framework akan terlihat sangat jelas.* |
| Feasible | *5* | *Sangat mudah diambil karena program seperti K6/JMeter dan Grafana secara *out-of-the-box* menyediakan export data ini tanpa coding manual.* |

**Apakah perlu secondary metric?** [x] Ya / [ ] Tidak
> Jika ya, apa dan mengapa? *Ya, CPU Usage dan Memory Usage. Jika kita hanya melihat Throughput tinggi, kita tidak akan tahu apakah itu dibayar dengan menguras memori server secara rakus (inefisien).*

**Contoh kasus ceiling effect untuk metrik ini:**
> *Jika server yang digunakan sangat kuat (misal server fisik 64-core dengan RAM 256GB), maka saat diuji dengan data hanya 1.000 record, SEMUA framework akan mencatatkan Response Time ~1 ms. Pengujian kehilangan sensitivitasnya karena semua teknologi menabrak "ceiling" kecepatan I/O mesin, sehingga tidak ada bedanya.*

---

## Latihan 3 — Data Quality Check

Bayangkan data yang akan dikumpulkan dari eksperimen. Evaluasi 4 dimensi kualitas data.

| Dimensi | Pertanyaan | Jawaban | Strategi Mitigasi |
|---------|-----------|---------|------------------|
| Completeness | *Apakah semua data point terkumpul?* | *Mungkin terjadi data telemetri Prometheus hilang saat server Crash.* | *Pastikan metrik error_rate K6 dicatat sehingga kita tahu persis di detik ke berapa server crash.* |
| Consistency | *Apakah ada kontradiksi internal?* | *Terjadi lonjakan CPU tinggi padahal request sedikit (disebabkan oleh cronjob OS lokal).* | *Matikan *semua* aplikasi background dan Windows Update sebelum eksperimen dijalankan.* |
| Validity | *Apakah benar-benar mengukur yang dimaksud?* | *Response Time bisa jadi bias karena lamanya waktu query di Postgres, bukan karena eksekusi kode framework.* | *Pisahkan dan catat waktu eksekusi query PostgreSQL vs waktu eksekusi kode backend murni.* |
| Representativeness | *Apakah sampel mewakili populasi target?* | *Data uji yang hanya berisi HTTP GET tidak mewakili interaksi sistem kompleks (misal hashing password).* | *Tambahkan pengujian dengan *method* POST, PUT, DELETE untuk mendapatkan gambaran paripurna.* |

---

## Refleksi

> Mengapa memilih metrik setelah melihat data dianggap p-hacking? Apa bedanya dengan eksplorasi data yang sah?

**Jawaban:**
> *Misalnya kita menguji framework X. Awalnya kita ingin membuktikan Throughput-nya tinggi. Setelah diuji, ternyata Throughput-nya jeblok, tapi konsumsi RAM-nya kebetulan paling kecil. Lalu kita "mengubah target" dengan membuat paper yang menyatakan: "Framework X paling hebat dalam hal efisiensi RAM". Ini adalah p-hacking. Eksplorasi yang sah (EDA) berarti kita mendaftarkan sejak awal semua metrik (Throughput & RAM), lalu jika hasilnya jelek di satu sisi, kita laporkan apa adanya secara objektif tanpa memutarbalikkan narasi.*
