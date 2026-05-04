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
   - Pertanyaan pertama saya: Dataset apa yang digunakan? Apakah ada bias pelabelan atau overfitting?
   - Data yang dibutuhkan untuk verifikasi: Metrik evaluasi lengkap (Precision, Recall), metode pembagian dataset, dan justifikasi proses pra-pemrosesan.

2. Posisi paradigma:
   - Pendekatan: [☑] Positivis  [] Interpretivis  [ ] Design Science  [ ] Mixed
   - Alasan: Karena penelitian ini berfokus pada hasil pengukuran kuantitatif (akurasi algoritma) secara objektif.

3. Identifikasi distorsi:
   - Asumsi tersembunyi: Asumsi independensi atribut (kata) pada Naive Bayes selalu berlaku.
   - Sumber bias potensial: Pelabelan (labeling) data sentimen secara manual.
   - Langkah mitigasi: Evaluasi dengan *inter-rater reliability* saat melabeli data, atau komparasi dengan algoritma lain.

4. Komitmen etika:
   - Data yang tidak akan dimanipulasi: Hasil pengukuran Precision dan Recall yang rendah pada kelas tertentu.
   - Batasan yang diakui sejak awal: Data hanya berjumlah 873 komentar dan diambil dari satu proses crawling manual.
```

---

## Latihan 1 — Identifikasi Distorsi

Pilih satu paper riset di bidang TI yang mengklaim "metode X meningkatkan performa." Telusuri setiap tahap Research Trust Model.

**Paper yang dipilih:**
> Judul: Algoritma Machine Learning Naive Bayes pada Analisis Sentimen Kesepakatan Polri dan GNPF-MUI pada Aksi Bela Islam III '212'
> Penulis (Tahun): Hananto et al. (2023)

| Tahap | Apa yang Dilakukan | Potensi Distorsi |
|-------|-------------------|-----------------|
| Reality → Data | *Melakukan crawling 873 komentar dan melabelinya menjadi sentimen positif/negatif secara manual.* | *Selection bias & Human Bias: 873 sampel terlalu kecil untuk isu nasional, dan pelabelan manual rentan subjektivitas.* |
| Data → Processing | *Pre-processing teks (cleaning) dan pembobotan menggunakan TF-IDF.* | *Information loss: Penghapusan kata (stopword removal) mungkin menghilangkan konteks sarkasme atau emosi asli.* |
| Processing → Analysis | *Melatih model Naive Bayes menggunakan RapidMiner pada dataset yang ada.* | *Algorithmic Bias: Asumsi independensi Naive Bayes sering meleset pada kalimat bahasa manusia yang saling terkait.* |
| Analysis → Inference | *Menyimpulkan model "baik" dengan Akurasi 89,70% dan Recall kelas negatif 100%.* | *Mengabaikan fakta bahwa Precision kelas negatif hanya 70,19% (artinya banyak salah prediksi).* |
| Inference → Knowledge | *Mengklaim efektivitas metode Naive Bayes untuk analisis sentimen opini masyarakat.* | *Overgeneralization: Menyimpulkan keandalan metode tanpa membandingkannya (baseline) dengan algoritma lain (misal SVM).* |

**Distorsi paling besar di tahap:** *Reality → Data (Pelabelan sentimen secara manual pada isu sensitif sangat rentan terhadap bias personal penilai, serta jumlah data 873 komentar sangat tidak representatif untuk opini skala nasional).*

**Dua distorsi spesifik yang teridentifikasi:**
1. *Measurement Bias / Human Bias* (terjadi saat proses pelabelan opini secara manual).
2. *Overgeneralization* (kesimpulan efektivitas model yang ditarik hanya dari satu kasus tanpa uji algoritma komparatif).

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

**Topik riset:** *Analisis Sentimen Kesepakatan Polri dan GNPF-MUI pada Aksi Bela Islam III '212' menggunakan Algoritma Machine Learning Naive Bayes.*

| Kriteria | Positivis | Interpretivis | Design Science |
|----------|-----------|---------------|----------------|
| Kesesuaian dengan topik (1–5) | *5* | *2* | *3* |
| Jenis data yang dikumpulkan | *Kuantitatif (Nilai probabilitas TF-IDF, metrik performa: Akurasi, Precision, Recall)* | *Kualitatif (Pemahaman makna dan nuansa bahasa saat melabeli sentimen opini teks secara manual)* | *Pembuatan artefak (Model klasifikasi Naive Bayes di RapidMiner)* |
| Limitasi paradigma | *Gagal menangkap makna sarkasme mendalam atau konteks emosi kompleks di balik teks komentar.* | *Labeling yang sangat subjektif membuat hasil sulit direproduksi dengan presisi sama oleh orang lain.* | *Sistem yang berjalan di RapidMiner belum tentu efisien jika diimplementasikan secara real-time pada skala besar.* |

**Paradigma yang dipilih:** *Positivis.*
**Alasan:** *Walaupun data awalnya berupa teks opini masyarakat yang sangat subjektif (kualitatif), tujuan utama penelitian ini adalah mengukur secara empiris dan matematis (kuantitatif) seberapa akurat algoritma Naive Bayes dalam mengklasifikasikan teks tersebut. Karena kesimpulan ditarik sepenuhnya berdasarkan statistik metrik evaluasi model (seperti Akurasi 89.70%), maka pendekatan yang mendominasi adalah Positivis.*

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

