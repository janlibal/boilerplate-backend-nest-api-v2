
# Installation

This boilerplate supports [Prisma](https://www.npmjs.com/package/prisma) as ORM and Postgres as the main database.

---

## Table of Contents <!-- omit in toc -->

- [Launch app (with Postgres and Prisma) ](#launch-app-with-postgres-and-prisma)
- [Links](#links)

---

## Launch app with Postgres and Prisma

1. Clone the repository

   ```bash
   git clone https://github.com/janlibal/boilerplate-backend-nest-api-v2.git .
   ```

2. Install dependencies

   ```bash
   yarn install
   ```

3. Copy `env-example` as `.env`.

   ```bash
   cd my-app/
   cp env-example .env
   ```

4. Change `DB_HOST=postgres` to `DB_HOST=localhost`

5. Change `DB_NAME=postgres` to `DB_NAME=prod`

6. Run container with Postgres, Redis and PgAdmin:

   ```bash
   yarn run infra:up
   ```

7. Run migrations

   ```bash
   npm run migrate:dev
   ```

8. Run seeds

   ```bash
   npm run seed:dev
   ```

9. Run app in dev mode

   ```bash
   npm run start:dev
   ```

10. Open <http://localhost:80/api/v1/app/info> to obtain host info
---


## Links

- Swagger (API docs): <http://localhost:80/api/v1/docs>
- PgAdmin: <https://localhost:165432>
---

Previous: [Introduction](introduction.md)

Next: [Architecture](architecture.md)