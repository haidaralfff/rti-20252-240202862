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

```
PROBLEM STATEMENT BUILDER

Domain & Konteks
  Domain   : Sistem Informasi Kesehatan berbasis Machine Learning
  Konteks  : Penerapan algoritma machine learning (KNN, CNN, Neural Network,
             dll.) untuk klasifikasi dan prediksi penyakit di rumah sakit Indonesia

System Context
  Input       : Data rekam medis pasien (hasil lab, citra X-ray/USG, riwayat
                diagnosis), dataset klinis terstruktur dan tidak terstruktur
  Process     : Preprocessing data medis, pelatihan model ML (KNN, CNN, dll.),
                evaluasi akurasi model, dan penyajian hasil prediksi/klasifikasi
  Output      : Prediksi penyakit (jantung, TB, demensia, dll.), klasifikasi
                citra medis, serta rekomendasi tindakan perawatan
  Outcome     : Diagnosis lebih cepat dan akurat, beban kerja tenaga medis
                berkurang, dan kualitas pelayanan kesehatan meningkat
  Constraints : Dataset klinis yang kecil dan tidak seragam, variasi kualitas
                citra medis, keterbatasan referensi terbaru, serta minimnya
                integrasi sistem ML ke infrastruktur rumah sakit Indonesia
  Stakeholders: Dokter dan tenaga medis, pasien, manajemen rumah sakit,
                peneliti informatika, serta pengembang sistem informasi kesehatan

Fenomena → Problem
  Fenomena yang diamati         : Adopsi machine learning di bidang kesehatan
                                  global terus meningkat untuk mendukung
                                  diagnosis otomatis berbagai penyakit
  Gejala (symptom) yang terukur : Diagnosis manual memakan waktu lama,
                                  tingkat akurasi diagnosis bervariasi antar
                                  tenaga medis, dan deteksi penyakit kronis
                                  sering terlambat
  Masalah yang didiagnosis      : Dataset klinis yang tersedia di Indonesia
                                  masih kecil dan tidak terstandarisasi, serta
                                  belum ada evaluasi komparatif metode ML
                                  yang komprehensif untuk konteks layanan
                                  kesehatan lokal
  Masalah riset (researchable)  : Belum jelas metode ML mana (KNN, CNN,
                                  Neural Network, dsb.) yang paling efektif
                                  dalam mengklasifikasi penyakit tertentu pada
                                  dataset klinis skala kecil-menengah di
                                  rumah sakit Indonesia
  Variabel yang terukur         : Akurasi (%), sensitivitas, spesifisitas, AUC,
                                  ukuran dataset, jenis algoritma ML, waktu
                                  komputasi, dan jenis penyakit yang diklasifikasi

Problem Quality Check
  [x] Clarity      — Apakah satu orang membaca akan paham?
  [x] Measurability — Apakah ada metrik kuantitatif?
  [x] Relevance    — Apakah penting untuk domain?
  [x] Testability  — Apakah bisa gagal?
  [x] Impact       — Apakah ada kontribusi jika terjawab?

Problem Statement :
  Perkembangan machine learning membuka peluang besar untuk mempercepat
  dan meningkatkan akurasi diagnosis penyakit di bidang kesehatan. Namun,
  berbagai studi yang telah dilakukan menunjukkan bahwa metode ML yang
  digunakan (KNN, CNN, Neural Network, Forward Chaining) menghasilkan
  performa berbeda-beda tergantung pada jenis penyakit, ukuran dataset,
  dan kualitas data citra medis yang digunakan. Masalah riset yang
  dirumuskan adalah belum adanya kajian komparatif yang terukur mengenai
  efektivitas berbagai algoritma machine learning dalam mengklasifikasi
  penyakit pada dataset klinis skala kecil-menengah, khususnya dalam
  konteks layanan kesehatan di Indonesia. Oleh karena itu, diperlukan
  evaluasi sistematis terhadap metode ML berdasarkan metrik akurasi,
  sensitivitas, spesifisitas, dan AUC agar rekomendasi penggunaan teknologi
  ini dapat didasarkan pada bukti yang valid dan dapat direplikasi.
```

---

## Latihan 1 — Dari Topik ke Masalah Riset

Pilih satu topik di bidang TI yang diminati. Transformasikan melalui 5 tahap Problem Formation Model.

**Topik awal:** ________________________________________

| Tahap | Hasil |
|-------|-------|
| Reality | *Rumah sakit membutuhkan diagnosis yang cepat dan akurat, tetapi banyak proses diagnosis masih bergantung pada pengalaman subjektif tenaga medis.* |
| Observed Issue (Symptom) | *Waktu diagnosis manual lama, akurasi bervariasi antar dokter, dan deteksi penyakit kronis seperti jantung, TB, dan demensia sering terlambat.* |
| Diagnosed Problem (Root Cause) |*Dataset klinis yang tersedia masih kecil dan tidak terstandarisasi; belum ada evaluasi komparatif metode ML yang komprehensif untuk konteks layanan kesehatan Indonesia.* |
| Researchable Problem |*ProblemBelum diketahui algoritma ML mana (KNN, CNN, Neural Network) yang paling efektif untuk klasifikasi penyakit tertentu pada dataset klinis skala kecil-menengah di rumah sakit Indonesia.* |
| Measurable Variable |*Akurasi (%), sensitivitas, spesifisitas, AUC model, ukuran dan jenis dataset, jenis algoritma, waktu komputasi, dan jenis penyakit yang diklasifikasi.* |

**Apakah terjebak solution-first thinking?** [ YA] Ya / [ ] Tidak
> "Belum diketahui algoritma ML mana yang paling efektif untuk klasifikasi penyakit pada dataset klinis skala kecil-menengah di Indonesia"

---

## Latihan 2 — System Context Decomposition

Gambarkan konteks sistem dari masalah riset di Latihan 1.

| Komponen | Deskripsi |
|----------|----------|
| Input | *Data rekam medis (hasil lab, citra X-ray/USG/B-mode), dataset pasien terdiagnosis (jantung, TB, MS, demensia, hati kronis), dan literatur klinis sebagai referensi pelatihan model.* |
| Process |*Preprocessing dan normalisasi data medis, pemilihan dan pelatihan algoritma ML, validasi silang model, evaluasi performa (akurasi, AUC), dan perbandingan antar metode.* |
| Output |*Preprocessing dan normalisasi data medis, pemilihan dan pelatihan algoritma ML, validasi silang model, evaluasi performa (akurasi, AUC), dan perbandingan antar metode.* |
| Outcome |*Hasil klasifikasi/prediksi penyakit, nilai akurasi dan metrik evaluasi per metode, serta rekomendasi algoritma terbaik per jenis penyakit.* |
| Constraints | |
| Stakeholders |*Waktu diagnosis lebih singkat, konsistensi hasil meningkat, tenaga medis terbantu dalam pengambilan keputusan klinis, dan potensi deteksi dini penyakit kronis.* |

**Komponen mana yang paling relevan dengan masalah riset?** Process dan Constraints

---

## Latihan 3 — Problem Quality Check

Evaluasi problem statement yang sudah dibuat menggunakan 5 kriteria.

| Kriteria | Skor (1-5) | Justifikasi |
|----------|-----------|-------------|
| Clarity | *5* |*Problem statement menyebut domain, gap komparatif antar metode ML, dan konteks spesifik (dataset skala kecil-menengah, Indonesia).* |
| Measurability |*5* |*Variabel terukur jelas: akurasi, sensitivitas, spesifisitas, AUC, ukuran dataset, jenis algoritma.* |
| Relevance |*5* |*Kebutuhan diagnosis cepat dan akurat sangat relevan bagi layanan kesehatan Indonesia yang terus berkembang.* |
| Testability |*4* |*Hipotesis dapat diuji secara empiris; namun bergantung pada ketersediaan dataset klinis yang memadai dan representatif.* |
| Impact |*5* | *Hasil riset dapat langsung menjadi panduan pemilihan algoritma ML untuk implementasi di rumah sakit.*|

**Skor total:** 24 / 25

**Problem statement versi final (1 paragraf):**
> Penerapan machine learning di bidang kesehatan terbukti mampu meningkatkan kecepatan dan konsistensi diagnosis, namun berbagai penelitian menunjukkan bahwa performa algoritma seperti KNN, CNN, dan Neural Network sangat bergantung pada jenis penyakit, ukuran dataset, dan kualitas data yang digunakan. Masalah riset yang diajukan adalah belum adanya kajian komparatif yang terukur dan sistematis mengenai efektivitas berbagai algoritma ML dalam mengklasifikasi penyakit pada dataset klinis skala kecil-menengah di konteks layanan kesehatan Indonesia. Oleh karena itu, penelitian perlu mengevaluasi dan membandingkan metode ML secara simultan berdasarkan metrik akurasi, sensitivitas, spesifisitas, dan AUC agar teknologi ini dapat diadopsi secara tepat sasaran dan berbasis bukti.


---

## Refleksi

> Bandingkan "masalah" yang biasa ditemui saat coding (bug, error) dengan masalah riset. Apa perbedaan fundamental dalam cara mendefinisikan dan mendekati keduanya?

**Jawaban:**
> Bandingkan "masalah" coding dengan masalah riset. Apa perbedaan fundamentalnya?
Masalah saat coding bersifat deterministik dan teknis: ada perilaku sistem yang tidak sesuai harapan, dianalisis penyebabnya, lalu diperbaiki hingga sistem kembali berfungsi benar. Fokusnya adalah penyelesaian yang konkret dan terverifikasi secara langsung oleh output sistem.
Masalah riset bersifat epistemik dan kontekstual: yang dicari bukan sekadar "apa yang salah", melainkan "apa yang belum diketahui" — yaitu gap pengetahuan yang memerlukan bukti terukur, variabel yang terdefinisi operasional, hipotesis yang falsifiable, dan metodologi yang dapat direplikasi. Dalam konteks ML di kesehatan, misalnya, "algoritma KNN tidak akurat" adalah masalah teknis; sedangkan "belum diketahui algoritma mana yang paling optimal untuk dataset klinis skala kecil di Indonesia" adalah masalah riset — karena jawabannya membutuhkan eksperimen sistematis, bukan sekadar perbaikan kode.