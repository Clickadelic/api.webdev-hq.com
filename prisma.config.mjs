import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// In Prisma 7 the `adapter` option was removed from prisma.config.
// Migrations use datasource.url directly; the driver adapter is only
// needed when constructing PrismaClient at runtime (see prisma/index.js).
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
