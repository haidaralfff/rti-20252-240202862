# WS-03: Literature Mapping & Gap

> **Bab 3 — Literature Review, Research Gap & Baseline**

---

## Ringkasan Materi

### Literature Review = Positioning, Bukan Ringkasan

Literature review bukan merangkum paper satu per satu. Pendekatan yang benar adalah **concept-centric** — organisasi berdasarkan tema, metode, atau variabel. Tujuan: menemukan **pola, kontradiksi, dan gap**.

### Empat Jenis Research Gap

| Jenis Gap | Deskripsi | Contoh |
|-----------|----------|--------|
| **Performance Gap** | Performa belum memadai | Akurasi deteksi hanya 78% pada kasus tertentu |
| **Method Gap** | Pendekatan belum diterapkan | Belum ada yang pakai transformer untuk task ini |
| **Data Gap** | Dataset terbatas/tidak representatif | Semua studi pakai dataset sintetis |
| **Context Gap** | Belum diuji pada konteks berbeda | Belum ada evaluasi di negara berkembang |

Gap terkuat = kombinasi 2+ jenis.

### Systematic Search Strategy

1. **Database**: IEEE Xplore, ACM DL, Scopus, Google Scholar
2. **Boolean query** yang terdokumentasi eksplisit
3. **Snowballing**: backward (telusuri referensi) + forward (cari yang mengutip)
4. Klaim "belum ada penelitian" harus didukung **bukti pencarian**

### Baseline Selection — 3 Kriteria

| Kriteria | Pertanyaan |
|----------|-----------|
| **Relevan** | Apakah menyelesaikan masalah yang sama? |
| **Representatif** | Apakah mewakili common practice? |
| **State-of-the-Art** | Apakah terbaru/terbaik? |

Membandingkan deep learning 2024 dengan decision tree sederhana tanpa justifikasi = **straw man comparison** (perbandingan tidak jujur).

### Research vs Engineering

| Aspek | Engineering | Research |
|-------|------------|----------|
| Tujuan baca literatur | Mencari solusi yang sudah ada | Memahami apa yang belum terjawab |
| Cara membaca paper | Tutorial, how-to | Metode, limitasi, gap |
| Baseline | Framework terpopuler | State-of-the-art yang rigorous |
| Dokumentasi pencarian | Tidak diperlukan | Wajib (reproducible) |

### Istilah Penting

- **Concept-centric** — Organisasi literatur berdasarkan konsep/metode, bukan per penulis
- **Snowballing** — Backward (telusuri referensi) + Forward (cari yang mengutip paper kunci)
- **Research Position** — Pernyataan eksplisit posisi riset terhadap studi sebelumnya
- **Straw man comparison** — Memilih baseline lemah agar metode sendiri terlihat lebih baik

---

## Template A.3 — Literature Mapping & Gap Identification

```
LITERATURE MAPPING

Topik      : Integrasi Sistem Informasi Bisnis dengan Machine Learning
Database   : Google Scholar, IEEE Xplore
Query      : "machine learning business information system integration" OR "ML for business decision system"
Tahun      : 2020–2024
Hasil awal : 25 paper → Screening → 5 paper final

### Literature Matrix (Concept-Centric)

| Study                | Tahun | Method                                      | Data                          | Result                                              | Limitation                                      |
|----------------------|-------|---------------------------------------------|-------------------------------|-----------------------------------------------------|-------------------------------------------------|
| Panjaitan et al.     | 2024  | Machine Learning (regresi, klasifikasi, clustering) | Data historis bisnis          | Meningkatkan efisiensi & prediksi bisnis            | Tidak ada evaluasi performa (akurasi, dll)       |
| Emor et al.          | 2024  | Machine Learning + IoT                      | Data stok UMKM                | Monitoring stok otomatis                            | Skala kecil (tidak generalisasi)                 |
| Viryawan et al.      | 2021  | Machine Learning                            | Data maintenance industri     | Prediksi kerusakan/maintenance                      | Hanya pada domain industri tertentu              |
| Safira               | 2020  | Data Analytics + Machine Learning           | Data transaksi digital        | Optimasi sistem pembayaran                          | Fokus pada sektor keuangan                       |
| Nugroho et al.       | 2020  | Enterprise Architecture Planning            | Data organisasi               | Perencanaan sistem informasi                        | Tidak menggunakan ML secara langsung             |

Pola yang ditemukan:
  Metode dominan     : Machine Learning (regresi, klasifikasi, clustering)
  Dataset umum       : Data historis bisnis (transaksi, pelanggan, inventaris)
  Limitasi berulang  : Tidak ada evaluasi performa, dataset terbatas, domain spesifik

GAP IDENTIFICATION

Gap 1: [Jenis: Performance Gap]
  Deskripsi    : Banyak penelitian tidak mengevaluasi performa model secara kuantitatif
  Bukti        : Studi Panjaitan (2024) hanya menyebut peningkatan tanpa metrik akurasi
  Signifikansi : Sulit membandingkan metode dan memastikan keakuratan sistem
Gap 2: [Jenis: Data + Context Gap]
  Deskripsi    : Dataset terbatas dan hanya digunakan pada domain tertentu
  Bukti        : Studi UMKM dan industri spesifik tidak bisa digeneralisasi
  Signifikansi : Model tidak bisa diterapkan secara luas di berbagai sektor bisnis

### Baseline Selection

| Baseline                          | Relevansi                                              | Representatif                                      | Source                |
|----------------------------------|--------------------------------------------------------|---------------------------------------------------|-----------------------|
| Rule-Based Business System       | Sama-sama digunakan untuk pengambilan keputusan bisnis | Pendekatan tradisional sebelum ML banyak digunakan | Nugroho et al., 2020  |
| Basic Machine Learning (Regression Model) | Digunakan untuk prediksi dalam sistem bisnis          | Metode umum dan paling sering digunakan dalam studi | Panjaitan et al., 2024 |
```

---

## Latihan 1 — Concept-Centric Literature Table

Gunakan topik riset dari WS-02. Cari minimal 5 paper relevan menggunakan Google Scholar atau database lain.

**Topik riset:** *Analisis Komparatif Algoritma Machine Learning dan Seleksi Fitur untuk Klasifikasi Penyakit Jantung pada Dataset Medis.*

**Query pencarian:** *"machine learning" AND "heart disease classification" AND ("chi-square" OR "feature selection")* 

**Database:** *Google Scholar, IEEE Xplore, Kaggle/UCI Repo, dan Jurnal Nasional (Sinta).* 

### Literature Matrix (Concept-Centric)

| Study                     | Tahun | Method                          | Dataset                                      | Result                                      | Limitation                                              |
|--------------------------|-------|----------------------------------|---------------------------------------------|---------------------------------------------|---------------------------------------------------------|
| Hirmayanti & Utami       | 2025  | KNN, NB, LR, SVM, RF + Chi-square| Heart Disease Cleveland (UCI)                | KNN akurasi 93.51% (dengan 8 fitur utama)   | Hanya dievaluasi pada algoritma dasar, belum ensemble kompleks |
| Yulianto et al.          | 2024  | Random Forest + SMOTE            | Dataset Penyakit Jantung                     | SMOTE berhasil mengatasi data tidak seimbang| Fokus hanya pada Random Forest (tidak komparatif luas)  |
| Jusia et al.             | 2024  | KNN & C4.5 + Particle Swarm (PSO)| Dataset Penyakit Jantung                     | PSO signifikan meningkatkan performa KNN    | Komputasi sangat lambat akibat proses PSO (metaheuristik)|
| Sarra et al.             | 2022  | SVM + Chi-square                 | Cleveland & Statlog                          | SVM akurasi 89.40% (dengan 6 fitur)         | Performa menurun pada dataset dengan noise tinggi        |
| Reddy et al.             | 2021  | SMO, NB, LR, KNN + CFS/Relief    | Heart Disease Cleveland                      | SMO unggul dengan akurasi 86.46%            | Akurasi keseluruhan masih di bawah 90% pada semua model  |

**Pola yang terlihat — Metode dominan:** *Penerapan Machine Learning tradisional (terutama KNN, Random Forest, dan SVM) mendominasi riset klasifikasi penyakit jantung. Hampir seluruh studi mengandalkan tahap preprocessing ekstra seperti Feature Selection (Chi-square, PSO, CFS) atau Data Balancing (SMOTE) untuk mendongkrak akurasi model pada dataset berukuran kecil hingga menengah.* 

**Limitasi yang berulang:** *Banyak studi mencapai akurasi baik, namun terbatas pada satu atau dua algoritma (kurang komprehensif), atau masih terjebak di akurasi 80-89% tanpa optimasi hyperparameter (GridSearchCV) secara maksimal.* 

---

## Latihan 2 — Gap Identification

Berdasarkan tabel di Latihan 1, identifikasi gap.

| Jenis Gap | Ditemukan? | Gap Statement |
|-----------|-----------|---------------|
| Performance Gap | [x] Ya / [ ] Tidak | *Mayoritas penelitian sebelumnya seperti Reddy (2021) dan Sarra (2022) masih menghasilkan akurasi di bawah 90% karena pemilihan parameter algoritma yang kurang optimal.* |
| Method Gap | [x] Ya / [ ] Tidak | *Belum banyak penelitian yang menggabungkan perbandingan 5 algoritma sekaligus (KNN, NB, LR, SVM, RF) yang dikombinasikan dengan Chi-square Feature Selection DAN optimasi hyperparameter (GridSearchCV).* |
| Data Gap | [ ] Ya / [x] Tidak | *Tidak ada data gap signifikan, rata-rata riset menggunakan dataset Cleveland yang tervalidasi secara medis.* |
| Context Gap | [x] Ya / [ ] Tidak | *Model yang dioptimasi masih jarang diimplementasikan sebagai landasan sistem deteksi mandiri yang efisien (hanya berhenti pada eksperimen metrik evaluasi).* |

**Gap utama yang dipilih:** (Kekosongan komparasi algoritma Machine Learning yang ekstensif menggunakan kombinasi seleksi fitur Chi-square dan hyperparameter tuning GridSearchCV untuk mendapatkan akurasi di atas 93% pada dataset medis yang tidak seimbang).
**Mengapa gap ini penting (bukan sekadar "belum ada yang meneliti")?**
> Gap ini sangat esensial karena dalam deteksi kardiovaskular/penyakit jantung, setiap peningkatan 1% akurasi dapat menyelamatkan nyawa pasien (mengurangi tingkat *false negative*). Jika kita hanya menggunakan algoritma bawaan tanpa seleksi fitur dan optimasi, banyak fitur yang redundan/tidak relevan justru merusak prediksi model. Mengisi gap ini berarti membangun model diagnosis medis yang jauh lebih ringkas (fitur lebih sedikit), komputasinya ringan, namun sangat akurat secara klinis.

---

## Latihan 3 — Baseline Selection

Pilih 2 baseline dari literatur yang sudah dibaca.

| # | Baseline                           | Mengapa Relevan                                                                           | Mengapa Representatif                                                                  | Apakah SOTA?                                                             | Sumber                    |
|---|------------------------------------|-------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|---------------------------------------------------------------------------|---------------------------|
| 1 | SVM + Chi-square                   | Merupakan salah satu metode paling stabil untuk klasifikasi penyakit jantung berdimensi kecil | Banyak digunakan di studi medis karena sifat hyperplane-nya yang kokoh                 | Bukan, namun metrik 89% adalah baseline standar yang sangat baik          | Sarra et al. (2022)       |
| 2 | Model Dasar (Tanpa Seleksi Fitur)  | Menggunakan model yang di-train dengan seluruh dataset awal (14 atribut)                  | Praktik konvensional sebelum masuk ke tahap optimasi dan seleksi                       | Bukan, digunakan sebagai pembanding untuk membuktikan peran seleksi fitur | Reddy et al. (2021)       |
**Apakah pemilihan baseline ini bisa dianggap straw man?** [ ] Ya / [x] Tidak
> Justifikasi: Baseline ini sangat adil. Dengan membandingkan model kita terhadap model SVM beroptimasi fitur (Sarra 2022) dan model dasar konvensional (Reddy 2021), riset kita dapat membuktikan apakah metode baru (misalnya KNN + Chi-Square + GridSearchCV) memberikan peningkatan nyata (significant improvement) secara *state-of-the-art*, atau hanya kebetulan semata. Ini menjauhkan riset dari *straw man comparison*.

---

## Refleksi

> Apa perbedaan antara "belum ada yang meneliti ini" (klaim tanpa bukti) dengan research gap yang valid? Bagaimana cara membuktikan bahwa sebuah gap benar-benar ada?

**Jawaban:**
> Perbedaan mendasar terletak pada basis pembuktiannya. Pernyataan "belum ada yang meneliti ini" sering kali merupakan klaim subjektif (asumsi) karena keterbatasan pencarian literatur, sementara research gap yang valid adalah kesenjangan pengetahuan yang ditemukan setelah melakukan tinjauan sistematis terhadap literatur yang ada. Gap yang valid tidak hanya menyatakan "apa yang tidak ada", tetapi juga menjelaskan mengapa "apa yang sudah ada" belum cukup atau gagal menyelesaikan masalah dalam kondisi tertentu.
> ___________________________________________________
