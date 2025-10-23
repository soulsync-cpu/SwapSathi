// lib/db.ts
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

declare global {
  var __pgPool__: Pool | undefined;
}

const sslConfig = { rejectUnauthorized: false };

const pool: Pool = global.__pgPool__ ?? new Pool({
  connectionString,
  ssl: sslConfig,
});

if (!global.__pgPool__) global.__pgPool__ = pool;

// helper query function
export async function query(text: string, params?: any[]) {
  return pool.query(text, params);
}

export default pool;
