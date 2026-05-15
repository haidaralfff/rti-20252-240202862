# WS-06: System-Experiment Mapping

> **Bab 6 — System Design sebagai Experimental Artifact**

---

## Ringkasan Materi

### Sistem = Instrumen Pengujian, Bukan Produk

Seorang engineer bertanya "apakah sistem bekerja?" — seorang peneliti bertanya "apa yang bisa dibuktikan sistem ini?" Sistem dalam riset adalah **artifact** — objek yang sengaja dibuat untuk menguji klaim spesifik.

### System as Experiment Model

```
RQ → Variable → System Component → Experimental Setup → Output
```

Setiap komponen sistem harus bisa ditelusuri ke variabel riset (top-down), dan setiap pengukuran harus menjawab RQ (bottom-up).

### Mapping Variabel ke Komponen

| Tipe Variabel | Peran di Sistem | Contoh |
|---------------|----------------|--------|
| **IV** (Independent) | Modul yang bisa di-toggle/swap | Algoritma A vs B |
| **DV** (Dependent) | Modul pengukuran | Logger, metrics collector |
| **CV** (Control) | Config yang dikunci | Dataset, parameter tetap |

Jika variabel tidak bisa di-map ke komponen apapun → arsitektur perlu didesain ulang.

### 4 Prinsip Desain Eksperimental

| Prinsip | Pertanyaan Kunci |
|---------|-----------------|
| **Traceability** | Komponen ini melayani variabel yang mana? |
| **Modularity** | Bisakah IV diubah tanpa memengaruhi yang lain? |
| **Controllability** | Apakah CV dieksternalisasi ke config file? |
| **Measurability** | Apakah sistem otomatis menghasilkan data yang dibutuhkan? |

### Variable Isolation melalui Arsitektur

- **Modular architecture** — Pisahkan berdasarkan variabel
- **Configuration-driven** — Ubah config (YAML/JSON), bukan code
- **Feature toggles** — On/off flag untuk ablation study

### Research vs Engineering

| Aspek | Engineering | Research |
|-------|------------|----------|
| Tujuan sistem | Memenuhi kebutuhan user | Menguji hipotesis, menghasilkan bukti |
| Arsitektur | Optimasi performa & skalabilitas | Optimasi isolasi variabel & reprodusibilitas |
| Konfigurasi | Sering hardcoded | Dieksternalisasi ke config file |
| Fitur tambahan | Menambah nilai user | Menambah noise jika tidak terkait RQ |

### Istilah Penting

- **Artifact** — Objek yang sengaja dibuat untuk memecahkan masalah atau menguji proposisi
- **Traceability** — Kemampuan menelusuri hubungan RQ → variabel → komponen → output
- **Variable Isolation** — Mengubah hanya satu variabel sambil menahan yang lain konstan
- **Ablation Study** — Menguji kontribusi tiap komponen dengan melepasnya satu per satu
- **Configuration-driven Execution** — Semua parameter di config file, bukan hardcoded

---

## Template A.6 — Mapping RQ ke Arsitektur Sistem

```text
SYSTEM-EXPERIMENT MAPPING

Research Question: Apakah terdapat perbedaan yang signifikan pada metrik Response Time, Throughput, CPU Usage, dan Memory Usage antara framework backend modern (Express.js, Laravel FrankenPHP, Flask, Spring Boot, Gin) ketika menangani beban RESTful API dari skala ratusan hingga satu juta data?

Variable → Component Mapping:
| Variabel | Tipe | Komponen Sistem | Cara Manipulasi/Pengukuran |
|----------|------|-----------------|---------------------------|
| Jenis Framework | IV | Backend App (5 proyek beda framework) | _Start_ & _Stop_ _service_ pada port yang sama bergantian |
| Skala Data | IV | Load Tester (K6) | Variasikan setting `data_load` di file config script.js |
| Throughput & Resp. Time | DV | Modul Metrics K6 | Output JSON / K6 Dashboard berisi `req_duration` dll. |
| CPU & Memory | DV | Node_exporter & Prometheus | Pengambilan (scraping) interval hardware stat di server |
| PostgreSQL DB | CV | Database Server (DBMS) | Menahan 1 struktur tabel dan 1 volume data tetap |

4 Prinsip Desain:
  [x] Traceability — Setiap komponen bisa ditelusuri ke variabel
  [x] Variable Isolation — IV bisa diubah tanpa mengubah CV
  [x] Measurement Integration — Pengukuran DV built-in
  [x] Reproducibility — Setup bisa direkonstruksi

Experimental Setup:
  Input data     : Database PostgreSQL dengan struktur tabel KRS (hingga 1.000.000 baris).
  Parameter      : 20 Virtual Users selama 10 menit eksekusi script K6.
  Output format  : File `.csv`/`.json` dari K6 dan log metrik dari Grafana.
```

---

## Latihan 1 — Variable-to-Component Mapping

Gunakan RQ dan variabel dari WS-05. Petakan ke komponen sistem.

**RQ:** *Apakah kerangka kerja (framework) Spring Boot dan Gin menghasilkan Throughput (req/s) dan stabilitas Response Time (ms) yang secara signifikan lebih tinggi dibandingkan dengan Express.js dan Laravel ketika menangani beban REST API dengan dataset KRS mencapai 1.000.000 record?*

| Variabel | Tipe | Komponen Sistem | Cara Manipulasi / Pengukuran |
|----------|------|-----------------|---------------------------|
| *Jenis Framework* | *IV* | *Aplikasi Backend (5 repositori kode)* | *Menjalankan server aplikasi per port (misal `npm start` untuk Express.js)* |
| *Beban Load* | *IV* | *Skrip Uji K6* | *Mengubah variabel `stages` (duration & target VUs) pada K6.* |
| *Throughput / Resp. Time* | *DV* | *K6 Dashboard* | *Otomatis dihitung melalui metrik standar `http_req_duration` dan `http_reqs`* |
| *Resource CPU/Memori* | *DV* | *Grafana & Prometheus* | *Metrik di-scrape setiap 1 detik dari *node_exporter* OS.* |
| *Database PostgreSQL* | *CV* | *DBMS Postgres Container* | *Gunakan Docker Image/Volume yang sama persis untuk tiap sesi uji.* |

**Apakah semua variabel bisa di-map?** [x] Ya / [ ] Tidak
> Jika tidak, komponen apa yang perlu ditambahkan? *Sudah ter-map seluruhnya.*

---

## Latihan 2 — 4 Prinsip Desain

Evaluasi desain sistem terhadap 4 prinsip.

| Prinsip | Status | Bukti / Penjelasan |
|---------|--------|-------------------|
| Traceability | *✅* | *Setiap variabel riset (framework, beban) direpresentasikan dengan jelas sebagai layanan/server independen dalam eksekusi uji.* |
| Modularity | *✅* | *Sistem tester (K6) dan sistem backend terpisah secara arsitektur, sehingga skrip tester tidak membebani komputasi backend.* |
| Controllability | *✅* | *Kondisi pengujian seperti waktu 10 menit dan 20 VU dieksternalisasikan di dalam config skrip k6 (misal `.env` atau parameter CLI).* |
| Measurability | *✅* | *Perekaman CPU/Memory tidak lagi dilakukan dengan menatap Task Manager (manual), melainkan menggunakan sistem otomatis Prometheus/Grafana yang konsisten (terukur otomatis).* |

**Prinsip mana yang paling sulit dipenuhi?** *Controllability (Pengendalian Variabel Kontrol).*
**Strategi untuk mengatasinya:**
> *Mengontrol agar setiap framework menggunakan query ORM yang persis sama kualitasnya sangat sulit (misal Prisma di Node.js vs Eloquent di Laravel). Strateginya adalah dengan menulis RAW SQL Query standar di semua framework jika memungkinkan, atau memastikan tingkat efisiensi ORM dikonfigurasi sama (contoh menonaktifkan "lazy loading").*

---

## Latihan 3 — Ablation Study Planning

Jika sistem memiliki 3 komponen utama, rencanakan ablation study.

| Kondisi | Komponen A | Komponen B | Komponen C | Hasil yang Diharapkan |
|---------|-----------|-----------|-----------|----------------------|
| Full | *✅ Framework (Misal Laravel)* | *✅ ORM Aktif* | *✅ Server FrankenPHP* | *Performa baseline penuh yang dicatat di metrik riset utama.* |
| – A | ❌ (Ganti PHP Native) | ✅ | ✅ | *Waktu eksekusi jauh lebih cepat, overhead routing berkurang, membuktikan bahwa layer middleware Laravel adalah yang memperlambat performa.* |
| – B | ✅ | ❌ (Ganti Raw Query SQL) | ✅ | *Akurasi performa akan meningkat tajam, throughput tinggi, membuktikan object hydration dari ORM adalah sumber bottleneck.* |
| – C | ✅ | ✅ | ❌ (Ganti PHP-FPM klasik) | *Memory footprint akan turun, tetapi kemampuan menangani antrean (concurrency) akan jeblok parah.* |

**Komponen mana yang diprediksi paling berkontribusi?** *Komponen C (Server Environment - FrankenPHP vs PHP-FPM klasik) atau Komponen B.*
**Mengapa?**
> *Karena dalam penelitian Azzahidi et al. (2025) untuk kasus Laravel, arsitektur dasar PHP yang setiap request-nya membuat *process* baru (di PHP-FPM klasik) sangat lambat. Penggunaan FrankenPHP/Octane yang menggunakan event-loop (merubah perilaku PHP mirip Node.js) memberikan lonjakan signifikan yang lebih mendasar ketimbang perbedaan penulisan syntax ORM.*

---

## Refleksi

> Apa risiko jika sistem dibangun seperti produk (monolitik, fitur lengkap) lalu baru dilakukan eksperimen? Mengapa arsitektur modular penting untuk riset?

**Jawaban:**
> *Jika API testing dibebani dengan authentication token (JWT), caching layer, dan 3rd-party loggers (Sentry), maka saat Throughput rendah, kita tidak akan tahu siapa tersangkanya. Apakah framework utamanya yang lambat, ataukah algoritma pembacaan token JWT-nya yang memakan CPU? Inilah mengapa dalam pengujian kinerja komparatif riset, arsitektur harus "telanjang" dan modular. Tujuannya bukan menguji aplikasi production, melainkan mengevaluasi murni kinerja "engine" dari framework tersebut tanpa intervensi confounding variables.*
