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

```
SYSTEM-EXPERIMENT MAPPING

Research Question: Bagaimana perbandingan efektivitas 5 algoritma Machine Learning ketika diimplementasikan pada 5 studi kasus dataset yang berbeda karakteristiknya?

Variable → Component Mapping:
| Variabel | Tipe | Komponen Sistem | Cara Manipulasi/Pengukuran |
|----------|------|-----------------|---------------------------|
| Jenis Algoritma | IV | Modul Model ML (Scikit-Learn/TensorFlow) | Mengganti argumen `model_type` di file YAML |
| Jenis Dataset | IV | Modul Data Ingestion/Loader | Mengganti path input direktori dataset |
| F1-Score & Akurasi | DV | Modul Metrics Evaluator | Output JSON file berisi `classification_report` |
| Skema Preprocessing | CV | Modul Preprocessor (SMOTE/TF-IDF) | Dikunci konfigurasinya per jenis dataset |

4 Prinsip Desain:
  [x] Traceability — Setiap komponen bisa ditelusuri ke variabel
  [x] Variable Isolation — IV bisa diubah tanpa mengubah CV
  [x] Measurement Integration — Pengukuran DV built-in
  [x] Reproducibility — Setup bisa direkonstruksi

Experimental Setup:
  Input data     : 5 format CSV/Log dari berbagai domain (Sentimen, Beasiswa, NIDS, dsb).
  Parameter      : Konfigurasi model ML (contoh: k-value pada KNN, depth pada XGB).
  Output format  : File `.json` atau `.csv` berisi metrik performa & confusion matrix.
```

---

## Latihan 1 — Variable-to-Component Mapping

Gunakan RQ dan variabel dari WS-05. Petakan ke komponen sistem.

**RQ:** *Bagaimana perbandingan efektivitas 5 algoritma Machine Learning ketika diimplementasikan pada 5 studi kasus dataset yang berbeda karakteristiknya?*

| Variabel | Tipe | Komponen Sistem | Cara Manipulasi / Pengukuran |
|----------|------|-----------------|---------------------------|
| *Algoritma ML* | *IV* | *Modul Classifier Pipeline* | *Swap nilai dari parameter `algorithm` di config* |
| *Dataset* | *IV* | *Modul Data Loader* | *Ganti path `dataset_url` pada konfigurasi* |
| *Kinerja Klasifikasi* | *DV* | *Modul Metrics Logger* | *Otomatis menghitung Akurasi & F1-Score dari Confusion Matrix* |
| *Waktu Komputasi* | *DV* | *Modul Profiler* | *Menghitung `time.time()` sebelum dan sesudah `model.fit()`* |
| *Data Prapemrosesan* | *CV* | *Modul Preprocessor* | *Memastikan fungsi spesifik jalan (misal TF-IDF wajib untuk teks)* |

**Apakah semua variabel bisa di-map?** [x] Ya / [ ] Tidak
> Jika tidak, komponen apa yang perlu ditambahkan? *Sudah ter-map seluruhnya.*

---

## Latihan 2 — 4 Prinsip Desain

Evaluasi desain sistem terhadap 4 prinsip.

| Prinsip | Status | Bukti / Penjelasan |
|---------|--------|-------------------|
| Traceability | *✅* | *Setiap variabel (seperti Algoritma dan Dataset) direpresentasikan oleh *Class*/*Fungsi* terpisah di dalam *script* Python eksperimen.* |
| Modularity | *✅* | *Bisa menukar dataset teks ke dataset numerik tanpa mengganggu baris kode evaluasi akurasinya.* |
| Controllability | *✅* | *Hyperparameter spesifik untuk kelima model dieksternalisasi menggunakan satu file `config.yaml` terpusat.* |
| Measurability | *✅* | *F1-score dan *training time* otomatis di-ekstrak dan disimpan di folder *results/* setelah program selesai.* |

**Prinsip mana yang paling sulit dipenuhi?** *Controllability*.
**Strategi untuk mengatasinya:**
> *Mengelola hyperparameter 5 algoritma untuk 5 dataset yang berbeda di dalam satu file raksasa sangat sulit dan rawan salah. Strategi mengatasinya adalah menggunakan arsitektur "Modular Configuration" (membuat 1 file YAML khusus per domain/dataset).*

---

## Latihan 3 — Ablation Study Planning

Jika sistem memiliki 3 komponen utama, rencanakan ablation study.

| Kondisi | Komponen A | Komponen B | Komponen C | Hasil yang Diharapkan |
|---------|-----------|-----------|-----------|----------------------|
| Full | *✅ XGBoost* | *✅ SMOTE (Oversampling)* | *✅ Seleksi Fitur* | *Performa baseline penuh maksimal (Akurasi Tinggi, F1 Tinggi).* |
| – A | ❌ (Ganti Naive Bayes) | ✅ | ✅ | *Waktu eksekusi jauh lebih cepat, namun F1-score turun karena algoritma kurang kompleks (kurang robust terhadap noise).* |
| – B | ✅ | ❌ (Tanpa SMOTE) | ✅ | *Akurasi global tetap tinggi, tetapi Precision dan Recall untuk minoritas (kelas rentan) akan anjlok drastis (hampir 0).* |
| – C | ✅ | ✅ | ❌ (Tanpa Seleksi) | *Performa mungkin stagnan, tapi *Training Time* akan membengkak, dan risiko *overfitting* semakin tinggi.* |

**Komponen mana yang diprediksi paling berkontribusi?** *Komponen B (SMOTE)*.
**Mengapa?**
> *Dalam mayoritas paper kasus medis, NIDS, dan beasiswa, masalah utamanya adalah "Imbalanced Data" ekstrem (misalnya sampel fraud/serangan sangat sedikit dibanding data normal). Tanpa SMOTE (Komponen B), secerdas apapun algoritma utamanya (XGBoost), model pasti akan bias menebak kelas mayoritas.*

---

## Refleksi

> Apa risiko jika sistem dibangun seperti produk (monolitik, fitur lengkap) lalu baru dilakukan eksperimen? Mengapa arsitektur modular penting untuk riset?

**Jawaban:**
> *Risiko utamanya adalah "Confounding Variables" tidak bisa dilacak. Jika sistem dibangun monolitik (hardcoded), ketika akurasi naik, kita tidak tahu secara pasti apakah itu karena kehebatan algoritma (IV) atau karena "kebocoran data" saat pra-pemrosesan (CV) yang tergabung di satu fungsi raksasa. Arsitektur modular sangat krusial agar kita bisa melakukan "Variable Isolation" dan membuktikan relasi sebab-akibat (causality) dalam penelitian secara ilmiah.*
