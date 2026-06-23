import pool from "../config/db";

export const UserService = {
  findById: async (id: number) => {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0] || null;
  },

  getStats: async () => {
    const result = await pool.query(`
      SELECT
        CASE WHEN phone IS NOT NULL THEN 'With Phone' ELSE 'Without Phone' END as category,
        COUNT(*) as count
      FROM users
      GROUP BY 1
    `);
    return result.rows;
  },

  create: async (name: string, email: string, phone?: string) => {
    const result = await pool.query(
      "INSERT INTO users (name, email, phone) VALUES ($1, $2, $3) RETURNING *",
      [name, email, phone ?? null]
    );
    return result.rows[0];
  },

  update: async (id: number, name: string, email: string, phone?: string) => {
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2, phone = $3 WHERE id = $4 RETURNING *",
      [name, email, phone ?? null, id]
    );
    return result.rows[0];
  },

  delete: async (id: number) => {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING id", [id]);
    return result.rows[0] || null;
  },
};
