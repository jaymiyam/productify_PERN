import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { ENV } from '../config/env';

if (!ENV.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in environment variables');
}

// pool is a postgres cache of database connection (for performance)
const pool = new Pool({ connectionString: ENV.DATABASE_URL });

pool.on('connect', () => {
  console.log('Database connected successfully ✅');
});

pool.on('error', (err) => {
  console.log('💥 Database connection error:', err);
});

// connect pool with drizzle-orm, provide it with the source, and the schema to be used
export const db = drizzle({ client: pool, schema });
