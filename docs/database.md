# Databases

## Table of Contents <!-- omit in toc -->

- [Foreword on database](#foreword-on-database)
- [Prisma schema](#prisma-schema)
  - [Generate migration](#generate-migration)
  - [Run migration](#run-migration)
  - [Revert migration](#revert-migration)
  - [Drop all tables in database](#drop-all-tables-in-database)
- [Working with database schema (Mongoose)](#working-with-database-schema-mongoose)
  - [Create schema](#create-schema)
- [Seeding (TypeORM)](#seeding-typeorm)
  - [Creating seeds (TypeORM)](#creating-seeds-typeorm)
  - [Run seed (TypeORM)](#run-seed-typeorm)
  - [Factory and Faker (TypeORM)](#factory-and-faker-typeorm)
- [Seeding (Mongoose)](#seeding-mongoose)
  - [Creating seeds (Mongoose)](#creating-seeds-mongoose)
  - [Run seed (Mongoose)](#run-seed-mongoose)
- [Performance optimization (PostgreSQL + TypeORM)](#performance-optimization-postgresql--typeorm)
  - [Indexes and Foreign Keys](#indexes-and-foreign-keys)
  - [Max connections](#max-connections)
- [Performance optimization (MongoDB + Mongoose)](#performance-optimization-mongodb--mongoose)
  - [Design schema](#design-schema)

---

## Foreword on database

The boilerplate supports PostgreSQL with Prisma as ORM. However, the choice what type of database you'll decide to integrate besides the default option is up to you.

For support of both databases used [Hexagonal Architecture](architecture.md#hexagonal-architecture).

## Prisma schema

### Generate migration

1. Create a schema file with `.schema.prisma` extension. E.g.: `user.schema.ts`:

   ```ts
   // /src/user/schema/user.schema.prisma

	 model User {
	 password			String
	 email				String @unique
	 }      
   ```

2. Run generate-schema to merge all schemas into one global Prisma schema file in /prisma/schema/base.schema.prisma

   ```bash
   yarn run generate-schema
   ```

### Migrations

```bash
yarn run migration:dev
```

## 

## Seeding

### Creating seeds

1. Create seed file with `npm run seed:create:relational -- --name=Post`. Where `Post` is name of entity.
1. Go to `src/database/seeds/relational/post/post-seed.service.ts`.
1. In `run` method extend your logic.
1. Run [npm run seed:run:relational](#run-seed-typeorm)

### Run seed (TypeORM)

```bash
npm run seed:run:relational
```

### Factory and Faker (TypeORM)

1. Install faker:

    ```bash
    npm i --save-dev @faker-js/faker
    ```

1. Create `src/database/seeds/relational/user/user.factory.ts`:

    ```ts
    import { faker } from '@faker-js/faker';
    import { RoleEnum } from '../../../../roles/roles.enum';
    import { StatusEnum } from '../../../../statuses/statuses.enum';
    import { Injectable } from '@nestjs/common';
    import { InjectRepository } from '@nestjs/typeorm';
    import { Repository } from 'typeorm';
    import { RoleEntity } from '../../../../roles/infrastructure/persistence/relational/entities/role.entity';
    import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
    import { StatusEntity } from '../../../../statuses/infrastructure/persistence/relational/entities/status.entity';

    @Injectable()
    export class UserFactory {
      constructor(
        @InjectRepository(UserEntity)
        private repositoryUser: Repository<UserEntity>,
        @InjectRepository(RoleEntity)
        private repositoryRole: Repository<RoleEntity>,
        @InjectRepository(StatusEntity)
        private repositoryStatus: Repository<StatusEntity>,
      ) {}

      createRandomUser() {
        // Need for saving "this" context
        return () => {
          return this.repositoryUser.create({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            role: this.repositoryRole.create({
              id: RoleEnum.user,
              name: 'User',
            }),
            status: this.repositoryStatus.create({
              id: StatusEnum.active,
              name: 'Active',
            }),
          });
        };
      }
    }
    ```

1. Make changes in `src/database/seeds/relational/user/user-seed.service.ts`:

    ```ts
    // Some code here...
    import { UserFactory } from './user.factory';
    import { faker } from '@faker-js/faker';

    @Injectable()
    export class UserSeedService {
      constructor(
        // Some code here...
        private userFactory: UserFactory,
      ) {}

      async run() {
        // Some code here...

        await this.repository.save(
          faker.helpers.multiple(this.userFactory.createRandomUser(), {
            count: 5,
          }),
        );
      }
    }
    ```

1. Make changes in `src/database/seeds/relational/user/user-seed.module.ts`:

    ```ts
    import { Module } from '@nestjs/common';
    import { TypeOrmModule } from '@nestjs/typeorm';
    
    import { UserSeedService } from './user-seed.service';
    import { UserFactory } from './user.factory';

    import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
    import { RoleEntity } from '../../../../roles/infrastructure/persistence/relational/entities/role.entity';
    import { StatusEntity } from '../../../../statuses/infrastructure/persistence/relational/entities/status.entity';

    @Module({
      imports: [TypeOrmModule.forFeature([UserEntity, Role, Status])],
      providers: [UserSeedService, UserFactory],
      exports: [UserSeedService, UserFactory],
    })
    export class UserSeedModule {}

    ```

1. Run seed:

    ```bash
    npm run seed:run
    ```

---

## Seeding (Mongoose)

### Creating seeds (Mongoose)

1. Create seed file with `npm run seed:create:document -- --name=Post`. Where `Post` is name of entity.
1. Go to `src/database/seeds/document/post/post-seed.service.ts`.
1. In `run` method extend your logic.
1. Run [npm run seed:run:document](#run-seed-mongoose)

### Run seed (Mongoose)

```bash
npm run seed:run:document
```

---

## Performance optimization (PostgreSQL + TypeORM)

### Indexes and Foreign Keys

Don't forget to create `indexes` on the Foreign Keys (FK) columns (if needed), because by default PostgreSQL [does not automatically add indexes to FK](https://stackoverflow.com/a/970605/18140714).

### Max connections

Set the optimal number of [max connections](https://node-postgres.com/apis/pool) to database for your application in `/.env`:

```txt
DATABASE_MAX_CONNECTIONS=100
```

You can think of this parameter as how many concurrent database connections your application can handle.

## Performance optimization (MongoDB + Mongoose)

### Design schema

Designing schema for MongoDB is completely different from designing schema for relational databases. For best performance, you should design your schema according to:

1. [MongoDB Schema Design Anti-Patterns](https://www.mongodb.com/developer/products/mongodb/schema-design-anti-pattern-massive-arrays)
1. [MongoDB Schema Design Best Practices](https://www.mongodb.com/developer/products/mongodb/mongodb-schema-design-best-practices/)

---

Previous: [Command Line Interface](cli.md)

Next: [Auth](auth.md)
