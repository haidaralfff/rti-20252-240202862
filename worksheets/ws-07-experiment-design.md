# WS-07: Experimental Design & Validity

> **Bab 7 — Experimental Design & Validity**

---

## Ringkasan Materi

### Correlation ≠ Causality

Kausalitas membutuhkan 3 syarat:
1. **Covariance** — X dan Y bergerak bersama
2. **Temporal precedence** — X berubah sebelum Y
3. **Elimination of alternatives** — Tidak ada faktor lain yang menjelaskan Y

Controlled experiment adalah satu-satunya metode yang bisa membuktikan kausalitas.

### Empat Jenis Validitas

| Jenis | Pertanyaan | Ancaman Umum |
|-------|-----------|-------------|
| **Internal** | Apakah hubungan IV→DV nyata? | Confounding variable, selection bias |
| **External** | Apakah bisa digeneralisasi? | Dataset terlalu spesifik |
| **Construct** | Apakah mengukur konsep yang benar? | Metrik tidak sesuai |
| **Conclusion** | Apakah kesimpulan statistik valid? | Sample size kecil, uji salah |

Internal dan external validity sering berkonflik: semakin terkontrol (internal kuat) → semakin artificial (external lemah).

### Tiga Tipe Eksperimen dalam Riset TI

| Tipe | Deskripsi | Kapan Digunakan |
|------|----------|----------------|
| **Comparison Study** | Metode A vs B pada kondisi identik | Membandingkan pendekatan berbeda |
| **Ablation Study** | Full system → lepas komponen satu per satu | Mengukur kontribusi tiap komponen |
| **Parameter Study** | Variasikan satu parameter, amati dampak | Uji sensitifitas/robustness |

### Fairness dalam Perbandingan

Perbandingan yang adil = **kondisi identik** untuk semua metode: dataset sama, preprocessing sama, tuning effort sebanding, environment sama, metrik sama.

Contoh tidak adil: Transformer (30 fitur tambahan + Bayesian optimization) vs RF (default params) → hasilnya misleading.

### Threats to Validity = Diidentifikasi Sebelum Eksperimen

Ancaman validitas harus diidentifikasi **sebelum** eksperimen dan mitigasinya dirancang sebagai bagian dari desain — bukan ditulis sebagai boilerplate setelah selesai.

### Research vs Engineering

| Aspek | Engineering | Research |
|-------|------------|----------|
| Tujuan testing | Memastikan sistem memenuhi requirement | Membuktikan hubungan kausal antar variabel |
| Baseline | Versi sebelumnya (last release) | Metode tervalidasi dari literatur |
| Kegagalan | Bug → fix → release | H₀ tidak ditolak → tetap kontribusi ilmiah |
| Sukses | 100% test pass | Evidence valid — mendukung atau menolak hipotesis |

### Istilah Penting

- **Causality** — Hubungan sebab-akibat (covariance + temporal + elimination)
- **Controlled Experiment** — Ubah satu variabel, kontrol sisanya, amati efek
- **Fairness** — Semua metode diuji pada kondisi yang benar-benar identik
- **Threats to Validity** — Faktor yang bisa melemahkan kesimpulan jika tidak dimitigasi
- **Conclusion Validity** — Validitas statistik: power, sample size, uji yang tepat

---

## Template A.7 — Desain Eksperimen Lengkap

```text
EXPERIMENT DESIGN

Research Question : Apakah terdapat perbedaan yang signifikan pada metrik Response Time, Throughput, CPU Usage, dan Memory Usage antara framework backend modern (Express.js dan Gin) ketika menangani beban RESTful API dari skala ratusan hingga satu juta data?
Hypothesis        : Gin (framework _compiled_) akan menghasilkan Throughput (req/s) yang secara signifikan lebih tinggi dan stabilitas Resource Usage yang lebih baik dibandingkan Express.js (framework _interpreted_) pada beban request skala besar (1 juta data).
Tipe Eksperimen   : [x] Comparison  [ ] Ablation  [ ] Parameter

Kondisi Eksperimen:
| Kondisi | Deskripsi | IV Value | CV Settings |
|---------|-----------|----------|-------------|
| Control | Eksekusi framework _interpreted_ yang menjadi standar industri Node.js | Express.js | Load uji 1juta data, 20 vUser, PostgreSQL sama, VM sama |
| Treatment | Eksekusi framework _compiled_ / high-performance backend | Gin | Load uji 1juta data, 20 vUser, PostgreSQL sama, VM sama |

Fairness Checklist:
  [x] Dataset identik untuk semua kondisi
  [x] Preprocessing setara
  [x] Tuning effort setara
  [x] Environment identik
  [x] Metrik evaluasi sama

Threat Analysis:
| Threat Type | Ancaman Spesifik | Mitigasi |
|-------------|-----------------|----------|
| Internal    | Perebutan resource CPU saat _tools_ load tester (K6) berjalan di mesin yang sama dengan aplikasi. | K6 dijalankan di *virtual machine* terpisah atau diisolasi menggunakan *Docker limits* (Control Group). |
| External    | Beban data KRS 1 juta hanya mewakili operasi GET/POST sederhana tanpa *computation logic* yang berat. | Batasi klaim hanya untuk aplikasi jenis "Data-Intensive API" (seperti katalog), bukan "Compute-Intensive API" (seperti AI Inference). |
| Construct   | Throughput tinggi terjadi hanya karena banyak request yang menghasilkan error/timeout (HTTP 500). | Tolak (abort) eksekusi dan laporkan error rate; hanya request sukses (HTTP 200) yang dihitung sebagai Throughput. |
| Conclusion  | Selisih 10 req/s dianggap menang, padahal itu sekadar fluktuasi normal jaringan. | Lakukan pengujian diulangi sebanyak n-kali (contoh: 5 run per beban), lalu uji Two-Way ANOVA untuk menentukan signifikansi perbedaan rata-rata. |

Statistical Plan:
  Uji statistik   : Two-Way ANOVA (2 Framework × 5 Skala Data) dengan post-hoc Paired t-test
  Justifikasi     : Mengukur efek utama jenis framework (Express.js vs Gin) dan skala beban data (100 hingga 1 juta request) serta interaksinya terhadap metrik DV.
  Alpha           : 0.05
  Effect size min : Cohen's d > 0.5 (Medium Effect)
```

---

## Latihan 1 — Desain Eksperimen

Susun desain eksperimen berdasarkan RQ, variabel, dan sistem dari WS-04 sampai WS-06.

**RQ:** *Apakah kerangka kerja (framework) Gin menghasilkan Throughput (req/s) dan stabilitas Response Time (ms) yang secara signifikan lebih tinggi dibandingkan dengan Express.js ketika menangani beban REST API dengan dataset KRS mencapai 1.000.000 record?*
**Tipe eksperimen:** [x] Comparison / [ ] Ablation / [ ] Parameter

| Kondisi | Deskripsi | IV Value | CV Settings |
|---------|-----------|----------|-------------|
| Control | *Framework _interpreted_ konvensional yang menjadi standar defacto industri (baseline)* | *Express.js* | *OS Ubuntu 24.04 WSL, 20 Virtual Users, 10 Menit, PostgreSQL Database 1jt Baris KRS* |
| Treatment | *Framework _compiled_ & modern web server untuk komputasi _high throughput_* | *Gin* | *OS Ubuntu 24.04 WSL, 20 Virtual Users, 10 Menit, PostgreSQL Database 1jt Baris KRS* |

---

## Latihan 2 — Fairness Checklist

Evaluasi apakah desain eksperimen di Latihan 1 sudah fair.

| Kriteria | Status | Detail |
|----------|--------|--------|
| Dataset identik | *✅* | *Kedua framework di-koneksikan ke skema database PostgreSQL lokal yang sama persis (tabel KRS).* |
| Preprocessing setara | *✅* | *Kedua framework tidak menggunakan validasi tambahan yang tidak perlu; murni membaca JSON body dan routing ke database.* |
| Tuning effort setara | *✅* | *Setiap framework diaktifkan pada mode *Production* terbaik bawaannya tanpa ada optimasi rahasia (seperti caching eksternal).* |
| Environment identik | *✅* | *Dieksekusi satu per satu pada mesin dengan spesifikasi sama (8GB RAM, 20 Core CPU virtual WSL).* |
| Metrik evaluasi sama | *✅* | *Semuanya dicatat oleh satu tool penguji independen yaitu K6.* |

**Ada yang tidak fair?** [ ] Ya / [x] Tidak
> Jika ya, bagaimana cara memperbaikinya? *Desain ini sudah cukup adil secara makro. Membandingkan bahasa yang secara bawaan cepat (Go) dengan yang relatif lebih lambat (JavaScript) adalah inti dari penelitian komparatif ini untuk menakar batas kemampuannya secara nyata.*

---

## Latihan 3 — Threat Analysis

Identifikasi ancaman validitas untuk desain eksperimen ini.

| Threat Type | Ancaman Spesifik | Mitigasi |
|-------------|-----------------|----------|
| Internal | *Data leakage / Connection Pool exhaustion: framework dengan pengelolaan pool buruk bisa mematikan database postgres sehingga sisa tes gagal beruntun.* | *Restart service PostgreSQL dan berikan jeda waktu (cooling-down) selama 2 menit antara setiap eksekusi framework.* |
| External | *Pengujian pada WSL (Windows Subsystem for Linux) memiliki overhead disk I/O yang berbeda dengan OS Linux Native bare-metal.* | *Beri *disclaimer* batasan validitas eksternal di dalam artikel ilmiah bahwa hasil bisa sedikit bervariasi jika di-deploy di cloud Kubernetes/Bare metal.* |
| Construct | *Satu framework mungkin mencatat Throughput luar biasa besar padahal ia membuang data (menjawab *error* secara cepat/gagal baca database).* | *Atur skrip K6 agar memantau "status === 200". Jika HTTP 500 melonjak, throughput tinggi tersebut dinyatakan tidak sah.* |
| Conclusion | *Mengambil kesimpulan dari hasil 1 kali running saja sangat rentan distorsi spike OS.* | *Catat hasil K6 dalam persentil p90 dan p95 ketimbang sekadar *average*, dan ulangi eksperimen minimal 3x run.* |

**Ancaman mana yang paling sulit dimitigasi?** *Internal Validity (Pengelolaan Resource di Mesin yang Sama / WSL).*
**Mengapa?**
> *Karena OS lokal seperti Windows dengan WSL2 memiliki mekanisme *memory management* (vmmem) yang dinamis. Jika framework Gin mengalokasikan RAM yang sangat besar dan tidak membebaskannya secara cepat, saat pengujian Express.js di menit berikutnya OS mungkin masih melakukan *swapping* RAM. Ini menyebabkan Express.js lambat bukan karena performanya, tapi karena "dikorbankan" oleh sampah memori dari eksperimen sebelumnya. Mitigasi total hanya bisa dicapai di infrastruktur cloud fisik yang dibersihkan/re-provision tiap kali uji.*

---

## Refleksi

> Sebuah paper melaporkan "metode kami mengalahkan semua baseline." Apa 3 pertanyaan pertama yang harus diajukan untuk mengevaluasi klaim ini?

**Jawaban:**
1. *Apakah beban eksperimennya (jumlah virtual user, jumlah data row) benar-benar sama dan cukup besar untuk membuktikan kestabilan secara riil, atau hanya data kecil sintetis?*
2. *Apakah ada "perlakuan khusus" di metode baru (misalnya optimasi *caching* tingkat server, penulisan *raw query*) sementara framework *baseline* dibiarkan dengan ORM berat (tidak *apples-to-apples*)?*
3. *Apakah kemenangan throughput/response time tersebut diiringi konsumsi RAM/CPU yang wajar, dan apakah peningkatan tersebut signifikan secara statistik, bukan sekadar margin error jaringan?*
