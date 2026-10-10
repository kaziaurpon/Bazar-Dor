import { betterAuth } from "better-auth";
import { getMigrations } from "better-auth/db/migration";
import { nextCookies } from "better-auth/next-js";
import { Pool } from "pg";

/**
 * Database:
 *  - DATABASE_URL set  -> PostgreSQL (use this on Vercel, e.g. a free Neon/Supabase DB)
 *  - otherwise         -> local SQLite file (zero setup for local development)
 */
function createDatabase() {
  if (process.env.DATABASE_URL) {
    return new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: /localhost|127\.0\.0\.1/.test(process.env.DATABASE_URL)
        ? undefined
        : { rejectUnauthorized: false },
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Database = require("better-sqlite3");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const path = require("node:path");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const fs = require("node:fs");
  // On Vercel only /tmp is writable (data there is NOT permanent — set DATABASE_URL for real use).
  const file =
    process.env.SQLITE_PATH ||
    (process.env.VERCEL
      ? "/tmp/bazardor-auth.sqlite"
      : path.join(process.cwd(), "data", "auth.sqlite"));
  fs.mkdirSync(path.dirname(file), { recursive: true });
  return new Database(file);
}

const globalForAuth = globalThis as unknown as {
  __bazardorDb?: ReturnType<typeof createDatabase>;
  __bazardorAuthReady?: Promise<void>;
};

const database = (globalForAuth.__bazardorDb ??= createDatabase());

const trustedOrigins = [
  process.env.BETTER_AUTH_URL,
  process.env.NEXT_PUBLIC_APP_URL,
  process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
  process.env.VERCEL_BRANCH_URL && `https://${process.env.VERCEL_BRANCH_URL}`,
  process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
].filter((v): v is string => Boolean(v));

const googleConfigured = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
const githubConfigured = Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET);

export const auth = betterAuth({
  database,
  baseURL: process.env.BETTER_AUTH_URL || undefined,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  socialProviders: {
    ...(googleConfigured && {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
    }),
    ...(githubConfigured && {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      },
    }),
  },
  session: {
    cookieCache: { enabled: true, maxAge: 5 * 60 },
  },
  plugins: [nextCookies()],
});

async function runMigrationsOnce(attempt = 0): Promise<void> {
  try {
    const { toBeCreated, toBeAdded, runMigrations } = await getMigrations(auth.options);
    if (toBeCreated.length > 0 || toBeAdded.length > 0) {
      await runMigrations();
    }
  } catch (error) {
    // Two cold starts can race to create the same tables — retry once.
    if (attempt < 2) {
      await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
      return runMigrationsOnce(attempt + 1);
    }
    globalForAuth.__bazardorAuthReady = undefined;
    throw error;
  }
}

/** Resolves once the auth tables exist (creates them automatically on first use). */
export function ensureAuthReady(): Promise<void> {
  return (globalForAuth.__bazardorAuthReady ??= runMigrationsOnce());
}
