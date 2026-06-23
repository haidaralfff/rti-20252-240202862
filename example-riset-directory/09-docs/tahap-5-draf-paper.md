# Tahap 5: Draf Paper Jurnal

**Status:** Selesai

## 1. Komponen Naskah Jurnal

Draf publikasi ilmiah harus terbagi ke dalam struktur IMRaD (Introduction, Methods, Results, and Discussion) yang umum diterima pada publikasi target (Sinta / Scopus).

## 2. Struktur File Naskah (Folder `07-manuskrip/`)

- `00-outline.md` — ringkasan poin utama tiap bagian.
- `01-abstrak.md` — inti dan klaim penemuan (Gin memimpin telak di baseline 29x, namun selisih menurun ke 4x pada kompleksitas I/O database tinggi).
- `02-pendahuluan.md` — latar belakang microservice dan arsitektur *threaded vs event-loop*.
- `03-tinjauan-pustaka.md` — evaluasi komparatif studi literatur relevan dari folder `02-literatur/`.
- `04-metodologi.md` — instrumen k6, topologi Docker, variabel (baseline, db_single, db_complex).
- `05-hasil-analisis.md` — penyajian tabel agregat (mean, median, p95), kalkulasi p-value ANOVA/T-test, visualisasi grafik p95 per skenario. Pembahasan mengenai kontribusi *latency I/O database* yang memudarkan keunggulan komputasi *native*.
- `06-kesimpulan.md` — sintesa simpulan & implikasi sistem skala nyata.
- `07-daftar-pustaka.md` — daftar referensi yang di-*generate* dari Mendeley/BibTeX.

## 3. Rencana Submit

1. Validasi format dengan *template* jurnal target.
2. Penyetaraan terminologi (memastikan penggunaan kata "Framework", "Latensi", "Throughput" konsisten pada draf berbahasa Indonesia / Inggris).
3. Pengiriman final.
