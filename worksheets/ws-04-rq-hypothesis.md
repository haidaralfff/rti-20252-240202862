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

```
RQ-CONTRIBUTION-HYPOTHESIS

Gap Statement  : Ketiadaan standar komparatif algoritma ML yang dioptimasi untuk dataset klinis skala kecil-menengah di Indonesia.

Research Question:
  Tipe         : [x] Comparison  [ ] Improvement  [ ] Exploratory
  Formulasi    : Apakah CNN menghasilkan F1-Score dan Akurasi yang secara signifikan lebih tinggi dibandingkan KNN ketika diterapkan pada dataset rekam medis klinis dengan sampel < 500 baris?
  Variabel IV  : Jenis Algoritma Machine Learning (CNN dan KNN)
  Variabel DV  : Kinerja Prediksi Klasifikasi
  Metrik       : F1-Score dan Akurasi (%)
  Dataset      : Dataset rekam medis publik/lokal berukuran kecil (< 500 sampel)
  Baseline     : K-Nearest Neighbor (KNN)

Quality Check RQ:
  [x] Variabel spesifik
  [x] Metrik jelas
  [x] Baseline ada
  [x] Konteks disebutkan
  [x] Memerlukan eksperimen (bukan hanya survei literatur)

Contribution Statement:
  Apa yang baru diketahui : Adanya standar bukti komparatif antara metode canggih (CNN) dan metode konvensional (KNN) pada skala data klinis kecil.
  Jenis kontribusi        : [ ] Improvement  [x] Comparison  [ ] Novel approach
  Gap yang diisi          : Gap Kinerja dan Konteks (Performance & Context Gap) untuk faskes menengah ke bawah.

Hypothesis Pair:
  H₀ : Tidak ada perbedaan signifikan pada metrik F1-Score dan Akurasi antara algoritma CNN dan KNN dalam klasifikasi penyakit pada dataset medis berukuran kecil (< 500 sampel).
  H₁ : Algoritma CNN menghasilkan F1-Score dan Akurasi yang secara signifikan lebih tinggi dibandingkan KNN dalam klasifikasi penyakit pada dataset medis berukuran kecil (< 500 sampel).
  Threshold              : Perbedaan metrik > 5% dan p-value < 0.05 dari uji T-Test.
  Justifikasi threshold  : Peningkatan 5% berdampak signifikan secara klinis untuk mengurangi salah diagnosis (False Positives/Negatives) di rumah sakit daerah.
```

---

## Latihan 1 — Dari Gap ke RQ

Gunakan gap yang ditemukan di WS-03. Transformasikan menjadi Research Question.

**Gap dari WS-03:** *Ketiadaan standar komparatif algoritma ML yang dioptimasi untuk dataset klinis skala kecil-menengah di Indonesia.*

**RQ versi pertama (tulis bebas):**
> *Apakah algoritma CNN lebih baik daripada KNN untuk mengklasifikasi penyakit pada dataset medis kecil di rumah sakit daerah?*

**Evaluasi RQ:**

| Komponen | Ada? | Isi |
|----------|------|-----|
| Metode spesifik | *Ya* | *CNN vs KNN* |
| Metrik terukur | *Tidak* | *Masih sekadar "lebih baik", belum spesifik* |
| Baseline | *Ya* | *KNN* |
| Dataset/konteks | *Ya* | *Dataset medis kecil di rumah sakit daerah* |

**Tipe RQ:** [x] Comparison / [ ] Improvement / [ ] Exploratory

**RQ versi revisi (setelah evaluasi):**
> *Apakah Convolutional Neural Network (CNN) menghasilkan F1-Score dan Akurasi yang secara signifikan lebih tinggi dibandingkan K-Nearest Neighbor (KNN) ketika diterapkan pada dataset rekam medis klinis dengan sampel kurang dari 500 baris?*

---

## Latihan 2 — Hypothesis Pair

Rumuskan pasangan hipotesis dari RQ di Latihan 1.

| Komponen | Isi |
|----------|-----|
| H₀ | *Tidak ada perbedaan signifikan pada metrik F1-Score dan Akurasi antara algoritma CNN dan KNN dalam klasifikasi penyakit pada dataset medis berukuran kecil (< 500 sampel).* |
| H₁ | *Algoritma CNN menghasilkan F1-Score dan Akurasi yang secara signifikan lebih tinggi dibandingkan KNN dalam klasifikasi penyakit pada dataset medis berukuran kecil (< 500 sampel).* |
| Metrik | *F1-Score dan Akurasi (%).* |
| Threshold | *Perbedaan metrik > 5% dan p-value < 0.05 dari uji T-Test.* |
| Justifikasi threshold | *Peningkatan 5% berdampak signifikan secara klinis untuk mengurangi False Positives/Negatives. P-value < 0.05 membuktikan hasil bukan karena kebetulan acak.* |

**Apakah hipotesis ini falsifiable?** [x] Ya / [ ] Tidak
> Bagaimana cara membuktikannya salah? *Dengan menjalankan eksperimen komparasi. Jika nilai F1-Score CNN sama dengan atau lebih rendah dari KNN, atau peningkatannya tidak mencapai 5% dengan p-value >= 0.05, maka H₀ gagal ditolak.*

---

## Latihan 3 — Rantai Operasionalisasi

Lengkapi rantai dari RQ hingga metode analisis.

| Tahap | Isi |
|-------|-----|
| RQ | *Apakah CNN menghasilkan F1-Score dan Akurasi yang lebih tinggi dari KNN pada dataset rekam medis < 500 baris?* |
| Variable (IV) | *Jenis Algoritma Machine Learning (CNN dan KNN).* |
| Variable (DV) | *Kinerja Prediksi Klasifikasi.* |
| Metric | *F1-Score, Akurasi (%).* |
| Data source | *Dataset rekam medis publik/lokal berukuran kecil (contoh: dataset diabetes/jantung < 500 sampel).* |
| Analysis method | *Eksperimen Cross-Validation (K-Fold) & Statistical T-Test untuk perbandingan metrik.* |

**Apakah rantai lengkap?** [x] Ya / [ ] Tidak
> Jika tidak, tahap mana yang perlu direvisi? *Sudah lengkap dan saling terhubung dari RQ hingga metodologi analisis.*

---

## Refleksi

> Ambil satu judul skripsi/paper yang pernah dibaca. Coba ekstrak RQ-nya. Apakah RQ tersebut memenuhi semua komponen (metode, metrik, baseline, konteks)? Jika tidak, apa yang hilang?

**Judul:** *Klasifikasi Penyakit Diabetes Mellitus Menggunakan Algoritma Support Vector Machine (SVM)*
**RQ yang diekstrak:** *Bagaimana tingkat akurasi algoritma Support Vector Machine (SVM) dalam mengklasifikasikan penyakit Diabetes Mellitus?*
**Komponen yang hilang:** *Baseline (tidak ada algoritma pembanding) dan Metrik spesifik (hanya menyebut akurasi tanpa target threshold) serta Konteks Dataset.*
