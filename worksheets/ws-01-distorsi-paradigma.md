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
   - Pertanyaan pertama saya: Dataset apa yang digunakan? Apakah ada bias atau overfitting?
   - Data yang dibutuhkan untuk verifikasi: Dataset testing vs training, Confusion matrix, dan Metode evaluasi (misal cross-validation).

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
> Judul: Klasifikasi Penyakit Diabetes Mellitus Menggunakan Algoritma Support Vector Machine (SVM)
> Penulis (Tahun): Penulis Anonim (Contoh kasus adaptasi dari tema Machine Learning WS-04)

| Tahap | Apa yang Dilakukan | Potensi Distorsi |
|-------|-------------------|-----------------|
| Reality → Data | *Mengumpulkan dataset rekam medis pasien diabetes dari satu rumah sakit.* | *Selection bias: Pasien di satu RS mungkin tidak merepresentasikan seluruh populasi.* |
| Data → Processing | *Membersihkan data kosong (missing values) dan menormalisasi skala fitur.* | *Menghapus data penting secara tidak sengaja atau merusak distribusi asli (information loss).* |
| Processing → Analysis | *Melatih model klasifikasi (SVM) pada dataset yang sudah diproses.* | *Overfitting karena dataset terlalu kecil dan tidak menggunakan metode cross-validation.* |
| Analysis → Inference | *Menyimpulkan bahwa SVM mencapai akurasi 95% untuk deteksi diabetes.* | *Mengabaikan metrik kritis medis seperti False Negative (pasien sakit didiagnosis sehat).* |
| Inference → Knowledge | *Mengklaim bahwa SVM adalah algoritma terbaik untuk diagnosa medis tanpa komparator.* | *Overgeneralization: Klaim terlalu luas dan merupakan asumsi straw man.* |

**Distorsi paling besar di tahap:** *Analysis → Inference (karena menyimpulkan keberhasilan hanya dari 1 metrik akurasi tanpa memedulikan metrik esensial medis).*

**Dua distorsi spesifik yang teridentifikasi:**
1. Selection bias (Pada saat pengumpulan data medis).
2. Overgeneralization (Pada saat membuat klaim keandalan metode).

---

## Latihan 2 — Analisis Kasus Etika

Skenario: Seorang peneliti menemukan bahwa jika 3 data point outlier dihapus, hasil eksperimennya menjadi signifikan. Dengan outlier, hasilnya tidak signifikan.

| Perspektif | Analisis |
|------------|---------|
| Kejujuran ilmiah | *Laporkan kedua hasil (dengan dan tanpa outlier) agar pembaca mengetahui efek data anomali.* |
| Transparansi | *Jelaskan metodologi dan justifikasi logis secara transparan di balik penghapusan outlier tersebut.* |
| Peer review | *Menyediakan dataset dan kode simulasi agar reviewer dapat mengecek kebenaran klaim.* |

**Keputusan akhir dan justifikasi:**
> *Saya akan melaporkan hasil riset baik yang menggunakan seluruh data maupun yang membuang outlier, lalu memberikan pembahasan khusus mengapa 3 data tersebut diabaikan. Menyembunyikan outlier hanya agar temuan tampak signifikan adalah praktik HARKing/p-hacking yang tidak etis. Dengan pelaporan ganda, validitas riset tetap terjaga dan dapat direproduksi.*

---

## Latihan 3 — Posisi Paradigma

**Topik riset:** *Analisis Komparatif Algoritma Machine Learning untuk Klasifikasi Penyakit pada Dataset Klinis Skala Kecil-Menengah di Indonesia.*

| Kriteria | Positivis | Interpretivis | Design Science |
|----------|-----------|---------------|----------------|
| Kesesuaian dengan topik (1–5) | *5* | *1* | *4* |
| Jenis data yang dikumpulkan | *Kuantitatif (Rekam medis pasien, Metrik evaluasi ML seperti Akurasi, F1-Score)* | *Kualitatif (Wawancara dokter terkait kepuasan diagnosis)* | *Pembuatan artefak (Model/Sistem prediksi berjalan)* |
| Limitasi paradigma | *Bisa mengabaikan faktor human-error dokter di lapangan nyata.* | *Sulit memberikan ukuran pasti apakah model ML tersebut bagus atau tidak.* | *Cenderung condong ke engineering (pembuatan sistem) daripada penelitian pembuktian.* |

**Paradigma yang dipilih:** *Positivis (dengan dukungan metodologis Design Science).*
**Alasan:** *Topik Machine Learning dan klasifikasi menuntut adanya eksperimen empiris, pengukuran metrik matematis yang objektif (Akurasi, F1-Score), serta pembuktian hipotesis kuantitatif secara statistik. Hal ini selaras 100% dengan prinsip dasar filosofi positivis yang mengejar fakta terukur dan dapat digeneralisasi.*

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

