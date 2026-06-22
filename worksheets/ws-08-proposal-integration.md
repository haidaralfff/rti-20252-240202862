# WS-08: Proposal Integration (UTS)

> **Bab 8 — Proposal & Checkpoint**

---

## Ringkasan Materi

### Proposal = Satu Argumen Utuh

Proposal riset bukan kumpulan bab yang independen. Ia adalah **satu argumen** yang mengalir dari masalah ke rencana solusi. Jika satu koneksi putus, seluruh proposal kehilangan koherensi.

### Integration Map — 6 Koneksi Kritis

```
Problem (Bab 2) → Gap (Bab 3) → RQ & H (Bab 4) → Metrik (Bab 5) → Sistem (Bab 6) → Eksperimen (Bab 7)
```

| Koneksi | Pertanyaan Verifikasi |
|---------|----------------------|
| Problem → Gap | Apakah gap muncul dari analisis literatur terhadap masalah? |
| Gap → RQ | Apakah RQ langsung menjawab gap yang teridentifikasi? |
| RQ → Metrik | Apakah setiap variabel di RQ punya metrik terdefinisi? |
| Metrik → Sistem | Apakah setiap metrik bisa diukur oleh komponen sistem? |
| Sistem → Eksperimen | Apakah desain eksperimen menggunakan sistem sebagai instrumen? |

### Koherensi Vertikal + Horizontal

- **Vertikal** — Alur logis atas-ke-bawah (problem → experiment)
- **Horizontal** — Konsistensi terminologi (nama variabel di RQ = di hipotesis = di metrik = di desain)

### Jebakan Kognitif

| Jebakan | Deskripsi |
|---------|----------|
| "Selling" Introduction | Menulis promosi, bukan menyajikan data dan gap |
| Copy-paste Methodology | Menyalin deskripsi tekstbook tanpa menyesuaikan ke RQ |
| Optimistic Timeline | Meremehkan waktu implementasi; selalu tambah buffer 30-50% |
| No Possibility of Failure | Mengimplikasikan hasil pasti sukses — proposal jujur mengakui H₀ mungkin tidak ditolak |

### Struktur Proposal

1. **Pendahuluan** — Latar belakang + problem statement (Bab 1-2)
2. **Tinjauan Pustaka** — Literature review + gap + baseline (Bab 3)
3. **RQ / Kontribusi / Hipotesis** — (Bab 4)
4. **Metodologi** — Metrik + sistem + desain eksperimen (Bab 5-7)
5. **Timeline & Output**

### Istilah Penting

- **Integration Map** — Diagram 6 koneksi kritis antar komponen proposal
- **Vertical Coherence** — Alur logis atas-ke-bawah
- **Horizontal Coherence** — Konsistensi terminologi di semua bagian
- **Checkpoint** — Titik self-assessment sebelum transisi dari desain ke eksekusi

---

## Template A.8 — Integration Checklist

```
PROPOSAL INTEGRATION CHECKLIST

Koneksi Vertikal (Flow Atas-Bawah):
  [ ] Problem → Gap: masalah terdokumentasi di literatur
  [ ] Gap → RQ: pertanyaan menjawab gap spesifik
  [ ] RQ → Hypothesis: hipotesis memprediksi jawaban
  [ ] Hypothesis → Metric: metrik mengukur variabel dalam hipotesis
  [ ] Metric → System: komponen sistem menghasilkan/mengukur metrik
  [ ] System → Experiment: desain eksperimen menggunakan sistem

Koneksi Horizontal (Konsistensi):
  [ ] Istilah sama di semua bagian
  [ ] Variabel di RQ = variabel di hipotesis = metrik di desain
  [ ] Scope tidak berubah dari masalah ke eksperimen

Rubrik Self-Assessment:
| Kriteria | 1 (Lemah) | 2 (Cukup) | 3 (Baik) | Skor |
|----------|-----------|-----------|----------|------|
| Koherensi |          |           |          |      |
| Specificity |        |           |          |      |
| Feasibility |        |           |          |      |
| Rigor     |          |           |          |      |
```

---

## Latihan 1 — Kompilasi Proposal Mini

Kumpulkan hasil dari WS-02 sampai WS-07 menjadi satu ringkasan proposal.

| Komponen | Sumber | Isi (1-2 kalimat) |
|----------|--------|-------------------|
| Problem Statement | WS-02 | *Perkembangan aplikasi web modern bergantung pada performa RESTful API, namun pemilihan backend framework (Express.js atau Gin) sering dilakukan tanpa bukti empiris. Belum ada panduan komparatif tentang perilaku performa kedua framework saat menangani lonjakan beban dari skala kecil hingga 1 juta request.* |
| Gap | WS-03 | *Kekosongan konsensus mengenai performa ekstrem komparatif antara framework backend Express.js dan Gin saat dihadapkan pada pengujian beban skala masif hingga jutaan request, untuk melihat breaking point CPU dan Memory secara nyata.* |
| RQ | WS-04 | *Apakah terdapat perbedaan yang signifikan pada metrik Response Time, Throughput, CPU Usage, dan Memory Usage antara framework backend modern (Express.js dan Gin) ketika menangani beban RESTful API dari skala ratusan hingga satu juta data?* |
| Hipotesis | WS-04 | *H₀: Tidak ada perbedaan signifikan pada metrik Response Time, Throughput, maupun Resource Usage antara Express.js dan Gin dalam memproses permintaan API pada semua skala beban data. H₁: Gin (framework compiled) menghasilkan Throughput secara signifikan lebih tinggi dan stabilitas Resource Usage yang lebih baik dibandingkan Express.js (framework interpreted) saat beban trafik mencapai 1.000.000 data.* |
| Variabel & Metrik | WS-05 | *IV = Jenis Framework Backend (Express.js, Gin) dan Skala Beban Data (100, 1k, 10k, 100k, 1 juta); DV = Response Time (ms), Throughput (req/s), CPU Usage (%), Memory Usage (MB).* |
| Sistem | WS-06 | *Backend App (2 proyek: Express.js dan Gin), Load Tester K6, Node_exporter & Prometheus untuk resource metrics, PostgreSQL DB dengan tabel KRS hingga 1.000.000 baris.* |
| Desain Eksperimen | WS-07 | *Comparison Study: Control = Express.js (interpreted/Node.js), Treatment = Gin (compiled/Go). Pengujian K6 dengan 20 Virtual Users selama 10 menit per skala data. Analisis menggunakan Two-Way ANOVA (2 Framework × 5 Skala Data) dengan post-hoc Paired t-test (alpha 0.05, Cohen's d > 0.5).* |

---

## Latihan 2 — Integration Checklist

Verifikasi 6 koneksi kritis. Isi dengan merujuk tabel di Latihan 1.

| Koneksi | Status | Bukti |
|---------|--------|-------|
| Problem → Gap | *✅ — Gap muncul dari analisis literatur (Siahaan, Purwanto, Supria, Hadinata, Azzahidi) yang menunjukkan hasil kontradiktif dan terbatas pada skala data kecil (di bawah 10.000 record).* | |
| Gap → RQ | *✅ — RQ langsung menanyakan perbedaan performa ekstrem Express.js vs Gin pada skala ratusan hingga 1 juta data.* | |
| RQ → Hypothesis | *✅ — H₁ memprediksi Gin unggul dalam Throughput dan stabilitas Resource Usage dibandingkan Express.js saat beban 1.000.000 data.* | |
| Hypothesis → Metric | *✅ — Metrik Response Time, Throughput, CPU Usage, dan Memory Usage secara langsung mengukur variabel dalam hipotesis.* | |
| Metric → System | *✅ — K6 mengukur Response Time dan Throughput; Prometheus/Grafana dengan node_exporter mengukur CPU Usage dan Memory Usage.* | |
| System → Experiment | *✅ — Desain eksperimen menggunakan backend Express.js/Gin, K6, PostgreSQL, dan Prometheus/Grafana sebagai instrumen pengujian.* | |

**Koneksi mana yang paling lemah?** *Metric → System*
**Bagaimana cara memperkuatnya?**
> *Memastikan kedua framework menggunakan query ORM/raw SQL yang setara dan dikonfigurasi dengan mode production yang sama, serta mematikan caching internal agar perbedaan metrik murni berasal dari framework.*

**Konsistensi horizontal — apakah istilah dan scope konsisten?** [x] Ya / [ ] Tidak
> Jika tidak, di bagian mana terjadi inkonsistensi? *Tidak ada inkonsistensi; istilah Express.js, Gin, Response Time, Throughput, CPU Usage, dan Memory Usage konsisten dari WS-02 sampai WS-07.*

---

## Latihan 3 — Rubrik Self-Assessment

Evaluasi proposal mini menggunakan rubrik.

| Kriteria | Skor (1-3) | Justifikasi |
|----------|-----------|-------------|
| Koherensi | *3 — Alur problem → gap → RQ → hipotesis → metrik → sistem → eksperimen terhubung jelas dan saling mendukung.* | |
| Specificity | *3 — Variabel (Express.js/Gin, skala data) dan metrik (Response Time, Throughput, CPU Usage, Memory Usage) sudah terdefinisi numerik dan operational.* | |
| Feasibility | *3 — Tools (K6, Prometheus, Grafana, PostgreSQL, Docker) tersedia dan environment WSL dapat direproduksi dengan dokumentasi lengkap.* | |
| Rigor | *3 — Pengujian diulang minimal 3× per skala, menggunakan Two-Way ANOVA dengan alpha 0.05 dan effect size Cohen's d > 0.5.* | |

**Skor total:** *12 / 12*

**Apakah proposal siap untuk fase eksekusi?** [x] Ya / [ ] Belum
> Jika belum, apa yang perlu diperbaiki? *Proposal sudah siap untuk fase eksekusi.*

---

## Refleksi

> Dari seluruh proses WS-01 sampai WS-08, bagian mana yang paling mudah dan paling sulit? Mengapa? Apa yang akan dilakukan berbeda jika mengulang dari awal?

**Bagian termudah:** ____________________________________
**Bagian tersulit:** ____________________________________
**Yang akan dilakukan berbeda:**
> ___________________________________________________
> ___________________________________________________
