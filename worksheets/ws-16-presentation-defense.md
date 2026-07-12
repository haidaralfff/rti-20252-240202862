# WS-16: Presentation & Defense (UAS)

> **Bab 16 — Presentasi & Pertahanan Ilmiah**

---

## Ringkasan Materi

### Scientific Defense Model

```
Research Work → Presentation → Questioning → Defense → Evaluation → Acceptance
```

### Presentasi ≠ Ringkasan Paper

| Paper | Presentasi |
|-------|-----------|
| Dibaca (self-paced) | Didengar (presenter-paced) |
| Detail lengkap | Ide kunci + highlight |
| Tabel numerik detail | Grafik visual + angka kunci |
| Pembaca bisa re-read | Audiens dengar sekali |

**Prinsip:** Presentasi membutuhkan **reformulasi**, bukan kompresi. Medium berbeda = pendekatan berbeda.

### Claim-Evidence-Reasoning (CER)

Setiap jawaban defense harus memiliki:
1. **Claim** — Pernyataan yang dijawab
2. **Evidence** — Data/fakta pendukung
3. **Reasoning** — Logika yang menghubungkan evidence ke claim

**Contoh:**
| Pertanyaan | Bad Answer | Good Answer (CER) |
|-----------|-----------|-------------------|
| "Kenapa hanya 3 dataset?" | "Tiga sudah cukup" | "3 dataset mewakili variasi: small-clean, medium-clean, medium-noisy [E]. Generalisasi perlu validasi lanjut — listed as limitation [R]" |
| "Hasil DS-3 menurun?" | "Itu outlier" | "Ya, karena distribusi heavy-tail melanggar asumsi Gaussian [E]. Ini menunjukkan boundary condition metode [R]" |
| "Effect size?" | "p=0.003, jadi signifikan" | "Cohen's d=1.2 (large effect) [E] — bukan hanya signifikan tapi substansial [R]" |

### Slide Design — One Slide, One Message

**Optimal 9-Slide Plan (15 menit):**

| # | Slide | Waktu | Pesan |
|---|-------|-------|-------|
| 1 | Title + context | 1 min | Apa ini tentang apa |
| 2 | Problem + motivation | 2 min | Mengapa penting |
| 3 | Gap + RQ | 1.5 min | Apa yang belum terjawab |
| 4 | Method overview | 2 min | Bagaimana dijawab (diagram) |
| 5 | Key result — tabel | 2 min | Temuan utama |
| 6 | Key result — grafik | 2 min | Pola visual |
| 7 | Interpretation + failure | 2 min | Apa artinya |
| 8 | Limitation + future | 1.5 min | Batasan & arah |
| 9 | Conclusion + contribution | 1 min | Closing message |

### Anticipatory Defense

Prediksi pertanyaan berdasarkan kategori:

| Kategori | Contoh Pertanyaan |
|---------|------------------|
| Problem | "Mengapa masalah ini penting?" |
| Gap | "Bagaimana dengan studi X yang sudah menjawab ini?" |
| Method | "Mengapa metode ini, bukan Y?" |
| Results | "Bagaimana menjelaskan anomali di DS-3?" |
| Generalization | "Apakah bisa diterapkan di domain lain?" |

### Tiga Prinsip Jawaban

1. **Direct** — Jawab dulu, elaborasi kemudian
2. **Data-based** — Tunjuk evidence spesifik
3. **Honest** — Akui limitasi jika memang ada

### Jebakan Kognitif

1. "Presentasi = semua yang ada di paper" → terlalu padat
2. "Slide cantik = presentasi bagus" → konten > estetika
3. "Tidak bisa jawab = gagal" → "I don't know, but..." menunjukkan kejujuran
4. "Tidak perlu latihan — saya paham riset saya" → latihan = menemukan celah

---

## Template A.16 — Defense Preparation Sheet

```
DEFENSE PREPARATION

Slide Deck Plan:
  Total slides   : 11 (9 konten + title + closing) (target: 10-12 konten + title/closing)
  Time per slide : ~1-2 min
  Total time     : 15 menit

Slide Outline:
| # | Pesan Utama | Visual | Waktu |
|---|-------------|--------|-------|
| 1 | Title: Performance Evaluation Express.js vs Gin | Title slide + nama + afiliasi | 30s |
| 2 | Problem: Pemilihan framework backend mempengaruhi performa | Diagram arsitektur Event Loop vs Goroutine | 2min |
| 3 | Gap + RQ: Studi sebelumnya terbatas skala kecil | Tabel gap literatur | 1.5min |
| 4 | Method: 2 aplikasi isomorfik, k6, 3 skenario, 40 replikasi | Diagram alur eksperimen | 2min |
| 5 | Key result tabel: Gin 4.0-7.3 ms, Express 35-55 ms median | Tabel statistik latency | 2min |
| 6 | Key result grafik: Outlier Express hingga 22 detik, Gin stabil | Box plot + line chart slowdown | 2min |
| 7 | Interpretation: 5 faktor arsitektur, database bottleneck | Diagram arsitektur + insight | 2min |
| 8 | Limitation: WSL2, satu database, satu endpoint | Slide bullet points limitasi | 1.5min |
| 9 | Conclusion: Gin 4-15x lebih cepat, rekomendasi framework | Slide closing kontribusi | 1min |

Anticipatory Defense Matrix:
| Kategori | Pertanyaan Potensial | Jawaban (CER) |
|----------|---------------------|---------------|
| Problem  | Mengapa membandingkan Express.js dan Gin, bukan framework lain? | [C] Express.js dan Gin mewakili dua paradigma eksekusi berbeda. [E] Stack Overflow: Express #3 (23.82%), Go/Gin meningkat. [R] Menunjukkan dampak arsitektur runtime terhadap performa |
| Gap      | Bukankah Azzahidi et al. sudah membandingkan Gin? | [C] Azzahidi tanpa variasi kompleksitas database. [E] Hanya endpoint sederhana (no database). [R] Gap: evaluasi multi-skenario database |
| Method   | Mengapa menggunakan WSL2 bukan bare-metal/cloud? | [C] WSL2 terisolasi dan reproducible. [E] Docker identik, cooling-down 2 menit. [R] Limitasi: generalisasi ke production butuh validasi |
| Results  | Mengapa slowdown ratio menurun 29x ke 4x? | [C] Database menjadi bottleneck dominan. [E] Waktu DB ~30 ms dominasi, framework 4-6 ms. [R] Bottleneck pindah ke database layer |
| Generalization | Apakah bisa diterapkan di production? | [C] Tren konsisten tapi perlu validasi. [E] Konfigurasi production-ready, 40 replikasi. [R] Limitasi diakui, future work di cloud |

Latihan:
  Latihan 1: [Simulasi internal] — [15 menit tepat, slide 5 dan 6 perlu diperjelas perbedaannya]
  Latihan 2: [Simulasi dengan teman] — [Pertanyaan metodologi muncul, jawaban CER sudah baik]
  Latihan 3: [Simulasi final] — [Timing ok, feedback: tambahkan angka kunci di setiap slide]
```

---

## Latihan 1 — Slide Outline

Rencanakan presentasi 15 menit untuk riset Anda.

| # | Pesan Utama | Visual yang Digunakan | Waktu |
|---|-------------|----------------------|-------|
| 1 | Performance Evaluation of Express.js vs Gin for REST API — studi komparatif dengan variasi kompleksitas database query | Title slide dengan judul, nama, afiliasi | 1 min |
| 2 | Pemilihan framework backend mempengaruhi performa, biaya infrastruktur, dan user experience. Express.js (Node.js) dan Gin (Go) mewakili dua paradigma: single-threaded event loop vs multi-threaded compiled. | Diagram arsitektur: Event Loop vs Goroutine Scheduler | 2 min |
| 3 | Gap: studi sebelumnya terbatas pada skala kecil atau tanpa variasi kompleksitas database. RQ: bagaimana perbedaan performa Express vs Gin pada baseline, single query, dan complex query? | Tabel literatur review dengan gap positioning | 1.5 min |
| 4 | Dua aplikasi isomorfik (Express.js dan Gin) diuji dengan k6 pada 3 skenario. 40 replikasi per kombinasi. Metrik: latency (mean, median, p90, p95, p99), outlier ratio. | Diagram alur eksperimen: App → K6 → PostgreSQL → Monitoring | 2 min |
| 5 | Tabel hasil utama: Gin median 4.0 ms (baseline), 7.3 ms (single), 7.3 ms (complex). Express: 52.0 ms, 55.0 ms, 35.0 ms. Rasio: 14.76x, 7.53x, 4.81x. | Tabel statistik latency dengan warna-highlight perbedaan | 2 min |
| 6 | Express memiliki outlier ekstrem hingga 22 detik (9.3% outlier di baseline). Gin stabil dengan outlier maksimal 44 ms. Slowdown ratio menurun seiring kompleksitas meningkat. | Box plot distribusi latency + line chart slowdown ratio | 2 min |
| 7 | Keunggulan Gin: compiled binary, concurrent GC, radix tree routing, zero-allocation JSON, goroutine pooling. Database bottleneck mengurangi dampak framework pada complex query. | Diagram perbandingan arsitektur + insight kunci | 2 min |
| 8 | Limitasi: hanya diuji di WSL2 (bukan bare-metal/cloud), satu jenis database (PostgreSQL), satu endpoint pattern. Future work: pengujian di production environment, variasi database, mixed workload. | Slide teks dengan bullet points limitasi dan future work | 1.5 min |
| 9 | Kesimpulan: Gin 4-15x lebih cepat, lebih stabil, lebih efisien resource. Rekomendasi: Gin untuk high-throughput, Express untuk rapid prototyping. Kontribusi: dataset benchmark publik. | Slide closing dengan poin-poin kontribusi | 1 min |

**Total waktu estimasi:** 15 menit

---

## Latihan 2 — Anticipatory Defense

Prediksi 5 pertanyaan yang mungkin diajukan penguji, lalu siapkan jawaban CER.

| # | Kategori | Pertanyaan | Claim | Evidence | Reasoning |
|---|----------|-----------|-------|----------|-----------|
| 1 | Problem | Mengapa membandingkan Express.js dan Gin, bukan framework lain seperti Django atau Laravel? | Express.js dan Gin mewakili dua paradigma eksekusi yang berbeda (interpreted vs compiled) dan keduanya populer untuk REST API | Stack Overflow 2024: Express.js #3 (23.82%), Go/Gin meningkat pesat. Studi sebelumnya (Siahaan, Azzahidi) menggunakan Express sebagai baseline | Perbandingan ini relevan karena menunjukkan dampak arsitektur runtime terhadap performa, bukan sekadar perbandingan framework |
| 2 | Gap | Bukankah studi Azzahidi et al. (2025) sudah membandingkan Gin dengan framework lain? | Studi Azzahidi membandingkan 5 framework termasuk Gin, tapi tanpa variasi kompleksitas database query | Tabel di Azzahidi hanya menunjukkan endpoint sederhana (no database). Riset kami menambahkan 3 skenario database | Gap kami adalah evaluasi multi-skenario dengan kompleksitas database yang merepresentasikan aplikasi nyata |
| 3 | Method | Mengapa menggunakan WSL2 bukan bare-metal Linux atau cloud? | WSL2 menyediakan environment yang terisolasi dan reproducible untuk pengembangan | Docker Desktop di WSL2 dengan konfigurasi identik untuk kedua framework. Cooling-down 2 menit antar pengujian | Hasil spesifik untuk WSL2 environment — disebutkan sebagai limitasi. Generalisasi ke production membutuhkan validasi lanjut |
| 4 | Results | Mengapa slowdown ratio menurun dari 29x (baseline) ke 4x (complex query)? | Database menjadi bottleneck dominan yang mengurangi dampak perbedaan framework | Pada complex query, waktu database ~30 ms mendominasi total RT. Waktu framework (4-6 ms) menjadi proporsi kecil (<15%) | Ketika bottleneck berpindah dari application layer ke database layer, pemilihan framework menjadi kurang signifikan |
| 5 | Generalization | Apakah hasil ini bisa diterapkan di production environment? | Hasil menunjukkan tren yang konsisten, tapi generalisasi perlu validasi lanjut | Semua pengujian menggunakan konfigurasi production-ready (gin.ReleaseMode, optimized Node.js). 40 replikasi memberikan statistical power | Limitasi: hanya WSL2, satu database, satu endpoint pattern. Future work: pengujian di cloud dengan variasi workload |

---

## Latihan 3 — Simulasi Q&A

Minta teman/kolega mengajukan 3 pertanyaan tentang riset Anda. Catat pertanyaan dan evaluasi jawaban Anda.

| # | Pertanyaan | Jawaban Saya | Evaluasi |
|---|-----------|-------------|---------|| 1 | "Mengapa menggunakan median bukan mean untuk metrik utama?" | "Karena distribusi latency sangat skewed — Express memiliki mean 118.88 ms tapi median 52.0 ms di baseline. Median lebih robust terhadap outlier dan merepresentasikan typical case lebih baik." | [✓] Direct [✓] Data-based [✓] Honest |
| 2 | "Apakah 40 replikasi cukup untuk menarik kesimpulan?" | "Ya, dengan 40 replikasi, Central Limit Theorem mulai berlaku. Selain itu, kami menggunakan paired test (Wilcoxon signed-rank) yang tidak membutuhkan asumsi normalitas ketat. Effect size Cohen's d > 1.8 menunjukkan perbedaan yang substansial, bukan hanya signifikan secara statistik." | [✓] Direct [✓] Data-based [✓] Honest |
| 3 | "Mengapa tidak menguji dengan jumlah VU yang berbeda?" | "Pengujian kami fokus pada perbandingan framework dengan kondisi yang terkontrol. Variasi VU bisa menjadi variabel confounding. Kami menggunakan 20 VU tetap untuk semua skenario. Ini adalah limitasi yang diakui — future work bisa mengeksplorasi.scalability dengan variasi VU." | [✓] Direct [✓] Data-based [✓] Honest |

**Pertanyaan yang paling sulit dijawab:**
> "Mengapa tidak menguji dengan variasi VU yang berbeda?" — pertanyaan ini menantang karena mengungkap limitasi desain eksperimen. Perlu menjelaskan trade-off antara kontrol variabel dan generalisasi.

**Apa yang perlu disiapkan lebih baik:**
> Menyiapkan data tambahan tentang bagaimana variasi VU mempengaruhi hasil (jika ada). Juga mempelajari lebih dalam tentang statistical power analysis untuk memperkuat justifikasi jumlah replikasi.

---

## Refleksi

> Dari seluruh proses WS-01 sampai WS-16 — dari paradigma riset hingga presentasi — bagian mana yang paling mengubah cara Anda berpikir tentang riset? Apa satu hal yang akan selalu Anda terapkan di riset berikutnya?

**Insight terbesar:**
> WS-14 tentang Failure Analysis mengubah cara saya melihat hasil negatif. Sebelumnya, saya menganggap hipotesis yang ditolak sebagai kegagalan. Sekarang saya memahami bahwa "partial failure + deep analysis = kontribusi lebih kaya daripada full success tanpa analisis." Boundary condition yang ditemukan dari hasil negatif justru memberikan insight lebih berharga — ia memberitahu di mana batas kemampuan metode berada.

**Yang akan selalu diterapkan:**
> Konsistensi matrix dari WS-15. Saya akan selalu membuat matriks konsistensi sebelum menulis paper untuk memastikan bahwa setiap RQ, variabel, metrik, dan klaim terhubung di semua bagian. Ini mencegah inkonsistensi yang sering tidak disadari — misalnya, metrik yang muncul di Results tapi tidak diperkenalkan di Method, atau RQ yang dibahas di semua bagian kecuali Discussion.
