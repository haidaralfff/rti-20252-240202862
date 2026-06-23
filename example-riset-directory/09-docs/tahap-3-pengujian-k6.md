# Tahap 3: Pengujian k6

**Status:** Selesai

## 1. Alat Pengujian

Pengujian dilakukan menggunakan **k6** (oleh Grafana Labs) untuk menjamin metrik performa latensi HTTP diukur secara *low-overhead* dari sisi *load generator*. Ekspor data diringkas menggunakan opsi `--summary-export` dalam bentuk JSON dan CSV untuk menjaga ukuran data log tetap dapat dikelola.

## 2. Struktur Pengujian

Untuk mendapatkan data statistik yang valid dan robust terhadap anomali sesaat (*transient latency spikes*), eksperimen dikonfigurasi sebagai berikut:

- **Jumlah Skenario (Varian Trafik)**: 3 (`baseline`, `db_single`, `db_complex`)
- **Jumlah Target Backend**: 2 (Express.js, Gin)
- **Replikasi (Run per Kombinasi)**: 40 replikasi independen (membersihkan cache / restart koneksi tiap putaran)

Total iterasi pengujian: 3 × 2 × 40 = **240 runs pengujian.**

## 3. Parameter Virtual Users (VU)

Pengujian berjalan dengan pola `ramping-vus` (bertahap naik, konstan, kemudian turun) untuk setiap skenario:
- Durasi konstan: 30 detik pada 200 VUs.
- Menghasilkan puluhan ribu *requests* per putaran pengujian yang mendemonstrasikan limit utilisasi CPU atau bottleneck database.

## 4. Eksekusi

Semua pengujian diotomasi via script bash `run-matrix.sh` yang menjalankan iterasi, menangkap ringkasan k6, dan juga mengambil *snapshot* *resource container* (CPU%, Memori) melalui utilitas *docker stats* selama masa *load test*. Data akan disimpan di dalam folder `04-data/`.
