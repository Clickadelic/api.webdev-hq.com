import "dotenv/config";
import { defineConfig, env } from "prisma/config";

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
