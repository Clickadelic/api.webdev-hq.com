import "dotenv/config";
import { defineConfig, env } from "prisma/config";

const DATABASE_URL = process.env.DATABASE_URL;

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    provider: "mysql",
    url: DATABASE_URL,
  },
  migrations: {
    path: "prisma/migrations",
  },
});
