# Rencana Penelitian: Evaluasi Komparatif Performa Express.js vs Gin untuk REST API

## 1. Ringkasan

| Item | Keterangan |
|---|---|
| Judul | Evaluasi Komparatif Performa Express.js vs Gin untuk REST API dengan Variasi Kompleksitas Query Database |
| Target Publikasi | Jurnal terakreditasi Sinta / Scopus |
| Stack | Docker, PostgreSQL, Express.js (Node.js), Gin (Go), k6 |
| Masalah | Pilihan arsitektur (single-threaded event-loop vs multi-threaded compiled native) berdampak signifikan pada latensi dan utilisasi resource |
| Solusi | Melakukan eksperimen empiris terhadap kedua framework pada skenario beban (baseline, single query, complex query) menggunakan k6 untuk mengetahui variasi performa |

## 2. Alur Kerja (Roadmap)

Setiap tahap memiliki file rencana detail tersendiri agar lebih rapi:

- [x] **Tahap 1** — [Perancangan Arsitektur & Skema Database](tahap-1-arsitektur-dan-skema-database.md) — *Selesai*
- [x] **Tahap 2** — [Implementasi Backend (Express.js & Gin)](tahap-2-implementasi-backend.md) — *Selesai*
- [x] **Tahap 3** — [Skrip Pengujian k6](tahap-3-pengujian-k6.md) — *Selesai*
- [x] **Tahap 4** — [Ekstraksi Data & Visualisasi](tahap-4-analisis-data.md) — *Selesai*
- [x] **Tahap 5** — [Draf Paper Jurnal](tahap-5-draf-paper.md) — *Selesai*

---

## 3. Catatan

Dokumen ini adalah indeks utama. Detail teknis, skema, dan keputusan masing-masing tahap dicatat pada file `tahap-N-*.md` terkait dan diperbarui seiring progres pengerjaan.
