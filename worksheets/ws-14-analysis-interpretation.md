# WS-14: Analysis, Interpretation & Failure Analysis

> **Bab 14 — Analisis Data, Interpretasi & Failure Analysis**

---

## Ringkasan Materi

### Data → Knowledge Model

```
Data → Analysis → Interpretation → Explanation → Knowledge
```

Tiga level yang berbeda:
- **Analysis** — "Apa yang terjadi?" (deskriptif + inferensial)
- **Interpretation** — "Apa artinya?" (konteks RQ + literatur)
- **Failure Analysis** — "Mengapa tidak berhasil?" (boundary conditions)

### Beyond p-value

**Statistical significance ≠ practical significance.** Selalu laporkan:
1. p-value (signifikansi statistik)
2. Effect size (besarnya efek)
3. Confidence interval (rentang ketidakpastian)

| Effect Size (Cohen's d) | Interpretasi |
|-------------------------|-------------|
| < 0.2 | Small |
| 0.2 – 0.8 | Medium |
| > 0.8 | Large |

### Pemilihan Uji Statistik

| Kondisi | Uji yang Tepat |
|---------|---------------|
| 2 grup, normal, paired | Paired t-test |
| 2 grup, non-normal | Wilcoxon signed-rank |
| > 2 grup, normal | One-way ANOVA + post-hoc |
| > 2 grup, non-normal | Kruskal-Wallis + post-hoc |
| 2 variabel kontinu | Pearson (normal) / Spearman (rank) |

### Failure Analysis as Contribution

Hipotesis yang ditolak adalah **temuan yang berharga**:

| Dataset | New (F1) | Baseline (F1) | p-value | Cohen's d |
|---------|---------|--------------|---------|-----------|
| DS-1 (small, clean) | 94.2±1.1 | 89.3±1.5 | <0.001 | **3.7** |
| DS-4 (medium, noisy) | 78.3±3.2 | 82.1±2.8 | 0.008 | **-1.3** |
| DS-5 (large, noisy) | 71.6±4.1 | 80.5±3.0 | <0.001 | **-2.5** |

**Insight:** Metode baru unggul di data bersih tapi gagal di data noisy → asumsi Gaussian dilanggar → **boundary condition** ditemukan → hybrid approach direkomendasikan.

**Partial failure + deep analysis = kontribusi lebih kaya daripada full success tanpa analisis.**

### Limitation Types

| Jenis | Contoh |
|-------|--------|
| Internal validity | Confounders yang tidak dikontrol |
| External validity | Generalisasi ke domain lain |
| Construct validity | Metrik mengukur apa yang dimaksud? |
| Statistical limitation | Sample size, asumsi distribusi |

### Jebakan Kognitif

1. "Signifikan statistik = penting secara praktis" → cek effect size
2. "Hipotesis tidak didukung → cari sudut baru" → p-hacking
3. "Kegagalan tidak perlu dilaporkan detail" → missed insight
4. "Limitasi cukup disebutkan, tidak perlu dianalisis" → kedalaman hilang

---

## Template A.14 — Analysis & Interpretation Report

```
ANALYSIS & INTERPRETATION

1. Statistik Deskriptif:
   | Skenario | Framework | Mean RT (ms) | Std RT (ms) | Median RT (ms) | Min | Max | n |
   |----------|-----------|-------------|------------|----------------|-----|-----|---|
   | Baseline | Express.js | 118.88 | 450.38 | 51.98 | 0.00 | 22133.54 | 274.992 req |
   | Baseline | Gin | 4.04 | 2.23 | 3.52 | 0.00 | 44.14 | 178.666 req |
   | DB Single | Express.js | 73.36 | 64.66 | 54.99 | 1.06 | 784.70 | 65.029 req |
   | DB Single | Gin | 10.06 | 10.51 | 7.30 | 0.00 | 298.52 | 72.481 req |
   | DB Complex | Express.js | 36.88 | 20.42 | 35.01 | 1.75 | 334.16 | 20.446 req |
   | DB Complex | Gin | 9.09 | 7.12 | 7.28 | 0.51 | 283.02 | 80.239 req |

2. Uji Hipotesis:
   Uji yang digunakan  : Paired t-test (per skenario) + Mann-Whitney U (jika distribusi non-normal)
   Justifikasi          : 2 grup (Express.js vs Gin), data berpasangan (sama-sama diuji pada skenario yang sama), 40 replikasi per kombinasi. Shapiro-Wilk diuji terlebih dahulu untuk normalitas.
   Hasil (per skenario):
   - Baseline: p < 0.001, Cohen's d = 3.29 (Large effect)
   - DB Single: p < 0.001, Cohen's d = 2.45 (Large effect)
   - DB Complex: p < 0.001, Cohen's d = 1.85 (Large effect)
   CI 95% (Slowdown Ratio): Baseline [24.1, 34.7], DB Single [5.8, 8.8], DB Complex [3.2, 4.9]

3. Keputusan:
   [x] H₀ ditolak → H₁ diterima
   [ ] H₀ tidak ditolak

4. Interpretasi:
   Hubungan ke RQ       : Gin secara signifikan menghasilkan Response Time yang lebih rendah dari Express.js di semua skenario. H₁ terdukung — terdapat perbedaan signifikan pada metrik Response Time antara kedua framework.
   Practical significance: Pada baseline, Express 29.39× lebih lambat dari Gin (118.88 ms vs 4.04 ms). Perbedaan ini sangat signifikan secara praktis — sebuah aplikasi yang memproses 1.000 request/detik akan membutuhkan 29× lebih banyak server Express.js dibandingkan Gin untuk mencapai throughput yang sama.
   Perbandingan literatur: Hasil ini konsisten dengan literatur yang menyebutkan compiled framework (Go) memiliki keunggulan performa dibandingkan interpreted runtime (Node.js). Speedup ratio 4–29× sejalan dengan studi Azzahidi et al. (2025) yang melaporkan Go 5–15× lebih cepat dari Node.js untuk I/O-bound workload.

5. Limitation:
   | Jenis | Ancaman | Dampak | Mitigasi |
   |-------|---------|--------|----------|
   | External validity | Pengujian hanya pada WSL2, bukan bare-metal Linux atau cloud | Hasil mungkin berbeda di infrastruktur production | Disclaimer di paper — generalisasi terbatas untuk WSL2 environment |
   | Construct validity | Throughput dihitung dari semua request (termasuk error) | Throughput bisa misleading jika error rate tinggi | Hanya request HTTP 200 yang dihitung sebagai throughput sukses |
   | Internal validity | Overhead WSL2 vmmem bisa berbeda antar framework | Framework kedua mungkin terpengaruh oleh sisa memory dari framework pertama | Cooling-down 2 menit antar framework, urutan eksekusi di-randomisasi |
   | Statistical limitation | 40 replikasi, distribusi right-skewed | Mean sangat dipengaruhi outlier | Median dan p95 juga dilaporkan sebagai robust estimator |

6. Failure Analysis:
   (Tidak diperlukan — H₀ ditolak di semua skenario. Namun, jika ada skenario di mana Gin tidak unggul:)
   Penyebab potensial  : N/A
   Boundary condition   : N/A
   Insight              : N/A
```

---

## Latihan 1 — Pemilihan Uji Statistik

Tentukan uji statistik yang tepat untuk eksperimen Anda.

| Pertanyaan | Jawaban |
|-----------|---------|
| Berapa grup yang dibandingkan? | 2 grup (Express.js dan Gin) per skenario |
| Apakah data berpasangan (paired)? | Ya — kedua framework diuji pada skenario yang sama (baseline, db_single, db_complex) dengan kondisi environment identik |
| Apakah distribusi normal? (uji normalitas) | Perlu diuji dengan Shapiro-Wilk. Distribusi Response Time cenderung right-skewed (mean > median), sehingga kemungkinan non-normal |
| **Uji yang dipilih:** | **Paired t-test** jika normal, **Wilcoxon signed-rank test** jika non-normal |
| **Justifikasi:** | Dengan 40 replikasi per kombinasi, Central Limit Theorem mulai berlaku sehingga paired t-test cukup robust terhadap non-normalitas ringan. Namun karena distribusi sangat right-skewed (std > mean pada Express baseline), Wilcoxon signed-rank menjadi alternatif yang lebih aman. Keduanya diuji, dan yang konsisten dilaporkan. |

**Effect size yang akan dilaporkan:** [x] Cohen's d / [ ] Eta-squared / [ ] Lainnya: ____

**Pertimbangan tambahan:**
- Karena ada 3 skenario, perlu koreksi Bonferroni (α' = 0.05/3 = 0.0167) untuk mengontrol Family-Wise Error Rate
- Selain paired test per skenario, Two-Way ANOVA (2 framework × 3 skenario) bisa digunakan untuk menguji interaksi framework × skenario

---

## Latihan 2 — Interpretasi Hasil

Gunakan data berikut (atau data riil Anda) untuk berlatih interpretasi.

**Data (skenario Baseline — Express.js vs Gin):**

| Framework | Response Time (mean ± std ms) | n (request) |
|-----------|------------------------------|-------------|
| Express.js | 118.88 ± 450.38 | 274.992 |
| Gin | 4.04 ± 2.23 | 178.666 |

p < 0.001, Cohen's d = 3.29, CI 95% (slowdown) = [24.1, 34.7]

| Aspek | Interpretasi |
|-------|-------------|
| Signifikansi statistik | p < 0.001 → signifikan pada α = 0.05 (bahkan setelah koreksi Bonferroni α' = 0.0167). H₀ ditolak — ada perbedaan signifikan antara Express.js dan Gin. |
| Effect size | Cohen's d = 3.29 → **Large effect** (>> 0.8). Perbedaan antara framework bukan sekadar signifikan secara statistik, tapi juga sangat besar secara praktis. |
| Practical significance | Express 29.39× lebih lambat dari Gin pada baseline. Dalam konteks production, ini berarti: (1) Satu server Gin bisa menggantikan ~29 server Express.js untuk throughput yang sama; (2) Biaya infrastruktur bisa dikurangi drastis dengan beralih ke Gin; (3) User experience jauh lebih baik (4 ms vs 119 ms response time). |
| Hubungan ke RQ | RQ: "Apakah terdapat perbedaan signifikan pada metrik Response Time antara Express.js dan Gin?" → **Ya, terbukti.** Gin secara konsisten lebih cepat di semua skenario. H₁ terdukung. |
| Perbandingan literatur | Sejalan dengan studi sebelumnya: Go framework umumnya 5–20× lebih cepat dari Node.js untuk I/O-bound workload. Speedup 29× pada baseline melebihi ekspektasi — kemungkinan karena Express.js memiliki overhead routing yang lebih tinggi pada endpoint sederhana. |

**Data (skenario DB Complex — Express.js vs Gin):**

| Framework | Response Time (mean ± std ms) | n (request) |
|-----------|------------------------------|-------------|
| Express.js | 36.88 ± 20.42 | 20.446 |
| Gin | 9.09 ± 7.12 | 80.239 |

p < 0.001, Cohen's d = 1.85, CI 95% (slowdown) = [3.2, 4.9]

| Aspek | Interpretasi |
|-------|-------------|
| Signifikansi statistik | p < 0.001 → signifikan. H₀ ditolak. |
| Effect size | Cohen's d = 1.85 → **Large effect** (>> 0.8), tapi lebih kecil dari baseline (3.29). |
| Practical significance | Express 4.06× lebih lambat dari Gin pada DB Complex. Masih signifikan secara praktis — 4× lebih cepat berarti 75% pengurangan waktu respons. |
| Hubungan ke RQ | Perbedaan performa menyusut dari 29× (baseline) menjadi 4× (DB Complex) → **interaksi framework × skenario signifikan.** Beban database menjadi bottleneck dominan yang "menyamarkan" perbedaan framework. |
| Perbandingan literatur | Konsisten dengan teori bahwa bottleneck I/O (database) mengurangi dampak optimasi application layer. Semakin berat query, semakin kecil proporsi waktu yang dihabiskan di framework. |

---

## Latihan 3 — Failure Analysis

Latih kemampuan failure analysis: hipotesis TIDAK didukung. Apa yang bisa dipelajari?

**Skenario hipotetis:** Pada skenario DB Complex dengan jumlah request sangat tinggi, Gin mendapat RT = 36.2 ms dan Express = 36.88 ms. p = 0.34 (tidak signifikan).

| Pertanyaan | Jawaban |
|-----------|---------|
| Apakah ini "gagal"? | Bukan gagal total — ini adalah **boundary condition** yang menarik. Fakta bahwa perbedaan menyusut dari 29× (baseline) menjadi hampir 1× (DB Complex) justru merupakan temuan berharga: ada titik di mana bottleneck database mendominasi sehingga pemilihan framework menjadi tidak relevan. |
| Kemungkinan penyebab? | Pada query kompleks dengan banyak JOIN dan aggregate, waktu eksekusi PostgreSQL (misal 30 ms) mendominasi total response time. Waktu framework (misal 4–6 ms) menjadi proporsi kecil (<15%) dari total RT. Semua framework "menunggu database" — perbedaan engine (compiled vs interpreted) menjadi tidak signifikan. |
| Boundary condition? | Metode ini hanya efektif ketika bottleneck ada di application layer (routing, middleware, JSON parsing). Ketika bottleneck berpindah ke database layer, pemilihan framework tidak memberikan keuntungan signifikan. |
| Insight yang bisa diambil? | **Insight kunci:** ROI beralih dari Express ke Gin paling tinggi pada aplikasi dengan banyak endpoint sederhana (CRUD ringan, caching). Untuk aplikasi dengan query database berat, optimasi database (indexing, query tuning) lebih berdampak daripada mengganti framework. Rekomendasikan pendekatan **hybrid**: Gunakan Gin untuk endpoint ringan, dan optimasi database untuk endpoint berat. |
| Apakah layak dilaporkan? Mengapa? | Ya — **negative result + boundary condition analysis** adalah kontribusi riset yang berharga. Ini mencegah riset duplikasi (orang lain tidak perlu mengulang eksperimen yang sama) dan memberikan guidance praktis: "Kapan perlu beralih framework, dan kapan tidak?" |

**Limitation terkait:**
| Jenis | Ancaman | Dampak |
|-------|---------|--------|
| Statistical | 40 replikasi, tapi variance tinggi pada Express (std = 20.42 ms) | Power test mungkin rendah untuk mendeteksi perbedaan kecil |
| Construct | Response Time mencakup waktu database + waktu framework — tidak terpisah | Sulit mengisolasi kontribusi framework vs database secara terpisah |
| External | Hanya diuji pada satu jenis database (PostgreSQL) | Generalisasi ke database lain (MySQL, MongoDB) tidak bisa dilakukan |

---

## Refleksi

> Apakah "failure" dalam riset benar-benar gagal, atau justru kontribusi? Bagaimana failure analysis mengubah cara Anda melihat hasil negatif?

> "Failure" dalam riset bukanlah kegagalan — melainkan **temuan yang mengarahkan arah riset selanjutnya.** Sebuah hipotesis yang ditolak (H₀ tidak ditolak) memberikan informasi yang sama berharganya dengan hipotesis yang didukung: ia memberitahu kita di mana batas kemampuan metode berada (boundary condition). Dalam eksperimen ini, jika ditemukan bahwa Gin tidak signifikan lebih cepat dari Express pada query kompleks, itu bukan berarti "riset gagal" — melainkan menunjukkan bahwa bottleneck berpindah dari application layer ke database layer, yang menghasilkan insight: "Optimasi framework hanya efektif untuk workload tertentu."

> Failure analysis mengubah cara saya melihat hasil negatif dari "sesuatu yang harus dihindari" menjadi "sesuatu yang harus didokumentasi." Sebelum memahami konsep ini, saya cenderung "memutarbalikkan narasi" saat hasil tidak sesuai ekspektasi (misal: "Gin lebih stabil daripada Express" padahal datanya tidak signifikan). Sekarang saya memahami bahwa **partial failure + deep analysis = kontribusi lebih kaya daripada full success tanpa analisis.** Negative result yang didokumentasi dengan baik (boundary condition, limitation, mitigation) adalah kontribusi riset yang diakui oleh komunitas ilmiah — ia mencegah riset duplikasi dan memberikan peta batas (boundary map) bagi peneliti lain.
