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

```
VARIABLE & METRIC DEFINITION

Research Question: Bagaimana perbandingan efektivitas 5 algoritma Machine Learning (Naive Bayes, Random Forest, XGBoost, KNN, Neural Network) ketika diimplementasikan pada 5 studi kasus dataset yang berbeda karakteristiknya?

| Variabel | Tipe | Konsep | Metrik | Skala | Satuan | Cara Mengukur | Justifikasi |
|----------|------|--------|--------|-------|--------|---------------|-------------|
| Algoritma ML | IV | Pendekatan/Model Pemrograman | Categorical (NB, RF, XGB, KNN, NN) | Nominal | — | Eksekusi model di Library Scikit-Learn | Subjek utama komparasi |
| Jenis Dataset | IV | Karakteristik sumber data | Categorical (Teks, Klinis, Imbalance) | Nominal | — | Dataset dari 5 domain/kasus | Untuk melihat pengaruh tipe data |
| Kinerja Klasifikasi | DV | Keberhasilan model menebak | Akurasi, F1-Score | Ratio | Persen (%) | Ekstraksi dari Confusion Matrix | Metrik paling representatif |
| Waktu Komputasi | DV | Efisiensi algoritma | Training Time | Ratio | Detik (s) | Modul `time()` saat runtime Python | Penting untuk aplikasi real-time |

Alignment Check:
  RQ → Concept → Variable → Metric → Data → Result
  [x] Setiap langkah terdokumentasi
  [x] Tidak ada "lompatan logis"
  [x] Metrik mengukur apa yang dimaksud (construct validity)
```

---

## Latihan 1 — Operationalization Chain

Gunakan RQ dari WS-04. Definisikan variabel dan metriknya.

**RQ:** *Bagaimana perbandingan efektivitas 5 algoritma Machine Learning ketika diimplementasikan pada 5 studi kasus dataset yang berbeda karakteristiknya?*

| Variabel | Tipe | Konsep Abstrak | Metrik Konkret | Skala (NOIR) | Satuan |
|----------|------|---------------|----------------|-------------|--------|
| *Jenis Algoritma ML* | *IV* | *Pendekatan pemodelan algoritma* | *Kategori: Naive Bayes, RF, XGBoost, KNN, NN* | *Nominal* | *—* |
| *Karakteristik Data* | *IV* | *Konteks dan jenis sumber data* | *Kategori: Sentimen, NIDS, Medis, Beasiswa* | *Nominal* | *—* |
| *Kinerja Klasifikasi* | *DV* | *Tingkat keandalan prediksi AI* | *Akurasi, F1-Score, Precision, Recall* | *Ratio* | *% (Persentase)* |
| *Waktu Komputasi* | *DV* | *Efisiensi waktu eksekusi* | *Waktu proses algoritma saat training* | *Ratio* | *Detik (s)* |
| *Prapemrosesan (Prep)* | *CV* | *Treatment data yang setara* | *Penggunaan TF-IDF / Normalisasi yang tetap* | *Nominal* | *—* |

**Apakah ada lompatan logis dalam rantai?** [ ] Ya / [x] Tidak
> Jika ya, di mana? *Tidak ada. Semua konsep teoritis seperti "efektivitas" telah sukses diturunkan menjadi metrik angka pasti (F1-score dan waktu).*

---

## Latihan 2 — Evaluasi Metrik

Evaluasi metrik DV yang dipilih di Latihan 1 menggunakan 3 kriteria.

| Kriteria | Skor (1-5) | Justifikasi |
|----------|-----------|-------------|
| Representative | *5* | *F1-Score sangat mewakili keseimbangan prediksi kelas mayoritas dan minoritas, krusial untuk kasus imbalanced data (NIDS, Medis).* |
| Sensitive | *5* | *Akurasi dan F1-Score dalam rentang 0-100% sangat sensitif untuk mendeteksi perubahan sekecil apapun pasca hyperparameter tuning.* |
| Feasible | *5* | *Dapat langsung diekstrak secara instan dengan menggunakan library `classification_report` dari modul Scikit-Learn.* |

**Apakah perlu secondary metric?** [x] Ya / [ ] Tidak
> Jika ya, apa dan mengapa? *Ya, Waktu Komputasi (Detik). Walaupun model Neural Network mungkin akurasinya paling bagus, tapi jika waktu pelatihannya berjam-jam, maka algoritma ringan (seperti Naive Bayes) mungkin jauh lebih ideal untuk diimplementasikan di sistem real-time instansi.*

**Contoh kasus ceiling effect untuk metrik ini:**
> *Jika terjadi "data leakage" (dataset uji bercampur dengan dataset latih), maka metrik akurasi akan langsung meloncat menyentuh angka 99,9%. Ini tumpul karena kita tidak bisa lagi mengukur algoritma mana yang benar-benar cerdas dalam mendeteksi data baru.*

---

## Latihan 3 — Data Quality Check

Bayangkan data yang akan dikumpulkan dari eksperimen. Evaluasi 4 dimensi kualitas data.

| Dimensi | Pertanyaan | Jawaban | Strategi Mitigasi |
|---------|-----------|---------|------------------|
| Completeness | *Apakah semua data point terkumpul?* | *Kemungkinan besar ada nilai kosong (Missing Values) pada data rekam medis atau beasiswa.* | *Menerapkan teknik imputasi statistik (Mean/Median) atau mendrop baris cacat.* |
| Consistency | *Apakah ada kontradiksi internal?* | *Pada dataset NLP/Sentimen, komentar bernada sarkasme sering berlabel keliru.* | *Gunakan Cross-Validation dan terapkan "inter-rater reliability" pada pelabelan.* |
| Validity | *Apakah benar-benar mengukur yang dimaksud?* | *Akurasi akan sangat menipu jika kelasnya imbalanced (contoh: serangan NIDS sangat langka).* | *Jadikan F1-Score atau metrik AUC-ROC sebagai penentu utama (primary metric).* |
| Representativeness | *Apakah sampel mewakili populasi target?* | *Dataset beasiswa KIP di satu kampus mungkin tidak merepresentasikan kampus seluruh provinsi.* | *Mengambil data uji dari sumber eksternal, atau deklarasikan ini sebagai limitasi riset.* |

---

## Refleksi

> Mengapa memilih metrik setelah melihat data dianggap p-hacking? Apa bedanya dengan eksplorasi data yang sah?

**Jawaban:**
> *Memilih metrik setelah melihat data (p-hacking) ibarat memanah ke tembok kosong lalu baru menggambar targetnya di tempat panah menancap; ini adalah cherry-picking agar riset selalu terlihat "berhasil". Eksplorasi data yang sah (Exploratory Data Analysis / EDA) dilakukan sepenuhnya SEBELUM proses training model AI, murni untuk memahami distribusi pola data, tanpa merekayasa/menyeleksi jenis metrik laporan akhir secara tidak jujur.*
