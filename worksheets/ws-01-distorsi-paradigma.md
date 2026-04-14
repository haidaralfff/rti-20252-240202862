# WS-01: Distorsi & Paradigma

> **Bab 1 — Research Mindset in IT**

---

## Ringkasan Materi

### Research Trust Model

Pengetahuan ilmiah tidak muncul langsung dari kenyataan. Ia melewati **6 tahap transformasi** yang masing-masing rawan distorsi:

```
Reality → Data → Processing → Analysis → Inference → Knowledge
```

Etika mencegah distorsi yang disengaja (fabrikasi, cherry-picking). Validitas mendeteksi distorsi yang tidak disengaja (confounding variable, sampling bias).

### Tiga Jenis Validitas

| Jenis | Pertanyaan | Contoh Ancaman |
|-------|-----------|----------------|
| **Internal Validity** | Apakah hubungan kausal benar ada? | Confounding variable |
| **External Validity** | Apakah bisa digeneralisasi? | Dataset terlalu homogen |
| **Construct Validity** | Apakah mengukur hal yang benar? | Metrik tidak sesuai klaim |

### Paradigma Riset

Mata kuliah ini menggunakan pendekatan **Positivist** (fenomena TI bisa diukur objektif melalui eksperimen terkontrol) diperkuat **Design Science Research** (artefak dibuat sebagai instrumen pengujian hipotesis, bukan tujuan akhir).

### Mode Berpikir Peneliti

**Curious** (mempertanyakan fenomena) → **Critical** (mengevaluasi klaim berdasarkan bukti) → **Systematic** (merancang investigasi terstruktur dan reproducible).

### Research vs Engineering

| Aspek | Engineering | Research |
|-------|------------|----------|
| Tujuan | Membuat sistem yang bekerja | Menghasilkan pengetahuan yang valid |
| Pertanyaan khas | "Bagaimana membuatnya jalan?" | "Apakah klaim ini benar?" |
| Ukuran sukses | Sistem berfungsi, client puas | Hipotesis terjawab, temuan tervalidasi |
| Kegagalan | Harus dihindari | Harus dilaporkan (negative result = kontribusi) |

### Istilah Penting

- **Research Mindset** — Pola pikir yang menuntut bukti dan mempertanyakan asumsi
- **Research Ethics** — Prinsip perilaku: kejujuran, objektivitas, keterbukaan, akuntabilitas
- **HARKing** — Hypothesizing After Results are Known — merumuskan hipotesis setelah melihat data
- **Falsifiability** — Hipotesis harus bisa dibuktikan salah

---

## Template A.1 — Research Mindset Self-Assessment

```
Nama Peneliti    : Haidar Habibi Al Farisi
Tanggal          : 14 April 2026

1. Ketika membaca klaim "metode X 95% akurat":
   - Pertanyaan pertama saya: 
Dataset apa yang digunakan?
-Apakah ada bias atau overfitting?
Data yang dibutuhkan untuk verifikasi:
-Dataset testing vs training
-Confusion matrix
Metode evaluasi (cross-validation / tidak)
   - Data yang dibutuhkan untuk verifikasi: ____________________

2. Posisi paradigma:
   - Pendekatan: [☑] Positivis  [] Interpretivis  [☑] Design Science  [ ] Mixed
   - Alasan: Karena penelitian berbasis data dan menggunakan framework sebagai alat evaluasi.

3. Identifikasi distorsi:
   - Asumsi tersembunyi: Semua instansi memiliki kebutuhan TI yang sama
   - Sumber bias potensial: Dataset paper terbatas
   - Langkah mitigasi: Dominasi studi kasus universitas

4. Komitmen etika:
   - Data yang tidak akan dimanipulasi: Hasil analisis dan interpretasi paper
   - Batasan yang diakui sejak awal: Data hanya dari Indonesia
```

---

## Latihan 1 — Identifikasi Distorsi

Pilih satu paper riset di bidang TI yang mengklaim "metode X meningkatkan performa." Telusuri setiap tahap Research Trust Model.

**Paper yang dipilih:**
> Judul: Pengukuran Kinerja Teknologi Informasi di Indonesia dalam General Control: Literature Review
> Penulis (Tahun): Puguh Jayadi, Puji Sarwono, Melgisaputra Dwi Nanda (2022)

| Tahap | Apa yang Dilakukan | Potensi Distorsi |
|-------|-------------------|-----------------|
| Reality → Data | *Contoh: Kumpulkan log server 30 hari* | *Contoh: Hanya ambil jam sibuk* |
| Data → Processing | | |
| Processing → Analysis | | |
| Analysis → Inference | | |
| Inference → Knowledge | | |

**Distorsi paling besar di tahap:** ________________________

**Dua distorsi spesifik yang teridentifikasi:**
1. Selection bias
2. Overgeneralization

---

## Latihan 2 — Analisis Kasus Etika

Skenario: Seorang peneliti menemukan bahwa jika 3 data point outlier dihapus, hasil eksperimennya menjadi signifikan. Dengan outlier, hasilnya tidak signifikan.

| Perspektif | Analisis |
|------------|---------|
| Kejujuran ilmiah | *Contoh: Laporkan kedua versi (dengan dan tanpa outlier)* |
| Transparansi | |
| Peer review | |

**Keputusan akhir dan justifikasi:**
> ___________________________________________________

---

## Latihan 3 — Posisi Paradigma

**Topik riset:** ________________________________________

| Kriteria | Positivis | Interpretivis | Design Science |
|----------|-----------|---------------|----------------|
| Kesesuaian dengan topik (1–5) | *Contoh: 4* | *Contoh: 2* | *Contoh: 5* |
| Jenis data yang dikumpulkan | | | |
| Limitasi paradigma | | | |

**Paradigma yang dipilih:** _____________________________
**Alasan:** ____________________________________________

---

## Refleksi

> Sebelum membaca materi ini, apakah pernah mempertanyakan klaim "95% akurat"? Setelah memahami rantai distorsi, pertanyaan apa yang sekarang akan diajukan saat membaca paper?

**Jawaban:**
>Setelah memahami materi ini, saya akan bertanya:
Datasetnya bagaimana?
Apakah ada bias?
Bagaimana metode evaluasinya?
Apakah bisa digeneralisasi?
Apakah ada data yang dihilangkan?

