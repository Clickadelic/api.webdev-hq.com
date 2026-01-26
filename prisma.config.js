import "dotenv/config";
import { defineConfig, env } from "prisma/config";

const databaseUrl = process.env.DATABASE_URL
// Test
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    provider: "mysql",
    url: databaseUrl,
  },
  migrations: {
    path: "prisma/migrations",
  },
});
