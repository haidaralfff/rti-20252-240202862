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

**Topik riset:*Analisis Komparatif Algoritma Machine Learning untuk Klasifikasi Penyakit pada Dataset Klinis Skala Kecil-Menengah di Indonesia.* ________________________________________
**Query pencarian:*machine learning" AND "comparative study" AND "small medical dataset" AND "Indonesia" AND "accuracy* ____________________________________
**Database:*Google Scholar, IEEE Xplore, ResearchGate, dan Neliti (Repositori Jurnal Indonesia).* ___________________________________________

### Literature Matrix (Concept-Centric)

| Study                     | Tahun | Method                          | Dataset                                      | Result                                      | Limitation                                              |
|--------------------------|-------|----------------------------------|---------------------------------------------|---------------------------------------------|---------------------------------------------------------|
| Prasetyo et al.          | 2023  | KNN vs Naive Bayes               | Rekam medis penyakit jantung (lokal)         | KNN akurasi 88.5%                           | Sensitif terhadap outliers pada data kecil               |
| Wicaksono & Santoso      | 2024  | CNN vs SVM (Citra X-ray)         | Citra TB paru (dataset RS daerah)            | CNN AUC 0.94                                | Membutuhkan komputasi tinggi (GPU)                       |
| Lestari et al.           | 2024  | Random Forest & ANN              | Dataset diabetes & hipertensi                | RF lebih stabil pada data < 500              | ANN sulit diinterpretasi secara klinis                   |
| Hidayat et al.           | 2025  | Optimized XGBoost                | Risiko stunting (Kaggle Indonesia)           | F1-Score 0.91                               | Overfitting jika data tidak seimbang                     |
| Nugroho & Putri          | 2026  | Ensemble Learning (Hybrid)       | Multi-disease (jantung & ginjal)             | Akurasi naik 5% dibanding model tunggal      | Kompleksitas tinggi untuk implementasi di sistem RS      |

**Pola yang terlihat — Metode dominan:*Metode Supervised Learning konvensional (terutama KNN, Random Forest, dan SVM) masih menjadi pilihan utama untuk data klinis berbentuk rekam medis (tabular) karena efisiensinya pada sampel kecil. Namun, terdapat pergeseran kuat ke arah Convolutional Neural Networks (CNN) untuk riset berbasis citra medis (X-ray/USG) guna mencapai sensitivitas diagnosis yang lebih tinggi.* 

**Limitasi yang berulang:*Masalah Ketidakseimbangan Data (Data Imbalance) antara jumlah pasien sehat dan sakit, serta kecilnya ukuran dataset (small-scale dataset) yang berasal dari satu rumah sakit saja, sehingga model sering kali mengalami overfitting dan sulit untuk diterapkan secara general di faskes lain di Indonesia.* 

---

## Latihan 2 — Gap Identification

Berdasarkan tabel di Latihan 1, identifikasi gap.

| Jenis Gap | Ditemukan? | Gap Statement |
|-----------|-----------|---------------|
| Performance Gap | [x] Ya / [ ] Tidak | *Akurasi model (seperti CNN atau KNN) menurun drastis hingga di bawah 75% saat diuji pada dataset dengan tingkat imbalance yang tinggi.* |
| Method Gap | [x] Ya / [ ] Tidak |*Belum ada penggunaan teknik optimasi parameter (seperti Hyperparameter Tuning) yang sistematis pada perbandingan KNN, CNN, dan RF untuk dataset klinis lokal.* |
| Data Gap | [x] Ya / [ ] Tidak |*Dataset yang digunakan pada studi sebelumnya bersifat privat dan sangat kecil (<300 baris), sehingga reliabilitas model untuk skala rumah sakit menengah diragukan.* |
| Context Gap | [x] Ya / [ ] Tidak |*Mayoritas riset dilakukan pada data rumah sakit kota besar; belum ada evaluasi efektivitas algoritma pada infrastruktur data di rumah sakit daerah dengan kualitas citra/input yang tidak seragam.* |

**Gap utama yang dipilih:** (Ketiadaan standar komparatif algoritma ML yang dioptimasi untuk dataset klinis skala kecil-menengah di Indonesia).
**Mengapa gap ini penting (bukan sekadar "belum ada yang meneliti")?**
> Gap ini penting karena kesalahan dalam memilih algoritma pada dataset kecil berisiko tinggi menghasilkan False Positive atau False Negative dalam diagnosis medis. Tanpa adanya kajian komparatif yang sistematis (bukan sekadar coba-coba satu metode), pihak rumah sakit tidak memiliki panduan berbasis bukti (evidence-based) untuk memilih teknologi yang paling hemat sumber daya namun tetap akurat. Jika hanya menggunakan model "berat" seperti CNN tanpa pembanding, risiko overfitting pada data kecil sangat besar, yang justru akan membahayakan keselamatan pasien jika hasil predisinya salah.

---

## Latihan 3 — Baseline Selection

Pilih 2 baseline dari literatur yang sudah dibaca.

| # | Baseline                           | Mengapa Relevan                                                                           | Mengapa Representatif                                                                  | Apakah SOTA?                                                             | Sumber                    |
|---|------------------------------------|-------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|---------------------------------------------------------------------------|---------------------------|
| 1 | KNN (K-Nearest Neighbor)           | Digunakan untuk klasifikasi data medis berbasis teks/tabular dengan jumlah fitur terbatas | Sering digunakan sebagai pembanding awal dalam riset kesehatan karena kesederhanaannya | Bukan, namun tetap menjadi common practice untuk dataset kecil           | Prasetyo et al., 2023     |
| 2 | CNN (Convolutional Neural Network) | Relevan untuk pengolahan data citra medis (seperti X-ray/USG)                             | Merupakan standar industri saat ini untuk deteksi otomatis di bidang medis             | Ya, merupakan State-of-the-Art (SOTA) untuk computer vision di kesehatan | Wicaksono & Santoso, 2024 |
**Apakah pemilihan baseline ini bisa dianggap straw man?** [ ] Ya / [x] Tidak
> Justifikasi: Pemilihan baseline ini bukan straw man karena melibatkan dua spektrum algoritma yang berbeda namun valid. KNN mewakili algoritma statistik konvensional yang tangguh untuk data kecil, sedangkan CNN mewakili standar tercanggih saat ini. Dengan membandingkan keduanya, riset ini benar-benar menguji apakah kompleksitas Deep Learning (CNN) memberikan hasil yang lebih baik secara signifikan daripada metode sederhana (KNN) dalam konteks dataset lokal yang terbatas, bukan sekadar membandingkan dengan algoritma yang sudah usang atau tidak relevan.

---

## Refleksi

> Apa perbedaan antara "belum ada yang meneliti ini" (klaim tanpa bukti) dengan research gap yang valid? Bagaimana cara membuktikan bahwa sebuah gap benar-benar ada?

**Jawaban:**
> Perbedaan mendasar terletak pada basis pembuktiannya. Pernyataan "belum ada yang meneliti ini" sering kali merupakan klaim subjektif (asumsi) karena keterbatasan pencarian literatur, sementara research gap yang valid adalah kesenjangan pengetahuan yang ditemukan setelah melakukan tinjauan sistematis terhadap literatur yang ada. Gap yang valid tidak hanya menyatakan "apa yang tidak ada", tetapi juga menjelaskan mengapa "apa yang sudah ada" belum cukup atau gagal menyelesaikan masalah dalam kondisi tertentu.
> ___________________________________________________
