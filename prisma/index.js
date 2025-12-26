const { PrismaClient } = require("@prisma/client");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");

function buildMariaDbOptions() {
  // Prefer explicit env vars if available
  if (
    process.env.DB_HOST ||
    process.env.DB_USER ||
    process.env.DB_PASSWORD ||
    process.env.DB_DATABASE ||
    process.env.DB_PORT
  ) {
    return {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
      ssl: /^(true|1)$/i.test(process.env.DB_SSL || "") || undefined,
      connectionLimit: 5,
    };
  }

  // Fallback: parse DATABASE_URL (mysql:// or mariadb://)
  try {
    const url = process.env.DATABASE_URL;
    if (!url) return {};
    const u = new URL(url);
    const port = u.port ? parseInt(u.port, 10) : 3306;
    const sslParam = u.searchParams.get("ssl") || u.searchParams.get("sslmode");
    const ssl = sslParam === "true" || sslParam === "require" ? true : undefined;

    return {
      host: u.hostname,
      user: decodeURIComponent(u.username || ""),
      password: decodeURIComponent(u.password || ""),
      database: u.pathname.replace(/^\//, ""),
      port,
      ssl,
      connectionLimit: 5,
    };
  } catch {
    return {};
  }
}

const adapter = new PrismaMariaDb(buildMariaDbOptions());
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
