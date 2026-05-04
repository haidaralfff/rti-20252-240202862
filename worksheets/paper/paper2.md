Muhammad Thoriq^1 , Fajar Maulana^2 , Sakinah Ali Pitchay^3 , Farida Ridzuan^4 , Wega Ramanda^5
Jurnal Pustaka AI Vol. 6 No. 1 ( 2026 ) 81 – 91
Submitted : 20 - 04 - 2026 | Reviewed : 25 - 04 - 2026 | Accepted : 30 - 04 - 2026
Explainable AI pada Seleksi Beasiswa KIP Berbasis Machine Learning di
Universitas Adzkia
Muhammad Thoriq^1 , Fajar Maulana^2 , Sakinah Ali Pitchay^3 , Farida Ridzuan^4 , Wega Ramanda^5
(^125) Informatika, Universitas Adzkia
(^134) Faculty of Science and Technology, Universiti Sains Islam Malaysia, Negeri Sembilan, Malaysia
(^34) Cybersecurity & Systems Research Unit, Universiti Sains Islam Malaysia, Negeri Sembilan, Malaysia
(^1) thoriq.if@adzkia.ac.id*, (^2) fajar@adzkia.ac.id, 3 sakinah.ali@usim.edu.my, (^4) farida@usim.edu.my,
(^5) ramandawega29@gmail.com.
Abstract
The Kartu Indonesia Pintar Kuliah (KIP-K) scholarship program is designed to expand access to higher
education for students from economically disadvantaged families. However, the increasing number of applicants
and the complexity of socio-economic verification often make the selection process challenging for universities.
This study proposes a machine learning–based approach integrated with Explainable Artificial Intelligence
(XAI) to support scholarship eligibility recommendations by using real selection data from Universitas Adzkia.
The dataset consists of 829 applicants with socio-economic attributes that include P3KE status, parental income,
number of dependents, parents’ occupation and school origin. A Random Forest classifier was employed to
build the prediction model while validation model was conducted using 5-fold cross-validation and evaluation
metrics that include accuracy, precision, recall, F1-score and confusion matrix. Because the dataset is
imbalanced, threshold optimization was applied to improve the detection of eligible applicants. To enhance
model transparency, SHapley Additive exPlanations (SHAP) were used to interpret model predictions both
globally and locally. The results show that socio-economic factors such as P3KE status, number of dependents,
parental income and school location significantly influence scholarship eligibility predictions. The integration of
machine learning and SHAP enables not only predictive decision support but also transparent explanation of
individual predictions. This approach can support more objective, transparent and data-driven scholarship
selection processes in higher education institutions.
Keywords: machine learning, scholarship selection, explainable artificial intelligence, random forest, shap
Abstrak
Program Kartu Indonesia Pintar Kuliah (KIP-K) bertujuan memperluas akses pendidikan tinggi bagi mahasiswa
dari keluarga kurang mampu. Namun, peningkatan jumlah pendaftar serta kompleksitas verifikasi kondisi sosial
ekonomi menimbulkan tantangan dalam menjaga objektivitas dan transparansi proses seleksi. Penelitian ini
mengusulkan pendekatan berbasis machine learning yang terintegrasi dengan Explainable Artificial Intelligence
(XAI) untuk mendukung rekomendasi kelayakan penerima beasiswa menggunakan data riil seleksi Universitas
Adzkia. Dataset terdiri dari 829 pendaftar dengan variabel sosial ekonomi seperti status P3KE, penghasilan
orang tua, jumlah tanggungan keluarga, pekerjaan orang tua serta asal sekolah. Model klasifikasi dibangun
menggunakan algoritma Random Forest dan divalidasi dengan 5 - fold cross validation menggunakan accuracy
matrix, precision, recall, F1-score dan confusion matrix. Karena dataset tidak seimbang, dilakukan threshold
optimization yang menghasilkan nilai F1-score terbaik sebesar 0,37 pada threshold 0,05 dengan akurasi sebesar
0,53. Untuk meningkatkan transparansi model digunakan metode SHapley Additive exPlanations (SHAP) untuk
interpretasi global dan lokal. Hasil penelitian menunjukkan bahwa faktor sosial ekonomi seperti status P3KE,
jumlah tanggungan, penghasilan orang tua serta wilayah asal sekolah merupakan determinan utama dalam
prediksi kelayakan penerima beasiswa. Integrasi machine learning dan XAI memungkinkan sistem seleksi yang
lebih objektif, transparan dan dapat dijelaskan.
Vol. 6 No. 1 ( 2026 ) 81 – 91 E ISSN: 2809 - 4069
https://jurnal.pustakagalerimandiri.co.id/index.php/pustakaai
DOI : https://doi.org/10.55382/jurnalpustakaai.v 6 i 1. 1767

Jurnal Pustaka AI Vol. 6 No. 1 ( 2026 ) 81 – 91
Submitted : 20 - 04 - 2026 | Reviewed : 25 - 04 - 2026 | Accepted : 30 - 04 - 2026
Kata kunci: machine learning, seleksi beasiswa, explainable artificial intelligence, random forest, SHAP

© 202 6 Author
Creative Commons Attribution 4.0 International License
1. Pendahuluan

Program Kartu Indonesia Pintar Kuliah (KIP-K) merupakan salah satu upaya pemerintah Indonesia untuk
memperluas akses pendidikan tinggi bagi mahasiswa dari keluarga kurang mampu. Dalam implementasinya,
proses seleksi penerima beasiswa menghadapi tantangan berupa peningkatan jumlah pendaftar, keterbatasan
kuota, serta kompleksitas variabel sosial ekonomi yang harus diverifikasi. Kondisi ini menuntut adanya
pendekatan berbasis data untuk meningkatkan objektivitas dan efisiensi dalam pengambilan keputusan seleksi
[1].

Seiring dengan perkembangan Educational Data Mining , berbagai metode machine learning telah digunakan
dalam seleksi beasiswa untuk meningkatkan akurasi dan konsistensi keputusan. Algoritma seperti Random
Forest, Logistic Regression, Classification Tree, dan XGBoost telah menunjukkan performa yang baik dalam
memodelkan data berbasis variabel sosial ekonomi [1]–[5]. Studi sebelumnya di Universitas Adzkia
menunjukkan bahwa Random Forest mampu mengungguli Naïve Bayes dalam prediksi kelulusan seleksi KIP,
terutama pada data yang tidak seimbang ( imbalanced dataset ) [1]. Namun, sebagian besar penelitian masih
berfokus pada performa prediktif tanpa memberikan penjelasan yang memadai terhadap hasil keputusan model.

Permasalahan utama dari pendekatan tersebut adalah rendahnya transparansi model, khususnya pada algoritma
yang bersifat black-box seperti Random Forest dan XGBoost [8], [9]. Dalam konteks seleksi bantuan pendidikan,
transparansi menjadi aspek penting karena setiap keputusan harus dapat dipertanggungjawabkan secara rasional.
Selain itu, kesalahan klasifikasi seperti false negative , yaitu kandidat yang sebenarnya layak tetapi diprediksi
tidak layak, memiliki implikasi sosial yang lebih besar dibandingkan kesalahan sebaliknya. Kondisi ini
menunjukkan bahwa evaluasi model tidak hanya harus mempertimbangkan akurasi, tetapi juga sensitivitas
terhadap kelas minoritas [7].

Untuk mengatasi keterbatasan tersebut, berkembang pendekatan Explainable Artificial Intelligence (XAI) yang
bertujuan meningkatkan interpretabilitas model pembelajaran mesin. Salah satu metode yang banyak digunakan
adalah SHapley Additive exPlanations (SHAP) , yang mampu memberikan atribusi kontribusi setiap fitur
terhadap hasil prediksi model baik secara global maupun lokal [11], [12]. Penerapan SHAP dalam bidang
pendidikan telah menunjukkan kemampuannya dalam menjelaskan determinan keputusan model secara
transparan [4], [6]. Namun, penelitian XAI pada seleksi KIP masih terbatas, terutama yang menggunakan data
sintetik sehingga belum mencerminkan kondisi data riil [5].

Berdasarkan tinjauan tersebut, terdapat celah penelitian pada integrasi model klasifikasi berbasis data riil dengan
pendekatan explainable machine learning yang komprehensif. Studi sebelumnya telah mengidentifikasi Random
Forest sebagai model yang optimal dalam seleksi KIP di Universitas Adzkia [1], namun belum
mengimplementasikan metode SHAP untuk menjelaskan keputusan model pada tingkat individu.

Oleh karena itu, penelitian ini mengusulkan integrasi model Random Forest dengan metode SHAP pada data riil
seleksi KIP Universitas Adzkia. Penelitian ini berkontribusi dalam mengembangkan model seleksi beasiswa
yang tidak hanya optimal secara prediktif, tetapi juga transparan dan dapat dijelaskan. Melalui analisis global
dan lokal berbasis SHAP, penelitian ini mengidentifikasi determinan utama kelulusan serta menyediakan
kerangka kerja seleksi beasiswa berbasis kecerdasan buatan yang lebih objektif, transparan, dan dapat
direplikasi.

2. Metode Penelitian

Penelitian ini menggunakan pendekatan kuantitatif eksperimental untuk membangun model klasifikasi kelayakan
penerima beasiswa KIP berbasis machine learning serta menginterpretasikan hasilnya menggunakan pendekatan
Explainable Artificial Intelligence (XAI). Tahapan penelitian meliputi pengumpulan data, prapemrosesan,

Jurnal Pustaka AI Vol. 6 No. 1 ( 2026 ) 81 – 91
Submitted : 20 - 04 - 2026 | Reviewed : 25 - 04 - 2026 | Accepted : 30 - 04 - 2026
pembangunan model, validasi, evaluasi, dan interpretasi model. Alur tahapan penelitian secara sistematis
ditunjukkan pada Gambar 1.

Gambar 1. Alur Tahapan Penelitian
2.1 Pengumpulan dan Deskripsi Data

Data yang digunakan merupakan data riil pendaftar KIP Seleksi Mandiri PTS Universitas Adzkia Tahun
Akademik 2024/2025. Dataset memuat variabel sosial ekonomi dan akademik yang digunakan sebagai dasar
pengambilan keputusan seleksi.

Variabel yang dianalisis meliputi Status DTKS, Status P3KE (desil kesejahteraan), Kab/Kota Sekolah, Jenis
Kelamin, Pekerjaan Ayah dan Ibu, Penghasilan Ayah dan Ibu, Status Orang Tua, Jumlah Tanggungan, Pilihan
Program Studi, serta Status Diterima/Tidak Diterima sebagai variabel target.

Penggunaan variabel sosial ekonomi dalam pemodelan seleksi bantuan pendidikan sejalan dengan pendekatan
Educational Data Mining yang memanfaatkan data administratif untuk mendukung pengambilan keputusan
pendidikan [13]. Studi klasifikasi seleksi KIP sebelumnya juga menunjukkan bahwa pendekatan machine
learning efektif dalam meningkatkan objektivitas seleksi dibandingkan dengan metode manual [1], [3].

Tabel 1. Deskripsi Variabel Penelitian
Variabel Tipe Data Keterangan
Status P3KE Kategorikal Desil kesejahteraan
Penghasilan Ayah Numerik Pendapatan bulanan (Rp)
Penghasilan Ibu Numerik Pendapatan bulanan (Rp)
Jumlah Tanggungan Numerik Jumlah anggota keluarga
Kab/Kota Sekolah Kategorikal Lokasi asal sekolah
Pilihan Prodi Kategorikal Program studi yang dipilih
Diterima/Tidak Diterima Biner Target klasifikasi
2.2 Pra-Pemrosesan Data

Tahap pra-pemrosesan data dilakukan untuk memastikan kualitas data sebelum digunakan dalam proses
pemodelan machine learning. Proses ini meliputi pembersihan data, transformasi variabel serta pembagian
dataset menjadi data pelatihan dan data pengujian.

Pada tahap awal dilakukan pembersihan data ( data cleaning ) untuk menghilangkan nilai yang tidak konsisten
serta menyesuaikan format variabel numerik dan kategorikal. Variabel penghasilan orang tua yang sebelumnya

Jurnal Pustaka AI Vol. 6 No. 1 ( 2026 ) 81 – 91
Submitted : 20 - 04 - 2026 | Reviewed : 25 - 04 - 2026 | Accepted : 30 - 04 - 2026
berbentuk rentang nilai diubah menjadi nilai numerik agar dapat diproses oleh algoritma pembelajaran mesin.
Nilai yang tidak tersedia juga disesuaikan agar tetap konsisten dengan distribusi data yang ada [14].

Selanjutnya, variabel kategorikal seperti Status P3KE, Status DTKS, Kab/Kota Sekolah, Jenis Kelamin, serta
pilihan program studi dikonversi menggunakan teknik One-Hot Encoding sehingga dapat direpresentasikan
dalam bentuk numerik. Transformasi ini diperlukan karena sebagian besar algoritma machine learning hanya
dapat memproses input dalam bentuk numerik.

Setelah proses transformasi selesai, dataset dibagi menjadi dua bagian, yaitu data pelatihan ( training set ) sebesar
80% dan data pengujian ( test set ) sebesar 20%. Pembagian data dilakukan menggunakan pendekatan stratified
split untuk menjaga proporsi distribusi kelas tetap seimbang antara data pelatihan dan data pengujian.
Pendekatan ini umumnya digunakan dalam penelitian prediksi berbasis data pendidikan untuk menjaga stabilitas
model yang dihasilkan [15].

2.3 Pembangunan Model

Model klasifikasi yang digunakan dalam penelitian ini adalah Random Forest Classifier. Random Forest
merupakan metode ensemble learning yang menggabungkan banyak pohon keputusan ( decision tree ) untuk
menghasilkan prediksi yang lebih stabil dan akurat. Metode ini dikenal memiliki kemampuan yang baik dalam
menangani data dengan dimensi yang tinggi serta mampu mengurangi risiko overfitting dibandingkan dengan
model pohon keputusan tunggal.

Pemilihan Random Forest dalam penelitian ini didasarkan pada hasil penelitian sebelumnya yang menunjukkan
bahwa metode ini mampu memberikan performa klasifikasi yang lebih baik dibandingkan dengan metode Naïve
Bayes dalam seleksi penerima KIP di Universitas Adzkia [1]. Selain itu, Random Forest juga relatif robust
terhadap data yang tidak seimbang dan dapat menangani kombinasi variabel numerik dan kategorikal secara
efektif.

Dalam penelitian ini, model Random Forest dibangun menggunakan parameter utama berupa jumlah pohon
keputusan (n_estimators) sebanyak 100 serta random_state sebesar 42 untuk memastikan reproduktibilitas
eksperimen. Proses pelatihan model dilakukan menggunakan data training yang telah melalui tahap
prapemrosesan sebelumnya.

2.4 Validasi Model

Untuk memastikan stabilitas model yang dihasilkan, proses validasi dilakukan menggunakan teknik k- Fold
Cross Validation dengan nilai k = 5. Metode ini bekerja dengan membagi data pelatihan menjadi lima bagian, di
mana empat bagian digunakan untuk melatih model dan satu bagian digunakan untuk proses validasi. Proses ini
dilakukan secara bergantian hingga seluruh bagian data digunakan sebagai data validasi.

Evaluasi performa model dilakukan menggunakan beberapa metrik klasifikasi yang umum digunakan dalam
penelitian machine learning, yaitu Accuracy , Precision , Recall , dan F1- Score. Selain itu, digunakan juga
Confusion Matrix untuk menganalisis distribusi kesalahan klasifikasi antara kelas yang diprediksi dan kelas
sebenarnya.

Dalam konteks seleksi bantuan pendidikan, perhatian khusus diberikan pada metrik recall pada kelas penerima
beasiswa. Hal ini disebabkan oleh kesalahan klasifikasi yang menyebabkan kandidat yang sebenarnya layak
tidak terpilih (false negative) dapat memiliki implikasi sosial yang lebih besar dibandingkan dengan kesalahan
sebaliknya [16].

Selain evaluasi menggunakan threshold standar, penelitian ini juga melakukan penyesuaian threshold
probabilitas untuk meningkatkan sensitivitas model terhadap kelas minoritas. Pendekatan ini bertujuan untuk
meningkatkan keseimbangan antara precision dan recall dalam proses klasifikasi.

2.5 Interpretasi SHAP

Meskipun Random Forest mampu memberikan performa prediksi yang baik, model ini termasuk dalam kategori
black-box model karena proses pengambilan keputusan di dalamnya tidak mudah diinterpretasikan secara
langsung. Oleh karena itu, penelitian ini menggunakan pendekatan Explainable Artificial Intelligence (XAI)
untuk meningkatkan transparansi model.

Jurnal Pustaka AI Vol. 6 No. 1 ( 2026 ) 81 – 91
Submitted : 20 - 04 - 2026 | Reviewed : 25 - 04 - 2026 | Accepted : 30 - 04 - 2026
Metode interpretasi yang digunakan adalah SHapley Additive exPlanations (SHAP). SHAP merupakan metode
interpretasi berbasis teori permainan kooperatif yang menghitung kontribusi setiap fitur terhadap hasil prediksi
model. Pendekatan ini memungkinkan analisis yang lebih transparan mengenai faktor-faktor yang memengaruhi
keputusan model [11].

Dalam penelitian ini, analisis SHAP dilakukan pada dua tingkat interpretasi. Pertama adalah analisis global,
yaitu untuk mengidentifikasi fitur-fitur yang paling berpengaruh terhadap keputusan model secara keseluruhan.
Kedua adalah analisis lokal, yaitu untuk menjelaskan kontribusi masing-masing variabel terhadap prediksi pada
individu tertentu.

Pendekatan ini memungkinkan proses seleksi penerima beasiswa tidak hanya menghasilkan prediksi klasifikasi,
tetapi juga memberikan penjelasan mengenai faktor-faktor yang memengaruhi keputusan tersebut. Penggunaan
metode interpretasi seperti SHAP semakin banyak digunakan dalam penelitian pendidikan berbasis machine
learning untuk meningkatkan transparansi dan akuntabilitas sistem pengambilan keputusan [8].

3. Hasil dan Pembahasan

3.1 Deskripsi Dataset

Dataset yang digunakan dalam penelitian ini merupakan data riil pendaftar program Kartu Indonesia Pintar
Kuliah (KIP-K) pada seleksi mandiri Perguruan Tinggi Swasta Universitas Adzkia tahun akademik 2024/2025.
Dataset memuat informasi sosial ekonomi dan latar belakang pendidikan calon mahasiswa yang digunakan
sebagai dasar dalam proses seleksi penerima beasiswa.

Setelah proses pra-pemrosesan data dilakukan, dataset yang digunakan dalam penelitian ini terdiri dari 829 data
pendaftar. Variabel target dalam penelitian ini adalah status kelulusan seleksi yang terdiri dari dua kelas, yaitu
diterima dan tidak diterima sebagai penerima beasiswa KIP. Distribusi kelas pada dataset ditunjukkan pada
Tabel 2.

Tabel 2. Distribusi Kelas Dataset
Status Seleksi Jumlah Data
Tidak diterima 634
Diterima 195
Total 829
Berdasarkan distribusi tersebut terlihat bahwa jumlah data pada kedua kelas tidak seimbang, dimana jumlah
kandidat yang tidak diterima lebih besar dibandingkan kandidat yang diterima. Kondisi ini menunjukkan bahwa
dataset memiliki karakteristik imbalanced dataset , yaitu distribusi kelas yang tidak merata.

Dalam konteks klasifikasi machine learning , ketidakseimbangan distribusi kelas dapat memengaruhi performa
model, terutama dalam kemampuan model untuk mendeteksi kelas minoritas. Model klasifikasi cenderung lebih
mudah memprediksi kelas mayoritas dibandingkan dengan kelas minoritas, sehingga diperlukan evaluasi model
yang tidak hanya berfokus pada akurasi, tetapi juga mempertimbangkan metrik lain seperti precision , recall , dan
F1- score [7].

Distribusi kelas seperti ini juga umum ditemukan dalam penelitian yang berkaitan dengan seleksi bantuan
pendidikan atau prediksi kinerja akademik, di mana jumlah individu yang memenuhi kriteria tertentu sering kali
lebih sedikit dibandingkan populasi secara keseluruhan [2].

Jurnal Pustaka AI Vol. 6 No. 1 ( 2026 ) 81 – 91
Submitted : 20 - 04 - 2026 | Reviewed : 25 - 04 - 2026 | Accepted : 30 - 04 - 2026
3.2 Evaluasi Model Random Forest

Kinerja model Random Forest dievaluasi menggunakan confusion matrix untuk menganalisis distribusi hasil
klasifikasi antara prediksi model dan label sebenarnya. Confusion matrix dari model yang dihasilkan ditunjukkan
pada Gambar 2.

Gambar 2. Confusion Matrix Model Random Forest
Berdasarkan confusion matrix tersebut, model berhasil mengklasifikasikan 124 data secara benar sebagai tidak
diterima ( true negative ) dan 2 data secara benar sebagai diterima ( true positive ). Namun demikian, terdapat 37
data yang sebenarnya diterima tetapi diprediksi tidak diterima ( false negative ) serta 3 data yang sebenarnya tidak
diterima tetapi diprediksi diterima ( false positive ).

Hasil ini menunjukkan bahwa model memiliki kemampuan yang cukup baik dalam mengenali kelas mayoritas,
yaitu kandidat yang tidak diterima. Namun, kemampuan model dalam mendeteksi kandidat yang diterima masih
relatif rendah, yang terlihat dari jumlah false negative yang cukup besar. Kondisi ini umumnya terjadi pada
dataset yang memiliki distribusi kelas tidak seimbang ( imbalanced dataset ), di mana jumlah data pada kelas
mayoritas jauh lebih besar dibandingkan kelas minoritas.

Dalam konteks seleksi bantuan pendidikan, kesalahan klasifikasi berupa false negative memiliki implikasi yang
penting karena berpotensi menyebabkan kandidat yang sebenarnya layak menerima bantuan tidak terpilih oleh
model. Oleh karena itu, evaluasi model tidak hanya mempertimbangkan nilai akurasi, tetapi juga metrik lain
seperti precision, recall, dan F1-score untuk memperoleh gambaran performa model secara lebih komprehensif.

3.3 Threshold Optimization

Pada model klasifikasi berbasis probabilitas seperti Random Forest , keputusan klasifikasi umumnya
menggunakan nilai ambang batas ( threshold ) default sebesar 0,5. Artinya, suatu data akan diklasifikasikan
sebagai kelas positif apabila probabilitas prediksi lebih besar atau sama dengan 0,5. Namun, pada dataset dengan

Jurnal Pustaka AI Vol. 6 No. 1 ( 2026 ) 81 – 91
Submitted : 20 - 04 - 2026 | Reviewed : 25 - 04 - 2026 | Accepted : 30 - 04 - 2026
distribusi kelas yang tidak seimbang, penggunaan threshold default sering kali menyebabkan model lebih
cenderung memprediksi kelas mayoritas dibandingkan kelas minoritas.

Dalam penelitian ini, distribusi kelas menunjukkan ketidakseimbangan antara jumlah kandidat yang diterima dan
tidak diterima sebagai penerima beasiswa KIP. Kondisi ini menyebabkan model lebih sering memprediksi kelas
mayoritas, yaitu kandidat yang tidak diterima. Akibatnya, kemampuan model dalam mendeteksi kandidat yang
benar-benar layak menerima beasiswa menjadi relatif rendah.

Untuk mengatasi permasalahan tersebut, dilakukan proses threshold optimization , yaitu dengan menguji
beberapa nilai threshold probabilitas yang berbeda untuk menentukan nilai ambang yang dapat menghasilkan
keseimbangan terbaik antara precision dan recall. Nilai threshold yang diuji berada pada rentang 0,05 hingga
0,50 dengan interval tertentu.

Hasil eksperimen menunjukkan bahwa penggunaan threshold yang lebih rendah dibandingkan dengan threshold
standar mampu meningkatkan kemampuan model dalam mendeteksi kelas minoritas. Berdasarkan pengujian
yang dilakukan, nilai threshold sebesar 0,05 menghasilkan nilai F1- score tertinggi sebesar 0,371 dibandingkan
dengan threshold lainnya. Hal ini menunjukkan bahwa penyesuaian threshold dapat meningkatkan
keseimbangan antara precision dan recall dalam proses klasifikasi.

Meskipun penggunaan threshold yang lebih rendah menyebabkan penurunan nilai akurasi secara keseluruhan,
pendekatan ini dinilai lebih sesuai dalam konteks seleksi bantuan pendidikan. Hal ini disebabkan oleh kesalahan
klasifikasi berupa false negative , yaitu kandidat yang sebenarnya layak tetapi diprediksi tidak layak, memiliki
implikasi sosial yang lebih besar dibandingkan dengan kesalahan klasifikasi sebaliknya.

Pendekatan penyesuaian threshold seperti ini juga banyak digunakan dalam penelitian klasifikasi pada dataset
tidak seimbang untuk meningkatkan sensitivitas model terhadap kelas minoritas tanpa harus melakukan
perubahan pada struktur algoritma yang digunakan. Oleh karena itu, dalam penelitian ini threshold yang
digunakan pada tahap analisis selanjutnya disesuaikan berdasarkan hasil eksperimen tersebut.

3.4 SHAP Global Explanation

Untuk meningkatkan transparansi model Random Forest, penelitian ini menggunakan pendekatan Explainable
Artificial Intelligence (XAI) dengan metode SHapley Additive exPlanations (SHAP). Metode SHAP
memungkinkan interpretasi kontribusi setiap fitur terhadap hasil prediksi model dengan mengukur nilai
kontribusi fitur berdasarkan konsep nilai Shapley dari teori permainan kooperatif [11].

Analisis global dilakukan untuk mengidentifikasi fitur-fitur yang paling berpengaruh terhadap keputusan model
secara keseluruhan. Visualisasi hasil interpretasi global menggunakan SHAP summary plot ditunjukkan pada
Gambar 3.

Jurnal Pustaka AI Vol. 6 No. 1 ( 2026 ) 81 – 91
Submitted : 20 - 04 - 2026 | Reviewed : 25 - 04 - 2026 | Accepted : 30 - 04 - 2026
Gambar 3. SHAP Summary Plot Model Random Forest
Pada SHAP summary plot , setiap titik merepresentasikan satu observasi data. Posisi horizontal menunjukkan
besarnya kontribusi fitur terhadap prediksi model, sedangkan warna menunjukkan nilai fitur tersebut. Warna
merah merepresentasikan nilai fitur yang tinggi, sedangkan warna biru menunjukkan nilai fitur yang rendah.
Nilai SHAP positif menunjukkan bahwa fitur tersebut meningkatkan probabilitas prediksi kelas penerima
beasiswa, sedangkan nilai negatif menunjukkan kontribusi terhadap kelas tidak diterima.

Berdasarkan hasil visualisasi tersebut, terlihat bahwa beberapa variabel memiliki pengaruh yang lebih dominan
terhadap keputusan model dibandingkan variabel lainnya. Untuk mengidentifikasi tingkat kepentingan fitur
secara lebih jelas, dilakukan analisis mean absolute SHAP value yang ditunjukkan pada Gambar 4.

Gambar 4. SHAP Feature Importance Model Random Forest
Berdasarkan analisis nilai rata-rata absolut SHAP, fitur yang paling berpengaruh terhadap keputusan model
antara lain Status P3KE, Jumlah Tanggungan, Status P3KE Belum Terdata, Kab/Kota Sekolah, serta Penghasilan

Jurnal Pustaka AI Vol. 6 No. 1 ( 2026 ) 81 – 91
Submitted : 20 - 04 - 2026 | Reviewed : 25 - 04 - 2026 | Accepted : 30 - 04 - 2026
Ayah. Hal ini menunjukkan bahwa faktor sosial ekonomi keluarga memiliki kontribusi yang signifikan dalam
menentukan kelayakan penerima beasiswa KIP.

Selain faktor ekonomi keluarga, beberapa variabel lain seperti pilihan program studi dan lokasi sekolah asal juga
menunjukkan pengaruh terhadap keputusan model. Hal ini mengindikasikan bahwa model tidak hanya
mempertimbangkan kondisi ekonomi, tetapi juga karakteristik latar belakang pendidikan calon mahasiswa.

Temuan ini sejalan dengan penelitian sebelumnya yang menunjukkan bahwa variabel sosial ekonomi dan kondisi
keluarga merupakan determinan penting dalam analisis bantuan pendidikan berbasis data [2], [4]. Dengan
menggunakan pendekatan SHAP, kontribusi masing-masing fitur terhadap keputusan model dapat dijelaskan
secara transparan sehingga meningkatkan akuntabilitas sistem seleksi berbasis kecerdasan buatan.

3.5 SHAP Local Explanation

Selain analisis global, penelitian ini juga melakukan interpretasi model pada tingkat individu menggunakan
pendekatan SHAP local explanation. Analisis ini bertujuan untuk menjelaskan bagaimana setiap fitur
memberikan kontribusi terhadap keputusan model pada satu observasi data tertentu. Gambar 5 menunjukkan
visualisasi SHAP waterfall plot untuk salah satu mahasiswa yang diprediksi diterima oleh model.

Gambar 5. SHAP Local Explanation pada Kasus Mahasiswa yang Diprediksi Diterima
Pada visualisasi tersebut, nilai E[f(x)] menunjukkan nilai prediksi dasar model sebelum mempertimbangkan
kontribusi fitur. Setiap fitur kemudian memberikan kontribusi positif maupun negatif terhadap nilai prediksi
akhir f(x). Fitur yang berwarna merah menunjukkan kontribusi yang meningkatkan probabilitas prediksi
terhadap kelas tertentu, sedangkan fitur berwarna biru menunjukkan kontribusi yang menurunkan probabilitas
prediksi.

Pada kasus ini, beberapa fitur memberikan kontribusi positif terhadap keputusan model, seperti Kab/Kota
Sekolah Kota Padang, Penghasilan Ayah, serta Jenis Kelamin. Sebaliknya, fitur seperti Status P3KE Terdata
Desil 2 dan Pilihan Program Studi tertentu memberikan kontribusi negatif terhadap probabilitas prediksi. Untuk
memberikan gambaran yang lebih komprehensif, Gambar 6 menampilkan contoh interpretasi lokal pada kasus
mahasiswa yang diprediksi tidak diterima oleh model.

Jurnal Pustaka AI Vol. 6 No. 1 ( 2026 ) 81 – 91
Submitted : 20 - 04 - 2026 | Reviewed : 25 - 04 - 2026 | Accepted : 30 - 04 - 2026
Gambar 6. SHAP Local Explanation pada Kasus Mahasiswa yang Diprediksi Tidak Diterima
Pada kasus ini terlihat bahwa beberapa fitur memberikan kontribusi negatif yang lebih dominan terhadap nilai
prediksi model. Misalnya, fitur Kab/Kota Sekolah Kabupaten Pasaman Barat, Penghasilan Ibu, serta pekerjaan
orang tua memberikan kontribusi yang menurunkan probabilitas mahasiswa untuk diklasifikasikan sebagai
penerima beasiswa. Sementara itu, beberapa fitur lain seperti Pilihan Program Studi memberikan kontribusi
positif namun tidak cukup kuat untuk meningkatkan probabilitas prediksi secara signifikan.

Hasil analisis ini menunjukkan bahwa keputusan model tidak hanya dipengaruhi oleh satu variabel tertentu,
tetapi merupakan kombinasi kontribusi dari berbagai fitur sosial ekonomi dan latar belakang calon mahasiswa.
Dengan menggunakan pendekatan SHAP, setiap keputusan klasifikasi yang dihasilkan oleh model dapat
dijelaskan secara transparan pada tingkat individu, sehingga meningkatkan akuntabilitas sistem pendukung
keputusan berbasis machine learning dalam proses seleksi beasiswa.

4. Kesimpulan

Penelitian ini mengusulkan pendekatan berbasis machine learning yang terintegrasi dengan Explainable
Artificial Intelligence (XAI) untuk mendukung rekomendasi kelayakan penerima beasiswa KIP di Universitas
Adzkia. Model Random Forest yang digunakan mampu melakukan klasifikasi dengan akurasi sebesar 0,53 serta
menghasilkan nilai F1-score terbaik sebesar 0,37 setelah dilakukan threshold optimization pada nilai 0,05 untuk
meningkatkan sensitivitas terhadap kelas penerima beasiswa. Hasil analisis menunjukkan bahwa model masih
dipengaruhi oleh ketidakseimbangan data, namun penyesuaian threshold mampu meningkatkan kemampuan
deteksi kandidat yang layak. Selain itu, penerapan metode SHAP memungkinkan interpretasi model secara
transparan baik secara global maupun lokal, dimana variabel Status P3KE, jumlah tanggungan keluarga,
penghasilan orang tua, serta wilayah asal sekolah menjadi faktor utama yang memengaruhi keputusan model.
Dengan demikian, pendekatan yang diusulkan tidak hanya memberikan performa prediksi yang memadai, tetapi
juga meningkatkan transparansi dan akuntabilitas dalam sistem seleksi beasiswa berbasis data.

Ucapan Terima Kasih [jika ada]

Penulis mengucapkan terima kasih kepada Universitas Adzkia atas dukungan akademik serta pemberian akses
terhadap data seleksi Kartu Indonesia Pintar Kuliah (KIP-K) yang digunakan dalam penelitian ini. Dukungan
tersebut memungkinkan penelitian ini dilakukan menggunakan data riil sehingga hasil yang diperoleh dapat
memberikan kontribusi dalam pengembangan sistem seleksi beasiswa berbasis data di lingkungan perguruan
tinggi.

Jurnal Pustaka AI Vol. 6 No. 1 ( 2026 ) 81 – 91
Submitted : 20 - 04 - 2026 | Reviewed : 25 - 04 - 2026 | Accepted : 30 - 04 - 2026
Daftar Rujukan

[1] M. Thoriq, F. Maulana, and A. Q. Ayun, “Perbandingan Naïve Bayes dan Random Forest pada Seleksi KIP di Universitas Adzkia,”
J. Pustaka AI (Pusat Akses Kaji. Teknol. Artif. Intell. , vol. 5, no. 3, pp. 602–610, 2025.

[2] H. Aldowah, H. Al-Samarraie, and W. M. Fauzy, “Educational Data Mining for Student Learning Outcomes: A Systematic Review
of Machine Learning Applications,” Comput. Educ. , vol. 173, p. 104297, 2021.

[3] U. A. Wizsa and A. Rahmi, “Classification Of KIP-K Scholarship Using Logistic Regression, Classification Trees, and Boosting
Based On Decision Support System,” Mathline J. Mat. dan Pendidik. Mat. , vol. 10, no. 1, pp. 221–235, 2025.

[4] M. W. P. Dananjaya, N. N. K. Krisnawijaya, G. H. Prathama, I. G. N. D. Paramartha, and A. W. O. Gama, “Analisis Determinan
Karakter Siswa Menggunakan Explainable Machine Learning (SHAP) dan Klasterisasi Profil Sekolah Studi Kasus Rapor
Pendidikan Provinsi Bali,” J. Kridatama Sains dan Teknol. , vol. 7, no. 02, pp. 936–948, 2025.

[5] Zulkifli, Rizky Maulana, Muhammad Yasar Al Wafi, and Imam Muslem, “Prediction of KIP Scholarship Eligibility at Universitas
Almuslim Using an Explainable Artificial Intelligence – Based XGBoost Algorithm,” J. Multimed. Dan Teknol. Inf. , vol. 07, no.
04, pp. 893–902, 2025.

[6] A. Arpan and Mohammad Yusup, “Sistem Peringatan Dini Penurunan Prestasi dan Minat Belajar pada Siswa Sekolah Menengah di
Medan: Pendekatan Explainable Machine Learning,” J. Komput. Teknol. Inf. Sist. Inf. , vol. 4, no. 2, pp. 1423–1431, 2025.

[7] B. A. Alnasyan, M. Basheri, and M. O. Alassafi, “A Comprehensive Comparative Analysis of Deep Learning Models for Student
Performance Prediction in Virtual Learning Environments: Leveraging the OULA Dataset and Advanced Resampling
Techniques,” IEEE Access , vol. 13, pp. 75953–75972, 2025.

[8] E. Ben George, R. Senthilkumar, F. Al-Junaibi, and Z. Al-Shuaibi, “Explainable AI Methods for Predicting Student Grades and
Improving Academic Success,” 2024.

[9] J. B. M. B. SANFO, “Application of explainable artificial intelligence approach to predict student learning outcomes,” J. Comput.
Soc. Sci. , vol. 8, no. 1, Feb. 2025.

[10] S. R. A. Parisineni and M. Pal, “Enhancing trust and interpretability of complex machine learning models using local interpretable
model agnostic shap explanations,” Int. J. Data Sci. Anal. , vol. 18, no. 4, pp. 457–466, 2024.

[11] E. Albini, J. Long, D. Dervovic, and D. Magazzeni, “Counterfactual Shapley Additive Explanations,” ACM Int. Conf. Proceeding
Ser. , no. February, pp. 1054–1070, 2022.

[12] I. Syahputra Ritonga, M. Rahfiqa Zainal, and A. Zaki, “Predicting Employment Status 6 Months After Graduation with Machine
Learning Learning : A Comparative Study of 3,945 Indonesian Graduates,” Intellect Int. J. Innov. Learn. Technol. , vol. 04, no. 02,
pp. 194–205, 2025.

[13] S. Alturki, N. Alturki, and H. Stuckenschmidt, “Using Educational Data Mining To Predict Students’ Academic Performance For
Applying Early Interventions,” J. Inf. Technol. Educ. Innov. Pract. , vol. 20, pp. 121–137, 2021.

[14] V. M. Putri, B. A. Wisesa, I. A. Edyyul, and S. A. Darma, “Sistem Pakar Deteksi Keterlambatan Bicara Anak Menggunakan
Forward Chaining dan Naïve Bayes,” J. Pustaka AI (Pusat Akses Kaji. Teknol. Artif. Intell. , vol. 5, no. 2, pp. 7–12, 2025.

[15] A. Asriyanik and A. Pambudi, “Machine Learning-Based Classification for Scholarship Selection,” PIKSEL Penelit. Ilmu Komput.
Sist. Embed. Log. , vol. 11, no. 2, pp. 447–460, 2023.

[16] K. Kesgin, S. Kiraz, S. Kosunalp, and B. Stoycheva, “Beyond Performance: Explaining and Ensuring Fairness in Student
Academic Performance Prediction with Machine Learning,” Appl. Sci. , vol. 15, no. 15, Aug. 2025.