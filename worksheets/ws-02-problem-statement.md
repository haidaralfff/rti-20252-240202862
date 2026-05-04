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
  Domain   : Sistem Informasi dan Kecerdasan Buatan (Machine Learning)
  Konteks  : Evaluasi kinerja algoritma machine learning (Naive Bayes, Random Forest, XGBoost, KNN, Neural Network) pada beragam studi kasus (analisis sentimen, seleksi beasiswa, keamanan jaringan, medis, dan DSS).

System Context
  Input       : Dataset yang bervariasi dari 5 domain berbeda (teks komentar opini, data riwayat akademik/ekonomi, log trafik jaringan/NIDS, rekam medis jantung, dan data kriteria DSS).
  Process     : Pra-pemrosesan data (termasuk TF-IDF, SMOTE, Chi-square), pelatihan 5 algoritma berbeda, evaluasi prediksi, dan komparasi performa model.
  Output      : Hasil klasifikasi (sentimen positif/negatif, layak/tidak beasiswa, intrusi jaringan, penyakit jantung, keputusan kelayakan).
  Outcome     : Pengambilan keputusan otomatis yang lebih objektif, transparan, dan akurat di berbagai sektor (sosial, pendidikan, keamanan, dan medis).
  Constraints : Ketidakseimbangan data (imbalanced data), kompleksitas preprocessing teks vs numerik, serta perbedaan metrik optimal untuk tiap jenis data.
  Stakeholders: Instansi pemerintah/institusi (Polri/MUI, Universitas), administrator jaringan komputer, praktisi kesehatan, dan pengembang sistem.

Fenomena → Problem
  Fenomena yang diamati         : Machine Learning semakin diandalkan secara luas di Indonesia untuk memecahkan berbagai kasus dari NLP hingga klasifikasi klinis.
  Gejala (symptom) yang terukur : Seringkali satu metode ML diunggulkan tanpa uji komparatif, dan model kerap gagal menangani kelas minoritas pada data yang tidak seimbang.
  Masalah yang didiagnosis      : Penerapan algoritma seringkali tidak disesuaikan dengan karakteristik unik tiap dataset, sehingga implementasinya masih bersifat trial-and-error tanpa framework komparasi yang baku.
  Masalah riset (researchable)  : Bagaimana perbandingan efektivitas 5 algoritma Machine Learning yang berbeda ketika diimplementasikan pada 5 studi kasus spesifik dengan karakteristik dataset yang sangat bervariasi di Indonesia?
  Variabel yang terukur         : Akurasi (%), F1-Score, Precision, Recall, metode pra-pemrosesan (TF-IDF, SMOTE, Chi-square), jenis dataset, dan jenis algoritma ML.

Problem Quality Check
  [x] Clarity      — Apakah satu orang membaca akan paham?
  [x] Measurability — Apakah ada metrik kuantitatif?
  [x] Relevance    — Apakah penting untuk domain?
  [x] Testability  — Apakah bisa gagal?
  [x] Impact       — Apakah ada kontribusi jika terjawab?

Problem Statement :
  Perkembangan Machine Learning memberikan potensi besar untuk otomatisasi pengambilan keputusan di berbagai sektor di Indonesia, mulai dari analisis sentimen masyarakat, seleksi penerima beasiswa pendidikan, deteksi intrusi jaringan siber, hingga diagnosis medis penyakit jantung. Namun, masing-masing domain tersebut memiliki karakteristik dataset yang sangat bervariasi, termasuk tantangan berupa ketidakseimbangan data (data imbalance) dan tipe fitur (teks vs numerik). Masalah riset yang muncul adalah belum adanya panduan komparatif lintas domain mengenai seberapa efektif algoritma-algoritma ML tertentu (seperti Naive Bayes, Random Forest, XGBoost, KNN, dan Neural Network) ketika dihadapkan pada karakteristik data spesifik tersebut. Oleh karena itu, diperlukan penelitian yang mengevaluasi secara komprehensif performa dari berbagai algoritma ini berdasarkan metrik Akurasi dan F1-Score, sehingga implementasi ML ke depannya tidak lagi sekadar *trial and error*, melainkan berbasis bukti (evidence-based) yang selaras dengan profil datanya.
```

---

## Latihan 1 — Dari Topik ke Masalah Riset

Pilih satu topik di bidang TI yang diminati. Transformasikan melalui 5 tahap Problem Formation Model.

**Topik awal:** *Evaluasi Performa Berbagai Algoritma Machine Learning pada 5 Domain Studi Kasus Berbeda.*

| Tahap | Hasil |
|-------|-------|
| Reality | *Banyak sektor di Indonesia (kesehatan, pendidikan, jaringan, opini publik) sudah mulai mengumpulkan data untuk mendukung pengambilan keputusan.* |
| Observed Issue (Symptom) | *Banyak penelitian menerapkan Machine Learning secara sporadis, menggunakan 1 metode algoritma tanpa membandingkannya, dan model gagal memprediksi kelas minoritas karena data yang cacat.* |
| Diagnosed Problem (Root Cause) |*Tidak ada standar pemetaan algoritma terhadap jenis data. Dataset NLP, dataset jaringan skala besar, dan dataset klinis memiliki perlakuan pra-pemrosesan (TF-IDF, SMOTE, Chi-square) yang spesifik.* |
| Researchable Problem |*Bagaimana tingkat perbandingan efektivitas 5 algoritma Machine Learning (Naive Bayes, RF, XGBoost, KNN, Neural Network) dalam menyelesaikan masalah klasifikasi pada 5 dataset yang berbeda karakteristiknya?* |
| Measurable Variable |*Akurasi (%), Precision, Recall, F1-Score, jenis algoritma, jenis dataset, dan hasil perlakuan pra-pemrosesan (handling imbalance).* |

**Apakah terjebak solution-first thinking?** [ ] Ya / [x] Tidak
> Rumusan masalah tidak memaksakan satu algoritma tertentu sebagai solusi mutlak, melainkan bersifat interogatif/komparatif terhadap semua algoritma yang diuji pada masing-masing domain.

---

## Latihan 2 — System Context Decomposition

Gambarkan konteks sistem dari masalah riset di Latihan 1.

| Komponen | Deskripsi |
|----------|----------|
| Input | *5 jenis dataset mentah dari domain berbeda: teks opini sosial media, data pelamar beasiswa KIP, log intrusi keamanan jaringan (NIDS), rekam medis jantung (Cleveland), dan kriteria SPK.* |
| Process |*Prapemrosesan spesifik domain (TF-IDF, SMOTE, seleksi fitur Chi-Square), pemodelan 5 algoritma ML yang berbeda, evaluasi cross-validation, dan ekstraksi interpretasi model (SHAP).* |
| Output |*Hasil klasifikasi dari setiap domain: Prediksi kelas sentimen, kelulusan beasiswa, deteksi intrusi, diagnosa sakit jantung, dan nilai SPK.* |
| Outcome |*Pengambilan keputusan di institusi menjadi objektif, transparan (mengurangi misdiagnosis/salah seleksi), dan mempercepat proses screening data skala besar.* |
| Constraints |*Distribusi data sangat tidak seimbang (minority class di kasus beasiswa dan penyakit), dan noise tinggi pada data jaringan/teks yang menuntut pra-pemrosesan memakan waktu lama.* |
| Stakeholders |*Masyarakat/opini publik, pendaftar beasiswa, dokter/manajemen rumah sakit, dan praktisi IT (data engineer, network administrator).* |

**Komponen mana yang paling relevan dengan masalah riset?** Process dan Input (Karakteristik Data)

---

## Latihan 3 — Problem Quality Check

Evaluasi problem statement yang sudah dibuat menggunakan 5 kriteria.

| Kriteria | Skor (1-5) | Justifikasi |
|----------|-----------|-------------|
| Clarity | *5* |*Rumusan masalah jelas mengarah pada perbandingan 5 algoritma terhadap 5 jenis studi kasus dataset berbeda.* |
| Measurability |*5* |*Variabel terukur sangat rinci, mencakup tingkat Akurasi (%) dan F1-Score untuk mengukur kelas yang tidak seimbang.* |
| Relevance |*5* |*Adopsi Machine Learning di Indonesia di beragam sektor publik dan swasta saat ini sedang tumbuh pesat, menuntut pemilihan model yang cermat.* |
| Testability |*5* |*Hipotesis dapat langsung dieksekusi dengan *training* model pada dataset dan melihat *confusion matrix*-nya.* |
| Impact |*5* | *Hasilnya menciptakan sebuah taksonomi/panduan pemetaan (*best-practices*) antara algoritma ML spesifik dengan karakteristik datanya.*|

**Skor total:** 25 / 25

**Problem statement versi final (1 paragraf):**
> Perkembangan Machine Learning memberikan potensi besar untuk otomatisasi pengambilan keputusan di berbagai sektor di Indonesia, mulai dari analisis sentimen masyarakat, seleksi penerima beasiswa pendidikan, deteksi intrusi jaringan siber, hingga diagnosis medis penyakit jantung. Namun, masing-masing domain tersebut memiliki karakteristik dataset yang sangat bervariasi, termasuk tantangan berupa ketidakseimbangan data (data imbalance) dan tipe fitur (teks vs numerik). Masalah riset yang muncul adalah belum adanya panduan komparatif lintas domain mengenai seberapa efektif algoritma-algoritma ML tertentu (seperti Naive Bayes, Random Forest, XGBoost, KNN, dan Neural Network) ketika dihadapkan pada karakteristik data spesifik tersebut. Oleh karena itu, diperlukan penelitian yang mengevaluasi secara komprehensif performa dari berbagai algoritma ini berdasarkan metrik Akurasi dan F1-Score, sehingga implementasi ML ke depannya tidak lagi sekadar *trial and error*, melainkan berbasis bukti (evidence-based) yang selaras dengan profil datanya.


---

## Refleksi

> Bandingkan "masalah" yang biasa ditemui saat coding (bug, error) dengan masalah riset. Apa perbedaan fundamental dalam cara mendefinisikan dan mendekati keduanya?

**Jawaban:**
> Bandingkan "masalah" coding dengan masalah riset. Apa perbedaan fundamentalnya?
Masalah saat coding bersifat deterministik dan teknis: ada perilaku sistem yang tidak sesuai harapan, dianalisis penyebabnya, lalu diperbaiki hingga sistem kembali berfungsi benar. Fokusnya adalah penyelesaian yang konkret dan terverifikasi secara langsung oleh output sistem.
Masalah riset bersifat epistemik dan kontekstual: yang dicari bukan sekadar "apa yang salah", melainkan "apa yang belum diketahui" — yaitu gap pengetahuan yang memerlukan bukti terukur, variabel yang terdefinisi operasional, hipotesis yang falsifiable, dan metodologi yang dapat direplikasi. Dalam konteks ML di kesehatan, misalnya, "algoritma KNN tidak akurat" adalah masalah teknis; sedangkan "belum diketahui algoritma mana yang paling optimal untuk dataset klinis skala kecil di Indonesia" adalah masalah riset — karena jawabannya membutuhkan eksperimen sistematis, bukan sekadar perbaikan kode.