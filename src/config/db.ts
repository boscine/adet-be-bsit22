// src/config/db.ts
// Handles MySQL connection using mysql2

import mysql from 'mysql2/promise';
import 'dotenv/config';

const pool = mysql.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     Number(process.env.DB_PORT) || 3306,
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME     || 'bsit_22',
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;
