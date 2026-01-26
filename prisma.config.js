import "dotenv/config";
import { defineConfig, env } from "prisma/config";

const databaseUrl = process.env.DATABASE_URL
// Test
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    provider: "mysql",
    url: env(DATABASE_URL),
  },
  migrations: {
    path: "prisma/migrations",
  },
});
