# Tahap 1: Arsitektur Pengujian & Skema Database

**Status:** Selesai

## 1. Komponen Sistem Pengujian

Arsitektur pengujian terdiri dari tiga komponen utama yang berjalan pada container terisolasi untuk memastikan pengukuran resource (CPU/Memori) yang akurat:

1. **Load Generator (k6)**: Mengirimkan ribuan HTTP request ke backend untuk mensimulasikan trafik konkurensi tinggi.
2. **Backend API**:
   - Node.js Service (menggunakan framework Express.js)
   - Go Service (menggunakan framework Gin)
3. **Database (PostgreSQL 15)**: Menangani transaksi query data pengguna (single dan complex) tanpa adanya layer cache (untuk mengisolasi dampak latensi database).

## 2. Desain Skenario Uji

| Skenario | Endpoint | Deskripsi Beban |
|---|---|---|
| `baseline` | `/api/simple` | Murni routing / komputasi backend (tanpa I/O ke DB). Merupakan representasi CPU-bound process. |
| `db_single` | `/api/users/:id` | Query data tunggal (`SELECT * FROM users WHERE id = ?`). Menguji kecepatan I/O konstan antara framework dan driver database. |
| `db_complex` | `/api/users/stats` | Query analitik agregasi (`COUNT`, `GROUP BY`, `JOIN` pada tabel besar). Menguji throughput ketika database memonopoli latensi (I/O-bound). |

## 3. Skema Database

Tabel `users` dan `user_activities` digunakan untuk mensimulasikan query.

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);

CREATE TABLE user_activities (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    activity_type VARCHAR(50),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_activities_type ON user_activities(activity_type);
```

Dataset di-*seed* dengan 1 juta *record* pengguna untuk memastikan query kompleks (`db_complex`) memiliki bobot latensi yang realistis.
