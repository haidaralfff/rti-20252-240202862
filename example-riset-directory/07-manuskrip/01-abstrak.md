# Abstrak

## Bahasa Indonesia

Performansi web framework menjadi faktor kritis dalam pengembangan aplikasi backend modern. Dua framework yang banyak dipengaruhi adalah Express.js (JavaScript/Node.js) dan Gin (Go). Penelitian ini melakukan evaluasi komparatif performa kedua framework melalui pengujian beban pada tiga skenario: baseline (handler sederhana), single database query, dan complex database query. Pengujian dilakukan menggunakan k6 dengan empat puluh replikasi per kombinasi *framework* × *skenario*. Hasil penelitian menunjukkan bahwa Ginmencapai latency median 4,0 ms pada baseline, 7,3 ms pada single query, dan 7,3 ms pada complex query, sedangkan Express menghasilkan 52,0 ms, 55,0 ms, dan 35,0 ms secara berturut-turut. Artinya, Gin unggul hingga ~15x lebih cepat pada baseline, ~7,5x pada single query, dan ~4,8x pada complex query. Fleksibilitas runtime Node.js menghasilkan variabilitas latency yang lebih tinggi dengan outlier mencapai 22 detik, sementara Gin menunjukkan stabilitas yang konsisten. Temuan ini membuktikan bahwa untuk aplikasi dengan kebutuhan throughput tinggi dan interaksi database intensif, Gin menawarkan keunggulan performa yang signifikan dibandingkan Express.js.

**Kata Kunci:** Express.js, Gin, Go, Node.js, Web Framework, Performance Evaluation, REST API, Database Query, Load Testing, k6

---

## English

Web framework performance is a critical factor in modern backend application development. Two widely adopted frameworks are Express.js (JavaScript/Node.js) and Gin (Go). This research presents a comparative performance evaluation of both frameworks through load testing across three scenarios: baseline (simple handler), single database query, and complex database query. Testing was conducted using k6 with forty replications per framework × scenario combination. Results show that Gin achieved median latencies of 4.0 ms (baseline), 7.3 ms (single query), and 7.3 ms (complex query), while Express yielded 52.0 ms, 55.0 ms, and 35.0 ms respectively. Consequently, Gin outperformed Express by approximately 15× in the baseline scenario, 7.5× in single query, and 4.8× in complex query. The flexibility of the Node.js runtime resulted in higher latency variability with outliers reaching up to 22 seconds, whereas Gin demonstrated consistent stability. These findings confirm that for high-throughput applications with intensive database interactions, Gin provides a significant performance advantage over Express.js.

**Keywords:** Express.js, Gin, Go, Node.js, Web Framework, Performance Evaluation, REST API, Database Query, Load Testing, k6
