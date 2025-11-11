import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

// Only initialize database if DATABASE_URL is provided
let pool: Pool | null = null;
let db: ReturnType<typeof drizzle> | null = null;

if (process.env.DATABASE_URL) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle(pool, { schema });
} else {
  console.log("⚠️  DATABASE_URL not set - using file storage");
}

if (!db) {
  throw new Error(
    "Database not initialized. This should only be called when DATABASE_URL is set.",
  );
}

export { pool, db };
