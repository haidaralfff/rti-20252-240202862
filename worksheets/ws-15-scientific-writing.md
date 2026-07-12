# WS-15: Scientific Writing

> **Bab 15 — Penulisan Ilmiah**

---

## Ringkasan Materi

### Scientific Argument Flow

```
Problem → Gap → RQ → Method → Result → Analysis → Conclusion → Contribution
```

Paper ilmiah adalah **satu argumen utuh** dari masalah ke kontribusi. Setiap node harus terhubung logis ke node sebelum dan sesudahnya.

### Struktur IMRAD

| Section | Peran | Pertanyaan Kunci |
|---------|-------|-----------------|
| **Introduction** | Motivasi + frame | Why is this needed? |
| **Method** | Deskripsi (reproducible) | How was it done? |
| **Results** | Laporan objektif | What was found? |
| **Discussion** | Interpretasi + refleksi | What does it mean? |
| **Conclusion** | Ringkasan + kontribusi | So what? |

### Logical Flow — "Red Thread"

Setiap paragraf menjawab satu pertanyaan dan memicu pertanyaan berikutnya. Alur logis ini harus terasa di tiga level:
1. **Antar-kalimat** dalam paragraf
2. **Antar-paragraf** dalam section
3. **Antar-section** dalam paper

### Internal Consistency

Setiap elemen yang dijanjikan di Introduction harus hadir di Discussion/Conclusion.

**Consistency Matrix:**
```
           Intro  Method  Result  Discuss  Conclude
RQ1          ✓      ✓       ✓       ✓        ✓
RQ2          ✓      ✓       ✓       ✗ ←      ✓
Metrik-X     ✗      ✗       ✓ ←     ✗        ✗
```
**Masalah:** RQ2 dibahas di semua bagian kecuali Discussion. Metrik-X muncul di Result tapi tidak diperkenalkan di Method.

### Writing Quality Triad

| Kualitas | Deskripsi | Contoh Buruk → Baik |
|----------|----------|---------------------|
| **Clarity** | Dipahami sekali baca | "Performa meningkat" → "Accuracy meningkat dari 85.3% ke 89.7%" |
| **Precision** | Istilah eksak, tanpa ambiguitas | "signifikan" → "signifikan secara statistik (p=0.003, d=1.2)" |
| **Conciseness** | Setiap kata menambah informasi | Hapus kalimat redundan, filler words |

### Urutan Penulisan yang Disarankan

1. **Method & Results** — paling stabil, tulis pertama
2. **Discussion** — interpretasi berdasarkan hasil
3. **Introduction** — frame sesuai temuan aktual
4. **Abstract & Conclusion** — terakhir

### Target Jumlah Kata

| Section | Target |
|---------|--------|
| Introduction | 500–700 |
| Related Work | 700–1000 |
| Method | 800–1200 |
| Results | 500–800 |
| Discussion | 600–900 |
| Conclusion | 200–400 |

### Jebakan Kognitif

1. "Lebih panjang = lebih lengkap" → conciseness lebih berharga
2. "Introduction harus ditulis pertama" → justru ditulis terakhir
3. "Jargon teknis = lebih ilmiah" → clarity lebih penting
4. "Discussion = ringkasan Results" → Discussion = interpretasi + konteks

---

## Template A.15 — Paper Structure Checklist

```
PAPER STRUCTURE CHECKLIST

Title   : Performance Evaluation of Express.js vs Gin for REST API with Database Query Complexity Workloads
Target  : [x] Jurnal  [ ] Konferensi  [ ] Laporan

Section Check:
  [x] Abstract — masalah: pemilihan framework mempengaruhi performa; metode: evaluasi komparatif k6 dengan 3 skenario; hasil: Gin 4-15x lebih cepat; kontribusi: dataset benchmark publik (max 250 kata)
  [x] Introduction — konteks: arsitektur microservices; gap: belum ada studi multi-skenario database; RQ: 3 pertanyaan evaluasi; kontribusi: dataset, evaluasi multi-skenario, analisis distribusi; struktur paper dijelaskan
  [x] Related Work — concept-centric: Node.js event loop, Go goroutine, Express.js, Gin, database-bound workload, k6; gap positioning: studi sebelumnya terbatas pada skala kecil
  [x] Method — reproducible: desain eksperimen komparatif, IV (Framework, Skenario), DV (latency), metrik (mean, median, p90, p95, p99, IQR, outlier ratio), setup (Docker, PostgreSQL), prosedur (warm-up, 40 replikasi)
  [x] Results — tabel statistik latency + rasio performa + analisis outlier + dampak kompleksitas database (tanpa interpretasi)
  [x] Discussion — interpretasi: compiled vs interpreted, concurrent GC, radix tree routing; perbandingan: studi sebelumnya; implikasi: SLA-based pemilihan; limitation: WSL2, satu database
  [x] Conclusion — jawaban RQ: Gin 4-15x lebih cepat; kontribusi: dataset benchmark, evaluasi multi-skenario, analisis distribusi; future work: production environment, variasi database

Consistency Matrix:
  [x] RQ di Introduction = RQ di Method = RQ di Conclusion (3 RQ konsisten)
  [x] Variabel di Method = variabel di Results (Framework × Skenario)
  [x] Klaim di Discussion didukung data di Results (4-15x, outlier analysis)
  [x] Limitasi di Discussion di-address di Conclusion/Future Work (WSL2, production)

Writing Quality:
  [x] Clarity — mudah dipahami tanpa re-read (paragraf topik → penjelasan → bukti)
  [x] Precision — tidak ada istilah ambigu (angka spesifik: 4.0 ms, 14.76x, 9.3%)
  [x] Conciseness — tidak ada kalimat redundan (setiap kalimat menambah informasi)
```

---

## Latihan 1 — Paper Outline

Buat outline paper untuk riset Anda menggunakan struktur IMRAD.

| Section | Konten Utama (2-3 kalimat) | Target Kata |
|---------|---------------------------|------------|
| Abstract | Performa web framework menjadi faktor kritis dalam pengembangan aplikasi backend modern. Penelitian ini melakukan evaluasi komparatif Express.js versus Gin melalui pengujian beban pada tiga skenario: baseline, single query, dan complex query. Hasil menunjukkan Gin unggul 4-15x lebih cepat dari Express.js dengan stabilitas latency yang lebih baik. | 200-250 |
| Introduction | Perkembangan aplikasi web modern membutuhkan pemilihan framework yang optimal. Express.js (Node.js) dan Gin (Go) mewakili dua paradigma eksekusi berbeda: single-threaded event loop vs multi-threaded compiled. Gap: belum ada studi komprehensif yang membandingkan performa kedua framework dengan variasi kompleksitas database query. | 500-700 |
| Related Work | Tinjauan tentang Node.js event loop, Go goroutine scheduler, karakteristik Express.js dan Gin, serta studi benchmark sebelumnya. Posisi gap: studi sebelumnya terbatas pada skala kecil atau tanpa variasi kompleksitas database. | 700-1000 |
| Method | Desain eksperimen komparatif dengan dua aplikasi isomorfik (Express.js dan Gin). Tiga skenario: baseline (/api/simple), single query (/api/users/:id), complex query (/api/users/stats). Pengujian menggunakan k6 dengan 40 replikasi per kombinasi. Metrik: mean, median, persentil (p90, p95, p99), IQR, outlier ratio. | 800-1200 |
| Results | Gin mencapai latency median 4.0 ms (baseline), 7.3 ms (single query), 7.3 ms (complex query). Express menghasilkan 52.0 ms, 55.0 ms, dan 35.0 ms. Rasio slowdown: baseline 29.39x, db_single 7.29x, db_complex 4.06x. Express menunjukkan outlier ekstrem hingga 22 detik. | 500-800 |
| Discussion | Keunggulan Gin diatributkan pada compiled native binary, concurrent GC, radix tree routing, zero-allocation JSON binding, dan goroutine pooling. Perbedaan mengecil seiring meningkatnya kompleksitas query karena database menjadi bottleneck dominan. Implikasi: Gin untuk high-throughput, Express untuk rapid prototyping. | 600-900 |
| Conclusion | Gin mengungguli Express di semua skenario dengan rasio 4-15x. Distribusi latency Gin lebih stabil. Pemilihan framework harus selaras dengan target SLA. Kontribusi: dataset benchmark publik, evaluasi multi-skenario, analisis distribusi komprehensif. | 200-400 |

---

## Latihan 2 — Consistency Matrix

Buat consistency matrix untuk memverifikasi internal consistency paper Anda.

|  | Intro | Method | Result | Discussion | Conclusion |
|--|-------|--------|--------|-----------|-----------|
| RQ1 (Perbedaan performa Express vs Gin) | ✓ | ✓ | ✓ | ✓ | ✓ |
| RQ2 (Konsistensi keunggulan Gin seiring kompleksitas) | ✓ | ✓ | ✓ | ✓ | ✓ |
| RQ3 (Karakteristik distribusi latency) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Metrik RT (Response Time) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Metrik Throughput | ✓ | ✓ | ✓ | ✓ | ~ |
| Metrik CPU Usage | ✓ | ✓ | ✓ | ~ | ✗ |
| Metrik Memory Usage | ✓ | ✓ | ✓ | ~ | ✗ |
| Variabel IV (Framework) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Variabel IV (Skenario) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Variabel DV (Latency) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Klaim: Gin 4-15x lebih cepat | ✓ | ✓ | ✓ | ✓ | ✓ |
| Klaim: Distribusi latency berbeda | ✓ | ✓ | ✓ | ✓ | ✓ |

**Isi setiap sel:** ✓ (ada & konsisten), ✗ (missing), ~ (ada tapi inkonsisten)

**Inkonsistensi yang ditemukan:**
> 1. Metrik Throughput: Didefinisikan di Method dan Results, tapi tidak dibahas secara eksplisit di Conclusion (hanya implisit melalui "high-throughput").
> 2. Metrik CPU Usage dan Memory Usage: Didefinisikan di Method dan Results, tapi tidak dibahas secara mendalam di Discussion dan tidak disebutkan di Conclusion. Fokus paper lebih ke latency dan throughput.

**Tindakan perbaikan:**
> 1. Di Conclusion, tambahkan pernyataan eksplisit bahwa Gin mencapai throughput lebih tinggi dari Express.js berdasarkan data request count.
> 2. Di Discussion, tambahkan paragraf tentang CPU dan Memory Usage: Gin menggunakan lebih sedikit sumber daya dibandingkan Express.js di semua skenario. Di Conclusion, sebutkan bahwa efisiensi resource usage menjadi keunggulan tambahan Gin selain latency.

---

## Latihan 3 — Writing Quality Check

Ambil satu paragraf dari tulisan Anda (atau tulis paragraf baru) dan evaluasi kualitasnya.

**Paragraf asli:**
> Hasil penelitian menunjukkan bahwa Gin memiliki performa yang lebih baik dari Express.js dalam hal response time. Pada skenario baseline, Gin mencapai latency median sebesar 4.0 ms sedangkan Express mencapai 52.0 ms. Artinya Gin lebih cepat sekitar 13 kali lipat. Selain itu, pada skenario single query dan complex query, Gin juga masih lebih cepat dari Express.js. Hal ini menunjukkan bahwa Gin adalah pilihan yang tepat untuk aplikasi yang membutuhkan performa tinggi.

| Kriteria | Evaluasi | Perbaikan |
|----------|---------|-----------|
| Clarity | Kalimat "Gin memiliki performa yang lebih baik" terlalu umum — "performa" bisa berarti apa saja (throughput, latency, resource usage) | Spesifikasikan: "Gin mencapai latency median yang lebih rendah" |
| Precision | "sekitar 13 kali lipat" tidak presisi — data menunjukkan 14.76x (median) atau 29.39x (mean) | Gunakan angka yang tepat dari data: "14.76x berdasarkan median" |
| Conciseness | Kalimat "Hal ini menunjukkan bahwa Gin adalah pilihan yang tepat untuk aplikasi yang membutuhkan performa tinggi" redundan dan merupakan kesimpulan yang premature untuk Results section | Hapus atau pindahkan ke Discussion |

**Paragraf setelah perbaikan:**
> Gin mencapai latency median yang secara signifikan lebih rendah dari Express.js di semua skenario. Pada baseline, Gin menghasilkan median 4.0 ms dibandingkan Express 52.0 ms (rasio 14.76x). Pada single query, Gin 7.3 ms vs Express 55.0 ms (rasio 7.53x). Pada complex query, Gin 7.3 ms vs Express 35.0 ms (rasio 4.81x). Rasio performa menurun seiring meningkatnya kompleksitas query, menunjukkan bahwa bottleneck database mengurangi dampak perbedaan framework.

---

## Refleksi

> Apa perbedaan antara menulis "tentang" riset dan menulis sebagai "argumen" riset? Bagaimana urutan penulisan (Method → Discussion → Introduction) mengubah kualitas tulisan?

> Menulis "tentang" riset bersifat deskriptif — seperti melaporkan apa yang dilakukan dan apa hasilnya. Penulisan jenis ini cenderung berupa kronologi: "Saya melakukan X, lalu Y, dan hasilnya Z." Sebaliknya, menulis sebagai "argumen" riset berarti membangun kasus logis dari masalah ke kontribusi. Setiap section harus menjawab pertanyaan yang memicu section berikutnya: "Mengapa ini penting?" → "Apa yang belum diketahui?" → "Bagaimana cara mengetahuinya?" → "Apa temuannya?" → "Apa artinya?"

> Urutan penulisan Method → Discussion → Introduction mengubah kualitas tulisan karena: (1) Method dan Results adalah bagian paling stabil — data sudah ada, tidak berubah. Menulisnya pertama memberikan fondasi konkret. (2) Discussion membutuhkan interpretasi berdasarkan hasil aktual, bukan ekspektasi awal. Jika Introduction ditulis duluan, cenderung ada bias untuk "menjual" hipotesis yang belum terbukti. (3) Introduction ditulis terakhir karena harus "membungkus" temuan aktual — bukan janji yang belum dipenuhi. Frame di Introduction harus selaras dengan apa yang benar-benar ditemukan, bukan apa yang diharapkan ditemukan.
