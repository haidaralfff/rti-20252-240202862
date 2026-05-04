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

Gap Statement  : Kekosongan komparasi algoritma Machine Learning yang ekstensif menggunakan kombinasi seleksi fitur Chi-square dan hyperparameter tuning GridSearchCV untuk mendapatkan akurasi di atas 93% pada dataset medis yang tidak seimbang.

Research Question:
  Tipe         : [x] Comparison  [ ] Improvement  [ ] Exploratory
  Formulasi    : Apakah kombinasi KNN dengan Chi-Square dan GridSearchCV menghasilkan Akurasi dan F1-Score yang secara signifikan lebih tinggi dibandingkan algoritma baseline (SVM/Base Model) pada dataset penyakit jantung?
  Variabel IV  : Penggunaan seleksi fitur Chi-Square dan GridSearchCV pada algoritma (KNN vs SVM dll)
  Variabel DV  : Kinerja Prediksi Klasifikasi
  Metrik       : Akurasi (%) dan F1-Score
  Dataset      : Dataset penyakit jantung (Cleveland/UCI) dengan kelas tidak seimbang
  Baseline     : SVM + Chi-square dan Model Dasar tanpa optimasi

Quality Check RQ:
  [x] Variabel spesifik
  [x] Metrik jelas
  [x] Baseline ada
  [x] Konteks disebutkan
  [x] Memerlukan eksperimen (bukan hanya survei literatur)

Contribution Statement:
  Apa yang baru diketahui : Adanya standar bukti komparatif algoritma ML konvensional yang paling efisien (KNN) jika dipadukan dengan seleksi fitur dan tuning parameter untuk dataset penyakit jantung tidak seimbang.
  Jenis kontribusi        : [ ] Improvement  [x] Comparison  [ ] Novel approach
  Gap yang diisi          : Gap Kinerja dan Metode (Performance & Method Gap) untuk menembus ambang batas akurasi 90-93%.

Hypothesis Pair:
  H₀ : Tidak ada perbedaan signifikan pada metrik Akurasi dan F1-Score antara KNN (Chi-square + GridSearchCV) dengan model baseline (SVM/Base Model) pada dataset penyakit jantung.
  H₁ : KNN (Chi-square + GridSearchCV) menghasilkan Akurasi dan F1-Score yang secara signifikan lebih tinggi dibandingkan model baseline pada dataset penyakit jantung.
  Threshold              : Peningkatan akurasi melewati angka 93% dan p-value < 0.05 dari uji T-Test/ANOVA.
  Justifikasi threshold  : Peningkatan melewati 93% menembus state-of-the-art sebelumnya (Sarra 2022 di angka 89%), sangat berdampak klinis dalam mengurangi misdiagnosis penyakit jantung.
```

---

## Latihan 1 — Dari Gap ke RQ

Gunakan gap yang ditemukan di WS-03. Transformasikan menjadi Research Question.

**Gap dari WS-03:** *Kekosongan komparasi algoritma Machine Learning yang ekstensif menggunakan kombinasi seleksi fitur Chi-square dan hyperparameter tuning GridSearchCV untuk mendapatkan akurasi di atas 93% pada dataset medis yang tidak seimbang.*

**RQ versi pertama (tulis bebas):**
> *Apakah optimasi fitur Chi-square dan algoritma membuat model lebih baik untuk mengklasifikasi penyakit jantung?*

**Evaluasi RQ:**

| Komponen | Ada? | Isi |
|----------|------|-----|
| Metode spesifik | *Ya* | *Optimasi fitur Chi-square* |
| Metrik terukur | *Tidak* | *Masih sekadar "lebih baik", belum ada metrik Akurasi/F1-Score* |
| Baseline | *Tidak* | *Belum ada algoritma pembanding eksplisit* |
| Dataset/konteks | *Ya* | *Dataset klasifikasi penyakit jantung* |

**Tipe RQ:** [x] Comparison / [ ] Improvement / [ ] Exploratory

**RQ versi revisi (setelah evaluasi):**
> *Apakah algoritma K-Nearest Neighbor (KNN) yang dioptimasi menggunakan seleksi fitur Chi-Square dan GridSearchCV menghasilkan metrik Akurasi dan F1-Score yang secara signifikan lebih tinggi dibandingkan model baseline (SVM) ketika diterapkan pada dataset penyakit jantung yang tidak seimbang?*

---

## Latihan 2 — Hypothesis Pair

Rumuskan pasangan hipotesis dari RQ di Latihan 1.

| Komponen | Isi |
|----------|-----|
| H₀ | *Tidak ada perbedaan signifikan pada metrik Akurasi dan F1-Score antara KNN (Chi-Square + GridSearchCV) dibandingkan model baseline (SVM) dalam klasifikasi dataset penyakit jantung.* |
| H₁ | *Algoritma KNN (Chi-Square + GridSearchCV) menghasilkan metrik Akurasi dan F1-Score yang secara signifikan lebih tinggi (menembus >93%) dibandingkan model baseline (SVM) dalam klasifikasi dataset penyakit jantung.* |
| Metrik | *Akurasi (%) dan F1-Score.* |
| Threshold | *Akurasi > 93% dan p-value < 0.05 (Statistical Test).* |
| Justifikasi threshold | *Meningkatkan akurasi di atas baseline 89% sangat berdampak signifikan secara klinis untuk mengurangi misdiagnosis. P-value < 0.05 membuktikan peningkatannya signifikan secara statistik.* |

**Apakah hipotesis ini falsifiable?** [x] Ya / [ ] Tidak
> Bagaimana cara membuktikannya salah? *Dengan menjalankan eksperimen komparasi. Jika nilai Akurasi KNN (Chi-Square + GridSearchCV) sama dengan atau lebih rendah dari baseline, atau tidak menembus threshold 93%, maka H₀ gagal ditolak.*

---

## Latihan 3 — Rantai Operasionalisasi

Lengkapi rantai dari RQ hingga metode analisis.

| Tahap | Isi |
|-------|-----|
| RQ | *Apakah KNN yang dioptimasi (Chi-Square + GridSearchCV) lebih akurat dibandingkan baseline SVM pada dataset penyakit jantung?* |
| Variable (IV) | *Penerapan metode seleksi fitur (Chi-Square) dan hyperparameter tuning (GridSearchCV) pada algoritma.* |
| Variable (DV) | *Kinerja Prediksi Klasifikasi Penyakit Jantung.* |
| Metric | *Akurasi (%), F1-Score.* |
| Data source | *Dataset penyakit jantung medis (misal: Cleveland/UCI Repository) yang berdimensi kecil.* |
| Analysis method | *Eksperimen K-Fold Cross-Validation, dievaluasi dengan Confusion Matrix dan Statistical Test.* |

**Apakah rantai lengkap?** [x] Ya / [ ] Tidak
> Jika tidak, tahap mana yang perlu direvisi? *Sudah lengkap dan operasional dari pertanyaan, variabel, sumber data, hingga metode analisis.*

---

## Refleksi

> Ambil satu judul skripsi/paper yang pernah dibaca. Coba ekstrak RQ-nya. Apakah RQ tersebut memenuhi semua komponen (metode, metrik, baseline, konteks)? Jika tidak, apa yang hilang?

**Judul:** *Klasifikasi Penyakit Jantung Menggunakan Algoritma K-Nearest Neighbor (KNN)*
**RQ yang diekstrak:** *Bagaimana tingkat akurasi algoritma K-Nearest Neighbor (KNN) dalam mengklasifikasikan penyakit Jantung?*
**Komponen yang hilang:** *Baseline (tidak ada algoritma pembanding) dan Metrik spesifik (hanya menyebut akurasi tanpa target threshold) serta Konteks Dataset (tidak menyebutkan dari rumah sakit mana atau dataset publik apa).*
