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

```
EXPERIMENT DESIGN

Research Question : Bagaimana perbandingan efektivitas 5 algoritma ML ketika diimplementasikan pada 5 studi kasus dataset yang berbeda karakteristiknya?
Hypothesis        : Setiap algoritma akan memiliki tingkat efektivitas (F1-score) yang dominan hanya pada tipe dataset dengan karakteristik spesifik (misal: Naive Bayes unggul di data Teks Sentimen, XGBoost di data tabular Imbalance NIDS/Beasiswa).
Tipe Eksperimen   : [x] Comparison  [ ] Ablation  [ ] Parameter

Kondisi Eksperimen:
| Kondisi | Deskripsi | IV Value | CV Settings |
|---------|-----------|----------|-------------|
| Control | Algoritma Baseline Klasik pada tiap dataset | Naive Bayes / KNN | Dataset, Preprocessing, Seed = 42 |
| Treatment | Algoritma Ensemble/Lanjutan pada tiap dataset | Random Forest, XGBoost, NN | Dataset, Preprocessing, Seed = 42 |

Fairness Checklist:
  [x] Dataset identik untuk semua kondisi
  [x] Preprocessing setara
  [x] Tuning effort setara
  [x] Environment identik
  [x] Metrik evaluasi sama

Threat Analysis:
| Threat Type | Ancaman Spesifik | Mitigasi |
|-------------|-----------------|----------|
| Internal    | Data leakage saat proses SMOTE/CV | Terapkan SMOTE hanya pada data latih (training set), bukan di keseluruhan data. |
| External    | Dataset 5 domain tidak mewakili masalah riil global | Gunakan dataset standar publik (misal dataset Jantung Cleveland UCI, NIDS CIC). |
| Construct   | Akurasi menipu pada data yang *imbalance* | Gunakan F1-Score sebagai metrik primer (Primary Metric). |
| Conclusion  | Perbedaan akurasi antar algoritma hanya karena kebetulan (random noise) | Lakukan uji statistik T-Test berpasangan (Paired T-Test) atau ANOVA lintas K-Fold CV. |

Statistical Plan:
  Uji statistik   : ANOVA berulang (Repeated Measures ANOVA) atau Paired T-Test
  Justifikasi     : Membandingkan performa >2 algoritma pada sampel/dataset yang persis sama.
  Alpha           : 0.05
  Effect size min : Cohen's d > 0.5 (Medium Effect)
```

---

## Latihan 1 — Desain Eksperimen

Susun desain eksperimen berdasarkan RQ, variabel, dan sistem dari WS-04 sampai WS-06.

**RQ:** *Bagaimana perbandingan efektivitas 5 algoritma Machine Learning ketika diimplementasikan pada 5 studi kasus dataset yang berbeda karakteristiknya?*
**Tipe eksperimen:** [x] Comparison / [ ] Ablation / [ ] Parameter

| Kondisi | Deskripsi | IV Value | CV Settings |
|---------|-----------|----------|-------------|
| Control | *Algoritma konvensional sebagai Baseline (misal di kasus beasiswa/jantung)* | *KNN & Naive Bayes* | *Dataset yang sama, 80:20 split, seed 42, SMOTE/TF-IDF konstan* |
| Treatment | *Algoritma kompleks (Ensemble/Deep Learning)* | *RF, XGBoost, NN* | *Dataset yang sama, 80:20 split, seed 42, SMOTE/TF-IDF konstan* |

---

## Latihan 2 — Fairness Checklist

Evaluasi apakah desain eksperimen di Latihan 1 sudah fair.

| Kriteria | Status | Detail |
|----------|--------|--------|
| Dataset identik | *✅* | *Semua 5 algoritma dilatih dan diuji pada file dataset (CSV) yang persis sama per domain kasus.* |
| Preprocessing setara | *✅* | *Fitur SMOTE/TF-IDF diumpankan ke semua 5 algoritma tanpa terkecuali melalui arsitektur pipeline.* |
| Tuning effort setara | *✅* | *Semua model dikenakan GridSearchCV dengan batasan iterasi pencarian parameter yang seragam.* |
| Environment identik | *✅* | *Dieksekusi di OS dan runtime yang sama (misal Python 3.10, RAM sama, versi Scikit-Learn sama).* |
| Metrik evaluasi sama | *✅* | *Kesemuanya diukur murni dengan library fungsi `classification_report` yang sama (Akurasi, F1-Score).* |

**Ada yang tidak fair?** [ ] Ya / [x] Tidak
> Jika ya, bagaimana cara memperbaikinya? *Desain ini sudah sangat adil. Membandingkan algoritma klasik (NB) dengan modern (NN) adalah perbandingan yang sah (*apples-to-apples*) selama dataset dan pra-pemrosesan yang diberikan kepada mereka benar-benar identik.*

---

## Latihan 3 — Threat Analysis

Identifikasi ancaman validitas untuk desain eksperimen ini.

| Threat Type | Ancaman Spesifik | Mitigasi |
|-------------|-----------------|----------|
| Internal | *Data leakage (kebocoran) saat menangani imbalance data (SMOTE).* | *Eksekusi SMOTE secara ketat hanya pada fase/data *training*, biarkan dataset *testing* murni tak tersentuh.* |
| External | *Dataset spesifik seperti opini aksi 212 atau beasiswa di satu universitas lokal sulit digeneralisasi global.* | *Berikan batasan (scoping) yang sangat jelas di judul paper bahwa kesimpulan bersifat eksklusif untuk demografi/studi kasus tersebut.* |
| Construct | *F1-score menjadi tumpul jika peneliti salah menentukan kelas target (positive class) pada kasus medis.* | *Wajib menggunakan parameter evaluasi `average='macro'` atau `weighted`.* |
| Conclusion | *Klaim 1 algoritma "menang mutlak" hanya karena fluktuasi akurasi 0,5%.* | *Klaim kemenangan baru sah jika didukung oleh nilai p-value < 0.05 dari K-Fold Cross Validation t-test.* |

**Ancaman mana yang paling sulit dimitigasi?** *External Validity (Generalisasi).*
**Mengapa?**
> *Karena dataset yang dipakai di mayoritas paper ini (kecuali NIDS publik dan dataset Medis Cleveland) bersifat sangat sempit secara geografi/waktu (misal sentimen aksi 212 di tahun tertentu). Karakteristik kalimat dan pola teks ini akan cepat usang, sehingga tidak ada algoritma manapun yang performanya abadi jika dihadapkan pada tren masa depan.*

---

## Refleksi

> Sebuah paper melaporkan "metode kami mengalahkan semua baseline." Apa 3 pertanyaan pertama yang harus diajukan untuk mengevaluasi klaim ini?

**Jawaban:**
1. *Apakah dataset, pra-pemrosesan (seperti imputasi nilai kosong/balancing), dan seed random yang diberikan ke metode/paper baru tersebut PERSIS sama dengan metode baseline pembandingnya?*
2. *Apakah effort tuning parameter pada metode baru lebih dianakemaskan/dioptimalkan, sementara metode baseline sengaja dibiarkan pada parameter default/kualitas buruk (*straw man baseline*)?*
3. *Apakah margin kemenangan akurasi tersebut diuji secara statistik untuk membuktikan kebolehjadian, atau hanya sekadar kebetulan angka acak yang lebih besar sedikit?*
