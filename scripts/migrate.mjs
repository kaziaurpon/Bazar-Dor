/**
 * Creates / updates the Better Auth tables before the app starts or builds.
 * Uses the same database selection as lib/auth.ts:
 *   DATABASE_URL set -> PostgreSQL, otherwise a local SQLite file.
 * This script never fails the build: the app also migrates lazily at runtime.
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { betterAuth } from "better-auth";
import { getMigrations } from "better-auth/db/migration";

const require = createRequire(import.meta.url);

for (const file of [".env.local", ".env"]) {
  try {
    if (fs.existsSync(file) && typeof process.loadEnvFile === "function") process.loadEnvFile(file);
  } catch {
    /* ignore malformed env files */
  }
}

function createDatabase() {
  if (process.env.DATABASE_URL) {
    const { Pool } = require("pg");
    const local = /localhost|127\.0\.0\.1/.test(process.env.DATABASE_URL);
    return {
      db: new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: local ? undefined : { rejectUnauthorized: false },
      }),
      label: "PostgreSQL",
    };
  }
  const file =
    process.env.SQLITE_PATH ||
    (process.env.VERCEL ? "/tmp/bazardor-auth.sqlite" : path.join(process.cwd(), "data", "auth.sqlite"));
  fs.mkdirSync(path.dirname(file), { recursive: true });
  // Preferred: Node's built-in SQLite (Node 22.5+). Fallback: better-sqlite3 on older Node.
  const builtin = process.getBuiltinModule?.("node:sqlite");
  const db = builtin?.DatabaseSync ? new builtin.DatabaseSync(file) : new (require("better-sqlite3"))(file);
  return { db, label: `SQLite (${file})` };
}

let handle;
try {
  handle = createDatabase();
  const auth = betterAuth({
    database: handle.db,
    secret: process.env.BETTER_AUTH_SECRET || "migration-only-secret-not-used-at-runtime-0123456789",
    emailAndPassword: { enabled: true },
    logger: { disabled: true },
  });
  const { toBeCreated, toBeAdded, runMigrations } = await getMigrations(auth.options);
  if (toBeCreated.length || toBeAdded.length) {
    await runMigrations();
    console.log(`✔ Auth database ready — ${handle.label}`);
  } else {
    console.log(`✔ Auth database is up to date — ${handle.label}`);
  }
} catch (error) {
  console.warn("⚠ Skipped auth migration (will retry automatically at runtime):", error?.message ?? error);
} finally {
  await new Promise((resolve) => setTimeout(resolve, 300)); // let Better Auth's background schema check finish
  try {
    if (handle?.db?.end) await handle.db.end();
    else if (handle?.db?.close) handle.db.close();
  } catch {
    /* ignore */
  }
}
