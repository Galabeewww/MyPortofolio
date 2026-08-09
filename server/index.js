import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 3001;
const DB_NAME = process.env.PG_DATABASE || 'portfolio_db';

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// ===== PostgreSQL Connection Pool =====
const pool = new pg.Pool({
  host: process.env.PG_HOST || 'localhost',
  port: parseInt(process.env.PG_PORT || '5432'),
  database: DB_NAME,
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'postgres',
});

pool.on('connect', () => {
  console.log(`✅ Connected to PostgreSQL database '${DB_NAME}'`);
});

pool.on('error', (err) => {
  console.error(`❌ PostgreSQL pool error on '${DB_NAME}':`, err.message);
});

// Helper untuk mengecek koneksi database
const checkDbConnection = async () => {
  try {
    const client = await pool.connect();
    client.release();
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
};

// ===== GENERIC CRUD HELPERS =====

const getAll = (table, orderBy = 'created_at DESC') => async (_req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM ${table} ORDER BY ${orderBy}`);
    res.json(result.rows);
  } catch (err) {
    console.error(`GET /${table} error:`, err.message);
    res.status(500).json({
      error: `Database '${DB_NAME}' atau tabel '${table}' tidak dapat diakses! Error: ${err.message}`
    });
  }
};

const insertOne = (table) => async (req, res) => {
  try {
    const data = req.body;
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
    const columns = keys.join(', ');

    const result = await pool.query(
      `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING *`,
      values
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(`POST /${table} error:`, err.message);
    res.status(500).json({ error: err.message });
  }
};

const updateOne = (table) => async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const keys = Object.keys(data).filter((k) => k !== 'id');
    const values = keys.map((k) => data[k]);
    const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');

    const result = await pool.query(
      `UPDATE ${table} SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
      [...values, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(`PUT /${table}/${req.params.id} error:`, err.message);
    res.status(500).json({ error: err.message });
  }
};

const deleteOne = (table) => async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(`DELETE FROM ${table} WHERE id = $1`, [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(`DELETE /${table}/${req.params.id} error:`, err.message);
    res.status(500).json({ error: err.message });
  }
};

// ===== AUTH ROUTE DENGAN VALIDASI DATABASE STRICT =====
app.post('/api/auth/login', async (req, res) => {
  const dbStatus = await checkDbConnection();
  if (!dbStatus.ok) {
    return res.status(500).json({
      success: false,
      message: `Database PostgreSQL/pgAdmin '${DB_NAME}' TIDAK DITEMUKAN atau tidak dapat diakses! Silakan buat database '${DB_NAME}' di pgAdmin dan jalankan schema.sql atau 'npx prisma db push'. Error: ${dbStatus.error}`
    });
  }

  try {
    const { username, password } = req.body;
    const result = await pool.query(
      'SELECT id, username, email FROM admin_users WHERE username = $1 AND password = $2',
      [username, password]
    );
    if (result.rows.length > 0) {
      res.json({ success: true, user: result.rows[0] });
    } else {
      res.status(401).json({ success: false, message: 'Username atau password salah!' });
    }
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({
      success: false,
      message: `Tabel 'admin_users' tidak ditemukan di database '${DB_NAME}'! Silakan jalankan schema.sql atau 'npx prisma db push'. Error: ${err.message}`
    });
  }
});

// ===== PROJECTS =====
app.get('/api/projects', getAll('projects'));
app.post('/api/projects', insertOne('projects'));
app.put('/api/projects/:id', updateOne('projects'));
app.delete('/api/projects/:id', deleteOne('projects'));

// ===== SKILLS =====
app.get('/api/skills', getAll('skills'));
app.post('/api/skills', insertOne('skills'));
app.put('/api/skills/:id', updateOne('skills'));
app.delete('/api/skills/:id', deleteOne('skills'));

// ===== CATEGORIES =====
app.get('/api/categories', getAll('categories'));
app.post('/api/categories', insertOne('categories'));
app.put('/api/categories/:id', updateOne('categories'));
app.delete('/api/categories/:id', deleteOne('categories'));

// ===== EXPERIENCES =====
app.get('/api/experiences', getAll('experiences'));
app.post('/api/experiences', insertOne('experiences'));
app.put('/api/experiences/:id', updateOne('experiences'));
app.delete('/api/experiences/:id', deleteOne('experiences'));

// ===== HEALTH CHECK =====
app.get('/api/health', async (_req, res) => {
  const dbStatus = await checkDbConnection();
  if (dbStatus.ok) {
    res.json({ status: 'ok', database: DB_NAME, connected: true });
  } else {
    res.status(500).json({ status: 'error', database: DB_NAME, connected: false, error: dbStatus.error });
  }
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`🚀 Local API Server running at http://localhost:${PORT}`);
  console.log(`📦 Target Database: '${DB_NAME}' @ ${process.env.PG_HOST || 'localhost'}:${process.env.PG_PORT || '5432'}`);
});
