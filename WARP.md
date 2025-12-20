# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Quick commands

- Install deps (runs Prisma generate via postinstall):
  - npm install
- Dev (API only, with nodemon):
  - npm run dev
- Dev (API + assets; runs 3 watchers: server, esbuild, Tailwind):
  - npm run dev-all
- Build assets (watch mode):
  - npm run build-scripts
  - npm run watch-tailwind
- Tests (Jest + Supertest):
  - All tests: npm test
  - Single file: npm test -- __tests__/app.test.js
  - Filter by name: npm test -- -t "HealthCheck"
- Prisma (MySQL):
  - Generate client: npx prisma generate --schema=prisma/schema.prisma
  - Dev migrations: npx prisma migrate dev
  - Apply prod migrations: npx prisma migrate deploy

Environment
- Copy .env.template to .env and set DATABASE_URL, JWT_SECRET, SMTP vars, and APP_URL/API_URL.
- Prisma reads DATABASE_URL; Express reads PORT (defaults to 5000).

## Architecture overview

Entry points
- index.js starts the HTTP server (reads PORT, logs banner).
- app.js builds the Express app:
  - Middleware: CORS, JSON/urlencoded parsers, cookie-parser, basic headers; request logging; asset path helper; breadcrumbs; auth status to res.locals.
  - View engine: Twig templates in views; chokidar clears Twig cache on file changes; static files served from public.
  - Swagger UI at /api-docs from swagger/specs.js (OpenAPI 3, scans routers/* JSDoc).
  - Routers mounted:
    - SSR pages at / (page.router.js, admin pages under /)
    - JSON API under /common/v1 for info, auth, user, post, link, my, newsletter, chrome-extension.

Routing and controllers
- routers/*.router.js define URL surfaces and validation hooks; controllers/* implement handlers.
- Joi validation schemas live in schemas/index.js and are applied in middleware (e.g., validateRegistration, validatePost, validateLink).
- Auth
  - JWT cookie-based auth (httpOnly cookie named token). middleware.verifyTokenFromCookie protects SSR pages; middleware.checkAuthStatus loads user and exposes res.locals.user to Twig.
  - controllers/auth.controller.js handles register → email verification token, confirm, login (bcrypt), logout, reset-password (email via Handlebars templates in mail/templates).
- Domain modules
  - posts, links, users, newsletter, misc info/healthcheck have dedicated controllers and routers. Pagination helper in lib/utils.js.

Data layer (Prisma)
- prisma/schema.prisma defines MySQL models: User, Account, Post, Link, Subscriber, token entities, enums (UserRole, PostStatus).
- prisma/index.js exports a singleton PrismaClient and reads DATABASE_URL. Prisma client is required from controllers via ../prisma.

Views and assets
- Server-rendered Twig pages under views/pages with partials in views/partials.
- Frontend assets source: views/assets/js and views/assets/scss.
- Build pipeline:
  - esbuild bundles views/assets/js/index.js → public/assets/js/scripts.min.js (watch in dev scripts).
  - Tailwind CLI builds views/assets/scss/style.scss → public/assets/css/style.min.css (watch in dev scripts).
- Public assets (icons, images, fonts) live under public/.

API documentation
- swagger/specs.js defines base OpenAPI info and components; JSDoc comments in routers/* populate operations. UI served at /api-docs.

Testing
- __tests__/app.test.js uses Supertest against the Express app to hit / and /common/v1/healthcheck.
- Tests import prisma and disconnect in afterAll; ensure DATABASE_URL is valid if you add DB-backed tests.

Deployment
- render.yaml defines a Node web service: npm install → prisma generate; start runs prisma migrate deploy then node index.js; health check at /common/v1/healthcheck.

## Notes and nuances
- Prisma adapter package vs usage: prisma/index.js imports @prisma/adapter-mysql, while package.json declares @prisma/adapter-mariadb. Align these to avoid runtime issues.
- OpenAPI metadata: swagger/specs.js description references https://api.webbdev-hq.com (typo: double “b”).
- esbuild outfile path in package.json uses an absolute /public/... path; prefer ./public/... to avoid writing to a root-level directory on some systems.
- Nodemon watches js, twig, mjs, json (see nodemon.json). Chokidar additionally clears Twig cache on view changes.
