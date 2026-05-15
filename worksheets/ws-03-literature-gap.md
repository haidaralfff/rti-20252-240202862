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

```text
LITERATURE MAPPING

Topik      : Perbandingan Kinerja RESTful API pada Berbagai Framework Backend
Database   : Google Scholar, IEEE Xplore
Query      : "performance comparison" AND "backend framework" AND "REST API" OR ("Laravel" AND "Express.js")
Tahun      : 2020–2025
Hasil awal : 25 paper → Screening → 5 paper final

### Literature Matrix (Concept-Centric)

| Study                   | Tahun | Method                                      | Dataset/Beban                | Result                                              | Limitation                                      |
|-------------------------|-------|---------------------------------------------|------------------------------|-----------------------------------------------------|-------------------------------------------------|
| Siahaan & Wijaya        | 2024  | JMeter (Laravel vs ExpressJs)               | Data mahasiswa (100-1000 user)| Laravel unggul waktu respon rata-rata 1745.7 ms.    | Tidak menguji pada beban yang sangat besar.     |
| Purwanto                | 2023  | Postman (Flask vs Laravel vs Express)       | 9000 baris data (3-6 vUser)  | Express.js lebih unggul dalam response time.        | Virtual user sangat kecil (hanya 3 s.d 6).      |
| Supria et al.           | 2024  | Apache Benchmark (Laravel/Flask/PHP Native) | Data AIS (10-10k entri)      | PHP Native unggul data kecil, Flask stabil data besar.| Tidak menguji framework Node.js atau Java.      |
| Hadinata & Stianingsih  | 2024  | JMeter (Express.js vs Laravel)              | 1500 baris (100-1500 user)   | Express.js unggul response time (48 ms) dan memory. | Hanya menguji 2 framework.                      |
| Azzahidi et al.         | 2025  | K6 (Spring Boot/Flask/Express/Laravel/Gin)  | KRS Unsoed (hingga 1jt data) | Spring Boot unggul throughput, Gin sangat stabil.   | Lingkungan server lokal berisiko bias performa. |

Pola yang ditemukan:
  Metode dominan     : Load testing menggunakan alat standar (JMeter, K6, Apache Benchmark).
  Dataset umum       : Data dummy dari instansi (data mahasiswa, data AIS, dll).
  Limitasi berulang  : Hasil performa bisa saling berkebalikan (misal Laravel vs Express) tergantung spesifikasi server dan jumlah request.

GAP IDENTIFICATION

Gap 1: [Jenis: Performance Gap]
  Deskripsi    : Hasil riset mengenai framework tercepat masih belum konsisten dan saling kontradiktif.
  Bukti        : Siahaan & Wijaya (2024) menyimpulkan Laravel lebih cepat dari Express.js, sedangkan Hadinata & Stianingsih (2024) dan Purwanto (2023) menyimpulkan sebaliknya.
  Signifikansi : Tidak ada konsensus kuat mengenai framework mana yang benar-benar unggul secara objektif.
Gap 2: [Jenis: Data + Context Gap]
  Deskripsi    : Sebagian besar penelitian (kecuali Azzahidi et al., 2025) hanya menggunakan beban data yang kecil hingga menengah (di bawah 10.000 data).
  Bukti        : Purwanto hanya menggunakan 6 virtual user, dan Siahaan hanya 1.000 user.
  Signifikansi : Performa framework saat beban ekstrem (seperti serangan jutaan request) belum banyak dieksplorasi secara bersamaan untuk 5 framework modern.

### Baseline Selection

| Baseline                          | Relevansi                                              | Representatif                                      | Source                |
|-----------------------------------|--------------------------------------------------------|----------------------------------------------------|-----------------------|
| Express.js                        | Sama-sama diuji sebagai framework backend              | Framework Node.js paling dominan dan populer       | Hadinata (2024)       |
| Laravel                           | Diuji kinerjanya pada sistem berbasis data relasional  | Standar de-facto untuk pengembangan web PHP        | Siahaan (2024)        |
```

---

## Latihan 1 — Concept-Centric Literature Table

Gunakan topik riset dari WS-02. Cari minimal 5 paper relevan menggunakan Google Scholar atau database lain.

**Topik riset:** *Evaluasi Komprehensif Performa REST API pada Lima Framework Backend Modern (Express.js, Laravel, Flask, Spring Boot, Gin) dalam Menangani Skala Data Besar.*

**Query pencarian:** *"REST API performance" AND ("Express.js" OR "Laravel") AND "throughput"* 

**Database:** *Google Scholar, IEEE Xplore, Jurnal Nasional (Sinta).* 

### Literature Matrix (Concept-Centric)

| Study                     | Tahun | Method                          | Dataset                                      | Result                                      | Limitation                                              |
|---------------------------|-------|---------------------------------|----------------------------------------------|---------------------------------------------|---------------------------------------------------------|
| Siahaan & Wijaya          | 2024  | JMeter (Laravel vs ExpressJs)   | Data mahasiswa (hingga 1.000 user)           | Laravel menang di waktu respon (1745ms).    | Hasil anomali (biasanya Express lebih cepat), rentan bias.|
| Purwanto                  | 2023  | Postman (Flask/Laravel/Express) | 9000 data, 3-6 virtual user                  | Express.js tercepat (53ms), bebas error.    | Beban virtual user yang diuji sangat ringan.            |
| Supria et al.             | 2024  | Apache Bench (Laravel/Flask/PHP)| Data AIS Polbeng (10k entri)                 | Flask terbukti lebih stabil di beban besar. | Hanya mencakup ekosistem PHP dan Python.                |
| Hadinata & Stianingsih    | 2024  | JMeter (Express vs Laravel)     | Data Karyawan (1500 baris, 1500 user)        | Express.js lebih unggul dalam CPU & Memori. | Skala pengujian masih tergolong menengah.               |
| Azzahidi et al.           | 2025  | K6 (Spring/Flask/Express/Gin)   | Data KRS Unsoed (hingga 1.000.000 data)      | Spring Boot & Gin menang di beban berat.    | Pengujian berjalan di OS virtual (WSL2), bukan native.  |

**Pola yang terlihat — Metode dominan:** *Penerapan metode Load Testing kuantitatif mendominasi riset performa API (menggunakan JMeter atau K6). Hampir seluruh studi memfokuskan pengukuran pada Response Time dan penggunaan Resource (CPU/Memory).*

**Limitasi yang berulang:** *Banyak studi (kecuali paper no. 5) yang hanya memberikan beban (load) dalam jumlah sangat kecil (ratusan hingga ribuan), sehingga tidak mensimulasikan kondisi aplikasi web modern saat menerima jutaan hit trafik secara bersamaan.*

---

## Latihan 2 — Gap Identification

Berdasarkan tabel di Latihan 1, identifikasi gap.

| Jenis Gap | Ditemukan? | Gap Statement |
|-----------|-----------|---------------|
| Performance Gap | [x] Ya / [ ] Tidak | *Terdapat ketidaksesuaian/kontradiksi hasil antar paper mengenai framework mana yang paling unggul (Laravel menang di Paper 1, namun kalah telak dari Express.js di Paper 4).* |
| Method Gap | [ ] Ya / [x] Tidak | *Tidak ada method gap, semua menggunakan tool standar (JMeter/K6).* |
| Data Gap | [x] Ya / [ ] Tidak | *Mayoritas penelitian masih membatasi ukuran dataset pengujian di bawah 10.000 record, sehingga belum menguji batas _bottleneck_ framework secara penuh.* |
| Context Gap | [x] Ya / [ ] Tidak | *Framework terbaru atau versi _compiled_ dari bahasa (seperti Gin untuk Golang atau FrankenPHP untuk Laravel) masih jarang diteliti performa ekstremnya secara komparatif.* |

**Gap utama yang dipilih:** (Kekosongan konsensus mengenai performa ekstrem komparatif dari kelima framework backend (Express, Laravel, Flask, Spring, Gin) saat dihadapkan pada pengujian dengan beban skala masif hingga jutaan request, untuk melihat _breaking point_ CPU dan Memory secara nyata).
**Mengapa gap ini penting (bukan sekadar "belum ada yang meneliti")?**
> Gap ini esensial karena di level produksi perusahaan (Enterprise), kegagalan sistem terjadi saat beban trafik ekstrem (traffic spikes), bukan saat beban rendah. Menguji framework di skala 1.000 user mungkin memperlihatkan framework A menang, namun di skala 1.000.000 user, framework A bisa mengalami _memory leak_ dan framework B yang lebih stabil justru bertahan. Membuktikan ini akan menyelamatkan _cost_ infrastruktur server perusahaan.

---

## Latihan 3 — Baseline Selection

Pilih 2 baseline dari literatur yang sudah dibaca.

| # | Baseline                           | Mengapa Relevan                                                                           | Mengapa Representatif                                                                  | Apakah SOTA?                                                             | Sumber                    |
|---|------------------------------------|-------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|---------------------------------------------------------------------------|---------------------------|
| 1 | Express.js                         | Digunakan secara masif sebagai framework ringan untuk microservices                       | Node.js merupakan _runtime_ backend non-blocking I/O yang sangat populer               | Ya, sering dijadikan tolak ukur kecepatan I/O                             | Hadinata dkk. (2024)      |
| 2 | Laravel                            | Sering digunakan untuk aplikasi web skala menengah dan besar yang bergantung pada basis data | Merupakan framework MVC PHP paling populer di seluruh dunia saat ini                   | Bukan yang paling mutakhir secara performa, tapi *de-facto* di industri   | Siahaan & Wijaya (2024)   |

**Apakah pemilihan baseline ini bisa dianggap straw man?** [ ] Ya / [x] Tidak
> Justifikasi: Baseline ini sangat adil. Express.js terkenal dengan kecepatannya, dan Laravel terkenal dengan kepopulerannya. Jika kita membandingkan Spring Boot atau Gin melawan kedua framework raksasa ini, itu adalah perbandingan *apples-to-apples* dari framework yang benar-benar digunakan secara meluas di industri perangkat lunak dunia.

---

## Refleksi

> Apa perbedaan antara "belum ada yang meneliti ini" (klaim tanpa bukti) dengan research gap yang valid? Bagaimana cara membuktikan bahwa sebuah gap benar-benar ada?

**Jawaban:**
> Perbedaan mendasar terletak pada basis pembuktiannya. Pernyataan "belum ada yang meneliti ini" sering kali merupakan klaim subjektif (asumsi) karena peneliti malas membaca. Sementara research gap yang valid adalah kesenjangan pengetahuan yang ditemukan setelah melakukan tinjauan sistematis. Misalnya, saya membuktikan "Gap Data" dengan membuat tabel literatur, yang secara eksplisit menunjukkan bahwa Paper 1, 2, 3, dan 4 secara konsisten hanya menggunakan data di bawah 10.000 record. Bukti tabel ini mensahkan klaim bahwa riset performa beban jutaan record belum tuntas dijawab.
> ___________________________________________________
